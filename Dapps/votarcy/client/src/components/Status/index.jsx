const Status = ({ props }) => {
  const { status } = props;

  return (
    <div className="Header_section">
      <h4 className="Regular">Status</h4>
      <p>{status ? status : "No Error"}</p>
    </div>
  );
};

export default Status;
