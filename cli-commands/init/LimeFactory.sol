pragma solidity ^0.4.24;

contract LimeFactory {

    event FreshLime(string name, uint energy);

    struct Lime {
        string name;
        uint8 carbohydrates;
        uint8 fat;
        uint8 protein;
        uint8 energy;
    }

    Lime[] public limes;

    function createLime(string _name, uint8 _carbohydrates, uint8 _fat, uint8 _protein) internal {
        uint8 energy = _carbohydrates * 3 + _fat * 2 + _protein;
        limes.push(Lime(_name, _carbohydrates, _fat, _protein, energy)) - 1;
        FreshLime(_name, energy);
    }
}