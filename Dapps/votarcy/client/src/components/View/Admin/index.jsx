import Registration from "../../Registration";
import Proposal from "./Proposal";
import StartVote from "./StartVote";

const AdminView = ({ props }) => {
  const { status } = props;
  return (
    <div className="view">
      <h2>Welcome Admin</h2>
      <p>status: {status}</p>
      {status === "RegisteringVoters" && <Registration props={props} />}
      {status === "ProposalsRegistrationStarted" && <Proposal props={props} />}
      {status === "ProposalsRegistrationEnded" && <StartVote props={props} />}
    </div>
  );
};

export default AdminView;
