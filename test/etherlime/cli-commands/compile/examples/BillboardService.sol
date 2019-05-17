pragma solidity ^0.5.1;

import './SafeMath.sol';

contract BillboardService {

    using SafeMath for uint256;
    
    uint256 public price = 50 wei;
    address public billboardOwner;
    string public slogan;
    
    modifier onlyPositive(uint256 newPrice) {
        require(newPrice > 0, "The price cannot be 0");
        _;
    }
    
    function buy(string memory inSlogan) public payable {
        require(msg.value > price, "The ether sent was too low");
        billboardOwner = msg.sender;
        price = price.add(msg.value);
        slogan = inSlogan;
    }

    function changeSlogan(string memory newSlogan) public payable onlyPositive(msg.value) {
        require(msg.sender == billboardOwner);
        slogan = newSlogan;
    }
    
}