import { useState, useEffect } from "react";

const formatAddress = (address) => {
  return address.slice(0, 5) + "..." + address.slice(-4);
};

const Events = ({ props }) => {
  const { contract } = props;
  const [events, setEvents] = useState(null);
  const status = [
    "Registering Voters",
    "Proposals Registration Started",
    "Proposals Registration Ended",
    "Voting Session Started",
    "Voting Session Ended",
    "Votes Tallied",
  ];

  useEffect(() => {
    if (contract) {
      contract.events
        .VoterRegistered(() => {})
        .on("data", (event) => {
          setEvents(
            `${formatAddress(event.returnValues[0])} added to Whitelist!`
          );
        });
      contract.events
        .ProposalRegistered(() => {})
        .on("data", (event) => {
          setEvents("Proposition ajoutée");
        });
      contract.events
        .Voted(() => {})
        .on("data", () => {
          setEvents("Vote enregistré!");
        });
      contract.events
        .WorkflowStatusChange(() => {})
        .on("data", (event) => {
          setEvents(`${status[event.returnValues[1]]}`);
        })
        .on("error", (error, receipt) => {
          console.log("Error:", error, receipt);
        });
    }
  }, [contract]);

  return (
    <div className="Header_section">
      <h4 className="Regular">Events</h4>
      <p>{events ? events : "No Events"}</p>
    </div>
  );
};

export default Events;
