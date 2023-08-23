

// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::fs::File;
use std::io::copy;
use std::io::Write;
use reqwest;
use dirs;
use tauri::api::file;

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
async fn install() -> Result<(), String> {
    // Detect the user's OS and architecture and generate the correct link for it.
    let download_url = if cfg!(target_os = "windows") {
        "https://example.com/concordium-node-windows.zip"
    } else if cfg!(target_os = "macos") {
        "https://distribution.concordium.software/macos/signed/concordium-node-6.0.4-0.pkg"
        
    } else if cfg!(target_os = "linux") {
        "https://distribution.mainnet.concordium.software/deb/concordium-mainnet-node_5.4.2-0_amd64.deb"
    } else {
        return Err("Unsupported OS".into());
    };

    // Change Filename Depending on OS
    let file_name = if cfg!(target_os = "windows") {
        "concordium-node-lc1c.exe"
    } else if cfg!(target_os = "macos") {
        "concordium-node-lc1c.pkg"
        
    } else if cfg!(target_os = "linux") {
        "concordium-node-lc1c.deb"
    } else {
        return Err("Unsupported OS".into());
    };



    // Download the appropriate Concordium node binary for the detected OS

    let downloads_folder = dirs::download_dir().unwrap_or_else(|| dirs::home_dir().expect("Failed to get home directory"));
    let destination = downloads_folder.join(file_name);
    let destination_str = destination.to_str().ok_or("Failed to convert path to string")?;

    match download_file(&download_url, &destination_str).await {
        Ok(_) => Ok(()),
        Err(e) => Err(e.to_string()),
    }
}

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
        },
        Err(e) => Err(e.to_string()),
    }
}


#[tauri::command]
fn install_genesis_creator() -> Result<String, String> {
    // Set the environment variable
    std::env::set_var("CARGO_NET_GIT_FETCH_WITH_CLI", "true");

    // Run the command
    let output = std::process::Command::new("cargo")
        .args(&[
            "install",
            "--git", "https://github.com/Concordium/concordium-misc-tools.git",
            "genesis-creator",
            "--locked"
        ])
        .output();

    match output {
        Ok(output) => {
            if output.status.success() {
                Ok(String::from_utf8_lossy(&output.stdout).to_string())
            } else {
                Err(String::from_utf8_lossy(&output.stderr).to_string())
            }
        },
        Err(e) => Err(e.to_string()),
    }
}


async fn download_file(url: &str, destination: &str) -> Result<(), Box<dyn std::error::Error>> {
    // Make a GET request to the URL
    let response = reqwest::get(url).await?;

    // Check if the request was successful
    if response.status() != reqwest::StatusCode::OK {
        return Err(Box::new(std::io::Error::new(std::io::ErrorKind::Other, format!("Failed to download file. HTTP response: {}", response.status()))));
    }

    // Create a new file at the destination path
    let mut dest_file = File::create(destination)?;

    // Get the entire response body as Bytes
    let content = response.bytes().await?;

    // Write the content to the file
    dest_file.write_all(&content)?;

    // Optionally, you can log the file size
    let metadata = dest_file.metadata()?;
    println!("Downloaded {} bytes to {}", metadata.len(), destination);
    // if mac OS open the file after downloading
    if cfg!(target_os = "macos") {
        std::process::Command::new("open")
            .arg(destination)
            .output()?;
    }
    Ok(())
}



fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![install, verify_installation, install_genesis_creator])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
