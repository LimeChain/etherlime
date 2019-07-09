let upgradedContract = `pragma solidity ^0.5.0;

import "zos-lib/contracts/Initializable.sol";

contract ZosContract is Initializable {

    uint256 public num;

    function initialize(uint256 _num) initializer public {
        num = _num;
    }

    function newFunction(uint256 _num) public {
        num += _num;
    }
    
}`

module.exports = {upgradedContract}