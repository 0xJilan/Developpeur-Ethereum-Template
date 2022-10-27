const HDWalletProvider = require("@truffle/hdwallet-provider");
require("dotenv").config();

const {
  MNEMONIC,
  ALCHEMY_GOERLI_URL,
  ALCHEMY_GOERLI_KEY,
  ALCHEMY_MUMBAI_URL,
  ALCHEMY_MUMBAI_KEY,
} = process.env;

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1", // Localhost (default: none)
      port: 8545, // Standard Ethereum port (default: none)
      network_id: "*", // Any network (default: none)
    },
    goerli: {
      provider: function () {
        return new HDWalletProvider({
          mnemonic: { phrase: `${MNEMONIC}` },
          providerOrUrl: `${ALCHEMY_GOERLI_URL}/${ALCHEMY_GOERLI_KEY}`,
        });
      },
      network_id: 5,
    },
    mumbai: {
      provider: () => {
        return new HDWalletProvider({
          mnemonic: { phrase: `${MNEMONIC}` },
          providerOrUrl: `${ALCHEMY_MUMBAI_URL}/${ALCHEMY_MUMBAI_KEY}`,
        });
      },
      network_id: 80001,
    },
  },

  mocha: {
    reporter: "eth-gas-reporter",
    reporterOptions: {
      gasPrice: 1,
      token: "ETH",
      showTimeSpent: true,
    },
  },

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
