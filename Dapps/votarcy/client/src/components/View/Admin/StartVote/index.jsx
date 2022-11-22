import { startVotingSession } from "../../../../lib";

const StartVote = ({ props }) => {
  const { contract, accounts } = props;

  const handleStartVote = async () => {
    await startVotingSession(contract, accounts);
  };

  return (
    <div className="view">
      <h4>Proposal Session Ended</h4>
      <button className="Button_Add_Voter" onClick={() => handleStartVote()}>
        Start Vote
      </button>
    </div>
  );
};

export default StartVote;
