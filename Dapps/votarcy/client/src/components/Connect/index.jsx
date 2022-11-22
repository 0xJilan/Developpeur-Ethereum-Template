import { useEffect, useState } from "react";
import Jazzicon, { jsNumberForAddress } from "react-jazzicon";

const Connect = ({ state }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const { accounts, contract } = state;
  console.log(state);

  useEffect(() => {
    (async function () {
      const admin = await contract.methods.owner().call({ from: accounts[0] });

      setIsAdmin(admin);
      console.log("admin:", admin);
    })();
  }, [contract]);

  return accounts && accounts[0] ? (
    <div className="Connected">
      <Jazzicon diameter={32} seed={jsNumberForAddress(accounts[0])} />
      <p>{accounts[0].slice(0, 5) + "..." + accounts[0].slice(-4)}</p>
      <p>Logged as {isAdmin ? "Admin" : "User"} </p>
    </div>
  ) : (
    <p>Not Connected</p>
  );
};

export default Connect;
