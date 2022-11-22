import { endVotingSession } from "../../../../lib";

const CloseVote = ({ props }) => {
  const { contract, accounts } = props;
  const handleCloseVote = async () => {
    await endVotingSession(contract, accounts);
  };

  return (
    <div className="view">
      <h4>Close Voting Session</h4>
      <button className="Button_Add_Voter" onClick={() => handleCloseVote()}>
        Close Vote
      </button>
    </div>
  );
};

export default CloseVote;
