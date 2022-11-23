import { useState } from "react";
import { addProposal } from "../../../../lib";

const Register = ({ props }) => {
  const { contract, accounts, voter } = props;
  const [input, setInput] = useState("");

  const handleInput = (e) => {
    setInput(e.target.value);
  };

  const handleAdd = async () => {
    await addProposal(contract, accounts, input);
    window.location.reload();
  };

  return (
    <div className="view">
      <h4 className="SubTitle">Register Proposal</h4>
      <input
        className="Input"
        type="text"
        id="voterProposal"
        name="voterProposal"
        value={input}
        onChange={(event) => handleInput(event)}
      />
      <button className="MainButton" onClick={() => handleAdd()}>
        Submit Proposal
      </button>
    </div>
  );
};

export default Register;
