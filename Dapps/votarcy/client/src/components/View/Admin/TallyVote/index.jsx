import { tallyVotes } from "../../../../lib";

const TallyVote = ({ props }) => {
  const { contract, accounts } = props;

  const handleTalyVote = async () => {
    await tallyVotes(contract, accounts);
    window.location.reload();
  };

  return (
    <div className="view">
      <h4 className="SubTitle">Tally Votes</h4>

      <button className="MainButton" onClick={() => handleTalyVote()}>
        Tally Vote
      </button>
    </div>
  );
};

export default TallyVote;
