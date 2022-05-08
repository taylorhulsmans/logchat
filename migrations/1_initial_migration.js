const Migrations = artifacts.require("Migrations");
const LogChat = artifacts.require("LogChat")
module.exports = function (deployer) {
  deployer.deploy(Migrations);
  deployer.deploy(LogChat);
};
