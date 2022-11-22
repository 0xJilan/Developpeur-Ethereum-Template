import { useEffect, useState } from "react";
import Header from "../Header";
import Voting from "../Voting";
import useEth from "../../contexts/EthContext/useEth";
import {
  getOwner,
  getVoter,
  fetchProposalsArray,
  getWorkflowStatus,
  getWinner,
} from "../../lib";

const Layout = () => {
  const { state } = useEth();
  const { contract, accounts } = state;
  const [owner, setOwner] = useState("");
  const [voter, setVoter] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [proposals, setProposals] = useState([]);
  const [winningProposal, setWinningProposal] = useState(null);
  const [status, setStatus] = useState(false);

  useEffect(() => {
    if (accounts) {
      getOwner(accounts, contract, setOwner);
      getVoter(accounts, contract, setVoter);
      fetchProposalsArray(contract, accounts, isAdmin, setProposals);
      setIsAdmin(owner === accounts[0]);
      getWorkflowStatus(accounts, contract, setStatus);
      getWinner(accounts, contract, setWinningProposal);
    }
  }, [accounts, isAdmin, status]);

  return (
    <div className="Layout">
      <Header props={{ contract, accounts, isAdmin, voter, status }} />
      <Voting
        props={{
          contract,
          accounts,
          isAdmin,
          status,
          proposals,
          winningProposal,
        }}
      />
    </div>
  );
};

export default Layout;
