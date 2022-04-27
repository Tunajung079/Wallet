import { ethers, Wallet } from "ethers";
import {
  Web3Provider,
  JsonRpcSigner,
  JsonRpcProvider,
} from "@ethersproject/providers";
import { useEffect, useState } from "react";

import { VoteToken__factory } from "../../typechain/factories/VoteToken__factory";
import { VoteToken } from "../../typechain/VoteToken";

import { Wallet__factory } from "../../typechain/factories/Wallet__factory";
import { Wallet as WalletContractType } from "../../typechain/Wallet";

let provider: Web3Provider | JsonRpcProvider;
let signer: JsonRpcSigner | Wallet;
let token = "0x83093Ad19434471BC63D6EAFE7Ee5f42E41fCd29";

function App() {
  const [address, setAddress] = useState("");
  const [balance, setBalance] = useState("");
  const [addressMint, setAddressMint] = useState("");
  const [loding, setLoding] = useState("");
  const [walletBalance, setWalletBalance] = useState("");
  const [doNate, setDonate] = useState("");

  async function voteToken() {
    try {
      provider = new ethers.providers.Web3Provider(window.ethereum, "any");
      await provider.send("eth_requestAccounts", []);
      signer = provider.getSigner();

      const voteTokenContract = new ethers.Contract(
        token,
        VoteToken__factory.abi,
        signer
      ) as VoteToken;

      // const vote = await voteTokenContract.balanceOf(address);

      // console.log(vote.toNumber());

      setBalance(await (await voteTokenContract.balanceOf(address)).toString());
    } catch (error) {
      console.log(error);
    }
  }

  async function getMint() {
    const voteTokenContract = new ethers.Contract(
      token,
      VoteToken__factory.abi,
      signer
    ) as VoteToken;

    const _mint = await voteTokenContract.mint(addressMint, 1);
    console.log(_mint);
    await _mint.wait();
    setLoding("Success!!");

    const getBalance = voteTokenContract.filters.Transfer(null, addressMint, null);
    
    voteTokenContract.on(getBalance, async (from,to,value) => {
      console.log(from,to,value.toString(),'getBalance');
      setBalance(await (await voteTokenContract.balanceOf(address)).toString());
      
    })
    

    const testlog = await voteTokenContract.filters.TestLog();

    voteTokenContract.on(testlog, (e) => {
      console.log("From");
      console.log(e);
    });
  }

  async function wallet() {
    const voteTokenContract = new ethers.Contract(
      token,
      VoteToken__factory.abi,
      signer
    ) as VoteToken;

    setWalletBalance(
      await (await voteTokenContract.balanceOf(token)).toString()
    );
  }

  async function approve() {
    const voteTokenContract = new ethers.Contract(
      token,
      VoteToken__factory.abi,
      signer
    ) as VoteToken;

    const tx = await voteTokenContract.approve(token, doNate);
    console.log(await tx.wait());
  }

  async function donate() {
    const walletContract = new ethers.Contract(
      token,
      Wallet__factory.abi,
      signer
    ) as WalletContractType;

    const tx = await walletContract.donate(doNate);
    console.log(tx.wait(), "-------donate");
  }

  return (
    <div>
      <h1>Vote Token</h1>
      <div>
        <input type="text" onChange={(e) => setAddress(e.target.value)} />
      </div>
      <p>
        <div>Balance : {balance}</div>
        <button onClick={() => voteToken()}>voteToken</button>
      </p>
      <div>
        AddressMint :
        <input
          type="text"
          onChange={(e) => setAddressMint(e.target.value)}
        />{" "}
        <button onClick={() => getMint()}>Mint</button> {loding}
      </div>
      <p>
        <div>
          <button onClick={() => wallet()}>walletBalance</button>
        </div>
        <div>Wallet Balance : {walletBalance}</div>
      </p>
      <p>
        <div>
          <input type="text" onChange={(e) => setDonate(e.target.value)} />
        </div>
        <div>
          <button onClick={() => approve()}>Approve</button>{" "}
          <button onClick={() => donate()}>Donate</button>
        </div>
        <div>Wallet Balance : {walletBalance}</div>
      </p>
    </div>
  );
}

export default App;
