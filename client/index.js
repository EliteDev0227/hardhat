const {ethers} = require("ethers");
const {contract} = require("hardhat");

const GreeterContractJSON = require("./contracts/Greeter")

const provider = new ethers.providers.JsonRpcProvider();

const signer = provider.getSigner();

let accounts;

const greeterAddress = GreeterContractJSON.address;
const greeterAbi = GreeterContractJSON.abi;

const greeterContract = new ethers.Contract(greeterAddress, greeterAbi, provider);

async function showBalances() {
  accounts.forEach(async account => {
    console.log('account', account, 'balance', ethers.utils.formatEther(await provider.getBalance(account)));
  })
}

async function main() {
  // console.log('provider', provider);
  accounts = await provider.listAccounts();
  // console.log('accounts', accounts);

  // console.log('signer', signer);
  console.log('signer address',  await signer.getAddress());
  // console.log('signer balance', ethers.utils.formatEther(await signer.getBalance()));
  
  console.log('block number', (await provider.getBlockNumber()));

  // await showBalances();

  // await signer.sendTransaction({
  //   to: accounts[2],
  //   value: ethers.utils.parseEther("0.5")
  // })

  // await showBalances();

  greeterContract.on("GreetingSet", (setter, newGreeting, event) => {
    console.log("New greeting was set to", newGreeting, "by", setter);
  })

  const connectedSigner = greeterContract.connect(signer);
  console.log("first greeting", await greeterContract.greet());
  await connectedSigner.setGreeting("Second Greeting");
  console.log("second greeting", await greeterContract.greet());
  await connectedSigner.setGreeting("Third Greeting");
}


main();
