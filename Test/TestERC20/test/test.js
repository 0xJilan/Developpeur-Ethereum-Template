const MyToken = artifacts.require("MyToken");
const { BN, expectRevert, expectEvent } = require("@openzeppelin/test-helpers");
const { expect } = require("chai");

contract("MyToken", (accounts) => {
  const _name = "Alyra";
  const _symbol = "ALY";
  const _initialSupply = new BN(10000);
  const _owner = accounts[0];
  const _recipient = accounts[1];
  const _decimal = new BN(18);

  let myTokenInstance;

  beforeEach(async () => {
    myTokenInstance = await MyToken.new(_initialSupply, { from: _owner });
  });

  it("has a name", async () => {
    expect(await myTokenInstance.name()).to.equal(_name);
  });
  it("has a symbol", async () => {
    expect(await myTokenInstance.symbol()).to.equal(_symbol);
  });
  it("has a decimal", async () => {
    expect(await myTokenInstance.decimals()).to.be.bignumber.equal(_decimal);
  });
  it("check first balance", async () => {
    expect(await myTokenInstance.balanceOf(_owner)).to.be.bignumber.equal(
      _initialSupply
    );
  });
  it("check balance after transfer", async () => {
    expect(await myTokenInstance.balanceOf(_recipient)).to.be.bignumber.equal(
      new BN(0)
    );
    await myTokenInstance.transfer(_recipient, new BN(100), { from: _owner });
    expect(await myTokenInstance.balanceOf(_owner)).to.be.bignumber.equal(
      new BN(9900)
    );
    expect(await myTokenInstance.balanceOf(_recipient)).to.be.bignumber.equal(
      new BN(100)
    );
  });
});
