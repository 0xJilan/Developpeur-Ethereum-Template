const HDWalletProvider = require("@truffle/hdwallet-provider");
require("dotenv").config();

const { MNEMONIC, INFURA_GOERLI_URL, INFURA_GOERLI_KEY } = process.env;

module.exports = {
  contracts_build_directory: "../client/src/contracts",
  networks: {
    development: {
      host: "127.0.0.1", // Localhost (default: none)
      port: 8545, // Standard Ethereum port (default: none)
      network_id: "*", // Any network (default: none)
    },
    goerli: {
      provider: () =>
        new HDWalletProvider(
          MNEMONIC,
          `${INFURA_GOERLI_URL}/${INFURA_GOERLI_KEY}`
        ),
      network_id: 5,
    },
  },

  mocha: {},

  compilers: {
    solc: {
      version: "0.8.17", // Fetch exact version from solc-bin (default: truffle's version)
      settings: {
        optimizer: {
          enabled: false,
          runs: 200,
        },
      },
    },
  },
};
