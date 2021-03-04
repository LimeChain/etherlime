// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.7.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Mock_Token_Optimized is ERC20 {
    uint256 public constant INITIAL_SUPPLY = 100000 * (10 ** uint256(18));

    constructor() ERC20("LimePay Token", "LP") {
        _mint(msg.sender, INITIAL_SUPPLY);
    }
}