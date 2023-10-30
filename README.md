# Concordium LC1C

The Concordium LC1C GUI tool source code built using Tauri and Rust. This README goes over the basic steps to clone the repository and test in development. To understand more about the tool, visit [Documentation](https://github.com/Concordium/concordium-local-chain/blob/main/DOCUMENTATION.md)

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

## Documentation
To go over the documentation of the tool and troubleshooting please read [this](https://github.com/Concordium/concordium-local-chain/blob/main/DOCUMENTATION.md).
