const VoterView = ({ props }) => {
  const { status } = props;
  return (
    <div className="view">
      <h2>Welcome Voter</h2>
      <p>status: {status}</p>
    </div>
  );
};

export default VoterView;
