import { useEffect, useState } from "react";

const Events = ({ state }) => {
  const { contract } = state;
  const [events, setEvents] = useState([]);

  contract.events
    .VoterRegistered(() => {})
    .on("data", (event) => {
      setEvents(...events, `${event.returnValues[0]} ajouté à la whitelist!`);
      console.log(`${event.returnValues[0]} ajouté à la whitelist!`);
    });
  contract.events
    .ProposalRegistered(() => {})
    .on("data", (event) => {
      setEvents(...events, `Proposition ajoutée :${event.returnValues[0]}`);
      console.log(`Proposition ajoutée :${event.returnValues[0]}`);
    });
  contract.events
    .Voted(() => {})
    .on("data", () => {
      setEvents(...events, "Vote enregistré!");
      console.log("Vote enregistré!");
    });
  contract.events
    .WorkflowStatusChange(() => {})
    .on("data", (event) => {
      //setPreviousStatus(event.returnValues[0]);
      //setNewStatus(event.returnValues[1]);
      setEvents(...events, `New Workflow Status:${event.returnValues[1]}`);
      console.log(`New Workflow Status:${event.returnValues[1]}`);
    })
    .on("error", function (error, receipt) {
      console.log("Error:", error, receipt);
    });

  return events.length > 0 ? (
    events.map((eventFromContract) => {
      return <p>{eventFromContract}</p>;
    })
  ) : (
    <p>No Events</p>
  );
};

export default Events;
