const compiledTestToken = {
		"contractName": "Mock_Token",
		"abi": [
		  {
			"constant": true,
			"inputs": [],
			"name": "name",
			"outputs": [
			  {
				"name": "",
				"type": "string"
			  }
			],
			"payable": false,
			"stateMutability": "view",
			"type": "function"
		  },
		  {
			"constant": false,
			"inputs": [
			  {
				"name": "spender",
				"type": "address"
			  },
			  {
				"name": "value",
				"type": "uint256"
			  }
			],
			"name": "approve",
			"outputs": [
			  {
				"name": "",
				"type": "bool"
			  }
			],
			"payable": false,
			"stateMutability": "nonpayable",
			"type": "function"
		  },
		  {
			"constant": true,
			"inputs": [],
			"name": "totalSupply",
			"outputs": [
			  {
				"name": "",
				"type": "uint256"
			  }
			],
			"payable": false,
			"stateMutability": "view",
			"type": "function"
		  },
		  {
			"constant": false,
			"inputs": [
			  {
				"name": "from",
				"type": "address"
			  },
			  {
				"name": "to",
				"type": "address"
			  },
			  {
				"name": "value",
				"type": "uint256"
			  }
			],
			"name": "transferFrom",
			"outputs": [
			  {
				"name": "",
				"type": "bool"
			  }
			],
			"payable": false,
			"stateMutability": "nonpayable",
			"type": "function"
		  },
		  {
			"constant": true,
			"inputs": [],
			"name": "INITIAL_SUPPLY",
			"outputs": [
			  {
				"name": "",
				"type": "uint256"
			  }
			],
			"payable": false,
			"stateMutability": "view",
			"type": "function"
		  },
		  {
			"constant": true,
			"inputs": [],
			"name": "decimals",
			"outputs": [
			  {
				"name": "",
				"type": "uint8"
			  }
			],
			"payable": false,
			"stateMutability": "view",
			"type": "function"
		  },
		  {
			"constant": false,
			"inputs": [
			  {
				"name": "spender",
				"type": "address"
			  },
			  {
				"name": "addedValue",
				"type": "uint256"
			  }
			],
			"name": "increaseAllowance",
			"outputs": [
			  {
				"name": "",
				"type": "bool"
			  }
			],
			"payable": false,
			"stateMutability": "nonpayable",
			"type": "function"
		  },
		  {
			"constant": true,
			"inputs": [
			  {
				"name": "owner",
				"type": "address"
			  }
			],
			"name": "balanceOf",
			"outputs": [
			  {
				"name": "",
				"type": "uint256"
			  }
			],
			"payable": false,
			"stateMutability": "view",
			"type": "function"
		  },
		  {
			"constant": true,
			"inputs": [],
			"name": "symbol",
			"outputs": [
			  {
				"name": "",
				"type": "string"
			  }
			],
			"payable": false,
			"stateMutability": "view",
			"type": "function"
		  },
		  {
			"constant": false,
			"inputs": [
			  {
				"name": "spender",
				"type": "address"
			  },
			  {
				"name": "subtractedValue",
				"type": "uint256"
			  }
			],
			"name": "decreaseAllowance",
			"outputs": [
			  {
				"name": "",
				"type": "bool"
			  }
			],
			"payable": false,
			"stateMutability": "nonpayable",
			"type": "function"
		  },
		  {
			"constant": false,
			"inputs": [
			  {
				"name": "to",
				"type": "address"
			  },
			  {
				"name": "value",
				"type": "uint256"
			  }
			],
			"name": "transfer",
			"outputs": [
			  {
				"name": "",
				"type": "bool"
			  }
			],
			"payable": false,
			"stateMutability": "nonpayable",
			"type": "function"
		  },
		  {
			"constant": true,
			"inputs": [
			  {
				"name": "owner",
				"type": "address"
			  },
			  {
				"name": "spender",
				"type": "address"
			  }
			],
			"name": "allowance",
			"outputs": [
			  {
				"name": "",
				"type": "uint256"
			  }
			],
			"payable": false,
			"stateMutability": "view",
			"type": "function"
		  },
		  {
			"inputs": [],
			"payable": false,
			"stateMutability": "nonpayable",
			"type": "constructor"
		  },
		  {
			"anonymous": false,
			"inputs": [
			  {
				"indexed": true,
				"name": "from",
				"type": "address"
			  },
			  {
				"indexed": true,
				"name": "to",
				"type": "address"
			  },
			  {
				"indexed": false,
				"name": "value",
				"type": "uint256"
			  }
			],
			"name": "Transfer",
			"type": "event"
		  },
		  {
			"anonymous": false,
			"inputs": [
			  {
				"indexed": true,
				"name": "owner",
				"type": "address"
			  },
			  {
				"indexed": true,
				"name": "spender",
				"type": "address"
			  },
			  {
				"indexed": false,
				"name": "value",
				"type": "uint256"
			  }
			],
			"name": "Approval",
			"type": "event"
		  }
		],
		"bytecode": "0x60806040523480156200001157600080fd5b506040805190810160405280600d81526020017f4c696d6550617920546f6b656e000000000000000000000000000000000000008152506040805190810160405280600281526020017f4c50000000000000000000000000000000000000000000000000000000000000815250601282600390805190602001906200009892919062000291565b508160049080519060200190620000b192919062000291565b5080600560006101000a81548160ff021916908360ff160217905550505050620000f4336012600a0a620186a002620000fa640100000000026401000000009004565b62000340565b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff16141515156200013757600080fd5b6200015c816002546200026f6401000000000262001192179091906401000000009004565b600281905550620001c3816000808573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020546200026f6401000000000262001192179091906401000000009004565b6000808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508173ffffffffffffffffffffffffffffffffffffffff16600073ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef836040518082815260200191505060405180910390a35050565b60008082840190508381101515156200028757600080fd5b8091505092915050565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f10620002d457805160ff191683800117855562000305565b8280016001018555821562000305579182015b8281111562000304578251825591602001919060010190620002e7565b5b50905062000314919062000318565b5090565b6200033d91905b80821115620003395760008160009055506001016200031f565b5090565b90565b6111df80620003506000396000f3fe6080604052600436106100b4576000357c01000000000000000000000000000000000000000000000000000000009004806306fdde03146100b9578063095ea7b31461014957806318160ddd146101bc57806323b872dd146101e75780632ff2e9dc1461027a578063313ce567146102a557806339509351146102d657806370a082311461034957806395d89b41146103ae578063a457c2d71461043e578063a9059cbb146104b1578063dd62ed3e14610524575b600080fd5b3480156100c557600080fd5b506100ce6105a9565b6040518080602001828103825283818151815260200191508051906020019080838360005b8381101561010e5780820151818401526020810190506100f3565b50505050905090810190601f16801561013b5780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b34801561015557600080fd5b506101a26004803603604081101561016c57600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff1690602001909291908035906020019092919050505061064b565b604051808215151515815260200191505060405180910390f35b3480156101c857600080fd5b506101d1610778565b6040518082815260200191505060405180910390f35b3480156101f357600080fd5b506102606004803603606081101561020a57600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803573ffffffffffffffffffffffffffffffffffffffff16906020019092919080359060200190929190505050610782565b604051808215151515815260200191505060405180910390f35b34801561028657600080fd5b5061028f61098a565b6040518082815260200191505060405180910390f35b3480156102b157600080fd5b506102ba610997565b604051808260ff1660ff16815260200191505060405180910390f35b3480156102e257600080fd5b5061032f600480360360408110156102f957600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803590602001909291905050506109ae565b604051808215151515815260200191505060405180910390f35b34801561035557600080fd5b506103986004803603602081101561036c57600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050610be5565b6040518082815260200191505060405180910390f35b3480156103ba57600080fd5b506103c3610c2d565b6040518080602001828103825283818151815260200191508051906020019080838360005b838110156104035780820151818401526020810190506103e8565b50505050905090810190601f1680156104305780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b34801561044a57600080fd5b506104976004803603604081101561046157600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff16906020019092919080359060200190929190505050610ccf565b604051808215151515815260200191505060405180910390f35b3480156104bd57600080fd5b5061050a600480360360408110156104d457600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff16906020019092919080359060200190929190505050610f06565b604051808215151515815260200191505060405180910390f35b34801561053057600080fd5b506105936004803603604081101561054757600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050610f1d565b6040518082815260200191505060405180910390f35b606060038054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156106415780601f1061061657610100808354040283529160200191610641565b820191906000526020600020905b81548152906001019060200180831161062457829003601f168201915b5050505050905090565b60008073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff161415151561068857600080fd5b81600160003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508273ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925846040518082815260200191505060405180910390a36001905092915050565b6000600254905090565b600061081382600160008773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054610fa490919063ffffffff16565b600160008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000208190555061089e848484610fc6565b3373ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925600160008873ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020546040518082815260200191505060405180910390a3600190509392505050565b6012600a0a620186a00281565b6000600560009054906101000a900460ff16905090565b60008073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff16141515156109eb57600080fd5b610a7a82600160003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205461119290919063ffffffff16565b600160003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508273ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925600160003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020546040518082815260200191505060405180910390a36001905092915050565b60008060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020549050919050565b606060048054600181600116156101000203166002900480601f016020809104026020016040519081016040528092919081815260200182805460018160011615610100020316600290048015610cc55780601f10610c9a57610100808354040283529160200191610cc5565b820191906000526020600020905b815481529060010190602001808311610ca857829003601f168201915b5050505050905090565b60008073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff1614151515610d0c57600080fd5b610d9b82600160003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054610fa490919063ffffffff16565b600160003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508273ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925600160003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020546040518082815260200191505060405180910390a36001905092915050565b6000610f13338484610fc6565b6001905092915050565b6000600160008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905092915050565b6000828211151515610fb557600080fd5b600082840390508091505092915050565b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff161415151561100257600080fd5b611053816000808673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054610fa490919063ffffffff16565b6000808573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055506110e6816000808573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205461119290919063ffffffff16565b6000808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508173ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef836040518082815260200191505060405180910390a3505050565b60008082840190508381101515156111a957600080fd5b809150509291505056fea165627a7a72305820878bbf1bd063b4996e8f7366639f57b037ec9ff7bd31ce9c077abcb7783b0a6e0029",
		"deployedBytecode": "0x6080604052600436106100b4576000357c01000000000000000000000000000000000000000000000000000000009004806306fdde03146100b9578063095ea7b31461014957806318160ddd146101bc57806323b872dd146101e75780632ff2e9dc1461027a578063313ce567146102a557806339509351146102d657806370a082311461034957806395d89b41146103ae578063a457c2d71461043e578063a9059cbb146104b1578063dd62ed3e14610524575b600080fd5b3480156100c557600080fd5b506100ce6105a9565b6040518080602001828103825283818151815260200191508051906020019080838360005b8381101561010e5780820151818401526020810190506100f3565b50505050905090810190601f16801561013b5780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b34801561015557600080fd5b506101a26004803603604081101561016c57600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff1690602001909291908035906020019092919050505061064b565b604051808215151515815260200191505060405180910390f35b3480156101c857600080fd5b506101d1610778565b6040518082815260200191505060405180910390f35b3480156101f357600080fd5b506102606004803603606081101561020a57600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803573ffffffffffffffffffffffffffffffffffffffff16906020019092919080359060200190929190505050610782565b604051808215151515815260200191505060405180910390f35b34801561028657600080fd5b5061028f61098a565b6040518082815260200191505060405180910390f35b3480156102b157600080fd5b506102ba610997565b604051808260ff1660ff16815260200191505060405180910390f35b3480156102e257600080fd5b5061032f600480360360408110156102f957600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803590602001909291905050506109ae565b604051808215151515815260200191505060405180910390f35b34801561035557600080fd5b506103986004803603602081101561036c57600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050610be5565b6040518082815260200191505060405180910390f35b3480156103ba57600080fd5b506103c3610c2d565b6040518080602001828103825283818151815260200191508051906020019080838360005b838110156104035780820151818401526020810190506103e8565b50505050905090810190601f1680156104305780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b34801561044a57600080fd5b506104976004803603604081101561046157600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff16906020019092919080359060200190929190505050610ccf565b604051808215151515815260200191505060405180910390f35b3480156104bd57600080fd5b5061050a600480360360408110156104d457600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff16906020019092919080359060200190929190505050610f06565b604051808215151515815260200191505060405180910390f35b34801561053057600080fd5b506105936004803603604081101561054757600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050610f1d565b6040518082815260200191505060405180910390f35b606060038054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156106415780601f1061061657610100808354040283529160200191610641565b820191906000526020600020905b81548152906001019060200180831161062457829003601f168201915b5050505050905090565b60008073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff161415151561068857600080fd5b81600160003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508273ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925846040518082815260200191505060405180910390a36001905092915050565b6000600254905090565b600061081382600160008773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054610fa490919063ffffffff16565b600160008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000208190555061089e848484610fc6565b3373ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925600160008873ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020546040518082815260200191505060405180910390a3600190509392505050565b6012600a0a620186a00281565b6000600560009054906101000a900460ff16905090565b60008073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff16141515156109eb57600080fd5b610a7a82600160003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205461119290919063ffffffff16565b600160003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508273ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925600160003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020546040518082815260200191505060405180910390a36001905092915050565b60008060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020549050919050565b606060048054600181600116156101000203166002900480601f016020809104026020016040519081016040528092919081815260200182805460018160011615610100020316600290048015610cc55780601f10610c9a57610100808354040283529160200191610cc5565b820191906000526020600020905b815481529060010190602001808311610ca857829003601f168201915b5050505050905090565b60008073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff1614151515610d0c57600080fd5b610d9b82600160003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054610fa490919063ffffffff16565b600160003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508273ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925600160003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020546040518082815260200191505060405180910390a36001905092915050565b6000610f13338484610fc6565b6001905092915050565b6000600160008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905092915050565b6000828211151515610fb557600080fd5b600082840390508091505092915050565b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff161415151561100257600080fd5b611053816000808673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054610fa490919063ffffffff16565b6000808573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055506110e6816000808573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205461119290919063ffffffff16565b6000808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508173ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef836040518082815260200191505060405180910390a3505050565b60008082840190508381101515156111a957600080fd5b809150509291505056fea165627a7a72305820878bbf1bd063b4996e8f7366639f57b037ec9ff7bd31ce9c077abcb7783b0a6e0029",
		"sourceMap": "161:240:4:-;;;287:112;8:9:-1;5:2;;;30:1;27;20:12;5:2;287:112:4;405:163:7;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;345:2:4;501:4:7;493:5;:12;;;;;;;;;;;;:::i;:::-;;525:6;515:7;:16;;;;;;;;;;;;:::i;:::-;;553:8;541:9;;:20;;;;;;;;;;;;;;;;;;405:163;;;359:33:4;365:10;276:2;262;:17;252:6;:28;359:5;;;:33;;;:::i;:::-;161:240;;6198:263:6;6291:1;6272:21;;:7;:21;;;;6264:30;;;;;;;;6320:23;6337:5;6320:12;;:16;;;;;;:23;;;;;:::i;:::-;6305:12;:38;;;;6374:29;6397:5;6374:9;:18;6384:7;6374:18;;;;;;;;;;;;;;;;:22;;;;;;:29;;;;;:::i;:::-;6353:9;:18;6363:7;6353:18;;;;;;;;;;;;;;;:50;;;;6439:7;6418:36;;6435:1;6418:36;;;6448:5;6418:36;;;;;;;;;;;;;;;;;;6198:263;;:::o;1431:145:5:-;1489:7;1508:9;1524:1;1520;:5;1508:17;;1548:1;1543;:6;;1535:15;;;;;;;;1568:1;1561:8;;;1431:145;;;;:::o;161:240:4:-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;:::o;:::-;;;;;;;;;;;;;;;;;;;;;;;;;;;:::o;:::-;;;;;;;",
		"deployedSourceMap": "161:240:4:-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;628:81:7;;8:9:-1;5:2;;;30:1;27;20:12;5:2;628:81:7;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;23:1:-1;8:100;33:3;30:1;27:10;8:100;;;99:1;94:3;90:11;84:18;80:1;75:3;71:11;64:39;52:2;49:1;45:10;40:15;;8:100;;;12:14;628:81:7;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;2735:238:6;;8:9:-1;5:2;;;30:1;27;20:12;5:2;2735:238:6;;;;;;13:2:-1;8:3;5:11;2:2;;;29:1;26;19:12;2:2;2735:238:6;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;936:89;;8:9:-1;5:2;;;30:1;27;20:12;5:2;936:89:6;;;:::i;:::-;;;;;;;;;;;;;;;;;;;3436:294;;8:9:-1;5:2;;;30:1;27;20:12;5:2;3436:294:6;;;;;;13:2:-1;8:3;5:11;2:2;;;29:1;26;19:12;2:2;3436:294:6;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;211:69:4;;8:9:-1;5:2;;;30:1;27;20:12;5:2;211:69:4;;;:::i;:::-;;;;;;;;;;;;;;;;;;;930:81:7;;8:9:-1;5:2;;;30:1;27;20:12;5:2;930:81:7;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;4233:317:6;;8:9:-1;5:2;;;30:1;27;20:12;5:2;4233:317:6;;;;;;13:2:-1;8:3;5:11;2:2;;;29:1;26;19:12;2:2;4233:317:6;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;1234:104;;8:9:-1;5:2;;;30:1;27;20:12;5:2;1234:104:6;;;;;;13:2:-1;8:3;5:11;2:2;;;29:1;26;19:12;2:2;1234:104:6;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;771:85:7;;8:9:-1;5:2;;;30:1;27;20:12;5:2;771:85:7;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;23:1:-1;8:100;33:3;30:1;27:10;8:100;;;99:1;94:3;90:11;84:18;80:1;75:3;71:11;64:39;52:2;49:1;45:10;40:15;;8:100;;;12:14;771:85:7;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;5058:327:6;;8:9:-1;5:2;;;30:1;27;20:12;5:2;5058:327:6;;;;;;13:2:-1;8:3;5:11;2:2;;;29:1;26;19:12;2:2;5058:327:6;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;1962:137;;8:9:-1;5:2;;;30:1;27;20:12;5:2;1962:137:6;;;;;;13:2:-1;8:3;5:11;2:2;;;29:1;26;19:12;2:2;1962:137:6;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;1669:129;;8:9:-1;5:2;;;30:1;27;20:12;5:2;1669:129:6;;;;;;13:2:-1;8:3;5:11;2:2;;;29:1;26;19:12;2:2;1669:129:6;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;628:81:7;665:13;697:5;690:12;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;628:81;:::o;2735:238:6:-;2800:4;2843:1;2824:21;;:7;:21;;;;2816:30;;;;;;;;2889:5;2857:8;:20;2866:10;2857:20;;;;;;;;;;;;;;;:29;2878:7;2857:29;;;;;;;;;;;;;;;:37;;;;2930:7;2909:36;;2918:10;2909:36;;;2939:5;2909:36;;;;;;;;;;;;;;;;;;2962:4;2955:11;;2735:238;;;;:::o;936:89::-;980:7;1006:12;;999:19;;936:89;:::o;3436:294::-;3515:4;3560:37;3591:5;3560:8;:14;3569:4;3560:14;;;;;;;;;;;;;;;:26;3575:10;3560:26;;;;;;;;;;;;;;;;:30;;:37;;;;:::i;:::-;3531:8;:14;3540:4;3531:14;;;;;;;;;;;;;;;:26;3546:10;3531:26;;;;;;;;;;;;;;;:66;;;;3607:26;3617:4;3623:2;3627:5;3607:9;:26::i;:::-;3663:10;3648:54;;3657:4;3648:54;;;3675:8;:14;3684:4;3675:14;;;;;;;;;;;;;;;:26;3690:10;3675:26;;;;;;;;;;;;;;;;3648:54;;;;;;;;;;;;;;;;;;3719:4;3712:11;;3436:294;;;;;:::o;211:69:4:-;276:2;262;:17;252:6;:28;211:69;:::o;930:81:7:-;971:5;995:9;;;;;;;;;;;988:16;;930:81;:::o;4233:317:6:-;4313:4;4356:1;4337:21;;:7;:21;;;;4329:30;;;;;;;;4402:45;4436:10;4402:8;:20;4411:10;4402:20;;;;;;;;;;;;;;;:29;4423:7;4402:29;;;;;;;;;;;;;;;;:33;;:45;;;;:::i;:::-;4370:8;:20;4379:10;4370:20;;;;;;;;;;;;;;;:29;4391:7;4370:29;;;;;;;;;;;;;;;:77;;;;4483:7;4462:60;;4471:10;4462:60;;;4492:8;:20;4501:10;4492:20;;;;;;;;;;;;;;;:29;4513:7;4492:29;;;;;;;;;;;;;;;;4462:60;;;;;;;;;;;;;;;;;;4539:4;4532:11;;4233:317;;;;:::o;1234:104::-;1289:7;1315:9;:16;1325:5;1315:16;;;;;;;;;;;;;;;;1308:23;;1234:104;;;:::o;771:85:7:-;810:13;842:7;835:14;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;771:85;:::o;5058:327:6:-;5143:4;5186:1;5167:21;;:7;:21;;;;5159:30;;;;;;;;5232:50;5266:15;5232:8;:20;5241:10;5232:20;;;;;;;;;;;;;;;:29;5253:7;5232:29;;;;;;;;;;;;;;;;:33;;:50;;;;:::i;:::-;5200:8;:20;5209:10;5200:20;;;;;;;;;;;;;;;:29;5221:7;5200:29;;;;;;;;;;;;;;;:82;;;;5318:7;5297:60;;5306:10;5297:60;;;5327:8;:20;5336:10;5327:20;;;;;;;;;;;;;;;:29;5348:7;5327:29;;;;;;;;;;;;;;;;5297:60;;;;;;;;;;;;;;;;;;5374:4;5367:11;;5058:327;;;;:::o;1962:137::-;2023:4;2039:32;2049:10;2061:2;2065:5;2039:9;:32::i;:::-;2088:4;2081:11;;1962:137;;;;:::o;1669:129::-;1741:7;1767:8;:15;1776:5;1767:15;;;;;;;;;;;;;;;:24;1783:7;1767:24;;;;;;;;;;;;;;;;1760:31;;1669:129;;;;:::o;1205:145:5:-;1263:7;1295:1;1290;:6;;1282:15;;;;;;;;1307:9;1323:1;1319;:5;1307:17;;1342:1;1335:8;;;1205:145;;;;:::o;5599:256:6:-;5700:1;5686:16;;:2;:16;;;;5678:25;;;;;;;;5732:26;5752:5;5732:9;:15;5742:4;5732:15;;;;;;;;;;;;;;;;:19;;:26;;;;:::i;:::-;5714:9;:15;5724:4;5714:15;;;;;;;;;;;;;;;:44;;;;5784:24;5802:5;5784:9;:13;5794:2;5784:13;;;;;;;;;;;;;;;;:17;;:24;;;;:::i;:::-;5768:9;:13;5778:2;5768:13;;;;;;;;;;;;;;;:40;;;;5838:2;5823:25;;5832:4;5823:25;;;5842:5;5823:25;;;;;;;;;;;;;;;;;;5599:256;;;:::o;1431:145:5:-;1489:7;1508:9;1524:1;1520;:5;1508:17;;1548:1;1543;:6;;1535:15;;;;;;;;1568:1;1561:8;;;1431:145;;;;:::o",
		"source": "pragma solidity 0.5.1;\n\nimport \"openzeppelin-solidity/contracts/token/ERC20/ERC20.sol\";\nimport \"openzeppelin-solidity/contracts/token/ERC20/ERC20Detailed.sol\";\n\ncontract Mock_Token is ERC20, ERC20Detailed {\n    uint256 public constant INITIAL_SUPPLY = 100000 * (10 ** uint256(18));\n\n    constructor() public ERC20Detailed(\"LimePay Token\", \"LP\", 18) {\n        _mint(msg.sender, INITIAL_SUPPLY);\n    }\n}",
		"sourcePath": "/Users/ognyanchikov/limepay-contracts/smart-contracts/contracts/Mock_Token.sol",
		"ast": {
		  "absolutePath": "/Users/ognyanchikov/limepay-contracts/smart-contracts/contracts/Mock_Token.sol",
		  "exportedSymbols": {
			"Mock_Token": [
			  720
			]
		  },
		  "id": 721,
		  "nodeType": "SourceUnit",
		  "nodes": [
			{
			  "id": 688,
			  "literals": [
				"solidity",
				"0.5",
				".1"
			  ],
			  "nodeType": "PragmaDirective",
			  "src": "0:22:4"
			},
			{
			  "absolutePath": "openzeppelin-solidity/contracts/token/ERC20/ERC20.sol",
			  "file": "openzeppelin-solidity/contracts/token/ERC20/ERC20.sol",
			  "id": 689,
			  "nodeType": "ImportDirective",
			  "scope": 721,
			  "sourceUnit": 1281,
			  "src": "24:63:4",
			  "symbolAliases": [],
			  "unitAlias": ""
			},
			{
			  "absolutePath": "openzeppelin-solidity/contracts/token/ERC20/ERC20Detailed.sol",
			  "file": "openzeppelin-solidity/contracts/token/ERC20/ERC20Detailed.sol",
			  "id": 690,
			  "nodeType": "ImportDirective",
			  "scope": 721,
			  "sourceUnit": 1339,
			  "src": "88:71:4",
			  "symbolAliases": [],
			  "unitAlias": ""
			},
			{
			  "baseContracts": [
				{
				  "arguments": null,
				  "baseName": {
					"contractScope": null,
					"id": 691,
					"name": "ERC20",
					"nodeType": "UserDefinedTypeName",
					"referencedDeclaration": 1280,
					"src": "184:5:4",
					"typeDescriptions": {
					  "typeIdentifier": "t_contract$_ERC20_$1280",
					  "typeString": "contract ERC20"
					}
				  },
				  "id": 692,
				  "nodeType": "InheritanceSpecifier",
				  "src": "184:5:4"
				},
				{
				  "arguments": null,
				  "baseName": {
					"contractScope": null,
					"id": 693,
					"name": "ERC20Detailed",
					"nodeType": "UserDefinedTypeName",
					"referencedDeclaration": 1338,
					"src": "191:13:4",
					"typeDescriptions": {
					  "typeIdentifier": "t_contract$_ERC20Detailed_$1338",
					  "typeString": "contract ERC20Detailed"
					}
				  },
				  "id": 694,
				  "nodeType": "InheritanceSpecifier",
				  "src": "191:13:4"
				}
			  ],
			  "contractDependencies": [
				1280,
				1338,
				1407
			  ],
			  "contractKind": "contract",
			  "documentation": null,
			  "fullyImplemented": true,
			  "id": 720,
			  "linearizedBaseContracts": [
				720,
				1338,
				1280,
				1407
			  ],
			  "name": "Mock_Token",
			  "nodeType": "ContractDefinition",
			  "nodes": [
				{
				  "constant": true,
				  "id": 704,
				  "name": "INITIAL_SUPPLY",
				  "nodeType": "VariableDeclaration",
				  "scope": 720,
				  "src": "211:69:4",
				  "stateVariable": true,
				  "storageLocation": "default",
				  "typeDescriptions": {
					"typeIdentifier": "t_uint256",
					"typeString": "uint256"
				  },
				  "typeName": {
					"id": 695,
					"name": "uint256",
					"nodeType": "ElementaryTypeName",
					"src": "211:7:4",
					"typeDescriptions": {
					  "typeIdentifier": "t_uint256",
					  "typeString": "uint256"
					}
				  },
				  "value": {
					"argumentTypes": null,
					"commonType": {
					  "typeIdentifier": "t_uint256",
					  "typeString": "uint256"
					},
					"id": 703,
					"isConstant": false,
					"isLValue": false,
					"isPure": true,
					"lValueRequested": false,
					"leftExpression": {
					  "argumentTypes": null,
					  "hexValue": "313030303030",
					  "id": 696,
					  "isConstant": false,
					  "isLValue": false,
					  "isPure": true,
					  "kind": "number",
					  "lValueRequested": false,
					  "nodeType": "Literal",
					  "src": "252:6:4",
					  "subdenomination": null,
					  "typeDescriptions": {
						"typeIdentifier": "t_rational_100000_by_1",
						"typeString": "int_const 100000"
					  },
					  "value": "100000"
					},
					"nodeType": "BinaryOperation",
					"operator": "*",
					"rightExpression": {
					  "argumentTypes": null,
					  "components": [
						{
						  "argumentTypes": null,
						  "commonType": {
							"typeIdentifier": "t_uint256",
							"typeString": "uint256"
						  },
						  "id": 701,
						  "isConstant": false,
						  "isLValue": false,
						  "isPure": true,
						  "lValueRequested": false,
						  "leftExpression": {
							"argumentTypes": null,
							"hexValue": "3130",
							"id": 697,
							"isConstant": false,
							"isLValue": false,
							"isPure": true,
							"kind": "number",
							"lValueRequested": false,
							"nodeType": "Literal",
							"src": "262:2:4",
							"subdenomination": null,
							"typeDescriptions": {
							  "typeIdentifier": "t_rational_10_by_1",
							  "typeString": "int_const 10"
							},
							"value": "10"
						  },
						  "nodeType": "BinaryOperation",
						  "operator": "**",
						  "rightExpression": {
							"argumentTypes": null,
							"arguments": [
							  {
								"argumentTypes": null,
								"hexValue": "3138",
								"id": 699,
								"isConstant": false,
								"isLValue": false,
								"isPure": true,
								"kind": "number",
								"lValueRequested": false,
								"nodeType": "Literal",
								"src": "276:2:4",
								"subdenomination": null,
								"typeDescriptions": {
								  "typeIdentifier": "t_rational_18_by_1",
								  "typeString": "int_const 18"
								},
								"value": "18"
							  }
							],
							"expression": {
							  "argumentTypes": [
								{
								  "typeIdentifier": "t_rational_18_by_1",
								  "typeString": "int_const 18"
								}
							  ],
							  "id": 698,
							  "isConstant": false,
							  "isLValue": false,
							  "isPure": true,
							  "lValueRequested": false,
							  "nodeType": "ElementaryTypeNameExpression",
							  "src": "268:7:4",
							  "typeDescriptions": {
								"typeIdentifier": "t_type$_t_uint256_$",
								"typeString": "type(uint256)"
							  },
							  "typeName": "uint256"
							},
							"id": 700,
							"isConstant": false,
							"isLValue": false,
							"isPure": true,
							"kind": "typeConversion",
							"lValueRequested": false,
							"names": [],
							"nodeType": "FunctionCall",
							"src": "268:11:4",
							"typeDescriptions": {
							  "typeIdentifier": "t_uint256",
							  "typeString": "uint256"
							}
						  },
						  "src": "262:17:4",
						  "typeDescriptions": {
							"typeIdentifier": "t_uint256",
							"typeString": "uint256"
						  }
						}
					  ],
					  "id": 702,
					  "isConstant": false,
					  "isInlineArray": false,
					  "isLValue": false,
					  "isPure": true,
					  "lValueRequested": false,
					  "nodeType": "TupleExpression",
					  "src": "261:19:4",
					  "typeDescriptions": {
						"typeIdentifier": "t_uint256",
						"typeString": "uint256"
					  }
					},
					"src": "252:28:4",
					"typeDescriptions": {
					  "typeIdentifier": "t_uint256",
					  "typeString": "uint256"
					}
				  },
				  "visibility": "public"
				},
				{
				  "body": {
					"id": 718,
					"nodeType": "Block",
					"src": "349:50:4",
					"statements": [
					  {
						"expression": {
						  "argumentTypes": null,
						  "arguments": [
							{
							  "argumentTypes": null,
							  "expression": {
								"argumentTypes": null,
								"id": 713,
								"name": "msg",
								"nodeType": "Identifier",
								"overloadedDeclarations": [],
								"referencedDeclaration": 1422,
								"src": "365:3:4",
								"typeDescriptions": {
								  "typeIdentifier": "t_magic_message",
								  "typeString": "msg"
								}
							  },
							  "id": 714,
							  "isConstant": false,
							  "isLValue": false,
							  "isPure": false,
							  "lValueRequested": false,
							  "memberName": "sender",
							  "nodeType": "MemberAccess",
							  "referencedDeclaration": null,
							  "src": "365:10:4",
							  "typeDescriptions": {
								"typeIdentifier": "t_address_payable",
								"typeString": "address payable"
							  }
							},
							{
							  "argumentTypes": null,
							  "id": 715,
							  "name": "INITIAL_SUPPLY",
							  "nodeType": "Identifier",
							  "overloadedDeclarations": [],
							  "referencedDeclaration": 704,
							  "src": "377:14:4",
							  "typeDescriptions": {
								"typeIdentifier": "t_uint256",
								"typeString": "uint256"
							  }
							}
						  ],
						  "expression": {
							"argumentTypes": [
							  {
								"typeIdentifier": "t_address_payable",
								"typeString": "address payable"
							  },
							  {
								"typeIdentifier": "t_uint256",
								"typeString": "uint256"
							  }
							],
							"id": 712,
							"name": "_mint",
							"nodeType": "Identifier",
							"overloadedDeclarations": [],
							"referencedDeclaration": 1195,
							"src": "359:5:4",
							"typeDescriptions": {
							  "typeIdentifier": "t_function_internal_nonpayable$_t_address_$_t_uint256_$returns$__$",
							  "typeString": "function (address,uint256)"
							}
						  },
						  "id": 716,
						  "isConstant": false,
						  "isLValue": false,
						  "isPure": false,
						  "kind": "functionCall",
						  "lValueRequested": false,
						  "names": [],
						  "nodeType": "FunctionCall",
						  "src": "359:33:4",
						  "typeDescriptions": {
							"typeIdentifier": "t_tuple$__$",
							"typeString": "tuple()"
						  }
						},
						"id": 717,
						"nodeType": "ExpressionStatement",
						"src": "359:33:4"
					  }
					]
				  },
				  "documentation": null,
				  "id": 719,
				  "implemented": true,
				  "kind": "constructor",
				  "modifiers": [
					{
					  "arguments": [
						{
						  "argumentTypes": null,
						  "hexValue": "4c696d6550617920546f6b656e",
						  "id": 707,
						  "isConstant": false,
						  "isLValue": false,
						  "isPure": true,
						  "kind": "string",
						  "lValueRequested": false,
						  "nodeType": "Literal",
						  "src": "322:15:4",
						  "subdenomination": null,
						  "typeDescriptions": {
							"typeIdentifier": "t_stringliteral_ec5bc24cffd2b876fca07d43cc5d605efbdb5b7b644287b510e4cb65b8b673dc",
							"typeString": "literal_string \"LimePay Token\""
						  },
						  "value": "LimePay Token"
						},
						{
						  "argumentTypes": null,
						  "hexValue": "4c50",
						  "id": 708,
						  "isConstant": false,
						  "isLValue": false,
						  "isPure": true,
						  "kind": "string",
						  "lValueRequested": false,
						  "nodeType": "Literal",
						  "src": "339:4:4",
						  "subdenomination": null,
						  "typeDescriptions": {
							"typeIdentifier": "t_stringliteral_9c21acbd49d77f161dc74d87db3b4adb975d116ec37505d4dd76e89d2844ede3",
							"typeString": "literal_string \"LP\""
						  },
						  "value": "LP"
						},
						{
						  "argumentTypes": null,
						  "hexValue": "3138",
						  "id": 709,
						  "isConstant": false,
						  "isLValue": false,
						  "isPure": true,
						  "kind": "number",
						  "lValueRequested": false,
						  "nodeType": "Literal",
						  "src": "345:2:4",
						  "subdenomination": null,
						  "typeDescriptions": {
							"typeIdentifier": "t_rational_18_by_1",
							"typeString": "int_const 18"
						  },
						  "value": "18"
						}
					  ],
					  "id": 710,
					  "modifierName": {
						"argumentTypes": null,
						"id": 706,
						"name": "ERC20Detailed",
						"nodeType": "Identifier",
						"overloadedDeclarations": [],
						"referencedDeclaration": 1338,
						"src": "308:13:4",
						"typeDescriptions": {
						  "typeIdentifier": "t_type$_t_contract$_ERC20Detailed_$1338_$",
						  "typeString": "type(contract ERC20Detailed)"
						}
					  },
					  "nodeType": "ModifierInvocation",
					  "src": "308:40:4"
					}
				  ],
				  "name": "",
				  "nodeType": "FunctionDefinition",
				  "parameters": {
					"id": 705,
					"nodeType": "ParameterList",
					"parameters": [],
					"src": "298:2:4"
				  },
				  "returnParameters": {
					"id": 711,
					"nodeType": "ParameterList",
					"parameters": [],
					"src": "349:0:4"
				  },
				  "scope": 720,
				  "src": "287:112:4",
				  "stateMutability": "nonpayable",
				  "superFunction": null,
				  "visibility": "public"
				}
			  ],
			  "scope": 721,
			  "src": "161:240:4"
			}
		  ],
		  "src": "0:401:4"
		},
		"legacyAST": {
		  "absolutePath": "/Users/ognyanchikov/limepay-contracts/smart-contracts/contracts/Mock_Token.sol",
		  "exportedSymbols": {
			"Mock_Token": [
			  720
			]
		  },
		  "id": 721,
		  "nodeType": "SourceUnit",
		  "nodes": [
			{
			  "id": 688,
			  "literals": [
				"solidity",
				"0.5",
				".1"
			  ],
			  "nodeType": "PragmaDirective",
			  "src": "0:22:4"
			},
			{
			  "absolutePath": "openzeppelin-solidity/contracts/token/ERC20/ERC20.sol",
			  "file": "openzeppelin-solidity/contracts/token/ERC20/ERC20.sol",
			  "id": 689,
			  "nodeType": "ImportDirective",
			  "scope": 721,
			  "sourceUnit": 1281,
			  "src": "24:63:4",
			  "symbolAliases": [],
			  "unitAlias": ""
			},
			{
			  "absolutePath": "openzeppelin-solidity/contracts/token/ERC20/ERC20Detailed.sol",
			  "file": "openzeppelin-solidity/contracts/token/ERC20/ERC20Detailed.sol",
			  "id": 690,
			  "nodeType": "ImportDirective",
			  "scope": 721,
			  "sourceUnit": 1339,
			  "src": "88:71:4",
			  "symbolAliases": [],
			  "unitAlias": ""
			},
			{
			  "baseContracts": [
				{
				  "arguments": null,
				  "baseName": {
					"contractScope": null,
					"id": 691,
					"name": "ERC20",
					"nodeType": "UserDefinedTypeName",
					"referencedDeclaration": 1280,
					"src": "184:5:4",
					"typeDescriptions": {
					  "typeIdentifier": "t_contract$_ERC20_$1280",
					  "typeString": "contract ERC20"
					}
				  },
				  "id": 692,
				  "nodeType": "InheritanceSpecifier",
				  "src": "184:5:4"
				},
				{
				  "arguments": null,
				  "baseName": {
					"contractScope": null,
					"id": 693,
					"name": "ERC20Detailed",
					"nodeType": "UserDefinedTypeName",
					"referencedDeclaration": 1338,
					"src": "191:13:4",
					"typeDescriptions": {
					  "typeIdentifier": "t_contract$_ERC20Detailed_$1338",
					  "typeString": "contract ERC20Detailed"
					}
				  },
				  "id": 694,
				  "nodeType": "InheritanceSpecifier",
				  "src": "191:13:4"
				}
			  ],
			  "contractDependencies": [
				1280,
				1338,
				1407
			  ],
			  "contractKind": "contract",
			  "documentation": null,
			  "fullyImplemented": true,
			  "id": 720,
			  "linearizedBaseContracts": [
				720,
				1338,
				1280,
				1407
			  ],
			  "name": "Mock_Token",
			  "nodeType": "ContractDefinition",
			  "nodes": [
				{
				  "constant": true,
				  "id": 704,
				  "name": "INITIAL_SUPPLY",
				  "nodeType": "VariableDeclaration",
				  "scope": 720,
				  "src": "211:69:4",
				  "stateVariable": true,
				  "storageLocation": "default",
				  "typeDescriptions": {
					"typeIdentifier": "t_uint256",
					"typeString": "uint256"
				  },
				  "typeName": {
					"id": 695,
					"name": "uint256",
					"nodeType": "ElementaryTypeName",
					"src": "211:7:4",
					"typeDescriptions": {
					  "typeIdentifier": "t_uint256",
					  "typeString": "uint256"
					}
				  },
				  "value": {
					"argumentTypes": null,
					"commonType": {
					  "typeIdentifier": "t_uint256",
					  "typeString": "uint256"
					},
					"id": 703,
					"isConstant": false,
					"isLValue": false,
					"isPure": true,
					"lValueRequested": false,
					"leftExpression": {
					  "argumentTypes": null,
					  "hexValue": "313030303030",
					  "id": 696,
					  "isConstant": false,
					  "isLValue": false,
					  "isPure": true,
					  "kind": "number",
					  "lValueRequested": false,
					  "nodeType": "Literal",
					  "src": "252:6:4",
					  "subdenomination": null,
					  "typeDescriptions": {
						"typeIdentifier": "t_rational_100000_by_1",
						"typeString": "int_const 100000"
					  },
					  "value": "100000"
					},
					"nodeType": "BinaryOperation",
					"operator": "*",
					"rightExpression": {
					  "argumentTypes": null,
					  "components": [
						{
						  "argumentTypes": null,
						  "commonType": {
							"typeIdentifier": "t_uint256",
							"typeString": "uint256"
						  },
						  "id": 701,
						  "isConstant": false,
						  "isLValue": false,
						  "isPure": true,
						  "lValueRequested": false,
						  "leftExpression": {
							"argumentTypes": null,
							"hexValue": "3130",
							"id": 697,
							"isConstant": false,
							"isLValue": false,
							"isPure": true,
							"kind": "number",
							"lValueRequested": false,
							"nodeType": "Literal",
							"src": "262:2:4",
							"subdenomination": null,
							"typeDescriptions": {
							  "typeIdentifier": "t_rational_10_by_1",
							  "typeString": "int_const 10"
							},
							"value": "10"
						  },
						  "nodeType": "BinaryOperation",
						  "operator": "**",
						  "rightExpression": {
							"argumentTypes": null,
							"arguments": [
							  {
								"argumentTypes": null,
								"hexValue": "3138",
								"id": 699,
								"isConstant": false,
								"isLValue": false,
								"isPure": true,
								"kind": "number",
								"lValueRequested": false,
								"nodeType": "Literal",
								"src": "276:2:4",
								"subdenomination": null,
								"typeDescriptions": {
								  "typeIdentifier": "t_rational_18_by_1",
								  "typeString": "int_const 18"
								},
								"value": "18"
							  }
							],
							"expression": {
							  "argumentTypes": [
								{
								  "typeIdentifier": "t_rational_18_by_1",
								  "typeString": "int_const 18"
								}
							  ],
							  "id": 698,
							  "isConstant": false,
							  "isLValue": false,
							  "isPure": true,
							  "lValueRequested": false,
							  "nodeType": "ElementaryTypeNameExpression",
							  "src": "268:7:4",
							  "typeDescriptions": {
								"typeIdentifier": "t_type$_t_uint256_$",
								"typeString": "type(uint256)"
							  },
							  "typeName": "uint256"
							},
							"id": 700,
							"isConstant": false,
							"isLValue": false,
							"isPure": true,
							"kind": "typeConversion",
							"lValueRequested": false,
							"names": [],
							"nodeType": "FunctionCall",
							"src": "268:11:4",
							"typeDescriptions": {
							  "typeIdentifier": "t_uint256",
							  "typeString": "uint256"
							}
						  },
						  "src": "262:17:4",
						  "typeDescriptions": {
							"typeIdentifier": "t_uint256",
							"typeString": "uint256"
						  }
						}
					  ],
					  "id": 702,
					  "isConstant": false,
					  "isInlineArray": false,
					  "isLValue": false,
					  "isPure": true,
					  "lValueRequested": false,
					  "nodeType": "TupleExpression",
					  "src": "261:19:4",
					  "typeDescriptions": {
						"typeIdentifier": "t_uint256",
						"typeString": "uint256"
					  }
					},
					"src": "252:28:4",
					"typeDescriptions": {
					  "typeIdentifier": "t_uint256",
					  "typeString": "uint256"
					}
				  },
				  "visibility": "public"
				},
				{
				  "body": {
					"id": 718,
					"nodeType": "Block",
					"src": "349:50:4",
					"statements": [
					  {
						"expression": {
						  "argumentTypes": null,
						  "arguments": [
							{
							  "argumentTypes": null,
							  "expression": {
								"argumentTypes": null,
								"id": 713,
								"name": "msg",
								"nodeType": "Identifier",
								"overloadedDeclarations": [],
								"referencedDeclaration": 1422,
								"src": "365:3:4",
								"typeDescriptions": {
								  "typeIdentifier": "t_magic_message",
								  "typeString": "msg"
								}
							  },
							  "id": 714,
							  "isConstant": false,
							  "isLValue": false,
							  "isPure": false,
							  "lValueRequested": false,
							  "memberName": "sender",
							  "nodeType": "MemberAccess",
							  "referencedDeclaration": null,
							  "src": "365:10:4",
							  "typeDescriptions": {
								"typeIdentifier": "t_address_payable",
								"typeString": "address payable"
							  }
							},
							{
							  "argumentTypes": null,
							  "id": 715,
							  "name": "INITIAL_SUPPLY",
							  "nodeType": "Identifier",
							  "overloadedDeclarations": [],
							  "referencedDeclaration": 704,
							  "src": "377:14:4",
							  "typeDescriptions": {
								"typeIdentifier": "t_uint256",
								"typeString": "uint256"
							  }
							}
						  ],
						  "expression": {
							"argumentTypes": [
							  {
								"typeIdentifier": "t_address_payable",
								"typeString": "address payable"
							  },
							  {
								"typeIdentifier": "t_uint256",
								"typeString": "uint256"
							  }
							],
							"id": 712,
							"name": "_mint",
							"nodeType": "Identifier",
							"overloadedDeclarations": [],
							"referencedDeclaration": 1195,
							"src": "359:5:4",
							"typeDescriptions": {
							  "typeIdentifier": "t_function_internal_nonpayable$_t_address_$_t_uint256_$returns$__$",
							  "typeString": "function (address,uint256)"
							}
						  },
						  "id": 716,
						  "isConstant": false,
						  "isLValue": false,
						  "isPure": false,
						  "kind": "functionCall",
						  "lValueRequested": false,
						  "names": [],
						  "nodeType": "FunctionCall",
						  "src": "359:33:4",
						  "typeDescriptions": {
							"typeIdentifier": "t_tuple$__$",
							"typeString": "tuple()"
						  }
						},
						"id": 717,
						"nodeType": "ExpressionStatement",
						"src": "359:33:4"
					  }
					]
				  },
				  "documentation": null,
				  "id": 719,
				  "implemented": true,
				  "kind": "constructor",
				  "modifiers": [
					{
					  "arguments": [
						{
						  "argumentTypes": null,
						  "hexValue": "4c696d6550617920546f6b656e",
						  "id": 707,
						  "isConstant": false,
						  "isLValue": false,
						  "isPure": true,
						  "kind": "string",
						  "lValueRequested": false,
						  "nodeType": "Literal",
						  "src": "322:15:4",
						  "subdenomination": null,
						  "typeDescriptions": {
							"typeIdentifier": "t_stringliteral_ec5bc24cffd2b876fca07d43cc5d605efbdb5b7b644287b510e4cb65b8b673dc",
							"typeString": "literal_string \"LimePay Token\""
						  },
						  "value": "LimePay Token"
						},
						{
						  "argumentTypes": null,
						  "hexValue": "4c50",
						  "id": 708,
						  "isConstant": false,
						  "isLValue": false,
						  "isPure": true,
						  "kind": "string",
						  "lValueRequested": false,
						  "nodeType": "Literal",
						  "src": "339:4:4",
						  "subdenomination": null,
						  "typeDescriptions": {
							"typeIdentifier": "t_stringliteral_9c21acbd49d77f161dc74d87db3b4adb975d116ec37505d4dd76e89d2844ede3",
							"typeString": "literal_string \"LP\""
						  },
						  "value": "LP"
						},
						{
						  "argumentTypes": null,
						  "hexValue": "3138",
						  "id": 709,
						  "isConstant": false,
						  "isLValue": false,
						  "isPure": true,
						  "kind": "number",
						  "lValueRequested": false,
						  "nodeType": "Literal",
						  "src": "345:2:4",
						  "subdenomination": null,
						  "typeDescriptions": {
							"typeIdentifier": "t_rational_18_by_1",
							"typeString": "int_const 18"
						  },
						  "value": "18"
						}
					  ],
					  "id": 710,
					  "modifierName": {
						"argumentTypes": null,
						"id": 706,
						"name": "ERC20Detailed",
						"nodeType": "Identifier",
						"overloadedDeclarations": [],
						"referencedDeclaration": 1338,
						"src": "308:13:4",
						"typeDescriptions": {
						  "typeIdentifier": "t_type$_t_contract$_ERC20Detailed_$1338_$",
						  "typeString": "type(contract ERC20Detailed)"
						}
					  },
					  "nodeType": "ModifierInvocation",
					  "src": "308:40:4"
					}
				  ],
				  "name": "",
				  "nodeType": "FunctionDefinition",
				  "parameters": {
					"id": 705,
					"nodeType": "ParameterList",
					"parameters": [],
					"src": "298:2:4"
				  },
				  "returnParameters": {
					"id": 711,
					"nodeType": "ParameterList",
					"parameters": [],
					"src": "349:0:4"
				  },
				  "scope": 720,
				  "src": "287:112:4",
				  "stateMutability": "nonpayable",
				  "superFunction": null,
				  "visibility": "public"
				}
			  ],
			  "scope": 721,
			  "src": "161:240:4"
			}
		  ],
		  "src": "0:401:4"
		},
		"compiler": {
		  "name": "solc",
		  "version": "0.5.1+commit.c8a2cb62.Emscripten.clang",
		  "optimizer": false,
		  "runs": 200
		},
		"networks": {},
		"schemaVersion": "1.1.2",
		"updatedAt": "2019-05-14T07:19:49.384Z"

}
module.exports = compiledTestToken;