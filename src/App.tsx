import React, {useState } from "react";
import { BrowserRouter as Router, Route, Routes, useNavigate } from "react-router-dom";
import { invoke } from "@tauri-apps/api/tauri";
import "./App.css";

/* --------------------------------------------------------- INSTALLATION PAGE ----------------------------------------------------------------------*/

function Installer() {
  // Installation for Node
  const [installing, setInstalling] = useState(false);
  // Installation for Genesis Creator
  const [installingCreator, setInstallingCreator] = useState(false);

  const [verifying, setVerifying] = useState(false);
  const [verificationError, setVerificationError] = useState<string | null>(null);
  const [verificationSuccess, setVerificationSuccess] = useState(false);

  // Verification for Node
  const [installationSuccess, setInstallationSuccess] = useState(false);
  // Verification for Genesis Creator
  const [installationSuccessCreator, setInstallationSuccessCreator] = useState(false);

  const navigate = useNavigate();

  function goToGenesisBuilder() {
    navigate("/genesis-builder");
  }

  async function install() {
    setInstalling(true);
    try {
      await invoke("install");
      setInstallationSuccess(true);
    } catch (error) {
      console.error("Installation error:", error);

    } finally {
      setInstalling(false);
    }
  }

  async function verifyInstallation() {
    setVerifying(true);
    try {
      await invoke("verify_installation");
      setVerificationError(null); // clear any previous errors
      setVerificationSuccess(true);
      setInstallationSuccess(true);
    } catch (error) {
      console.error("Verification Failed: ", error);
      setVerificationError("Verification Failed: " + error);

    } finally {
      setVerifying(false)
    }
  }


  async function installCreator() {
    setInstallingCreator(true);
    try {
      await invoke("install_genesis_creator");
      setInstallationSuccessCreator(true);
    } catch (error) {
      console.error("Installation error:", error);

    } finally {
      setInstallingCreator(false);
    }
  }
  return (
    <div className="container">
      <h1>Concordium LC1C</h1>
      
      <p>Follow the below steps to complete installation and running of a local node.</p>


      <button onClick={install} disabled={installing || installationSuccess} style={{ 
          backgroundColor: installationSuccess || verificationSuccess ? "green" : undefined,
          color: installationSuccess ? "white" : undefined}}
      >
      {installing ? "Installing..." : installationSuccess || verificationSuccess ? "Node Installed!" : "Install Concordium Node"}
      </button>


      <button onClick={verifyInstallation} disabled={verifying || verificationSuccess} style={{ 
          backgroundColor: verificationSuccess ? "green" : undefined,
          color: verificationSuccess ? "white" : undefined
        }}>
      {verifying ? "Verifying Installation..." : verificationSuccess ? "Node Installation Verified!" : "Verify Node Installation"}
      </button>


      <button onClick={installCreator} disabled={installingCreator || installationSuccessCreator} style={{ 
          backgroundColor: installationSuccessCreator ? "green" : undefined,
          color: installationSuccess ? "white" : undefined}}>
      {installingCreator ? "Installing..." : installationSuccessCreator ? "Genesis Creator Installed!" : "Install Genesis Creator"}
      </button>

      {installationSuccess && installationSuccessCreator && (
        <button onClick={goToGenesisBuilder}>
          Go to Genesis Builder
        </button>
      )}

      
      {verificationError && (
        <div className="error">
          {verificationError}
        </div>
      )}

    </div>
  );
}


/* --------------------------------------------------------- GENESIS BUILDER PAGE ----------------------------------------------------------------------*/


function GenesisBuilder() {
  const [configLevel, setConfigLevel] = useState<string | null>(null);

  const EasyConfig = () => (
    <div>
      <label>
        Basic Setting:
        <input type="text" />
      </label>
    </div>
  );

  const AdvancedConfig = () => (
    <div>
      <EasyConfig />
      <label>
        Intermediate Setting:
        <input type="text" />
      </label>
    </div>
  );

  const ExpertConfig = () => (
    <div>
      <AdvancedConfig />
      <label>
        Advanced Setting:
        <input type="text" />
      </label>
    </div>
  );

  return (
    <div>
      <h2>
        Choose Level of Expertise:
        <span className="info-icon">
          ℹ
          <span className="tooltip">This determines the complexity of the configuration options available to you.</span>
        </span>
      </h2>
      <div>
        <button onClick={() => setConfigLevel('easy')}>Easy</button>
        <button onClick={() => setConfigLevel('advanced')}>Advanced</button>
        <button onClick={() => setConfigLevel('expert')}>Expert</button>
      </div>

      {configLevel === 'easy' && <EasyConfig />}
      {configLevel === 'advanced' && <AdvancedConfig />}
      {configLevel === 'expert' && <ExpertConfig />}
    </div>
  );
}





/* --------------------------------------------------------- FULL APPLICATION ----------------------------------------------------------------------*/

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/genesis-builder" element={<GenesisBuilder />} />
        <Route path="/" element={<Installer />} />
      </Routes>
    </Router>
  );
}


export default App;
