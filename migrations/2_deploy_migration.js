var Microblogger = artifacts.require("./Microblogger.sol");

module.exports = function(deployer) {
  deployer.deploy(Microblogger);
};
