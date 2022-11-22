import Register from "./Register";
import Vote from "./Vote";
import Winner from "../../Winner";

const VoterView = ({ props }) => {
  const { status } = props;
  return (
    <div className="view">
      <h2>Welcome Voter</h2>
      <p>status: {status}</p>
      {status === "RegisteringVoters" && (
        <p>Wait until admin finish to add voter to whitelist</p>
      )}
      {status === "ProposalsRegistrationStarted" && <Register props={props} />}
      {status === "ProposalsRegistrationEnded" && (
        <p>Wait until admin start voting session...</p>
      )}
      {status === "VotingSessionStarted" && <Vote props={props} />}
      {status === "VotingSessionEnded" && (
        <p>Vote ended. wait until admin tally votes</p>
      )}
      {status === "VotesTallied" && <Winner props={props} />}
    </div>
  );
};

export default VoterView;
