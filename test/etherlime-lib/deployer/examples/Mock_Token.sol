pragma solidity ^0.6.0;

import "openzeppelin-solidity/contracts/token/ERC20/ERC20.sol";
import "openzeppelin-solidity/contracts/token/ERC20/ERC20Detailed.sol";

contract Mock_Token is ERC20, ERC20Detailed {
    uint256 public constant INITIAL_SUPPLY = 100000 * (10 ** uint256(18));

    constructor() public ERC20Detailed("LimePay Token", "LP", 18) {
        _mint(msg.sender, INITIAL_SUPPLY);
    }
}