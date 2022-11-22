import { useState, useEffect } from "react";

const Events = ({ props }) => {
  const { contract } = props;
  const [events, setEvents] = useState(null);

  useEffect(() => {
    if (contract) {
      contract.events
        .VoterRegistered(() => {})
        .on("data", (event) => {
          setEvents(`${event.returnValues[0]} ajouté à la whitelist!`);
          console.log(`${event.returnValues[0]} ajouté à la whitelist!`);
        });
      contract.events
        .ProposalRegistered(() => {})
        .on("data", (event) => {
          setEvents(`Proposition ajoutée :${event.returnValues[0]}`);
          console.log(`Proposition ajoutée :${event.returnValues[0]}`);
        });
      contract.events
        .Voted(() => {})
        .on("data", () => {
          setEvents("Vote enregistré!");
          console.log("Vote enregistré!");
        });
      contract.events
        .WorkflowStatusChange(() => {})
        .on("data", (event) => {
          //setPreviousStatus(event.returnValues[0]);
          //setNewStatus(event.returnValues[1]);
          setEvents(`New Workflow Status:${event.returnValues[1]}`);
          console.log(`New Workflow Status:${event.returnValues[1]}`);
        })
        .on("error", function (error, receipt) {
          console.log("Error:", error, receipt);
        });
    }
  }, [contract]);

  return (
    <>
      <h4>Events : </h4>
      <p>{events ? events : "No Events"}</p>
    </>
  );
};

export default Events;
