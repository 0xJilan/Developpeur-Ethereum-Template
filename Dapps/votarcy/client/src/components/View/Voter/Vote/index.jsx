import { useState } from "react";
import { setVote } from "../../../../lib";

const Vote = ({ props }) => {
  const { contract, accounts, proposals } = props;
  const [proposalID, setSelected] = useState(null);

  const handleProposalID = (proposalID) => {
    setSelected(proposalID);
  };

  const handleVote = async () => {
    console.log("Vote for: ", proposalID);
    await setVote(contract, accounts, proposalID);
    window.location.reload();
  };

  return (
    <div className="view">
      <h4 className="SubTitle">Vote Open!</h4>
      {proposals && proposals.length > 0 ? (
        proposals.map((proposal, i) => {
          return (
            <button key={i} onClick={() => handleProposalID(i)}>
              {`${proposal[0]} voice : ${proposal.voteCount}`}
            </button>
          );
        })
      ) : (
        <p>NoProposals</p>
      )}
      <button className="SecondButton" onClick={() => handleVote()}>
        Vote {proposalID != null && `for ${proposals[proposalID][0]}`}
      </button>
    </div>
  );
};

export default Vote;
