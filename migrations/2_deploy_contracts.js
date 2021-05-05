/** @format */

var OrderManager = artifacts.require("./OrderManager.sol");

module.exports = function (deployer) {
  deployer.deploy(OrderManager);
};
