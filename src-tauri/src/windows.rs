use regex::Regex;
use std::error::Error;

use std::fs;
use std::path::{Path, PathBuf};

use std::process::Command;
use tauri::AppHandle;

fn find_concordium_node_executable() -> Result<PathBuf, Box<dyn Error>> {
    let paths = vec![
        Path::new(r"C:\Program Files\Concordium"),
        dirs::home_dir().ok_or("Could not find home directory")?,
    ];

    let pattern = Regex::new(r"Node \d+\.\d+\.\d+")?;

    for base_path in paths {
        if base_path.exists() && base_path.is_dir() {
            for entry in fs::read_dir(base_path)? {
                let entry = entry?;
                let path = entry.path();
                if path.is_dir() {
                    if let Some(dir_name) = path.file_name().and_then(|n| n.to_str()) {
                        if pattern.is_match(dir_name) {
                            let executable_path = path.join("concordium-node.exe");
                            if executable_path.exists() {
                                return Ok(executable_path);
                            }
                        }
                    }
                }
            }
        }
    }

    Err("Concordium Node executable not found".into())
}

/* ---------------------------------------------------- INSTALL Genesis COMMAND ------------------------------------------------------------ */

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

    let _metadata = dest_file.metadata()?;
    println!("Downloaded {} bytes to {}", _metadata.len(), destination);

    Ok(())
}
