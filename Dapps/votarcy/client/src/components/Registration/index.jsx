import { useState } from "react";
import { addVoter } from "../../lib";

const Registration = ({ props }) => {
  const { contract, accounts } = props;
  const [input, setInput] = useState("");

  const handleInput = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = async () => {
    await addVoter(contract, accounts, input);
  };

  return (
    <div className="view">
      <h4>Registration</h4>

      <input
        className="Input_Address"
        type="text"
        id="voterAdress"
        name="voterAdress"
        value={input}
        onChange={(event) => handleInput(event)}
      />
      <button className="Button_Add_Voter" onClick={() => handleSubmit()}>
        Add
      </button>
    </div>
  );
};

export default Registration;
