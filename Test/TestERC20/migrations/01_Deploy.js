const myToken = artifacts.require("myToken");

module.exports = async (deployer) => {
  await deployer.deploy(myToken);
};
