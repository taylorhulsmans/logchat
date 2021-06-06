const Migrations = artifacts.require("Migrations");
const HashedComments = artifacts.require("HashedComments")
module.exports = function (deployer) {
  deployer.deploy(Migrations);
  deployer.deploy(HashedComments);
};
