
use ar;
use concordium_rust_sdk::smart_contracts::common::{AccountAddress, Amount};
use concordium_rust_sdk::types::smart_contracts::InstanceInfo;
use concordium_rust_sdk::types::{AbsoluteBlockHeight, BlockItemSummary};
use concordium_rust_sdk::v2::{self, AccountIdentifier};
use concordium_rust_sdk::{endpoints::Endpoint, types::hashes::BlockHash};
use dirs;
use futures::StreamExt;
use lzma_rs;
#[cfg(not(target_os = "windows"))]
use nix::sys::signal::Signal;
#[cfg(not(target_os = "windows"))]
use nix::unistd::Pid;
use regex::Regex;
use reqwest;
use serde::{Deserialize, Serialize};
use serde_json::Value as JsonValue;
use std::collections::HashMap;
use std::error::Error;
use std::fs;
use std::fs::File;
// #[cfg(not(target_os = "windows"))]
use std::fs::Permissions;
use std::io::Write;
use std::io::{self, Cursor};
#[cfg(not(target_os = "windows"))]
// #[cfg(target_os = "linux")]
use std::os::unix::fs::PermissionsExt;
use std::path::{Path, PathBuf};
use std::process::Command;
use std::str::FromStr;
use std::sync::{Arc, Mutex};
use tar::Archive;
use tauri::State;
use tauri::{Manager, Window};
use tokio::io::{AsyncBufReadExt, BufReader};
use tokio::process::Child;
use tokio::process::Command as AsyncCommand;
use tokio::task;
use toml::Value as TomlValue;
///  Function to install concordium-node binary at $HOME/.local/bin
/// for debian based linux distrbution or other supported distributions

pub fn install_node_on_debian(url: &str) -> Result<(), Box<dyn std::error::Error>> {
    let mut dest_path = dirs::home_dir().unwrap();
    dest_path.push(".local/bin/concordium-node");
    let data = reqwest::blocking::get(url)?.bytes()?;

    let mut ar = ar::Archive::new(Cursor::new(data));
    while let Some(entry_result) = ar.next_entry() {
        let entry = entry_result?;
        if entry.header().identifier() == b"data.tar.xz" {
            let mut archive = Vec::new();
            lzma_rs::xz_decompress(&mut std::io::BufReader::new(entry), &mut archive)?;

            let mut archive = Archive::new(Cursor::new(archive));
            for file in archive.entries()? {
                let mut file = file?;
                if is_target_file(&file.path()?) {
                    let mut out_file = File::create(&dest_path)?;
                    io::copy(&mut file, &mut out_file)?;
                    // Only compiled for linux
                    #[cfg(target_os = "linux")]
                    {
                        out_file.set_permissions(Permissions::from_mode(0o755))?;
                    }

                    break;
                }
            }
            break;
        }
    }
    Ok(())
}
/// check if the target file exists or not
fn is_target_file(path: &std::path::Path) -> bool {
    path.display()
        .to_string()
        .starts_with("./usr/bin/concordium-mainnet-node-6")
}
