import { useState } from "react";
import { CButton, CModalFooter, CModal, CModalHeader, CModalBody, CModalTitle } from "@coreui/react";
import '@coreui/coreui/dist/css/coreui.min.css'

let settingsData = {
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
}

function SettingsPage() {
     const initialFormData = { ...settingsData };
     console.log(initialFormData);
     const [formData, setFormData] = useState(initialFormData)
     const [visible, setVisible] = useState(false)
     const handleInputChange = (event) => {
          const { name, value } = event.target;
          setFormData((prevData) => ({
               ...prevData,
               [name]: value,
          }));
     };

     const handleSubmit = (event) => {
          event.preventDefault();
          console.log(formData);
     };

     return (
          <>
               <CButton className="btn bg-ctp-green mx-auto" onClick={() => setVisible(!visible)}>Launch demo modal</CButton>
               <CModal className="bg-gradient-to-b from-ctp-base to-ctp-crust p-6 overflow-auto w-1/2 " scrollable visible={visible} onClose={() => setVisible(false)}>
                    <CModalHeader>
                         <CModalTitle className="text-3xl text-black font-bolder">Settings</CModalTitle>
                    </CModalHeader>
                    <CModalBody>
                         <form onSubmit={handleSubmit}>
                              <div className="form-field">
                                   <label className="block mb-2 text-3xl/2 font-semibold text-black mt-3" htmlFor="parameters.slotDuration">Slot Duration:</label>
                                   <input
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        type="text"
                                        id="parameters.slotDuration"
                                        name="parameters.slotDuration"
                                        value={formData.parameters.slotDuration}
                                        onChange={handleInputChange}
                                   />
                              </div>
                              <div className="form-field">
                                   <label className="block mb-2 text-3xl/2 font-semibold text-black mt-3" htmlFor="parameters.leadershipElectionNonce">Leadership Election Nonce:</label>
                                   <input
                                        type="text"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        id="parameters.leadershipElectionNonce"
                                        name="parameters.leadershipElectionNonce"
                                        value={formData.parameters.leadershipElectionNonce}
                                        onChange={handleInputChange}
                                   />
                              </div>
                              <div className="form-field">
                                   <label className="block mb-2 text-3xl/2 font-semibold text-black mt-3" htmlFor="parameters.epochLength">Epoch Length:</label>
                                   <input
                                        type="text"
                                        id="parameters.epochLength"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        name="parameters.epochLength"
                                        value={formData.parameters.epochLength}
                                        onChange={handleInputChange}
                                   />
                              </div>
                              <div className="form-field">
                                   <label className="block mb-2 text-3xl/2 font-semibold text-black mt-3" htmlFor="parameters.maxBlockEnergy">Max Block Energy:</label>
                                   <input
                                        type="text"
                                        id="parameters.maxBlockEnergy"
                                        name="parameters.maxBlockEnergy"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        value={formData.parameters.maxBlockEnergy}
                                        onChange={handleInputChange}
                                   />
                              </div>
                              <div className="form-field">
                                   <label className="block mb-2 text-3xl/2 font-semibold text-black mt-3" htmlFor="parameters.finalization.minimumSkip">Minimum Skip:</label>
                                   <input
                                        type="text"
                                        id="parameters.finalization.minimumSkip"
                                        name="parameters.finalization.minimumSkip"
                                        value={formData.parameters.finalization.minimumSkip}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        onChange={handleInputChange}
                                   />
                              </div>
                              <div className="form-field">
                                   <label className="block mb-2 text-3xl/2 font-semibold text-black mt-3" htmlFor="parameters.finalization.committeeMaxSize">Committee Max Size:</label>
                                   <input
                                        type="text"
                                        id="parameters.finalization.committeeMaxSize"
                                        name="parameters.finalization.committeeMaxSize"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        value={formData.parameters.finalization.committeeMaxSize}
                                        onChange={handleInputChange}
                                   />
                              </div>
                              <div className="form-field">
                                   <label className="block mb-2 text-3xl/2 font-semibold text-black mt-3" htmlFor="parameters.finalization.waitingTime">Waiting Time:</label>
                                   <input
                                        type="text"
                                        id="parameters.finalization.waitingTime"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        name="parameters.finalization.waitingTime"
                                        value={formData.parameters.finalization.waitingTime}
                                        onChange={handleInputChange}
                                   />
                              </div>
                              <div className="form-field">
                                   <label className="block mb-2 text-3xl/2 font-semibold text-black mt-3" htmlFor="parameters.finalization.skipShrinkFactor">Skip Shrink Factor:</label>
                                   <input
                                        type="text"
                                        id="parameters.finalization.skipShrinkFactor"
                                        name="parameters.finalization.skipShrinkFactor"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        value={formData.parameters.finalization.skipShrinkFactor}
                                        onChange={handleInputChange}
                                   />
                              </div>

                              <div className="form-field">
                                   <label className="block mb-2 text-3xl/2 font-semibold text-black mt-3" htmlFor="parameters.finalization.skipGrowFactor">Skip Grow Factor:</label>
                                   <input
                                        type="text"
                                        id="parameters.finalization.skipGrowFactor"
                                        name="parameters.finalization.skipGrowFactor"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        value={formData.parameters.finalization.skipGrowFactor}
                                        onChange={handleInputChange}
                                   />
                              </div>

                              <div className="form-field">
                                   <label className="block mb-2 text-3xl/2 font-semibold text-black mt-3" htmlFor="parameters.finalization.delayShrinkFactor">Delay Shrink Factor:</label>
                                   <input
                                        type="text"
                                        id="parameters.finalization.delayShrinkFactor"
                                        name="parameters.finalization.delayShrinkFactor"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        value={formData.parameters.finalization.delayShrinkFactor}
                                        onChange={handleInputChange}
                                   />
                              </div>
                              <div className="form-field">
                                   <label className="block mb-2 text-3xl/2 font-semibold text-black mt-3" htmlFor="parameters.finalization.delayGrowFactor">Delay Grow Factor:</label>
                                   <input
                                        type="text"
                                        id="parameters.finalization.delayGrowFactor"
                                        name="parameters.finalization.delayGrowFactor"
                                        value={formData.parameters.finalization.delayGrowFactor}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        onChange={handleInputChange}
                                   />
                              </div>
                              <div className="form-field">
                                   <label className="block mb-2 text-3xl/2 font-semibold text-black mt-3" htmlFor="parameters.chain.version">Version:</label>
                                   <input
                                        type="text"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        id="parameters.chain.version"
                                        name="parameters.chain.version"
                                        value={formData.parameters.chain.version}
                                        onChange={handleInputChange}
                                   />
                              </div>
                              <div className="form-field">
                                   <label className="block mb-2 text-3xl/2 font-semibold text-black mt-3" htmlFor="parameters.chain.electionDifficulty">Election Difficulty:</label>
                                   <input
                                        type="text"
                                        id="parameters.chain.electionDifficulty"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        name="parameters.chain.electionDifficulty"
                                        value={formData.parameters.chain.electionDifficulty}
                                        onChange={handleInputChange}
                                   />
                              </div>
                              <div className="form-field">
                                   <label className="block mb-2 text-3xl/2 font-semibold text-black mt-3" htmlFor="parameters.chain.euroPerEnergy">EUR per Energy:</label>
                                   <input
                                        type="text"
                                        id="parameters.chain.euroPerEnergy"
                                        name="parameters.chain.euroPerEnergy"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        value={formData.parameters.chain.euroPerEnergy}
                                        onChange={handleInputChange}
                                   />
                              </div>
                              <div className="form-field">
                                   <label className="block mb-2 text-3xl/2 font-semibold text-black mt-3" htmlFor="parameters.chain.microCCDPerEuro">Micro CCD per EURO:</label>
                                   <input
                                        type="text"
                                        id="parameters.chain.microCCDPerEuro"
                                        name="parameters.chain.microCCDPerEuro"
                                        value={formData.parameters.chain.microCCDPerEuro}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        onChange={handleInputChange}
                                   />
                              </div>
                              <div className="form-field">
                                   <label className="block mb-2 text-3xl/2 font-semibold text-black mt-3" htmlFor="parameters.chain.accountCreationLimit">Account Creation Limit:</label>
                                   <input
                                        type="text"
                                        id="parameters.chain.accountCreationLimit"
                                        name="parameters.chain.accountCreationLimit"
                                        value={formData.parameters.chain.accountCreationLimit}
                                        onChange={handleInputChange}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                   />
                              </div>
                              <div className="form-field">
                                   <label className="block mb-2 text-3xl/2 font-semibold text-black mt-3" htmlFor="parameters.chain.timeParameters.rewardPeriodLength">Reward Period Length:</label>
                                   <input
                                        type="text"
                                        id="parameters.chain.timeParameters.rewardPeriodLength"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        name="parameters.chain.timeParameters.rewardPeriodLength"
                                        value={formData.parameters.chain.timeParameters.rewardPeriodLength}
                                        onChange={handleInputChange}
                                   />
                              </div>
                              <div className="form-field">
                                   <label className="block mb-2 text-3xl/2 font-semibold text-black mt-3" htmlFor="parameters.chain.timeParameters.mintPerPayDay">Mint Per Pay Day:</label>
                                   <input
                                        type="text"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        id="parameters.chain.timeParameters.mintPerPayDay"
                                        name="parameters.chain.timeParameters.mintPerPayDay"
                                        value={formData.parameters.chain.timeParameters.mintPerPayday}
                                        onChange={handleInputChange}
                                   />
                              </div>
                              <div className="form-field">
                                   <label className="block mb-2 text-3xl/2 font-semibold text-black mt-3" htmlFor="parameters.chain.poolParameters.passiveFinalizationCommission">Passive Finalization Commision:</label>
                                   <input
                                        type="text"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        id="parameters.chain.poolParameters.passiveFinalizationCommission"
                                        name="parameters.chain.poolParameters.passiveFinalizationCommission"
                                        value={formData.parameters.chain.poolParameters.passiveFinalizationCommission}
                                        onChange={handleInputChange}
                                   />
                              </div>
                              <div className="form-field">
                                   <label className="block mb-2 text-3xl/2 font-semibold text-black mt-3" htmlFor="parameters.chain.poolParameters.passiveBakingCommission">Passive Baking Commision:</label>
                                   <input
                                        type="text"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        id="parameters.chain.poolParameters.passiveBakingCommission"
                                        name="parameters.chain.poolParameters.passiveBakingCommission"
                                        value={formData.parameters.chain.poolParameters.passiveBakingCommission}
                                        onChange={handleInputChange}
                                   />
                              </div>
                              <div className="form-field">
                                   <label className="block mb-2 text-3xl/2 font-semibold text-black mt-3" htmlFor="parameters.chain.poolParameters.passiveTransactionCommission">Passive Transaction Commision:</label>
                                   <input
                                        type="text"
                                        id="parameters.chain.poolParameters.passiveTransactionCommission"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        name="parameters.chain.poolParameters.passiveTransactionCommission"
                                        value={formData.parameters.chain.poolParameters.passiveTransactionCommission}
                                        onChange={handleInputChange}
                                   />
                              </div>
                              <div className="form-field">
                                   <label className="block mb-2 text-3xl/2 font-semibold text-black mt-3" htmlFor="parameters.chain.poolParameters.finalizationCommissionRange.min">Min:</label>
                                   <input
                                        type="text"
                                        id="parameters.chain.poolParameters.finalizationCommissionRange.min"
                                        name="parameters.chain.poolParameters.finalizationCommissionRange.min"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        value={formData.parameters.chain.poolParameters.finalizationCommissionRange.min}
                                        onChange={handleInputChange}
                                   />
                              </div>
                              <div className="form-field">
                                   <label className="block mb-2 text-3xl/2 font-semibold text-black mt-3" htmlFor="parameters.chain.poolParameters.finalizationCommissionRange.max">Max:</label>
                                   <input
                                        type="text"
                                        id="parameters.chain.poolParameters.finalizationCommissionRange.max"
                                        name="parameters.chain.poolParameters.finalizationCommissionRange.max"
                                        value={formData.parameters.chain.poolParameters.finalizationCommissionRange.max}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        onChange={handleInputChange}
                                   />
                              </div>
                              <div className="form-field">
                                   <label className="block mb-2 text-3xl/2 font-semibold text-black mt-3" htmlFor="parameters.chain.poolParameters.bakingCommissionRange.min">Min:</label>
                                   <input
                                        type="text"
                                        id="parameters.chain.poolParameters.bakingCommissionRange.min"
                                        name="parameters.chain.poolParameters.bakingCommissionRange.min"
                                        value={formData.parameters.chain.poolParameters.bakingCommissionRange.min}
                                        onChange={handleInputChange}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                   />
                              </div>
                              <div className="form-field">
                                   <label className="block mb-2 text-3xl/2 font-semibold text-black mt-3" htmlFor="parameters.chain.poolParameters.bakingCommissionRange.max">Max:</label>
                                   <input
                                        type="text"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        id="parameters.chain.poolParameters.bakingCommissionRange.max"
                                        name="parameters.chain.poolParameters.bakingCommissionRange.max"
                                        value={formData.parameters.chain.poolParameters.bakingCommissionRange.max}
                                        onChange={handleInputChange}
                                   />
                              </div>
                              <div className="form-field">
                                   <label className="block mb-2 text-3xl/2 font-semibold text-black mt-3" htmlFor="parameters.chain.poolParameters.transactionCommissionRange.min">Min:</label>
                                   <input
                                        type="text"
                                        id="parameters.chain.poolParameters.transactionCommissionRange.min"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        name="parameters.chain.poolParameters.transactionCommissionRange.min"
                                        value={formData.parameters.chain.poolParameters.transactionCommissionRange.min}
                                        onChange={handleInputChange}
                                   />
                              </div>
                              <div className="form-field">
                                   <label className="block mb-2 text-3xl/2 font-semibold text-black mt-3" htmlFor="parameters.chain.poolParameters.transactionCommissionRange.max">Max:</label>
                                   <input
                                        type="text"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        id="parameters.chain.poolParameters.transactionCommissionRange.max"
                                        name="parameters.chain.poolParameters.transactionCommissionRange.max"
                                        value={formData.parameters.chain.poolParameters.transactionCommissionRange.max}
                                        onChange={handleInputChange}
                                   />
                              </div>
                              <div className="form-field">
                                   <label className="block mb-2 text-3xl/2 font-semibold text-black mt-3" htmlFor="parameters.chain.poolParameters.minimumEquityCapital">Minimum Equity Capital:</label>
                                   <input
                                        type="text"
                                        id="parameters.chain.poolParameters.minimumEquityCapital"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        name="parameters.chain.poolParameters.minimumEquityCapital"
                                        value={formData.parameters.chain.poolParameters.minimumEquityCapital}
                                        onChange={handleInputChange}
                                   />
                              </div>
                              <div className="form-field">
                                   <label className="block mb-2 text-3xl/2 font-semibold text-black mt-3" htmlFor="parameters.chain.poolParameters.capitalBound">Captial Bound:</label>
                                   <input
                                        type="text"
                                        id="parameters.chain.poolParameters.capitalBound"
                                        name="parameters.chain.poolParameters.capitalBound"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        value={formData.parameters.chain.poolParameters.capitalBound}
                                        onChange={handleInputChange}
                                   />
                              </div>
                              <div className="form-field">
                                   <label className="block mb-2 text-3xl/2 font-semibold text-black mt-3" htmlFor="parameters.chain.poolParameters.leverageBound.numerator">Numerator:</label>
                                   <input
                                        type="text"
                                        id="parameters.chain.poolParameters.leverageBound.numerator"
                                        name="parameters.chain.poolParameters.leverageBound.numerator"
                                        value={formData.parameters.chain.poolParameters.leverageBound.numerator}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        onChange={handleInputChange}
                                   />
                              </div>
                              <div className="form-field">
                                   <label className="block mb-2 text-3xl/2 font-semibold text-black mt-3" htmlFor="parameters.chain.poolParameters.leverageBound.denominator">Denominator:</label>
                                   <input
                                        type="text"
                                        id="parameters.chain.poolParameters.leverageBound.denominator"
                                        name="parameters.chain.poolParameters.leverageBound.denominator"
                                        value={formData.parameters.chain.poolParameters.leverageBound.denominator}
                                        onChange={handleInputChange}
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
                                        value={formData.parameters.chain.cooldownParameters.poolOwnerCooldown}
                                        onChange={handleInputChange}
                                   />
                              </div>
                              <div className="form-field">
                                   <label className="block mb-2 text-3xl/2 font-semibold text-black mt-3" htmlFor="parameters.chain.cooldownParameters.delegatorCooldown">Delegator Cooldown:</label>
                                   <input
                                        type="text"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        id="parameters.chain.cooldownParameters.delegatorCooldown"
                                        name="parameters.chain.cooldownParameters.delegatorCooldown"
                                        value={formData.parameters.chain.cooldownParameters.delegatorCooldown}
                                        onChange={handleInputChange}
                                   />
                              </div >
                              <div className="form-field">
                                   <label className="block mb-2 text-3xl/2 font-semibold text-black mt-3" htmlFor="parameters.chain.rewardParameters.mintDistribution.bakingReward">Baking Reward:</label>
                                   <input
                                        type="text"
                                        id="parameters.chain.rewardParameters.mintDistribution.bakingReward"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        name="parameters.chain.rewardParameters.mintDistribution.bakingReward"
                                        value={formData.parameters.chain.rewardParameters.mintDistribution.bakingReward}
                                        onChange={handleInputChange}
                                   />
                              </div>
                              <div className="form-field">
                                   <label className="block mb-2 text-3xl/2 font-semibold text-black mt-3" htmlFor="parameters.chain.rewardParameters.mintDistribution.finalizationReward">Finalization Reward:</label>
                                   <input
                                        type="text"
                                        id="parameters.chain.rewardParameters.mintDistribution.finalizationReward"
                                        name="parameters.chain.rewardParameters.mintDistribution.finalizationReward"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        value={formData.parameters.chain.rewardParameters.mintDistribution.finalizationReward}
                                        onChange={handleInputChange}
                                   />
                              </div>
                              <div className="form-field">
                                   <label className="block mb-2 text-3xl/2 font-semibold text-black mt-3" htmlFor="parameters.chain.rewardParameters.transactionFeeDistribution.baker">Baker:</label>
                                   <input
                                        type="text"
                                        id="parameters.chain.rewardParameters.transactionFeeDistribution.baker"
                                        name="parameters.chain.rewardParameters.transactionFeeDistribution.baker"
                                        value={formData.parameters.chain.rewardParameters.transactionFeeDistribution.baker}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        onChange={handleInputChange}
                                   />
                              </div>
                              <div className="form-field">
                                   <label className="block mb-2 text-3xl/2 font-semibold text-black mt-3" htmlFor="parameters.chain.rewardParameters.transactionFeeDistribution.gasAccount">Gas Account:</label>
                                   <input
                                        type="text"
                                        id="parameters.chain.rewardParameters.transactionFeeDistribution.gasAccount"
                                        name="parameters.chain.rewardParameters.transactionFeeDistribution.gasAccount"
                                        value={formData.parameters.chain.rewardParameters.transactionFeeDistribution.gasAccount}
                                        onChange={handleInputChange}
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
                                        value={formData.parameters.chain.rewardParameters.GASRewards.baker}
                                        onChange={handleInputChange}
                                   />
                              </div>
                              <div className="form-field">
                                   <label className="block mb-2 text-3xl/2 font-semibold text-black mt-3" htmlFor="parameters.chain.rewardParameters.GASRewards.finalizationProof">Finalization Proof:</label>
                                   <input
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        type="text"
                                        id="parameters.chain.rewardParameters.GASRewards.finalizationProof"
                                        name="parameters.chain.rewardParameters.GASRewards.finalizationProof"
                                        value={formData.parameters.chain.rewardParameters.GASRewards.finalizationProof}
                                        onChange={handleInputChange}
                                   />
                              </div>
                              <div className="form-field">
                                   <label className="block mb-2 text-3xl/2 font-semibold text-black mt-3" htmlFor="parameters.chain.rewardParameters.GASRewards.accountCreation">Account Creation:</label>
                                   <input
                                        type="text"
                                        id="parameters.chain.rewardParameters.GASRewards.accountCreation"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        name="parameters.chain.rewardParameters.GASRewards.accountCreation"
                                        value={formData.parameters.chain.rewardParameters.GASRewards.accountCreation}
                                        onChange={handleInputChange}
                                   />
                              </div>
                              <div className="form-field">
                                   <label className="block mb-2 text-3xl/2 font-semibold text-black mt-3" htmlFor="parameters.chain.rewardParameters.GASRewards.chainUpdate">Chain Update:</label>
                                   <input
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        type="number"
                                        id="parameters.chain.rewardParameters.GASRewards.chainUpdate"
                                        name="parameters.chain.rewardParameters.GASRewards.chainUpdate"
                                        value={formData.parameters.chain.rewardParameters.GASRewards.chainUpdate}
                                        onChange={handleInputChange}
                                   />
                              </div>
                         </form>
                    </CModalBody>
                    <CModalFooter>
                         <CButton className="btn bg-ctp-red text-black" color="secondary" onClick={() => setVisible(false)}>
                              Close
                         </CButton>
                         <CButton type="submit" color="primary">Save changes</CButton>
                    </CModalFooter>
               </CModal>
          </>
     );
}

export default SettingsPage;
