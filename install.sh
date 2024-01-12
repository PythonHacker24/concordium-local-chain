#!/bin/bash

# Clone the repository
echo
echo "[+] Cloning the repository" 
echo
git clone "https://github.com/Concordium/concordium-local-chain.git"

# Check if cloning was successful
if [ $? -ne 0 ]; then
    echo
    echo "[-] Error: Cloning the repository failed. Exiting."
    exit 1
fi

cd concordium-local-chain
cd src

# Yarn install the frontend files 
echo
echo "[+] Getting the front-end files built up"
echo
yarn install

# Check if yarn install was successful
if [ $? -ne 0 ]; then
    echo
    echo "[-] Error: Yarn install failed. Exiting."
    exit 1
fi

echo
echo "[+] Getting the Tauri files built up"
echo
cd ../src-tauri

# Cargo build the Tauri files 
cargo build --release 

# Check if cargo build was successful
if [ $? -ne 0 ]; then
    echo
    echo "[-] Error: Cargo build failed. Exiting."
    exit 1
fi

echo
echo "[+] Done the Installation!"
echo 
echo "[+] Run: yarn run tauri dev"
echo "    to get it run in development environment"
