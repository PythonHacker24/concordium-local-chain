// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use concordium_rust_sdk::smart_contracts::common::{AccountAddress, Amount};
use concordium_rust_sdk::v2::{self, AccountIdentifier};
use concordium_rust_sdk::{endpoints::Endpoint, types::hashes::BlockHash};
use dirs;
use futures::StreamExt;
use nix::sys::signal::Signal;
use nix::unistd::Pid;
use reqwest;
use serde::{Deserialize, Serialize};
use serde_json::Value as JsonValue;
use std::collections::HashMap;
use std::fs::File;
use std::io::Write;
use std::path::{Path, PathBuf};
use std::process::Command;
use std::str::FromStr;
use std::sync::{Arc, Mutex};
use tauri::regex::Regex;
use tauri::State;
use tauri::{Manager, Window};
use tokio::io::{AsyncBufReadExt, BufReader};
use tokio::process::Child;
use tokio::process::Command as AsyncCommand;
use tokio::task;
use toml::Value as TomlValue;

/* ---------------------------------------------------- MUTEX APP STATE ------------------------------------------------------------ */

struct AppState {
    child_process: Option<Child>,
    main_window: Option<Window>,
}

impl AppState {
    fn new() -> Self {
        AppState {
            child_process: None,
            main_window: None,
        }
    }
}

/* ---------------------------------------------------- INSTALL COMMAND ------------------------------------------------------------ */
#[tauri::command]
async fn install() -> Result<(), String> {
    // Detect the user's OS and architecture and generate the correct link for it.
    let download_url = if cfg!(target_os = "windows") {
        "https://distribution.concordium.software/windows/Signed/Node-5.4.2-0.msi"
    } else if cfg!(target_os = "macos") {
        "https://distribution.concordium.software/macos/signed/concordium-node-6.0.4-0.pkg"
    } else if cfg!(target_os = "linux") {
        "https://distribution.mainnet.concordium.software/deb/concordium-mainnet-node_5.4.2-0_amd64.deb"
    } else {
        return Err("Unsupported OS".into());
    };

    // Change Filename Depending on OS
    let file_name = if cfg!(target_os = "windows") {
        "concordium-node-lc1c.msi"
    } else if cfg!(target_os = "macos") {
        "concordium-node-lc1c.pkg"
    } else if cfg!(target_os = "linux") {
        "concordium-node-lc1c.deb"
    } else {
        return Err("Unsupported OS".into());
    };

    let downloads_folder = dirs::download_dir()
        .unwrap_or_else(|| dirs::home_dir().expect("Failed to get home directory"));
    let destination = downloads_folder.join(file_name);
    let destination_str = destination
        .to_str()
        .ok_or("Failed to convert path to string")?;
    match download_file(&download_url, &destination_str).await {
        Ok(_) => Ok(()),
        Err(e) => Err(e.to_string()),
    }
}

/* ---------------------------------------------------- Verify Installation COMMAND ------------------------------------------------------------ */

#[tauri::command]
async fn verify_installation() -> Result<String, String> {
    let output = std::process::Command::new("concordium-node")
        .arg("--version")
        .output();

    match output {
        Ok(output) => {
            let stderr_string = String::from_utf8_lossy(&output.stderr).to_string();
            if stderr_string.contains("command not found") {
                Err("Concordium node is not installed.".to_string())
            } else if output.status.success() {
                Ok(String::from_utf8_lossy(&output.stdout).to_string())
            } else {
                Err(stderr_string)
            }
        }
        Err(e) => Err(e.to_string()),
    }
}

/* ---------------------------------------------------- INSTALL Genesis COMMAND ------------------------------------------------------------ */

#[tauri::command]
fn install_genesis_creator() -> Result<String, String> {
    // Set the environment variable
    std::env::set_var("CARGO_NET_GIT_FETCH_WITH_CLI", "true");

    // Run the command
    let output = std::process::Command::new("cargo")
        .args(&[
            "install",
            "--git",
            "https://github.com/Concordium/concordium-misc-tools.git",
            "genesis-creator",
            "--locked",
        ])
        .output();

    match output {
        Ok(output) => {
            if output.status.success() {
                Ok(String::from_utf8_lossy(&output.stdout).to_string())
            } else {
                Err(String::from_utf8_lossy(&output.stderr).to_string())
            }
        }
        Err(e) => Err(e.to_string()),
    }
}

async fn download_file(url: &str, destination: &str) -> Result<(), Box<dyn std::error::Error>> {
    // Make a GET request to the URL
    let response = reqwest::get(url).await?;

    // Check if the request was successful
    if response.status() != reqwest::StatusCode::OK {
        return Err(Box::new(std::io::Error::new(
            std::io::ErrorKind::Other,
            format!(
                "Failed to download file. HTTP response: {}",
                response.status()
            ),
        )));
    }

    // Create a new file at the destination path
    let mut dest_file = File::create(destination)?;

    // Get the entire response body as Bytes
    let content = response.bytes().await?;

    // Write the content to the file
    dest_file.write_all(&content)?;

    let metadata = dest_file.metadata()?;
    println!("Downloaded {} bytes to {}", metadata.len(), destination);
    // if mac OS open the file after downloading
    if cfg!(target_os = "macos") {
        std::process::Command::new("open")
            .arg(destination)
            .output()?;
    }

    // TODO: Add for other OS as well
    Ok(())
}
#[tauri::command]
async fn list_chain_folders() -> Result<Vec<String>, String> {
    let home_dir = dirs::home_dir().ok_or("Unable to get home directory")?;
    let folder_path = home_dir.join(".concordium-lc1c");
    let mut chain_folders = Vec::new();

    if folder_path.exists() {
        for entry in std::fs::read_dir(folder_path).unwrap() {
            let path = entry.unwrap().path();
            if path.is_dir() {
                let folder_name = path.file_name().unwrap().to_str().unwrap().to_string();
                if folder_name.starts_with("chain-") {
                    chain_folders.push(folder_name);
                }
            }
        }
    }

    Ok(chain_folders)
}

/* ---------------------------------------------------- TEMPLATE LAUNCH COMMAND ------------------------------------------------------------ */

fn json_to_toml(json_value: &JsonValue) -> Option<TomlValue> {
    match json_value {
        JsonValue::Null => Some(TomlValue::String("".to_string())),
        JsonValue::Bool(b) => Some(TomlValue::Boolean(*b)),
        JsonValue::Number(n) => {
            if n.is_f64() {
                Some(TomlValue::Float(n.as_f64().unwrap()))
            } else if n.is_i64() {
                Some(TomlValue::Integer(n.as_i64().unwrap()))
            } else {
                None
            }
        }
        JsonValue::String(s) => Some(TomlValue::String(s.clone())),
        JsonValue::Array(arr) => {
            let toml_arr: Vec<TomlValue> = arr.iter().filter_map(|v| json_to_toml(v)).collect();
            Some(TomlValue::Array(toml_arr))
        }
        JsonValue::Object(obj) => {
            let mut toml_table = toml::value::Table::new();
            for (k, v) in obj.iter() {
                if let Some(toml_v) = json_to_toml(v) {
                    toml_table.insert(k.clone(), toml_v);
                }
            }
            Some(TomlValue::Table(toml_table))
        }
    }
}

#[derive(Debug, Serialize, Deserialize)]
#[serde(rename_all = "PascalCase")]
enum LaunchMode {
    Easy,
    Advanced(String),
    Expert(String),
    FromExisting(String),
}
#[tauri::command]
async fn launch_template(
    app_state: tauri::State<'_, Arc<Mutex<AppState>>>,
    launch_mode: LaunchMode,
) -> Result<(), String> {
    // Retrieve the home directory
    let home_dir = dirs::home_dir().ok_or("Unable to get home directory")?;

    // Create a new folder within the home directory for LC1C if it does not exist
    let folder_path = home_dir.join(".concordium-lc1c");
    if !folder_path.exists() {
        std::fs::create_dir_all(&folder_path).map_err(|e| e.to_string())?;
    }
    let mut new_chain_folder: PathBuf = Default::default();
    let mut toml_path: PathBuf = Default::default();
    let mut should_run_concordium_node = false;
    match &launch_mode {
        LaunchMode::Easy => {
            new_chain_folder = create_next_chain_folder(&folder_path)?;
            let toml_url = "http://0x0.st/HpsT.toml";
            toml_path = new_chain_folder.join("desired_toml_file_name.toml");
            let toml_string = toml_path
                .to_str()
                .ok_or("Failed to convert path to string")?;
            match download_file(&toml_url, &toml_string).await {
                Ok(_) => Ok(()),
                Err(e) => Err(e.to_string()),
            };
        }
        LaunchMode::Advanced(json_str) => {
            new_chain_folder = create_next_chain_folder(&folder_path)?;
            let json_value: JsonValue =
                serde_json::from_str(&json_str).map_err(|e| e.to_string())?;
            let toml_value = json_to_toml(&json_value).ok_or("Failed to convert JSON to TOML")?;

            let toml_string = toml::to_string(&toml_value).map_err(|e| e.to_string())?;
            toml_path = new_chain_folder.join("desired_toml_file_name.toml");
            std::fs::write(&toml_path, &toml_string).map_err(|e| e.to_string())?;
        }
        LaunchMode::Expert(toml_str) => {
            new_chain_folder = create_next_chain_folder(&folder_path)?;
            toml_path = new_chain_folder.join("desired_toml_file_name.toml");
            std::fs::write(&toml_path, &toml_str).map_err(|e| e.to_string())?;
        }
        LaunchMode::FromExisting(folder_name) => {
            new_chain_folder = folder_path.join(folder_name);
            println!("Creating Genesis Creator!");
            should_run_concordium_node = true;
        }
    };

    if should_run_concordium_node {
        let mut child = AsyncCommand::new("concordium-node")
            .args(&[
                "--no-bootstrap=true",
                "--listen-port",
                "8169",
                "--grpc2-listen-addr",
                "127.0.0.1",
                "--grpc2-listen-port",
                "20100",
                "--data-dir",
                ".",
                "--config-dir",
                ".",
                "--baker-credentials-file",
                "bakers/baker-0-credentials.json",
            ])
            .current_dir(&new_chain_folder)
            .stdout(std::process::Stdio::piped()) // Capture stdout
            .stderr(std::process::Stdio::piped()) // Capture stderr
            .spawn()
            .expect("Failed to start the node.");

        let reader = BufReader::new(child.stderr.take().expect("Failed to capture stdout."));

        let mut state = app_state.lock().unwrap();
        state.child_process = Some(child);

        let mut lines: tokio::io::Lines<BufReader<tokio::process::ChildStderr>> = reader.lines();
        let window_clone = state.main_window.clone();
        tokio::spawn(async move {
            while let Some(line) = lines.next_line().await.expect("Failed to read line.") {
                // logging
                if let Some(window) = &window_clone {
                    //logging
                    if let Some(block_info) = parse_block_info(&line).await {
                        window.emit("new-block", block_info).unwrap();
                    }
                }
            }
        });
    } else {
        let genesis_creator_path = home_dir.join(".cargo/bin/genesis-creator");
        let output = std::process::Command::new(&genesis_creator_path)
            .args(&["generate", "--config", &toml_path.display().to_string()])
            .current_dir(&new_chain_folder) // No need to clone if you're only borrowing
            .output();

        match output {
            Ok(output) => {
                if output.status.success() {
                    println!("Command executed successfully");
                    println!("Output: {}", String::from_utf8_lossy(&output.stdout));
                } else {
                    eprintln!(
                        "Command failed with error: {}",
                        String::from_utf8_lossy(&output.stderr)
                    );
                }
            }
            Err(e) => {
                eprintln!("Error executing command: {}", e);
            }
        }

        // Finally call Concordium Node to Run the Local Chain but run it as an async command for the frontend to aknowledge
        // That it is actually running successfully.

        let mut child = AsyncCommand::new("concordium-node")
            .args(&[
                "--no-bootstrap=true",
                "--listen-port",
                "8169",
                "--grpc2-listen-addr",
                "127.0.0.1",
                "--grpc2-listen-port",
                "20100",
                "--data-dir",
                ".",
                "--config-dir",
                ".",
                "--baker-credentials-file",
                "bakers/baker-0-credentials.json",
            ])
            .current_dir(&new_chain_folder)
            .stdout(std::process::Stdio::piped()) // Capture stdout
            .stderr(std::process::Stdio::piped()) // Capture stderr
            .spawn()
            .expect("Failed to start the node.");

        let reader = BufReader::new(child.stderr.take().expect("Failed to capture stdout."));

        let mut state = app_state.lock().unwrap();
        state.child_process = Some(child);

        let mut lines: tokio::io::Lines<BufReader<tokio::process::ChildStderr>> = reader.lines();
        let window_clone = state.main_window.clone();
        tokio::spawn(async move {
            while let Some(line) = lines.next_line().await.expect("Failed to read line.") {
                // logging
                if let Some(window) = &window_clone {
                    // Logging
                    if let Some(block_info) = parse_block_info(&line).await {
                        println!("{:?}", block_info);
                        window.emit("new-block", block_info).unwrap();
                    }
                }
            }
        });
    }

    Ok(())
}

fn create_next_chain_folder(base_path: &Path) -> Result<PathBuf, String> {
    let mut counter = 1;

    loop {
        let folder_name = format!("chain-{}", counter);
        let folder_path = base_path.join(&folder_name);

        if !folder_path.exists() {
            // Create the folder and then return its path
            std::fs::create_dir(&folder_path).map_err(|e| e.to_string())?;
            return Ok(folder_path);
        }

        counter += 1;
    }
}

/* ---------------------------------------------------- KILL CHAIN COMMAND ------------------------------------------------------------------------ */
#[tauri::command]
async fn kill_chain(app_state: State<'_, Arc<Mutex<AppState>>>) -> Result<String, String> {
    // Check if there's a child process to kill.
    let child_to_kill = {
        let mut state = app_state.lock().unwrap();
        state.child_process.take() // This removes the child process from the state and gives us ownership.
    };

    if let Some(mut child) = child_to_kill {
        child.kill().await.map_err(|e| e.to_string())?;
        Ok("Killed blockchain process.".to_string())
    } else {
        // If no child process was stored in AppState, try to find and kill the concordium-node-collector process.
        task::spawn_blocking(|| {
            let output = Command::new("pgrep")
                .arg("concordium-node")
                .output()
                .expect("Failed to execute command");

            if output.status.success() {
                let pid_str = String::from_utf8_lossy(&output.stdout);
                let pid: i32 = pid_str.trim().parse().expect("Failed to parse PID as i32");

                // Kill the process
                nix::sys::signal::kill(Pid::from_raw(pid), Signal::SIGKILL)
                    .expect("Failed to kill process");
                Ok("Killed concordium-node-collector process.".to_string())
            } else {
                Err("No running concordium-node-collector process to kill.".to_string())
            }
        })
        .await
        .unwrap()
    }
}


/* ---------------------------------------------------- SUBTOOLS --------------------------------------------------------------------------- */

#[derive(Debug, serde::Serialize, Clone)]
struct UiBlockInfo {
    hash: String,
    number: u64,
    amounts: HashMap<AccountAddress, Amount>,
}

async fn parse_block_info(line: &str) -> Option<UiBlockInfo> {
    println!("Processing line: {}", line);
    let re = Regex::new(r"Block ([0-9a-f]{64}) is finalized at height (\d+)").unwrap();

    if let Some(captures) = re.captures(line) {
        let number = captures
            .get(2)
            .map_or("", |m| m.as_str())
            .parse::<u64>()
            .unwrap_or(0);

        match account_info().await {
            Ok(block_hash) => {
                let hash = block_hash.to_string();
                match amount_info(block_hash).await {
                    Ok(amounts_map) => {
                        return Some(UiBlockInfo {
                            hash,
                            number,
                            amounts: amounts_map,
                        });
                    }
                    Err(e) => {
                        eprintln!("An error occurred: {}", e);
                        return None;
                    }
                }
            }
            Err(e) => {
                eprintln!("An error occurred: {}", e);
                return None;
            }
        }
    }
    None
}

async fn amount_info(hash: BlockHash) -> anyhow::Result<HashMap<AccountAddress, Amount>> {
    let endpoint_node = Endpoint::from_str("http://127.0.0.1:20100")?;
    let mut client = v2::Client::new(endpoint_node).await?;
    let mut accounts = client.get_account_list(&hash).await?;

    let mut amounts_map = HashMap::new();
    while let Some(a) = accounts.response.next().await {
        match a {
            Ok(account_addr) => {
                let addr = AccountIdentifier::Address(account_addr.clone());
                let info = client.get_account_info(&addr, hash).await?;
                let amt = info.response.account_amount;
                amounts_map.insert(a?, amt);
            }
            Err(e) => return Err(anyhow::anyhow!("Failed to get account address: {}", e)),
        }
    }
    Ok(amounts_map)
}

async fn account_info() -> anyhow::Result<BlockHash> {
    let endpoint_node = Endpoint::from_str("http://127.0.0.1:20100")?;
    let mut client = v2::Client::new(endpoint_node).await?;
    let mut accounts = client
        .get_account_list(&v2::BlockIdentifier::LastFinal)
        .await?;
    let block = accounts.block_hash;
    let mut account_addr: Option<AccountAddress> = None;
    while let Some(a) = accounts.response.next().await {
        account_addr = a.ok();
    }
    if account_addr == None {}
    let addr = AccountIdentifier::Address(account_addr.unwrap());
    let info = client.get_account_info(&addr, block).await?;
    let hash = info.block_hash;
    Ok(hash)
}

fn main() {
    let app_state = Arc::new(Mutex::new(AppState::new()));

    tauri::Builder::default()
        .manage(app_state.clone())
        .setup(move |app| {
            // Get a reference to the main window
            let main_window = app.get_window("main").unwrap();

            // Store the window reference in the app state
            let mut state = app_state.lock().unwrap();
            state.main_window = Some(main_window);

            Ok(())
        })
        .invoke_handler(tauri::generate_handler![
            install,
            verify_installation,
            install_genesis_creator,
            launch_template,
            list_chain_folders,
            kill_chain
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
