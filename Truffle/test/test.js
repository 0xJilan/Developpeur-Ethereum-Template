const { BN, expectRevert, expectEvent } = require("@openzeppelin/test-helpers");
const { expect } = require("chai");
const constants = require("@openzeppelin/test-helpers/src/constants");

const SimpleStorage = artifacts.require("SimpleStorage");

contract("SimpleStorage", (accounts) => {
  let owner = accounts[0];

  it("...should store the value 89", async () => {
    const simpleStorageInstance = await SimpleStorage.deployed();
    await simpleStorageInstance.set(89, { from: owner });
    const storedData = await simpleStorageInstance.get.call();
    assert.equal(storedData, 89);
  });
});
