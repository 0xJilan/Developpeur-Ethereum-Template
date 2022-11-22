import { tallyVotes } from "../../../../lib";

const TallyVote = ({ props }) => {
  const { contract, accounts } = props;

  const handleTalyVote = async () => {
    await tallyVotes(contract, accounts);
  };

  return (
    <div className="view">
      <h4>Tally Votes</h4>

      <button className="Button_Add_Voter" onClick={() => handleTalyVote()}>
        Tally Vote
      </button>
    </div>
  );
};

export default TallyVote;
