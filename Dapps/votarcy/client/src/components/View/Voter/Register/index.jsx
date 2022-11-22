import { useState } from "react";
import { addProposal } from "../../../../lib";

const Register = ({ props }) => {
  const { contract, accounts } = props;
  const [input, setInput] = useState("");

  const handleInput = (e) => {
    setInput(e.target.value);
  };

  const handleAdd = async () => {
    await addProposal(contract, accounts, input);
  };

  return (
    <div className="view">
      <h4>Register Proposal</h4>
      <input
        className="Input_Address"
        type="text"
        id="voterProposal"
        name="voterProposal"
        value={input}
        onChange={(event) => handleInput(event)}
      />
      <button className="Button_Add_Voter" onClick={() => handleAdd()}>
        Submit Proposal
      </button>
    </div>
  );
};

export default Register;
