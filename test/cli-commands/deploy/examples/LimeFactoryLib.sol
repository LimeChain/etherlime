pragma solidity 0.5.1;

 library LimeFactoryLib {

     function checkFat(uint8 _fat) public pure returns (bool) {
        return _fat > 0;
    }

 } 