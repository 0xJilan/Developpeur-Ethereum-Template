import { useState } from "react";

const Registration = ({ props }) => {
  const { voter } = props;
  console.log("voter from user view registration:", voter);

  return (
    <div className="view">
      <h4 className="SubTitle">Registration</h4>

      <p className="Regular">
        You are {voter?.isRegistered ? "Registred" : "Unregistred"}
      </p>

      <p className="Regular">
        Wait until admin finish to add voter to whitelist
      </p>
    </div>
  );
};

export default Registration;
