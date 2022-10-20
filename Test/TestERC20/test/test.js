const MyToken = artifacts.require("MyToken");
const { BN, expectRevert, expectEvent } = require("@openzeppelin/test-helpers");
const { expect } = require("chai");

contract("MyToken", (accounts) => {
  const _name = "Alyra";
  const _symbol = "ALY";
  const _initialSupply = new BN(10000);
  const _owner = accounts[0];
  const _recipientAsdress = accounts[1];
  const _decimal = new BN(18);

  let myTokenInstance;

  beforeEach(async () => {
    myTokenInstance = await MyToken.new(_initialSupply, { from: _owner });
  });

  it("has a name", async () => {
    expect(await myTokenInstance.name()).to.equal(_name);
  });
});
