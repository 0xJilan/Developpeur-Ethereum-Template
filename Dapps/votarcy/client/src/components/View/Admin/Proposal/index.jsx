import { endProposalsRegistering } from "../../../../lib";

const Proposal = ({ props }) => {
  const { contract, accounts } = props;

  const handleClose = async () => {
    await endProposalsRegistering(contract, accounts);
  };

  return (
    <div className="view">
      <h4>Proposal Session open</h4>
      <button className="Button_Add_Voter" onClick={() => handleClose()}>
        Close Proposal Session
      </button>
    </div>
  );
};

export default Proposal;
