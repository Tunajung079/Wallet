pragma solidity 0.8.4;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract VoteToken is ERC20 {
    constructor() public ERC20("Vote", "VT") {}
    event TestLog(string message);

    function mint(address user, uint256 amount) public {
        emit TestLog("Hello");
        _mint(user, amount);
    }

}
