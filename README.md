# Concordium LC1C

The Concordium LC1C GUI tool source code built using Tauri and Rust.
LC1C allows to launch a custom local chain on local OS in less than two minutes. 

## Prerequisites

Before you begin, ensure you have the following installed:

- [Rust and Cargo](https://rustup.rs/)
- [Node.js](https://nodejs.org/)
- [Yarn](https://yarnpkg.com/) (or npm)

## Installation

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/your-repository-url/concordium-lc1c.git
   cd concordium-lc1c
   ```

2. **Install Frontend Dependencies**:
Navigate to the frontend directory (assuming it's named frontend):
    ```bash
    cd frontend
    yarn install
    ````

3. **Install Rust Dependencies**:
Navigate back to the root directory and install the Rust dependencies:
    ```bash
    cd ..
    cargo build --release
    ```

## Launching In Development Mode
```bash
yarn run tauri dev
```

## Building for Production
To build the Tauri app, you can easily run: 
```bash
yarn run tauri build
```
Please note that the application would be compiled for the OS you are currently running. 
