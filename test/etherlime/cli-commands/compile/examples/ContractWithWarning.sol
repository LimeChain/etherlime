pragma experimental ABIEncoderV2;
pragma solidity ^0.6.0;

contract ContractWithWarning {

    uint256 initialValue;
    event SomeEvent(uint256 value);
    address payable owner;

    constructor() public {
        owner = msg.sender;
    }
    
    function someFunction() public payable {
        initialValue += msg.value;
        emit SomeEvent(initialValue);
    }

}