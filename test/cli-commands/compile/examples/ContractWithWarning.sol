pragma solidity ^0.5.0;

contract ContractWithWarning {

    uint256 initialValue;
    event SomeEvent(uint256 value);
    address payable owner;

    constructor() public {
        owner = msg.sender;
    }
    
    function someFunction(uint256 value) public payable {
        initialValue += value;
        emit SomeEvent(initialValue);
    }

    function withdrow() public {
        owner.transfer(this.balance);
    }

}