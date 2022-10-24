const Voting = artifacts.require("Voting");
const { BN, expectRevert, expectEvent } = require("@openzeppelin/test-helpers");
const { expect } = require("chai");

contract("Voting", (accounts) => {
  const _owner = accounts[0];
  let VotingInstance;

  beforeEach(async function () {
    VotingInstance = await Voting.new({ from: _owner });
  });

  it("Admin only can add to Whitelist", async () => {
    //expect(await MyTokenInstance.funtion())
  });
  it("Admin only can start Proposals Registering", async () => {
    //expect(await MyTokenInstance.funtion())
  });
  it("Voters can register their proposal during Proposals Registering", async () => {
    //expect(await MyTokenInstance.funtion())
  });
  it("Admin only can close Proposals Registering", async () => {
    //expect(await MyTokenInstance.funtion())
  });
  it("Admin only can start Voting Session", async () => {
    //expect(await MyTokenInstance.funtion())
  });
  it("Registred Voters only can vote for one proposal", async () => {
    //expect(await MyTokenInstance.funtion())
  });
  it("Admin only can close Voting Session", async () => {
    //expect(await MyTokenInstance.funtion())
  });
  it("Admin only can count votes", async () => {
    //expect(await MyTokenInstance.funtion())
  });
  it("Everybody can check winning proposal", async () => {
    //expect(await MyTokenInstance.funtion())
  });
});
