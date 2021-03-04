// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.7.0;

 library LimeFactoryLib {

     function checkFat(uint8 _fat) public pure returns (bool) {
        return _fat > 0;
    }

 } 