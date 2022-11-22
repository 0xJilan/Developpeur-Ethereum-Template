import { startVotingSession } from "../../../../lib";

const StartVote = ({ props }) => {
  const { contract, accounts } = props;

  const handleStartVote = async () => {
    await startVotingSession(contract, accounts);
    window.location.reload();
  };

  return (
    <div className="view">
      <h4 className="SubTitle">Proposal Session Ended</h4>
      <button className="MainButton" onClick={() => handleStartVote()}>
        Start Vote
      </button>
    </div>
  );
};

export default StartVote;
