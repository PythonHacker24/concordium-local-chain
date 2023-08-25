import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, useNavigate } from "react-router-dom";
import { invoke } from "@tauri-apps/api/tauri";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import { listen, UnlistenFn } from '@tauri-apps/api/event'
import '@coreui/coreui/dist/css/coreui.min.css'
import { CAlert, CButton } from "@coreui/react";
import { open } from '@tauri-apps/api/shell';
import "./App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
          <div className="container prose md:prose-lg lg:prose-xl m-auto h-96">
               <h1 className=" subpixel-antialiased text-5xl font-bold">Concordium LC1C</h1>

               <p className="text-base">Follow the below steps to complete installation and running of a local node.</p>


               <CButton className="mt-2 bg-blue-700 hover:bg-blue-700 text-lg inline-flex items-center justify-center  text-center text-base font-normal text-white hover:bg-opacity-90 lg:px-8 xl:px-10 mb-3" onClick={install} disabled={installing || installationSuccess} style={{
                    backgroundColor: installationSuccess || verificationSuccess ? "green" : undefined,
                    // color: installationSuccess ? "white" : undefined
               }}
               >
                    {installing ? "Installing..." : installationSuccess || verificationSuccess ? "Node Installed!" : "Install Concordium Node"}
               </CButton>


               <CButton className="bg-blue-700 hover:bg-blue-700 text-lg inline-flex items-center justify-center  text-center text-base font-normal text-white hover:bg-opacity-90 lg:px-8 xl:px-10 mb-3" onClick={verifyInstallation} disabled={verifying || verificationSuccess} style={{
                    backgroundColor: verificationSuccess ? "green" : undefined,
               }}>
                    {verifying ? "Verifying Installation..." : verificationSuccess ? "Node Installation Verified!" : "Verify Node Installation"}
               </CButton>


               <CButton className="bg-blue-700 hover:bg-blue-700 text-lg inline-flex items-center justify-center  text-center text-base font-normal text-white lg:px-8 xl:px-10 mb-3" onClick={installCreator} disabled={installingCreator || installationSuccessCreator} style={{
                    backgroundColor: installationSuccessCreator ? "green" : undefined,
               }}>
                    {installingCreator ? "Installing..." : installationSuccessCreator ? "Genesis Creator Installed!" : "Install Genesis Creator"}
               </CButton>

               {installationSuccess && installationSuccessCreator && (
                    <CButton className="bg-blue-700 hover:bg-blue-700 text-lg inline-flex items-center justify-center  text-center text-base font-normal text-white lg:px-8 xl:px-10 mb-3" onClick={goToGenesisBuilder}>
                         Go to Genesis Builder
                    </CButton>
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
     const [launching, setLaunching] = useState(false);
     const [launched, setLaunched] = useState(false);


     const navigate = useNavigate();


     function dashboard() {
          navigate("/dashboard");
     }

     function handleOpenLink(event: React.MouseEvent<HTMLAnchorElement>) {
          event.preventDefault(); // Prevent the default behavior of the link
          open('https://raw.githubusercontent.com/Concordium/concordium-misc-tools/9d347761aadd432cbb6211a7d7ba38cdc07f1d11/genesis-creator/examples/single-baker-example-p5.toml'); // Replace with the link you want to open
     }


     const EasyConfig = () => (
          <div>
               <p>For easy configuration, the local chain will be loaded with a template genesis file found <a href="https://raw.githubusercontent.com/Concordium/concordium-misc-tools/9d347761aadd432cbb6211a7d7ba38cdc07f1d11/genesis-creator/examples/single-baker-example-p5.toml" onClick={handleOpenLink}>here</a>. </p>
               <p> Nothing else is needed. You can successfully run the local chain. </p>
          </div>
     );

     const AdvancedConfig = () => (
          <div>
               <EasyConfig />
               <label className="block mb-2 text-3xl/2 font-semibold text-black mt-3">
                    Intermediate Setting:
                    <input type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
               </label>
          </div>
     );

     const ExpertConfig = () => (
          <div>
               <AdvancedConfig />
               <label className="block mb-2 text-3xl/2 font-semibold text-black mt-3">
                    Advanced Setting:
                    <input type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
               </label>
          </div>
     );


     async function launch() {
          setLaunching(true);

          // Launch a template launch if config easy
          if (configLevel === 'easy') {
               try {
                    // Invoking the `template_launch` function on the Tauri backend
                    await invoke('template_launch');
                    setLaunching(false);
                    setLaunched(true)
               } catch (error) {
                    console.error("Error calling template_launch:", error);
               }
          } else {
               try {
                    // Invoking the `launch` function on the Tauri backend
                    await invoke('launch');
                    setLaunching(false);
               } catch (error) {
                    console.error("Error calling launch:", error);
               }
          }
     }

     return (
          <>
               <CAlert color="primary" className="m-10 text-lg">
                    <FontAwesomeIcon icon={faCircleInfo} className="mr-2" />
                    This determines the complexity of the configuration options available to you.
               </CAlert>
               <div className="flex flex-col items-center justify-center ">
                    <h2 className="text-2xl font-semibold mb-4 text-center">
                         Choose Level of Expertise:
                    </h2>
                    <div className="space-x-4 mb-8">
                         <CButton className="px-4 py-2 font-semibold text-white bg-blue-500 rounded-lg disabled:opacity-50 transition-colors duration-300 focus:bg-blue-600 active:bg-blue-700" onClick={() => setConfigLevel('easy')} disabled={launched}>Easy</CButton>

                         <CButton className="px-4 py-2 font-semibold text-white bg-blue-500 rounded-lg disabled:opacity-50" onClick={() => setConfigLevel('advanced')} disabled={launched}>Advanced</CButton>
                         <CButton className="px-4 py-2 font-semibold text-white bg-blue-500 rounded-lg disabled:opacity-50" onClick={() => setConfigLevel('expert')} disabled={launched}>Expert</CButton>

                    </div>
                    <div className="config-container">
                         {configLevel === 'easy' && <EasyConfig />}
                         {configLevel === 'advanced' && <AdvancedConfig />}
                         {configLevel === 'expert' && <ExpertConfig />}
                    </div>

                    <div className=" mt-8">
                         <button className="px-4 py-2 font-semibold text-white bg-green-500 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400" onClick={launch} disabled={launching || launched} style={{
                              backgroundColor: launched ? "green" : undefined,
                              color: launched ? "white" : undefined
                         }}>
                              {launching ? "Launching..." : launched ? "Chain Launched!" : "Launch Local Chain"}
                         </button>
                         {launched ? <button className="ml-4 px-4 py-2 font-semibold text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400" onClick={dashboard}>
                              Visit Dashboard
                         </button> : ""
                         }
                    </div>

               </div>
          </>
     );
}

/* --------------------------------------------------------- DASHBOARD PAGE ----------------------------------------------------------------------------*/

function Dashboard() {
     const [latestHash, setLatestHash] = useState("");
     const [blocks, setBlocks] = useState("");

     useEffect(() => {
          let unlistenFn: UnlistenFn | undefined;

          // Set up the listener for the 'new-block' event
          listen('new-block', (event: any) => {
               console.log("Received new block event:", event.payload);
               console.log(blocks)
               setBlocks(event.payload.number);
               setLatestHash(event.payload.hash);
          })
               .then(unlisten => {
                    unlistenFn = unlisten;
               })
               .catch(error => {
                    console.error("Error setting up listener:", error);
               });


          // Cleanup the listener when the component is unmounted
          return () => {
               if (unlistenFn) {
                    unlistenFn();
               }
          };
     }, []);
     // Function to invoke killing blockchain
     async function killChain() {
          try {
               await invoke("kill_chain");
          } catch (error) {
               console.error("Kill error:", error);
          }
     }


     return (

          <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
               <div className="md:flex">
                    <div className="p-8">
                         <div className="uppercase tracking-wide text-xl text-indigo-500 font-semibold">
                              Information
                         </div>
                         <p className="block mt-3 text-3xl/2 leading-tight font-medium text-black">
                              Block Number: {blocks}
                         </p>
                         <p className="mt-2 text-3xl/2 text-gray-500">Latest Hash: {latestHash}</p>
                         <div className="mt-4">
                              <button
                                   className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                                   onClick={killChain}
                              >
                                   Kill Local Chain
                              </button>
                         </div>
                    </div>
               </div>
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
                    <Route path="/dashboard" element={<Dashboard />} />
               </Routes>
          </Router>
     );
}


export default App;
