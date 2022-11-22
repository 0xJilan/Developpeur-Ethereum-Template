import { endVotingSession } from "../../../../lib";

const CloseVote = ({ props }) => {
  const { contract, accounts } = props;
  const handleCloseVote = async () => {
    await endVotingSession(contract, accounts);
    window.location.reload();
  };

  return (
    <div className="view">
      <h4 className="SubTitle">Close Voting Session</h4>
      <button className="MainButton" onClick={() => handleCloseVote()}>
        Close Vote
      </button>
    </div>
  );
};

export default CloseVote;
