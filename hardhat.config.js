require("@nomiclabs/hardhat-waffle");
require("hardhat-gas-reporter");
require('@openzeppelin/hardhat-upgrades');
/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.15",

  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts"

  },
};
