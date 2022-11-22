export const getOwner = async (accounts, contract, setOwner) => {
  try {
    const contractOwner = await contract.methods
      .owner()
      .call({ from: accounts[0] });
    setOwner(contractOwner);
    console.log("contractOwner : ", contractOwner);
  } catch (error) {
    console.log("Unable to get Owner, more details:", error);
  }
};

export const getVoter = async (accounts, contract, setVoter) => {
  try {
    const voter = await contract.methods
      .getVoter(accounts[0])
      .call({ from: accounts[0] });
    setVoter(voter);
    console.log("Voter : ", voter);
  } catch (error) {
    console.log("You're not whitelisted, more details:", error);
  }
};

export const getWorkflowStatus = async (accounts, contract, setStatus) => {
  try {
    const currentWorkflow = await contract.methods
      .workflowStatus()
      .call({ from: accounts[0] });
    setStatus(currentWorkflow);
    console.log("Status : ", currentWorkflow);
  } catch (error) {
    console.log("Unable to get WorkflowStatus, more details:", error);
  }
};

export const getWinner = async (accounts, contract, setWinningProposal) => {
  try {
    const winningProposalID = await contract.methods
      .winningProposalID()
      .call({ from: accounts[0] });
    const proposal = await contract.methods
      .getOneProposal(winningProposalID)
      .call({ from: accounts[0] });
    const winningProposal = {
      winningProposalID: winningProposalID,
      description: proposal.description,
      voteCount: proposal.voteCount,
    };
    setWinningProposal(winningProposal);
    console.log("Winning Proposal:", winningProposal);
  } catch (error) {
    console.log("Unable to get WinningProposal. More details:", error);
  }
};

export const addVoter = async (contract, accounts, voterAddress) => {
  try {
    await contract.methods.addVoter(voterAddress).call({ from: accounts[0] });
    console.log("Voter added :", voterAddress);
  } catch (error) {
    if (error.message.includes("Already registered")) {
      console.log("Already registered. More details:", error);
    }
    if (error.message.includes("Voters registration is not open yet")) {
      console.log("Voters registration is not open yet. More details:", error);
    }
  }
};

export const addProposal = async (contract, accounts, proposal) => {
  try {
    await contract.methods.addProposal(proposal).call({ from: accounts[0] });
    console.log("Nouvelle proposition : ", proposal);
  } catch (error) {
    if (error.message.includes("ne rien proposer")) {
      console.log("Can't submit empty proposal. More details:", error);
    }
    if (error.message.includes("Voters registration is not open yet")) {
      console.log("Voters registration is not open yet. More details:", error);
    }
  }
};

export const fetchProposalsArray = async (
  contract,
  accounts,
  isOwner,
  setProposals
) => {
  try {
    if (!isOwner) {
      const numbersOfProposals = await contract.methods
        .getProposalsArrayCount()
        .call({ from: accounts[0] });
      let proposalsArray = [];

      for (let index = 0; index < numbersOfProposals; index++) {
        proposalsArray.push(
          await contract.methods
            .proposalsArray(index)
            .call({ from: accounts[0] })
        );
      }
      console.log("Proposals : " + proposalsArray);
      setProposals(proposalsArray);
    }
  } catch (error) {
    console.log("Error while fetching proposals. More details:", error);
  }
};

export const setVote = async (contract, accounts, proposalID) => {
  try {
    // Ici le call avant le send permet de recupérer le require
    await contract.methods.setVote(proposalID).call({ from: accounts[0] });
    console.log("Voted for : ", proposalID);
  } catch (error) {
    if (error.message.includes("already voted")) {
      console.log("already voted. More details:", error);
    }
    if (error.message.includes("Proposal not found")) {
      console.log("Proposal not found. More details:", error);
    }
    if (error.message.includes("Voting session havent started yet")) {
      console.log("Voting session havent started yet. More details:", error);
    }
  }
};

export const startProposalsRegistering = async (contract, accounts) => {
  try {
    await contract.methods
      .startProposalsRegistering()
      .call({ from: accounts[0] });
  } catch (error) {
    if (error.message.includes("Registering proposals cant be started now")) {
      console.log(
        "Registering proposals cant be started now. More details:",
        error
      );
    }
  }
};

export const endProposalsRegistering = async (contract, accounts) => {
  try {
    await contract.methods
      .endProposalsRegistering()
      .call({ from: accounts[0] });
  } catch (error) {
    if (error.message.includes("Registering proposals havent started yet")) {
      console.log(
        "Registering proposals havent started yet. More details:",
        error
      );
    }
  }
};
export const startVotingSession = async () => {
  try {
    await contract.methods.startVotingSession().call({ from: accounts[0] });
  } catch (error) {
    if (error.message.includes("Registering proposals phase is not finished")) {
      console.log(
        "Registering proposals phase is not finished. More details:",
        error
      );
    }
  }
};
export const endVotingSession = async () => {
  try {
    await contract.methods.endVotingSession().call({ from: accounts[0] });
  } catch (error) {
    if (error.message.includes("Voting session havent started yet")) {
      console.log("Voting session havent started yet. More details:", error);
    }
  }
};

export const tallyVotes = async () => {
  try {
    await contract.methods.tallyVotes().call({ from: accounts[0] });
  } catch (error) {
    if (error.message.includes("Current status is not voting session ended")) {
      console.log(
        "Current status is not voting session ended. More details:",
        error
      );
    }
  }
};
