import { endProposalsRegistering } from "../../../../lib";

const Proposal = ({ props }) => {
  const { contract, accounts } = props;

  const handleClose = async () => {
    await endProposalsRegistering(contract, accounts);
    window.location.reload();
  };

  return (
    <div className="view">
      <h4 className="SubTitle">Proposal Session open</h4>
      <button className="MainButton" onClick={() => handleClose()}>
        Close Proposal
      </button>
    </div>
  );
};

export default Proposal;
