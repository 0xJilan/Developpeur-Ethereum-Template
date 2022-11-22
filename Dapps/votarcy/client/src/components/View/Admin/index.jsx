import Registration from "../../Registration";

const AdminView = ({ props }) => {
  const { status } = props;
  return (
    <div className="view">
      <h2>Welcome Admin</h2>
      <p>status: {status}</p>
      {status === "RegisteringVoters" && <Registration props={props} />}
    </div>
  );
};

export default AdminView;
