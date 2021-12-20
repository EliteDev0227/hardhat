require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-truffle5");

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

task("setAutoMiningMode", "Set Auto Mining Mode", async (taskArgs, hre) => {
  console.log('taskArgs', taskArgs)
  if (taskArgs.set) {
    await hre.network.provider.send("evm_setAutomine", [true]);
  }
  else {
    await hre.network.provider.send("evm_setAutomine", [false]);
    await hre.network.provider.send("evm_setIntervalMining", [5000]);
  }
})
.addParam("set", "Set Auto Mining Mode");


// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {

  solidity: "0.8.4",
};
