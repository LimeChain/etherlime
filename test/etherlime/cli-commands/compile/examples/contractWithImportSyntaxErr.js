let contractWithImportSyntaxErr = `pragma solidity ^0.6.0;

import './ContractForFailCompilation.sol'

contract ContractWithWarning {

    uint256 initialValue;
    event SomeEvent(uint256 value);
    
    function someFunction(uint256 value) public payable {
        initialValue += value;
        SomeEvent(initialValue);
    }

}`

module.exports = {
    contractWithImportSyntaxErr
}