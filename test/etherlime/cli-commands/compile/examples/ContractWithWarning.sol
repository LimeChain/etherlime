// SPDX-License-Identifier: UNLICENSED
pragma experimental ABIEncoderV2;
pragma solidity ^0.7.0;

contract ContractWithWarning {

    uint256 initialValue;
    event SomeEvent(uint256 value);
    address owner;

    constructor() public {
        owner = msg.sender;
    }
    
    function someFunction() public payable {
        initialValue += msg.value;
        emit SomeEvent(initialValue);
    }

}