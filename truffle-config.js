require("dotenv").config();

const HDWalletProvider = require("@truffle/hdwallet-provider");

const mnemonic = process.env.DEPLOY_ACCOUNT_MNEMONIC;
const infuraApiKey = process.env.INFURA_ID;

module.exports = {
  networks: {
    rinkeby: {
      provider: () =>
        new HDWalletProvider(
          mnemonic,
          `https://rinkeby.infura.io/v3/${infuraApiKey}`
        ),
      network_id: 4,
    },
  },

  // Set default mocha options here, use special reporters etc.
  mocha: {
    // timeout: 100000
  },

  // Configure your compilers
  compilers: {
    solc: {
      // version: "0.6.2"     // Fetch exact version from solc-bin (default: truffle's version)
      // docker: true,        // Use "0.5.1" you've installed locally with docker (default: false)
      // settings: {          // See the solidity docs for advice about optimization and evmVersion
      //  optimizer: {
      //    enabled: false,
      //    runs: 200
      //  },
      //  evmVersion: "byzantium"
      // }
    },
  },
};
