const Winner = ({ props }) => {
  const { winningProposal } = props;
  return (
    <div className="view">
      <h4 className="SubTitle">Vote Tallyed</h4>

      <h5>Winning Proposal is: </h5>
      {winningProposal && <p>{winningProposal.description}</p>}
    </div>
  );
};

export default Winner;
