# Concordium LC1C
Concordium LC1C (Local Chain 1 Click) is a GUI tool that developers that wish to build on Concordium can use to easily build and deploy local chains and keep track of balances and transactions.

## Installation Page
The first page is used to ensure that the developer has all the tools and packages needed in order to launch a local chain on their operating system. There are currently two main tools: [Concordium Node](https://github.com/Concordium/concordium-node) and [Genesis Creator](https://github.com/Concordium/concordium-misc-tools/tree/main/genesis-creator). LC1C will verify that all tools are installed and functioning correctly then will allow the developer to move on to the next page, the Genesis Builder.

## Genesis Builder
The genesis builder page allows to the developer to build a genesis for a new local chain or load a previously created chain. 
There are currently 3 different options to build a genesis file: Easy, Advanced and Expert. 

### Easy Builder
The easy option allows to launch a local chain with the default configuarations found [here](https://raw.githubusercontent.com/Concordium/concordium-misc-tools/9d347761aadd432cbb6211a7d7ba38cdc07f1d11/genesis-creator/examples/single-baker-example-p5.toml). This option is best for either new developers or developers that do not care about configuartions of the blockchain and only about building contracts on top of it. 

### Advanced Builder
The advanced builder allows for some configurations to be done to the blockchain parameters. These parameters are the main parameters that we believe are most important for developers that are looking to tinker with some configs without going too deep.

### Expert Builder 
The Expert Builder platform is meticulously designed for developers who seek granular control over parameters, enabling them to delve into intricate chain configurations. This platform caters to those with a deep understanding of system structures and a passion for fine-tuning and optimizing their projects. With a comprehensive set of tools and configurations at their disposal, developers can customize, and innovate, ensuring the highest standards of precision and performance.

### Parameters
Below is a guide to understanding the set of genesis parameters more clearly.

#### Output Path Parameters
The Genesis Builder provides a mechanism for developers to define and customize the output paths for various keys and configurations.

1. updateKeys: This parameter specifies the path where the update keys will be stored.
2. accountKeys: Designates the path to store keys related to accounts.
3. bakerKeys: This is where the baker-related keys will be saved.
4. identityProviders: Use this parameter to set the path for saving identity provider details.
5. anonymityRevokers: Determines the location to store keys or details related to anonymity revokers.
6. genesis: Specifies the path for the primary genesis data file.
7. genesisHash: This parameter points to the location where the hash of the genesis block will be saved.
8. cryptographicParameters: Indicates the path to store global cryptographic parameters.

#### Cryptographic Parameters
Cryptographic parameters generates the cryptographic files that ensure the security of the chain starting from a genesis string. 

1. kind: Determines how the cryptographic parameters will be set up. Can be either `generate` to create new parameters or `existing` to load parameters from a JSON file.
2. genesisString: String that acts as initial seed or reference when `kind` is set to `generate`. 
3. source: The path to the JSON file that contains the cryptographic parameters. This is used when `kind` is set to `existing`. 

#### Anonimity Revokers
Similarly to cryptographic parameters, anonimity revokers can either be new (`fresh`) or existant in a JSON file (`existing`).
1. kind: Determines how the anonimity revokers will be set up. Can be either `fresh` to create new revokers or `existing` to load parameters from a JSON file.
2. id: Integer that represents the identifier of the first revoker created. 
3. repeat: Integer `n` that represents how many revokers to be created starting from `id`. 
4. source: To be used if kind is `existing`. Represents the path to the JSON file holding the pre-existing anonimity revokers. 

Multiple kinds of anonimity revokers can be created as well following that example.
```
[[anonymityRevokers]]
kind = "fresh"
id = 3
repeat = 3

[[anonymityRevokers]]
kind = "existing"
source = "some/path/ar-info-1.json"

[[anonymityRevokers]]
kind = "existing"
source = "some/path/ar-info-2.json"
```

#### Identity Providers
Identity providers are off-chain verifiers to the data of the identity data sent on the blockchain for a certain account. For each identity issued for a user, the identity provider stores a record off-chain called an `identity object`. The primary function of identity providers are to: 

1. Verify the identity of the users.
2. Issue user identity certificates to users.
3. Create and store identity objects and relevant attributes for record-keeping purposes.
4. Participate in the anonymity revocation process.

The build in genesis is similar to [Anonimity Revoker parameters](#anonimity-revokers).

#### Account Parameters
These parameters set the configurations for the genesis accounts created on-chain. Each genesis account can be generated freshly (`fresh`) or given from a file with an existing account.

1. balance: The balance of `micro-CCD` that each account should hold.
2. foundation: `boolean` that specifies whether this account is a foundation account or not.
3. identityProvider: the id of the identityProvider used to verify the entity of this account.
4. numKeys: The number of account keys to create for the account.
5. repeat: Integer `n` that represents how many accounts to be created for this configuration.
6. stake: Required for `baker` accounts. Represents the starting staking amount in `micro-CCD`. 
7. restakeEarnings: Only for baker accounts. `boolean` that represents if the baker will restake their earnings or not.

Example of creating accounts: 
```
[[accounts]]
kind = "fresh"
balance = "1000000000"
template = "foundation"
identityProvider = 0
numKeys = 1
threshold = 1
repeat = 10
foundation = true


[[accounts]]
kind = "fresh"
balance = "1000000000"
stake = "500000000"
template = "baker"
identityProvider = 0
numKeys = 1
threshold = 1
repeat = 5

[[accounts]]
kind = "existing"
source = "account.json"
balance = "1000000000"

[[accounts]]
kind = "existing"
source = "baker.json"
balance = "1000000000"
stake = "500000000"
restakeEarnings = true
bakerKeys = "baker-credentials.json"

[[accounts]]
kind = "existing"
source = "baker2.json"
balance = "1000000000"
```

#### Genesis Parameters
The core genesis parameters are: genesis time, slot duration, epochLength and maximum block energy. 

1. genesisTime: The date at which the chain is supposed to start. If set in the past, chain starts directly. ex: `2021-06-09T06:00:00Z`
2. slotDuration: Duration of a slot in `ms` in an epoch to ensure that blocks are produced within the expected block time and to reduce the likelihood of having multiple winners.
3. epochLength: Number of slots for the duration of an entire epoch. An epoch is a specific period of time when specific events should occur, such as reward distribution.
4. leadershipElectionNonce: a randomized value that is updated each epoch that is used to seed the leader election process.
5. maxBlockEnergy: The maximum amount of gas or computational resource that a single block can use. A later parameter will define in euro the cost of energy in Euro.

#### Finalization Parameters
Finalization parameters are the set of conditions or criteria that a block must satisfy to be deemed valid.
1. minimumSkip: The minimum number of slots that a baker can skip before participating in the finalization process. A value of 0 implies no skipping is allowed.
2. commiteeMaxSize: Represents the maximum number of bakers that can be part of the finalization committee. A committee consists of bakers with a staked amount of at least 0.1% of the total effective stake in baker pools.
3. waitingTime: The time in milliseconds that a baker should wait before initiating an action during the finalization stage. 

#### Chain Parameters
1. ElectionDifficulty: The difficulty to elect a leader baker for a certain block. Each 1 basis point (0.01) represents `1s` block time.
2. euroPerEnergy: The cost of 1 Energy in Euros. 
3. microCCDPerEuro: The amount of micro-CCD in one Euro.
4. accountCreationLimit: The maximum amount of accounts that is allowed to be created for a unique kind.

#### Time Parameters
1. RewardPeriodLength: The amount of epochs which represent the time that rewards are being accrued for before being distributed. Also known as `payDay`.
2. mintPerPayday: The amount of microCCD to be minted each `payDay`.

#### Pool Parameters
Pool parameters are the parameters that govern the baker's pool of delegations.

1. passiveFinalizationCommission: The commission (between 0 and 1) that bakers take from passive delegators the finalization rewards earned by bakers that are active in the finalization protocol. If set to 1, then rewards are NOT distributed to passive delegators.


## Troubleshooting
There are a couple of issues that a developer might initially face on the first page when installing the tools, this section focuses on how to troubleshoot the issues and solve them. 

### Installation of Concordium Node Incomplete
Although you believe that you have correctly installed Concordium Node, verification fails. If verification fails, it means that there is a certain permission issue on the OS.