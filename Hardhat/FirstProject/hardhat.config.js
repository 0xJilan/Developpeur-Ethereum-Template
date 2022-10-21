require("@nomicfoundation/hardhat-toolbox");
require("hardhat-gas-reporter");

const MNEMONIC =
  "ee157bbb55db351e0811749f837068c5a6fc6a5b8f1b68a59523e375024583fd";
const ALCHEMY_GOERLI_URL =
  "https://eth-goerli.g.alchemy.com/v2/zSDUHbfJW2-vpUCsZ7BZjwtbIDYvR2Lm";

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  networks: {
    goerli: {
      url: ALCHEMY_GOERLI_URL,
      accounts: [MNEMONIC],
    },
  },
  gasReporter: {
    enabled: true,
    currency: "USD",
    gasPrice: 21,
  },
};
