const compiledEscrowContract = {
		"contractName": "Escrow_V2",
		"abi": [
		  {
			"constant": true,
			"inputs": [],
			"name": "tokenContract",
			"outputs": [
			  {
				"name": "",
				"type": "address"
			  }
			],
			"payable": false,
			"stateMutability": "view",
			"type": "function"
		  },
		  {
			"constant": true,
			"inputs": [
			  {
				"name": "",
				"type": "uint256"
			  }
			],
			"name": "usedNonces",
			"outputs": [
			  {
				"name": "",
				"type": "bool"
			  }
			],
			"payable": false,
			"stateMutability": "view",
			"type": "function"
		  },
		  {
			"constant": true,
			"inputs": [],
			"name": "RELAYED_PAYMENT_FUND_FUNCTION_CALL_GAS_USED",
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
			"inputs": [
			  {
				"name": "",
				"type": "address"
			  }
			],
			"name": "signers",
			"outputs": [
			  {
				"name": "",
				"type": "bool"
			  }
			],
			"payable": false,
			"stateMutability": "view",
			"type": "function"
		  },
		  {
			"constant": true,
			"inputs": [],
			"name": "FIAT_PAYMENT_FUND_FUNCTION_CALL_GAS_USED",
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
			"name": "REFUNDING_LOGIC_GAS_COST",
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
			"name": "dAppAdmin",
			"outputs": [
			  {
				"name": "",
				"type": "address"
			  }
			],
			"payable": false,
			"stateMutability": "view",
			"type": "function"
		  },
		  {
			"inputs": [
			  {
				"name": "tokenAddress",
				"type": "address"
			  },
			  {
				"name": "_dAppAdmin",
				"type": "address"
			  }
			],
			"payable": false,
			"stateMutability": "nonpayable",
			"type": "constructor"
		  },
		  {
			"constant": false,
			"inputs": [
			  {
				"name": "nonce",
				"type": "uint256"
			  },
			  {
				"name": "addressToFund",
				"type": "address"
			  },
			  {
				"name": "weiAmount",
				"type": "uint256"
			  },
			  {
				"name": "authorizationSignature",
				"type": "bytes"
			  }
			],
			"name": "fundForRelayedPayment",
			"outputs": [],
			"payable": false,
			"stateMutability": "nonpayable",
			"type": "function"
		  },
		  {
			"constant": false,
			"inputs": [
			  {
				"name": "nonce",
				"type": "uint256"
			  },
			  {
				"name": "addressToFund",
				"type": "address"
			  },
			  {
				"name": "tokenAmount",
				"type": "uint256"
			  },
			  {
				"name": "weiAmount",
				"type": "uint256"
			  },
			  {
				"name": "authorizationSignature",
				"type": "bytes"
			  }
			],
			"name": "fundForFiatPayment",
			"outputs": [],
			"payable": false,
			"stateMutability": "nonpayable",
			"type": "function"
		  },
		  {
			"constant": true,
			"inputs": [
			  {
				"name": "raw",
				"type": "bytes32"
			  },
			  {
				"name": "sig",
				"type": "bytes"
			  }
			],
			"name": "getSigner",
			"outputs": [
			  {
				"name": "signer",
				"type": "address"
			  }
			],
			"payable": false,
			"stateMutability": "pure",
			"type": "function"
		  }
		],
		"bytecode": "0x608060405234801561001057600080fd5b50604051604080610c7f8339810180604052604081101561003057600080fd5b81019080805190602001909291908051906020019092919050505080600360006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550816000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505050610ba2806100dd6000396000f3fe60806040526004361061009e576000357c0100000000000000000000000000000000000000000000000000000000900480632a7ec130146100a35780634940f8b6146101a957806355a373d6146102a55780636717e41c146102fc578063674478861461034f578063736c0d5b1461037a5780637d09e992146103e3578063cbdee5511461040e578063f69741a314610439578063f7b2ec0d14610490575b600080fd5b3480156100af57600080fd5b506101a7600480360360a08110156100c657600080fd5b8101908080359060200190929190803573ffffffffffffffffffffffffffffffffffffffff16906020019092919080359060200190929190803590602001909291908035906020019064010000000081111561012157600080fd5b82018360208201111561013357600080fd5b8035906020019184600183028401116401000000008311171561015557600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f8201169050808301925050505050505091929192905050506105a2565b005b3480156101b557600080fd5b506102a3600480360360808110156101cc57600080fd5b8101908080359060200190929190803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803590602001909291908035906020019064010000000081111561021d57600080fd5b82018360208201111561022f57600080fd5b8035906020019184600183028401116401000000008311171561025157600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f8201169050808301925050505050505091929192905050506107ab565b005b3480156102b157600080fd5b506102ba6108b3565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34801561030857600080fd5b506103356004803603602081101561031f57600080fd5b81019080803590602001909291905050506108d8565b604051808215151515815260200191505060405180910390f35b34801561035b57600080fd5b506103646108f8565b6040518082815260200191505060405180910390f35b34801561038657600080fd5b506103c96004803603602081101561039d57600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff1690602001909291905050506108fe565b604051808215151515815260200191505060405180910390f35b3480156103ef57600080fd5b506103f861091e565b6040518082815260200191505060405180910390f35b34801561041a57600080fd5b50610423610924565b6040518082815260200191505060405180910390f35b34801561044557600080fd5b5061044e61092a565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34801561049c57600080fd5b50610560600480360360408110156104b357600080fd5b8101908080359060200190929190803590602001906401000000008111156104da57600080fd5b8201836020820111156104ec57600080fd5b8035906020019184600183028401116401000000008311171561050e57600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f820116905080830192505050505050509192919290505050610950565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b846002600082815260200190815260200160002060009054906101000a900460ff16151515610639576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260128152602001807f4e6f6e636520616c72656164792075736564000000000000000000000000000081525060200191505060405180910390fd5b6000610650617de75a610a6d90919063ffffffff16565b90506000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663a9059cbb87876040518363ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200182815260200192505050602060405180830381600087803b15801561071657600080fd5b505af115801561072a573d6000803e3d6000fd5b505050506040513d602081101561074057600080fd5b8101908080519060200190929190505050508573ffffffffffffffffffffffffffffffffffffffff166108fc859081150290604051600060405180830381858888f19350505050158015610798573d6000803e3d6000fd5b506107a281610a8e565b50505050505050565b836002600082815260200190815260200160002060009054906101000a900460ff16151515610842576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260128152602001807f4e6f6e636520616c72656164792075736564000000000000000000000000000081525060200191505060405180910390fd5b6000610859617b4c5a610a6d90919063ffffffff16565b90508473ffffffffffffffffffffffffffffffffffffffff166108fc859081150290604051600060405180830381858888f193505050501580156108a1573d6000803e3d6000fd5b506108ab81610a8e565b505050505050565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60026020528060005260406000206000915054906101000a900460ff1681565b617b4c81565b60016020528060005260406000206000915054906101000a900460ff1681565b617de781565b611edd81565b600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b600073__ECTools_______________________________63380388f184846040518363ffffffff167c01000000000000000000000000000000000000000000000000000000000281526004018083815260200180602001828103825283818151815260200191508051906020019080838360005b838110156109df5780820151818401526020810190506109c4565b50505050905090810190601f168015610a0c5780820380516001836020036101000a031916815260200191505b50935050505060206040518083038186803b158015610a2a57600080fd5b505af4158015610a3e573d6000803e3d6000fd5b505050506040513d6020811015610a5457600080fd5b8101908080519060200190929190505050905092915050565b6000808284019050838110151515610a8457600080fd5b8091505092915050565b6000610ac93a610abb611edd610aad5a87610b1690919063ffffffff16565b610a6d90919063ffffffff16565b610b3890919063ffffffff16565b90503373ffffffffffffffffffffffffffffffffffffffff166108fc829081150290604051600060405180830381858888f19350505050158015610b11573d6000803e3d6000fd5b505050565b6000828211151515610b2757600080fd5b600082840390508091505092915050565b600080831415610b4b5760009050610b70565b60008284029050828482811515610b5e57fe5b04141515610b6b57600080fd5b809150505b9291505056fea165627a7a72305820d44bce43d302dfcde6f0c4ef2182bc68227ada802c4a4655421bef6f3a9630bf0029",
		"deployedBytecode": "0x60806040526004361061009e576000357c0100000000000000000000000000000000000000000000000000000000900480632a7ec130146100a35780634940f8b6146101a957806355a373d6146102a55780636717e41c146102fc578063674478861461034f578063736c0d5b1461037a5780637d09e992146103e3578063cbdee5511461040e578063f69741a314610439578063f7b2ec0d14610490575b600080fd5b3480156100af57600080fd5b506101a7600480360360a08110156100c657600080fd5b8101908080359060200190929190803573ffffffffffffffffffffffffffffffffffffffff16906020019092919080359060200190929190803590602001909291908035906020019064010000000081111561012157600080fd5b82018360208201111561013357600080fd5b8035906020019184600183028401116401000000008311171561015557600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f8201169050808301925050505050505091929192905050506105a2565b005b3480156101b557600080fd5b506102a3600480360360808110156101cc57600080fd5b8101908080359060200190929190803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803590602001909291908035906020019064010000000081111561021d57600080fd5b82018360208201111561022f57600080fd5b8035906020019184600183028401116401000000008311171561025157600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f8201169050808301925050505050505091929192905050506107ab565b005b3480156102b157600080fd5b506102ba6108b3565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34801561030857600080fd5b506103356004803603602081101561031f57600080fd5b81019080803590602001909291905050506108d8565b604051808215151515815260200191505060405180910390f35b34801561035b57600080fd5b506103646108f8565b6040518082815260200191505060405180910390f35b34801561038657600080fd5b506103c96004803603602081101561039d57600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff1690602001909291905050506108fe565b604051808215151515815260200191505060405180910390f35b3480156103ef57600080fd5b506103f861091e565b6040518082815260200191505060405180910390f35b34801561041a57600080fd5b50610423610924565b6040518082815260200191505060405180910390f35b34801561044557600080fd5b5061044e61092a565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34801561049c57600080fd5b50610560600480360360408110156104b357600080fd5b8101908080359060200190929190803590602001906401000000008111156104da57600080fd5b8201836020820111156104ec57600080fd5b8035906020019184600183028401116401000000008311171561050e57600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f820116905080830192505050505050509192919290505050610950565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b846002600082815260200190815260200160002060009054906101000a900460ff16151515610639576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260128152602001807f4e6f6e636520616c72656164792075736564000000000000000000000000000081525060200191505060405180910390fd5b6000610650617de75a610a6d90919063ffffffff16565b90506000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663a9059cbb87876040518363ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200182815260200192505050602060405180830381600087803b15801561071657600080fd5b505af115801561072a573d6000803e3d6000fd5b505050506040513d602081101561074057600080fd5b8101908080519060200190929190505050508573ffffffffffffffffffffffffffffffffffffffff166108fc859081150290604051600060405180830381858888f19350505050158015610798573d6000803e3d6000fd5b506107a281610a8e565b50505050505050565b836002600082815260200190815260200160002060009054906101000a900460ff16151515610842576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260128152602001807f4e6f6e636520616c72656164792075736564000000000000000000000000000081525060200191505060405180910390fd5b6000610859617b4c5a610a6d90919063ffffffff16565b90508473ffffffffffffffffffffffffffffffffffffffff166108fc859081150290604051600060405180830381858888f193505050501580156108a1573d6000803e3d6000fd5b506108ab81610a8e565b505050505050565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60026020528060005260406000206000915054906101000a900460ff1681565b617b4c81565b60016020528060005260406000206000915054906101000a900460ff1681565b617de781565b611edd81565b600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b600073__ECTools_______________________________63380388f184846040518363ffffffff167c01000000000000000000000000000000000000000000000000000000000281526004018083815260200180602001828103825283818151815260200191508051906020019080838360005b838110156109df5780820151818401526020810190506109c4565b50505050905090810190601f168015610a0c5780820380516001836020036101000a031916815260200191505b50935050505060206040518083038186803b158015610a2a57600080fd5b505af4158015610a3e573d6000803e3d6000fd5b505050506040513d6020811015610a5457600080fd5b8101908080519060200190929190505050905092915050565b6000808284019050838110151515610a8457600080fd5b8091505092915050565b6000610ac93a610abb611edd610aad5a87610b1690919063ffffffff16565b610a6d90919063ffffffff16565b610b3890919063ffffffff16565b90503373ffffffffffffffffffffffffffffffffffffffff166108fc829081150290604051600060405180830381858888f19350505050158015610b11573d6000803e3d6000fd5b505050565b6000828211151515610b2757600080fd5b600082840390508091505092915050565b600080831415610b4b5760009050610b70565b60008284029050828482811515610b5e57fe5b04141515610b6b57600080fd5b809150505b9291505056fea165627a7a72305820d44bce43d302dfcde6f0c4ef2182bc68227ada802c4a4655421bef6f3a9630bf0029",
		"sourceMap": "252:2115:1:-;;;1057:157;8:9:-1;5:2;;;30:1;27;20:12;5:2;1057:157:1;;;;;;;;;;;;;13:2:-1;8:3;5:11;2:2;;;29:1;26;19:12;2:2;1057:157:1;;;;;;;;;;;;;;;;;;;;;;;;;1148:10;1136:9;;:22;;;;;;;;;;;;;;;;;;1193:12;1171:13;;:35;;;;;;;;;;;;;;;;;;1057:157;;252:2115;;;;;;",
		"deployedSourceMap": "252:2115:1:-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;1583:421;;8:9:-1;5:2;;;30:1;27;20:12;5:2;1583:421:1;;;;;;13:3:-1;8;5:12;2:2;;;30:1;27;20:12;2:2;1583:421:1;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;21:11:-1;8;5:28;2:2;;;46:1;43;36:12;2:2;1583:421:1;;35:9:-1;28:4;12:14;8:25;5:40;2:2;;;58:1;55;48:12;2:2;1583:421:1;;;;;;100:9:-1;95:1;81:12;77:20;67:8;63:35;60:50;39:11;25:12;22:29;11:107;8:2;;;131:1;128;121:12;8:2;1583:421:1;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;30:3:-1;22:6;14;1:33;99:1;93:3;85:6;81:16;74:27;137:4;133:9;126:4;121:3;117:14;113:30;106:37;;169:3;161:6;157:16;147:26;;1583:421:1;;;;;;;;;;;;;;;:::i;:::-;;1223:354;;8:9:-1;5:2;;;30:1;27;20:12;5:2;1223:354:1;;;;;;13:3:-1;8;5:12;2:2;;;30:1;27;20:12;2:2;1223:354:1;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;21:11:-1;8;5:28;2:2;;;46:1;43;36:12;2:2;1223:354:1;;35:9:-1;28:4;12:14;8:25;5:40;2:2;;;58:1;55;48:12;2:2;1223:354:1;;;;;;100:9:-1;95:1;81:12;77:20;67:8;63:35;60:50;39:11;25:12;22:29;11:107;8:2;;;131:1;128;121:12;8:2;1223:354:1;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;30:3:-1;22:6;14;1:33;99:1;93:3;85:6;81:16;74:27;137:4;133:9;126:4;121:3;117:14;113:30;106:37;;169:3;161:6;157:16;147:26;;1223:354:1;;;;;;;;;;;;;;;:::i;:::-;;310:26;;8:9:-1;5:2;;;30:1;27;20:12;5:2;310:26:1;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;389:43;;8:9:-1;5:2;;;30:1;27;20:12;5:2;389:43:1;;;;;;13:2:-1;8:3;5:11;2:2;;;29:1;26;19:12;2:2;389:43:1;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;691:75;;8:9:-1;5:2;;;30:1;27;20:12;5:2;691:75:1;;;:::i;:::-;;;;;;;;;;;;;;;;;;;343:40;;8:9:-1;5:2;;;30:1;27;20:12;5:2;343:40:1;;;;;;13:2:-1;8:3;5:11;2:2;;;29:1;26;19:12;2:2;343:40:1;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;570:72;;8:9:-1;5:2;;;30:1;27;20:12;5:2;570:72:1;;;:::i;:::-;;;;;;;;;;;;;;;;;;;477:55;;8:9:-1;5:2;;;30:1;27;20:12;5:2;477:55:1;;;:::i;:::-;;;;;;;;;;;;;;;;;;;439:32;;8:9:-1;5:2;;;30:1;27;20:12;5:2;439:32:1;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;2010:143;;8:9:-1;5:2;;;30:1;27;20:12;5:2;2010:143:1;;;;;;13:2:-1;8:3;5:11;2:2;;;29:1;26;19:12;2:2;2010:143:1;;;;;;;;;;;;;;;;;;;21:11:-1;8;5:28;2:2;;;46:1;43;36:12;2:2;2010:143:1;;35:9:-1;28:4;12:14;8:25;5:40;2:2;;;58:1;55;48:12;2:2;2010:143:1;;;;;;100:9:-1;95:1;81:12;77:20;67:8;63:35;60:50;39:11;25:12;22:29;11:107;8:2;;;131:1;128;121:12;8:2;2010:143:1;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;30:3:-1;22:6;14;1:33;99:1;93:3;85:6;81:16;74:27;137:4;133:9;126:4;121:3;117:14;113:30;106:37;;169:3;161:6;157:16;147:26;;2010:143:1;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;1583:421;1761:5;993:10;:17;1004:5;993:17;;;;;;;;;;;;;;;;;;;;;992:18;984:49;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;1782:16;1801:55;637:5;1801:9;:13;;:55;;;;:::i;:::-;1782:74;;1867:13;;;;;;;;;;;:22;;;1890:13;1905:11;1867:50;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;8:9:-1;5:2;;;30:1;27;20:12;5:2;1867:50:1;;;;8:9:-1;5:2;;;45:16;42:1;39;24:38;77:16;74:1;67:27;5:2;1867:50:1;;;;;;;13:2:-1;8:3;5:11;2:2;;;29:1;26;19:12;2:2;1867:50:1;;;;;;;;;;;;;;;;;1927:13;:22;;:33;1950:9;1927:33;;;;;;;;;;;;;;;;;;;;;;;;8:9:-1;5:2;;;45:16;42:1;39;24:38;77:16;74:1;67:27;5:2;1927:33:1;1971:26;1988:8;1971:16;:26::i;:::-;1043:1;1583:421;;;;;;:::o;1223:354::-;1383:5;993:10;:17;1004:5;993:17;;;;;;;;;;;;;;;;;;;;;992:18;984:49;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;1404:16;1423:58;761:5;1423:9;:13;;:58;;;;:::i;:::-;1404:77;;1500:13;:22;;:33;1523:9;1500:33;;;;;;;;;;;;;;;;;;;;;;;;8:9:-1;5:2;;;45:16;42:1;39;24:38;77:16;74:1;67:27;5:2;1500:33:1;1544:26;1561:8;1544:16;:26::i;:::-;1043:1;1223:354;;;;;:::o;310:26::-;;;;;;;;;;;;;:::o;389:43::-;;;;;;;;;;;;;;;;;;;;;;:::o;691:75::-;761:5;691:75;:::o;343:40::-;;;;;;;;;;;;;;;;;;;;;;:::o;570:72::-;637:5;570:72;:::o;477:55::-;528:4;477:55;:::o;439:32::-;;;;;;;;;;;;;:::o;2010:143::-;2080:14;2113:7;:23;2137:3;2142;2113:33;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;23:1:-1;8:100;33:3;30:1;27:10;8:100;;;99:1;94:3;90:11;84:18;80:1;75:3;71:11;64:39;52:2;49:1;45:10;40:15;;8:100;;;12:14;2113:33:1;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;8:9:-1;5:2;;;30:1;27;20:12;5:2;2113:33:1;;;;8:9:-1;5:2;;;45:16;42:1;39;24:38;77:16;74:1;67:27;5:2;2113:33:1;;;;;;;13:2:-1;8:3;5:11;2:2;;;29:1;26;19:12;2:2;2113:33:1;;;;;;;;;;;;;;;;2106:40;;2010:143;;;;:::o;1431:145:5:-;1489:7;1508:9;1524:1;1520;:5;1508:17;;1548:1;1543;:6;;1535:15;;;;;;;;1568:1;1561:8;;;1431:145;;;;:::o;2159:206:1:-;2222:20;2245:70;2303:11;2245:53;528:4;2245:23;2258:9;2245:8;:12;;:23;;;;:::i;:::-;:27;;:53;;;;:::i;:::-;:57;;:70;;;;:::i;:::-;2222:93;;2325:10;:19;;:33;2345:12;2325:33;;;;;;;;;;;;;;;;;;;;;;;;8:9:-1;5:2;;;45:16;42:1;39;24:38;77:16;74:1;67:27;5:2;2325:33:1;2159:206;;:::o;1205:145:5:-;1263:7;1295:1;1290;:6;;1282:15;;;;;;;;1307:9;1323:1;1319;:5;1307:17;;1342:1;1335:8;;;1205:145;;;;:::o;229:421::-;287:7;532:1;527;:6;523:45;;;556:1;549:8;;;;523:45;578:9;594:1;590;:5;578:17;;622:1;617;613;:5;;;;;;;;:10;605:19;;;;;;;;642:1;635:8;;;229:421;;;;;:::o",
		"source": "pragma solidity 0.5.1;\n\nimport \"./ECTools.sol\";\nimport \"openzeppelin-solidity/contracts/math/SafeMath.sol\";\nimport \"openzeppelin-solidity/contracts/token/ERC20/ERC20.sol\";\n\n/**\n * Escrow_V2 is deprecated and currently it is not used in production \n */\ncontract Escrow_V2 {\n    using SafeMath for uint256;\n\n    ERC20 public tokenContract;\n\n    mapping (address => bool) public signers;\n    mapping (uint256 => bool) public usedNonces;\n\n    address payable public dAppAdmin;\n    uint256 constant public REFUNDING_LOGIC_GAS_COST = 7901; // gas used for single refund \n\n    uint256 constant public FIAT_PAYMENT_FUND_FUNCTION_CALL_GAS_USED = 32231; // gas used for calling fundForFiatPayment\n    uint256 constant public RELAYED_PAYMENT_FUND_FUNCTION_CALL_GAS_USED = 31564; // gas used for calling fundForRelayedPayment\n\n    modifier onlyDAppAdmin() {\n        require(msg.sender == dAppAdmin, \"Unauthorized access\"); \n        _;\n    }\n\n    modifier preValidateFund(uint256 nonce) {\n        require(!usedNonces[nonce], \"Nonce already used\");\n        _;\n    }\n\n    constructor(address tokenAddress, address payable _dAppAdmin) public {\n        dAppAdmin = _dAppAdmin;   \n        tokenContract = ERC20(tokenAddress); \n    }\n   \n    function fundForRelayedPayment(uint256 nonce, address payable addressToFund, uint256 weiAmount, bytes memory authorizationSignature) public\n    preValidateFund(nonce)\n    {\n        uint256 gasLimit = gasleft().add(RELAYED_PAYMENT_FUND_FUNCTION_CALL_GAS_USED);\n        \n        addressToFund.transfer(weiAmount);\n\n        _refundMsgSender(gasLimit);\n    }\n\n    function fundForFiatPayment(uint256 nonce, address payable addressToFund, uint256 tokenAmount, uint256 weiAmount, bytes memory authorizationSignature) public\n    preValidateFund(nonce)\n    {\n        uint256 gasLimit = gasleft().add(FIAT_PAYMENT_FUND_FUNCTION_CALL_GAS_USED);\n\n        tokenContract.transfer(addressToFund, tokenAmount);\n        addressToFund.transfer(weiAmount);\n\n        _refundMsgSender(gasLimit);\n    }\n\n    function getSigner(bytes32 raw, bytes memory sig) public pure returns(address signer) {\n        return ECTools.prefixedRecover(raw, sig);\n    }\n\n    function _refundMsgSender(uint256 gasLimit) internal {\n        uint256 refundAmount = gasLimit.sub(gasleft()).add(REFUNDING_LOGIC_GAS_COST).mul(tx.gasprice);\n        msg.sender.transfer(refundAmount);\n    }\n}",
		"sourcePath": "/Users/ognyanchikov/limepay-contracts/smart-contracts/contracts/Escrow_V2.sol",
		"ast": {
		  "absolutePath": "/Users/ognyanchikov/limepay-contracts/smart-contracts/contracts/Escrow_V2.sol",
		  "exportedSymbols": {
			"Escrow_V2": [
			  299
			]
		  },
		  "id": 300,
		  "nodeType": "SourceUnit",
		  "nodes": [
			{
			  "id": 107,
			  "literals": [
				"solidity",
				"0.5",
				".1"
			  ],
			  "nodeType": "PragmaDirective",
			  "src": "0:22:1"
			},
			{
			  "absolutePath": "/Users/ognyanchikov/limepay-contracts/smart-contracts/contracts/ECTools.sol",
			  "file": "./ECTools.sol",
			  "id": 108,
			  "nodeType": "ImportDirective",
			  "scope": 300,
			  "sourceUnit": 106,
			  "src": "24:23:1",
			  "symbolAliases": [],
			  "unitAlias": ""
			},
			{
			  "absolutePath": "openzeppelin-solidity/contracts/math/SafeMath.sol",
			  "file": "openzeppelin-solidity/contracts/math/SafeMath.sol",
			  "id": 109,
			  "nodeType": "ImportDirective",
			  "scope": 300,
			  "sourceUnit": 849,
			  "src": "48:59:1",
			  "symbolAliases": [],
			  "unitAlias": ""
			},
			{
			  "absolutePath": "openzeppelin-solidity/contracts/token/ERC20/ERC20.sol",
			  "file": "openzeppelin-solidity/contracts/token/ERC20/ERC20.sol",
			  "id": 110,
			  "nodeType": "ImportDirective",
			  "scope": 300,
			  "sourceUnit": 1281,
			  "src": "108:63:1",
			  "symbolAliases": [],
			  "unitAlias": ""
			},
			{
			  "baseContracts": [],
			  "contractDependencies": [],
			  "contractKind": "contract",
			  "documentation": "Escrow_V2 is deprecated and currently it is not used in production ",
			  "fullyImplemented": true,
			  "id": 299,
			  "linearizedBaseContracts": [
				299
			  ],
			  "name": "Escrow_V2",
			  "nodeType": "ContractDefinition",
			  "nodes": [
				{
				  "id": 113,
				  "libraryName": {
					"contractScope": null,
					"id": 111,
					"name": "SafeMath",
					"nodeType": "UserDefinedTypeName",
					"referencedDeclaration": 848,
					"src": "283:8:1",
					"typeDescriptions": {
					  "typeIdentifier": "t_contract$_SafeMath_$848",
					  "typeString": "library SafeMath"
					}
				  },
				  "nodeType": "UsingForDirective",
				  "src": "277:27:1",
				  "typeName": {
					"id": 112,
					"name": "uint256",
					"nodeType": "ElementaryTypeName",
					"src": "296:7:1",
					"typeDescriptions": {
					  "typeIdentifier": "t_uint256",
					  "typeString": "uint256"
					}
				  }
				},
				{
				  "constant": false,
				  "id": 115,
				  "name": "tokenContract",
				  "nodeType": "VariableDeclaration",
				  "scope": 299,
				  "src": "310:26:1",
				  "stateVariable": true,
				  "storageLocation": "default",
				  "typeDescriptions": {
					"typeIdentifier": "t_contract$_ERC20_$1280",
					"typeString": "contract ERC20"
				  },
				  "typeName": {
					"contractScope": null,
					"id": 114,
					"name": "ERC20",
					"nodeType": "UserDefinedTypeName",
					"referencedDeclaration": 1280,
					"src": "310:5:1",
					"typeDescriptions": {
					  "typeIdentifier": "t_contract$_ERC20_$1280",
					  "typeString": "contract ERC20"
					}
				  },
				  "value": null,
				  "visibility": "public"
				},
				{
				  "constant": false,
				  "id": 119,
				  "name": "signers",
				  "nodeType": "VariableDeclaration",
				  "scope": 299,
				  "src": "343:40:1",
				  "stateVariable": true,
				  "storageLocation": "default",
				  "typeDescriptions": {
					"typeIdentifier": "t_mapping$_t_address_$_t_bool_$",
					"typeString": "mapping(address => bool)"
				  },
				  "typeName": {
					"id": 118,
					"keyType": {
					  "id": 116,
					  "name": "address",
					  "nodeType": "ElementaryTypeName",
					  "src": "352:7:1",
					  "typeDescriptions": {
						"typeIdentifier": "t_address",
						"typeString": "address"
					  }
					},
					"nodeType": "Mapping",
					"src": "343:25:1",
					"typeDescriptions": {
					  "typeIdentifier": "t_mapping$_t_address_$_t_bool_$",
					  "typeString": "mapping(address => bool)"
					},
					"valueType": {
					  "id": 117,
					  "name": "bool",
					  "nodeType": "ElementaryTypeName",
					  "src": "363:4:1",
					  "typeDescriptions": {
						"typeIdentifier": "t_bool",
						"typeString": "bool"
					  }
					}
				  },
				  "value": null,
				  "visibility": "public"
				},
				{
				  "constant": false,
				  "id": 123,
				  "name": "usedNonces",
				  "nodeType": "VariableDeclaration",
				  "scope": 299,
				  "src": "389:43:1",
				  "stateVariable": true,
				  "storageLocation": "default",
				  "typeDescriptions": {
					"typeIdentifier": "t_mapping$_t_uint256_$_t_bool_$",
					"typeString": "mapping(uint256 => bool)"
				  },
				  "typeName": {
					"id": 122,
					"keyType": {
					  "id": 120,
					  "name": "uint256",
					  "nodeType": "ElementaryTypeName",
					  "src": "398:7:1",
					  "typeDescriptions": {
						"typeIdentifier": "t_uint256",
						"typeString": "uint256"
					  }
					},
					"nodeType": "Mapping",
					"src": "389:25:1",
					"typeDescriptions": {
					  "typeIdentifier": "t_mapping$_t_uint256_$_t_bool_$",
					  "typeString": "mapping(uint256 => bool)"
					},
					"valueType": {
					  "id": 121,
					  "name": "bool",
					  "nodeType": "ElementaryTypeName",
					  "src": "409:4:1",
					  "typeDescriptions": {
						"typeIdentifier": "t_bool",
						"typeString": "bool"
					  }
					}
				  },
				  "value": null,
				  "visibility": "public"
				},
				{
				  "constant": false,
				  "id": 125,
				  "name": "dAppAdmin",
				  "nodeType": "VariableDeclaration",
				  "scope": 299,
				  "src": "439:32:1",
				  "stateVariable": true,
				  "storageLocation": "default",
				  "typeDescriptions": {
					"typeIdentifier": "t_address_payable",
					"typeString": "address payable"
				  },
				  "typeName": {
					"id": 124,
					"name": "address",
					"nodeType": "ElementaryTypeName",
					"src": "439:15:1",
					"stateMutability": "payable",
					"typeDescriptions": {
					  "typeIdentifier": "t_address_payable",
					  "typeString": "address payable"
					}
				  },
				  "value": null,
				  "visibility": "public"
				},
				{
				  "constant": true,
				  "id": 128,
				  "name": "REFUNDING_LOGIC_GAS_COST",
				  "nodeType": "VariableDeclaration",
				  "scope": 299,
				  "src": "477:55:1",
				  "stateVariable": true,
				  "storageLocation": "default",
				  "typeDescriptions": {
					"typeIdentifier": "t_uint256",
					"typeString": "uint256"
				  },
				  "typeName": {
					"id": 126,
					"name": "uint256",
					"nodeType": "ElementaryTypeName",
					"src": "477:7:1",
					"typeDescriptions": {
					  "typeIdentifier": "t_uint256",
					  "typeString": "uint256"
					}
				  },
				  "value": {
					"argumentTypes": null,
					"hexValue": "37393031",
					"id": 127,
					"isConstant": false,
					"isLValue": false,
					"isPure": true,
					"kind": "number",
					"lValueRequested": false,
					"nodeType": "Literal",
					"src": "528:4:1",
					"subdenomination": null,
					"typeDescriptions": {
					  "typeIdentifier": "t_rational_7901_by_1",
					  "typeString": "int_const 7901"
					},
					"value": "7901"
				  },
				  "visibility": "public"
				},
				{
				  "constant": true,
				  "id": 131,
				  "name": "FIAT_PAYMENT_FUND_FUNCTION_CALL_GAS_USED",
				  "nodeType": "VariableDeclaration",
				  "scope": 299,
				  "src": "570:72:1",
				  "stateVariable": true,
				  "storageLocation": "default",
				  "typeDescriptions": {
					"typeIdentifier": "t_uint256",
					"typeString": "uint256"
				  },
				  "typeName": {
					"id": 129,
					"name": "uint256",
					"nodeType": "ElementaryTypeName",
					"src": "570:7:1",
					"typeDescriptions": {
					  "typeIdentifier": "t_uint256",
					  "typeString": "uint256"
					}
				  },
				  "value": {
					"argumentTypes": null,
					"hexValue": "3332323331",
					"id": 130,
					"isConstant": false,
					"isLValue": false,
					"isPure": true,
					"kind": "number",
					"lValueRequested": false,
					"nodeType": "Literal",
					"src": "637:5:1",
					"subdenomination": null,
					"typeDescriptions": {
					  "typeIdentifier": "t_rational_32231_by_1",
					  "typeString": "int_const 32231"
					},
					"value": "32231"
				  },
				  "visibility": "public"
				},
				{
				  "constant": true,
				  "id": 134,
				  "name": "RELAYED_PAYMENT_FUND_FUNCTION_CALL_GAS_USED",
				  "nodeType": "VariableDeclaration",
				  "scope": 299,
				  "src": "691:75:1",
				  "stateVariable": true,
				  "storageLocation": "default",
				  "typeDescriptions": {
					"typeIdentifier": "t_uint256",
					"typeString": "uint256"
				  },
				  "typeName": {
					"id": 132,
					"name": "uint256",
					"nodeType": "ElementaryTypeName",
					"src": "691:7:1",
					"typeDescriptions": {
					  "typeIdentifier": "t_uint256",
					  "typeString": "uint256"
					}
				  },
				  "value": {
					"argumentTypes": null,
					"hexValue": "3331353634",
					"id": 133,
					"isConstant": false,
					"isLValue": false,
					"isPure": true,
					"kind": "number",
					"lValueRequested": false,
					"nodeType": "Literal",
					"src": "761:5:1",
					"subdenomination": null,
					"typeDescriptions": {
					  "typeIdentifier": "t_rational_31564_by_1",
					  "typeString": "int_const 31564"
					},
					"value": "31564"
				  },
				  "visibility": "public"
				},
				{
				  "body": {
					"id": 145,
					"nodeType": "Block",
					"src": "844:84:1",
					"statements": [
					  {
						"expression": {
						  "argumentTypes": null,
						  "arguments": [
							{
							  "argumentTypes": null,
							  "commonType": {
								"typeIdentifier": "t_address_payable",
								"typeString": "address payable"
							  },
							  "id": 140,
							  "isConstant": false,
							  "isLValue": false,
							  "isPure": false,
							  "lValueRequested": false,
							  "leftExpression": {
								"argumentTypes": null,
								"expression": {
								  "argumentTypes": null,
								  "id": 137,
								  "name": "msg",
								  "nodeType": "Identifier",
								  "overloadedDeclarations": [],
								  "referencedDeclaration": 1422,
								  "src": "862:3:1",
								  "typeDescriptions": {
									"typeIdentifier": "t_magic_message",
									"typeString": "msg"
								  }
								},
								"id": 138,
								"isConstant": false,
								"isLValue": false,
								"isPure": false,
								"lValueRequested": false,
								"memberName": "sender",
								"nodeType": "MemberAccess",
								"referencedDeclaration": null,
								"src": "862:10:1",
								"typeDescriptions": {
								  "typeIdentifier": "t_address_payable",
								  "typeString": "address payable"
								}
							  },
							  "nodeType": "BinaryOperation",
							  "operator": "==",
							  "rightExpression": {
								"argumentTypes": null,
								"id": 139,
								"name": "dAppAdmin",
								"nodeType": "Identifier",
								"overloadedDeclarations": [],
								"referencedDeclaration": 125,
								"src": "876:9:1",
								"typeDescriptions": {
								  "typeIdentifier": "t_address_payable",
								  "typeString": "address payable"
								}
							  },
							  "src": "862:23:1",
							  "typeDescriptions": {
								"typeIdentifier": "t_bool",
								"typeString": "bool"
							  }
							},
							{
							  "argumentTypes": null,
							  "hexValue": "556e617574686f72697a656420616363657373",
							  "id": 141,
							  "isConstant": false,
							  "isLValue": false,
							  "isPure": true,
							  "kind": "string",
							  "lValueRequested": false,
							  "nodeType": "Literal",
							  "src": "887:21:1",
							  "subdenomination": null,
							  "typeDescriptions": {
								"typeIdentifier": "t_stringliteral_b89edf027d3d1129b9f2c8dcd2ba89ffc6487f04ca050032214e13175a19a74a",
								"typeString": "literal_string \"Unauthorized access\""
							  },
							  "value": "Unauthorized access"
							}
						  ],
						  "expression": {
							"argumentTypes": [
							  {
								"typeIdentifier": "t_bool",
								"typeString": "bool"
							  },
							  {
								"typeIdentifier": "t_stringliteral_b89edf027d3d1129b9f2c8dcd2ba89ffc6487f04ca050032214e13175a19a74a",
								"typeString": "literal_string \"Unauthorized access\""
							  }
							],
							"id": 136,
							"name": "require",
							"nodeType": "Identifier",
							"overloadedDeclarations": [
							  1425,
							  1426
							],
							"referencedDeclaration": 1426,
							"src": "854:7:1",
							"typeDescriptions": {
							  "typeIdentifier": "t_function_require_pure$_t_bool_$_t_string_memory_ptr_$returns$__$",
							  "typeString": "function (bool,string memory) pure"
							}
						  },
						  "id": 142,
						  "isConstant": false,
						  "isLValue": false,
						  "isPure": false,
						  "kind": "functionCall",
						  "lValueRequested": false,
						  "names": [],
						  "nodeType": "FunctionCall",
						  "src": "854:55:1",
						  "typeDescriptions": {
							"typeIdentifier": "t_tuple$__$",
							"typeString": "tuple()"
						  }
						},
						"id": 143,
						"nodeType": "ExpressionStatement",
						"src": "854:55:1"
					  },
					  {
						"id": 144,
						"nodeType": "PlaceholderStatement",
						"src": "920:1:1"
					  }
					]
				  },
				  "documentation": null,
				  "id": 146,
				  "name": "onlyDAppAdmin",
				  "nodeType": "ModifierDefinition",
				  "parameters": {
					"id": 135,
					"nodeType": "ParameterList",
					"parameters": [],
					"src": "841:2:1"
				  },
				  "src": "819:109:1",
				  "visibility": "internal"
				},
				{
				  "body": {
					"id": 159,
					"nodeType": "Block",
					"src": "974:77:1",
					"statements": [
					  {
						"expression": {
						  "argumentTypes": null,
						  "arguments": [
							{
							  "argumentTypes": null,
							  "id": 154,
							  "isConstant": false,
							  "isLValue": false,
							  "isPure": false,
							  "lValueRequested": false,
							  "nodeType": "UnaryOperation",
							  "operator": "!",
							  "prefix": true,
							  "src": "992:18:1",
							  "subExpression": {
								"argumentTypes": null,
								"baseExpression": {
								  "argumentTypes": null,
								  "id": 151,
								  "name": "usedNonces",
								  "nodeType": "Identifier",
								  "overloadedDeclarations": [],
								  "referencedDeclaration": 123,
								  "src": "993:10:1",
								  "typeDescriptions": {
									"typeIdentifier": "t_mapping$_t_uint256_$_t_bool_$",
									"typeString": "mapping(uint256 => bool)"
								  }
								},
								"id": 153,
								"indexExpression": {
								  "argumentTypes": null,
								  "id": 152,
								  "name": "nonce",
								  "nodeType": "Identifier",
								  "overloadedDeclarations": [],
								  "referencedDeclaration": 148,
								  "src": "1004:5:1",
								  "typeDescriptions": {
									"typeIdentifier": "t_uint256",
									"typeString": "uint256"
								  }
								},
								"isConstant": false,
								"isLValue": true,
								"isPure": false,
								"lValueRequested": false,
								"nodeType": "IndexAccess",
								"src": "993:17:1",
								"typeDescriptions": {
								  "typeIdentifier": "t_bool",
								  "typeString": "bool"
								}
							  },
							  "typeDescriptions": {
								"typeIdentifier": "t_bool",
								"typeString": "bool"
							  }
							},
							{
							  "argumentTypes": null,
							  "hexValue": "4e6f6e636520616c72656164792075736564",
							  "id": 155,
							  "isConstant": false,
							  "isLValue": false,
							  "isPure": true,
							  "kind": "string",
							  "lValueRequested": false,
							  "nodeType": "Literal",
							  "src": "1012:20:1",
							  "subdenomination": null,
							  "typeDescriptions": {
								"typeIdentifier": "t_stringliteral_923b8cbbcee77e95e0614b96c81a4cbd157e2cc78e2937caa0bed8e1c5641a28",
								"typeString": "literal_string \"Nonce already used\""
							  },
							  "value": "Nonce already used"
							}
						  ],
						  "expression": {
							"argumentTypes": [
							  {
								"typeIdentifier": "t_bool",
								"typeString": "bool"
							  },
							  {
								"typeIdentifier": "t_stringliteral_923b8cbbcee77e95e0614b96c81a4cbd157e2cc78e2937caa0bed8e1c5641a28",
								"typeString": "literal_string \"Nonce already used\""
							  }
							],
							"id": 150,
							"name": "require",
							"nodeType": "Identifier",
							"overloadedDeclarations": [
							  1425,
							  1426
							],
							"referencedDeclaration": 1426,
							"src": "984:7:1",
							"typeDescriptions": {
							  "typeIdentifier": "t_function_require_pure$_t_bool_$_t_string_memory_ptr_$returns$__$",
							  "typeString": "function (bool,string memory) pure"
							}
						  },
						  "id": 156,
						  "isConstant": false,
						  "isLValue": false,
						  "isPure": false,
						  "kind": "functionCall",
						  "lValueRequested": false,
						  "names": [],
						  "nodeType": "FunctionCall",
						  "src": "984:49:1",
						  "typeDescriptions": {
							"typeIdentifier": "t_tuple$__$",
							"typeString": "tuple()"
						  }
						},
						"id": 157,
						"nodeType": "ExpressionStatement",
						"src": "984:49:1"
					  },
					  {
						"id": 158,
						"nodeType": "PlaceholderStatement",
						"src": "1043:1:1"
					  }
					]
				  },
				  "documentation": null,
				  "id": 160,
				  "name": "preValidateFund",
				  "nodeType": "ModifierDefinition",
				  "parameters": {
					"id": 149,
					"nodeType": "ParameterList",
					"parameters": [
					  {
						"constant": false,
						"id": 148,
						"name": "nonce",
						"nodeType": "VariableDeclaration",
						"scope": 160,
						"src": "959:13:1",
						"stateVariable": false,
						"storageLocation": "default",
						"typeDescriptions": {
						  "typeIdentifier": "t_uint256",
						  "typeString": "uint256"
						},
						"typeName": {
						  "id": 147,
						  "name": "uint256",
						  "nodeType": "ElementaryTypeName",
						  "src": "959:7:1",
						  "typeDescriptions": {
							"typeIdentifier": "t_uint256",
							"typeString": "uint256"
						  }
						},
						"value": null,
						"visibility": "internal"
					  }
					],
					"src": "958:15:1"
				  },
				  "src": "934:117:1",
				  "visibility": "internal"
				},
				{
				  "body": {
					"id": 177,
					"nodeType": "Block",
					"src": "1126:88:1",
					"statements": [
					  {
						"expression": {
						  "argumentTypes": null,
						  "id": 169,
						  "isConstant": false,
						  "isLValue": false,
						  "isPure": false,
						  "lValueRequested": false,
						  "leftHandSide": {
							"argumentTypes": null,
							"id": 167,
							"name": "dAppAdmin",
							"nodeType": "Identifier",
							"overloadedDeclarations": [],
							"referencedDeclaration": 125,
							"src": "1136:9:1",
							"typeDescriptions": {
							  "typeIdentifier": "t_address_payable",
							  "typeString": "address payable"
							}
						  },
						  "nodeType": "Assignment",
						  "operator": "=",
						  "rightHandSide": {
							"argumentTypes": null,
							"id": 168,
							"name": "_dAppAdmin",
							"nodeType": "Identifier",
							"overloadedDeclarations": [],
							"referencedDeclaration": 164,
							"src": "1148:10:1",
							"typeDescriptions": {
							  "typeIdentifier": "t_address_payable",
							  "typeString": "address payable"
							}
						  },
						  "src": "1136:22:1",
						  "typeDescriptions": {
							"typeIdentifier": "t_address_payable",
							"typeString": "address payable"
						  }
						},
						"id": 170,
						"nodeType": "ExpressionStatement",
						"src": "1136:22:1"
					  },
					  {
						"expression": {
						  "argumentTypes": null,
						  "id": 175,
						  "isConstant": false,
						  "isLValue": false,
						  "isPure": false,
						  "lValueRequested": false,
						  "leftHandSide": {
							"argumentTypes": null,
							"id": 171,
							"name": "tokenContract",
							"nodeType": "Identifier",
							"overloadedDeclarations": [],
							"referencedDeclaration": 115,
							"src": "1171:13:1",
							"typeDescriptions": {
							  "typeIdentifier": "t_contract$_ERC20_$1280",
							  "typeString": "contract ERC20"
							}
						  },
						  "nodeType": "Assignment",
						  "operator": "=",
						  "rightHandSide": {
							"argumentTypes": null,
							"arguments": [
							  {
								"argumentTypes": null,
								"id": 173,
								"name": "tokenAddress",
								"nodeType": "Identifier",
								"overloadedDeclarations": [],
								"referencedDeclaration": 162,
								"src": "1193:12:1",
								"typeDescriptions": {
								  "typeIdentifier": "t_address",
								  "typeString": "address"
								}
							  }
							],
							"expression": {
							  "argumentTypes": [
								{
								  "typeIdentifier": "t_address",
								  "typeString": "address"
								}
							  ],
							  "id": 172,
							  "name": "ERC20",
							  "nodeType": "Identifier",
							  "overloadedDeclarations": [],
							  "referencedDeclaration": 1280,
							  "src": "1187:5:1",
							  "typeDescriptions": {
								"typeIdentifier": "t_type$_t_contract$_ERC20_$1280_$",
								"typeString": "type(contract ERC20)"
							  }
							},
							"id": 174,
							"isConstant": false,
							"isLValue": false,
							"isPure": false,
							"kind": "typeConversion",
							"lValueRequested": false,
							"names": [],
							"nodeType": "FunctionCall",
							"src": "1187:19:1",
							"typeDescriptions": {
							  "typeIdentifier": "t_contract$_ERC20_$1280",
							  "typeString": "contract ERC20"
							}
						  },
						  "src": "1171:35:1",
						  "typeDescriptions": {
							"typeIdentifier": "t_contract$_ERC20_$1280",
							"typeString": "contract ERC20"
						  }
						},
						"id": 176,
						"nodeType": "ExpressionStatement",
						"src": "1171:35:1"
					  }
					]
				  },
				  "documentation": null,
				  "id": 178,
				  "implemented": true,
				  "kind": "constructor",
				  "modifiers": [],
				  "name": "",
				  "nodeType": "FunctionDefinition",
				  "parameters": {
					"id": 165,
					"nodeType": "ParameterList",
					"parameters": [
					  {
						"constant": false,
						"id": 162,
						"name": "tokenAddress",
						"nodeType": "VariableDeclaration",
						"scope": 178,
						"src": "1069:20:1",
						"stateVariable": false,
						"storageLocation": "default",
						"typeDescriptions": {
						  "typeIdentifier": "t_address",
						  "typeString": "address"
						},
						"typeName": {
						  "id": 161,
						  "name": "address",
						  "nodeType": "ElementaryTypeName",
						  "src": "1069:7:1",
						  "stateMutability": "nonpayable",
						  "typeDescriptions": {
							"typeIdentifier": "t_address",
							"typeString": "address"
						  }
						},
						"value": null,
						"visibility": "internal"
					  },
					  {
						"constant": false,
						"id": 164,
						"name": "_dAppAdmin",
						"nodeType": "VariableDeclaration",
						"scope": 178,
						"src": "1091:26:1",
						"stateVariable": false,
						"storageLocation": "default",
						"typeDescriptions": {
						  "typeIdentifier": "t_address_payable",
						  "typeString": "address payable"
						},
						"typeName": {
						  "id": 163,
						  "name": "address",
						  "nodeType": "ElementaryTypeName",
						  "src": "1091:15:1",
						  "stateMutability": "payable",
						  "typeDescriptions": {
							"typeIdentifier": "t_address_payable",
							"typeString": "address payable"
						  }
						},
						"value": null,
						"visibility": "internal"
					  }
					],
					"src": "1068:50:1"
				  },
				  "returnParameters": {
					"id": 166,
					"nodeType": "ParameterList",
					"parameters": [],
					"src": "1126:0:1"
				  },
				  "scope": 299,
				  "src": "1057:157:1",
				  "stateMutability": "nonpayable",
				  "superFunction": null,
				  "visibility": "public"
				},
				{
				  "body": {
					"id": 210,
					"nodeType": "Block",
					"src": "1394:183:1",
					"statements": [
					  {
						"assignments": [
						  193
						],
						"declarations": [
						  {
							"constant": false,
							"id": 193,
							"name": "gasLimit",
							"nodeType": "VariableDeclaration",
							"scope": 210,
							"src": "1404:16:1",
							"stateVariable": false,
							"storageLocation": "default",
							"typeDescriptions": {
							  "typeIdentifier": "t_uint256",
							  "typeString": "uint256"
							},
							"typeName": {
							  "id": 192,
							  "name": "uint256",
							  "nodeType": "ElementaryTypeName",
							  "src": "1404:7:1",
							  "typeDescriptions": {
								"typeIdentifier": "t_uint256",
								"typeString": "uint256"
							  }
							},
							"value": null,
							"visibility": "internal"
						  }
						],
						"id": 199,
						"initialValue": {
						  "argumentTypes": null,
						  "arguments": [
							{
							  "argumentTypes": null,
							  "id": 197,
							  "name": "RELAYED_PAYMENT_FUND_FUNCTION_CALL_GAS_USED",
							  "nodeType": "Identifier",
							  "overloadedDeclarations": [],
							  "referencedDeclaration": 134,
							  "src": "1437:43:1",
							  "typeDescriptions": {
								"typeIdentifier": "t_uint256",
								"typeString": "uint256"
							  }
							}
						  ],
						  "expression": {
							"argumentTypes": [
							  {
								"typeIdentifier": "t_uint256",
								"typeString": "uint256"
							  }
							],
							"expression": {
							  "argumentTypes": null,
							  "arguments": [],
							  "expression": {
								"argumentTypes": [],
								"id": 194,
								"name": "gasleft",
								"nodeType": "Identifier",
								"overloadedDeclarations": [],
								"referencedDeclaration": 1415,
								"src": "1423:7:1",
								"typeDescriptions": {
								  "typeIdentifier": "t_function_gasleft_view$__$returns$_t_uint256_$",
								  "typeString": "function () view returns (uint256)"
								}
							  },
							  "id": 195,
							  "isConstant": false,
							  "isLValue": false,
							  "isPure": false,
							  "kind": "functionCall",
							  "lValueRequested": false,
							  "names": [],
							  "nodeType": "FunctionCall",
							  "src": "1423:9:1",
							  "typeDescriptions": {
								"typeIdentifier": "t_uint256",
								"typeString": "uint256"
							  }
							},
							"id": 196,
							"isConstant": false,
							"isLValue": false,
							"isPure": false,
							"lValueRequested": false,
							"memberName": "add",
							"nodeType": "MemberAccess",
							"referencedDeclaration": 827,
							"src": "1423:13:1",
							"typeDescriptions": {
							  "typeIdentifier": "t_function_internal_pure$_t_uint256_$_t_uint256_$returns$_t_uint256_$bound_to$_t_uint256_$",
							  "typeString": "function (uint256,uint256) pure returns (uint256)"
							}
						  },
						  "id": 198,
						  "isConstant": false,
						  "isLValue": false,
						  "isPure": false,
						  "kind": "functionCall",
						  "lValueRequested": false,
						  "names": [],
						  "nodeType": "FunctionCall",
						  "src": "1423:58:1",
						  "typeDescriptions": {
							"typeIdentifier": "t_uint256",
							"typeString": "uint256"
						  }
						},
						"nodeType": "VariableDeclarationStatement",
						"src": "1404:77:1"
					  },
					  {
						"expression": {
						  "argumentTypes": null,
						  "arguments": [
							{
							  "argumentTypes": null,
							  "id": 203,
							  "name": "weiAmount",
							  "nodeType": "Identifier",
							  "overloadedDeclarations": [],
							  "referencedDeclaration": 184,
							  "src": "1523:9:1",
							  "typeDescriptions": {
								"typeIdentifier": "t_uint256",
								"typeString": "uint256"
							  }
							}
						  ],
						  "expression": {
							"argumentTypes": [
							  {
								"typeIdentifier": "t_uint256",
								"typeString": "uint256"
							  }
							],
							"expression": {
							  "argumentTypes": null,
							  "id": 200,
							  "name": "addressToFund",
							  "nodeType": "Identifier",
							  "overloadedDeclarations": [],
							  "referencedDeclaration": 182,
							  "src": "1500:13:1",
							  "typeDescriptions": {
								"typeIdentifier": "t_address_payable",
								"typeString": "address payable"
							  }
							},
							"id": 202,
							"isConstant": false,
							"isLValue": false,
							"isPure": false,
							"lValueRequested": false,
							"memberName": "transfer",
							"nodeType": "MemberAccess",
							"referencedDeclaration": null,
							"src": "1500:22:1",
							"typeDescriptions": {
							  "typeIdentifier": "t_function_transfer_nonpayable$_t_uint256_$returns$__$",
							  "typeString": "function (uint256)"
							}
						  },
						  "id": 204,
						  "isConstant": false,
						  "isLValue": false,
						  "isPure": false,
						  "kind": "functionCall",
						  "lValueRequested": false,
						  "names": [],
						  "nodeType": "FunctionCall",
						  "src": "1500:33:1",
						  "typeDescriptions": {
							"typeIdentifier": "t_tuple$__$",
							"typeString": "tuple()"
						  }
						},
						"id": 205,
						"nodeType": "ExpressionStatement",
						"src": "1500:33:1"
					  },
					  {
						"expression": {
						  "argumentTypes": null,
						  "arguments": [
							{
							  "argumentTypes": null,
							  "id": 207,
							  "name": "gasLimit",
							  "nodeType": "Identifier",
							  "overloadedDeclarations": [],
							  "referencedDeclaration": 193,
							  "src": "1561:8:1",
							  "typeDescriptions": {
								"typeIdentifier": "t_uint256",
								"typeString": "uint256"
							  }
							}
						  ],
						  "expression": {
							"argumentTypes": [
							  {
								"typeIdentifier": "t_uint256",
								"typeString": "uint256"
							  }
							],
							"id": 206,
							"name": "_refundMsgSender",
							"nodeType": "Identifier",
							"overloadedDeclarations": [],
							"referencedDeclaration": 298,
							"src": "1544:16:1",
							"typeDescriptions": {
							  "typeIdentifier": "t_function_internal_nonpayable$_t_uint256_$returns$__$",
							  "typeString": "function (uint256)"
							}
						  },
						  "id": 208,
						  "isConstant": false,
						  "isLValue": false,
						  "isPure": false,
						  "kind": "functionCall",
						  "lValueRequested": false,
						  "names": [],
						  "nodeType": "FunctionCall",
						  "src": "1544:26:1",
						  "typeDescriptions": {
							"typeIdentifier": "t_tuple$__$",
							"typeString": "tuple()"
						  }
						},
						"id": 209,
						"nodeType": "ExpressionStatement",
						"src": "1544:26:1"
					  }
					]
				  },
				  "documentation": null,
				  "id": 211,
				  "implemented": true,
				  "kind": "function",
				  "modifiers": [
					{
					  "arguments": [
						{
						  "argumentTypes": null,
						  "id": 189,
						  "name": "nonce",
						  "nodeType": "Identifier",
						  "overloadedDeclarations": [],
						  "referencedDeclaration": 180,
						  "src": "1383:5:1",
						  "typeDescriptions": {
							"typeIdentifier": "t_uint256",
							"typeString": "uint256"
						  }
						}
					  ],
					  "id": 190,
					  "modifierName": {
						"argumentTypes": null,
						"id": 188,
						"name": "preValidateFund",
						"nodeType": "Identifier",
						"overloadedDeclarations": [],
						"referencedDeclaration": 160,
						"src": "1367:15:1",
						"typeDescriptions": {
						  "typeIdentifier": "t_modifier$_t_uint256_$",
						  "typeString": "modifier (uint256)"
						}
					  },
					  "nodeType": "ModifierInvocation",
					  "src": "1367:22:1"
					}
				  ],
				  "name": "fundForRelayedPayment",
				  "nodeType": "FunctionDefinition",
				  "parameters": {
					"id": 187,
					"nodeType": "ParameterList",
					"parameters": [
					  {
						"constant": false,
						"id": 180,
						"name": "nonce",
						"nodeType": "VariableDeclaration",
						"scope": 211,
						"src": "1254:13:1",
						"stateVariable": false,
						"storageLocation": "default",
						"typeDescriptions": {
						  "typeIdentifier": "t_uint256",
						  "typeString": "uint256"
						},
						"typeName": {
						  "id": 179,
						  "name": "uint256",
						  "nodeType": "ElementaryTypeName",
						  "src": "1254:7:1",
						  "typeDescriptions": {
							"typeIdentifier": "t_uint256",
							"typeString": "uint256"
						  }
						},
						"value": null,
						"visibility": "internal"
					  },
					  {
						"constant": false,
						"id": 182,
						"name": "addressToFund",
						"nodeType": "VariableDeclaration",
						"scope": 211,
						"src": "1269:29:1",
						"stateVariable": false,
						"storageLocation": "default",
						"typeDescriptions": {
						  "typeIdentifier": "t_address_payable",
						  "typeString": "address payable"
						},
						"typeName": {
						  "id": 181,
						  "name": "address",
						  "nodeType": "ElementaryTypeName",
						  "src": "1269:15:1",
						  "stateMutability": "payable",
						  "typeDescriptions": {
							"typeIdentifier": "t_address_payable",
							"typeString": "address payable"
						  }
						},
						"value": null,
						"visibility": "internal"
					  },
					  {
						"constant": false,
						"id": 184,
						"name": "weiAmount",
						"nodeType": "VariableDeclaration",
						"scope": 211,
						"src": "1300:17:1",
						"stateVariable": false,
						"storageLocation": "default",
						"typeDescriptions": {
						  "typeIdentifier": "t_uint256",
						  "typeString": "uint256"
						},
						"typeName": {
						  "id": 183,
						  "name": "uint256",
						  "nodeType": "ElementaryTypeName",
						  "src": "1300:7:1",
						  "typeDescriptions": {
							"typeIdentifier": "t_uint256",
							"typeString": "uint256"
						  }
						},
						"value": null,
						"visibility": "internal"
					  },
					  {
						"constant": false,
						"id": 186,
						"name": "authorizationSignature",
						"nodeType": "VariableDeclaration",
						"scope": 211,
						"src": "1319:35:1",
						"stateVariable": false,
						"storageLocation": "memory",
						"typeDescriptions": {
						  "typeIdentifier": "t_bytes_memory_ptr",
						  "typeString": "bytes"
						},
						"typeName": {
						  "id": 185,
						  "name": "bytes",
						  "nodeType": "ElementaryTypeName",
						  "src": "1319:5:1",
						  "typeDescriptions": {
							"typeIdentifier": "t_bytes_storage_ptr",
							"typeString": "bytes"
						  }
						},
						"value": null,
						"visibility": "internal"
					  }
					],
					"src": "1253:102:1"
				  },
				  "returnParameters": {
					"id": 191,
					"nodeType": "ParameterList",
					"parameters": [],
					"src": "1394:0:1"
				  },
				  "scope": 299,
				  "src": "1223:354:1",
				  "stateMutability": "nonpayable",
				  "superFunction": null,
				  "visibility": "public"
				},
				{
				  "body": {
					"id": 252,
					"nodeType": "Block",
					"src": "1772:232:1",
					"statements": [
					  {
						"assignments": [
						  228
						],
						"declarations": [
						  {
							"constant": false,
							"id": 228,
							"name": "gasLimit",
							"nodeType": "VariableDeclaration",
							"scope": 252,
							"src": "1782:16:1",
							"stateVariable": false,
							"storageLocation": "default",
							"typeDescriptions": {
							  "typeIdentifier": "t_uint256",
							  "typeString": "uint256"
							},
							"typeName": {
							  "id": 227,
							  "name": "uint256",
							  "nodeType": "ElementaryTypeName",
							  "src": "1782:7:1",
							  "typeDescriptions": {
								"typeIdentifier": "t_uint256",
								"typeString": "uint256"
							  }
							},
							"value": null,
							"visibility": "internal"
						  }
						],
						"id": 234,
						"initialValue": {
						  "argumentTypes": null,
						  "arguments": [
							{
							  "argumentTypes": null,
							  "id": 232,
							  "name": "FIAT_PAYMENT_FUND_FUNCTION_CALL_GAS_USED",
							  "nodeType": "Identifier",
							  "overloadedDeclarations": [],
							  "referencedDeclaration": 131,
							  "src": "1815:40:1",
							  "typeDescriptions": {
								"typeIdentifier": "t_uint256",
								"typeString": "uint256"
							  }
							}
						  ],
						  "expression": {
							"argumentTypes": [
							  {
								"typeIdentifier": "t_uint256",
								"typeString": "uint256"
							  }
							],
							"expression": {
							  "argumentTypes": null,
							  "arguments": [],
							  "expression": {
								"argumentTypes": [],
								"id": 229,
								"name": "gasleft",
								"nodeType": "Identifier",
								"overloadedDeclarations": [],
								"referencedDeclaration": 1415,
								"src": "1801:7:1",
								"typeDescriptions": {
								  "typeIdentifier": "t_function_gasleft_view$__$returns$_t_uint256_$",
								  "typeString": "function () view returns (uint256)"
								}
							  },
							  "id": 230,
							  "isConstant": false,
							  "isLValue": false,
							  "isPure": false,
							  "kind": "functionCall",
							  "lValueRequested": false,
							  "names": [],
							  "nodeType": "FunctionCall",
							  "src": "1801:9:1",
							  "typeDescriptions": {
								"typeIdentifier": "t_uint256",
								"typeString": "uint256"
							  }
							},
							"id": 231,
							"isConstant": false,
							"isLValue": false,
							"isPure": false,
							"lValueRequested": false,
							"memberName": "add",
							"nodeType": "MemberAccess",
							"referencedDeclaration": 827,
							"src": "1801:13:1",
							"typeDescriptions": {
							  "typeIdentifier": "t_function_internal_pure$_t_uint256_$_t_uint256_$returns$_t_uint256_$bound_to$_t_uint256_$",
							  "typeString": "function (uint256,uint256) pure returns (uint256)"
							}
						  },
						  "id": 233,
						  "isConstant": false,
						  "isLValue": false,
						  "isPure": false,
						  "kind": "functionCall",
						  "lValueRequested": false,
						  "names": [],
						  "nodeType": "FunctionCall",
						  "src": "1801:55:1",
						  "typeDescriptions": {
							"typeIdentifier": "t_uint256",
							"typeString": "uint256"
						  }
						},
						"nodeType": "VariableDeclarationStatement",
						"src": "1782:74:1"
					  },
					  {
						"expression": {
						  "argumentTypes": null,
						  "arguments": [
							{
							  "argumentTypes": null,
							  "id": 238,
							  "name": "addressToFund",
							  "nodeType": "Identifier",
							  "overloadedDeclarations": [],
							  "referencedDeclaration": 215,
							  "src": "1890:13:1",
							  "typeDescriptions": {
								"typeIdentifier": "t_address_payable",
								"typeString": "address payable"
							  }
							},
							{
							  "argumentTypes": null,
							  "id": 239,
							  "name": "tokenAmount",
							  "nodeType": "Identifier",
							  "overloadedDeclarations": [],
							  "referencedDeclaration": 217,
							  "src": "1905:11:1",
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
							"expression": {
							  "argumentTypes": null,
							  "id": 235,
							  "name": "tokenContract",
							  "nodeType": "Identifier",
							  "overloadedDeclarations": [],
							  "referencedDeclaration": 115,
							  "src": "1867:13:1",
							  "typeDescriptions": {
								"typeIdentifier": "t_contract$_ERC20_$1280",
								"typeString": "contract ERC20"
							  }
							},
							"id": 237,
							"isConstant": false,
							"isLValue": false,
							"isPure": false,
							"lValueRequested": false,
							"memberName": "transfer",
							"nodeType": "MemberAccess",
							"referencedDeclaration": 924,
							"src": "1867:22:1",
							"typeDescriptions": {
							  "typeIdentifier": "t_function_external_nonpayable$_t_address_$_t_uint256_$returns$_t_bool_$",
							  "typeString": "function (address,uint256) external returns (bool)"
							}
						  },
						  "id": 240,
						  "isConstant": false,
						  "isLValue": false,
						  "isPure": false,
						  "kind": "functionCall",
						  "lValueRequested": false,
						  "names": [],
						  "nodeType": "FunctionCall",
						  "src": "1867:50:1",
						  "typeDescriptions": {
							"typeIdentifier": "t_bool",
							"typeString": "bool"
						  }
						},
						"id": 241,
						"nodeType": "ExpressionStatement",
						"src": "1867:50:1"
					  },
					  {
						"expression": {
						  "argumentTypes": null,
						  "arguments": [
							{
							  "argumentTypes": null,
							  "id": 245,
							  "name": "weiAmount",
							  "nodeType": "Identifier",
							  "overloadedDeclarations": [],
							  "referencedDeclaration": 219,
							  "src": "1950:9:1",
							  "typeDescriptions": {
								"typeIdentifier": "t_uint256",
								"typeString": "uint256"
							  }
							}
						  ],
						  "expression": {
							"argumentTypes": [
							  {
								"typeIdentifier": "t_uint256",
								"typeString": "uint256"
							  }
							],
							"expression": {
							  "argumentTypes": null,
							  "id": 242,
							  "name": "addressToFund",
							  "nodeType": "Identifier",
							  "overloadedDeclarations": [],
							  "referencedDeclaration": 215,
							  "src": "1927:13:1",
							  "typeDescriptions": {
								"typeIdentifier": "t_address_payable",
								"typeString": "address payable"
							  }
							},
							"id": 244,
							"isConstant": false,
							"isLValue": false,
							"isPure": false,
							"lValueRequested": false,
							"memberName": "transfer",
							"nodeType": "MemberAccess",
							"referencedDeclaration": null,
							"src": "1927:22:1",
							"typeDescriptions": {
							  "typeIdentifier": "t_function_transfer_nonpayable$_t_uint256_$returns$__$",
							  "typeString": "function (uint256)"
							}
						  },
						  "id": 246,
						  "isConstant": false,
						  "isLValue": false,
						  "isPure": false,
						  "kind": "functionCall",
						  "lValueRequested": false,
						  "names": [],
						  "nodeType": "FunctionCall",
						  "src": "1927:33:1",
						  "typeDescriptions": {
							"typeIdentifier": "t_tuple$__$",
							"typeString": "tuple()"
						  }
						},
						"id": 247,
						"nodeType": "ExpressionStatement",
						"src": "1927:33:1"
					  },
					  {
						"expression": {
						  "argumentTypes": null,
						  "arguments": [
							{
							  "argumentTypes": null,
							  "id": 249,
							  "name": "gasLimit",
							  "nodeType": "Identifier",
							  "overloadedDeclarations": [],
							  "referencedDeclaration": 228,
							  "src": "1988:8:1",
							  "typeDescriptions": {
								"typeIdentifier": "t_uint256",
								"typeString": "uint256"
							  }
							}
						  ],
						  "expression": {
							"argumentTypes": [
							  {
								"typeIdentifier": "t_uint256",
								"typeString": "uint256"
							  }
							],
							"id": 248,
							"name": "_refundMsgSender",
							"nodeType": "Identifier",
							"overloadedDeclarations": [],
							"referencedDeclaration": 298,
							"src": "1971:16:1",
							"typeDescriptions": {
							  "typeIdentifier": "t_function_internal_nonpayable$_t_uint256_$returns$__$",
							  "typeString": "function (uint256)"
							}
						  },
						  "id": 250,
						  "isConstant": false,
						  "isLValue": false,
						  "isPure": false,
						  "kind": "functionCall",
						  "lValueRequested": false,
						  "names": [],
						  "nodeType": "FunctionCall",
						  "src": "1971:26:1",
						  "typeDescriptions": {
							"typeIdentifier": "t_tuple$__$",
							"typeString": "tuple()"
						  }
						},
						"id": 251,
						"nodeType": "ExpressionStatement",
						"src": "1971:26:1"
					  }
					]
				  },
				  "documentation": null,
				  "id": 253,
				  "implemented": true,
				  "kind": "function",
				  "modifiers": [
					{
					  "arguments": [
						{
						  "argumentTypes": null,
						  "id": 224,
						  "name": "nonce",
						  "nodeType": "Identifier",
						  "overloadedDeclarations": [],
						  "referencedDeclaration": 213,
						  "src": "1761:5:1",
						  "typeDescriptions": {
							"typeIdentifier": "t_uint256",
							"typeString": "uint256"
						  }
						}
					  ],
					  "id": 225,
					  "modifierName": {
						"argumentTypes": null,
						"id": 223,
						"name": "preValidateFund",
						"nodeType": "Identifier",
						"overloadedDeclarations": [],
						"referencedDeclaration": 160,
						"src": "1745:15:1",
						"typeDescriptions": {
						  "typeIdentifier": "t_modifier$_t_uint256_$",
						  "typeString": "modifier (uint256)"
						}
					  },
					  "nodeType": "ModifierInvocation",
					  "src": "1745:22:1"
					}
				  ],
				  "name": "fundForFiatPayment",
				  "nodeType": "FunctionDefinition",
				  "parameters": {
					"id": 222,
					"nodeType": "ParameterList",
					"parameters": [
					  {
						"constant": false,
						"id": 213,
						"name": "nonce",
						"nodeType": "VariableDeclaration",
						"scope": 253,
						"src": "1611:13:1",
						"stateVariable": false,
						"storageLocation": "default",
						"typeDescriptions": {
						  "typeIdentifier": "t_uint256",
						  "typeString": "uint256"
						},
						"typeName": {
						  "id": 212,
						  "name": "uint256",
						  "nodeType": "ElementaryTypeName",
						  "src": "1611:7:1",
						  "typeDescriptions": {
							"typeIdentifier": "t_uint256",
							"typeString": "uint256"
						  }
						},
						"value": null,
						"visibility": "internal"
					  },
					  {
						"constant": false,
						"id": 215,
						"name": "addressToFund",
						"nodeType": "VariableDeclaration",
						"scope": 253,
						"src": "1626:29:1",
						"stateVariable": false,
						"storageLocation": "default",
						"typeDescriptions": {
						  "typeIdentifier": "t_address_payable",
						  "typeString": "address payable"
						},
						"typeName": {
						  "id": 214,
						  "name": "address",
						  "nodeType": "ElementaryTypeName",
						  "src": "1626:15:1",
						  "stateMutability": "payable",
						  "typeDescriptions": {
							"typeIdentifier": "t_address_payable",
							"typeString": "address payable"
						  }
						},
						"value": null,
						"visibility": "internal"
					  },
					  {
						"constant": false,
						"id": 217,
						"name": "tokenAmount",
						"nodeType": "VariableDeclaration",
						"scope": 253,
						"src": "1657:19:1",
						"stateVariable": false,
						"storageLocation": "default",
						"typeDescriptions": {
						  "typeIdentifier": "t_uint256",
						  "typeString": "uint256"
						},
						"typeName": {
						  "id": 216,
						  "name": "uint256",
						  "nodeType": "ElementaryTypeName",
						  "src": "1657:7:1",
						  "typeDescriptions": {
							"typeIdentifier": "t_uint256",
							"typeString": "uint256"
						  }
						},
						"value": null,
						"visibility": "internal"
					  },
					  {
						"constant": false,
						"id": 219,
						"name": "weiAmount",
						"nodeType": "VariableDeclaration",
						"scope": 253,
						"src": "1678:17:1",
						"stateVariable": false,
						"storageLocation": "default",
						"typeDescriptions": {
						  "typeIdentifier": "t_uint256",
						  "typeString": "uint256"
						},
						"typeName": {
						  "id": 218,
						  "name": "uint256",
						  "nodeType": "ElementaryTypeName",
						  "src": "1678:7:1",
						  "typeDescriptions": {
							"typeIdentifier": "t_uint256",
							"typeString": "uint256"
						  }
						},
						"value": null,
						"visibility": "internal"
					  },
					  {
						"constant": false,
						"id": 221,
						"name": "authorizationSignature",
						"nodeType": "VariableDeclaration",
						"scope": 253,
						"src": "1697:35:1",
						"stateVariable": false,
						"storageLocation": "memory",
						"typeDescriptions": {
						  "typeIdentifier": "t_bytes_memory_ptr",
						  "typeString": "bytes"
						},
						"typeName": {
						  "id": 220,
						  "name": "bytes",
						  "nodeType": "ElementaryTypeName",
						  "src": "1697:5:1",
						  "typeDescriptions": {
							"typeIdentifier": "t_bytes_storage_ptr",
							"typeString": "bytes"
						  }
						},
						"value": null,
						"visibility": "internal"
					  }
					],
					"src": "1610:123:1"
				  },
				  "returnParameters": {
					"id": 226,
					"nodeType": "ParameterList",
					"parameters": [],
					"src": "1772:0:1"
				  },
				  "scope": 299,
				  "src": "1583:421:1",
				  "stateMutability": "nonpayable",
				  "superFunction": null,
				  "visibility": "public"
				},
				{
				  "body": {
					"id": 268,
					"nodeType": "Block",
					"src": "2096:57:1",
					"statements": [
					  {
						"expression": {
						  "argumentTypes": null,
						  "arguments": [
							{
							  "argumentTypes": null,
							  "id": 264,
							  "name": "raw",
							  "nodeType": "Identifier",
							  "overloadedDeclarations": [],
							  "referencedDeclaration": 255,
							  "src": "2137:3:1",
							  "typeDescriptions": {
								"typeIdentifier": "t_bytes32",
								"typeString": "bytes32"
							  }
							},
							{
							  "argumentTypes": null,
							  "id": 265,
							  "name": "sig",
							  "nodeType": "Identifier",
							  "overloadedDeclarations": [],
							  "referencedDeclaration": 257,
							  "src": "2142:3:1",
							  "typeDescriptions": {
								"typeIdentifier": "t_bytes_memory_ptr",
								"typeString": "bytes memory"
							  }
							}
						  ],
						  "expression": {
							"argumentTypes": [
							  {
								"typeIdentifier": "t_bytes32",
								"typeString": "bytes32"
							  },
							  {
								"typeIdentifier": "t_bytes_memory_ptr",
								"typeString": "bytes memory"
							  }
							],
							"expression": {
							  "argumentTypes": null,
							  "id": 262,
							  "name": "ECTools",
							  "nodeType": "Identifier",
							  "overloadedDeclarations": [],
							  "referencedDeclaration": 105,
							  "src": "2113:7:1",
							  "typeDescriptions": {
								"typeIdentifier": "t_type$_t_contract$_ECTools_$105_$",
								"typeString": "type(library ECTools)"
							  }
							},
							"id": 263,
							"isConstant": false,
							"isLValue": false,
							"isPure": false,
							"lValueRequested": false,
							"memberName": "prefixedRecover",
							"nodeType": "MemberAccess",
							"referencedDeclaration": 104,
							"src": "2113:23:1",
							"typeDescriptions": {
							  "typeIdentifier": "t_function_delegatecall_pure$_t_bytes32_$_t_bytes_memory_ptr_$returns$_t_address_$",
							  "typeString": "function (bytes32,bytes memory) pure returns (address)"
							}
						  },
						  "id": 266,
						  "isConstant": false,
						  "isLValue": false,
						  "isPure": false,
						  "kind": "functionCall",
						  "lValueRequested": false,
						  "names": [],
						  "nodeType": "FunctionCall",
						  "src": "2113:33:1",
						  "typeDescriptions": {
							"typeIdentifier": "t_address",
							"typeString": "address"
						  }
						},
						"functionReturnParameters": 261,
						"id": 267,
						"nodeType": "Return",
						"src": "2106:40:1"
					  }
					]
				  },
				  "documentation": null,
				  "id": 269,
				  "implemented": true,
				  "kind": "function",
				  "modifiers": [],
				  "name": "getSigner",
				  "nodeType": "FunctionDefinition",
				  "parameters": {
					"id": 258,
					"nodeType": "ParameterList",
					"parameters": [
					  {
						"constant": false,
						"id": 255,
						"name": "raw",
						"nodeType": "VariableDeclaration",
						"scope": 269,
						"src": "2029:11:1",
						"stateVariable": false,
						"storageLocation": "default",
						"typeDescriptions": {
						  "typeIdentifier": "t_bytes32",
						  "typeString": "bytes32"
						},
						"typeName": {
						  "id": 254,
						  "name": "bytes32",
						  "nodeType": "ElementaryTypeName",
						  "src": "2029:7:1",
						  "typeDescriptions": {
							"typeIdentifier": "t_bytes32",
							"typeString": "bytes32"
						  }
						},
						"value": null,
						"visibility": "internal"
					  },
					  {
						"constant": false,
						"id": 257,
						"name": "sig",
						"nodeType": "VariableDeclaration",
						"scope": 269,
						"src": "2042:16:1",
						"stateVariable": false,
						"storageLocation": "memory",
						"typeDescriptions": {
						  "typeIdentifier": "t_bytes_memory_ptr",
						  "typeString": "bytes"
						},
						"typeName": {
						  "id": 256,
						  "name": "bytes",
						  "nodeType": "ElementaryTypeName",
						  "src": "2042:5:1",
						  "typeDescriptions": {
							"typeIdentifier": "t_bytes_storage_ptr",
							"typeString": "bytes"
						  }
						},
						"value": null,
						"visibility": "internal"
					  }
					],
					"src": "2028:31:1"
				  },
				  "returnParameters": {
					"id": 261,
					"nodeType": "ParameterList",
					"parameters": [
					  {
						"constant": false,
						"id": 260,
						"name": "signer",
						"nodeType": "VariableDeclaration",
						"scope": 269,
						"src": "2080:14:1",
						"stateVariable": false,
						"storageLocation": "default",
						"typeDescriptions": {
						  "typeIdentifier": "t_address",
						  "typeString": "address"
						},
						"typeName": {
						  "id": 259,
						  "name": "address",
						  "nodeType": "ElementaryTypeName",
						  "src": "2080:7:1",
						  "stateMutability": "nonpayable",
						  "typeDescriptions": {
							"typeIdentifier": "t_address",
							"typeString": "address"
						  }
						},
						"value": null,
						"visibility": "internal"
					  }
					],
					"src": "2079:16:1"
				  },
				  "scope": 299,
				  "src": "2010:143:1",
				  "stateMutability": "pure",
				  "superFunction": null,
				  "visibility": "public"
				},
				{
				  "body": {
					"id": 297,
					"nodeType": "Block",
					"src": "2212:153:1",
					"statements": [
					  {
						"assignments": [
						  275
						],
						"declarations": [
						  {
							"constant": false,
							"id": 275,
							"name": "refundAmount",
							"nodeType": "VariableDeclaration",
							"scope": 297,
							"src": "2222:20:1",
							"stateVariable": false,
							"storageLocation": "default",
							"typeDescriptions": {
							  "typeIdentifier": "t_uint256",
							  "typeString": "uint256"
							},
							"typeName": {
							  "id": 274,
							  "name": "uint256",
							  "nodeType": "ElementaryTypeName",
							  "src": "2222:7:1",
							  "typeDescriptions": {
								"typeIdentifier": "t_uint256",
								"typeString": "uint256"
							  }
							},
							"value": null,
							"visibility": "internal"
						  }
						],
						"id": 288,
						"initialValue": {
						  "argumentTypes": null,
						  "arguments": [
							{
							  "argumentTypes": null,
							  "expression": {
								"argumentTypes": null,
								"id": 285,
								"name": "tx",
								"nodeType": "Identifier",
								"overloadedDeclarations": [],
								"referencedDeclaration": 1434,
								"src": "2303:2:1",
								"typeDescriptions": {
								  "typeIdentifier": "t_magic_transaction",
								  "typeString": "tx"
								}
							  },
							  "id": 286,
							  "isConstant": false,
							  "isLValue": false,
							  "isPure": false,
							  "lValueRequested": false,
							  "memberName": "gasprice",
							  "nodeType": "MemberAccess",
							  "referencedDeclaration": null,
							  "src": "2303:11:1",
							  "typeDescriptions": {
								"typeIdentifier": "t_uint256",
								"typeString": "uint256"
							  }
							}
						  ],
						  "expression": {
							"argumentTypes": [
							  {
								"typeIdentifier": "t_uint256",
								"typeString": "uint256"
							  }
							],
							"expression": {
							  "argumentTypes": null,
							  "arguments": [
								{
								  "argumentTypes": null,
								  "id": 282,
								  "name": "REFUNDING_LOGIC_GAS_COST",
								  "nodeType": "Identifier",
								  "overloadedDeclarations": [],
								  "referencedDeclaration": 128,
								  "src": "2273:24:1",
								  "typeDescriptions": {
									"typeIdentifier": "t_uint256",
									"typeString": "uint256"
								  }
								}
							  ],
							  "expression": {
								"argumentTypes": [
								  {
									"typeIdentifier": "t_uint256",
									"typeString": "uint256"
								  }
								],
								"expression": {
								  "argumentTypes": null,
								  "arguments": [
									{
									  "argumentTypes": null,
									  "arguments": [],
									  "expression": {
										"argumentTypes": [],
										"id": 278,
										"name": "gasleft",
										"nodeType": "Identifier",
										"overloadedDeclarations": [],
										"referencedDeclaration": 1415,
										"src": "2258:7:1",
										"typeDescriptions": {
										  "typeIdentifier": "t_function_gasleft_view$__$returns$_t_uint256_$",
										  "typeString": "function () view returns (uint256)"
										}
									  },
									  "id": 279,
									  "isConstant": false,
									  "isLValue": false,
									  "isPure": false,
									  "kind": "functionCall",
									  "lValueRequested": false,
									  "names": [],
									  "nodeType": "FunctionCall",
									  "src": "2258:9:1",
									  "typeDescriptions": {
										"typeIdentifier": "t_uint256",
										"typeString": "uint256"
									  }
									}
								  ],
								  "expression": {
									"argumentTypes": [
									  {
										"typeIdentifier": "t_uint256",
										"typeString": "uint256"
									  }
									],
									"expression": {
									  "argumentTypes": null,
									  "id": 276,
									  "name": "gasLimit",
									  "nodeType": "Identifier",
									  "overloadedDeclarations": [],
									  "referencedDeclaration": 271,
									  "src": "2245:8:1",
									  "typeDescriptions": {
										"typeIdentifier": "t_uint256",
										"typeString": "uint256"
									  }
									},
									"id": 277,
									"isConstant": false,
									"isLValue": false,
									"isPure": false,
									"lValueRequested": false,
									"memberName": "sub",
									"nodeType": "MemberAccess",
									"referencedDeclaration": 803,
									"src": "2245:12:1",
									"typeDescriptions": {
									  "typeIdentifier": "t_function_internal_pure$_t_uint256_$_t_uint256_$returns$_t_uint256_$bound_to$_t_uint256_$",
									  "typeString": "function (uint256,uint256) pure returns (uint256)"
									}
								  },
								  "id": 280,
								  "isConstant": false,
								  "isLValue": false,
								  "isPure": false,
								  "kind": "functionCall",
								  "lValueRequested": false,
								  "names": [],
								  "nodeType": "FunctionCall",
								  "src": "2245:23:1",
								  "typeDescriptions": {
									"typeIdentifier": "t_uint256",
									"typeString": "uint256"
								  }
								},
								"id": 281,
								"isConstant": false,
								"isLValue": false,
								"isPure": false,
								"lValueRequested": false,
								"memberName": "add",
								"nodeType": "MemberAccess",
								"referencedDeclaration": 827,
								"src": "2245:27:1",
								"typeDescriptions": {
								  "typeIdentifier": "t_function_internal_pure$_t_uint256_$_t_uint256_$returns$_t_uint256_$bound_to$_t_uint256_$",
								  "typeString": "function (uint256,uint256) pure returns (uint256)"
								}
							  },
							  "id": 283,
							  "isConstant": false,
							  "isLValue": false,
							  "isPure": false,
							  "kind": "functionCall",
							  "lValueRequested": false,
							  "names": [],
							  "nodeType": "FunctionCall",
							  "src": "2245:53:1",
							  "typeDescriptions": {
								"typeIdentifier": "t_uint256",
								"typeString": "uint256"
							  }
							},
							"id": 284,
							"isConstant": false,
							"isLValue": false,
							"isPure": false,
							"lValueRequested": false,
							"memberName": "mul",
							"nodeType": "MemberAccess",
							"referencedDeclaration": 755,
							"src": "2245:57:1",
							"typeDescriptions": {
							  "typeIdentifier": "t_function_internal_pure$_t_uint256_$_t_uint256_$returns$_t_uint256_$bound_to$_t_uint256_$",
							  "typeString": "function (uint256,uint256) pure returns (uint256)"
							}
						  },
						  "id": 287,
						  "isConstant": false,
						  "isLValue": false,
						  "isPure": false,
						  "kind": "functionCall",
						  "lValueRequested": false,
						  "names": [],
						  "nodeType": "FunctionCall",
						  "src": "2245:70:1",
						  "typeDescriptions": {
							"typeIdentifier": "t_uint256",
							"typeString": "uint256"
						  }
						},
						"nodeType": "VariableDeclarationStatement",
						"src": "2222:93:1"
					  },
					  {
						"expression": {
						  "argumentTypes": null,
						  "arguments": [
							{
							  "argumentTypes": null,
							  "id": 294,
							  "name": "refundAmount",
							  "nodeType": "Identifier",
							  "overloadedDeclarations": [],
							  "referencedDeclaration": 275,
							  "src": "2345:12:1",
							  "typeDescriptions": {
								"typeIdentifier": "t_uint256",
								"typeString": "uint256"
							  }
							}
						  ],
						  "expression": {
							"argumentTypes": [
							  {
								"typeIdentifier": "t_uint256",
								"typeString": "uint256"
							  }
							],
							"expression": {
							  "argumentTypes": null,
							  "expression": {
								"argumentTypes": null,
								"id": 289,
								"name": "msg",
								"nodeType": "Identifier",
								"overloadedDeclarations": [],
								"referencedDeclaration": 1422,
								"src": "2325:3:1",
								"typeDescriptions": {
								  "typeIdentifier": "t_magic_message",
								  "typeString": "msg"
								}
							  },
							  "id": 292,
							  "isConstant": false,
							  "isLValue": false,
							  "isPure": false,
							  "lValueRequested": false,
							  "memberName": "sender",
							  "nodeType": "MemberAccess",
							  "referencedDeclaration": null,
							  "src": "2325:10:1",
							  "typeDescriptions": {
								"typeIdentifier": "t_address_payable",
								"typeString": "address payable"
							  }
							},
							"id": 293,
							"isConstant": false,
							"isLValue": false,
							"isPure": false,
							"lValueRequested": false,
							"memberName": "transfer",
							"nodeType": "MemberAccess",
							"referencedDeclaration": null,
							"src": "2325:19:1",
							"typeDescriptions": {
							  "typeIdentifier": "t_function_transfer_nonpayable$_t_uint256_$returns$__$",
							  "typeString": "function (uint256)"
							}
						  },
						  "id": 295,
						  "isConstant": false,
						  "isLValue": false,
						  "isPure": false,
						  "kind": "functionCall",
						  "lValueRequested": false,
						  "names": [],
						  "nodeType": "FunctionCall",
						  "src": "2325:33:1",
						  "typeDescriptions": {
							"typeIdentifier": "t_tuple$__$",
							"typeString": "tuple()"
						  }
						},
						"id": 296,
						"nodeType": "ExpressionStatement",
						"src": "2325:33:1"
					  }
					]
				  },
				  "documentation": null,
				  "id": 298,
				  "implemented": true,
				  "kind": "function",
				  "modifiers": [],
				  "name": "_refundMsgSender",
				  "nodeType": "FunctionDefinition",
				  "parameters": {
					"id": 272,
					"nodeType": "ParameterList",
					"parameters": [
					  {
						"constant": false,
						"id": 271,
						"name": "gasLimit",
						"nodeType": "VariableDeclaration",
						"scope": 298,
						"src": "2185:16:1",
						"stateVariable": false,
						"storageLocation": "default",
						"typeDescriptions": {
						  "typeIdentifier": "t_uint256",
						  "typeString": "uint256"
						},
						"typeName": {
						  "id": 270,
						  "name": "uint256",
						  "nodeType": "ElementaryTypeName",
						  "src": "2185:7:1",
						  "typeDescriptions": {
							"typeIdentifier": "t_uint256",
							"typeString": "uint256"
						  }
						},
						"value": null,
						"visibility": "internal"
					  }
					],
					"src": "2184:18:1"
				  },
				  "returnParameters": {
					"id": 273,
					"nodeType": "ParameterList",
					"parameters": [],
					"src": "2212:0:1"
				  },
				  "scope": 299,
				  "src": "2159:206:1",
				  "stateMutability": "nonpayable",
				  "superFunction": null,
				  "visibility": "internal"
				}
			  ],
			  "scope": 300,
			  "src": "252:2115:1"
			}
		  ],
		  "src": "0:2367:1"
		},
		"legacyAST": {
		  "absolutePath": "/Users/ognyanchikov/limepay-contracts/smart-contracts/contracts/Escrow_V2.sol",
		  "exportedSymbols": {
			"Escrow_V2": [
			  299
			]
		  },
		  "id": 300,
		  "nodeType": "SourceUnit",
		  "nodes": [
			{
			  "id": 107,
			  "literals": [
				"solidity",
				"0.5",
				".1"
			  ],
			  "nodeType": "PragmaDirective",
			  "src": "0:22:1"
			},
			{
			  "absolutePath": "/Users/ognyanchikov/limepay-contracts/smart-contracts/contracts/ECTools.sol",
			  "file": "./ECTools.sol",
			  "id": 108,
			  "nodeType": "ImportDirective",
			  "scope": 300,
			  "sourceUnit": 106,
			  "src": "24:23:1",
			  "symbolAliases": [],
			  "unitAlias": ""
			},
			{
			  "absolutePath": "openzeppelin-solidity/contracts/math/SafeMath.sol",
			  "file": "openzeppelin-solidity/contracts/math/SafeMath.sol",
			  "id": 109,
			  "nodeType": "ImportDirective",
			  "scope": 300,
			  "sourceUnit": 849,
			  "src": "48:59:1",
			  "symbolAliases": [],
			  "unitAlias": ""
			},
			{
			  "absolutePath": "openzeppelin-solidity/contracts/token/ERC20/ERC20.sol",
			  "file": "openzeppelin-solidity/contracts/token/ERC20/ERC20.sol",
			  "id": 110,
			  "nodeType": "ImportDirective",
			  "scope": 300,
			  "sourceUnit": 1281,
			  "src": "108:63:1",
			  "symbolAliases": [],
			  "unitAlias": ""
			},
			{
			  "baseContracts": [],
			  "contractDependencies": [],
			  "contractKind": "contract",
			  "documentation": "Escrow_V2 is deprecated and currently it is not used in production ",
			  "fullyImplemented": true,
			  "id": 299,
			  "linearizedBaseContracts": [
				299
			  ],
			  "name": "Escrow_V2",
			  "nodeType": "ContractDefinition",
			  "nodes": [
				{
				  "id": 113,
				  "libraryName": {
					"contractScope": null,
					"id": 111,
					"name": "SafeMath",
					"nodeType": "UserDefinedTypeName",
					"referencedDeclaration": 848,
					"src": "283:8:1",
					"typeDescriptions": {
					  "typeIdentifier": "t_contract$_SafeMath_$848",
					  "typeString": "library SafeMath"
					}
				  },
				  "nodeType": "UsingForDirective",
				  "src": "277:27:1",
				  "typeName": {
					"id": 112,
					"name": "uint256",
					"nodeType": "ElementaryTypeName",
					"src": "296:7:1",
					"typeDescriptions": {
					  "typeIdentifier": "t_uint256",
					  "typeString": "uint256"
					}
				  }
				},
				{
				  "constant": false,
				  "id": 115,
				  "name": "tokenContract",
				  "nodeType": "VariableDeclaration",
				  "scope": 299,
				  "src": "310:26:1",
				  "stateVariable": true,
				  "storageLocation": "default",
				  "typeDescriptions": {
					"typeIdentifier": "t_contract$_ERC20_$1280",
					"typeString": "contract ERC20"
				  },
				  "typeName": {
					"contractScope": null,
					"id": 114,
					"name": "ERC20",
					"nodeType": "UserDefinedTypeName",
					"referencedDeclaration": 1280,
					"src": "310:5:1",
					"typeDescriptions": {
					  "typeIdentifier": "t_contract$_ERC20_$1280",
					  "typeString": "contract ERC20"
					}
				  },
				  "value": null,
				  "visibility": "public"
				},
				{
				  "constant": false,
				  "id": 119,
				  "name": "signers",
				  "nodeType": "VariableDeclaration",
				  "scope": 299,
				  "src": "343:40:1",
				  "stateVariable": true,
				  "storageLocation": "default",
				  "typeDescriptions": {
					"typeIdentifier": "t_mapping$_t_address_$_t_bool_$",
					"typeString": "mapping(address => bool)"
				  },
				  "typeName": {
					"id": 118,
					"keyType": {
					  "id": 116,
					  "name": "address",
					  "nodeType": "ElementaryTypeName",
					  "src": "352:7:1",
					  "typeDescriptions": {
						"typeIdentifier": "t_address",
						"typeString": "address"
					  }
					},
					"nodeType": "Mapping",
					"src": "343:25:1",
					"typeDescriptions": {
					  "typeIdentifier": "t_mapping$_t_address_$_t_bool_$",
					  "typeString": "mapping(address => bool)"
					},
					"valueType": {
					  "id": 117,
					  "name": "bool",
					  "nodeType": "ElementaryTypeName",
					  "src": "363:4:1",
					  "typeDescriptions": {
						"typeIdentifier": "t_bool",
						"typeString": "bool"
					  }
					}
				  },
				  "value": null,
				  "visibility": "public"
				},
				{
				  "constant": false,
				  "id": 123,
				  "name": "usedNonces",
				  "nodeType": "VariableDeclaration",
				  "scope": 299,
				  "src": "389:43:1",
				  "stateVariable": true,
				  "storageLocation": "default",
				  "typeDescriptions": {
					"typeIdentifier": "t_mapping$_t_uint256_$_t_bool_$",
					"typeString": "mapping(uint256 => bool)"
				  },
				  "typeName": {
					"id": 122,
					"keyType": {
					  "id": 120,
					  "name": "uint256",
					  "nodeType": "ElementaryTypeName",
					  "src": "398:7:1",
					  "typeDescriptions": {
						"typeIdentifier": "t_uint256",
						"typeString": "uint256"
					  }
					},
					"nodeType": "Mapping",
					"src": "389:25:1",
					"typeDescriptions": {
					  "typeIdentifier": "t_mapping$_t_uint256_$_t_bool_$",
					  "typeString": "mapping(uint256 => bool)"
					},
					"valueType": {
					  "id": 121,
					  "name": "bool",
					  "nodeType": "ElementaryTypeName",
					  "src": "409:4:1",
					  "typeDescriptions": {
						"typeIdentifier": "t_bool",
						"typeString": "bool"
					  }
					}
				  },
				  "value": null,
				  "visibility": "public"
				},
				{
				  "constant": false,
				  "id": 125,
				  "name": "dAppAdmin",
				  "nodeType": "VariableDeclaration",
				  "scope": 299,
				  "src": "439:32:1",
				  "stateVariable": true,
				  "storageLocation": "default",
				  "typeDescriptions": {
					"typeIdentifier": "t_address_payable",
					"typeString": "address payable"
				  },
				  "typeName": {
					"id": 124,
					"name": "address",
					"nodeType": "ElementaryTypeName",
					"src": "439:15:1",
					"stateMutability": "payable",
					"typeDescriptions": {
					  "typeIdentifier": "t_address_payable",
					  "typeString": "address payable"
					}
				  },
				  "value": null,
				  "visibility": "public"
				},
				{
				  "constant": true,
				  "id": 128,
				  "name": "REFUNDING_LOGIC_GAS_COST",
				  "nodeType": "VariableDeclaration",
				  "scope": 299,
				  "src": "477:55:1",
				  "stateVariable": true,
				  "storageLocation": "default",
				  "typeDescriptions": {
					"typeIdentifier": "t_uint256",
					"typeString": "uint256"
				  },
				  "typeName": {
					"id": 126,
					"name": "uint256",
					"nodeType": "ElementaryTypeName",
					"src": "477:7:1",
					"typeDescriptions": {
					  "typeIdentifier": "t_uint256",
					  "typeString": "uint256"
					}
				  },
				  "value": {
					"argumentTypes": null,
					"hexValue": "37393031",
					"id": 127,
					"isConstant": false,
					"isLValue": false,
					"isPure": true,
					"kind": "number",
					"lValueRequested": false,
					"nodeType": "Literal",
					"src": "528:4:1",
					"subdenomination": null,
					"typeDescriptions": {
					  "typeIdentifier": "t_rational_7901_by_1",
					  "typeString": "int_const 7901"
					},
					"value": "7901"
				  },
				  "visibility": "public"
				},
				{
				  "constant": true,
				  "id": 131,
				  "name": "FIAT_PAYMENT_FUND_FUNCTION_CALL_GAS_USED",
				  "nodeType": "VariableDeclaration",
				  "scope": 299,
				  "src": "570:72:1",
				  "stateVariable": true,
				  "storageLocation": "default",
				  "typeDescriptions": {
					"typeIdentifier": "t_uint256",
					"typeString": "uint256"
				  },
				  "typeName": {
					"id": 129,
					"name": "uint256",
					"nodeType": "ElementaryTypeName",
					"src": "570:7:1",
					"typeDescriptions": {
					  "typeIdentifier": "t_uint256",
					  "typeString": "uint256"
					}
				  },
				  "value": {
					"argumentTypes": null,
					"hexValue": "3332323331",
					"id": 130,
					"isConstant": false,
					"isLValue": false,
					"isPure": true,
					"kind": "number",
					"lValueRequested": false,
					"nodeType": "Literal",
					"src": "637:5:1",
					"subdenomination": null,
					"typeDescriptions": {
					  "typeIdentifier": "t_rational_32231_by_1",
					  "typeString": "int_const 32231"
					},
					"value": "32231"
				  },
				  "visibility": "public"
				},
				{
				  "constant": true,
				  "id": 134,
				  "name": "RELAYED_PAYMENT_FUND_FUNCTION_CALL_GAS_USED",
				  "nodeType": "VariableDeclaration",
				  "scope": 299,
				  "src": "691:75:1",
				  "stateVariable": true,
				  "storageLocation": "default",
				  "typeDescriptions": {
					"typeIdentifier": "t_uint256",
					"typeString": "uint256"
				  },
				  "typeName": {
					"id": 132,
					"name": "uint256",
					"nodeType": "ElementaryTypeName",
					"src": "691:7:1",
					"typeDescriptions": {
					  "typeIdentifier": "t_uint256",
					  "typeString": "uint256"
					}
				  },
				  "value": {
					"argumentTypes": null,
					"hexValue": "3331353634",
					"id": 133,
					"isConstant": false,
					"isLValue": false,
					"isPure": true,
					"kind": "number",
					"lValueRequested": false,
					"nodeType": "Literal",
					"src": "761:5:1",
					"subdenomination": null,
					"typeDescriptions": {
					  "typeIdentifier": "t_rational_31564_by_1",
					  "typeString": "int_const 31564"
					},
					"value": "31564"
				  },
				  "visibility": "public"
				},
				{
				  "body": {
					"id": 145,
					"nodeType": "Block",
					"src": "844:84:1",
					"statements": [
					  {
						"expression": {
						  "argumentTypes": null,
						  "arguments": [
							{
							  "argumentTypes": null,
							  "commonType": {
								"typeIdentifier": "t_address_payable",
								"typeString": "address payable"
							  },
							  "id": 140,
							  "isConstant": false,
							  "isLValue": false,
							  "isPure": false,
							  "lValueRequested": false,
							  "leftExpression": {
								"argumentTypes": null,
								"expression": {
								  "argumentTypes": null,
								  "id": 137,
								  "name": "msg",
								  "nodeType": "Identifier",
								  "overloadedDeclarations": [],
								  "referencedDeclaration": 1422,
								  "src": "862:3:1",
								  "typeDescriptions": {
									"typeIdentifier": "t_magic_message",
									"typeString": "msg"
								  }
								},
								"id": 138,
								"isConstant": false,
								"isLValue": false,
								"isPure": false,
								"lValueRequested": false,
								"memberName": "sender",
								"nodeType": "MemberAccess",
								"referencedDeclaration": null,
								"src": "862:10:1",
								"typeDescriptions": {
								  "typeIdentifier": "t_address_payable",
								  "typeString": "address payable"
								}
							  },
							  "nodeType": "BinaryOperation",
							  "operator": "==",
							  "rightExpression": {
								"argumentTypes": null,
								"id": 139,
								"name": "dAppAdmin",
								"nodeType": "Identifier",
								"overloadedDeclarations": [],
								"referencedDeclaration": 125,
								"src": "876:9:1",
								"typeDescriptions": {
								  "typeIdentifier": "t_address_payable",
								  "typeString": "address payable"
								}
							  },
							  "src": "862:23:1",
							  "typeDescriptions": {
								"typeIdentifier": "t_bool",
								"typeString": "bool"
							  }
							},
							{
							  "argumentTypes": null,
							  "hexValue": "556e617574686f72697a656420616363657373",
							  "id": 141,
							  "isConstant": false,
							  "isLValue": false,
							  "isPure": true,
							  "kind": "string",
							  "lValueRequested": false,
							  "nodeType": "Literal",
							  "src": "887:21:1",
							  "subdenomination": null,
							  "typeDescriptions": {
								"typeIdentifier": "t_stringliteral_b89edf027d3d1129b9f2c8dcd2ba89ffc6487f04ca050032214e13175a19a74a",
								"typeString": "literal_string \"Unauthorized access\""
							  },
							  "value": "Unauthorized access"
							}
						  ],
						  "expression": {
							"argumentTypes": [
							  {
								"typeIdentifier": "t_bool",
								"typeString": "bool"
							  },
							  {
								"typeIdentifier": "t_stringliteral_b89edf027d3d1129b9f2c8dcd2ba89ffc6487f04ca050032214e13175a19a74a",
								"typeString": "literal_string \"Unauthorized access\""
							  }
							],
							"id": 136,
							"name": "require",
							"nodeType": "Identifier",
							"overloadedDeclarations": [
							  1425,
							  1426
							],
							"referencedDeclaration": 1426,
							"src": "854:7:1",
							"typeDescriptions": {
							  "typeIdentifier": "t_function_require_pure$_t_bool_$_t_string_memory_ptr_$returns$__$",
							  "typeString": "function (bool,string memory) pure"
							}
						  },
						  "id": 142,
						  "isConstant": false,
						  "isLValue": false,
						  "isPure": false,
						  "kind": "functionCall",
						  "lValueRequested": false,
						  "names": [],
						  "nodeType": "FunctionCall",
						  "src": "854:55:1",
						  "typeDescriptions": {
							"typeIdentifier": "t_tuple$__$",
							"typeString": "tuple()"
						  }
						},
						"id": 143,
						"nodeType": "ExpressionStatement",
						"src": "854:55:1"
					  },
					  {
						"id": 144,
						"nodeType": "PlaceholderStatement",
						"src": "920:1:1"
					  }
					]
				  },
				  "documentation": null,
				  "id": 146,
				  "name": "onlyDAppAdmin",
				  "nodeType": "ModifierDefinition",
				  "parameters": {
					"id": 135,
					"nodeType": "ParameterList",
					"parameters": [],
					"src": "841:2:1"
				  },
				  "src": "819:109:1",
				  "visibility": "internal"
				},
				{
				  "body": {
					"id": 159,
					"nodeType": "Block",
					"src": "974:77:1",
					"statements": [
					  {
						"expression": {
						  "argumentTypes": null,
						  "arguments": [
							{
							  "argumentTypes": null,
							  "id": 154,
							  "isConstant": false,
							  "isLValue": false,
							  "isPure": false,
							  "lValueRequested": false,
							  "nodeType": "UnaryOperation",
							  "operator": "!",
							  "prefix": true,
							  "src": "992:18:1",
							  "subExpression": {
								"argumentTypes": null,
								"baseExpression": {
								  "argumentTypes": null,
								  "id": 151,
								  "name": "usedNonces",
								  "nodeType": "Identifier",
								  "overloadedDeclarations": [],
								  "referencedDeclaration": 123,
								  "src": "993:10:1",
								  "typeDescriptions": {
									"typeIdentifier": "t_mapping$_t_uint256_$_t_bool_$",
									"typeString": "mapping(uint256 => bool)"
								  }
								},
								"id": 153,
								"indexExpression": {
								  "argumentTypes": null,
								  "id": 152,
								  "name": "nonce",
								  "nodeType": "Identifier",
								  "overloadedDeclarations": [],
								  "referencedDeclaration": 148,
								  "src": "1004:5:1",
								  "typeDescriptions": {
									"typeIdentifier": "t_uint256",
									"typeString": "uint256"
								  }
								},
								"isConstant": false,
								"isLValue": true,
								"isPure": false,
								"lValueRequested": false,
								"nodeType": "IndexAccess",
								"src": "993:17:1",
								"typeDescriptions": {
								  "typeIdentifier": "t_bool",
								  "typeString": "bool"
								}
							  },
							  "typeDescriptions": {
								"typeIdentifier": "t_bool",
								"typeString": "bool"
							  }
							},
							{
							  "argumentTypes": null,
							  "hexValue": "4e6f6e636520616c72656164792075736564",
							  "id": 155,
							  "isConstant": false,
							  "isLValue": false,
							  "isPure": true,
							  "kind": "string",
							  "lValueRequested": false,
							  "nodeType": "Literal",
							  "src": "1012:20:1",
							  "subdenomination": null,
							  "typeDescriptions": {
								"typeIdentifier": "t_stringliteral_923b8cbbcee77e95e0614b96c81a4cbd157e2cc78e2937caa0bed8e1c5641a28",
								"typeString": "literal_string \"Nonce already used\""
							  },
							  "value": "Nonce already used"
							}
						  ],
						  "expression": {
							"argumentTypes": [
							  {
								"typeIdentifier": "t_bool",
								"typeString": "bool"
							  },
							  {
								"typeIdentifier": "t_stringliteral_923b8cbbcee77e95e0614b96c81a4cbd157e2cc78e2937caa0bed8e1c5641a28",
								"typeString": "literal_string \"Nonce already used\""
							  }
							],
							"id": 150,
							"name": "require",
							"nodeType": "Identifier",
							"overloadedDeclarations": [
							  1425,
							  1426
							],
							"referencedDeclaration": 1426,
							"src": "984:7:1",
							"typeDescriptions": {
							  "typeIdentifier": "t_function_require_pure$_t_bool_$_t_string_memory_ptr_$returns$__$",
							  "typeString": "function (bool,string memory) pure"
							}
						  },
						  "id": 156,
						  "isConstant": false,
						  "isLValue": false,
						  "isPure": false,
						  "kind": "functionCall",
						  "lValueRequested": false,
						  "names": [],
						  "nodeType": "FunctionCall",
						  "src": "984:49:1",
						  "typeDescriptions": {
							"typeIdentifier": "t_tuple$__$",
							"typeString": "tuple()"
						  }
						},
						"id": 157,
						"nodeType": "ExpressionStatement",
						"src": "984:49:1"
					  },
					  {
						"id": 158,
						"nodeType": "PlaceholderStatement",
						"src": "1043:1:1"
					  }
					]
				  },
				  "documentation": null,
				  "id": 160,
				  "name": "preValidateFund",
				  "nodeType": "ModifierDefinition",
				  "parameters": {
					"id": 149,
					"nodeType": "ParameterList",
					"parameters": [
					  {
						"constant": false,
						"id": 148,
						"name": "nonce",
						"nodeType": "VariableDeclaration",
						"scope": 160,
						"src": "959:13:1",
						"stateVariable": false,
						"storageLocation": "default",
						"typeDescriptions": {
						  "typeIdentifier": "t_uint256",
						  "typeString": "uint256"
						},
						"typeName": {
						  "id": 147,
						  "name": "uint256",
						  "nodeType": "ElementaryTypeName",
						  "src": "959:7:1",
						  "typeDescriptions": {
							"typeIdentifier": "t_uint256",
							"typeString": "uint256"
						  }
						},
						"value": null,
						"visibility": "internal"
					  }
					],
					"src": "958:15:1"
				  },
				  "src": "934:117:1",
				  "visibility": "internal"
				},
				{
				  "body": {
					"id": 177,
					"nodeType": "Block",
					"src": "1126:88:1",
					"statements": [
					  {
						"expression": {
						  "argumentTypes": null,
						  "id": 169,
						  "isConstant": false,
						  "isLValue": false,
						  "isPure": false,
						  "lValueRequested": false,
						  "leftHandSide": {
							"argumentTypes": null,
							"id": 167,
							"name": "dAppAdmin",
							"nodeType": "Identifier",
							"overloadedDeclarations": [],
							"referencedDeclaration": 125,
							"src": "1136:9:1",
							"typeDescriptions": {
							  "typeIdentifier": "t_address_payable",
							  "typeString": "address payable"
							}
						  },
						  "nodeType": "Assignment",
						  "operator": "=",
						  "rightHandSide": {
							"argumentTypes": null,
							"id": 168,
							"name": "_dAppAdmin",
							"nodeType": "Identifier",
							"overloadedDeclarations": [],
							"referencedDeclaration": 164,
							"src": "1148:10:1",
							"typeDescriptions": {
							  "typeIdentifier": "t_address_payable",
							  "typeString": "address payable"
							}
						  },
						  "src": "1136:22:1",
						  "typeDescriptions": {
							"typeIdentifier": "t_address_payable",
							"typeString": "address payable"
						  }
						},
						"id": 170,
						"nodeType": "ExpressionStatement",
						"src": "1136:22:1"
					  },
					  {
						"expression": {
						  "argumentTypes": null,
						  "id": 175,
						  "isConstant": false,
						  "isLValue": false,
						  "isPure": false,
						  "lValueRequested": false,
						  "leftHandSide": {
							"argumentTypes": null,
							"id": 171,
							"name": "tokenContract",
							"nodeType": "Identifier",
							"overloadedDeclarations": [],
							"referencedDeclaration": 115,
							"src": "1171:13:1",
							"typeDescriptions": {
							  "typeIdentifier": "t_contract$_ERC20_$1280",
							  "typeString": "contract ERC20"
							}
						  },
						  "nodeType": "Assignment",
						  "operator": "=",
						  "rightHandSide": {
							"argumentTypes": null,
							"arguments": [
							  {
								"argumentTypes": null,
								"id": 173,
								"name": "tokenAddress",
								"nodeType": "Identifier",
								"overloadedDeclarations": [],
								"referencedDeclaration": 162,
								"src": "1193:12:1",
								"typeDescriptions": {
								  "typeIdentifier": "t_address",
								  "typeString": "address"
								}
							  }
							],
							"expression": {
							  "argumentTypes": [
								{
								  "typeIdentifier": "t_address",
								  "typeString": "address"
								}
							  ],
							  "id": 172,
							  "name": "ERC20",
							  "nodeType": "Identifier",
							  "overloadedDeclarations": [],
							  "referencedDeclaration": 1280,
							  "src": "1187:5:1",
							  "typeDescriptions": {
								"typeIdentifier": "t_type$_t_contract$_ERC20_$1280_$",
								"typeString": "type(contract ERC20)"
							  }
							},
							"id": 174,
							"isConstant": false,
							"isLValue": false,
							"isPure": false,
							"kind": "typeConversion",
							"lValueRequested": false,
							"names": [],
							"nodeType": "FunctionCall",
							"src": "1187:19:1",
							"typeDescriptions": {
							  "typeIdentifier": "t_contract$_ERC20_$1280",
							  "typeString": "contract ERC20"
							}
						  },
						  "src": "1171:35:1",
						  "typeDescriptions": {
							"typeIdentifier": "t_contract$_ERC20_$1280",
							"typeString": "contract ERC20"
						  }
						},
						"id": 176,
						"nodeType": "ExpressionStatement",
						"src": "1171:35:1"
					  }
					]
				  },
				  "documentation": null,
				  "id": 178,
				  "implemented": true,
				  "kind": "constructor",
				  "modifiers": [],
				  "name": "",
				  "nodeType": "FunctionDefinition",
				  "parameters": {
					"id": 165,
					"nodeType": "ParameterList",
					"parameters": [
					  {
						"constant": false,
						"id": 162,
						"name": "tokenAddress",
						"nodeType": "VariableDeclaration",
						"scope": 178,
						"src": "1069:20:1",
						"stateVariable": false,
						"storageLocation": "default",
						"typeDescriptions": {
						  "typeIdentifier": "t_address",
						  "typeString": "address"
						},
						"typeName": {
						  "id": 161,
						  "name": "address",
						  "nodeType": "ElementaryTypeName",
						  "src": "1069:7:1",
						  "stateMutability": "nonpayable",
						  "typeDescriptions": {
							"typeIdentifier": "t_address",
							"typeString": "address"
						  }
						},
						"value": null,
						"visibility": "internal"
					  },
					  {
						"constant": false,
						"id": 164,
						"name": "_dAppAdmin",
						"nodeType": "VariableDeclaration",
						"scope": 178,
						"src": "1091:26:1",
						"stateVariable": false,
						"storageLocation": "default",
						"typeDescriptions": {
						  "typeIdentifier": "t_address_payable",
						  "typeString": "address payable"
						},
						"typeName": {
						  "id": 163,
						  "name": "address",
						  "nodeType": "ElementaryTypeName",
						  "src": "1091:15:1",
						  "stateMutability": "payable",
						  "typeDescriptions": {
							"typeIdentifier": "t_address_payable",
							"typeString": "address payable"
						  }
						},
						"value": null,
						"visibility": "internal"
					  }
					],
					"src": "1068:50:1"
				  },
				  "returnParameters": {
					"id": 166,
					"nodeType": "ParameterList",
					"parameters": [],
					"src": "1126:0:1"
				  },
				  "scope": 299,
				  "src": "1057:157:1",
				  "stateMutability": "nonpayable",
				  "superFunction": null,
				  "visibility": "public"
				},
				{
				  "body": {
					"id": 210,
					"nodeType": "Block",
					"src": "1394:183:1",
					"statements": [
					  {
						"assignments": [
						  193
						],
						"declarations": [
						  {
							"constant": false,
							"id": 193,
							"name": "gasLimit",
							"nodeType": "VariableDeclaration",
							"scope": 210,
							"src": "1404:16:1",
							"stateVariable": false,
							"storageLocation": "default",
							"typeDescriptions": {
							  "typeIdentifier": "t_uint256",
							  "typeString": "uint256"
							},
							"typeName": {
							  "id": 192,
							  "name": "uint256",
							  "nodeType": "ElementaryTypeName",
							  "src": "1404:7:1",
							  "typeDescriptions": {
								"typeIdentifier": "t_uint256",
								"typeString": "uint256"
							  }
							},
							"value": null,
							"visibility": "internal"
						  }
						],
						"id": 199,
						"initialValue": {
						  "argumentTypes": null,
						  "arguments": [
							{
							  "argumentTypes": null,
							  "id": 197,
							  "name": "RELAYED_PAYMENT_FUND_FUNCTION_CALL_GAS_USED",
							  "nodeType": "Identifier",
							  "overloadedDeclarations": [],
							  "referencedDeclaration": 134,
							  "src": "1437:43:1",
							  "typeDescriptions": {
								"typeIdentifier": "t_uint256",
								"typeString": "uint256"
							  }
							}
						  ],
						  "expression": {
							"argumentTypes": [
							  {
								"typeIdentifier": "t_uint256",
								"typeString": "uint256"
							  }
							],
							"expression": {
							  "argumentTypes": null,
							  "arguments": [],
							  "expression": {
								"argumentTypes": [],
								"id": 194,
								"name": "gasleft",
								"nodeType": "Identifier",
								"overloadedDeclarations": [],
								"referencedDeclaration": 1415,
								"src": "1423:7:1",
								"typeDescriptions": {
								  "typeIdentifier": "t_function_gasleft_view$__$returns$_t_uint256_$",
								  "typeString": "function () view returns (uint256)"
								}
							  },
							  "id": 195,
							  "isConstant": false,
							  "isLValue": false,
							  "isPure": false,
							  "kind": "functionCall",
							  "lValueRequested": false,
							  "names": [],
							  "nodeType": "FunctionCall",
							  "src": "1423:9:1",
							  "typeDescriptions": {
								"typeIdentifier": "t_uint256",
								"typeString": "uint256"
							  }
							},
							"id": 196,
							"isConstant": false,
							"isLValue": false,
							"isPure": false,
							"lValueRequested": false,
							"memberName": "add",
							"nodeType": "MemberAccess",
							"referencedDeclaration": 827,
							"src": "1423:13:1",
							"typeDescriptions": {
							  "typeIdentifier": "t_function_internal_pure$_t_uint256_$_t_uint256_$returns$_t_uint256_$bound_to$_t_uint256_$",
							  "typeString": "function (uint256,uint256) pure returns (uint256)"
							}
						  },
						  "id": 198,
						  "isConstant": false,
						  "isLValue": false,
						  "isPure": false,
						  "kind": "functionCall",
						  "lValueRequested": false,
						  "names": [],
						  "nodeType": "FunctionCall",
						  "src": "1423:58:1",
						  "typeDescriptions": {
							"typeIdentifier": "t_uint256",
							"typeString": "uint256"
						  }
						},
						"nodeType": "VariableDeclarationStatement",
						"src": "1404:77:1"
					  },
					  {
						"expression": {
						  "argumentTypes": null,
						  "arguments": [
							{
							  "argumentTypes": null,
							  "id": 203,
							  "name": "weiAmount",
							  "nodeType": "Identifier",
							  "overloadedDeclarations": [],
							  "referencedDeclaration": 184,
							  "src": "1523:9:1",
							  "typeDescriptions": {
								"typeIdentifier": "t_uint256",
								"typeString": "uint256"
							  }
							}
						  ],
						  "expression": {
							"argumentTypes": [
							  {
								"typeIdentifier": "t_uint256",
								"typeString": "uint256"
							  }
							],
							"expression": {
							  "argumentTypes": null,
							  "id": 200,
							  "name": "addressToFund",
							  "nodeType": "Identifier",
							  "overloadedDeclarations": [],
							  "referencedDeclaration": 182,
							  "src": "1500:13:1",
							  "typeDescriptions": {
								"typeIdentifier": "t_address_payable",
								"typeString": "address payable"
							  }
							},
							"id": 202,
							"isConstant": false,
							"isLValue": false,
							"isPure": false,
							"lValueRequested": false,
							"memberName": "transfer",
							"nodeType": "MemberAccess",
							"referencedDeclaration": null,
							"src": "1500:22:1",
							"typeDescriptions": {
							  "typeIdentifier": "t_function_transfer_nonpayable$_t_uint256_$returns$__$",
							  "typeString": "function (uint256)"
							}
						  },
						  "id": 204,
						  "isConstant": false,
						  "isLValue": false,
						  "isPure": false,
						  "kind": "functionCall",
						  "lValueRequested": false,
						  "names": [],
						  "nodeType": "FunctionCall",
						  "src": "1500:33:1",
						  "typeDescriptions": {
							"typeIdentifier": "t_tuple$__$",
							"typeString": "tuple()"
						  }
						},
						"id": 205,
						"nodeType": "ExpressionStatement",
						"src": "1500:33:1"
					  },
					  {
						"expression": {
						  "argumentTypes": null,
						  "arguments": [
							{
							  "argumentTypes": null,
							  "id": 207,
							  "name": "gasLimit",
							  "nodeType": "Identifier",
							  "overloadedDeclarations": [],
							  "referencedDeclaration": 193,
							  "src": "1561:8:1",
							  "typeDescriptions": {
								"typeIdentifier": "t_uint256",
								"typeString": "uint256"
							  }
							}
						  ],
						  "expression": {
							"argumentTypes": [
							  {
								"typeIdentifier": "t_uint256",
								"typeString": "uint256"
							  }
							],
							"id": 206,
							"name": "_refundMsgSender",
							"nodeType": "Identifier",
							"overloadedDeclarations": [],
							"referencedDeclaration": 298,
							"src": "1544:16:1",
							"typeDescriptions": {
							  "typeIdentifier": "t_function_internal_nonpayable$_t_uint256_$returns$__$",
							  "typeString": "function (uint256)"
							}
						  },
						  "id": 208,
						  "isConstant": false,
						  "isLValue": false,
						  "isPure": false,
						  "kind": "functionCall",
						  "lValueRequested": false,
						  "names": [],
						  "nodeType": "FunctionCall",
						  "src": "1544:26:1",
						  "typeDescriptions": {
							"typeIdentifier": "t_tuple$__$",
							"typeString": "tuple()"
						  }
						},
						"id": 209,
						"nodeType": "ExpressionStatement",
						"src": "1544:26:1"
					  }
					]
				  },
				  "documentation": null,
				  "id": 211,
				  "implemented": true,
				  "kind": "function",
				  "modifiers": [
					{
					  "arguments": [
						{
						  "argumentTypes": null,
						  "id": 189,
						  "name": "nonce",
						  "nodeType": "Identifier",
						  "overloadedDeclarations": [],
						  "referencedDeclaration": 180,
						  "src": "1383:5:1",
						  "typeDescriptions": {
							"typeIdentifier": "t_uint256",
							"typeString": "uint256"
						  }
						}
					  ],
					  "id": 190,
					  "modifierName": {
						"argumentTypes": null,
						"id": 188,
						"name": "preValidateFund",
						"nodeType": "Identifier",
						"overloadedDeclarations": [],
						"referencedDeclaration": 160,
						"src": "1367:15:1",
						"typeDescriptions": {
						  "typeIdentifier": "t_modifier$_t_uint256_$",
						  "typeString": "modifier (uint256)"
						}
					  },
					  "nodeType": "ModifierInvocation",
					  "src": "1367:22:1"
					}
				  ],
				  "name": "fundForRelayedPayment",
				  "nodeType": "FunctionDefinition",
				  "parameters": {
					"id": 187,
					"nodeType": "ParameterList",
					"parameters": [
					  {
						"constant": false,
						"id": 180,
						"name": "nonce",
						"nodeType": "VariableDeclaration",
						"scope": 211,
						"src": "1254:13:1",
						"stateVariable": false,
						"storageLocation": "default",
						"typeDescriptions": {
						  "typeIdentifier": "t_uint256",
						  "typeString": "uint256"
						},
						"typeName": {
						  "id": 179,
						  "name": "uint256",
						  "nodeType": "ElementaryTypeName",
						  "src": "1254:7:1",
						  "typeDescriptions": {
							"typeIdentifier": "t_uint256",
							"typeString": "uint256"
						  }
						},
						"value": null,
						"visibility": "internal"
					  },
					  {
						"constant": false,
						"id": 182,
						"name": "addressToFund",
						"nodeType": "VariableDeclaration",
						"scope": 211,
						"src": "1269:29:1",
						"stateVariable": false,
						"storageLocation": "default",
						"typeDescriptions": {
						  "typeIdentifier": "t_address_payable",
						  "typeString": "address payable"
						},
						"typeName": {
						  "id": 181,
						  "name": "address",
						  "nodeType": "ElementaryTypeName",
						  "src": "1269:15:1",
						  "stateMutability": "payable",
						  "typeDescriptions": {
							"typeIdentifier": "t_address_payable",
							"typeString": "address payable"
						  }
						},
						"value": null,
						"visibility": "internal"
					  },
					  {
						"constant": false,
						"id": 184,
						"name": "weiAmount",
						"nodeType": "VariableDeclaration",
						"scope": 211,
						"src": "1300:17:1",
						"stateVariable": false,
						"storageLocation": "default",
						"typeDescriptions": {
						  "typeIdentifier": "t_uint256",
						  "typeString": "uint256"
						},
						"typeName": {
						  "id": 183,
						  "name": "uint256",
						  "nodeType": "ElementaryTypeName",
						  "src": "1300:7:1",
						  "typeDescriptions": {
							"typeIdentifier": "t_uint256",
							"typeString": "uint256"
						  }
						},
						"value": null,
						"visibility": "internal"
					  },
					  {
						"constant": false,
						"id": 186,
						"name": "authorizationSignature",
						"nodeType": "VariableDeclaration",
						"scope": 211,
						"src": "1319:35:1",
						"stateVariable": false,
						"storageLocation": "memory",
						"typeDescriptions": {
						  "typeIdentifier": "t_bytes_memory_ptr",
						  "typeString": "bytes"
						},
						"typeName": {
						  "id": 185,
						  "name": "bytes",
						  "nodeType": "ElementaryTypeName",
						  "src": "1319:5:1",
						  "typeDescriptions": {
							"typeIdentifier": "t_bytes_storage_ptr",
							"typeString": "bytes"
						  }
						},
						"value": null,
						"visibility": "internal"
					  }
					],
					"src": "1253:102:1"
				  },
				  "returnParameters": {
					"id": 191,
					"nodeType": "ParameterList",
					"parameters": [],
					"src": "1394:0:1"
				  },
				  "scope": 299,
				  "src": "1223:354:1",
				  "stateMutability": "nonpayable",
				  "superFunction": null,
				  "visibility": "public"
				},
				{
				  "body": {
					"id": 252,
					"nodeType": "Block",
					"src": "1772:232:1",
					"statements": [
					  {
						"assignments": [
						  228
						],
						"declarations": [
						  {
							"constant": false,
							"id": 228,
							"name": "gasLimit",
							"nodeType": "VariableDeclaration",
							"scope": 252,
							"src": "1782:16:1",
							"stateVariable": false,
							"storageLocation": "default",
							"typeDescriptions": {
							  "typeIdentifier": "t_uint256",
							  "typeString": "uint256"
							},
							"typeName": {
							  "id": 227,
							  "name": "uint256",
							  "nodeType": "ElementaryTypeName",
							  "src": "1782:7:1",
							  "typeDescriptions": {
								"typeIdentifier": "t_uint256",
								"typeString": "uint256"
							  }
							},
							"value": null,
							"visibility": "internal"
						  }
						],
						"id": 234,
						"initialValue": {
						  "argumentTypes": null,
						  "arguments": [
							{
							  "argumentTypes": null,
							  "id": 232,
							  "name": "FIAT_PAYMENT_FUND_FUNCTION_CALL_GAS_USED",
							  "nodeType": "Identifier",
							  "overloadedDeclarations": [],
							  "referencedDeclaration": 131,
							  "src": "1815:40:1",
							  "typeDescriptions": {
								"typeIdentifier": "t_uint256",
								"typeString": "uint256"
							  }
							}
						  ],
						  "expression": {
							"argumentTypes": [
							  {
								"typeIdentifier": "t_uint256",
								"typeString": "uint256"
							  }
							],
							"expression": {
							  "argumentTypes": null,
							  "arguments": [],
							  "expression": {
								"argumentTypes": [],
								"id": 229,
								"name": "gasleft",
								"nodeType": "Identifier",
								"overloadedDeclarations": [],
								"referencedDeclaration": 1415,
								"src": "1801:7:1",
								"typeDescriptions": {
								  "typeIdentifier": "t_function_gasleft_view$__$returns$_t_uint256_$",
								  "typeString": "function () view returns (uint256)"
								}
							  },
							  "id": 230,
							  "isConstant": false,
							  "isLValue": false,
							  "isPure": false,
							  "kind": "functionCall",
							  "lValueRequested": false,
							  "names": [],
							  "nodeType": "FunctionCall",
							  "src": "1801:9:1",
							  "typeDescriptions": {
								"typeIdentifier": "t_uint256",
								"typeString": "uint256"
							  }
							},
							"id": 231,
							"isConstant": false,
							"isLValue": false,
							"isPure": false,
							"lValueRequested": false,
							"memberName": "add",
							"nodeType": "MemberAccess",
							"referencedDeclaration": 827,
							"src": "1801:13:1",
							"typeDescriptions": {
							  "typeIdentifier": "t_function_internal_pure$_t_uint256_$_t_uint256_$returns$_t_uint256_$bound_to$_t_uint256_$",
							  "typeString": "function (uint256,uint256) pure returns (uint256)"
							}
						  },
						  "id": 233,
						  "isConstant": false,
						  "isLValue": false,
						  "isPure": false,
						  "kind": "functionCall",
						  "lValueRequested": false,
						  "names": [],
						  "nodeType": "FunctionCall",
						  "src": "1801:55:1",
						  "typeDescriptions": {
							"typeIdentifier": "t_uint256",
							"typeString": "uint256"
						  }
						},
						"nodeType": "VariableDeclarationStatement",
						"src": "1782:74:1"
					  },
					  {
						"expression": {
						  "argumentTypes": null,
						  "arguments": [
							{
							  "argumentTypes": null,
							  "id": 238,
							  "name": "addressToFund",
							  "nodeType": "Identifier",
							  "overloadedDeclarations": [],
							  "referencedDeclaration": 215,
							  "src": "1890:13:1",
							  "typeDescriptions": {
								"typeIdentifier": "t_address_payable",
								"typeString": "address payable"
							  }
							},
							{
							  "argumentTypes": null,
							  "id": 239,
							  "name": "tokenAmount",
							  "nodeType": "Identifier",
							  "overloadedDeclarations": [],
							  "referencedDeclaration": 217,
							  "src": "1905:11:1",
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
							"expression": {
							  "argumentTypes": null,
							  "id": 235,
							  "name": "tokenContract",
							  "nodeType": "Identifier",
							  "overloadedDeclarations": [],
							  "referencedDeclaration": 115,
							  "src": "1867:13:1",
							  "typeDescriptions": {
								"typeIdentifier": "t_contract$_ERC20_$1280",
								"typeString": "contract ERC20"
							  }
							},
							"id": 237,
							"isConstant": false,
							"isLValue": false,
							"isPure": false,
							"lValueRequested": false,
							"memberName": "transfer",
							"nodeType": "MemberAccess",
							"referencedDeclaration": 924,
							"src": "1867:22:1",
							"typeDescriptions": {
							  "typeIdentifier": "t_function_external_nonpayable$_t_address_$_t_uint256_$returns$_t_bool_$",
							  "typeString": "function (address,uint256) external returns (bool)"
							}
						  },
						  "id": 240,
						  "isConstant": false,
						  "isLValue": false,
						  "isPure": false,
						  "kind": "functionCall",
						  "lValueRequested": false,
						  "names": [],
						  "nodeType": "FunctionCall",
						  "src": "1867:50:1",
						  "typeDescriptions": {
							"typeIdentifier": "t_bool",
							"typeString": "bool"
						  }
						},
						"id": 241,
						"nodeType": "ExpressionStatement",
						"src": "1867:50:1"
					  },
					  {
						"expression": {
						  "argumentTypes": null,
						  "arguments": [
							{
							  "argumentTypes": null,
							  "id": 245,
							  "name": "weiAmount",
							  "nodeType": "Identifier",
							  "overloadedDeclarations": [],
							  "referencedDeclaration": 219,
							  "src": "1950:9:1",
							  "typeDescriptions": {
								"typeIdentifier": "t_uint256",
								"typeString": "uint256"
							  }
							}
						  ],
						  "expression": {
							"argumentTypes": [
							  {
								"typeIdentifier": "t_uint256",
								"typeString": "uint256"
							  }
							],
							"expression": {
							  "argumentTypes": null,
							  "id": 242,
							  "name": "addressToFund",
							  "nodeType": "Identifier",
							  "overloadedDeclarations": [],
							  "referencedDeclaration": 215,
							  "src": "1927:13:1",
							  "typeDescriptions": {
								"typeIdentifier": "t_address_payable",
								"typeString": "address payable"
							  }
							},
							"id": 244,
							"isConstant": false,
							"isLValue": false,
							"isPure": false,
							"lValueRequested": false,
							"memberName": "transfer",
							"nodeType": "MemberAccess",
							"referencedDeclaration": null,
							"src": "1927:22:1",
							"typeDescriptions": {
							  "typeIdentifier": "t_function_transfer_nonpayable$_t_uint256_$returns$__$",
							  "typeString": "function (uint256)"
							}
						  },
						  "id": 246,
						  "isConstant": false,
						  "isLValue": false,
						  "isPure": false,
						  "kind": "functionCall",
						  "lValueRequested": false,
						  "names": [],
						  "nodeType": "FunctionCall",
						  "src": "1927:33:1",
						  "typeDescriptions": {
							"typeIdentifier": "t_tuple$__$",
							"typeString": "tuple()"
						  }
						},
						"id": 247,
						"nodeType": "ExpressionStatement",
						"src": "1927:33:1"
					  },
					  {
						"expression": {
						  "argumentTypes": null,
						  "arguments": [
							{
							  "argumentTypes": null,
							  "id": 249,
							  "name": "gasLimit",
							  "nodeType": "Identifier",
							  "overloadedDeclarations": [],
							  "referencedDeclaration": 228,
							  "src": "1988:8:1",
							  "typeDescriptions": {
								"typeIdentifier": "t_uint256",
								"typeString": "uint256"
							  }
							}
						  ],
						  "expression": {
							"argumentTypes": [
							  {
								"typeIdentifier": "t_uint256",
								"typeString": "uint256"
							  }
							],
							"id": 248,
							"name": "_refundMsgSender",
							"nodeType": "Identifier",
							"overloadedDeclarations": [],
							"referencedDeclaration": 298,
							"src": "1971:16:1",
							"typeDescriptions": {
							  "typeIdentifier": "t_function_internal_nonpayable$_t_uint256_$returns$__$",
							  "typeString": "function (uint256)"
							}
						  },
						  "id": 250,
						  "isConstant": false,
						  "isLValue": false,
						  "isPure": false,
						  "kind": "functionCall",
						  "lValueRequested": false,
						  "names": [],
						  "nodeType": "FunctionCall",
						  "src": "1971:26:1",
						  "typeDescriptions": {
							"typeIdentifier": "t_tuple$__$",
							"typeString": "tuple()"
						  }
						},
						"id": 251,
						"nodeType": "ExpressionStatement",
						"src": "1971:26:1"
					  }
					]
				  },
				  "documentation": null,
				  "id": 253,
				  "implemented": true,
				  "kind": "function",
				  "modifiers": [
					{
					  "arguments": [
						{
						  "argumentTypes": null,
						  "id": 224,
						  "name": "nonce",
						  "nodeType": "Identifier",
						  "overloadedDeclarations": [],
						  "referencedDeclaration": 213,
						  "src": "1761:5:1",
						  "typeDescriptions": {
							"typeIdentifier": "t_uint256",
							"typeString": "uint256"
						  }
						}
					  ],
					  "id": 225,
					  "modifierName": {
						"argumentTypes": null,
						"id": 223,
						"name": "preValidateFund",
						"nodeType": "Identifier",
						"overloadedDeclarations": [],
						"referencedDeclaration": 160,
						"src": "1745:15:1",
						"typeDescriptions": {
						  "typeIdentifier": "t_modifier$_t_uint256_$",
						  "typeString": "modifier (uint256)"
						}
					  },
					  "nodeType": "ModifierInvocation",
					  "src": "1745:22:1"
					}
				  ],
				  "name": "fundForFiatPayment",
				  "nodeType": "FunctionDefinition",
				  "parameters": {
					"id": 222,
					"nodeType": "ParameterList",
					"parameters": [
					  {
						"constant": false,
						"id": 213,
						"name": "nonce",
						"nodeType": "VariableDeclaration",
						"scope": 253,
						"src": "1611:13:1",
						"stateVariable": false,
						"storageLocation": "default",
						"typeDescriptions": {
						  "typeIdentifier": "t_uint256",
						  "typeString": "uint256"
						},
						"typeName": {
						  "id": 212,
						  "name": "uint256",
						  "nodeType": "ElementaryTypeName",
						  "src": "1611:7:1",
						  "typeDescriptions": {
							"typeIdentifier": "t_uint256",
							"typeString": "uint256"
						  }
						},
						"value": null,
						"visibility": "internal"
					  },
					  {
						"constant": false,
						"id": 215,
						"name": "addressToFund",
						"nodeType": "VariableDeclaration",
						"scope": 253,
						"src": "1626:29:1",
						"stateVariable": false,
						"storageLocation": "default",
						"typeDescriptions": {
						  "typeIdentifier": "t_address_payable",
						  "typeString": "address payable"
						},
						"typeName": {
						  "id": 214,
						  "name": "address",
						  "nodeType": "ElementaryTypeName",
						  "src": "1626:15:1",
						  "stateMutability": "payable",
						  "typeDescriptions": {
							"typeIdentifier": "t_address_payable",
							"typeString": "address payable"
						  }
						},
						"value": null,
						"visibility": "internal"
					  },
					  {
						"constant": false,
						"id": 217,
						"name": "tokenAmount",
						"nodeType": "VariableDeclaration",
						"scope": 253,
						"src": "1657:19:1",
						"stateVariable": false,
						"storageLocation": "default",
						"typeDescriptions": {
						  "typeIdentifier": "t_uint256",
						  "typeString": "uint256"
						},
						"typeName": {
						  "id": 216,
						  "name": "uint256",
						  "nodeType": "ElementaryTypeName",
						  "src": "1657:7:1",
						  "typeDescriptions": {
							"typeIdentifier": "t_uint256",
							"typeString": "uint256"
						  }
						},
						"value": null,
						"visibility": "internal"
					  },
					  {
						"constant": false,
						"id": 219,
						"name": "weiAmount",
						"nodeType": "VariableDeclaration",
						"scope": 253,
						"src": "1678:17:1",
						"stateVariable": false,
						"storageLocation": "default",
						"typeDescriptions": {
						  "typeIdentifier": "t_uint256",
						  "typeString": "uint256"
						},
						"typeName": {
						  "id": 218,
						  "name": "uint256",
						  "nodeType": "ElementaryTypeName",
						  "src": "1678:7:1",
						  "typeDescriptions": {
							"typeIdentifier": "t_uint256",
							"typeString": "uint256"
						  }
						},
						"value": null,
						"visibility": "internal"
					  },
					  {
						"constant": false,
						"id": 221,
						"name": "authorizationSignature",
						"nodeType": "VariableDeclaration",
						"scope": 253,
						"src": "1697:35:1",
						"stateVariable": false,
						"storageLocation": "memory",
						"typeDescriptions": {
						  "typeIdentifier": "t_bytes_memory_ptr",
						  "typeString": "bytes"
						},
						"typeName": {
						  "id": 220,
						  "name": "bytes",
						  "nodeType": "ElementaryTypeName",
						  "src": "1697:5:1",
						  "typeDescriptions": {
							"typeIdentifier": "t_bytes_storage_ptr",
							"typeString": "bytes"
						  }
						},
						"value": null,
						"visibility": "internal"
					  }
					],
					"src": "1610:123:1"
				  },
				  "returnParameters": {
					"id": 226,
					"nodeType": "ParameterList",
					"parameters": [],
					"src": "1772:0:1"
				  },
				  "scope": 299,
				  "src": "1583:421:1",
				  "stateMutability": "nonpayable",
				  "superFunction": null,
				  "visibility": "public"
				},
				{
				  "body": {
					"id": 268,
					"nodeType": "Block",
					"src": "2096:57:1",
					"statements": [
					  {
						"expression": {
						  "argumentTypes": null,
						  "arguments": [
							{
							  "argumentTypes": null,
							  "id": 264,
							  "name": "raw",
							  "nodeType": "Identifier",
							  "overloadedDeclarations": [],
							  "referencedDeclaration": 255,
							  "src": "2137:3:1",
							  "typeDescriptions": {
								"typeIdentifier": "t_bytes32",
								"typeString": "bytes32"
							  }
							},
							{
							  "argumentTypes": null,
							  "id": 265,
							  "name": "sig",
							  "nodeType": "Identifier",
							  "overloadedDeclarations": [],
							  "referencedDeclaration": 257,
							  "src": "2142:3:1",
							  "typeDescriptions": {
								"typeIdentifier": "t_bytes_memory_ptr",
								"typeString": "bytes memory"
							  }
							}
						  ],
						  "expression": {
							"argumentTypes": [
							  {
								"typeIdentifier": "t_bytes32",
								"typeString": "bytes32"
							  },
							  {
								"typeIdentifier": "t_bytes_memory_ptr",
								"typeString": "bytes memory"
							  }
							],
							"expression": {
							  "argumentTypes": null,
							  "id": 262,
							  "name": "ECTools",
							  "nodeType": "Identifier",
							  "overloadedDeclarations": [],
							  "referencedDeclaration": 105,
							  "src": "2113:7:1",
							  "typeDescriptions": {
								"typeIdentifier": "t_type$_t_contract$_ECTools_$105_$",
								"typeString": "type(library ECTools)"
							  }
							},
							"id": 263,
							"isConstant": false,
							"isLValue": false,
							"isPure": false,
							"lValueRequested": false,
							"memberName": "prefixedRecover",
							"nodeType": "MemberAccess",
							"referencedDeclaration": 104,
							"src": "2113:23:1",
							"typeDescriptions": {
							  "typeIdentifier": "t_function_delegatecall_pure$_t_bytes32_$_t_bytes_memory_ptr_$returns$_t_address_$",
							  "typeString": "function (bytes32,bytes memory) pure returns (address)"
							}
						  },
						  "id": 266,
						  "isConstant": false,
						  "isLValue": false,
						  "isPure": false,
						  "kind": "functionCall",
						  "lValueRequested": false,
						  "names": [],
						  "nodeType": "FunctionCall",
						  "src": "2113:33:1",
						  "typeDescriptions": {
							"typeIdentifier": "t_address",
							"typeString": "address"
						  }
						},
						"functionReturnParameters": 261,
						"id": 267,
						"nodeType": "Return",
						"src": "2106:40:1"
					  }
					]
				  },
				  "documentation": null,
				  "id": 269,
				  "implemented": true,
				  "kind": "function",
				  "modifiers": [],
				  "name": "getSigner",
				  "nodeType": "FunctionDefinition",
				  "parameters": {
					"id": 258,
					"nodeType": "ParameterList",
					"parameters": [
					  {
						"constant": false,
						"id": 255,
						"name": "raw",
						"nodeType": "VariableDeclaration",
						"scope": 269,
						"src": "2029:11:1",
						"stateVariable": false,
						"storageLocation": "default",
						"typeDescriptions": {
						  "typeIdentifier": "t_bytes32",
						  "typeString": "bytes32"
						},
						"typeName": {
						  "id": 254,
						  "name": "bytes32",
						  "nodeType": "ElementaryTypeName",
						  "src": "2029:7:1",
						  "typeDescriptions": {
							"typeIdentifier": "t_bytes32",
							"typeString": "bytes32"
						  }
						},
						"value": null,
						"visibility": "internal"
					  },
					  {
						"constant": false,
						"id": 257,
						"name": "sig",
						"nodeType": "VariableDeclaration",
						"scope": 269,
						"src": "2042:16:1",
						"stateVariable": false,
						"storageLocation": "memory",
						"typeDescriptions": {
						  "typeIdentifier": "t_bytes_memory_ptr",
						  "typeString": "bytes"
						},
						"typeName": {
						  "id": 256,
						  "name": "bytes",
						  "nodeType": "ElementaryTypeName",
						  "src": "2042:5:1",
						  "typeDescriptions": {
							"typeIdentifier": "t_bytes_storage_ptr",
							"typeString": "bytes"
						  }
						},
						"value": null,
						"visibility": "internal"
					  }
					],
					"src": "2028:31:1"
				  },
				  "returnParameters": {
					"id": 261,
					"nodeType": "ParameterList",
					"parameters": [
					  {
						"constant": false,
						"id": 260,
						"name": "signer",
						"nodeType": "VariableDeclaration",
						"scope": 269,
						"src": "2080:14:1",
						"stateVariable": false,
						"storageLocation": "default",
						"typeDescriptions": {
						  "typeIdentifier": "t_address",
						  "typeString": "address"
						},
						"typeName": {
						  "id": 259,
						  "name": "address",
						  "nodeType": "ElementaryTypeName",
						  "src": "2080:7:1",
						  "stateMutability": "nonpayable",
						  "typeDescriptions": {
							"typeIdentifier": "t_address",
							"typeString": "address"
						  }
						},
						"value": null,
						"visibility": "internal"
					  }
					],
					"src": "2079:16:1"
				  },
				  "scope": 299,
				  "src": "2010:143:1",
				  "stateMutability": "pure",
				  "superFunction": null,
				  "visibility": "public"
				},
				{
				  "body": {
					"id": 297,
					"nodeType": "Block",
					"src": "2212:153:1",
					"statements": [
					  {
						"assignments": [
						  275
						],
						"declarations": [
						  {
							"constant": false,
							"id": 275,
							"name": "refundAmount",
							"nodeType": "VariableDeclaration",
							"scope": 297,
							"src": "2222:20:1",
							"stateVariable": false,
							"storageLocation": "default",
							"typeDescriptions": {
							  "typeIdentifier": "t_uint256",
							  "typeString": "uint256"
							},
							"typeName": {
							  "id": 274,
							  "name": "uint256",
							  "nodeType": "ElementaryTypeName",
							  "src": "2222:7:1",
							  "typeDescriptions": {
								"typeIdentifier": "t_uint256",
								"typeString": "uint256"
							  }
							},
							"value": null,
							"visibility": "internal"
						  }
						],
						"id": 288,
						"initialValue": {
						  "argumentTypes": null,
						  "arguments": [
							{
							  "argumentTypes": null,
							  "expression": {
								"argumentTypes": null,
								"id": 285,
								"name": "tx",
								"nodeType": "Identifier",
								"overloadedDeclarations": [],
								"referencedDeclaration": 1434,
								"src": "2303:2:1",
								"typeDescriptions": {
								  "typeIdentifier": "t_magic_transaction",
								  "typeString": "tx"
								}
							  },
							  "id": 286,
							  "isConstant": false,
							  "isLValue": false,
							  "isPure": false,
							  "lValueRequested": false,
							  "memberName": "gasprice",
							  "nodeType": "MemberAccess",
							  "referencedDeclaration": null,
							  "src": "2303:11:1",
							  "typeDescriptions": {
								"typeIdentifier": "t_uint256",
								"typeString": "uint256"
							  }
							}
						  ],
						  "expression": {
							"argumentTypes": [
							  {
								"typeIdentifier": "t_uint256",
								"typeString": "uint256"
							  }
							],
							"expression": {
							  "argumentTypes": null,
							  "arguments": [
								{
								  "argumentTypes": null,
								  "id": 282,
								  "name": "REFUNDING_LOGIC_GAS_COST",
								  "nodeType": "Identifier",
								  "overloadedDeclarations": [],
								  "referencedDeclaration": 128,
								  "src": "2273:24:1",
								  "typeDescriptions": {
									"typeIdentifier": "t_uint256",
									"typeString": "uint256"
								  }
								}
							  ],
							  "expression": {
								"argumentTypes": [
								  {
									"typeIdentifier": "t_uint256",
									"typeString": "uint256"
								  }
								],
								"expression": {
								  "argumentTypes": null,
								  "arguments": [
									{
									  "argumentTypes": null,
									  "arguments": [],
									  "expression": {
										"argumentTypes": [],
										"id": 278,
										"name": "gasleft",
										"nodeType": "Identifier",
										"overloadedDeclarations": [],
										"referencedDeclaration": 1415,
										"src": "2258:7:1",
										"typeDescriptions": {
										  "typeIdentifier": "t_function_gasleft_view$__$returns$_t_uint256_$",
										  "typeString": "function () view returns (uint256)"
										}
									  },
									  "id": 279,
									  "isConstant": false,
									  "isLValue": false,
									  "isPure": false,
									  "kind": "functionCall",
									  "lValueRequested": false,
									  "names": [],
									  "nodeType": "FunctionCall",
									  "src": "2258:9:1",
									  "typeDescriptions": {
										"typeIdentifier": "t_uint256",
										"typeString": "uint256"
									  }
									}
								  ],
								  "expression": {
									"argumentTypes": [
									  {
										"typeIdentifier": "t_uint256",
										"typeString": "uint256"
									  }
									],
									"expression": {
									  "argumentTypes": null,
									  "id": 276,
									  "name": "gasLimit",
									  "nodeType": "Identifier",
									  "overloadedDeclarations": [],
									  "referencedDeclaration": 271,
									  "src": "2245:8:1",
									  "typeDescriptions": {
										"typeIdentifier": "t_uint256",
										"typeString": "uint256"
									  }
									},
									"id": 277,
									"isConstant": false,
									"isLValue": false,
									"isPure": false,
									"lValueRequested": false,
									"memberName": "sub",
									"nodeType": "MemberAccess",
									"referencedDeclaration": 803,
									"src": "2245:12:1",
									"typeDescriptions": {
									  "typeIdentifier": "t_function_internal_pure$_t_uint256_$_t_uint256_$returns$_t_uint256_$bound_to$_t_uint256_$",
									  "typeString": "function (uint256,uint256) pure returns (uint256)"
									}
								  },
								  "id": 280,
								  "isConstant": false,
								  "isLValue": false,
								  "isPure": false,
								  "kind": "functionCall",
								  "lValueRequested": false,
								  "names": [],
								  "nodeType": "FunctionCall",
								  "src": "2245:23:1",
								  "typeDescriptions": {
									"typeIdentifier": "t_uint256",
									"typeString": "uint256"
								  }
								},
								"id": 281,
								"isConstant": false,
								"isLValue": false,
								"isPure": false,
								"lValueRequested": false,
								"memberName": "add",
								"nodeType": "MemberAccess",
								"referencedDeclaration": 827,
								"src": "2245:27:1",
								"typeDescriptions": {
								  "typeIdentifier": "t_function_internal_pure$_t_uint256_$_t_uint256_$returns$_t_uint256_$bound_to$_t_uint256_$",
								  "typeString": "function (uint256,uint256) pure returns (uint256)"
								}
							  },
							  "id": 283,
							  "isConstant": false,
							  "isLValue": false,
							  "isPure": false,
							  "kind": "functionCall",
							  "lValueRequested": false,
							  "names": [],
							  "nodeType": "FunctionCall",
							  "src": "2245:53:1",
							  "typeDescriptions": {
								"typeIdentifier": "t_uint256",
								"typeString": "uint256"
							  }
							},
							"id": 284,
							"isConstant": false,
							"isLValue": false,
							"isPure": false,
							"lValueRequested": false,
							"memberName": "mul",
							"nodeType": "MemberAccess",
							"referencedDeclaration": 755,
							"src": "2245:57:1",
							"typeDescriptions": {
							  "typeIdentifier": "t_function_internal_pure$_t_uint256_$_t_uint256_$returns$_t_uint256_$bound_to$_t_uint256_$",
							  "typeString": "function (uint256,uint256) pure returns (uint256)"
							}
						  },
						  "id": 287,
						  "isConstant": false,
						  "isLValue": false,
						  "isPure": false,
						  "kind": "functionCall",
						  "lValueRequested": false,
						  "names": [],
						  "nodeType": "FunctionCall",
						  "src": "2245:70:1",
						  "typeDescriptions": {
							"typeIdentifier": "t_uint256",
							"typeString": "uint256"
						  }
						},
						"nodeType": "VariableDeclarationStatement",
						"src": "2222:93:1"
					  },
					  {
						"expression": {
						  "argumentTypes": null,
						  "arguments": [
							{
							  "argumentTypes": null,
							  "id": 294,
							  "name": "refundAmount",
							  "nodeType": "Identifier",
							  "overloadedDeclarations": [],
							  "referencedDeclaration": 275,
							  "src": "2345:12:1",
							  "typeDescriptions": {
								"typeIdentifier": "t_uint256",
								"typeString": "uint256"
							  }
							}
						  ],
						  "expression": {
							"argumentTypes": [
							  {
								"typeIdentifier": "t_uint256",
								"typeString": "uint256"
							  }
							],
							"expression": {
							  "argumentTypes": null,
							  "expression": {
								"argumentTypes": null,
								"id": 289,
								"name": "msg",
								"nodeType": "Identifier",
								"overloadedDeclarations": [],
								"referencedDeclaration": 1422,
								"src": "2325:3:1",
								"typeDescriptions": {
								  "typeIdentifier": "t_magic_message",
								  "typeString": "msg"
								}
							  },
							  "id": 292,
							  "isConstant": false,
							  "isLValue": false,
							  "isPure": false,
							  "lValueRequested": false,
							  "memberName": "sender",
							  "nodeType": "MemberAccess",
							  "referencedDeclaration": null,
							  "src": "2325:10:1",
							  "typeDescriptions": {
								"typeIdentifier": "t_address_payable",
								"typeString": "address payable"
							  }
							},
							"id": 293,
							"isConstant": false,
							"isLValue": false,
							"isPure": false,
							"lValueRequested": false,
							"memberName": "transfer",
							"nodeType": "MemberAccess",
							"referencedDeclaration": null,
							"src": "2325:19:1",
							"typeDescriptions": {
							  "typeIdentifier": "t_function_transfer_nonpayable$_t_uint256_$returns$__$",
							  "typeString": "function (uint256)"
							}
						  },
						  "id": 295,
						  "isConstant": false,
						  "isLValue": false,
						  "isPure": false,
						  "kind": "functionCall",
						  "lValueRequested": false,
						  "names": [],
						  "nodeType": "FunctionCall",
						  "src": "2325:33:1",
						  "typeDescriptions": {
							"typeIdentifier": "t_tuple$__$",
							"typeString": "tuple()"
						  }
						},
						"id": 296,
						"nodeType": "ExpressionStatement",
						"src": "2325:33:1"
					  }
					]
				  },
				  "documentation": null,
				  "id": 298,
				  "implemented": true,
				  "kind": "function",
				  "modifiers": [],
				  "name": "_refundMsgSender",
				  "nodeType": "FunctionDefinition",
				  "parameters": {
					"id": 272,
					"nodeType": "ParameterList",
					"parameters": [
					  {
						"constant": false,
						"id": 271,
						"name": "gasLimit",
						"nodeType": "VariableDeclaration",
						"scope": 298,
						"src": "2185:16:1",
						"stateVariable": false,
						"storageLocation": "default",
						"typeDescriptions": {
						  "typeIdentifier": "t_uint256",
						  "typeString": "uint256"
						},
						"typeName": {
						  "id": 270,
						  "name": "uint256",
						  "nodeType": "ElementaryTypeName",
						  "src": "2185:7:1",
						  "typeDescriptions": {
							"typeIdentifier": "t_uint256",
							"typeString": "uint256"
						  }
						},
						"value": null,
						"visibility": "internal"
					  }
					],
					"src": "2184:18:1"
				  },
				  "returnParameters": {
					"id": 273,
					"nodeType": "ParameterList",
					"parameters": [],
					"src": "2212:0:1"
				  },
				  "scope": 299,
				  "src": "2159:206:1",
				  "stateMutability": "nonpayable",
				  "superFunction": null,
				  "visibility": "internal"
				}
			  ],
			  "scope": 300,
			  "src": "252:2115:1"
			}
		  ],
		  "src": "0:2367:1"
		},
		"compiler": {
		  "name": "solc",
		  "version": "0.5.1+commit.c8a2cb62.Emscripten.clang",
		  "optimizer": false,
		  "runs": 200
		},
		"networks": {},
		"schemaVersion": "1.1.2",
		"updatedAt": "2019-05-14T07:25:36.227Z"
}

module.exports = compiledEscrowContract;