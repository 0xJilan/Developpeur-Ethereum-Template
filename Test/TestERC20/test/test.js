const { BN, expectRevert, expectEvent } = require("@openzeppelin/test-helpers");
const { expect } = require("chai");
const constants = require("@openzeppelin/test-helpers/src/constants");

const myToken = artifacts.require("myToken");

contract("myToken", (accounts) => {
  let owner = accounts[0];

  it("...should store the value 89", async () => {
    const myTokenInstance = await myToken.deployed();
    await myTokenInstance.set(89, { from: owner });
    const storedData = await myTokenInstance.get.call();
    assert.equal(storedData, 89);
  });
});
