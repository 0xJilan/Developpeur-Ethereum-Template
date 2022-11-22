import Jazzicon, { jsNumberForAddress } from "react-jazzicon";

const Profile = ({ props }) => {
  const { accounts, isAdmin } = props;
  return accounts && accounts[0] ? (
    <div className="Connected">
      <Jazzicon diameter={64} seed={jsNumberForAddress(accounts[0])} />
      <p>{accounts[0].slice(0, 5) + "..." + accounts[0].slice(-4)}</p>
      <p>{isAdmin ? "Admin" : "Voter "} </p>
    </div>
  ) : (
    <p>Not Connected</p>
  );
};

export default Profile;
