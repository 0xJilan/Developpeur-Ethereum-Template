import AdminView from "../View/Admin";
import VoterView from "../View/Voter";

const Voting = ({ props }) => {
  const { accounts, isAdmin } = props;
  return !accounts ? (
    <main>
      <div className="Header_title_container">
        <h1>WELCOME TO VOTARCY</h1>
      </div>
      <div className="Header_section">
        <p>Please Connect to your wallet to access dapp.</p>
      </div>
    </main>
  ) : (
    <div className="Voting_container">
      <div className="Voting_container_title">
        <h1>VOTARCY</h1>
      </div>
      {isAdmin ? <AdminView /> : <VoterView />}
    </div>
  );
};

export default Voting;
