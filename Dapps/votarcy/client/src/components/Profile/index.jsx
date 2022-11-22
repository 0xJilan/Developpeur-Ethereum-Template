import Jazzicon, { jsNumberForAddress } from "react-jazzicon";

const Profile = ({ props }) => {
  const { accounts, isAdmin } = props;
  return accounts && accounts[0] ? (
    <div className="Connected">
      <Jazzicon
        style={{ zIndex: 1000 }}
        diameter={64}
        seed={jsNumberForAddress(accounts[0])}
      />
      <h2>{accounts[0].slice(0, 5) + "..." + accounts[0].slice(-4)}</h2>
      <p>{isAdmin ? "Admin" : "Voter "} </p>
    </div>
  ) : (
    <p>Not Connected</p>
  );
};

export default Profile;
