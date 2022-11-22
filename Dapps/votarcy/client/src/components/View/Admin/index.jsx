import Registration from "../../Registration";
import Proposal from "../../View/Admin/Proposal";

const AdminView = ({ props }) => {
  const { status } = props;
  return (
    <div className="view">
      <h2>Welcome Admin</h2>
      <p>status: {status}</p>
      {status === "RegisteringVoters" && <Registration props={props} />}
      {status === "ProposalsRegistrationStarted" && <Proposal props={props} />}
    </div>
  );
};

export default AdminView;
