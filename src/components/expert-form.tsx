import { useState, FC } from "react";
import {
  CButton,
  CModalFooter,
  CModal,
  CModalHeader,
  CModalBody,
  CModalTitle,
} from "@coreui/react";
import "@coreui/coreui/dist/css/coreui.min.css";
interface ExprtSettingsPageProps {
  onHandleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}
const ExpertSettingsPage: FC<ExprtSettingsPageProps> = ({ onHandleSubmit }) => {
  const [visible, setVisible] = useState(false);

  const [tomlConfig, setTomlConfig] = useState(`
protocolVersion = "5"

[out]
updateKeys = "./update-keys"
accountKeys = "./accounts"
bakerKeys = "./bakers"
identityProviders = "./idps"
anonymityRevokers = "./ars"
genesis = "./genesis.dat"
cryptographicParameters = "./global"
deleteExisting = true
genesisHash = "./genesis_hash"

[cryptographicParameters]
kind = "generate"
genesisString = "Local genesis parameters."

[[anonymityRevokers]]
kind = "fresh"
id = 1
repeat = 3

[[identityProviders]]
kind = "fresh"
id = 0
repeat = 3

# the baker account
[[accounts]]
kind = "fresh"
balance = "3500000000000000"
stake =   "3000000000000000"
template = "baker"
identityProvider = 0
numKeys = 1
threshold = 1
repeat = 1

# the foundation account
[[accounts]]
kind = "fresh"
balance = "10000000000000000"
template = "foundation"
identityProvider = 0
numKeys = 1
threshold = 1
repeat = 1
foundation = true

# the extra accounts
[[accounts]]
kind = "fresh"
balance = "2000000000000"
template = "stagenet"
identityProvider = 0
numKeys = 1
threshold = 1
repeat = 100

# update key configuration
[updates]
root = { threshold = 5, keys = [{kind = "fresh", repeat = 7}]}
level1 = { threshold = 7, keys = [{kind = "fresh", repeat = 15}]}

[updates.level2]
keys = [{kind = "fresh", repeat = 7}] # 7 keys in total
emergency = {authorizedKeys = [0,1,2,3,4,5,6], threshold = 7}
protocol = {authorizedKeys = [0,1,2,3,4,5,6], threshold = 7}
electionDifficulty = {authorizedKeys = [0,1,2,3,4,5,6], threshold = 7}
euroPerEnergy = {authorizedKeys = [0,1,2,3,4,5,6], threshold = 7}
microCCDPerEuro = {authorizedKeys = [0,1,2,3,4,5,6], threshold = 7}
foundationAccount = {authorizedKeys = [0,1,2,3,4,5,6], threshold = 7}
mintDistribution = {authorizedKeys = [0,1,2,3,4,5,6], threshold = 7}
transactionFeeDistribution = {authorizedKeys = [0,1,2,3,4,5,6], threshold = 7}
gasRewards = {authorizedKeys = [0,1,2,3,4,5,6], threshold = 7}
poolParameters = {authorizedKeys = [0,1,2,3,4,5,6], threshold = 7}
addAnonymityRevoker = {authorizedKeys = [0,1,2,3,4,5,6], threshold = 7}
addIdentityProvider = {authorizedKeys = [0,1,2,3,4,5,6], threshold = 7}
cooldownParameters = {authorizedKeys = [0,1,2,3,4,5,6], threshold = 7}
timeParameters = {authorizedKeys = [0,1,2,3,4,5,6], threshold = 7}

[parameters]
# Default genesis time to current time.
# genesisTime = "2022-11-11T11:00:00Z" # 
slotDuration = 250 # in ms
leadershipElectionNonce = "d1bc8d3ba4afc7e109612cb73acbdddac052c93025aa1f82942edabb7deb82a1"
epochLength = 900 # in slots, so 100s
maxBlockEnergy = 3_000_000

[parameters.finalization]
minimumSkip = 0
committeeMaxSize = 1000
waitingTime = 100 # in milliseconds
skipShrinkFactor = 0.5
skipGrowFactor = 2
delayShrinkFactor = 0.5
delayGrowFactor = 2
allowZeroDelay = true

[parameters.chain]
version = "v1"
electionDifficulty = 0.05 # this means 5s block times.
euroPerEnergy = 0.000001
microCCDPerEuro = 100_000_000
accountCreationLimit = 10
[parameters.chain.timeParameters]
rewardPeriodLength = 4 # 4 epochs
mintPerPayday = 2.61157877e-4
[parameters.chain.poolParameters]
passiveFinalizationCommission = 1.0
passiveBakingCommission = 0.1
passiveTransactionCommission = 0.1
finalizationCommissionRange = {min = 0.5,max = 1.0}
bakingCommissionRange = {min = 0.05,max = 0.1}
transactionCommissionRange = {min = 0.05,max = 0.2}
minimumEquityCapital = "100"
capitalBound = 0.25
leverageBound = {numerator = 3, denominator = 1}
[parameters.chain.cooldownParameters]
poolOwnerCooldown = 3600 # in seconds
delegatorCooldown = 1800 # in seconds
[parameters.chain.rewardParameters]
mintDistribution = { bakingReward = 0.6, finalizationReward = 0.3 }
transactionFeeDistribution = { baker = 0.45, gasAccount = 0.45 }
gASRewards = { baker = 0.25, finalizationProof = 0.005, accountCreation = 0.02, chainUpdate = 0.005 }
          `);
  const handleSubmit = (event: any) => {
    event.preventDefault();
    onHandleSubmit(localStorage.getItem("changedAdvanceValue") as any);
  };
  return (
    <>
      <div className="w-full flex justify-center">
        <CButton
          className="btn mt-10 bg-ctp-green hover:bg-ctp-green border-none text-black items-center"
          onClick={() => setVisible(!visible)}
        >
          Open Settings
        </CButton>
      </div>

      <CModal
        className="bg-gradient-to-b from-ctp-base to-ctp-crust p-6 overflow-auto mt-10"
        scrollable
        visible={visible}
        onClose={() => setVisible(false)}
      >
        <CModalHeader>
          <CModalTitle className="text-3xl text-black font-bolder">
            Settings
          </CModalTitle>
        </CModalHeader>

        <CModalBody>
          <form id="settingsform" className="h-full" onSubmit={handleSubmit}>
            <textarea
              style={{ height: "65vh" }}
              className="w-full h-70"
              onChange={(e) =>
                localStorage.setItem("changedAdvanceValue", e.target.value)
              }
              defaultValue={
                !localStorage.getItem("changedAdvanceValue")
                  ? tomlConfig
                  : (localStorage.getItem("changedAdvanceValue") as any)
              }
            />
          </form>
        </CModalBody>
        <CModalFooter>
          <CButton
            className="btn bg-ctp-red hover:bg-ctp-red text-black"
            color="secondary"
            onClick={() => setVisible(false)}
          >
            Close
          </CButton>
          <input
            className="btn btn-primary bg-black text-white"
            type="submit"
            form="settingsform"
            value="Save Changes"
          />
        </CModalFooter>
      </CModal>
    </>
  );
};

export default ExpertSettingsPage;
