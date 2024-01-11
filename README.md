# Concordium LC1C: Local Chain 1 Click for Concordium Blockchain Development 🌐

The Concordium-LC1C Project is a GUI Tool built in Rust and Tauri, allowing developers to launch custom Local Chain on Local Operating System in no time. Concordium LC1C is an essential graphical user interface (GUI) tool for developers eager to build and deploy local chains on the Concordium blockchain. It simplifies the process of setting up a local environment, allowing developers to focus on creating innovative contracts and applications.

## Concordium Blockchain Platform ⚡️

Concordium is a blockchain network designed with a focus on balancing privacy and accountability. It is distinct in its approach to identity management and compliance, aiming to create an environment that is conducive for both individual users and enterprises, especially those looking for blockchain solutions that meet regulatory standards.

## Prerequisites and Dependencies 📦

The Concordium-LC1C Project makes use of the following technologies for it's functionality. It is recommended to use the latest versions of them.
- [Rust and Cargo](https://rustup.rs/)
- [Node.js](https://nodejs.org/)
- [Yarn](https://yarnpkg.com/) (or npm)
During installation, LC1C will verify that all necessary tools are installed and operational. Once confirmed, developers can proceed to the next stage: the Genesis Builder.

## Installation and Setup 🛠

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
    ```

3. **Install Rust Dependencies**: 
Navigate back to the root directory and install the Rust dependencies:
    ```bash
    cd ..
    cargo build --release
    ```

## Launching In Development Mode 🏗️
```bash
yarn run tauri dev
```

## Building for Production 🚀
To build the Tauri app, you can easily run: 
```bash
yarn run tauri build
```
Please note that the application would be compiled for the OS you are currently running. 

## Contribution 🤝

Open source plays a pivotal role in the development and success of Concordium LC1C. By embracing an open-source model, LC1C benefits from a diverse community of developers who contribute their unique skills and perspectives, driving innovation and ensuring robust, secure software. This collaborative approach accelerates the tool's evolution, addressing the specific needs of developers building on the Concordium blockchain more efficiently.

Concordium LC1C is an open-source project, and contributions are welcome. Whether you're fixing bugs, improving the documentation, or adding new features, your input is invaluable. 

## Official Documentation and Troubleshooting Guide 📖
If you encounter issues, particularly with Concordium Node installation, the documentation provides guidance on troubleshooting common problems, such as permission issues on the operating system.

[Documentation for Concordium L1LC](https://github.com/Concordium/concordium-local-chain/blob/main/DOCUMENTATION.md)

## Stay Connected 🍀
Join our community to stay updated with the latest developments and connect with other Concordium enthusiasts. Together, let's build the future of blockchain technology. 
