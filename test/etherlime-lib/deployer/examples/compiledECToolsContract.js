const compiledECToolsContract = {
		"contractName": "ECTools",
		"abi": [
		  {
			"constant": true,
			"inputs": [
			  {
				"name": "originalMessage",
				"type": "bytes32"
			  },
			  {
				"name": "signedMessage",
				"type": "bytes"
			  }
			],
			"name": "recover",
			"outputs": [
			  {
				"name": "",
				"type": "address"
			  }
			],
			"payable": false,
			"stateMutability": "pure",
			"type": "function"
		  },
		  {
			"constant": true,
			"inputs": [
			  {
				"name": "_msg",
				"type": "bytes32"
			  }
			],
			"name": "toEthereumSignedMessage",
			"outputs": [
			  {
				"name": "",
				"type": "bytes32"
			  }
			],
			"payable": false,
			"stateMutability": "pure",
			"type": "function"
		  },
		  {
			"constant": true,
			"inputs": [
			  {
				"name": "_msg",
				"type": "bytes32"
			  },
			  {
				"name": "sig",
				"type": "bytes"
			  }
			],
			"name": "prefixedRecover",
			"outputs": [
			  {
				"name": "",
				"type": "address"
			  }
			],
			"payable": false,
			"stateMutability": "pure",
			"type": "function"
		  }
		],
		"bytecode": "0x6104aa610030600b82828239805160001a6073146000811461002057610022565bfe5b5030600052607381538281f3fe7300000000000000000000000000000000000000003014608060405260043610610068576000357c01000000000000000000000000000000000000000000000000000000009004806319045a251461006d578063380388f114610172578063fc960e1514610277575b600080fd5b6101306004803603604081101561008357600080fd5b8101908080359060200190929190803590602001906401000000008111156100aa57600080fd5b8201836020820111156100bc57600080fd5b803590602001918460018302840111640100000000831117156100de57600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f8201169050808301925050505050505091929192905050506102b9565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b6102356004803603604081101561018857600080fd5b8101908080359060200190929190803590602001906401000000008111156101af57600080fd5b8201836020820111156101c157600080fd5b803590602001918460018302840111640100000000831117156101e357600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f82011690508083019250505050505050919291929050505061039d565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b6102a36004803603602081101561028d57600080fd5b81019080803590602001909291905050506103be565b6040518082815260200191505060405180910390f35b600080600080604185511415156102d65760009350505050610397565b6020850151925060408501519150606085015160001a9050601b8160ff16101561030157601b810190505b601b8160ff16141580156103195750601c8160ff1614155b1561032a5760009350505050610397565b60018682858560405160008152602001604052604051808581526020018460ff1660ff1681526020018381526020018281526020019450505050506020604051602081039080840390855afa158015610387573d6000803e3d6000fd5b5050506020604051035193505050505b92915050565b6000806103a9846103be565b90506103b581846102b9565b91505092915050565b600060606040805190810160405280601c81526020017f19457468657265756d205369676e6564204d6573736167653a0a333200000000815250905080836040516020018083805190602001908083835b602083101515610434578051825260208201915060208101905060208303925061040f565b6001836020036101000a038019825116818451168082178552505050505050905001828152602001925050506040516020818303038152906040528051906020012091505091905056fea165627a7a72305820dd3b962d07d04dfe860147bd01a0d3c4bc795d7c4c68e325a79b265c68f1107a0029",
		"deployedBytecode": "0x7300000000000000000000000000000000000000003014608060405260043610610068576000357c01000000000000000000000000000000000000000000000000000000009004806319045a251461006d578063380388f114610172578063fc960e1514610277575b600080fd5b6101306004803603604081101561008357600080fd5b8101908080359060200190929190803590602001906401000000008111156100aa57600080fd5b8201836020820111156100bc57600080fd5b803590602001918460018302840111640100000000831117156100de57600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f8201169050808301925050505050505091929192905050506102b9565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b6102356004803603604081101561018857600080fd5b8101908080359060200190929190803590602001906401000000008111156101af57600080fd5b8201836020820111156101c157600080fd5b803590602001918460018302840111640100000000831117156101e357600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f82011690508083019250505050505050919291929050505061039d565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b6102a36004803603602081101561028d57600080fd5b81019080803590602001909291905050506103be565b6040518082815260200191505060405180910390f35b600080600080604185511415156102d65760009350505050610397565b6020850151925060408501519150606085015160001a9050601b8160ff16101561030157601b810190505b601b8160ff16141580156103195750601c8160ff1614155b1561032a5760009350505050610397565b60018682858560405160008152602001604052604051808581526020018460ff1660ff1681526020018381526020018281526020019450505050506020604051602081039080840390855afa158015610387573d6000803e3d6000fd5b5050506020604051035193505050505b92915050565b6000806103a9846103be565b90506103b581846102b9565b91505092915050565b600060606040805190810160405280601c81526020017f19457468657265756d205369676e6564204d6573736167653a0a333200000000815250905080836040516020018083805190602001908083835b602083101515610434578051825260208201915060208101905060208303925061040f565b6001836020036101000a038019825116818451168082178552505050505050905001828152602001925050506040516020818303038152906040528051906020012091505091905056fea165627a7a72305820dd3b962d07d04dfe860147bd01a0d3c4bc795d7c4c68e325a79b265c68f1107a0029",
		"sourceMap": "24:1578:0:-;;132:2:-1;166:7;155:9;146:7;137:37;252:7;246:14;243:1;238:23;232:4;229:33;270:1;265:20;;;;222:63;;265:20;274:9;222:63;;298:9;295:1;288:20;328:4;319:7;311:22;352:7;343;336:24",
		"deployedSourceMap": "24:1578:0:-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;301:880;;;;;;13:2:-1;8:3;5:11;2:2;;;29:1;26;19:12;2:2;301:880:0;;;;;;;;;;;;;;;;;;;21:11:-1;8;5:28;2:2;;;46:1;43;36:12;2:2;301:880:0;;35:9:-1;28:4;12:14;8:25;5:40;2:2;;;58:1;55;48:12;2:2;301:880:0;;;;;;100:9:-1;95:1;81:12;77:20;67:8;63:35;60:50;39:11;25:12;22:29;11:107;8:2;;;131:1;128;121:12;8:2;301:880:0;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;30:3:-1;22:6;14;1:33;99:1;93:3;85:6;81:16;74:27;137:4;133:9;126:4;121:3;117:14;113:30;106:37;;169:3;161:6;157:16;147:26;;301:880:0;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;1401:199;;;;;;13:2:-1;8:3;5:11;2:2;;;29:1;26;19:12;2:2;1401:199:0;;;;;;;;;;;;;;;;;;;21:11:-1;8;5:28;2:2;;;46:1;43;36:12;2:2;1401:199:0;;35:9:-1;28:4;12:14;8:25;5:40;2:2;;;58:1;55;48:12;2:2;1401:199:0;;;;;;100:9:-1;95:1;81:12;77:20;67:8;63:35;60:50;39:11;25:12;22:29;11:107;8:2;;;131:1;128;121:12;8:2;1401:199:0;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;30:3:-1;22:6;14;1:33;99:1;93:3;85:6;81:16;74:27;137:4;133:9;126:4;121:3;117:14;113:30;106:37;;169:3;161:6;157:16;147:26;;1401:199:0;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;1187:208;;;;;;13:2:-1;8:3;5:11;2:2;;;29:1;26;19:12;2:2;1187:208:0;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;301:880;392:7;411:9;430;449:7;532:2;508:13;:20;:26;;504:76;;;566:1;550:19;;;;;;;504:76;699:2;684:13;680:22;674:29;669:34;;746:2;731:13;727:22;721:29;716:34;;801:2;786:13;782:22;776:29;773:1;768:38;763:43;;925:2;921:1;:6;;;917:44;;;948:2;943:7;;;;917:44;1043:2;1038:1;:7;;;;:18;;;;;1054:2;1049:1;:7;;;;1038:18;1034:141;;;1088:1;1072:19;;;;;;;1034:141;1129:35;1139:15;1156:1;1159;1162;1129:35;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;8:9:-1;5:2;;;45:16;42:1;39;24:38;77:16;74:1;67:27;5:2;1129:35:0;;;;;;;;1122:42;;;;;301:880;;;;;:::o;1401:199::-;1479:7;1498:20;1521:29;1545:4;1521:23;:29::i;:::-;1498:52;;1567:26;1575:12;1589:3;1567:7;:26::i;:::-;1560:33;;;1401:199;;;;:::o;1187:208::-;1255:7;1274:19;:56;;;;;;;;;;;;;;;;;;;;1374:6;1382:4;1357:30;;;;;;;;;;;;;;;36:153:-1;66:2;61:3;58:11;51:19;36:153;;;182:3;176:10;171:3;164:23;98:2;93:3;89:12;82:19;;123:2;118:3;114:12;107:19;;148:2;143:3;139:12;132:19;;36:153;;;274:1;267:3;263:2;259:12;254:3;250:22;246:30;315:4;311:9;305:3;299:10;295:26;356:4;350:3;344:10;340:21;389:7;380;377:20;372:3;365:33;3:399;;;1357:30:0;;;;;;;;;;;;;;;;;49:4:-1;39:7;30;26:21;22:32;13:7;6:49;1357:30:0;;;1347:41;;;;;;1340:48;;;1187:208;;;:::o",
		"source": "pragma solidity 0.5.1;\n\nlibrary ECTools {\n\n  /**\n   * @dev Recover signer address from a message by using his signature\n   * @param originalMessage bytes32 message, the originalMessage is the signed message. What is recovered is the signer address.\n   * @param signedMessage bytes signature\n   */\n    function recover(bytes32 originalMessage, bytes memory signedMessage) public pure returns (address) {\n        bytes32 r;\n        bytes32 s;\n        uint8 v;\n\n        //Check the signature length\n        if (signedMessage.length != 65) {\n            return (address(0));\n        }\n\n        // Divide the signature in r, s and v variables\n        assembly {\n            r := mload(add(signedMessage, 32))\n            s := mload(add(signedMessage, 64))\n            v := byte(0, mload(add(signedMessage, 96)))\n        }\n\n        // Version of signature should be 27 or 28, but 0 and 1 are also possible versions\n        if (v < 27) {\n            v += 27;\n        }\n\n        // If the version is correct return the signer address\n        if (v != 27 && v != 28) {\n            return (address(0));\n        } else {\n            return ecrecover(originalMessage, v, r, s);\n        }\n    }\n\n    function toEthereumSignedMessage(bytes32 _msg) public pure returns (bytes32) {\n        bytes memory prefix = \"\\x19Ethereum Signed Message:\\n32\";\n        return keccak256(abi.encodePacked(prefix, _msg));\n    }\n\n    function prefixedRecover(bytes32 _msg, bytes memory sig) public pure returns (address) {\n        bytes32 ethSignedMsg = toEthereumSignedMessage(_msg);\n        return recover(ethSignedMsg, sig);\n    }\n}",
		"sourcePath": "/Users/ognyanchikov/limepay-contracts/smart-contracts/contracts/ECTools.sol",
		"ast": {
		  "absolutePath": "/Users/ognyanchikov/limepay-contracts/smart-contracts/contracts/ECTools.sol",
		  "exportedSymbols": {
			"ECTools": [
			  105
			]
		  },
		  "id": 106,
		  "nodeType": "SourceUnit",
		  "nodes": [
			{
			  "id": 1,
			  "literals": [
				"solidity",
				"0.5",
				".1"
			  ],
			  "nodeType": "PragmaDirective",
			  "src": "0:22:0"
			},
			{
			  "baseContracts": [],
			  "contractDependencies": [],
			  "contractKind": "library",
			  "documentation": null,
			  "fullyImplemented": true,
			  "id": 105,
			  "linearizedBaseContracts": [
				105
			  ],
			  "name": "ECTools",
			  "nodeType": "ContractDefinition",
			  "nodes": [
				{
				  "body": {
					"id": 62,
					"nodeType": "Block",
					"src": "401:780:0",
					"statements": [
					  {
						"assignments": [
						  11
						],
						"declarations": [
						  {
							"constant": false,
							"id": 11,
							"name": "r",
							"nodeType": "VariableDeclaration",
							"scope": 62,
							"src": "411:9:0",
							"stateVariable": false,
							"storageLocation": "default",
							"typeDescriptions": {
							  "typeIdentifier": "t_bytes32",
							  "typeString": "bytes32"
							},
							"typeName": {
							  "id": 10,
							  "name": "bytes32",
							  "nodeType": "ElementaryTypeName",
							  "src": "411:7:0",
							  "typeDescriptions": {
								"typeIdentifier": "t_bytes32",
								"typeString": "bytes32"
							  }
							},
							"value": null,
							"visibility": "internal"
						  }
						],
						"id": 12,
						"initialValue": null,
						"nodeType": "VariableDeclarationStatement",
						"src": "411:9:0"
					  },
					  {
						"assignments": [
						  14
						],
						"declarations": [
						  {
							"constant": false,
							"id": 14,
							"name": "s",
							"nodeType": "VariableDeclaration",
							"scope": 62,
							"src": "430:9:0",
							"stateVariable": false,
							"storageLocation": "default",
							"typeDescriptions": {
							  "typeIdentifier": "t_bytes32",
							  "typeString": "bytes32"
							},
							"typeName": {
							  "id": 13,
							  "name": "bytes32",
							  "nodeType": "ElementaryTypeName",
							  "src": "430:7:0",
							  "typeDescriptions": {
								"typeIdentifier": "t_bytes32",
								"typeString": "bytes32"
							  }
							},
							"value": null,
							"visibility": "internal"
						  }
						],
						"id": 15,
						"initialValue": null,
						"nodeType": "VariableDeclarationStatement",
						"src": "430:9:0"
					  },
					  {
						"assignments": [
						  17
						],
						"declarations": [
						  {
							"constant": false,
							"id": 17,
							"name": "v",
							"nodeType": "VariableDeclaration",
							"scope": 62,
							"src": "449:7:0",
							"stateVariable": false,
							"storageLocation": "default",
							"typeDescriptions": {
							  "typeIdentifier": "t_uint8",
							  "typeString": "uint8"
							},
							"typeName": {
							  "id": 16,
							  "name": "uint8",
							  "nodeType": "ElementaryTypeName",
							  "src": "449:5:0",
							  "typeDescriptions": {
								"typeIdentifier": "t_uint8",
								"typeString": "uint8"
							  }
							},
							"value": null,
							"visibility": "internal"
						  }
						],
						"id": 18,
						"initialValue": null,
						"nodeType": "VariableDeclarationStatement",
						"src": "449:7:0"
					  },
					  {
						"condition": {
						  "argumentTypes": null,
						  "commonType": {
							"typeIdentifier": "t_uint256",
							"typeString": "uint256"
						  },
						  "id": 22,
						  "isConstant": false,
						  "isLValue": false,
						  "isPure": false,
						  "lValueRequested": false,
						  "leftExpression": {
							"argumentTypes": null,
							"expression": {
							  "argumentTypes": null,
							  "id": 19,
							  "name": "signedMessage",
							  "nodeType": "Identifier",
							  "overloadedDeclarations": [],
							  "referencedDeclaration": 5,
							  "src": "508:13:0",
							  "typeDescriptions": {
								"typeIdentifier": "t_bytes_memory_ptr",
								"typeString": "bytes memory"
							  }
							},
							"id": 20,
							"isConstant": false,
							"isLValue": false,
							"isPure": false,
							"lValueRequested": false,
							"memberName": "length",
							"nodeType": "MemberAccess",
							"referencedDeclaration": null,
							"src": "508:20:0",
							"typeDescriptions": {
							  "typeIdentifier": "t_uint256",
							  "typeString": "uint256"
							}
						  },
						  "nodeType": "BinaryOperation",
						  "operator": "!=",
						  "rightExpression": {
							"argumentTypes": null,
							"hexValue": "3635",
							"id": 21,
							"isConstant": false,
							"isLValue": false,
							"isPure": true,
							"kind": "number",
							"lValueRequested": false,
							"nodeType": "Literal",
							"src": "532:2:0",
							"subdenomination": null,
							"typeDescriptions": {
							  "typeIdentifier": "t_rational_65_by_1",
							  "typeString": "int_const 65"
							},
							"value": "65"
						  },
						  "src": "508:26:0",
						  "typeDescriptions": {
							"typeIdentifier": "t_bool",
							"typeString": "bool"
						  }
						},
						"falseBody": null,
						"id": 29,
						"nodeType": "IfStatement",
						"src": "504:76:0",
						"trueBody": {
						  "id": 28,
						  "nodeType": "Block",
						  "src": "536:44:0",
						  "statements": [
							{
							  "expression": {
								"argumentTypes": null,
								"components": [
								  {
									"argumentTypes": null,
									"arguments": [
									  {
										"argumentTypes": null,
										"hexValue": "30",
										"id": 24,
										"isConstant": false,
										"isLValue": false,
										"isPure": true,
										"kind": "number",
										"lValueRequested": false,
										"nodeType": "Literal",
										"src": "566:1:0",
										"subdenomination": null,
										"typeDescriptions": {
										  "typeIdentifier": "t_rational_0_by_1",
										  "typeString": "int_const 0"
										},
										"value": "0"
									  }
									],
									"expression": {
									  "argumentTypes": [
										{
										  "typeIdentifier": "t_rational_0_by_1",
										  "typeString": "int_const 0"
										}
									  ],
									  "id": 23,
									  "isConstant": false,
									  "isLValue": false,
									  "isPure": true,
									  "lValueRequested": false,
									  "nodeType": "ElementaryTypeNameExpression",
									  "src": "558:7:0",
									  "typeDescriptions": {
										"typeIdentifier": "t_type$_t_address_$",
										"typeString": "type(address)"
									  },
									  "typeName": "address"
									},
									"id": 25,
									"isConstant": false,
									"isLValue": false,
									"isPure": true,
									"kind": "typeConversion",
									"lValueRequested": false,
									"names": [],
									"nodeType": "FunctionCall",
									"src": "558:10:0",
									"typeDescriptions": {
									  "typeIdentifier": "t_address_payable",
									  "typeString": "address payable"
									}
								  }
								],
								"id": 26,
								"isConstant": false,
								"isInlineArray": false,
								"isLValue": false,
								"isPure": true,
								"lValueRequested": false,
								"nodeType": "TupleExpression",
								"src": "557:12:0",
								"typeDescriptions": {
								  "typeIdentifier": "t_address_payable",
								  "typeString": "address payable"
								}
							  },
							  "functionReturnParameters": 9,
							  "id": 27,
							  "nodeType": "Return",
							  "src": "550:19:0"
							}
						  ]
						}
					  },
					  {
						"externalReferences": [
						  {
							"r": {
							  "declaration": 11,
							  "isOffset": false,
							  "isSlot": false,
							  "src": "669:1:0",
							  "valueSize": 1
							}
						  },
						  {
							"signedMessage": {
							  "declaration": 5,
							  "isOffset": false,
							  "isSlot": false,
							  "src": "684:13:0",
							  "valueSize": 1
							}
						  },
						  {
							"s": {
							  "declaration": 14,
							  "isOffset": false,
							  "isSlot": false,
							  "src": "716:1:0",
							  "valueSize": 1
							}
						  },
						  {
							"signedMessage": {
							  "declaration": 5,
							  "isOffset": false,
							  "isSlot": false,
							  "src": "731:13:0",
							  "valueSize": 1
							}
						  },
						  {
							"v": {
							  "declaration": 17,
							  "isOffset": false,
							  "isSlot": false,
							  "src": "763:1:0",
							  "valueSize": 1
							}
						  },
						  {
							"signedMessage": {
							  "declaration": 5,
							  "isOffset": false,
							  "isSlot": false,
							  "src": "786:13:0",
							  "valueSize": 1
							}
						  }
						],
						"id": 30,
						"nodeType": "InlineAssembly",
						"operations": "{\n    r := mload(add(signedMessage, 32))\n    s := mload(add(signedMessage, 64))\n    v := byte(0, mload(add(signedMessage, 96)))\n}",
						"src": "646:273:0"
					  },
					  {
						"condition": {
						  "argumentTypes": null,
						  "commonType": {
							"typeIdentifier": "t_uint8",
							"typeString": "uint8"
						  },
						  "id": 33,
						  "isConstant": false,
						  "isLValue": false,
						  "isPure": false,
						  "lValueRequested": false,
						  "leftExpression": {
							"argumentTypes": null,
							"id": 31,
							"name": "v",
							"nodeType": "Identifier",
							"overloadedDeclarations": [],
							"referencedDeclaration": 17,
							"src": "921:1:0",
							"typeDescriptions": {
							  "typeIdentifier": "t_uint8",
							  "typeString": "uint8"
							}
						  },
						  "nodeType": "BinaryOperation",
						  "operator": "<",
						  "rightExpression": {
							"argumentTypes": null,
							"hexValue": "3237",
							"id": 32,
							"isConstant": false,
							"isLValue": false,
							"isPure": true,
							"kind": "number",
							"lValueRequested": false,
							"nodeType": "Literal",
							"src": "925:2:0",
							"subdenomination": null,
							"typeDescriptions": {
							  "typeIdentifier": "t_rational_27_by_1",
							  "typeString": "int_const 27"
							},
							"value": "27"
						  },
						  "src": "921:6:0",
						  "typeDescriptions": {
							"typeIdentifier": "t_bool",
							"typeString": "bool"
						  }
						},
						"falseBody": null,
						"id": 39,
						"nodeType": "IfStatement",
						"src": "917:44:0",
						"trueBody": {
						  "id": 38,
						  "nodeType": "Block",
						  "src": "929:32:0",
						  "statements": [
							{
							  "expression": {
								"argumentTypes": null,
								"id": 36,
								"isConstant": false,
								"isLValue": false,
								"isPure": false,
								"lValueRequested": false,
								"leftHandSide": {
								  "argumentTypes": null,
								  "id": 34,
								  "name": "v",
								  "nodeType": "Identifier",
								  "overloadedDeclarations": [],
								  "referencedDeclaration": 17,
								  "src": "943:1:0",
								  "typeDescriptions": {
									"typeIdentifier": "t_uint8",
									"typeString": "uint8"
								  }
								},
								"nodeType": "Assignment",
								"operator": "+=",
								"rightHandSide": {
								  "argumentTypes": null,
								  "hexValue": "3237",
								  "id": 35,
								  "isConstant": false,
								  "isLValue": false,
								  "isPure": true,
								  "kind": "number",
								  "lValueRequested": false,
								  "nodeType": "Literal",
								  "src": "948:2:0",
								  "subdenomination": null,
								  "typeDescriptions": {
									"typeIdentifier": "t_rational_27_by_1",
									"typeString": "int_const 27"
								  },
								  "value": "27"
								},
								"src": "943:7:0",
								"typeDescriptions": {
								  "typeIdentifier": "t_uint8",
								  "typeString": "uint8"
								}
							  },
							  "id": 37,
							  "nodeType": "ExpressionStatement",
							  "src": "943:7:0"
							}
						  ]
						}
					  },
					  {
						"condition": {
						  "argumentTypes": null,
						  "commonType": {
							"typeIdentifier": "t_bool",
							"typeString": "bool"
						  },
						  "id": 46,
						  "isConstant": false,
						  "isLValue": false,
						  "isPure": false,
						  "lValueRequested": false,
						  "leftExpression": {
							"argumentTypes": null,
							"commonType": {
							  "typeIdentifier": "t_uint8",
							  "typeString": "uint8"
							},
							"id": 42,
							"isConstant": false,
							"isLValue": false,
							"isPure": false,
							"lValueRequested": false,
							"leftExpression": {
							  "argumentTypes": null,
							  "id": 40,
							  "name": "v",
							  "nodeType": "Identifier",
							  "overloadedDeclarations": [],
							  "referencedDeclaration": 17,
							  "src": "1038:1:0",
							  "typeDescriptions": {
								"typeIdentifier": "t_uint8",
								"typeString": "uint8"
							  }
							},
							"nodeType": "BinaryOperation",
							"operator": "!=",
							"rightExpression": {
							  "argumentTypes": null,
							  "hexValue": "3237",
							  "id": 41,
							  "isConstant": false,
							  "isLValue": false,
							  "isPure": true,
							  "kind": "number",
							  "lValueRequested": false,
							  "nodeType": "Literal",
							  "src": "1043:2:0",
							  "subdenomination": null,
							  "typeDescriptions": {
								"typeIdentifier": "t_rational_27_by_1",
								"typeString": "int_const 27"
							  },
							  "value": "27"
							},
							"src": "1038:7:0",
							"typeDescriptions": {
							  "typeIdentifier": "t_bool",
							  "typeString": "bool"
							}
						  },
						  "nodeType": "BinaryOperation",
						  "operator": "&&",
						  "rightExpression": {
							"argumentTypes": null,
							"commonType": {
							  "typeIdentifier": "t_uint8",
							  "typeString": "uint8"
							},
							"id": 45,
							"isConstant": false,
							"isLValue": false,
							"isPure": false,
							"lValueRequested": false,
							"leftExpression": {
							  "argumentTypes": null,
							  "id": 43,
							  "name": "v",
							  "nodeType": "Identifier",
							  "overloadedDeclarations": [],
							  "referencedDeclaration": 17,
							  "src": "1049:1:0",
							  "typeDescriptions": {
								"typeIdentifier": "t_uint8",
								"typeString": "uint8"
							  }
							},
							"nodeType": "BinaryOperation",
							"operator": "!=",
							"rightExpression": {
							  "argumentTypes": null,
							  "hexValue": "3238",
							  "id": 44,
							  "isConstant": false,
							  "isLValue": false,
							  "isPure": true,
							  "kind": "number",
							  "lValueRequested": false,
							  "nodeType": "Literal",
							  "src": "1054:2:0",
							  "subdenomination": null,
							  "typeDescriptions": {
								"typeIdentifier": "t_rational_28_by_1",
								"typeString": "int_const 28"
							  },
							  "value": "28"
							},
							"src": "1049:7:0",
							"typeDescriptions": {
							  "typeIdentifier": "t_bool",
							  "typeString": "bool"
							}
						  },
						  "src": "1038:18:0",
						  "typeDescriptions": {
							"typeIdentifier": "t_bool",
							"typeString": "bool"
						  }
						},
						"falseBody": {
						  "id": 60,
						  "nodeType": "Block",
						  "src": "1108:67:0",
						  "statements": [
							{
							  "expression": {
								"argumentTypes": null,
								"arguments": [
								  {
									"argumentTypes": null,
									"id": 54,
									"name": "originalMessage",
									"nodeType": "Identifier",
									"overloadedDeclarations": [],
									"referencedDeclaration": 3,
									"src": "1139:15:0",
									"typeDescriptions": {
									  "typeIdentifier": "t_bytes32",
									  "typeString": "bytes32"
									}
								  },
								  {
									"argumentTypes": null,
									"id": 55,
									"name": "v",
									"nodeType": "Identifier",
									"overloadedDeclarations": [],
									"referencedDeclaration": 17,
									"src": "1156:1:0",
									"typeDescriptions": {
									  "typeIdentifier": "t_uint8",
									  "typeString": "uint8"
									}
								  },
								  {
									"argumentTypes": null,
									"id": 56,
									"name": "r",
									"nodeType": "Identifier",
									"overloadedDeclarations": [],
									"referencedDeclaration": 11,
									"src": "1159:1:0",
									"typeDescriptions": {
									  "typeIdentifier": "t_bytes32",
									  "typeString": "bytes32"
									}
								  },
								  {
									"argumentTypes": null,
									"id": 57,
									"name": "s",
									"nodeType": "Identifier",
									"overloadedDeclarations": [],
									"referencedDeclaration": 14,
									"src": "1162:1:0",
									"typeDescriptions": {
									  "typeIdentifier": "t_bytes32",
									  "typeString": "bytes32"
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
									  "typeIdentifier": "t_uint8",
									  "typeString": "uint8"
									},
									{
									  "typeIdentifier": "t_bytes32",
									  "typeString": "bytes32"
									},
									{
									  "typeIdentifier": "t_bytes32",
									  "typeString": "bytes32"
									}
								  ],
								  "id": 53,
								  "name": "ecrecover",
								  "nodeType": "Identifier",
								  "overloadedDeclarations": [],
								  "referencedDeclaration": 1546,
								  "src": "1129:9:0",
								  "typeDescriptions": {
									"typeIdentifier": "t_function_ecrecover_pure$_t_bytes32_$_t_uint8_$_t_bytes32_$_t_bytes32_$returns$_t_address_$",
									"typeString": "function (bytes32,uint8,bytes32,bytes32) pure returns (address)"
								  }
								},
								"id": 58,
								"isConstant": false,
								"isLValue": false,
								"isPure": false,
								"kind": "functionCall",
								"lValueRequested": false,
								"names": [],
								"nodeType": "FunctionCall",
								"src": "1129:35:0",
								"typeDescriptions": {
								  "typeIdentifier": "t_address",
								  "typeString": "address"
								}
							  },
							  "functionReturnParameters": 9,
							  "id": 59,
							  "nodeType": "Return",
							  "src": "1122:42:0"
							}
						  ]
						},
						"id": 61,
						"nodeType": "IfStatement",
						"src": "1034:141:0",
						"trueBody": {
						  "id": 52,
						  "nodeType": "Block",
						  "src": "1058:44:0",
						  "statements": [
							{
							  "expression": {
								"argumentTypes": null,
								"components": [
								  {
									"argumentTypes": null,
									"arguments": [
									  {
										"argumentTypes": null,
										"hexValue": "30",
										"id": 48,
										"isConstant": false,
										"isLValue": false,
										"isPure": true,
										"kind": "number",
										"lValueRequested": false,
										"nodeType": "Literal",
										"src": "1088:1:0",
										"subdenomination": null,
										"typeDescriptions": {
										  "typeIdentifier": "t_rational_0_by_1",
										  "typeString": "int_const 0"
										},
										"value": "0"
									  }
									],
									"expression": {
									  "argumentTypes": [
										{
										  "typeIdentifier": "t_rational_0_by_1",
										  "typeString": "int_const 0"
										}
									  ],
									  "id": 47,
									  "isConstant": false,
									  "isLValue": false,
									  "isPure": true,
									  "lValueRequested": false,
									  "nodeType": "ElementaryTypeNameExpression",
									  "src": "1080:7:0",
									  "typeDescriptions": {
										"typeIdentifier": "t_type$_t_address_$",
										"typeString": "type(address)"
									  },
									  "typeName": "address"
									},
									"id": 49,
									"isConstant": false,
									"isLValue": false,
									"isPure": true,
									"kind": "typeConversion",
									"lValueRequested": false,
									"names": [],
									"nodeType": "FunctionCall",
									"src": "1080:10:0",
									"typeDescriptions": {
									  "typeIdentifier": "t_address_payable",
									  "typeString": "address payable"
									}
								  }
								],
								"id": 50,
								"isConstant": false,
								"isInlineArray": false,
								"isLValue": false,
								"isPure": true,
								"lValueRequested": false,
								"nodeType": "TupleExpression",
								"src": "1079:12:0",
								"typeDescriptions": {
								  "typeIdentifier": "t_address_payable",
								  "typeString": "address payable"
								}
							  },
							  "functionReturnParameters": 9,
							  "id": 51,
							  "nodeType": "Return",
							  "src": "1072:19:0"
							}
						  ]
						}
					  }
					]
				  },
				  "documentation": "@dev Recover signer address from a message by using his signature\n@param originalMessage bytes32 message, the originalMessage is the signed message. What is recovered is the signer address.\n@param signedMessage bytes signature",
				  "id": 63,
				  "implemented": true,
				  "kind": "function",
				  "modifiers": [],
				  "name": "recover",
				  "nodeType": "FunctionDefinition",
				  "parameters": {
					"id": 6,
					"nodeType": "ParameterList",
					"parameters": [
					  {
						"constant": false,
						"id": 3,
						"name": "originalMessage",
						"nodeType": "VariableDeclaration",
						"scope": 63,
						"src": "318:23:0",
						"stateVariable": false,
						"storageLocation": "default",
						"typeDescriptions": {
						  "typeIdentifier": "t_bytes32",
						  "typeString": "bytes32"
						},
						"typeName": {
						  "id": 2,
						  "name": "bytes32",
						  "nodeType": "ElementaryTypeName",
						  "src": "318:7:0",
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
						"id": 5,
						"name": "signedMessage",
						"nodeType": "VariableDeclaration",
						"scope": 63,
						"src": "343:26:0",
						"stateVariable": false,
						"storageLocation": "memory",
						"typeDescriptions": {
						  "typeIdentifier": "t_bytes_memory_ptr",
						  "typeString": "bytes"
						},
						"typeName": {
						  "id": 4,
						  "name": "bytes",
						  "nodeType": "ElementaryTypeName",
						  "src": "343:5:0",
						  "typeDescriptions": {
							"typeIdentifier": "t_bytes_storage_ptr",
							"typeString": "bytes"
						  }
						},
						"value": null,
						"visibility": "internal"
					  }
					],
					"src": "317:53:0"
				  },
				  "returnParameters": {
					"id": 9,
					"nodeType": "ParameterList",
					"parameters": [
					  {
						"constant": false,
						"id": 8,
						"name": "",
						"nodeType": "VariableDeclaration",
						"scope": 63,
						"src": "392:7:0",
						"stateVariable": false,
						"storageLocation": "default",
						"typeDescriptions": {
						  "typeIdentifier": "t_address",
						  "typeString": "address"
						},
						"typeName": {
						  "id": 7,
						  "name": "address",
						  "nodeType": "ElementaryTypeName",
						  "src": "392:7:0",
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
					"src": "391:9:0"
				  },
				  "scope": 105,
				  "src": "301:880:0",
				  "stateMutability": "pure",
				  "superFunction": null,
				  "visibility": "public"
				},
				{
				  "body": {
					"id": 82,
					"nodeType": "Block",
					"src": "1264:131:0",
					"statements": [
					  {
						"assignments": [
						  71
						],
						"declarations": [
						  {
							"constant": false,
							"id": 71,
							"name": "prefix",
							"nodeType": "VariableDeclaration",
							"scope": 82,
							"src": "1274:19:0",
							"stateVariable": false,
							"storageLocation": "memory",
							"typeDescriptions": {
							  "typeIdentifier": "t_bytes_memory_ptr",
							  "typeString": "bytes"
							},
							"typeName": {
							  "id": 70,
							  "name": "bytes",
							  "nodeType": "ElementaryTypeName",
							  "src": "1274:5:0",
							  "typeDescriptions": {
								"typeIdentifier": "t_bytes_storage_ptr",
								"typeString": "bytes"
							  }
							},
							"value": null,
							"visibility": "internal"
						  }
						],
						"id": 73,
						"initialValue": {
						  "argumentTypes": null,
						  "hexValue": "19457468657265756d205369676e6564204d6573736167653a0a3332",
						  "id": 72,
						  "isConstant": false,
						  "isLValue": false,
						  "isPure": true,
						  "kind": "string",
						  "lValueRequested": false,
						  "nodeType": "Literal",
						  "src": "1296:34:0",
						  "subdenomination": null,
						  "typeDescriptions": {
							"typeIdentifier": "t_stringliteral_178a2411ab6fbc1ba11064408972259c558d0e82fd48b0aba3ad81d14f065e73",
							"typeString": "literal_string \"\u0019Ethereum Signed Message:\n32\""
						  },
						  "value": "\u0019Ethereum Signed Message:\n32"
						},
						"nodeType": "VariableDeclarationStatement",
						"src": "1274:56:0"
					  },
					  {
						"expression": {
						  "argumentTypes": null,
						  "arguments": [
							{
							  "argumentTypes": null,
							  "arguments": [
								{
								  "argumentTypes": null,
								  "id": 77,
								  "name": "prefix",
								  "nodeType": "Identifier",
								  "overloadedDeclarations": [],
								  "referencedDeclaration": 71,
								  "src": "1374:6:0",
								  "typeDescriptions": {
									"typeIdentifier": "t_bytes_memory_ptr",
									"typeString": "bytes memory"
								  }
								},
								{
								  "argumentTypes": null,
								  "id": 78,
								  "name": "_msg",
								  "nodeType": "Identifier",
								  "overloadedDeclarations": [],
								  "referencedDeclaration": 65,
								  "src": "1382:4:0",
								  "typeDescriptions": {
									"typeIdentifier": "t_bytes32",
									"typeString": "bytes32"
								  }
								}
							  ],
							  "expression": {
								"argumentTypes": [
								  {
									"typeIdentifier": "t_bytes_memory_ptr",
									"typeString": "bytes memory"
								  },
								  {
									"typeIdentifier": "t_bytes32",
									"typeString": "bytes32"
								  }
								],
								"expression": {
								  "argumentTypes": null,
								  "id": 75,
								  "name": "abi",
								  "nodeType": "Identifier",
								  "overloadedDeclarations": [],
								  "referencedDeclaration": 1541,
								  "src": "1357:3:0",
								  "typeDescriptions": {
									"typeIdentifier": "t_magic_abi",
									"typeString": "abi"
								  }
								},
								"id": 76,
								"isConstant": false,
								"isLValue": false,
								"isPure": true,
								"lValueRequested": false,
								"memberName": "encodePacked",
								"nodeType": "MemberAccess",
								"referencedDeclaration": null,
								"src": "1357:16:0",
								"typeDescriptions": {
								  "typeIdentifier": "t_function_abiencodepacked_pure$__$returns$_t_bytes_memory_ptr_$",
								  "typeString": "function () pure returns (bytes memory)"
								}
							  },
							  "id": 79,
							  "isConstant": false,
							  "isLValue": false,
							  "isPure": false,
							  "kind": "functionCall",
							  "lValueRequested": false,
							  "names": [],
							  "nodeType": "FunctionCall",
							  "src": "1357:30:0",
							  "typeDescriptions": {
								"typeIdentifier": "t_bytes_memory_ptr",
								"typeString": "bytes memory"
							  }
							}
						  ],
						  "expression": {
							"argumentTypes": [
							  {
								"typeIdentifier": "t_bytes_memory_ptr",
								"typeString": "bytes memory"
							  }
							],
							"id": 74,
							"name": "keccak256",
							"nodeType": "Identifier",
							"overloadedDeclarations": [],
							"referencedDeclaration": 1548,
							"src": "1347:9:0",
							"typeDescriptions": {
							  "typeIdentifier": "t_function_keccak256_pure$_t_bytes_memory_ptr_$returns$_t_bytes32_$",
							  "typeString": "function (bytes memory) pure returns (bytes32)"
							}
						  },
						  "id": 80,
						  "isConstant": false,
						  "isLValue": false,
						  "isPure": false,
						  "kind": "functionCall",
						  "lValueRequested": false,
						  "names": [],
						  "nodeType": "FunctionCall",
						  "src": "1347:41:0",
						  "typeDescriptions": {
							"typeIdentifier": "t_bytes32",
							"typeString": "bytes32"
						  }
						},
						"functionReturnParameters": 69,
						"id": 81,
						"nodeType": "Return",
						"src": "1340:48:0"
					  }
					]
				  },
				  "documentation": null,
				  "id": 83,
				  "implemented": true,
				  "kind": "function",
				  "modifiers": [],
				  "name": "toEthereumSignedMessage",
				  "nodeType": "FunctionDefinition",
				  "parameters": {
					"id": 66,
					"nodeType": "ParameterList",
					"parameters": [
					  {
						"constant": false,
						"id": 65,
						"name": "_msg",
						"nodeType": "VariableDeclaration",
						"scope": 83,
						"src": "1220:12:0",
						"stateVariable": false,
						"storageLocation": "default",
						"typeDescriptions": {
						  "typeIdentifier": "t_bytes32",
						  "typeString": "bytes32"
						},
						"typeName": {
						  "id": 64,
						  "name": "bytes32",
						  "nodeType": "ElementaryTypeName",
						  "src": "1220:7:0",
						  "typeDescriptions": {
							"typeIdentifier": "t_bytes32",
							"typeString": "bytes32"
						  }
						},
						"value": null,
						"visibility": "internal"
					  }
					],
					"src": "1219:14:0"
				  },
				  "returnParameters": {
					"id": 69,
					"nodeType": "ParameterList",
					"parameters": [
					  {
						"constant": false,
						"id": 68,
						"name": "",
						"nodeType": "VariableDeclaration",
						"scope": 83,
						"src": "1255:7:0",
						"stateVariable": false,
						"storageLocation": "default",
						"typeDescriptions": {
						  "typeIdentifier": "t_bytes32",
						  "typeString": "bytes32"
						},
						"typeName": {
						  "id": 67,
						  "name": "bytes32",
						  "nodeType": "ElementaryTypeName",
						  "src": "1255:7:0",
						  "typeDescriptions": {
							"typeIdentifier": "t_bytes32",
							"typeString": "bytes32"
						  }
						},
						"value": null,
						"visibility": "internal"
					  }
					],
					"src": "1254:9:0"
				  },
				  "scope": 105,
				  "src": "1187:208:0",
				  "stateMutability": "pure",
				  "superFunction": null,
				  "visibility": "public"
				},
				{
				  "body": {
					"id": 103,
					"nodeType": "Block",
					"src": "1488:112:0",
					"statements": [
					  {
						"assignments": [
						  93
						],
						"declarations": [
						  {
							"constant": false,
							"id": 93,
							"name": "ethSignedMsg",
							"nodeType": "VariableDeclaration",
							"scope": 103,
							"src": "1498:20:0",
							"stateVariable": false,
							"storageLocation": "default",
							"typeDescriptions": {
							  "typeIdentifier": "t_bytes32",
							  "typeString": "bytes32"
							},
							"typeName": {
							  "id": 92,
							  "name": "bytes32",
							  "nodeType": "ElementaryTypeName",
							  "src": "1498:7:0",
							  "typeDescriptions": {
								"typeIdentifier": "t_bytes32",
								"typeString": "bytes32"
							  }
							},
							"value": null,
							"visibility": "internal"
						  }
						],
						"id": 97,
						"initialValue": {
						  "argumentTypes": null,
						  "arguments": [
							{
							  "argumentTypes": null,
							  "id": 95,
							  "name": "_msg",
							  "nodeType": "Identifier",
							  "overloadedDeclarations": [],
							  "referencedDeclaration": 85,
							  "src": "1545:4:0",
							  "typeDescriptions": {
								"typeIdentifier": "t_bytes32",
								"typeString": "bytes32"
							  }
							}
						  ],
						  "expression": {
							"argumentTypes": [
							  {
								"typeIdentifier": "t_bytes32",
								"typeString": "bytes32"
							  }
							],
							"id": 94,
							"name": "toEthereumSignedMessage",
							"nodeType": "Identifier",
							"overloadedDeclarations": [],
							"referencedDeclaration": 83,
							"src": "1521:23:0",
							"typeDescriptions": {
							  "typeIdentifier": "t_function_internal_pure$_t_bytes32_$returns$_t_bytes32_$",
							  "typeString": "function (bytes32) pure returns (bytes32)"
							}
						  },
						  "id": 96,
						  "isConstant": false,
						  "isLValue": false,
						  "isPure": false,
						  "kind": "functionCall",
						  "lValueRequested": false,
						  "names": [],
						  "nodeType": "FunctionCall",
						  "src": "1521:29:0",
						  "typeDescriptions": {
							"typeIdentifier": "t_bytes32",
							"typeString": "bytes32"
						  }
						},
						"nodeType": "VariableDeclarationStatement",
						"src": "1498:52:0"
					  },
					  {
						"expression": {
						  "argumentTypes": null,
						  "arguments": [
							{
							  "argumentTypes": null,
							  "id": 99,
							  "name": "ethSignedMsg",
							  "nodeType": "Identifier",
							  "overloadedDeclarations": [],
							  "referencedDeclaration": 93,
							  "src": "1575:12:0",
							  "typeDescriptions": {
								"typeIdentifier": "t_bytes32",
								"typeString": "bytes32"
							  }
							},
							{
							  "argumentTypes": null,
							  "id": 100,
							  "name": "sig",
							  "nodeType": "Identifier",
							  "overloadedDeclarations": [],
							  "referencedDeclaration": 87,
							  "src": "1589:3:0",
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
							"id": 98,
							"name": "recover",
							"nodeType": "Identifier",
							"overloadedDeclarations": [],
							"referencedDeclaration": 63,
							"src": "1567:7:0",
							"typeDescriptions": {
							  "typeIdentifier": "t_function_internal_pure$_t_bytes32_$_t_bytes_memory_ptr_$returns$_t_address_$",
							  "typeString": "function (bytes32,bytes memory) pure returns (address)"
							}
						  },
						  "id": 101,
						  "isConstant": false,
						  "isLValue": false,
						  "isPure": false,
						  "kind": "functionCall",
						  "lValueRequested": false,
						  "names": [],
						  "nodeType": "FunctionCall",
						  "src": "1567:26:0",
						  "typeDescriptions": {
							"typeIdentifier": "t_address",
							"typeString": "address"
						  }
						},
						"functionReturnParameters": 91,
						"id": 102,
						"nodeType": "Return",
						"src": "1560:33:0"
					  }
					]
				  },
				  "documentation": null,
				  "id": 104,
				  "implemented": true,
				  "kind": "function",
				  "modifiers": [],
				  "name": "prefixedRecover",
				  "nodeType": "FunctionDefinition",
				  "parameters": {
					"id": 88,
					"nodeType": "ParameterList",
					"parameters": [
					  {
						"constant": false,
						"id": 85,
						"name": "_msg",
						"nodeType": "VariableDeclaration",
						"scope": 104,
						"src": "1426:12:0",
						"stateVariable": false,
						"storageLocation": "default",
						"typeDescriptions": {
						  "typeIdentifier": "t_bytes32",
						  "typeString": "bytes32"
						},
						"typeName": {
						  "id": 84,
						  "name": "bytes32",
						  "nodeType": "ElementaryTypeName",
						  "src": "1426:7:0",
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
						"id": 87,
						"name": "sig",
						"nodeType": "VariableDeclaration",
						"scope": 104,
						"src": "1440:16:0",
						"stateVariable": false,
						"storageLocation": "memory",
						"typeDescriptions": {
						  "typeIdentifier": "t_bytes_memory_ptr",
						  "typeString": "bytes"
						},
						"typeName": {
						  "id": 86,
						  "name": "bytes",
						  "nodeType": "ElementaryTypeName",
						  "src": "1440:5:0",
						  "typeDescriptions": {
							"typeIdentifier": "t_bytes_storage_ptr",
							"typeString": "bytes"
						  }
						},
						"value": null,
						"visibility": "internal"
					  }
					],
					"src": "1425:32:0"
				  },
				  "returnParameters": {
					"id": 91,
					"nodeType": "ParameterList",
					"parameters": [
					  {
						"constant": false,
						"id": 90,
						"name": "",
						"nodeType": "VariableDeclaration",
						"scope": 104,
						"src": "1479:7:0",
						"stateVariable": false,
						"storageLocation": "default",
						"typeDescriptions": {
						  "typeIdentifier": "t_address",
						  "typeString": "address"
						},
						"typeName": {
						  "id": 89,
						  "name": "address",
						  "nodeType": "ElementaryTypeName",
						  "src": "1479:7:0",
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
					"src": "1478:9:0"
				  },
				  "scope": 105,
				  "src": "1401:199:0",
				  "stateMutability": "pure",
				  "superFunction": null,
				  "visibility": "public"
				}
			  ],
			  "scope": 106,
			  "src": "24:1578:0"
			}
		  ],
		  "src": "0:1602:0"
		},
		"legacyAST": {
		  "absolutePath": "/Users/ognyanchikov/limepay-contracts/smart-contracts/contracts/ECTools.sol",
		  "exportedSymbols": {
			"ECTools": [
			  105
			]
		  },
		  "id": 106,
		  "nodeType": "SourceUnit",
		  "nodes": [
			{
			  "id": 1,
			  "literals": [
				"solidity",
				"0.5",
				".1"
			  ],
			  "nodeType": "PragmaDirective",
			  "src": "0:22:0"
			},
			{
			  "baseContracts": [],
			  "contractDependencies": [],
			  "contractKind": "library",
			  "documentation": null,
			  "fullyImplemented": true,
			  "id": 105,
			  "linearizedBaseContracts": [
				105
			  ],
			  "name": "ECTools",
			  "nodeType": "ContractDefinition",
			  "nodes": [
				{
				  "body": {
					"id": 62,
					"nodeType": "Block",
					"src": "401:780:0",
					"statements": [
					  {
						"assignments": [
						  11
						],
						"declarations": [
						  {
							"constant": false,
							"id": 11,
							"name": "r",
							"nodeType": "VariableDeclaration",
							"scope": 62,
							"src": "411:9:0",
							"stateVariable": false,
							"storageLocation": "default",
							"typeDescriptions": {
							  "typeIdentifier": "t_bytes32",
							  "typeString": "bytes32"
							},
							"typeName": {
							  "id": 10,
							  "name": "bytes32",
							  "nodeType": "ElementaryTypeName",
							  "src": "411:7:0",
							  "typeDescriptions": {
								"typeIdentifier": "t_bytes32",
								"typeString": "bytes32"
							  }
							},
							"value": null,
							"visibility": "internal"
						  }
						],
						"id": 12,
						"initialValue": null,
						"nodeType": "VariableDeclarationStatement",
						"src": "411:9:0"
					  },
					  {
						"assignments": [
						  14
						],
						"declarations": [
						  {
							"constant": false,
							"id": 14,
							"name": "s",
							"nodeType": "VariableDeclaration",
							"scope": 62,
							"src": "430:9:0",
							"stateVariable": false,
							"storageLocation": "default",
							"typeDescriptions": {
							  "typeIdentifier": "t_bytes32",
							  "typeString": "bytes32"
							},
							"typeName": {
							  "id": 13,
							  "name": "bytes32",
							  "nodeType": "ElementaryTypeName",
							  "src": "430:7:0",
							  "typeDescriptions": {
								"typeIdentifier": "t_bytes32",
								"typeString": "bytes32"
							  }
							},
							"value": null,
							"visibility": "internal"
						  }
						],
						"id": 15,
						"initialValue": null,
						"nodeType": "VariableDeclarationStatement",
						"src": "430:9:0"
					  },
					  {
						"assignments": [
						  17
						],
						"declarations": [
						  {
							"constant": false,
							"id": 17,
							"name": "v",
							"nodeType": "VariableDeclaration",
							"scope": 62,
							"src": "449:7:0",
							"stateVariable": false,
							"storageLocation": "default",
							"typeDescriptions": {
							  "typeIdentifier": "t_uint8",
							  "typeString": "uint8"
							},
							"typeName": {
							  "id": 16,
							  "name": "uint8",
							  "nodeType": "ElementaryTypeName",
							  "src": "449:5:0",
							  "typeDescriptions": {
								"typeIdentifier": "t_uint8",
								"typeString": "uint8"
							  }
							},
							"value": null,
							"visibility": "internal"
						  }
						],
						"id": 18,
						"initialValue": null,
						"nodeType": "VariableDeclarationStatement",
						"src": "449:7:0"
					  },
					  {
						"condition": {
						  "argumentTypes": null,
						  "commonType": {
							"typeIdentifier": "t_uint256",
							"typeString": "uint256"
						  },
						  "id": 22,
						  "isConstant": false,
						  "isLValue": false,
						  "isPure": false,
						  "lValueRequested": false,
						  "leftExpression": {
							"argumentTypes": null,
							"expression": {
							  "argumentTypes": null,
							  "id": 19,
							  "name": "signedMessage",
							  "nodeType": "Identifier",
							  "overloadedDeclarations": [],
							  "referencedDeclaration": 5,
							  "src": "508:13:0",
							  "typeDescriptions": {
								"typeIdentifier": "t_bytes_memory_ptr",
								"typeString": "bytes memory"
							  }
							},
							"id": 20,
							"isConstant": false,
							"isLValue": false,
							"isPure": false,
							"lValueRequested": false,
							"memberName": "length",
							"nodeType": "MemberAccess",
							"referencedDeclaration": null,
							"src": "508:20:0",
							"typeDescriptions": {
							  "typeIdentifier": "t_uint256",
							  "typeString": "uint256"
							}
						  },
						  "nodeType": "BinaryOperation",
						  "operator": "!=",
						  "rightExpression": {
							"argumentTypes": null,
							"hexValue": "3635",
							"id": 21,
							"isConstant": false,
							"isLValue": false,
							"isPure": true,
							"kind": "number",
							"lValueRequested": false,
							"nodeType": "Literal",
							"src": "532:2:0",
							"subdenomination": null,
							"typeDescriptions": {
							  "typeIdentifier": "t_rational_65_by_1",
							  "typeString": "int_const 65"
							},
							"value": "65"
						  },
						  "src": "508:26:0",
						  "typeDescriptions": {
							"typeIdentifier": "t_bool",
							"typeString": "bool"
						  }
						},
						"falseBody": null,
						"id": 29,
						"nodeType": "IfStatement",
						"src": "504:76:0",
						"trueBody": {
						  "id": 28,
						  "nodeType": "Block",
						  "src": "536:44:0",
						  "statements": [
							{
							  "expression": {
								"argumentTypes": null,
								"components": [
								  {
									"argumentTypes": null,
									"arguments": [
									  {
										"argumentTypes": null,
										"hexValue": "30",
										"id": 24,
										"isConstant": false,
										"isLValue": false,
										"isPure": true,
										"kind": "number",
										"lValueRequested": false,
										"nodeType": "Literal",
										"src": "566:1:0",
										"subdenomination": null,
										"typeDescriptions": {
										  "typeIdentifier": "t_rational_0_by_1",
										  "typeString": "int_const 0"
										},
										"value": "0"
									  }
									],
									"expression": {
									  "argumentTypes": [
										{
										  "typeIdentifier": "t_rational_0_by_1",
										  "typeString": "int_const 0"
										}
									  ],
									  "id": 23,
									  "isConstant": false,
									  "isLValue": false,
									  "isPure": true,
									  "lValueRequested": false,
									  "nodeType": "ElementaryTypeNameExpression",
									  "src": "558:7:0",
									  "typeDescriptions": {
										"typeIdentifier": "t_type$_t_address_$",
										"typeString": "type(address)"
									  },
									  "typeName": "address"
									},
									"id": 25,
									"isConstant": false,
									"isLValue": false,
									"isPure": true,
									"kind": "typeConversion",
									"lValueRequested": false,
									"names": [],
									"nodeType": "FunctionCall",
									"src": "558:10:0",
									"typeDescriptions": {
									  "typeIdentifier": "t_address_payable",
									  "typeString": "address payable"
									}
								  }
								],
								"id": 26,
								"isConstant": false,
								"isInlineArray": false,
								"isLValue": false,
								"isPure": true,
								"lValueRequested": false,
								"nodeType": "TupleExpression",
								"src": "557:12:0",
								"typeDescriptions": {
								  "typeIdentifier": "t_address_payable",
								  "typeString": "address payable"
								}
							  },
							  "functionReturnParameters": 9,
							  "id": 27,
							  "nodeType": "Return",
							  "src": "550:19:0"
							}
						  ]
						}
					  },
					  {
						"externalReferences": [
						  {
							"r": {
							  "declaration": 11,
							  "isOffset": false,
							  "isSlot": false,
							  "src": "669:1:0",
							  "valueSize": 1
							}
						  },
						  {
							"signedMessage": {
							  "declaration": 5,
							  "isOffset": false,
							  "isSlot": false,
							  "src": "684:13:0",
							  "valueSize": 1
							}
						  },
						  {
							"s": {
							  "declaration": 14,
							  "isOffset": false,
							  "isSlot": false,
							  "src": "716:1:0",
							  "valueSize": 1
							}
						  },
						  {
							"signedMessage": {
							  "declaration": 5,
							  "isOffset": false,
							  "isSlot": false,
							  "src": "731:13:0",
							  "valueSize": 1
							}
						  },
						  {
							"v": {
							  "declaration": 17,
							  "isOffset": false,
							  "isSlot": false,
							  "src": "763:1:0",
							  "valueSize": 1
							}
						  },
						  {
							"signedMessage": {
							  "declaration": 5,
							  "isOffset": false,
							  "isSlot": false,
							  "src": "786:13:0",
							  "valueSize": 1
							}
						  }
						],
						"id": 30,
						"nodeType": "InlineAssembly",
						"operations": "{\n    r := mload(add(signedMessage, 32))\n    s := mload(add(signedMessage, 64))\n    v := byte(0, mload(add(signedMessage, 96)))\n}",
						"src": "646:273:0"
					  },
					  {
						"condition": {
						  "argumentTypes": null,
						  "commonType": {
							"typeIdentifier": "t_uint8",
							"typeString": "uint8"
						  },
						  "id": 33,
						  "isConstant": false,
						  "isLValue": false,
						  "isPure": false,
						  "lValueRequested": false,
						  "leftExpression": {
							"argumentTypes": null,
							"id": 31,
							"name": "v",
							"nodeType": "Identifier",
							"overloadedDeclarations": [],
							"referencedDeclaration": 17,
							"src": "921:1:0",
							"typeDescriptions": {
							  "typeIdentifier": "t_uint8",
							  "typeString": "uint8"
							}
						  },
						  "nodeType": "BinaryOperation",
						  "operator": "<",
						  "rightExpression": {
							"argumentTypes": null,
							"hexValue": "3237",
							"id": 32,
							"isConstant": false,
							"isLValue": false,
							"isPure": true,
							"kind": "number",
							"lValueRequested": false,
							"nodeType": "Literal",
							"src": "925:2:0",
							"subdenomination": null,
							"typeDescriptions": {
							  "typeIdentifier": "t_rational_27_by_1",
							  "typeString": "int_const 27"
							},
							"value": "27"
						  },
						  "src": "921:6:0",
						  "typeDescriptions": {
							"typeIdentifier": "t_bool",
							"typeString": "bool"
						  }
						},
						"falseBody": null,
						"id": 39,
						"nodeType": "IfStatement",
						"src": "917:44:0",
						"trueBody": {
						  "id": 38,
						  "nodeType": "Block",
						  "src": "929:32:0",
						  "statements": [
							{
							  "expression": {
								"argumentTypes": null,
								"id": 36,
								"isConstant": false,
								"isLValue": false,
								"isPure": false,
								"lValueRequested": false,
								"leftHandSide": {
								  "argumentTypes": null,
								  "id": 34,
								  "name": "v",
								  "nodeType": "Identifier",
								  "overloadedDeclarations": [],
								  "referencedDeclaration": 17,
								  "src": "943:1:0",
								  "typeDescriptions": {
									"typeIdentifier": "t_uint8",
									"typeString": "uint8"
								  }
								},
								"nodeType": "Assignment",
								"operator": "+=",
								"rightHandSide": {
								  "argumentTypes": null,
								  "hexValue": "3237",
								  "id": 35,
								  "isConstant": false,
								  "isLValue": false,
								  "isPure": true,
								  "kind": "number",
								  "lValueRequested": false,
								  "nodeType": "Literal",
								  "src": "948:2:0",
								  "subdenomination": null,
								  "typeDescriptions": {
									"typeIdentifier": "t_rational_27_by_1",
									"typeString": "int_const 27"
								  },
								  "value": "27"
								},
								"src": "943:7:0",
								"typeDescriptions": {
								  "typeIdentifier": "t_uint8",
								  "typeString": "uint8"
								}
							  },
							  "id": 37,
							  "nodeType": "ExpressionStatement",
							  "src": "943:7:0"
							}
						  ]
						}
					  },
					  {
						"condition": {
						  "argumentTypes": null,
						  "commonType": {
							"typeIdentifier": "t_bool",
							"typeString": "bool"
						  },
						  "id": 46,
						  "isConstant": false,
						  "isLValue": false,
						  "isPure": false,
						  "lValueRequested": false,
						  "leftExpression": {
							"argumentTypes": null,
							"commonType": {
							  "typeIdentifier": "t_uint8",
							  "typeString": "uint8"
							},
							"id": 42,
							"isConstant": false,
							"isLValue": false,
							"isPure": false,
							"lValueRequested": false,
							"leftExpression": {
							  "argumentTypes": null,
							  "id": 40,
							  "name": "v",
							  "nodeType": "Identifier",
							  "overloadedDeclarations": [],
							  "referencedDeclaration": 17,
							  "src": "1038:1:0",
							  "typeDescriptions": {
								"typeIdentifier": "t_uint8",
								"typeString": "uint8"
							  }
							},
							"nodeType": "BinaryOperation",
							"operator": "!=",
							"rightExpression": {
							  "argumentTypes": null,
							  "hexValue": "3237",
							  "id": 41,
							  "isConstant": false,
							  "isLValue": false,
							  "isPure": true,
							  "kind": "number",
							  "lValueRequested": false,
							  "nodeType": "Literal",
							  "src": "1043:2:0",
							  "subdenomination": null,
							  "typeDescriptions": {
								"typeIdentifier": "t_rational_27_by_1",
								"typeString": "int_const 27"
							  },
							  "value": "27"
							},
							"src": "1038:7:0",
							"typeDescriptions": {
							  "typeIdentifier": "t_bool",
							  "typeString": "bool"
							}
						  },
						  "nodeType": "BinaryOperation",
						  "operator": "&&",
						  "rightExpression": {
							"argumentTypes": null,
							"commonType": {
							  "typeIdentifier": "t_uint8",
							  "typeString": "uint8"
							},
							"id": 45,
							"isConstant": false,
							"isLValue": false,
							"isPure": false,
							"lValueRequested": false,
							"leftExpression": {
							  "argumentTypes": null,
							  "id": 43,
							  "name": "v",
							  "nodeType": "Identifier",
							  "overloadedDeclarations": [],
							  "referencedDeclaration": 17,
							  "src": "1049:1:0",
							  "typeDescriptions": {
								"typeIdentifier": "t_uint8",
								"typeString": "uint8"
							  }
							},
							"nodeType": "BinaryOperation",
							"operator": "!=",
							"rightExpression": {
							  "argumentTypes": null,
							  "hexValue": "3238",
							  "id": 44,
							  "isConstant": false,
							  "isLValue": false,
							  "isPure": true,
							  "kind": "number",
							  "lValueRequested": false,
							  "nodeType": "Literal",
							  "src": "1054:2:0",
							  "subdenomination": null,
							  "typeDescriptions": {
								"typeIdentifier": "t_rational_28_by_1",
								"typeString": "int_const 28"
							  },
							  "value": "28"
							},
							"src": "1049:7:0",
							"typeDescriptions": {
							  "typeIdentifier": "t_bool",
							  "typeString": "bool"
							}
						  },
						  "src": "1038:18:0",
						  "typeDescriptions": {
							"typeIdentifier": "t_bool",
							"typeString": "bool"
						  }
						},
						"falseBody": {
						  "id": 60,
						  "nodeType": "Block",
						  "src": "1108:67:0",
						  "statements": [
							{
							  "expression": {
								"argumentTypes": null,
								"arguments": [
								  {
									"argumentTypes": null,
									"id": 54,
									"name": "originalMessage",
									"nodeType": "Identifier",
									"overloadedDeclarations": [],
									"referencedDeclaration": 3,
									"src": "1139:15:0",
									"typeDescriptions": {
									  "typeIdentifier": "t_bytes32",
									  "typeString": "bytes32"
									}
								  },
								  {
									"argumentTypes": null,
									"id": 55,
									"name": "v",
									"nodeType": "Identifier",
									"overloadedDeclarations": [],
									"referencedDeclaration": 17,
									"src": "1156:1:0",
									"typeDescriptions": {
									  "typeIdentifier": "t_uint8",
									  "typeString": "uint8"
									}
								  },
								  {
									"argumentTypes": null,
									"id": 56,
									"name": "r",
									"nodeType": "Identifier",
									"overloadedDeclarations": [],
									"referencedDeclaration": 11,
									"src": "1159:1:0",
									"typeDescriptions": {
									  "typeIdentifier": "t_bytes32",
									  "typeString": "bytes32"
									}
								  },
								  {
									"argumentTypes": null,
									"id": 57,
									"name": "s",
									"nodeType": "Identifier",
									"overloadedDeclarations": [],
									"referencedDeclaration": 14,
									"src": "1162:1:0",
									"typeDescriptions": {
									  "typeIdentifier": "t_bytes32",
									  "typeString": "bytes32"
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
									  "typeIdentifier": "t_uint8",
									  "typeString": "uint8"
									},
									{
									  "typeIdentifier": "t_bytes32",
									  "typeString": "bytes32"
									},
									{
									  "typeIdentifier": "t_bytes32",
									  "typeString": "bytes32"
									}
								  ],
								  "id": 53,
								  "name": "ecrecover",
								  "nodeType": "Identifier",
								  "overloadedDeclarations": [],
								  "referencedDeclaration": 1546,
								  "src": "1129:9:0",
								  "typeDescriptions": {
									"typeIdentifier": "t_function_ecrecover_pure$_t_bytes32_$_t_uint8_$_t_bytes32_$_t_bytes32_$returns$_t_address_$",
									"typeString": "function (bytes32,uint8,bytes32,bytes32) pure returns (address)"
								  }
								},
								"id": 58,
								"isConstant": false,
								"isLValue": false,
								"isPure": false,
								"kind": "functionCall",
								"lValueRequested": false,
								"names": [],
								"nodeType": "FunctionCall",
								"src": "1129:35:0",
								"typeDescriptions": {
								  "typeIdentifier": "t_address",
								  "typeString": "address"
								}
							  },
							  "functionReturnParameters": 9,
							  "id": 59,
							  "nodeType": "Return",
							  "src": "1122:42:0"
							}
						  ]
						},
						"id": 61,
						"nodeType": "IfStatement",
						"src": "1034:141:0",
						"trueBody": {
						  "id": 52,
						  "nodeType": "Block",
						  "src": "1058:44:0",
						  "statements": [
							{
							  "expression": {
								"argumentTypes": null,
								"components": [
								  {
									"argumentTypes": null,
									"arguments": [
									  {
										"argumentTypes": null,
										"hexValue": "30",
										"id": 48,
										"isConstant": false,
										"isLValue": false,
										"isPure": true,
										"kind": "number",
										"lValueRequested": false,
										"nodeType": "Literal",
										"src": "1088:1:0",
										"subdenomination": null,
										"typeDescriptions": {
										  "typeIdentifier": "t_rational_0_by_1",
										  "typeString": "int_const 0"
										},
										"value": "0"
									  }
									],
									"expression": {
									  "argumentTypes": [
										{
										  "typeIdentifier": "t_rational_0_by_1",
										  "typeString": "int_const 0"
										}
									  ],
									  "id": 47,
									  "isConstant": false,
									  "isLValue": false,
									  "isPure": true,
									  "lValueRequested": false,
									  "nodeType": "ElementaryTypeNameExpression",
									  "src": "1080:7:0",
									  "typeDescriptions": {
										"typeIdentifier": "t_type$_t_address_$",
										"typeString": "type(address)"
									  },
									  "typeName": "address"
									},
									"id": 49,
									"isConstant": false,
									"isLValue": false,
									"isPure": true,
									"kind": "typeConversion",
									"lValueRequested": false,
									"names": [],
									"nodeType": "FunctionCall",
									"src": "1080:10:0",
									"typeDescriptions": {
									  "typeIdentifier": "t_address_payable",
									  "typeString": "address payable"
									}
								  }
								],
								"id": 50,
								"isConstant": false,
								"isInlineArray": false,
								"isLValue": false,
								"isPure": true,
								"lValueRequested": false,
								"nodeType": "TupleExpression",
								"src": "1079:12:0",
								"typeDescriptions": {
								  "typeIdentifier": "t_address_payable",
								  "typeString": "address payable"
								}
							  },
							  "functionReturnParameters": 9,
							  "id": 51,
							  "nodeType": "Return",
							  "src": "1072:19:0"
							}
						  ]
						}
					  }
					]
				  },
				  "documentation": "@dev Recover signer address from a message by using his signature\n@param originalMessage bytes32 message, the originalMessage is the signed message. What is recovered is the signer address.\n@param signedMessage bytes signature",
				  "id": 63,
				  "implemented": true,
				  "kind": "function",
				  "modifiers": [],
				  "name": "recover",
				  "nodeType": "FunctionDefinition",
				  "parameters": {
					"id": 6,
					"nodeType": "ParameterList",
					"parameters": [
					  {
						"constant": false,
						"id": 3,
						"name": "originalMessage",
						"nodeType": "VariableDeclaration",
						"scope": 63,
						"src": "318:23:0",
						"stateVariable": false,
						"storageLocation": "default",
						"typeDescriptions": {
						  "typeIdentifier": "t_bytes32",
						  "typeString": "bytes32"
						},
						"typeName": {
						  "id": 2,
						  "name": "bytes32",
						  "nodeType": "ElementaryTypeName",
						  "src": "318:7:0",
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
						"id": 5,
						"name": "signedMessage",
						"nodeType": "VariableDeclaration",
						"scope": 63,
						"src": "343:26:0",
						"stateVariable": false,
						"storageLocation": "memory",
						"typeDescriptions": {
						  "typeIdentifier": "t_bytes_memory_ptr",
						  "typeString": "bytes"
						},
						"typeName": {
						  "id": 4,
						  "name": "bytes",
						  "nodeType": "ElementaryTypeName",
						  "src": "343:5:0",
						  "typeDescriptions": {
							"typeIdentifier": "t_bytes_storage_ptr",
							"typeString": "bytes"
						  }
						},
						"value": null,
						"visibility": "internal"
					  }
					],
					"src": "317:53:0"
				  },
				  "returnParameters": {
					"id": 9,
					"nodeType": "ParameterList",
					"parameters": [
					  {
						"constant": false,
						"id": 8,
						"name": "",
						"nodeType": "VariableDeclaration",
						"scope": 63,
						"src": "392:7:0",
						"stateVariable": false,
						"storageLocation": "default",
						"typeDescriptions": {
						  "typeIdentifier": "t_address",
						  "typeString": "address"
						},
						"typeName": {
						  "id": 7,
						  "name": "address",
						  "nodeType": "ElementaryTypeName",
						  "src": "392:7:0",
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
					"src": "391:9:0"
				  },
				  "scope": 105,
				  "src": "301:880:0",
				  "stateMutability": "pure",
				  "superFunction": null,
				  "visibility": "public"
				},
				{
				  "body": {
					"id": 82,
					"nodeType": "Block",
					"src": "1264:131:0",
					"statements": [
					  {
						"assignments": [
						  71
						],
						"declarations": [
						  {
							"constant": false,
							"id": 71,
							"name": "prefix",
							"nodeType": "VariableDeclaration",
							"scope": 82,
							"src": "1274:19:0",
							"stateVariable": false,
							"storageLocation": "memory",
							"typeDescriptions": {
							  "typeIdentifier": "t_bytes_memory_ptr",
							  "typeString": "bytes"
							},
							"typeName": {
							  "id": 70,
							  "name": "bytes",
							  "nodeType": "ElementaryTypeName",
							  "src": "1274:5:0",
							  "typeDescriptions": {
								"typeIdentifier": "t_bytes_storage_ptr",
								"typeString": "bytes"
							  }
							},
							"value": null,
							"visibility": "internal"
						  }
						],
						"id": 73,
						"initialValue": {
						  "argumentTypes": null,
						  "hexValue": "19457468657265756d205369676e6564204d6573736167653a0a3332",
						  "id": 72,
						  "isConstant": false,
						  "isLValue": false,
						  "isPure": true,
						  "kind": "string",
						  "lValueRequested": false,
						  "nodeType": "Literal",
						  "src": "1296:34:0",
						  "subdenomination": null,
						  "typeDescriptions": {
							"typeIdentifier": "t_stringliteral_178a2411ab6fbc1ba11064408972259c558d0e82fd48b0aba3ad81d14f065e73",
							"typeString": "literal_string \"\u0019Ethereum Signed Message:\n32\""
						  },
						  "value": "\u0019Ethereum Signed Message:\n32"
						},
						"nodeType": "VariableDeclarationStatement",
						"src": "1274:56:0"
					  },
					  {
						"expression": {
						  "argumentTypes": null,
						  "arguments": [
							{
							  "argumentTypes": null,
							  "arguments": [
								{
								  "argumentTypes": null,
								  "id": 77,
								  "name": "prefix",
								  "nodeType": "Identifier",
								  "overloadedDeclarations": [],
								  "referencedDeclaration": 71,
								  "src": "1374:6:0",
								  "typeDescriptions": {
									"typeIdentifier": "t_bytes_memory_ptr",
									"typeString": "bytes memory"
								  }
								},
								{
								  "argumentTypes": null,
								  "id": 78,
								  "name": "_msg",
								  "nodeType": "Identifier",
								  "overloadedDeclarations": [],
								  "referencedDeclaration": 65,
								  "src": "1382:4:0",
								  "typeDescriptions": {
									"typeIdentifier": "t_bytes32",
									"typeString": "bytes32"
								  }
								}
							  ],
							  "expression": {
								"argumentTypes": [
								  {
									"typeIdentifier": "t_bytes_memory_ptr",
									"typeString": "bytes memory"
								  },
								  {
									"typeIdentifier": "t_bytes32",
									"typeString": "bytes32"
								  }
								],
								"expression": {
								  "argumentTypes": null,
								  "id": 75,
								  "name": "abi",
								  "nodeType": "Identifier",
								  "overloadedDeclarations": [],
								  "referencedDeclaration": 1541,
								  "src": "1357:3:0",
								  "typeDescriptions": {
									"typeIdentifier": "t_magic_abi",
									"typeString": "abi"
								  }
								},
								"id": 76,
								"isConstant": false,
								"isLValue": false,
								"isPure": true,
								"lValueRequested": false,
								"memberName": "encodePacked",
								"nodeType": "MemberAccess",
								"referencedDeclaration": null,
								"src": "1357:16:0",
								"typeDescriptions": {
								  "typeIdentifier": "t_function_abiencodepacked_pure$__$returns$_t_bytes_memory_ptr_$",
								  "typeString": "function () pure returns (bytes memory)"
								}
							  },
							  "id": 79,
							  "isConstant": false,
							  "isLValue": false,
							  "isPure": false,
							  "kind": "functionCall",
							  "lValueRequested": false,
							  "names": [],
							  "nodeType": "FunctionCall",
							  "src": "1357:30:0",
							  "typeDescriptions": {
								"typeIdentifier": "t_bytes_memory_ptr",
								"typeString": "bytes memory"
							  }
							}
						  ],
						  "expression": {
							"argumentTypes": [
							  {
								"typeIdentifier": "t_bytes_memory_ptr",
								"typeString": "bytes memory"
							  }
							],
							"id": 74,
							"name": "keccak256",
							"nodeType": "Identifier",
							"overloadedDeclarations": [],
							"referencedDeclaration": 1548,
							"src": "1347:9:0",
							"typeDescriptions": {
							  "typeIdentifier": "t_function_keccak256_pure$_t_bytes_memory_ptr_$returns$_t_bytes32_$",
							  "typeString": "function (bytes memory) pure returns (bytes32)"
							}
						  },
						  "id": 80,
						  "isConstant": false,
						  "isLValue": false,
						  "isPure": false,
						  "kind": "functionCall",
						  "lValueRequested": false,
						  "names": [],
						  "nodeType": "FunctionCall",
						  "src": "1347:41:0",
						  "typeDescriptions": {
							"typeIdentifier": "t_bytes32",
							"typeString": "bytes32"
						  }
						},
						"functionReturnParameters": 69,
						"id": 81,
						"nodeType": "Return",
						"src": "1340:48:0"
					  }
					]
				  },
				  "documentation": null,
				  "id": 83,
				  "implemented": true,
				  "kind": "function",
				  "modifiers": [],
				  "name": "toEthereumSignedMessage",
				  "nodeType": "FunctionDefinition",
				  "parameters": {
					"id": 66,
					"nodeType": "ParameterList",
					"parameters": [
					  {
						"constant": false,
						"id": 65,
						"name": "_msg",
						"nodeType": "VariableDeclaration",
						"scope": 83,
						"src": "1220:12:0",
						"stateVariable": false,
						"storageLocation": "default",
						"typeDescriptions": {
						  "typeIdentifier": "t_bytes32",
						  "typeString": "bytes32"
						},
						"typeName": {
						  "id": 64,
						  "name": "bytes32",
						  "nodeType": "ElementaryTypeName",
						  "src": "1220:7:0",
						  "typeDescriptions": {
							"typeIdentifier": "t_bytes32",
							"typeString": "bytes32"
						  }
						},
						"value": null,
						"visibility": "internal"
					  }
					],
					"src": "1219:14:0"
				  },
				  "returnParameters": {
					"id": 69,
					"nodeType": "ParameterList",
					"parameters": [
					  {
						"constant": false,
						"id": 68,
						"name": "",
						"nodeType": "VariableDeclaration",
						"scope": 83,
						"src": "1255:7:0",
						"stateVariable": false,
						"storageLocation": "default",
						"typeDescriptions": {
						  "typeIdentifier": "t_bytes32",
						  "typeString": "bytes32"
						},
						"typeName": {
						  "id": 67,
						  "name": "bytes32",
						  "nodeType": "ElementaryTypeName",
						  "src": "1255:7:0",
						  "typeDescriptions": {
							"typeIdentifier": "t_bytes32",
							"typeString": "bytes32"
						  }
						},
						"value": null,
						"visibility": "internal"
					  }
					],
					"src": "1254:9:0"
				  },
				  "scope": 105,
				  "src": "1187:208:0",
				  "stateMutability": "pure",
				  "superFunction": null,
				  "visibility": "public"
				},
				{
				  "body": {
					"id": 103,
					"nodeType": "Block",
					"src": "1488:112:0",
					"statements": [
					  {
						"assignments": [
						  93
						],
						"declarations": [
						  {
							"constant": false,
							"id": 93,
							"name": "ethSignedMsg",
							"nodeType": "VariableDeclaration",
							"scope": 103,
							"src": "1498:20:0",
							"stateVariable": false,
							"storageLocation": "default",
							"typeDescriptions": {
							  "typeIdentifier": "t_bytes32",
							  "typeString": "bytes32"
							},
							"typeName": {
							  "id": 92,
							  "name": "bytes32",
							  "nodeType": "ElementaryTypeName",
							  "src": "1498:7:0",
							  "typeDescriptions": {
								"typeIdentifier": "t_bytes32",
								"typeString": "bytes32"
							  }
							},
							"value": null,
							"visibility": "internal"
						  }
						],
						"id": 97,
						"initialValue": {
						  "argumentTypes": null,
						  "arguments": [
							{
							  "argumentTypes": null,
							  "id": 95,
							  "name": "_msg",
							  "nodeType": "Identifier",
							  "overloadedDeclarations": [],
							  "referencedDeclaration": 85,
							  "src": "1545:4:0",
							  "typeDescriptions": {
								"typeIdentifier": "t_bytes32",
								"typeString": "bytes32"
							  }
							}
						  ],
						  "expression": {
							"argumentTypes": [
							  {
								"typeIdentifier": "t_bytes32",
								"typeString": "bytes32"
							  }
							],
							"id": 94,
							"name": "toEthereumSignedMessage",
							"nodeType": "Identifier",
							"overloadedDeclarations": [],
							"referencedDeclaration": 83,
							"src": "1521:23:0",
							"typeDescriptions": {
							  "typeIdentifier": "t_function_internal_pure$_t_bytes32_$returns$_t_bytes32_$",
							  "typeString": "function (bytes32) pure returns (bytes32)"
							}
						  },
						  "id": 96,
						  "isConstant": false,
						  "isLValue": false,
						  "isPure": false,
						  "kind": "functionCall",
						  "lValueRequested": false,
						  "names": [],
						  "nodeType": "FunctionCall",
						  "src": "1521:29:0",
						  "typeDescriptions": {
							"typeIdentifier": "t_bytes32",
							"typeString": "bytes32"
						  }
						},
						"nodeType": "VariableDeclarationStatement",
						"src": "1498:52:0"
					  },
					  {
						"expression": {
						  "argumentTypes": null,
						  "arguments": [
							{
							  "argumentTypes": null,
							  "id": 99,
							  "name": "ethSignedMsg",
							  "nodeType": "Identifier",
							  "overloadedDeclarations": [],
							  "referencedDeclaration": 93,
							  "src": "1575:12:0",
							  "typeDescriptions": {
								"typeIdentifier": "t_bytes32",
								"typeString": "bytes32"
							  }
							},
							{
							  "argumentTypes": null,
							  "id": 100,
							  "name": "sig",
							  "nodeType": "Identifier",
							  "overloadedDeclarations": [],
							  "referencedDeclaration": 87,
							  "src": "1589:3:0",
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
							"id": 98,
							"name": "recover",
							"nodeType": "Identifier",
							"overloadedDeclarations": [],
							"referencedDeclaration": 63,
							"src": "1567:7:0",
							"typeDescriptions": {
							  "typeIdentifier": "t_function_internal_pure$_t_bytes32_$_t_bytes_memory_ptr_$returns$_t_address_$",
							  "typeString": "function (bytes32,bytes memory) pure returns (address)"
							}
						  },
						  "id": 101,
						  "isConstant": false,
						  "isLValue": false,
						  "isPure": false,
						  "kind": "functionCall",
						  "lValueRequested": false,
						  "names": [],
						  "nodeType": "FunctionCall",
						  "src": "1567:26:0",
						  "typeDescriptions": {
							"typeIdentifier": "t_address",
							"typeString": "address"
						  }
						},
						"functionReturnParameters": 91,
						"id": 102,
						"nodeType": "Return",
						"src": "1560:33:0"
					  }
					]
				  },
				  "documentation": null,
				  "id": 104,
				  "implemented": true,
				  "kind": "function",
				  "modifiers": [],
				  "name": "prefixedRecover",
				  "nodeType": "FunctionDefinition",
				  "parameters": {
					"id": 88,
					"nodeType": "ParameterList",
					"parameters": [
					  {
						"constant": false,
						"id": 85,
						"name": "_msg",
						"nodeType": "VariableDeclaration",
						"scope": 104,
						"src": "1426:12:0",
						"stateVariable": false,
						"storageLocation": "default",
						"typeDescriptions": {
						  "typeIdentifier": "t_bytes32",
						  "typeString": "bytes32"
						},
						"typeName": {
						  "id": 84,
						  "name": "bytes32",
						  "nodeType": "ElementaryTypeName",
						  "src": "1426:7:0",
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
						"id": 87,
						"name": "sig",
						"nodeType": "VariableDeclaration",
						"scope": 104,
						"src": "1440:16:0",
						"stateVariable": false,
						"storageLocation": "memory",
						"typeDescriptions": {
						  "typeIdentifier": "t_bytes_memory_ptr",
						  "typeString": "bytes"
						},
						"typeName": {
						  "id": 86,
						  "name": "bytes",
						  "nodeType": "ElementaryTypeName",
						  "src": "1440:5:0",
						  "typeDescriptions": {
							"typeIdentifier": "t_bytes_storage_ptr",
							"typeString": "bytes"
						  }
						},
						"value": null,
						"visibility": "internal"
					  }
					],
					"src": "1425:32:0"
				  },
				  "returnParameters": {
					"id": 91,
					"nodeType": "ParameterList",
					"parameters": [
					  {
						"constant": false,
						"id": 90,
						"name": "",
						"nodeType": "VariableDeclaration",
						"scope": 104,
						"src": "1479:7:0",
						"stateVariable": false,
						"storageLocation": "default",
						"typeDescriptions": {
						  "typeIdentifier": "t_address",
						  "typeString": "address"
						},
						"typeName": {
						  "id": 89,
						  "name": "address",
						  "nodeType": "ElementaryTypeName",
						  "src": "1479:7:0",
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
					"src": "1478:9:0"
				  },
				  "scope": 105,
				  "src": "1401:199:0",
				  "stateMutability": "pure",
				  "superFunction": null,
				  "visibility": "public"
				}
			  ],
			  "scope": 106,
			  "src": "24:1578:0"
			}
		  ],
		  "src": "0:1602:0"
		},
		"compiler": {
		  "name": "solc",
		  "version": "0.5.1+commit.c8a2cb62.Emscripten.clang",
		  "optimizer": false,
		  "runs": 200
		},
		"networks": {},
		"schemaVersion": "1.1.2",
		"updatedAt": "2019-05-14T07:00:21.112Z"
}

module.exports = compiledECToolsContract;