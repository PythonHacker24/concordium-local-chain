import { useState, useEffect } from "react";
import { CButton, CModalFooter, CModal, CModalHeader, CModalBody, CModalTitle } from "@coreui/react";
import '@coreui/coreui/dist/css/coreui.min.css'


const AdvancedSettingsPage = ({ onHandleSubmit }) => {
     const [visible, setVisible] = useState(false);
     const [formData, setFormData] = useState(localStorage.getItem('advancedConfig')?JSON.parse(localStorage.getItem('advancedConfig') as any):{
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
                         gASRewards: {
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
          } else if (key === 'parameters.chain.rewardParameters.gASRewards') {
               updatedData.parameters.chain.rewardParameters.gASRewards = value;
          } else if(key === 'accounts') {
               updatedData[key][0] = value;
               console.log("accounts = ", value);
          }else{
               console.log("sasa = ",key, value);
               updatedData[key] = value;
          }
          // Update the state with the modified JSON object
          setFormData(updatedData);
     };

     const handleSubmit = (event: any) => {
          event.preventDefault();
          onHandleSubmit(formData);
          console.log("its daya = ",formData);
          localStorage.setItem('advancedConfig', JSON.stringify(formData));
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
                                   <label className="block mb-2 text-3xl/2 font-semibold text-black mt-3" htmlFor="accounts[0].kind">Account Balance:</label>
                                   <input
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        type="number"
                                        id="accounts[0].balance"
                                        name="accounts[0].balance"
                                        onChange={(e) => updateJsonData("accounts", { ...formData.accounts[0], balance: e.target.value })}
                                       defaultValue={formData.accounts[0].balance}

                                   />
                              </div>
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
                                   <label className="block mb-2 text-3xl/2 font-semibold text-black mt-3" htmlFor="parameters.leadershipElectionNonce">Foundation Balance:</label>
                                   <input
                                        type="text"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        id="accounts[1].balance"
                                        name="accounts[1].balance"
                                        onChange={(e) => updateJsonData('accounts[1]', { ...formData, balance: e.target.value })}
                                        defaultValue={formData.accounts[1].balance}
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


export default AdvancedSettingsPage;


