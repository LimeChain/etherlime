pragma solidity ^0.6.0;

 library LimeFactoryLib {

     function checkFat(uint8 _fat) public pure returns (bool) {
        return _fat > 0;
    }

 } 