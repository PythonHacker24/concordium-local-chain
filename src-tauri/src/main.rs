// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use concordium_rust_sdk::smart_contracts::common::{AccountAddress, Amount};
use concordium_rust_sdk::types::{
    AbsoluteBlockHeight, BlockItemSummary, ContractAddress, ContractSubIndex, TransactionStatus,
};
use concordium_rust_sdk::v2::{self, AccountIdentifier};
use concordium_rust_sdk::{endpoints::Endpoint, types::hashes::BlockHash};
use dirs;
use futures::StreamExt;
#[cfg(not(target_os = "windows"))]
use nix::sys::signal::{self, Signal};
#[cfg(not(target_os = "windows"))]
use nix::unistd::{self, Pid};
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
    let binary = if cfg!(target_os = "windows") {
        r"C:\Program Files\Concordium\Node 6.0.4\concordium-node.exe"
    } else {
        "concordium-node"
    };
    let output = std::process::Command::new(binary).arg("--version").output();

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
fn install_genesis_creator() -> anyhow::Result<String, String> {
    std::env::set_var("CARGO_NET_GIT_FETCH_WITH_CLI", "true");

    if cfg!(target_os = "windows") {
        let genesis_installed = std::process::Command::new("genesis-creator")
            .args(&["--help"])
            .output();

        match genesis_installed {
            Ok(genesis_installed_output) => {
                if !genesis_installed_output.status.success() {
                    // Clone the repository
                    let clone_output = std::process::Command::new("git")
                        .args(&[
                            "clone",
                            "--recurse-submodules",
                            "https://github.com/Concordium/concordium-misc-tools.git",
                        ])
                        .output();

                    if let Err(e) = clone_output {
                        return Err(format!("Failed to clone the repository: {}", e));
                    }

                    // Install using cargo
                    let install_output = std::process::Command::new("cargo")
                        .args(&[
                            "install",
                            "--path",
                            "concordium-misc-tools/genesis-creator/",
                            "--locked",
                        ])
                        .output();

                    if let Err(e) = install_output {
                        return Err(format!("Failed to install with cargo: {}", e));
                    }

                    // Delete the cloned directory
                    let delete_output = std::process::Command::new("powershell")
                        .arg("-Command")
                        .arg("Remove-Item -Path ./concordium-misc-tools/ -Recurse -Force")
                        .output();

                    if let Err(e) = delete_output {
                        return Err(format!("Failed to delete the directory: {}", e));
                    }
                }
            }
            Err(_) => {
                return Err("Failed to check if genesis-creator is installed".to_string());
            }
        }
    } else {
        println!("Not windows");
        let output = std::process::Command::new("cargo")
            .args(&[
                "install",
                "--git",
                "https://github.com/Concordium/concordium-misc-tools.git",
                "genesis-creator",
                "--locked",
            ])
            .output();
        println!("Output: {:#?}", output);
        match output {
            Ok(output_data) => {
                if output_data.status.success() {
                    return Ok(String::from_utf8_lossy(&output_data.stdout).to_string());
                } else {
                    return Err(String::from_utf8_lossy(&output_data.stderr).to_string());
                }
            }
            Err(e) => return Err(format!("Cargo install command failed: {}", e)),
        }
    }
    Ok("Successfully installed genesis-creator".to_string())
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

    chain_folders.sort_by(|a, b| {
        let a_num: i32 = a["chain-".len()..].parse().unwrap_or(0);
        let b_num: i32 = b["chain-".len()..].parse().unwrap_or(0);
        a_num.cmp(&b_num)
    });
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

            println!("Hello string = {:#?}", toml_string);

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
        let binary = if cfg!(target_os = "windows") {
            r"C:\Program Files\Concordium\Node 6.0.4\concordium-node.exe"
        } else {
            "concordium-node"
        };
        let mut child = AsyncCommand::new(binary)
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
        let mut transaction_summaries = Vec::new();
        let window_clone = state.main_window.clone();
        tokio::spawn(async move {
            while let Some(line) = lines.next_line().await.expect("Failed to read line.") {
                // logging
                if let Some(window) = &window_clone {
                    //logging
                    if let Some(block_info) =
                        parse_block_info(line, &mut transaction_summaries).await
                    {
                        window.emit("new-block", block_info).unwrap();
                    }
                }
            }
        });
    } else {
        let binary = if cfg!(target_os = "windows") {
            "genesis-creator".to_string()
        } else {
            home_dir
                .join(".cargo/bin/genesis-creator")
                .display()
                .to_string()
        };

        let output = std::process::Command::new(&binary)
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

        let binary = if cfg!(target_os = "windows") {
            r"C:\Program Files\Concordium\Node 6.0.4\concordium-node.exe"
        } else {
            "concordium-node"
        };
        let mut child = AsyncCommand::new(binary)
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
        let mut transaction_summaries = Vec::new();
        let window_clone = state.main_window.clone();
        tokio::spawn(async move {
            while let Some(line) = lines.next_line().await.expect("Failed to read line.") {
                // logging
                if let Some(window) = &window_clone {
                    // Logging
                    if let Some(block_info) =
                        parse_block_info(line, &mut transaction_summaries).await
                    {
                        window.emit("new-block", block_info).unwrap();
                    }
                }
            }
        });
    }

    Ok(())
}

async fn parse_block_info(
    line: String,
    summaries: &mut Vec<BlockItemSummary>,
) -> Option<UiBlockInfo> {
    println!("Processing line: {:?}", line);
    println!("Transaction Summarry: {:#?}", summaries);
    let (block_hash, number) = account_info()
        .await
        .map_err(|e| {
            eprintln!("Error fetching account info: {}", e);
            e
        })
        .ok()?;

    let amounts_map = amount_info(block_hash)
        .await
        .map_err(|e| {
            eprintln!("Error fetching amount info: {}", e);
            e
        })
        .ok()?;

    let contracts_map = instance_list(block_hash)
        .await
        .map_err(|e| {
            eprintln!("Error fetching instance list: {}", e);
            e
        })
        .ok()?;

    transaction_info(block_hash, summaries)
        .await
        .map_err(|e| {
            eprintln!("Error fetching transaction info: {}", e);
            e
        })
        .ok()?;

    Some(UiBlockInfo {
        hash: block_hash.to_string(),
        number,
        amounts: amounts_map,
        contracts: contracts_map,
        transactions: summaries.clone(),
    })
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

    #[cfg(target_os = "windows")]
    {
        // Windows implementation using taskkill command
        let output = Command::new("taskkill")
            .args(&["/F", "/IM", "concordium-node.exe"])
            .output()
            .expect("Failed to execute command");

        println!("gassi,{:#?}", output.status.success());

        if output.status.success() {
            Ok("Killed concordium-node-collector process.".to_string())
        } else {
            Err("No running concordium-node-collector process to kill.".to_string())
        }
    }
    #[cfg(not(target_os = "windows"))]
    {
        // Unix-like systems implementation using pgrep and kill
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
    number: AbsoluteBlockHeight,
    amounts: HashMap<AccountAddress, Amount>,
    contracts: HashMap<ContractAddress, Amount>,
    transactions: Vec<BlockItemSummary>,
}

async fn instance_list(hash: BlockHash) -> anyhow::Result<HashMap<ContractAddress, Amount>> {
    let endpoint_node = Endpoint::from_str("http://127.0.0.1:20100")?;
    let mut client = v2::Client::new(endpoint_node).await?;
    let mut contracts = client.get_instance_list(&hash).await?;
    let mut amounts_map = HashMap::new();
    while let Some(a) = contracts.response.next().await {
        match a {
            Ok(contract_addr) => {
                let info = client.get_instance_info(contract_addr, &hash).await?;
                println!("{:#?}", info);
                let amt = info.response.amount();
                amounts_map.insert(a?, amt);
            }
            Err(e) => return Err(anyhow::anyhow!("Failed to get contract address: {}", e)),
        }
    }
    Ok(amounts_map)
}

async fn transaction_info(
    hash: BlockHash,
    summaries: &mut Vec<BlockItemSummary>,
) -> anyhow::Result<()> {
    let endpoint_node = Endpoint::from_str("http://127.0.0.1:20100")?;
    let mut client = v2::Client::new(endpoint_node).await?;
    let res = client.get_block_transaction_events(&hash).await?;
    let mut transactions = res.response;
    while let Some(item) = transactions.next().await {
        match item {
            Ok(summary) => {
                summaries.push(summary);
            }
            Err(e) => {
                return Err(anyhow::anyhow!(
                    "Error fetching transaction event for hash {:?}: {}",
                    hash,
                    e
                ))
            }
        }
    }
    Ok(())
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
                amounts_map.insert(account_addr, amt);
            }
            Err(e) => {
                return Err(anyhow::anyhow!(
                    "Failed to get account address for hash {:?}: {}",
                    hash,
                    e
                ))
            }
        }
    }
    Ok(amounts_map)
}

async fn account_info() -> anyhow::Result<(BlockHash, AbsoluteBlockHeight)> {
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
    let blocks = client.get_block_info(&block).await?;
    let block_number = blocks.response.block_height;
    Ok((hash, block_number))
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
