import React, { useEffect, useState } from "react";
import {
  CModalFooter,
  CModal,
  CModalHeader,
  CModalBody,
  CModalTitle,
  CCardImage,
} from "@coreui/react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import { invoke } from "@tauri-apps/api/tauri";
import {
  faArrowAltCircleRight,
  faCheck,
  faCheckToSlot,
  faCircleInfo,
  faCloudDownload,
  faDownload,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { listen, UnlistenFn } from "@tauri-apps/api/event";
import { CAlert, CFormLabel, CFormSelect } from "@coreui/react";
import { open } from "@tauri-apps/api/shell";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  // AdvancedSettingsPage,
  ExpertSettingsPage,
  SettingsPage,
} from "./components";

import { concordiumImg } from "./";
import { concordiumMiscTools } from "./";
/* --------------------------------------------------------- INSTALLATION PAGE ----------------------------------------------------------------------*/

function Installer() {
  // Installation for Node
  const [installing, setInstalling] = useState(false);
  const [installationError, setInstallationError] = useState<string | null>(
    null
  );

  // Installation for Genesis Creator
  const [installingCreator, setInstallingCreator] = useState(false);

  const [verifying, setVerifying] = useState(false);
  const [verificationError, setVerificationError] = useState<string | null>(
    null
  );
  const [verificationSuccess, setVerificationSuccess] = useState(false);

  // Verification for Node
  const [installationSuccess, setInstallationSuccess] = useState(false);
  // Verification for Genesis Creator
  const [installationSuccessCreator, setInstallationSuccessCreator] =
    useState(false);

  const navigate = useNavigate();

  function goToGenesisBuilder() {
    navigate("/genesis-builder");
  }

  async function install() {
    setInstalling(true);
    try {
      await invoke("install");
      setInstallationSuccess(true);
      setInstallationError(null);
    } catch (error) {
      console.error("Installation error:", error);
      setInstallationSuccess(false);
      setInstallationError("Installation failed. Please try again.");
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
      setVerifying(false);
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
    <div className="container mx-auto p-4 m-[10%]">
      <div className="flex justify-content-center">
        <CCardImage src={concordiumImg} style={{ width: 120 }}></CCardImage>
      </div>
      <div className="text-5xl  text-center text-primary-dark text-bold">
        Concordium LC1C
      </div>

      <div className="my-5 text-xl text-primary-dark text-center">
        Follow the below steps to complete installation and running of a local
        node.
      </div>
      <button
        onClick={install}
        disabled={installing || installationSuccess}
        className={`  hover:text-white flex p-0 items-center mx-auto my-2  rounded-3 text-white shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.3)] ${
          installing
            ? "bg-secondary-dark hover:bg-secondary-dark"
            : installationSuccess || verificationSuccess
            ? "bg-success"
            : "bg-primary-light hover:bg-primary-dark"
        }`}
      >
        {installationSuccess ? (
          <div className=" rounded-l-lg  border-background-light bg-background-light text-success m-0">
            <FontAwesomeIcon icon={faCheck} className="p-2   " fontSize={25} />
          </div>
        ) : (
          <div className=" rounded-l-lg  border-background-light bg-background-light text-primary-light m-0">
            <FontAwesomeIcon
              icon={faDownload}
              className="p-2   "
              fontSize={25}
            />
          </div>
        )}

        <div className={`border-none  px-2 sm:w-80 md:w-34 text-lg `}>
          {installing
            ? "Installing..."
            : installationSuccess || verificationSuccess
            ? "Node Installed!"
            : "Install Concordium Node"}
        </div>
      </button>
      {installationError && (
        <div className="flex justify-center text-danger">
          {installationError}
        </div>
      )}
      <button
        className={`  hover:text-white rounded-3 flex p-0 items-center mx-auto my-2  text-white shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.3)] ${
          verifying
            ? "bg-secondary-dark hover:bg-secondary-dark"
            : verificationSuccess
            ? "bg-success"
            : "bg-primary-light hover:bg-primary-dark"
        }`}
        onClick={verifyInstallation}
        disabled={verifying || verificationSuccess}
      >
        {verificationSuccess ? (
          <div className=" rounded-l-lg  border-background-light bg-background-light text-success m-0">
            <FontAwesomeIcon icon={faCheck} className="p-2   " fontSize={25} />
          </div>
        ) : (
          <div className=" rounded-l-lg  border-background-light bg-background-light text-primary-light m-0">
            <FontAwesomeIcon
              icon={faCheckToSlot}
              className="p-2   "
              fontSize={25}
            />
          </div>
        )}
        <div className={`border-none px-2 rounded-3 sm:w-80 md:w-34 text-lg `}>
          {verifying
            ? "Verifying Installation..."
            : verificationSuccess
            ? "Node Installation Verified!"
            : "Verify Node Installation"}
        </div>
      </button>

      <button
        className={`   hover:text-white flex p-0 rounded-3 items-center mx-auto my-2  text-white shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.3)] ${
          installingCreator
            ? "bg-secondary-dark hover:bg-secondary-dark"
            : installationSuccessCreator
            ? "bg-success"
            : "bg-primary-light hover:bg-primary-dark"
        }`}
        onClick={installCreator}
        disabled={installingCreator || installationSuccessCreator}
      >
        {installationSuccessCreator ? (
          <div className=" rounded-l-lg  border-background-light bg-background-light text-success m-0">
            <FontAwesomeIcon icon={faCheck} className="p-2" fontSize={25} />
          </div>
        ) : (
          <div className=" rounded-l-lg  border-background-light bg-background-light text-primary-light m-0">
            <FontAwesomeIcon
              icon={faCloudDownload}
              className="p-2"
              fontSize={25}
            />
          </div>
        )}
        <div className={`border-none px-2 sm:w-80 md:w-34 text-lg `}>
          {installingCreator
            ? "Installing..."
            : installationSuccessCreator
            ? "Genesis Creator Installed!"
            : "Install Genesis Creator"}
        </div>
      </button>

      {installationSuccess && installationSuccessCreator && (
        <button
          className="  hover:bg-primary-dark rounded-3 bg-primary-light hover:text-white flex p-0 items-center mx-auto my-2  text-white shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.3)]"
          onClick={goToGenesisBuilder}
        >
          <div className=" rounded-l-lg  border-background-light bg-background-light text-primary-light m-0">
            <FontAwesomeIcon
              icon={faArrowAltCircleRight}
              className="p-2   "
              fontSize={25}
            />
          </div>{" "}
          <div className="border-none px-2 sm:w-80 md:w-34 text-lg">
            Go to Genesis Builder
          </div>
        </button>
      )}

      {verificationError && <div className="error">{verificationError}</div>}
    </div>
  );
}

/* --------------------------------------------------------- GENESIS BUILDER PAGE ----------------------------------------------------------------------*/

function GenesisBuilder() {
  const [configLevel, setConfigLevel] = useState<string | null>(null);
  const [launching, setLaunching] = useState(false);
  const [launched, setLaunched] = useState(false);
  const [tomlData, settomlData] = useState(null);
  const [chainFolders, setChainFolders] = useState<string[]>([]);
  const [selectedFolder, setSelectedFolder] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    protocolVersion: "5",
    out: {
      updateKeys: "./update-keys",
      accountKeys: "./accounts",
      bakerKeys: "./bakers",
      identityProviders: "./idps",
      anonymityRevokers: "./ars",
      genesis: "./genesis.dat",
      cryptographicParameters: "./global",
      deleteExisting: true,
      genesisHash: "./genesis_hash",
    },
    cryptographicParameters: {
      kind: "generate",
      genesisString: "Local genesis parameters.",
    },
    anonymityRevokers: [
      {
        kind: "fresh",
        id: 1,
        repeat: 3,
      },
    ],
    identityProviders: [
      {
        kind: "fresh",
        id: 0,
        repeat: 3,
      },
    ],
    accounts: [
      {
        kind: "fresh",
        balance: "3500000000000000",
        stake: "3000000000000000",
        template: "baker",
        identityProvider: 0,
        numKeys: 1,
        threshold: 1,
        repeat: 1,
      },
      {
        kind: "fresh",
        balance: "10000000000000000",
        template: "foundation",
        identityProvider: 0,
        numKeys: 1,
        threshold: 1,
        repeat: 1,
        foundation: true,
      },
      {
        kind: "fresh",
        balance: "2000000000000",
        template: "stagenet",
        identityProvider: 0,
        numKeys: 1,
        threshold: 1,
        repeat: 100,
      },
    ],
    updates: {
      root: {
        threshold: 5,
        keys: [
          {
            kind: "fresh",
            repeat: 7,
          },
        ],
      },
      level1: {
        threshold: 7,
        keys: [
          {
            kind: "fresh",
            repeat: 15,
          },
        ],
      },
      level2: {
        keys: [
          {
            kind: "fresh",
            repeat: 7,
          },
        ],
        emergency: {
          authorizedKeys: [0, 1, 2, 3, 4, 5, 6],
          threshold: 7,
        },
        protocol: {
          authorizedKeys: [0, 1, 2, 3, 4, 5, 6],
          threshold: 7,
        },
        electionDifficulty: {
          authorizedKeys: [0, 1, 2, 3, 4, 5, 6],
          threshold: 7,
        },
        euroPerEnergy: {
          authorizedKeys: [0, 1, 2, 3, 4, 5, 6],
          threshold: 7,
        },
        microCCDPerEuro: {
          authorizedKeys: [0, 1, 2, 3, 4, 5, 6],
          threshold: 7,
        },
        foundationAccount: {
          authorizedKeys: [0, 1, 2, 3, 4, 5, 6],
          threshold: 7,
        },
        mintDistribution: {
          authorizedKeys: [0, 1, 2, 3, 4, 5, 6],
          threshold: 7,
        },
        transactionFeeDistribution: {
          authorizedKeys: [0, 1, 2, 3, 4, 5, 6],
          threshold: 7,
        },
        gasRewards: {
          authorizedKeys: [0, 1, 2, 3, 4, 5, 6],
          threshold: 7,
        },
        poolParameters: {
          authorizedKeys: [0, 1, 2, 3, 4, 5, 6],
          threshold: 7,
        },
        addAnonymityRevoker: {
          authorizedKeys: [0, 1, 2, 3, 4, 5, 6],
          threshold: 7,
        },
        addIdentityProvider: {
          authorizedKeys: [0, 1, 2, 3, 4, 5, 6],
          threshold: 7,
        },
        cooldownParameters: {
          authorizedKeys: [0, 1, 2, 3, 4, 5, 6],
          threshold: 7,
        },
        timeParameters: {
          authorizedKeys: [0, 1, 2, 3, 4, 5, 6],
          threshold: 7,
        },
      },
    },
    parameters: {
      slotDuration: 250,
      leadershipElectionNonce:
        "d1bc8d3ba4afc7e109612cb73acbdddac052c93025aa1f82942edabb7deb82a1",
      epochLength: 900,
      maxBlockEnergy: 3000000,
      finalization: {
        minimumSkip: 0,
        committeeMaxSize: 1000,
        waitingTime: 100,
        skipShrinkFactor: 0.5,
        skipGrowFactor: 2,
        delayShrinkFactor: 0.5,
        delayGrowFactor: 2,
        allowZeroDelay: true,
      },
      chain: {
        version: "v1",
        electionDifficulty: 0.05,
        euroPerEnergy: 0.000001,
        microCCDPerEuro: 100000000,
        accountCreationLimit: 10,
        timeParameters: {
          rewardPeriodLength: 4,
          mintPerPayday: 0.000261157877,
        },
        poolParameters: {
          passiveFinalizationCommission: 1,
          passiveBakingCommission: 0.1,
          passiveTransactionCommission: 0.1,
          finalizationCommissionRange: {
            min: 0.5,
            max: 1,
          },
          bakingCommissionRange: {
            min: 0.05,
            max: 0.1,
          },
          transactionCommissionRange: {
            min: 0.05,
            max: 0.2,
          },
          minimumEquityCapital: "100",
          capitalBound: 0.25,
          leverageBound: {
            numerator: 3,
            denominator: 1,
          },
        },
        cooldownParameters: {
          poolOwnerCooldown: 3600,
          delegatorCooldown: 1800,
        },
        rewardParameters: {
          mintDistribution: {
            bakingReward: 0.6,
            finalizationReward: 0.3,
          },
          transactionFeeDistribution: {
            baker: 0.45,
            gasAccount: 0.45,
          },
          gASRewards: {
            baker: 0.25,
            finalizationProof: 0.005,
            accountCreation: 0.02,
            chainUpdate: 0.005,
          },
        },
      },
    },
  });

  const navigate = useNavigate();
  const HandleSubmit = (formData: any) => {
    console.log(formData);
    setFormData(formData);
  };
  const expertHandleSubmit = (tomlData: any) => {
    console.log(tomlData);
    settomlData(tomlData);
  };

  function dashboard() {
    navigate("/dashboard");
  }

  function handleOpenLink(event: React.MouseEvent<HTMLAnchorElement>) {
    event.preventDefault(); // Prevent the default behavior of the link
    open(`${concordiumMiscTools}`); // Replace with the link you want to open
  }

  const EasyConfig = () => (
    <div className="container mx-auto p-4 ">
      <p className="text-xl text-slate">
        For easy configuration, the local chain will be loaded with a template
        genesis file found{" "}
        <a
          href={concordiumMiscTools}
          onClick={handleOpenLink}
          className="text-blue-500 hover:underline"
        >
          here
        </a>
        .
      </p>
      <p className="text-xl mt-4">
        Nothing else is needed. You can successfully run the local chain.
      </p>
    </div>
  );

  const AdvancedConfig = () => (
    <div className="text-white text-normal text-center">
      <p>This is config settings for Advanced users.</p>
      {launching || launched ? (
        ""
      ) : (
        <SettingsPage
          formData={formData}
          setFormData={setFormData}
          onHandleSubmit={HandleSubmit}
        />
      )}
    </div>
  );

  const ExpertConfig = () => (
    <div className="text-white text-normal text-center">
      <p>This is config settings for Expert users.</p>
      {launching || launched ? (
        ""
      ) : (
        <ExpertSettingsPage onHandleSubmit={expertHandleSubmit} />
      )}
    </div>
  );

  const FromExisting = () => (
    <div className="mt-4">
      <CFormLabel htmlFor="select-option" className="text-white text-xl mb-2">
        Select a chain folder:
      </CFormLabel>
      <CFormSelect
        id="select-option"
        className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg text-black focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-400"
        value={selectedFolder || ""}
        onChange={(e) => setSelectedFolder(e.target.value)}
      >
        <option value="" disabled>
          Select folder
        </option>
        {chainFolders.map((folder) => (
          <option key={folder} value={folder}>
            {folder}
          </option>
        ))}
      </CFormSelect>
    </div>
  );

  async function launch() {
    setLaunching(true);
    let launch_mode = null;
    console.log(configLevel);

    if (configLevel === "easy") {
      launch_mode = { Easy: null };
    } else if (configLevel === "advanced") {
      launch_mode = { Advanced: JSON.stringify(formData) };
    } else if (configLevel === "existing") {
      launch_mode = { FromExisting: selectedFolder };
    } else {
      launch_mode = { Expert: tomlData };
    }
    try {
      console.log(launch_mode);
      await invoke("launch_template", { launchMode: launch_mode });
      setLaunching(false);
      setLaunched(true);
    } catch (error) {
      console.error("Error calling launch_template:", error);
      setLaunching(false);
    }
  }
  useEffect(() => {
    async function fetchChainFolders() {
      try {
        localStorage.clear();
        const folders = await invoke("list_chain_folders");
        setChainFolders(folders as any);
      } catch (error) {
        console.error("Error fetching chain folders:", error);
      }
    }
    fetchChainFolders();
  }, []);

  return (
    <>
      <div className="container m-[10%] mx-auto items-center justify-center h-screen">
        <CAlert
          color="secondary"
          className="text-lg w-75 flex justify-center mx-auto items-center"
        >
          <FontAwesomeIcon icon={faCircleInfo} className="mr-2" />
          This determines the complexity of the configuration options available
          to you.
        </CAlert>
        <div className="flex flex-col items-center justify-center ">
          <div className="text-3xl font-semibold my-4 text-center">
            Choose Level of Expertise:
          </div>
          <div className="gap-3 my-4 w-full  flex justify-center items-center ">
            <button
              className={`flex-grow  py-2 bg-primary-light  hover:text-[15] border-primary-dark shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.3)]   font-semibold rounded-lg hover:bg-primary-dark duration-300  ${
                launched ? "hover:bg-primary-light hover:text-16" : ""
              }`}
              onClick={() => setConfigLevel("easy")}
              disabled={launched}
            >
              Easy
            </button>
            <button
              className={`flex-grow  py-2  bg-primary-light hover:text-[15] border-primary-dark shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.3)]    font-semibold rounded-lg hover:bg-primary-dark duration-300 ${
                launched ? "hover:bg-primary-light hover:text-16" : ""
              }`}
              onClick={() => setConfigLevel("advanced")}
              disabled={launched}
            >
              Advanced
            </button>
            <button
              className={`flex-grow  py-2 bg-primary-light  hover:text-[15] border-primary-dark shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.3)]   font-semibold rounded-lg hover:bg-primary-dark duration-300 ${
                launched ? "hover:bg-primary-light hover:text-16" : ""
              }`}
              onClick={() => setConfigLevel("expert")}
              disabled={launched}
            >
              Expert
            </button>
            <button
              className={`flex-grow py-2  bg-primary-light  hover:text-[15] border-primary-dark shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.3)]   font-semibold rounded-lg  hover:bg-primary-dark duration-300 ${
                launched ? "hover:bg-primary-light hover:text-16" : ""
              }`}
              onClick={() => setConfigLevel("existing")}
              disabled={launched}
            >
              Load Config
            </button>
          </div>
          <div className="config-container w-4/5">
            {configLevel === "easy" && <EasyConfig />}
            {configLevel === "advanced" && <AdvancedConfig />}
            {configLevel === "expert" && <ExpertConfig />}
            {configLevel === "existing" && <FromExisting />}
          </div>
          <div className="mt-8">
            <button
              className={`px-4 py-2 font-semibold text-white shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.3)] bg-secondary-light hover:bg-secondary-dark rounded-lg  focus:outline-none focus:ring-2 focus:ring-green-400 ${
                launched ? "bg-success text-white" : ""
              }`}
              onClick={launch}
              disabled={launching || launched}
            >
              {launching
                ? "Launching..."
                : launched
                ? "Chain Launched!"
                : "Launch Local Chain"}
            </button>
            {launched ? (
              <button
                className="ml-4 px-4 py-2 font-semibold   bg-primary-light hover:bg-primary-dark  shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.3)] text-background-light rounded-lg  focus:outline-none focus:ring-2 focus:ring-blue-400"
                onClick={dashboard}
              >
                Visit Dashboard
              </button>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </>
  );
}

/* --------------------------------------------------------- DASHBOARD PAGE ----------------------------------------------------------------------------*/

function Dashboard() {
  const [showModal, setShowModal] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  const [latestHash, setLatestHash] = useState("");
  const [blockHeight, setBlockHeight] = useState("");
  // const [amountDict, setAmounts] = useState({});
  const [contractsDict, setContracts] = useState<any>({});
  const [transactionsArray, setTransactionsArray] = useState<any[]>([]);
  const [amountDictFilter, setAmountsFilter] = useState<any>({});
  const [filterValue, setFilter] = useState("");
  const [amountDict, setTempDict] = useState<any>({});
  const [activeTab, setActiveTab] = useState("accounts");

  const addOrUpdateTransaction = (newTransactions: any) => {
    setTransactionsArray((prevTransactions: any[]) => {
      const updatedTransactions = [...prevTransactions];

      Object.keys(newTransactions).forEach((key) => {
        const transaction = newTransactions[key];
        const existingTransactionIndex = updatedTransactions.findIndex(
          (t: any) => t?.hash === transaction?.hash
        );

        if (existingTransactionIndex === -1) {
          updatedTransactions.push(transaction);
        } else {
          updatedTransactions[existingTransactionIndex] = transaction;
        }
      });

      return updatedTransactions;
    });
  };

  useEffect(() => {
    let unlistenFn: UnlistenFn | undefined;
    let transactionsunlistenFn: UnlistenFn | undefined;

    listen("new-block", (event: any) => {
      setBlockHeight(event.payload.number);
      setLatestHash(event.payload.hash);
      setContracts(event.payload.contracts);
      console.log("Received contracts:", event.payload.contracts);

      console.log("payload", event.payload);

      if (filterValue.length == 0) {
        setTempDict(event.payload.amounts);
      }
    })
      .then((unlisten) => {
        unlistenFn = unlisten;
      })
      .catch((error) => {
        console.error("Error setting up listener:", error);
      });

    listen("transactions", (event: any) => {
      addOrUpdateTransaction(event.payload.transactions);
      console.log("payload transaction", event.payload);
    })
      .then((unlisten) => {
        transactionsunlistenFn = unlisten;
      })
      .catch((error) => {
        console.error("Error setting up listener:", error);
      });

    // Cleanup the listener when the component is unmounted
    return () => {
      if (unlistenFn) {
        unlistenFn();
      }

      if (transactionsunlistenFn) {
        transactionsunlistenFn();
      }
    };
  }, []);

  const killPopup = () => {
    const [visible, setVisible] = useState(false);
    const openModalAndKillChain = async () => {
      setVisible(true);
      localStorage.clear();
      await killChain();
    };
    return (
      <div>
        <button
          className="px-3 py-1 my-2 rounded  bg-fail hover:bg-opacity-75"
          onClick={openModalAndKillChain}
        >
          Kill Chain
        </button>

        <CModal
          className="rounded-2xl"
          alignment="center"
          backdrop="static"
          visible={visible}
        >
          <CModalHeader
            closeButton={false}
            className="bg-primary-dark text-white font-bold border-slate-600"
          >
            <CModalTitle className="text-xl">Note:</CModalTitle>
          </CModalHeader>
          <CModalBody className="bg-background-light text-md text-primary-dark">
            <p>Chain has been killed.</p>
          </CModalBody>
          <CModalFooter className="bg-background-light  border-background-light ">
            <button
              className="rounded-full py-2 px-4 bg-primary-light hover:bg-primary-dark hover:text-background-light"
              onClick={() => (window.location.href = "/genesis-builder")}
            >
              Go to Genesis Builder
            </button>
          </CModalFooter>
        </CModal>
      </div>
    );
  };

  // Function to invoke killing blockchain
  async function killChain() {
    try {
      await invoke("kill_chain");
      console.log("killed chain");
      // window.location.href = "/genesis-builder";
    } catch (error) {
      console.error("Kill error:", error);
    }
  }

  function filter(e: any) {
    setFilter(e.target.value);
    localStorage.setItem("dictionary", JSON.stringify(amountDict));
    var dictionary = JSON.parse(localStorage.getItem("dictionary") as string);

    Object.keys(dictionary).map((x) => {
      if (x.indexOf(e.target.value) == -1) {
        delete dictionary[x];
      }
    });
    setAmountsFilter(dictionary);
  }
  const [activeRow, setActiveRow] = useState(null);
  const [copy, setCopy] = useState(false);

  const handleCopy = (textToCopy: any) => {
    navigator.clipboard.writeText(textToCopy);
    setCopy(true);

    setTimeout(() => {
      setCopy(false);
    }, 1000);
  };

  // function to get the amount of a transaction with decimal point
  const transactionAmount = (event: any) => {
    const amount = event?.amount;

    if (amount !== undefined) {
      return amount / 1000000;
    }
    return "0";
  };

  return (
    <div className=" bg-background-light w-100 h-50 ">
      <div className="bg-secondary-light mb-2">
        <div className="flex justify-content-between px-5">
          <div className="flex justify-content-between">
            <CCardImage src={concordiumImg} style={{ width: 70 }}></CCardImage>
          </div>
          <ul className="flex flex-wrap -mb-px text-sm font-medium text-center">
            <li
              onClick={() => setActiveTab("accounts")}
              className={`cursor-pointer transition-all duration-300 ease-in-out relative w-full sm:w-auto sm:flex-grow ${
                activeTab === "accounts" ? "scale-105" : ""
              }`}
            >
              <div
                className={`inline-flex items-center justify-center pt-4 px-6 group ${
                  activeTab === "accounts"
                    ? "text-primary-dark"
                    : "hover:text-primary-dark"
                } transform transition-transform duration-300 ease-in-out`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi mx-1 bi-person-circle"
                  viewBox="0 0 16 16"
                >
                  <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                  <path
                    fillRule="evenodd"
                    d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"
                  />
                </svg>
                Accounts
              </div>
              {activeTab === "accounts" && (
                <div
                  style={{ left: "0", right: "0", margin: "auto" }}
                  className="absolute bottom-0 w-2/4  sm:w-3/4 md:w-3/4 lg:w-3/4  h-1 bg-primary-dark dark:bg-primary-light transition-width duration-300 ease-in-out "
                ></div>
              )}
            </li>
            <li
              onClick={() => setActiveTab("contracts")}
              className={`cursor-pointer transition-all duration-300 ease-in-out relative w-full sm:w-auto sm:flex-grow ${
                activeTab === "contracts" ? "scale-105" : ""
              }`}
            >
              <div
                className={`inline-flex items-center justify-center pt-4 px-6 group ${
                  activeTab === "contracts"
                    ? "text-primary-dark"
                    : "hover:text-primary-dark"
                } transform transition-transform duration-300 ease-in-out`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi mx-1 bi-file-earmark-medical"
                  viewBox="0 0 16 16"
                >
                  <path d="M7.5 5.5a.5.5 0 0 0-1 0v.634l-.549-.317a.5.5 0 1 0-.5.866L6 7l-.549.317a.5.5 0 1 0 .5.866l.549-.317V8.5a.5.5 0 1 0 1 0v-.634l.549.317a.5.5 0 1 0 .5-.866L8 7l.549-.317a.5.5 0 1 0-.5-.866l-.549.317V5.5zm-2 4.5a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1h-5zm0 2a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1h-5z" />
                  <path d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2zM9.5 3A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5v2z" />
                </svg>
                Contracts
              </div>
              {activeTab === "contracts" && (
                <div
                  style={{ left: "0", right: "0", margin: "auto" }}
                  className="absolute bottom-0 w-2/4  sm:w-3/4 md:w-3/4 lg:w-3/4  h-1 bg-primary-dark dark:bg-primary-light transition-width duration-300 ease-in-out "
                ></div>
              )}
            </li>
            <li
              onClick={() => setActiveTab("transactions")}
              className={`cursor-pointer transition-all duration-300 ease-in-out relative w-full sm:w-auto sm:flex-grow ${
                activeTab === "transactions" ? "scale-105" : ""
              }`}
            >
              <div
                className={`inline-flex items-center justify-center pt-4 px-6 group ${
                  activeTab === "transactions"
                    ? "text-primary-dark"
                    : "hover:text-primary-dark"
                } transform transition-transform duration-300 ease-in-out`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi mx-1 bi-receipt"
                  viewBox="0 0 16 16"
                >
                  <path d="M1.92.506a.5.5 0 0 1 .434.14L3 1.293l.646-.647a.5.5 0 0 1 .708 0L5 1.293l.646-.647a.5.5 0 0 1 .708 0L7 1.293l.646-.647a.5.5 0 0 1 .708 0L9 1.293l.646-.647a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .801.13l.5 1A.5.5 0 0 1 15 2v12a.5.5 0 0 1-.053.224l-.5 1a.5.5 0 0 1-.8.13L13 14.707l-.646.647a.5.5 0 0 1-.708 0L11 14.707l-.646.647a.5.5 0 0 1-.708 0L9 14.707l-.646.647a.5.5 0 0 1-.708 0L7 14.707l-.646.647a.5.5 0 0 1-.708 0L5 14.707l-.646.647a.5.5 0 0 1-.708 0L3 14.707l-.646.647a.5.5 0 0 1-.801-.13l-.5-1A.5.5 0 0 1 1 14V2a.5.5 0 0 1 .053-.224l.5-1a.5.5 0 0 1 .367-.27zm.217 1.338L2 2.118v11.764l.137.274.51-.51a.5.5 0 0 1 .707 0l.646.647.646-.646a.5.5 0 0 1 .708 0l.646.646.646-.646a.5.5 0 0 1 .708 0l.646.646.646-.646a.5.5 0 0 1 .708 0l.646.646.646-.646a.5.5 0 0 1 .708 0l.646.646.646-.646a.5.5 0 0 1 .708 0l.509.509.137-.274V2.118l-.137-.274-.51.51a.5.5 0 0 1-.707 0L12 1.707l-.646.647a.5.5 0 0 1-.708 0L10 1.707l-.646.647a.5.5 0 0 1-.708 0L8 1.707l-.646.647a.5.5 0 0 1-.708 0L6 1.707l-.646.647a.5.5 0 0 1-.708 0L4 1.707l-.646.647a.5.5 0 0 1-.708 0l-.509-.51z" />
                  <path d="M3 4.5a.5.5 0 0 1 .5-.5h6a.5.5 0 1 1 0 1h-6a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h6a.5.5 0 1 1 0 1h-6a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h6a.5.5 0 1 1 0 1h-6a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5zm8-6a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5z" />
                </svg>
                Transactions
              </div>
              {activeTab === "transactions" && (
                <div
                  style={{ left: "0", right: "0", margin: "auto" }}
                  className="absolute bottom-0 w-2/4  sm:w-3/4 md:w-3/4 lg:w-3/4  h-1 bg-primary-dark dark:bg-primary-light transition-width duration-300 ease-in-out "
                ></div>
              )}
            </li>
          </ul>

          <div className="mt-2"> {killPopup()}</div>
        </div>{" "}
        <hr className="h-px my-2 bg-primary-dark  border-0"></hr>
        <div className="mx-5 my-4 ">
          {" "}
          <div className="text-5xl font-bold text-primary-dark  my-2">
            Concordium Explorer
          </div>
          <div className="text-xl font-bolder text-primary-dark  mb-4">
            Concordium Block Explorer provides all the information to deep dive
            into transactions, blocks, contracts, and much more. Deep dive into
            Concordium and explore the network.
          </div>
        </div>
        <div className="flex flex-col xs:flex-row justify-evenly items-center ">
          <div className="flex items-center w-50 md:w-1/3 rounded" id="search">
            <input
              type="text"
              placeholder="Search by account address"
              name="search"
              className="w-full ms-3 p-2 py-3 rounded-start  bg-primary-dark bg-opacity-75"
              id="search"
              onChange={filter}
            />
            <div className=" rounded-r  border-background-light bg-background-dark text-primary-light m-0">
              <FontAwesomeIcon icon={faSearch} className="p-3" fontSize={25} />
            </div>
          </div>
          <div className="border-1 border-primary-dark bg-background-light bg-opacity-50 rounded p-3 sm:p-0 min-w-[15%] max-w-[15%]">
            <div className="text-lg  mb-1 xs:text-sm ">BLOCK HEIGHT</div>
            <div className="text-lg text-primary-light font-bold">
              {blockHeight}
            </div>
          </div>
          <div className="border-1 border-primary-dark bg-background-light bg-opacity-50 rounded p-3 min-w-[15%] max-w-[15%]">
            <div className="text-lg mb-1 xs:text-sm">LATEST HASH</div>
            <div className="text-lg text-primary-light font-bolder text-lg overflow-hidden  overflow-ellipsis whitespace-nowrap">
              {latestHash}
            </div>{" "}
          </div>
        </div>
        <br />
      </div>
      <div className="">
        {activeTab === "contracts" && (
          <div className="overflow-x-auto container-fluid overflow-y-auto">
            <table className="w-full text-sm text-left text-background-light dark:text-background-dark ">
              <tr className="bg-primary-dark bg-opacity-10  border-1 border-black border-opacity-25 table-bordered text-uppercase">
                <th className="px-6 py-3 text-primary-dark">Index</th>
                <th className="px-6 py-3 text-primary-dark text-center">
                  Name
                </th>{" "}
                <th className="px-6 py-3 text-primary-dark text-center">
                  Amount
                </th>
                <th className="px-6 py-3 text-primary-dark text-center">
                  Methods
                </th>
              </tr>
              <tbody>
                {Object.keys(contractsDict).length === 0 ? (
                  <tr className="hover:bg-primary-dark hover:bg-opacity-0 border-1  ">
                    <td className="py-2 px-4 text-primary-dark">
                      No Contracts
                    </td>
                    <td></td>
                  </tr>
                ) : (
                  Object.entries(contractsDict).map(
                    ([address, contractDetails]: [any, any]) => (
                      <tr
                        key={address}
                        className="hover:bg-primary-dark hover:bg-opacity-25 transition-all ease-in-out duration-300"
                      >
                        <td className="py-2 border-1 font-monospace border-black border-1 border-opacity-25 px-4 text-primary-dark transition-all ease-in-out duration-300">
                          {address}
                        </td>
                        <td className="text-center py-2 border-1 font-monospace border-black border-1 border-opacity-25 px-4 text-primary-dark transition-all ease-in-out duration-300">
                          {contractDetails.name}
                        </td>
                        <td className="text-center py-2 border-1 font-monospace border-black border-1 border-opacity-25 px-4 text-primary-dark transition-all ease-in-out duration-300">
                          {contractDetails.amount + " CCD"}
                        </td>
                        {/* Owner: {contractDetails.owner}
                        <br />
                       */}{" "}
                        <td className="text-center py-2 border-1 font-monospace border-black border-1 border-opacity-25 px-4 text-primary-dark transition-all ease-in-out duration-300">
                          {contractDetails.methods.join(", ")}
                        </td>
                      </tr>
                    )
                  )
                )}
              </tbody>
            </table>
          </div>
        )}{" "}
        {showModal ? (
          <>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
              <div className="relative w-auto my-6 mx-auto max-w-3xl">
                {/*content*/}
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                  {/*body*/}
                  <div className="relative flex-auto  m-2">
                    <pre className="whitespace-pre-wrap text-black text-sm">
                      {JSON.stringify(selectedTransaction, null, 2)}
                    </pre>
                  </div>
                  <div className="flex items-center justify-end border-t border-solid border-slate-200 rounded-b">
                    <button
                      className="px-3 m-2 rounded  bg-fail hover:bg-opacity-75"
                      type="button"
                      onClick={() => setShowModal(false)}
                    >
                      Close
                    </button>
                  </div>
                </div>{" "}
              </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
          </>
        ) : null}
        {activeTab === "transactions" && (
          <div className="overflow-x-auto container-fluid overflow-y-auto">
            {" "}
            <table className="w-full text-sm text-left text-background-light dark:text-background-dark ">
              <tr className="bg-primary-dark bg-opacity-10 rounded border-1 border-black border-opacity-25 table-bordered text-uppercase">
                <th className="px-6 py-3 text-primary-dark ">Transactions</th>
                <th className="px-6 py-3 text-primary-dark text-center">
                  Amount
                </th>{" "}
                <th className="px-6 py-3 text-primary-dark text-center">
                  Type
                </th>
                <th className="px-6 py-3 text-primary-dark text-center">
                  Outcome
                </th>
              </tr>
              <tbody>
                {transactionsArray.length === 0 ? (
                  <tr className="hover:bg-primary-dark hover:bg-opacity-0 border-1 ">
                    <td className="py-2 px-4  text-primary-dark">
                      No Transactions
                    </td>
                    <td></td>
                    <td className="py-2 px-4  text-primary-dark"></td>
                    <td className="py-2 px-4  text-primary-dark"></td>
                  </tr>
                ) : (
                  transactionsArray.map((transaction, index) => {
                    const firstEvent = transaction?.result?.events?.[0];
                    return (
                      <tr
                        key={transaction?.hash || index}
                        className="hover:bg-primary-dark hover:bg-opacity-25 hover:cursor-pointer"
                        onClick={() => {
                          setShowModal(true);
                          setSelectedTransaction(transaction);
                        }}
                      >
                        <td className="py-2 font-monospace border-1  border-opacity-10 border-black px-4 text-primary-dark">
                          {transaction?.hash}
                        </td>
                        <td className="py-2 border-1 border-opacity-10 border-black  px-4 text-center text-primary-dark">
                          {transactionAmount(firstEvent) + " CCD"}
                        </td>
                        <td className="py-2 border-1 text-capitalize border-opacity-10 border-black  px-4 text-center text-primary-dark">
                          {transaction?.type?.contents}
                        </td>
                        {transaction?.result?.outcome === "success" ? (
                          <td className="py-2 font-monospace border-1   border-opacity-10 border-black bg-opacity-75 text-center px-4 text-primary-dark">
                            <div className="bg-success rounded-1 d-inline p-1 text-capitalize ">
                              {" "}
                              {transaction?.result?.outcome}
                            </div>
                          </td>
                        ) : (
                          <td className="py-2 uppercase border-1  text-capitalize  border-opacity-10 border-black text-center px-4 text-primary-dark">
                            <div className="bg-fail rounded d-inline p-1 bg-opacity-75">
                              {" "}
                              {transaction?.result?.outcome}
                            </div>
                          </td>
                        )}
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        )}
        {activeTab === "accounts" && (
          <>
            <div className="shadow-md overflow-x-auto container-fluid">
              <table className="w-full text-sm  text-left text-background-light dark:text-background-dark  ">
                <thead className="uppercase">
                  <tr className="bg-primary-dark bg-opacity-10 border-1 border-black border-opacity-25">
                    <th className="px-4 py-3 text-bold text-md text-primary-dark whitespace-nowrap ">
                      Account Address
                    </th>
                    <th className="px-4 py-3 text-bold text-md text-primary-dark whitespace-nowrap ">
                      Amount
                    </th>
                  </tr>
                </thead>
                <tbody className="">
                  {filterValue.length === 0 &&
                    Object.keys(amountDict).map((x: any) => (
                      <tr
                        key={x}
                        className=" hover:bg-primary-dark hover:bg-opacity-25"
                        onMouseEnter={() => setActiveRow(x)}
                        onMouseLeave={() => setActiveRow(null)}
                      >
                        <td className="flex py-2 px-4 border-bottom-1 border-start-1 font-monospace border-opacity-25 border-black text-primary-dark relative">
                          <span className="mx-3">{x}</span>
                          {activeRow === x && (
                            <span
                              className=" cursor-pointer text-black  "
                              onClick={() => handleCopy(x)}
                            >
                              {copy ? (
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="16"
                                  height="16"
                                  fill="currentColor"
                                  className="bi bi-clipboard-check-fill"
                                  viewBox="0 0 16 16"
                                >
                                  <path d="M6.5 0A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3Zm3 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3Z" />
                                  <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1A2.5 2.5 0 0 1 9.5 5h-3A2.5 2.5 0 0 1 4 2.5v-1Zm6.854 7.354-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 0 1 .708-.708L7.5 10.793l2.646-2.647a.5.5 0 0 1 .708.708Z" />
                                </svg>
                              ) : (
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="16"
                                  height="16"
                                  fill="currentColor"
                                  className="bi bi-clipboard"
                                  viewBox="0 0 16 16"
                                >
                                  <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z" />
                                  <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z" />
                                </svg>
                              )}
                            </span>
                          )}
                        </td>
                        <td className="py-2 border-1 border-opacity-25 border-black px-4 text-primary-dark">
                          {amountDict[x] / 1000000 + " CCD"}
                        </td>
                      </tr>
                    ))}

                  {filterValue.length ? (
                    Object.keys(amountDictFilter).map((x: any) => (
                      <tr
                        key={x}
                        className="hover:bg-primary-dark hover:bg-opacity-25"
                        onMouseEnter={() => setActiveRow(x)}
                        onMouseLeave={() => setActiveRow(null)}
                      >
                        <td className="flex py-2 px-4 border-bottom-1 border-start-1 font-monospace border-opacity-25 border-black text-primary-dark relative">
                          <span className="mx-3">{x}</span>
                          {activeRow === x && (
                            <span
                              className=" cursor-pointer text-black  "
                              onClick={() => handleCopy(x)}
                            >
                              {copy ? (
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="16"
                                  height="16"
                                  fill="currentColor"
                                  className="bi bi-clipboard-check-fill"
                                  viewBox="0 0 16 16"
                                >
                                  <path d="M6.5 0A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3Zm3 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3Z" />
                                  <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1A2.5 2.5 0 0 1 9.5 5h-3A2.5 2.5 0 0 1 4 2.5v-1Zm6.854 7.354-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 0 1 .708-.708L7.5 10.793l2.646-2.647a.5.5 0 0 1 .708.708Z" />
                                </svg>
                              ) : (
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="16"
                                  height="16"
                                  fill="currentColor"
                                  className="bi bi-clipboard"
                                  viewBox="0 0 16 16"
                                >
                                  <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z" />
                                  <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z" />
                                </svg>
                              )}
                            </span>
                          )}
                        </td>
                        <td className="py-2 border-1 border-opacity-25 border-black px-4 text-primary-dark">
                          {amountDictFilter[x] / 1000000 + " CCD"}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <></>
                  )}
                </tbody>
              </table>
            </div>
          </>
        )}
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
