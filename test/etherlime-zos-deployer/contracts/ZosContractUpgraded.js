let upgradedContract = `pragma solidity ^0.6.0;

import "@openzeppelin/upgrades/contracts/Initializable.sol";

contract ZosContract is Initializable {

    uint256 public num;

    function initialize(uint256 _num) initializer public {
        num = _num;
    }

    function newFunction(uint256 _num) public {
        num += _num;
    }
    
}`

module.exports = {
    upgradedContract
}