import hre, { ethers } from "hardhat";

export async function deployWallet() {
  const Wallet = await ethers.getContractFactory("Wallet");
  const wallet = await Wallet.deploy("0x83093Ad19434471BC63D6EAFE7Ee5f42E41fCd29");
  console.log(`wallet deployed to:`, wallet.address);
}

deployWallet()
