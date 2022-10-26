const SimpleStorage = artifacts.require("SimpleStorage");
const { BN, expectRevert, expectEvent } = require("@openzeppelin/test-helpers");
const { expect } = require("chai");

contract("SimpleStorage", (accounts) => {
  const _owner = accounts[0];
  const _amountToTest = new BN(89);
  let SimpleStorageInstance;

  beforeEach(async () => {
    SimpleStorageInstance = await SimpleStorage.new({ from: _owner });
  });

  it("Should store the awaited value", async () => {
    await SimpleStorageInstance.set(89, { from: _owner });
    const storedData = await SimpleStorageInstance.get.call();
    expect(storedData).to.be.bignumber.equal(_amountToTest);
  });

  it("Should revert if number is 0 ", async () => {
    await expectRevert(
      SimpleStorageInstance.set(new BN(0), { from: _owner }),
      "stored data cant be 0!"
    );
  });
  it("Should return event if Number set", async () => {
    const setTx = await SimpleStorageInstance.set(new BN(89), {
      from: _owner,
    });
    expectEvent(setTx, "storageRegistered", {
      setterAddress: _owner,
      amountSet: new BN(89),
    });
  });
});
