
export const settingsData = {
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
               "oolParameters": {
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
