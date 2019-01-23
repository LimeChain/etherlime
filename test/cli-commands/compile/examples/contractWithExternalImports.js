const contractWithExternalImports = `pragma solidity ^0.5.0;

import '../node_modules/openzeppelin-solidity/contracts/crowdsale/emission/MintedCrowdsale.sol';
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

module.exports = { contractWithExternalImports }