pragma solidity 0.8.4;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "./VoteToken.sol";

contract Wallet {
    VoteToken voteContract;

    constructor(address _addr) {
        voteContract = VoteToken(_addr);
    }

    function donate (uint256 amount) public{
        voteContract.transferFrom(msg.sender, address(this), amount);
    }
}
