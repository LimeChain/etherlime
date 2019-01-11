pragma solidity ^0.5.0;

import './LimeFactoryLib.sol';

contract LimeFactory {

    event FreshLime(string name);

    struct Lime {
        string name;
        uint8 carbohydrates;
        uint8 fat;
        uint8 protein;
    }

    Lime[] public limes;

    function createLime(string memory _name, uint8 _carbohydrates, uint8 _fat, uint8 _protein) public {
        require(_carbohydrates != 0);
        require(LimeFactoryLib.checkFat(_fat));
        limes.push(Lime(_name, _carbohydrates, _fat, _protein));
        emit FreshLime(_name);
    }
}