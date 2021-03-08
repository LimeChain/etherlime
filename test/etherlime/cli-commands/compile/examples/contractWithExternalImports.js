const contractWithExternalImports = `
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.7.0;

import '../node_modules/@openzeppelin/contracts/token/ERC20/ERC20.sol';
import './SafeMath.sol';

contract contractExternalImports {

    uint256 initialValue;
    event SomeEvent(uint256 value);
    
    function someFunction(uint256 value) public payable {
        initialValue += value;
        SomeEvent(initialValue);
    }

    function additionaFn() public returns(uint256){
        return initialValue;
    }

}`

module.exports = {
    contractWithExternalImports
}