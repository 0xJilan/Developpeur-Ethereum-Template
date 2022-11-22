import { useEffect, useState } from "react";
import Jazzicon, { jsNumberForAddress } from "react-jazzicon";
import { getOwner, getVoter, getWorkflowStatus } from "../../lib";

const Profile = ({ state }) => {
  const { contract, accounts } = state;
  const [owner, setOwner] = useState("");
  const [voter, setVoter] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [status, setStatus] = useState(false);

  useEffect(() => {
    if (accounts) {
      getOwner(accounts, contract, setOwner);
      getVoter(accounts, contract, setVoter);
      setIsAdmin(owner === accounts[0]);
      getWorkflowStatus(accounts, contract, setStatus);
    }
  }, [owner, accounts, isAdmin, voter]);

  return accounts && accounts[0] ? (
    <div className="Connected">
      <Jazzicon diameter={16} seed={jsNumberForAddress(accounts[0])} />
      <p>{accounts[0].slice(0, 5) + "..." + accounts[0].slice(-4)}</p>
      <p>{isAdmin ? "Admin View" : "User View"} </p>
      <p>{voter?.isRegistered ? "Registred" : "Unregistred"} </p>
      <p>Status: {status}</p>
    </div>
  ) : (
    <p>Not Connected</p>
  );
};

export default Profile;
