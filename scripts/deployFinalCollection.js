
const { ethers } = require("hardhat");

async function main() {
  const SuperMarioWorld = await ethers.getContractFactory("SuperMarioWorldCollection");
  const superMarioWorld = await SuperMarioWorld.deploy("SuperMarioWorldCollection", "SPWC", "https://ipfs.io/ipfs/QmR7YxBTrVQCwW6B4wJVgP3KaRrjjZARquL7eJnDkkZM85/");

  await superMarioWorld.deployed();
  console.log("Success: Contract was deployed to: ", superMarioWorld.address);

  //NFT with 10 copies
  for (let i = 0; i < 4; i++) {
    await superMarioWorld.mint(10);
  }

  //GOLD NFT (rare) without copy
  for (let i = 0; i < 4; i++) {
    await superMarioWorld.mint(1);
  }
  
  console.log("NFT successfully minted");
}


main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
