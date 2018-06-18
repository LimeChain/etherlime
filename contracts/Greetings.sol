pragma solidity ^0.4.18; // this means that the file cannot be compiled with a version earlier than specified and greater than or equl to version 0.5.0

contract Greetings { // contract name
	string message; // variable with a string datatype

// this is the constructor, this will be called only once when the contract is deployed to the blockchain
	function Greetings() public {
		message = "I'm ready!";
	}

// modifies the state of the contract
	function setGreetings(string _message) public {
		message = _message;
	}
// 'view' means that this will not change the state of the contact so calling it no transaction will be made
	function getGreetings() public view returns (string) {
		return message;
	}

}