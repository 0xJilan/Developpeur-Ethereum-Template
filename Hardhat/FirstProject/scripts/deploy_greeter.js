const hre = require("hardhat");

async function main() {
  const text = "Bonjour";

  const Greeter = await hre.ethers.getContractFactory("Greeter");
  const greeter = await Greeter.deploy(text);

  await greeter.deployed();

  console.log(`voici le text '${text}' deployed to ${greeter.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
