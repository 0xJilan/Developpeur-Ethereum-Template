import { useState } from "react";
import { addVoter, startProposalsRegistering } from "../../../../lib";

const Registration = ({ props }) => {
  const { contract, accounts } = props;
  const [input, setInput] = useState("");

  const handleInput = (e) => {
    setInput(e.target.value);
  };

  const handleAdd = async () => {
    await addVoter(contract, accounts, input);
    setInput("");
    window.location.reload();
  };
  const handleStart = async () => {
    await startProposalsRegistering(contract, accounts);
    window.location.reload();
  };

  return (
    <div className="view">
      <h4 className="SubTitle">Registration</h4>

      <input
        className="Input"
        type="text"
        id="voterAdress"
        name="voterAdress"
        value={input}
        onChange={(event) => handleInput(event)}
      />
      <button className="MainButton" onClick={() => handleAdd()}>
        Add
      </button>
      <button className="MainButton" onClick={() => handleStart()}>
        Start Proposal Session
      </button>
    </div>
  );
};

export default Registration;
