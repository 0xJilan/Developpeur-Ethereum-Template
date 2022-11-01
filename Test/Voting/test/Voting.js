const Voting = artifacts.require("Voting");
const { BN, expectRevert, expectEvent } = require("@openzeppelin/test-helpers");
const { expect } = require("chai");

contract("Voting", (accounts) => {
  const _owner = accounts[0];
  const _firstVoter = accounts[1];
  const _secondVoter = accounts[2];
  const _thirdVoter = accounts[3];
  const _fourthVoter = accounts[4];

  let VotingInstance;

  beforeEach(async function () {
    VotingInstance = await Voting.new({ from: _owner });
  });

  it("Admin only can add to Whitelist", async () => {
    await expectRevert(
      VotingInstance.addVoter(_secondVoter, { from: _firstVoter }),
      "caller is not the owner"
    );
  });

  it("Event is emit once admin add voter to Whitelist", async () => {
    const addVoterTx = await VotingInstance.addVoter(_firstVoter, {
      from: _owner,
    });
    expectEvent(addVoterTx, "VoterRegistered", {
      voterAddress: _firstVoter,
    });
  });

  it("Event WorkflowStatus is emit when admin  start Proposals Registering", async () => {
    const startProposalsTx = await VotingInstance.startProposalsRegistering({
      from: _owner,
    });
    expectEvent(startProposalsTx, "WorkflowStatusChange", {
      previousStatus: new BN(0),
      newStatus: new BN(1),
    });
  });

  it("Should revert if admin try to register voter when registration not open", async () => {
    await VotingInstance.startProposalsRegistering({ from: _owner });
    await expectRevert(
      VotingInstance.addVoter(_secondVoter, { from: _owner }),
      "Voters registration is not open yet"
    );
  });

  it("Voters cant register  proposal if not register", async () => {
    await VotingInstance.startProposalsRegistering({ from: _owner });
    await expectRevert(
      VotingInstance.addProposal("test", { from: _firstVoter }),
      "You're not a voter"
    );
  });

  it("Voters cant register empty proposal ", async () => {
    await VotingInstance.addVoter(_firstVoter, {
      from: _owner,
    });
    await VotingInstance.startProposalsRegistering({ from: _owner });
    await expectRevert(
      VotingInstance.addProposal("", { from: _firstVoter }),
      "Vous ne pouvez pas ne rien proposer"
    );
  });

  it("Voters can register proposal during Proposals Registering", async () => {
    await VotingInstance.addVoter(_firstVoter, {
      from: _owner,
    });
    await VotingInstance.startProposalsRegistering({ from: _owner });
    const addProposalTx = await VotingInstance.addProposal("test", {
      from: _firstVoter,
    });
    expectEvent(addProposalTx, "ProposalRegistered", {
      proposalId: new BN(1),
    });
  });

  it("Event WorkflowStatus is emit when admin end Proposals Registering", async () => {
    await VotingInstance.startProposalsRegistering({ from: _owner });
    const endProposalsTx = await VotingInstance.endProposalsRegistering({
      from: _owner,
    });
    expectEvent(endProposalsTx, "WorkflowStatusChange", {
      previousStatus: new BN(1),
      newStatus: new BN(2),
    });
  });
  it("Event WorkflowStatus is emit when admin start voting session", async () => {
    await VotingInstance.startProposalsRegistering({ from: _owner });
    await VotingInstance.endProposalsRegistering({ from: _owner });
    const startVotingTx = await VotingInstance.startVotingSession({
      from: _owner,
    });
    expectEvent(startVotingTx, "WorkflowStatusChange", {
      previousStatus: new BN(2),
      newStatus: new BN(3),
    });
  });

  it("Voters cant vote if Voting session not open", async () => {
    await VotingInstance.addVoter(_firstVoter, {
      from: _owner,
    });
    await VotingInstance.startProposalsRegistering({ from: _owner });
    await expectRevert(
      VotingInstance.setVote(1, { from: _firstVoter }),
      "Voting session havent started yet"
    );
  });

  it("Registred Voter can only vote one time", async () => {
    await VotingInstance.addVoter(_firstVoter, {
      from: _owner,
    });
    await VotingInstance.addVoter(_secondVoter, {
      from: _owner,
    });
    await VotingInstance.startProposalsRegistering({ from: _owner });
    await VotingInstance.addProposal("test", {
      from: _firstVoter,
    });
    await VotingInstance.endProposalsRegistering({ from: _owner });
    await VotingInstance.startVotingSession({
      from: _owner,
    });
    await VotingInstance.setVote(1, { from: _secondVoter });
    await expectRevert(
      VotingInstance.setVote(1, { from: _secondVoter }),
      "You have already voted"
    );
  });
  it("Registred Voter can only vote for existing proposal", async () => {
    await VotingInstance.addVoter(_firstVoter, {
      from: _owner,
    });
    await VotingInstance.addVoter(_secondVoter, {
      from: _owner,
    });
    await VotingInstance.startProposalsRegistering({ from: _owner });
    await VotingInstance.addProposal("test", {
      from: _firstVoter,
    });
    await VotingInstance.endProposalsRegistering({ from: _owner });
    await VotingInstance.startVotingSession({
      from: _owner,
    });
    await expectRevert(
      VotingInstance.setVote(4, { from: _secondVoter }),
      "Proposal not found"
    );
  });

  it("Event WorkflowStatus is emit when admin close voting session", async () => {
    await VotingInstance.startProposalsRegistering({ from: _owner });
    await VotingInstance.endProposalsRegistering({ from: _owner });
    await VotingInstance.startVotingSession({ from: _owner });

    const startVotingTx = await VotingInstance.endVotingSession({
      from: _owner,
    });
    expectEvent(startVotingTx, "WorkflowStatusChange", {
      previousStatus: new BN(3),
      newStatus: new BN(4),
    });
  });

  it("Event WorkflowStatus is emit when votes are  tallied", async () => {
    await VotingInstance.startProposalsRegistering({ from: _owner });
    await VotingInstance.endProposalsRegistering({ from: _owner });
    await VotingInstance.startVotingSession({ from: _owner });
    await VotingInstance.endVotingSession({ from: _owner });
    const startVotingTx = await VotingInstance.tallyVotes({
      from: _owner,
    });
    expectEvent(startVotingTx, "WorkflowStatusChange", {
      previousStatus: new BN(4),
      newStatus: new BN(5),
    });
  });

  it("Should correctly tally vote!", async () => {
    await VotingInstance.addVoter(_firstVoter, {
      from: _owner,
    });
    await VotingInstance.addVoter(_secondVoter, {
      from: _owner,
    });
    await VotingInstance.addVoter(_thirdVoter, {
      from: _owner,
    });
    await VotingInstance.addVoter(_fourthVoter, {
      from: _owner,
    });

    await VotingInstance.startProposalsRegistering({ from: _owner });

    await VotingInstance.addProposal("firstProposal", {
      from: _firstVoter,
    });
    await VotingInstance.addProposal("secondProposal", {
      from: _secondVoter,
    });
    await VotingInstance.endProposalsRegistering({ from: _owner });

    await VotingInstance.startVotingSession({
      from: _owner,
    });

    await VotingInstance.setVote(1, { from: _firstVoter });
    await VotingInstance.setVote(2, { from: _secondVoter });
    await VotingInstance.setVote(2, { from: _thirdVoter });
    await VotingInstance.setVote(2, { from: _fourthVoter });

    await VotingInstance.endVotingSession({
      from: _owner,
    });
    await VotingInstance.tallyVotes({
      from: _owner,
    });
    const winningProposal = await VotingInstance.winningProposalID();
    expect(winningProposal).to.be.bignumber.equal(new BN(2));
  });
});
