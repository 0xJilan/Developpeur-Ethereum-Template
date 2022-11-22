import { useState, useEffect } from "react";

const Error = ({ props }) => {
  const { error } = props;

  return (
    <div className="Header_section">
      <h4 className="Regular">Error</h4>
      <p>{error ? error : "No Error"}</p>
    </div>
  );
};

export default Error;
