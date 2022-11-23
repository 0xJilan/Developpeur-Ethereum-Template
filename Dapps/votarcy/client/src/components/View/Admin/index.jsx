import Registration from "./Registration";
import Proposal from "./Proposal";
import StartVote from "./StartVote";
import CloseVote from "./CloseVote";
import TallyVote from "./TallyVote";
import Winner from "../../Winner";

const AdminView = ({ props }) => {
  const { status } = props;
  return (
    <div className="view">
      {status === "RegisteringVoters" && <Registration props={props} />}
      {status === "ProposalsRegistrationStarted" && <Proposal props={props} />}
      {status === "ProposalsRegistrationEnded" && <StartVote props={props} />}
      {status === "VotingSessionStarted" && <CloseVote props={props} />}
      {status === "VotingSessionEnded" && <TallyVote props={props} />}
      {status === "VotesTallied" && <Winner props={props} />}
    </div>
  );
};

export default AdminView;
