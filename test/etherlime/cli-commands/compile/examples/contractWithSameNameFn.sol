pragma solidity ^0.6.0;

contract contractWithSameNameFn {

    uint256 initialValue;
    event SomeEvent(uint256 value);
    
    function someFunction(uint256 value) public payable {
        initialValue += value;
        emit SomeEvent(initialValue);
    }

    function someFunction() public view returns (uint256){
        return initialValue;
    }

}