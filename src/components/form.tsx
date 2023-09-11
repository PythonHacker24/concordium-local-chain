import { useState } from "react";
import { CButton, CModalFooter, CModal, CModalHeader, CModalBody, CModalTitle } from "@coreui/react";
import '@coreui/coreui/dist/css/coreui.min.css'


// function SettingsPage(onHandleSubmit:any) {
const SettingsPage = ({ onHandleSubmit }) => {
     const [visible, setVisible] = useState(false);

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
               genesisHash: "./genesis_hash"
          },
          cryptographicParameters: {
               kind: "generate",
               genesisString: "Local genesis parameters."
          },
          anonymityRevokers: [
               {
                    kind: "fresh",
                    id: 1,
                    repeat: 3
               }
          ],
          identityProviders: [
               {
                    kind: "fresh",
                    id: 0,
                    repeat: 3
               }
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
                    repeat: 1
               },
               {
                    kind: "fresh",
                    balance: "10000000000000000",
                    template: "foundation",
                    identityProvider: 0,
                    numKeys: 1,
                    threshold: 1,
                    repeat: 1,
                    foundation: true
               },
               {
                    kind: "fresh",
                    balance: "2000000000000",
                    template: "stagenet",
                    identityProvider: 0,
                    numKeys: 1,
                    threshold: 1,
                    repeat: 100
               }
          ],
          updates: {
               root: {
                    threshold: 5,
                    keys: [
                         {
                              kind: "fresh",
                              repeat: 7
                         }
                    ]
               },
               level1: {
                    threshold: 7,
                    keys: [
                         {
                              kind: "fresh",
                              repeat: 15
                         }
                    ]
               },
               level2: {
                    keys: [
                         {
                              kind: "fresh",
                              repeat: 7
                         }
                    ],
                    emergency: {
                         authorizedKeys: [
                              0,
                              1,
                              2,
                              3,
                              4,
                              5,
                              6
                         ],
                         threshold: 7
                    },
                    protocol: {
                         authorizedKeys: [
                              0,
                              1,
                              2,
                              3,
                              4,
                              5,
                              6
                         ],
                         threshold: 7
                    },
                    electionDifficulty: {
                         authorizedKeys: [
                              0,
                              1,
                              2,
                              3,
                              4,
                              5,
                              6
                         ],
                         threshold: 7
                    },
                    euroPerEnergy: {
                         authorizedKeys: [
                              0,
                              1,
                              2,
                              3,
                              4,
                              5,
                              6
                         ],
                         threshold: 7
                    },
                    microCCDPerEuro: {
                         authorizedKeys: [
                              0,
                              1,
                              2,
                              3,
                              4,
                              5,
                              6
                         ],
                         threshold: 7
                    },
                    foundationAccount: {
                         authorizedKeys: [
                              0,
                              1,
                              2,
                              3,
                              4,
                              5,
                              6
                         ],
                         threshold: 7
                    },
                    mintDistribution: {
                         authorizedKeys: [
                              0,
                              1,
                              2,
                              3,
                              4,
                              5,
                              6
                         ],
                         threshold: 7
                    },
                    transactionFeeDistribution: {
                         authorizedKeys: [
                              0,
                              1,
                              2,
                              3,
                              4,
                              5,
                              6
                         ],
                         threshold: 7
                    },
                    gasRewards: {
                         authorizedKeys: [
                              0,
                              1,
                              2,
                              3,
                              4,
                              5,
                              6
                         ],
                         threshold: 7
                    },
                    poolParameters: {
                         authorizedKeys: [
                              0,
                              1,
                              2,
                              3,
                              4,
                              5,
                              6
                         ],
                         threshold: 7
                    },
                    addAnonymityRevoker: {
                         authorizedKeys: [
                              0,
                              1,
                              2,
                              3,
                              4,
                              5,
                              6
                         ],
                         threshold: 7
                    },
                    addIdentityProvider: {
                         authorizedKeys: [
                              0,
                              1,
                              2,
                              3,
                              4,
                              5,
                              6
                         ],
                         threshold: 7
                    },
                    cooldownParameters: {
                         authorizedKeys: [
                              0,
                              1,
                              2,
                              3,
                              4,
                              5,
                              6
                         ],
                         threshold: 7
                    },
                    timeParameters: {
                         authorizedKeys: [
                              0,
                              1,
                              2,
                              3,
                              4,
                              5,
                              6
                         ],
                         threshold: 7
                    }
               }
          },
          parameters: {
               slotDuration: 250,
               leadershipElectionNonce: "d1bc8d3ba4afc7e109612cb73acbdddac052c93025aa1f82942edabb7deb82a1",
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
                    allowZeroDelay: true
               },
               chain: {
                    version: "v1",
                    electionDifficulty: 0.05,
                    euroPerEnergy: 0.000001,
                    microCCDPerEuro: 100000000,
                    accountCreationLimit: 10,
                    timeParameters: {
                         rewardPeriodLength: 4,
                         mintPerPayday: 0.000261157877
                    },
                    poolParameters: {
                         passiveFinalizationCommission: 1,
                         passiveBakingCommission: 0.1,
                         passiveTransactionCommission: 0.1,
                         finalizationCommissionRange: {
                              min: 0.5,
                              max: 1
                         },
                         bakingCommissionRange: {
                              min: 0.05,
                              max: 0.1
                         },
                         transactionCommissionRange: {
                              min: 0.05,
                              max: 0.2
                         },
                         minimumEquityCapital: "100",
                         capitalBound: 0.25,
                         leverageBound: {
                              numerator: 3,
                              denominator: 1
                         }
                    },
                    cooldownParameters: {
                         poolOwnerCooldown: 3600,
                         delegatorCooldown: 1800
                    },
                    rewardParameters: {
                         mintDistribution: {
                              bakingReward: 0.6,
                              finalizationReward: 0.3
                         },
                         transactionFeeDistribution: {
                              baker: 0.45,
                              gasAccount: 0.45
                         },
                         GASRewards: {
                              baker: 0.25,
                              finalizationProof: 0.005,
                              accountCreation: 0.02,
                              chainUpdate: 0.005
                         }
                    }
               }
          }
     });

     const updateJsonData = (key: any, value: any) => {
          // Create a copy of the existing JSON data
          const updatedData = { ...formData as any };
          // Update the value for the specified key
          if (key === 'parameters.finalization') {
               updatedData.parameters.finalization = value;
          } else if (key === 'parameters.chain') {
               updatedData.parameters.chain = value;
          } else if (key === 'parameters.chain.timeParameters') {
               updatedData.parameters.chain.timeParameters = value;
          } else if (key === 'parameters.chain.poolParameters') {
               updatedData.parameters.chain.poolParameters = value;
          } else if (key === 'parameters.chain.poolParameters.finalizationCommissionRange') {
               updatedData.parameters.chain.poolParameters.finalizationCommissionRange = value;
          } else if (key === 'parameters.chain.poolParameters.bakingCommissionRange') {
               updatedData.parameters.chain.poolParameters.bakingCommissionRange = value;
          } else if (key === 'parameters.chain.poolParameters.transactionCommissionRange') {
               updatedData.parameters.chain.poolParameters.transactionCommissionRange = value;
          } else if (key === 'parameters.chain.poolParameters.leverageBound') {
               updatedData.parameters.chain.poolParameters.leverageBound = value;
          } else if (key === 'parameters.chain.cooldownParameters') {
               updatedData.parameters.chain.cooldownParameters = value;
          } else if (key === 'parameters.chain.rewardParameters.mintDistribution') {
               updatedData.parameters.chain.rewardParameters.mintDistribution = value;
          } else if (key === 'parameters.chain.rewardParameters.transactionFeeDistribution') {
               updatedData.parameters.chain.rewardParameters.transactionFeeDistribution = value;
          } else if (key === 'parameters.chain.rewardParameters.GASRewards') {
               updatedData.parameters.chain.rewardParameters.GASRewards = value;
          } else {
               updatedData[key] = value;
          }
          // Update the state with the modified JSON object
          setFormData(updatedData);
     };

     const handleSubmit = (event: any) => {
          event.preventDefault();
          // console.log(formData);
          onHandleSubmit(formData);
     }
     return (
          <>
               <div className="w-full flex justify-center">
                    <CButton className="btn mt-10 bg-ctp-green hover:bg-ctp-green border-none text-black items-center" onClick={() => setVisible(!visible)}>Open Settings</CButton>
               </div>
               <CModal className="bg-gradient-to-b from-ctp-base to-ctp-crust p-6 overflow-auto mt-10 " scrollable visible={visible} onClose={() => setVisible(false)}>
                    <CModalHeader>
                         <CModalTitle className="text-3xl text-black font-bolder">Settings</CModalTitle>
                    </CModalHeader>

                    <CModalBody>
                         <form id="settingsform" onSubmit={handleSubmit}>
                              <div className="form-field">
                                   <label className="block mb-2 text-3xl/2 font-semibold text-black mt-3" htmlFor="parameters.slotDuration">Slot Duration:</label>
                                   <input
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        type="number"
                                        id="parameters.slotDuration"
                                        name="parameters.slotDuration"
                                        onChange={(e) => updateJsonData('parameters', { ...formData.parameters, slotDuration: parseInt(e.target.value) })}
                                        defaultValue={formData.parameters.slotDuration}
                                   />
                              </div>
                              <div className="form-field">
                                   <label className="block mb-2 text-3xl/2 font-semibold text-black mt-3" htmlFor="parameters.leadershipElectionNonce">Leadership Election Nonce:</label>
                                   <input
                                        type="text"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        id="parameters.leadershipElectionNonce"
                                        name="parameters.leadershipElectionNonce"
                                        onChange={(e) => updateJsonData('parameters', { ...formData.parameters, leadershipElectionNonce: e.target.value })}
                                        defaultValue={formData.parameters.leadershipElectionNonce}
                                   />
                              </div>
                              <div className="form-field">
                                   <label className="block mb-2 text-3xl/2 font-semibold text-black mt-3" htmlFor="parameters.epochLength">Epoch Length:</label>
                                   <input
                                        type='number'
                                        id="parameters.epochLength"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        name="parameters.epochLength"
                                        onChange={(e) => updateJsonData('parameters', { ...formData.parameters, epochLength: parseInt(e.target.value) })}
                                        defaultValue={formData.parameters.epochLength}
                                   />
                              </div>
                              <div className="form-field">
                                   <label className="block mb-2 text-3xl/2 font-semibold text-black mt-3" htmlFor="parameters.maxBlockEnergy">Max Block Energy:</label>
                                   <input
                                        type="text"
                                        id="parameters.maxBlockEnergy"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        name="parameters.maxBlockEnergy"
                                        onChange={(e) => updateJsonData('parameters', { ...formData.parameters, maxBlockEnergy: parseInt(e.target.value) })}
                                        defaultValue={formData.parameters.maxBlockEnergy}
                                   />
                              </div>
                              <div className="form-field">
                                   <label className="block mb-2 text-3xl/2 font-semibold text-black mt-3" htmlFor="parameters.finalization.minimumSkip">Minimum Skip:</label>
                                   <input
                                        type="text"
                                        id="parameters.finalization.minimumSkip"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        name="parameters.finalization.minimumSkip"
                                        onChange={(e) => updateJsonData("parameters.finalization", { ...formData.parameters.finalization, minimumSkip: parseInt(e.target.value) })}
                                        defaultValue={formData.parameters.finalization.minimumSkip}
                                   />
                              </div>
                              <div className="form-field">
                                   <label className="block mb-2 text-3xl/2 font-semibold text-black mt-3" htmlFor="parameters.finalization.committeeMaxSize">Committee Max Size:</label>
                                   <input
                                        type="text"
                                        id="parameters.finalization.committeeMaxSize"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        name="parameters.finalization.committeeMaxSize"
                                        onChange={(e) => updateJsonData("parameters.finalization", { ...formData.parameters.finalization, committeeMaxSize: parseInt(e.target.value) })}
                                        defaultValue={formData.parameters.finalization.committeeMaxSize}
                                   />
                              </div>
                              <div className="form-field">
                                   <label className="block mb-2 text-3xl/2 font-semibold text-black mt-3" htmlFor="parameters.finalization.waitingTime">Waiting Time:</label>
                                   <input
                                        type="text"
                                        id="parameters.finalization.waitingTime"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        name="parameters.finalization.waitingTime"
                                        onChange={(e) => updateJsonData("parameters.finalization", { ...formData.parameters.finalization, waitingTime: parseInt(e.target.value) })}
                                        defaultValue={formData.parameters.finalization.waitingTime}
                                   />
                              </div>
                              <div className="form-field">
                                   <label className="block mb-2 text-3xl/2 font-semibold text-black mt-3" htmlFor="parameters.finalization.skipShrinkFactor">Skip Shrink Factor:</label>
                                   <input
                                        type="text"
                                        id="parameters.finalization.skipShrinkFactor"
                                        name="parameters.finalization.skipShrinkFactor"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        onChange={(e) => updateJsonData("parameters.finalization", { ...formData.parameters.finalization, skipShrinkFactor: parseInt(e.target.value) })}
                                        defaultValue={formData.parameters.finalization.skipShrinkFactor}
                                   />
                              </div>

                              <div className="form-field">
                                   <label className="block mb-2 text-3xl/2 font-semibold text-black mt-3" htmlFor="parameters.finalization.skipGrowFactor">Skip Grow Factor:</label>
                                   <input
                                        type="text"
                                        id="parameters.finalization.skipGrowFactor"
                                        name="parameters.finalization.skipGrowFactor"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        onChange={(e) => updateJsonData("parameters.finalization", { ...formData.parameters.finalization, skipGrowFactor: parseInt(e.target.value) })}
                                        defaultValue={formData.parameters.finalization.skipGrowFactor}
                                   />
                              </div>

                              <div className="form-field">
                                   <label className="block mb-2 text-3xl/2 font-semibold text-black mt-3" htmlFor="parameters.finalization.delayShrinkFactor">Delay Shrink Factor:</label>
                                   <input
                                        type="text"
                                        id="parameters.finalization.delayShrinkFactor"
                                        name="parameters.finalization.delayShrinkFactor"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        onChange={(e) => updateJsonData("parameters.finalization", { ...formData.parameters.finalization, delayShrinkFactor: parseInt(e.target.value) })}
                                        defaultValue={formData.parameters.finalization.delayShrinkFactor}
                                   />
                              </div>
                              <div className="form-field">
                                   <label className="block mb-2 text-3xl/2 font-semibold text-black mt-3" htmlFor="parameters.finalization.delayGrowFactor">Delay Grow Factor:</label>
                                   <input
                                        type="text"
                                        id="parameters.finalization.delayGrowFactor"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        name="parameters.finalization.delayGrowFactor"
                                        onChange={(e) => updateJsonData("parameters.finalization", { ...formData.parameters.finalization, delayGrowFactor: parseInt(e.target.value) })}
                                        defaultValue={formData.parameters.finalization.delayGrowFactor}
                                   />
                              </div>
                              <div className="form-field">
                                   <label className="block mb-2 text-3xl/2 font-semibold text-black mt-3" htmlFor="parameters.chain.version">Version:</label>
                                   <input
                                        type="text"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        id="parameters.chain.version"
                                        name="parameters.chain.version"
                                        onChange={(e) => updateJsonData('parameters.chain', { ...formData.parameters.chain, version: e.target.value })}
                                        defaultValue={formData.parameters.chain.version}
                                   />
                              </div>
                              <div className="form-field">
                                   <label className="block mb-2 text-3xl/2 font-semibold text-black mt-3" htmlFor="parameters.chain.electionDifficulty">Election Difficulty:</label>
                                   <input
                                        type="text"
                                        id="parameters.chain.electionDifficulty"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        name="parameters.chain.electionDifficulty"
                                        onChange={(e) => updateJsonData('parameters.chain', { ...formData.parameters.chain, electionDifficulty: e.target.value })}
                                        defaultValue={formData.parameters.chain.electionDifficulty}
                                   />
                              </div>
                              <div className="form-field">
                                   <label className="block mb-2 text-3xl/2 font-semibold text-black mt-3" htmlFor="parameters.chain.euroPerEnergy">EUR per Energy:</label>
                                   <input
                                        type="text"
                                        id="parameters.chain.euroPerEnergy"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        name="parameters.chain.euroPerEnergy"
                                        onChange={(e) => updateJsonData('parameters.chain', { ...formData.parameters.chain, euroPerEnergy: e.target.value })}
                                        defaultValue={formData.parameters.chain.euroPerEnergy}
                                   />
                              </div>
                              <div className="form-field">
                                   <label className="block mb-2 text-3xl/2 font-semibold text-black mt-3" htmlFor="parameters.chain.microCCDPerEuro">Micro CCD per EURO:</label>
                                   <input
                                        type="text"
                                        id="parameters.chain.microCCDPerEuro"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        name="parameters.chain.microCCDPerEuro"
                                        onChange={(e) => updateJsonData('parameters.chain', { ...formData.parameters.chain, microCCDPerEuro: e.target.value })}
                                        defaultValue={formData.parameters.chain.microCCDPerEuro}
                                   />
                              </div>
                              <div className="form-field">
                                   <label className="block mb-2 text-3xl/2 font-semibold text-black mt-3" htmlFor="parameters.chain.accountCreationLimit">Account Creation Limit:</label>
                                   <input
                                        type="text"
                                        id="parameters.chain.accountCreationLimit"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        name="parameters.chain.accountCreationLimit"
                                        onChange={(e) => updateJsonData('parameters.chain', { ...formData.parameters.chain, accountCreationLimit: e.target.value })}
                                        defaultValue={formData.parameters.chain.accountCreationLimit}
                                   />
                              </div>

                              <div className="form-field">
                                   <label className="block mb-2 text-3xl/2 font-semibold text-black mt-3" htmlFor="parameters.chain.timeParameters.rewardPeriodLength">Reward Period Length:</label>
                                   <input
                                        type="text"
                                        id="parameters.chain.timeParameters.rewardPeriodLength"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        name="parameters.chain.timeParameters.rewardPeriodLength"
                                        onChange={(e) => updateJsonData('parameters.chain.timeParameters', { ...formData.parameters.chain.timeParameters, rewardPeriodLength: parseInt(e.target.value) })}
                                        defaultValue={formData.parameters.chain.timeParameters.rewardPeriodLength}
                                   />
                              </div>
                              <div className="form-field">
                                   <label className="block mb-2 text-3xl/2 font-semibold text-black mt-3" htmlFor="parameters.chain.timeParameters.mintPerPayDay">Mint Per Pay Day:</label>
                                   <input
                                        type="text"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        id="parameters.chain.timeParameters.mintPerPayDay"
                                        name="parameters.chain.timeParameters.mintPerPayDay"
                                        onChange={(e) => updateJsonData('parameters.chain.timeParameters', { ...formData.parameters.chain.timeParameters, mintPerPayday: parseInt(e.target.value) })}
                                        defaultValue={formData.parameters.chain.timeParameters.mintPerPayday}
                                   />
                              </div>
                              <div className="form-field">
                                   <label className="block mb-2 text-3xl/2 font-semibold text-black mt-3" htmlFor="parameters.chain.poolParameters.passiveFinalizationCommission">Passive Finalization Commision:</label>
                                   <input
                                        type="text"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        id="parameters.chain.poolParameters.passiveFinalizationCommission"
                                        name="parameters.chain.poolParameters.passiveFinalizationCommission"
                                        onChange={(e) => updateJsonData('parameters.chain.poolParameters', { ...formData.parameters.chain.poolParameters, passiveFinalizationCommission: parseInt(e.target.value) })}
                                        defaultValue={formData.parameters.chain.poolParameters.passiveFinalizationCommission}
                                   />
                              </div>
                              <div className="form-field">
                                   <label className="block mb-2 text-3xl/2 font-semibold text-black mt-3" htmlFor="parameters.chain.poolParameters.passiveBakingCommission">Passive Baking Commision:</label>
                                   <input
                                        type="text"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        id="parameters.chain.poolParameters.passiveBakingCommission"
                                        name="parameters.chain.poolParameters.passiveBakingCommission"
                                        onChange={(e) => updateJsonData('parameters.chain.poolParameters', { ...formData.parameters.chain.poolParameters, passiveBakingCommission: parseInt(e.target.value) })}
                                        defaultValue={formData.parameters.chain.poolParameters.passiveBakingCommission}
                                   />
                              </div>
                              <div className="form-field">
                                   <label className="block mb-2 text-3xl/2 font-semibold text-black mt-3" htmlFor="parameters.chain.poolParameters.passiveTransactionCommission">Passive Transaction Commision:</label>
                                   <input
                                        type="text"
                                        id="parameters.chain.poolParameters.passiveTransactionCommission"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        name="parameters.chain.poolParameters.passiveTransactionCommission"
                                        onChange={(e) => updateJsonData('parameters.chain.poolParameters', { ...formData.parameters.chain.poolParameters, passiveTransactionCommission: parseInt(e.target.value) })}
                                        defaultValue={formData.parameters.chain.poolParameters.passiveTransactionCommission}
                                   />
                              </div>
                              <div className="form-field">
                                   <label className="block mb-2 text-3xl/2 font-semibold text-black mt-3" htmlFor="parameters.chain.poolParameters.finalizationCommissionRange.min">Min:</label>
                                   <input
                                        type="text"
                                        id="parameters.chain.poolParameters.finalizationCommissionRange.min"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        name="parameters.chain.poolParameters.finalizationCommissionRange.min"
                                        onChange={(e) => updateJsonData('parameters.chain.poolParameters.finalizationCommissionRange', { ...formData.parameters.chain.poolParameters.finalizationCommissionRange, min: parseInt(e.target.value) })}
                                        defaultValue={formData.parameters.chain.poolParameters.finalizationCommissionRange.min}
                                   />
                              </div>
                              <div className="form-field">
                                   <label className="block mb-2 text-3xl/2 font-semibold text-black mt-3" htmlFor="parameters.chain.poolParameters.finalizationCommissionRange.max">Max:</label>
                                   <input
                                        type="text"
                                        id="parameters.chain.poolParameters.finalizationCommissionRange.max"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        name="parameters.chain.poolParameters.finalizationCommissionRange.max"
                                        onChange={(e) => updateJsonData('parameters.chain.poolParameters.finalizationCommissionRange', { ...formData.parameters.chain.poolParameters.finalizationCommissionRange, max: parseInt(e.target.value) })}
                                        defaultValue={formData.parameters.chain.poolParameters.finalizationCommissionRange.max}
                                   />
                              </div>
                              <div className="form-field">
                                   <label className="block mb-2 text-3xl/2 font-semibold text-black mt-3" htmlFor="parameters.chain.poolParameters.bakingCommissionRange.min">Min:</label>
                                   <input
                                        type="text"
                                        id="parameters.chain.poolParameters.bakingCommissionRange.min"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        name="parameters.chain.poolParameters.bakingCommissionRange.min"
                                        onChange={(e) => updateJsonData('parameters.chain.poolParameters.bakingCommissionRange', { ...formData.parameters.chain.poolParameters.bakingCommissionRange, min: parseInt(e.target.value) })}
                                        defaultValue={formData.parameters.chain.poolParameters.bakingCommissionRange.min}
                                   />
                              </div>
                              <div className="form-field">
                                   <label className="block mb-2 text-3xl/2 font-semibold text-black mt-3" htmlFor="parameters.chain.poolParameters.bakingCommissionRange.max">Max:</label>
                                   <input
                                        type="text"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        id="parameters.chain.poolParameters.bakingCommissionRange.max"
                                        name="parameters.chain.poolParameters.bakingCommissionRange.max"
                                        onChange={(e) => updateJsonData('parameters.chain.poolParameters.bakingCommissionRange', { ...formData.parameters.chain.poolParameters.bakingCommissionRange, max: parseInt(e.target.value) })}
                                        defaultValue={formData.parameters.chain.poolParameters.bakingCommissionRange.max}
                                   />
                              </div>
                              <div className="form-field">
                                   <label className="block mb-2 text-3xl/2 font-semibold text-black mt-3" htmlFor="parameters.chain.poolParameters.transactionCommissionRange.min">Min:</label>
                                   <input
                                        type="text"
                                        id="parameters.chain.poolParameters.transactionCommissionRange.min"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        name="parameters.chain.poolParameters.transactionCommissionRange.min"
                                        onChange={(e) => updateJsonData('parameters.chain.poolParameters.transactionCommissionRange', { ...formData.parameters.chain.poolParameters.transactionCommissionRange, min: parseInt(e.target.value) })}
                                        defaultValue={formData.parameters.chain.poolParameters.transactionCommissionRange.min}
                                   />
                              </div>
                              <div className="form-field">
                                   <label className="block mb-2 text-3xl/2 font-semibold text-black mt-3" htmlFor="parameters.chain.poolParameters.transactionCommissionRange.max">Max:</label>
                                   <input
                                        type="text"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        id="parameters.chain.poolParameters.transactionCommissionRange.max"
                                        name="parameters.chain.poolParameters.transactionCommissionRange.max"
                                        onChange={(e) => updateJsonData('parameters.chain.poolParameters.transactionCommissionRange', { ...formData.parameters.chain.poolParameters.transactionCommissionRange, max: parseInt(e.target.value) })}
                                        defaultValue={formData.parameters.chain.poolParameters.transactionCommissionRange.max}
                                   />
                              </div>
                              <div className="form-field">
                                   <label className="block mb-2 text-3xl/2 font-semibold text-black mt-3" htmlFor="parameters.chain.poolParameters.minimumEquityCapital">Minimum Equity Capital:</label>
                                   <input
                                        type="text"
                                        id="parameters.chain.poolParameters.minimumEquityCapital"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        name="parameters.chain.poolParameters.minimumEquityCapital"
                                        onChange={(e) => updateJsonData('parameters.chain.poolParameters', { ...formData.parameters.chain.poolParameters, minimumEquityCapital: parseInt(e.target.value) })}
                                        defaultValue={formData.parameters.chain.poolParameters.minimumEquityCapital}
                                   />
                              </div>
                              <div className="form-field">
                                   <label className="block mb-2 text-3xl/2 font-semibold text-black mt-3" htmlFor="parameters.chain.poolParameters.capitalBound">Captial Bound:</label>
                                   <input
                                        type="text"
                                        id="parameters.chain.poolParameters.capitalBound"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        name="parameters.chain.poolParameters.capitalBound"
                                        onChange={(e) => updateJsonData('parameters.chain.poolParameters', { ...formData.parameters.chain.poolParameters, capitalBound: parseInt(e.target.value) })}
                                        defaultValue={formData.parameters.chain.poolParameters.capitalBound}
                                   />
                              </div>
                              <div className="form-field">
                                   <label className="block mb-2 text-3xl/2 font-semibold text-black mt-3" htmlFor="parameters.chain.poolParameters.leverageBound.numerator">Numerator:</label>
                                   <input
                                        type="text"
                                        id="parameters.chain.poolParameters.leverageBound.numerator"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        name="parameters.chain.poolParameters.leverageBound.numerator"
                                        onChange={(e) => updateJsonData('parameters.chain.poolParameters.leverageBound', { ...formData.parameters.chain.poolParameters.leverageBound, numerator: parseInt(e.target.value) })}
                                        defaultValue={formData.parameters.chain.poolParameters.leverageBound.numerator}
                                   />
                              </div>
                              <div className="form-field">
                                   <label className="block mb-2 text-3xl/2 font-semibold text-black mt-3" htmlFor="parameters.chain.poolParameters.leverageBound.denominator">Denominator:</label>
                                   <input
                                        type="text"
                                        id="parameters.chain.poolParameters.leverageBound.denominator"
                                        name="parameters.chain.poolParameters.leverageBound.denominator"
                                        onChange={(e) => updateJsonData('parameters.chain.poolParameters.leverageBound', { ...formData.parameters.chain.poolParameters.leverageBound, numerator: parseInt(e.target.value) })}
                                        defaultValue={formData.parameters.chain.poolParameters.leverageBound.denominator}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                   />
                              </div>
                              <div className="form-field">
                                   <label className="block mb-2 text-3xl/2 font-semibold text-black mt-3" htmlFor="parameters.chain.cooldownParameters.poolOwnerCooldown">Pool Owner Cooldown:</label>
                                   <input
                                        type="text"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        id="parameters.chain.cooldownParameters.poolOwnerCooldown"
                                        name="parameters.chain.cooldownParameters.poolOwnerCooldown"
                                        onChange={(e) => updateJsonData('parameters.chain.cooldownParameters', { ...formData.parameters.chain.cooldownParameters, poolOwnerCooldown: parseInt(e.target.value) })}
                                        defaultValue={formData.parameters.chain.cooldownParameters.poolOwnerCooldown}
                                   />
                              </div>
                              <div className="form-field">
                                   <label className="block mb-2 text-3xl/2 font-semibold text-black mt-3" htmlFor="parameters.chain.cooldownParameters.delegatorCooldown">Delegator Cooldown:</label>
                                   <input
                                        type="text"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        id="parameters.chain.cooldownParameters.delegatorCooldown"
                                        name="parameters.chain.cooldownParameters.delegatorCooldown"
                                        onChange={(e) => updateJsonData('parameters.chain.cooldownParameters', { ...formData.parameters.chain.cooldownParameters, delegatorCooldown: parseInt(e.target.value) })}
                                        defaultValue={formData.parameters.chain.cooldownParameters.delegatorCooldown}
                                   />
                              </div >
                              <div className="form-field">
                                   <label className="block mb-2 text-3xl/2 font-semibold text-black mt-3" htmlFor="parameters.chain.rewardParameters.mintDistribution.bakingReward">Baking Reward:</label>
                                   <input
                                        type="text"
                                        id="parameters.chain.rewardParameters.mintDistribution.bakingReward"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        name="parameters.chain.rewardParameters.mintDistribution.bakingReward"
                                        onChange={(e) => updateJsonData('parameters.chain.rewardParameters.mintDistribution', { ...formData.parameters.chain.rewardParameters.mintDistribution, bakingReward: parseInt(e.target.value) })}
                                        defaultValue={formData.parameters.chain.rewardParameters.mintDistribution.bakingReward}
                                   />
                              </div>
                              <div className="form-field">
                                   <label className="block mb-2 text-3xl/2 font-semibold text-black mt-3" htmlFor="parameters.chain.rewardParameters.mintDistribution.finalizationReward">Finalization Reward:</label>
                                   <input
                                        type="text"
                                        id="parameters.chain.rewardParameters.mintDistribution.finalizationReward"
                                        name="parameters.chain.rewardParameters.mintDistribution.finalizationReward"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        onChange={(e) => updateJsonData('parameters.chain.rewardParameters.mintDistribution', { ...formData.parameters.chain.rewardParameters.mintDistribution, finalizationReward: parseInt(e.target.value) })}
                                        defaultValue={formData.parameters.chain.rewardParameters.mintDistribution.finalizationReward}
                                   />
                              </div>
                              <div className="form-field">
                                   <label className="block mb-2 text-3xl/2 font-semibold text-black mt-3" htmlFor="parameters.chain.rewardParameters.transactionFeeDistribution.baker">Baker:</label>
                                   <input
                                        type="text"
                                        id="parameters.chain.rewardParameters.transactionFeeDistribution.baker"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        name="parameters.chain.rewardParameters.transactionFeeDistribution.baker"
                                        onChange={(e) => updateJsonData('parameters.chain.rewardParameters.transactionFeeDistribution', { ...formData.parameters.chain.rewardParameters.transactionFeeDistribution, baker: parseInt(e.target.value) })}
                                        defaultValue={formData.parameters.chain.rewardParameters.transactionFeeDistribution.baker}
                                   />
                              </div>
                              <div className="form-field">
                                   <label className="block mb-2 text-3xl/2 font-semibold text-black mt-3" htmlFor="parameters.chain.rewardParameters.transactionFeeDistribution.gasAccount">Gas Account:</label>
                                   <input
                                        type="text"
                                        id="parameters.chain.rewardParameters.transactionFeeDistribution.gasAccount"
                                        name="parameters.chain.rewardParameters.transactionFeeDistribution.gasAccount"
                                        onChange={(e) => updateJsonData('parameters.chain.rewardParameters.transactionFeeDistribution', { ...formData.parameters.chain.rewardParameters.transactionFeeDistribution, gasAccount: parseInt(e.target.value) })}
                                        defaultValue={formData.parameters.chain.rewardParameters.transactionFeeDistribution.gasAccount}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                   />
                              </div>
                              <div className="form-field">
                                   <label className="block mb-2 text-3xl/2 font-semibold text-black mt-3" htmlFor="parameters.chain.rewardParameters.GASRewards.baker">Baker:</label>
                                   <input
                                        type="text"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        id="parameters.chain.rewardParameters.GASRewards.baker"
                                        name="parameters.chain.rewardParameters.GASRewards.baker"
                                        onChange={(e) => updateJsonData('parameters.chain.rewardParameters.GASRewards', { ...formData.parameters.chain.rewardParameters.GASRewards, baker: parseInt(e.target.value) })}
                                        defaultValue={formData.parameters.chain.rewardParameters.GASRewards.baker}
                                   />
                              </div>
                              <div className="form-field">
                                   <label className="block mb-2 text-3xl/2 font-semibold text-black mt-3" htmlFor="parameters.chain.rewardParameters.GASRewards.finalizationProof">Finalization Proof:</label>
                                   <input
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        type="text"
                                        id="parameters.chain.rewardParameters.GASRewards.finalizationProof"
                                        name="parameters.chain.rewardParameters.GASRewards.finalizationProof"
                                        onChange={(e) => updateJsonData('parameters.chain.rewardParameters.GASRewards', { ...formData.parameters.chain.rewardParameters.GASRewards, finalizationProof: parseInt(e.target.value) })}
                                        defaultValue={formData.parameters.chain.rewardParameters.GASRewards.finalizationProof}
                                   />
                              </div>
                              <div className="form-field">
                                   <label className="block mb-2 text-3xl/2 font-semibold text-black mt-3" htmlFor="parameters.chain.rewardParameters.GASRewards.accountCreation">Account Creation:</label>
                                   <input
                                        type="text"
                                        id="parameters.chain.rewardParameters.GASRewards.accountCreation"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        name="parameters.chain.rewardParameters.GASRewards.accountCreation"
                                        onChange={(e) => updateJsonData('parameters.chain.rewardParameters.GASRewards', { ...formData.parameters.chain.rewardParameters.GASRewards, accountCreation: parseInt(e.target.value) })}
                                        defaultValue={formData.parameters.chain.rewardParameters.GASRewards.accountCreation}
                                   />
                              </div>
                              <div className="form-field">
                                   <label className="block mb-2 text-3xl/2 font-semibold text-black mt-3" htmlFor="parameters.chain.rewardParameters.GASRewards.chainUpdate">Chain Update:</label>
                                   <input
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        type="number"
                                        id="parameters.chain.rewardParameters.GASRewards.chainUpdate"
                                        name="parameters.chain.rewardParameters.GASRewards.chainUpdate"
                                        defaultValue={formData.parameters.chain.rewardParameters.GASRewards.chainUpdate}
                                        onChange={(e) => updateJsonData('parameters.chain.rewardParameters.GASRewards', { ...formData.parameters.chain.rewardParameters.GASRewards, chainUpdate: parseInt(e.target.value) })}
                                   />
                              </div>
                         </form >
                    </CModalBody>
                    <CModalFooter>
                         <CButton className="btn bg-ctp-red hover:bg-ctp-red text-black" color="secondary" onClick={() => setVisible(false)}>
                              Close
                         </CButton>
                         <input className="btn btn-primary bg-black text-white" type="submit" form="settingsform" value="Save Changes" />

                    </CModalFooter>
               </CModal >
          </>
     );
}


export default SettingsPage;


