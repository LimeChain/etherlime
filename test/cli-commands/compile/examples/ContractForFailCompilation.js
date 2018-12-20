const contractForFailCompilation = `pragma solidity ^7.4.24;

contract ContractForFailCompilation {

    uint256 initialValue;
    event SomeEvent(uint256 value);
    
    function someFunction(uint256 value) public payable {
        initialValue = initialValue.add(value);
        SomeEvent(initialValue);
    }

}`;

module.exports = {contractForFailCompilation}
