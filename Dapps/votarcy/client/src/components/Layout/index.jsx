import { useEffect, useState } from "react";
import Header from "../Header";
import Voting from "../Voting";
import useEth from "../../contexts/EthContext/useEth";
import { getOwner, getVoter, getWorkflowStatus } from "../../lib";

const Layout = () => {
  const { state } = useEth();
  const { contract, accounts } = state;
  const [owner, setOwner] = useState("");
  const [voter, setVoter] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [status, setStatus] = useState(false);

  useEffect(() => {
    console.log("run de layout");
    if (accounts) {
      console.log("run useEffect Layout");
      getOwner(accounts, contract, setOwner);
      getVoter(accounts, contract, setVoter);
      setIsAdmin(owner === accounts[0]);
      getWorkflowStatus(accounts, contract, setStatus);
    }
  }, [accounts]);

  return (
    <div className="Layout">
      <Header props={{ contract, accounts, isAdmin, voter, status }} />
      <Voting props={{ contract, accounts, isAdmin, status }} />
    </div>
  );
};

export default Layout;
