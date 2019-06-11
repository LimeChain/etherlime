let compiledContract = {
		"contractName": "LimeFactory",
		"abi": [
		  {
			"constant": true,
			"inputs": [
			  {
				"name": "",
				"type": "uint256"
			  }
			],
			"name": "limes",
			"outputs": [
			  {
				"name": "name",
				"type": "string"
			  },
			  {
				"name": "carbohydrates",
				"type": "uint8"
			  },
			  {
				"name": "fat",
				"type": "uint8"
			  },
			  {
				"name": "protein",
				"type": "uint8"
			  }
			],
			"payable": false,
			"stateMutability": "view",
			"type": "function"
		  },
		  {
			"anonymous": false,
			"inputs": [
			  {
				"indexed": false,
				"name": "name",
				"type": "string"
			  }
			],
			"name": "FreshLimeTest",
			"type": "event"
		  },
		  {
			"constant": false,
			"inputs": [
			  {
				"name": "_name",
				"type": "string"
			  },
			  {
				"name": "_carbohydrates",
				"type": "uint8"
			  },
			  {
				"name": "_fat",
				"type": "uint8"
			  },
			  {
				"name": "_protein",
				"type": "uint8"
			  }
			],
			"name": "createLime",
			"outputs": [],
			"payable": false,
			"stateMutability": "nonpayable",
			"type": "function"
		  }
		],
		"bytecode": "0x608060405234801561001057600080fd5b50610574806100206000396000f3fe608060405260043610610046576000357c01000000000000000000000000000000000000000000000000000000009004806321310ecd1461004b578063e0b6fcfc14610126575b600080fd5b34801561005757600080fd5b506100846004803603602081101561006e57600080fd5b8101908080359060200190929190505050610215565b60405180806020018560ff1660ff1681526020018460ff1660ff1681526020018360ff1660ff168152602001828103825286818151815260200191508051906020019080838360005b838110156100e85780820151818401526020810190506100cd565b50505050905090810190601f1680156101155780820380516001836020036101000a031916815260200191505b509550505050505060405180910390f35b34801561013257600080fd5b506102136004803603608081101561014957600080fd5b810190808035906020019064010000000081111561016657600080fd5b82018360208201111561017857600080fd5b8035906020019184600183028401116401000000008311171561019a57600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f820116905080830192505050505050509192919290803560ff169060200190929190803560ff169060200190929190803560ff169060200190929190505050610313565b005b60008181548110151561022457fe5b9060005260206000209060020201600091509050806000018054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156102d05780601f106102a5576101008083540402835291602001916102d0565b820191906000526020600020905b8154815290600101906020018083116102b357829003601f168201915b5050505050908060010160009054906101000a900460ff16908060010160019054906101000a900460ff16908060010160029054906101000a900460ff16905084565b60008360ff161415151561032657600080fd5b60006080604051908101604052808681526020018560ff1681526020018460ff1681526020018360ff1681525090806001815401808255809150509060018203906000526020600020906002020160009091929091909150600082015181600001908051906020019061039a9291906104a3565b5060208201518160010160006101000a81548160ff021916908360ff16021790555060408201518160010160016101000a81548160ff021916908360ff16021790555060608201518160010160026101000a81548160ff021916908360ff1602179055505050507f7fd14743a3c1a5ae21b9cdca46574c3fcd42e8b9e3424d3040dd302f3bf5ceb5846040518080602001828103825283818151815260200191508051906020019080838360005b83811015610463578082015181840152602081019050610448565b50505050905090810190601f1680156104905780820380516001836020036101000a031916815260200191505b509250505060405180910390a150505050565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f106104e457805160ff1916838001178555610512565b82800160010185558215610512579182015b828111156105115782518255916020019190600101906104f6565b5b50905061051f9190610523565b5090565b61054591905b80821115610541576000816000905550600101610529565b5090565b9056fea165627a7a72305820a8228df52442b6dbd6e7eed0711ce9bcffae5993145743560322a560d4bb07c00029",
		"deployedBytecode": "0x608060405260043610610046576000357c01000000000000000000000000000000000000000000000000000000009004806321310ecd1461004b578063e0b6fcfc14610126575b600080fd5b34801561005757600080fd5b506100846004803603602081101561006e57600080fd5b8101908080359060200190929190505050610215565b60405180806020018560ff1660ff1681526020018460ff1660ff1681526020018360ff1660ff168152602001828103825286818151815260200191508051906020019080838360005b838110156100e85780820151818401526020810190506100cd565b50505050905090810190601f1680156101155780820380516001836020036101000a031916815260200191505b509550505050505060405180910390f35b34801561013257600080fd5b506102136004803603608081101561014957600080fd5b810190808035906020019064010000000081111561016657600080fd5b82018360208201111561017857600080fd5b8035906020019184600183028401116401000000008311171561019a57600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f820116905080830192505050505050509192919290803560ff169060200190929190803560ff169060200190929190803560ff169060200190929190505050610313565b005b60008181548110151561022457fe5b9060005260206000209060020201600091509050806000018054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156102d05780601f106102a5576101008083540402835291602001916102d0565b820191906000526020600020905b8154815290600101906020018083116102b357829003601f168201915b5050505050908060010160009054906101000a900460ff16908060010160019054906101000a900460ff16908060010160029054906101000a900460ff16905084565b60008360ff161415151561032657600080fd5b60006080604051908101604052808681526020018560ff1681526020018460ff1681526020018360ff1681525090806001815401808255809150509060018203906000526020600020906002020160009091929091909150600082015181600001908051906020019061039a9291906104a3565b5060208201518160010160006101000a81548160ff021916908360ff16021790555060408201518160010160016101000a81548160ff021916908360ff16021790555060608201518160010160026101000a81548160ff021916908360ff1602179055505050507f7fd14743a3c1a5ae21b9cdca46574c3fcd42e8b9e3424d3040dd302f3bf5ceb5846040518080602001828103825283818151815260200191508051906020019080838360005b83811015610463578082015181840152602081019050610448565b50505050905090810190601f1680156104905780820380516001836020036101000a031916815260200191505b509250505060405180910390a150505050565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f106104e457805160ff1916838001178555610512565b82800160010185558215610512579182015b828111156105115782518255916020019190600101906104f6565b5b50905061051f9190610523565b5090565b61054591905b80821115610541576000816000905550600101610529565b5090565b9056fea165627a7a72305820a8228df52442b6dbd6e7eed0711ce9bcffae5993145743560322a560d4bb07c00029",
		"sourceMap": "25:455:0:-;;;;8:9:-1;5:2;;;30:1;27;20:12;5:2;25:455:0;;;;;;;",
		"deployedSourceMap": "25:455:0:-;;;;;;;;;;;;;;;;;;;;;;;;;;;209:19;;8:9:-1;5:2;;;30:1;27;20:12;5:2;209:19:0;;;;;;13:2:-1;8:3;5:11;2:2;;;29:1;26;19:12;2:2;209:19:0;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;23:1:-1;8:100;33:3;30:1;27:10;8:100;;;99:1;94:3;90:11;84:18;80:1;75:3;71:11;64:39;52:2;49:1;45:10;40:15;;8:100;;;12:14;209:19:0;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;235:243;;8:9:-1;5:2;;;30:1;27;20:12;5:2;235:243:0;;;;;;13:3:-1;8;5:12;2:2;;;30:1;27;20:12;2:2;235:243:0;;;;;;;;;;21:11:-1;8;5:28;2:2;;;46:1;43;36:12;2:2;235:243:0;;35:9:-1;28:4;12:14;8:25;5:40;2:2;;;58:1;55;48:12;2:2;235:243:0;;;;;;100:9:-1;95:1;81:12;77:20;67:8;63:35;60:50;39:11;25:12;22:29;11:107;8:2;;;131:1;128;121:12;8:2;235:243:0;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;30:3:-1;22:6;14;1:33;99:1;93:3;85:6;81:16;74:27;137:4;133:9;126:4;121:3;117:14;113:30;106:37;;169:3;161:6;157:16;147:26;;235:243:0;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;209:19;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::o;235:243::-;369:1;351:14;:19;;;;343:28;;;;;;;;381:5;392:43;;;;;;;;;397:5;392:43;;;;404:14;392:43;;;;;;420:4;392:43;;;;;;426:8;392:43;;;;;381:55;;39:1:-1;33:3;27:10;23:18;57:10;52:3;45:23;79:10;72:17;;0:93;381:55:0;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;451:20;465:5;451:20;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;23:1:-1;8:100;33:3;30:1;27:10;8:100;;;99:1;94:3;90:11;84:18;80:1;75:3;71:11;64:39;52:2;49:1;45:10;40:15;;8:100;;;12:14;451:20:0;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;235:243;;;;:::o;25:455::-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;:::o;:::-;;;;;;;;;;;;;;;;;;;;;;;;;;;:::o",
		"source": "pragma solidity ^0.5.0;\n\ncontract LimeFactory {\n\n    event FreshLimeTest(string name);\n\n    struct Lime {\n        string name;\n        uint8 carbohydrates;\n        uint8 fat;\n        uint8 protein;\n    }\n\n    Lime[] public limes;\n\n    function createLime(string memory _name, uint8 _carbohydrates, uint8 _fat, uint8 _protein) public {\n        require(_carbohydrates != 0);\n        limes.push(Lime(_name, _carbohydrates, _fat, _protein));\n        emit FreshLimeTest(_name);\n    }\n}",
		"sourcePath": "/Users/ognyanchikov/limepay-contracts/smart-contracts/contracts/LimeFactory.sol",
		"ast": {
		  "absolutePath": "/Users/ognyanchikov/limepay-contracts/smart-contracts/contracts/LimeFactory.sol",
		  "exportedSymbols": {
			"LimeFactory": [
			  51
			]
		  },
		  "id": 52,
		  "nodeType": "SourceUnit",
		  "nodes": [
			{
			  "id": 1,
			  "literals": [
				"solidity",
				"^",
				"0.5",
				".0"
			  ],
			  "nodeType": "PragmaDirective",
			  "src": "0:23:0"
			},
			{
			  "baseContracts": [],
			  "contractDependencies": [],
			  "contractKind": "contract",
			  "documentation": null,
			  "fullyImplemented": true,
			  "id": 51,
			  "linearizedBaseContracts": [
				51
			  ],
			  "name": "LimeFactory",
			  "nodeType": "ContractDefinition",
			  "nodes": [
				{
				  "anonymous": false,
				  "documentation": null,
				  "id": 5,
				  "name": "FreshLimeTest",
				  "nodeType": "EventDefinition",
				  "parameters": {
					"id": 4,
					"nodeType": "ParameterList",
					"parameters": [
					  {
						"constant": false,
						"id": 3,
						"indexed": false,
						"name": "name",
						"nodeType": "VariableDeclaration",
						"scope": 5,
						"src": "73:11:0",
						"stateVariable": false,
						"storageLocation": "default",
						"typeDescriptions": {
						  "typeIdentifier": "t_string_memory_ptr",
						  "typeString": "string"
						},
						"typeName": {
						  "id": 2,
						  "name": "string",
						  "nodeType": "ElementaryTypeName",
						  "src": "73:6:0",
						  "typeDescriptions": {
							"typeIdentifier": "t_string_storage_ptr",
							"typeString": "string"
						  }
						},
						"value": null,
						"visibility": "internal"
					  }
					],
					"src": "72:13:0"
				  },
				  "src": "53:33:0"
				},
				{
				  "canonicalName": "LimeFactory.Lime",
				  "id": 14,
				  "members": [
					{
					  "constant": false,
					  "id": 7,
					  "name": "name",
					  "nodeType": "VariableDeclaration",
					  "scope": 14,
					  "src": "114:11:0",
					  "stateVariable": false,
					  "storageLocation": "default",
					  "typeDescriptions": {
						"typeIdentifier": "t_string_storage_ptr",
						"typeString": "string"
					  },
					  "typeName": {
						"id": 6,
						"name": "string",
						"nodeType": "ElementaryTypeName",
						"src": "114:6:0",
						"typeDescriptions": {
						  "typeIdentifier": "t_string_storage_ptr",
						  "typeString": "string"
						}
					  },
					  "value": null,
					  "visibility": "internal"
					},
					{
					  "constant": false,
					  "id": 9,
					  "name": "carbohydrates",
					  "nodeType": "VariableDeclaration",
					  "scope": 14,
					  "src": "135:19:0",
					  "stateVariable": false,
					  "storageLocation": "default",
					  "typeDescriptions": {
						"typeIdentifier": "t_uint8",
						"typeString": "uint8"
					  },
					  "typeName": {
						"id": 8,
						"name": "uint8",
						"nodeType": "ElementaryTypeName",
						"src": "135:5:0",
						"typeDescriptions": {
						  "typeIdentifier": "t_uint8",
						  "typeString": "uint8"
						}
					  },
					  "value": null,
					  "visibility": "internal"
					},
					{
					  "constant": false,
					  "id": 11,
					  "name": "fat",
					  "nodeType": "VariableDeclaration",
					  "scope": 14,
					  "src": "164:9:0",
					  "stateVariable": false,
					  "storageLocation": "default",
					  "typeDescriptions": {
						"typeIdentifier": "t_uint8",
						"typeString": "uint8"
					  },
					  "typeName": {
						"id": 10,
						"name": "uint8",
						"nodeType": "ElementaryTypeName",
						"src": "164:5:0",
						"typeDescriptions": {
						  "typeIdentifier": "t_uint8",
						  "typeString": "uint8"
						}
					  },
					  "value": null,
					  "visibility": "internal"
					},
					{
					  "constant": false,
					  "id": 13,
					  "name": "protein",
					  "nodeType": "VariableDeclaration",
					  "scope": 14,
					  "src": "183:13:0",
					  "stateVariable": false,
					  "storageLocation": "default",
					  "typeDescriptions": {
						"typeIdentifier": "t_uint8",
						"typeString": "uint8"
					  },
					  "typeName": {
						"id": 12,
						"name": "uint8",
						"nodeType": "ElementaryTypeName",
						"src": "183:5:0",
						"typeDescriptions": {
						  "typeIdentifier": "t_uint8",
						  "typeString": "uint8"
						}
					  },
					  "value": null,
					  "visibility": "internal"
					}
				  ],
				  "name": "Lime",
				  "nodeType": "StructDefinition",
				  "scope": 51,
				  "src": "92:111:0",
				  "visibility": "public"
				},
				{
				  "constant": false,
				  "id": 17,
				  "name": "limes",
				  "nodeType": "VariableDeclaration",
				  "scope": 51,
				  "src": "209:19:0",
				  "stateVariable": true,
				  "storageLocation": "default",
				  "typeDescriptions": {
					"typeIdentifier": "t_array$_t_struct$_Lime_$14_storage_$dyn_storage",
					"typeString": "struct LimeFactory.Lime[]"
				  },
				  "typeName": {
					"baseType": {
					  "contractScope": null,
					  "id": 15,
					  "name": "Lime",
					  "nodeType": "UserDefinedTypeName",
					  "referencedDeclaration": 14,
					  "src": "209:4:0",
					  "typeDescriptions": {
						"typeIdentifier": "t_struct$_Lime_$14_storage_ptr",
						"typeString": "struct LimeFactory.Lime"
					  }
					},
					"id": 16,
					"length": null,
					"nodeType": "ArrayTypeName",
					"src": "209:6:0",
					"typeDescriptions": {
					  "typeIdentifier": "t_array$_t_struct$_Lime_$14_storage_$dyn_storage_ptr",
					  "typeString": "struct LimeFactory.Lime[]"
					}
				  },
				  "value": null,
				  "visibility": "public"
				},
				{
				  "body": {
					"id": 49,
					"nodeType": "Block",
					"src": "333:145:0",
					"statements": [
					  {
						"expression": {
						  "argumentTypes": null,
						  "arguments": [
							{
							  "argumentTypes": null,
							  "commonType": {
								"typeIdentifier": "t_uint8",
								"typeString": "uint8"
							  },
							  "id": 31,
							  "isConstant": false,
							  "isLValue": false,
							  "isPure": false,
							  "lValueRequested": false,
							  "leftExpression": {
								"argumentTypes": null,
								"id": 29,
								"name": "_carbohydrates",
								"nodeType": "Identifier",
								"overloadedDeclarations": [],
								"referencedDeclaration": 21,
								"src": "351:14:0",
								"typeDescriptions": {
								  "typeIdentifier": "t_uint8",
								  "typeString": "uint8"
								}
							  },
							  "nodeType": "BinaryOperation",
							  "operator": "!=",
							  "rightExpression": {
								"argumentTypes": null,
								"hexValue": "30",
								"id": 30,
								"isConstant": false,
								"isLValue": false,
								"isPure": true,
								"kind": "number",
								"lValueRequested": false,
								"nodeType": "Literal",
								"src": "369:1:0",
								"subdenomination": null,
								"typeDescriptions": {
								  "typeIdentifier": "t_rational_0_by_1",
								  "typeString": "int_const 0"
								},
								"value": "0"
							  },
							  "src": "351:19:0",
							  "typeDescriptions": {
								"typeIdentifier": "t_bool",
								"typeString": "bool"
							  }
							}
						  ],
						  "expression": {
							"argumentTypes": [
							  {
								"typeIdentifier": "t_bool",
								"typeString": "bool"
							  }
							],
							"id": 28,
							"name": "require",
							"nodeType": "Identifier",
							"overloadedDeclarations": [
							  69,
							  70
							],
							"referencedDeclaration": 69,
							"src": "343:7:0",
							"typeDescriptions": {
							  "typeIdentifier": "t_function_require_pure$_t_bool_$returns$__$",
							  "typeString": "function (bool) pure"
							}
						  },
						  "id": 32,
						  "isConstant": false,
						  "isLValue": false,
						  "isPure": false,
						  "kind": "functionCall",
						  "lValueRequested": false,
						  "names": [],
						  "nodeType": "FunctionCall",
						  "src": "343:28:0",
						  "typeDescriptions": {
							"typeIdentifier": "t_tuple$__$",
							"typeString": "tuple()"
						  }
						},
						"id": 33,
						"nodeType": "ExpressionStatement",
						"src": "343:28:0"
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
								  "id": 38,
								  "name": "_name",
								  "nodeType": "Identifier",
								  "overloadedDeclarations": [],
								  "referencedDeclaration": 19,
								  "src": "397:5:0",
								  "typeDescriptions": {
									"typeIdentifier": "t_string_memory_ptr",
									"typeString": "string memory"
								  }
								},
								{
								  "argumentTypes": null,
								  "id": 39,
								  "name": "_carbohydrates",
								  "nodeType": "Identifier",
								  "overloadedDeclarations": [],
								  "referencedDeclaration": 21,
								  "src": "404:14:0",
								  "typeDescriptions": {
									"typeIdentifier": "t_uint8",
									"typeString": "uint8"
								  }
								},
								{
								  "argumentTypes": null,
								  "id": 40,
								  "name": "_fat",
								  "nodeType": "Identifier",
								  "overloadedDeclarations": [],
								  "referencedDeclaration": 23,
								  "src": "420:4:0",
								  "typeDescriptions": {
									"typeIdentifier": "t_uint8",
									"typeString": "uint8"
								  }
								},
								{
								  "argumentTypes": null,
								  "id": 41,
								  "name": "_protein",
								  "nodeType": "Identifier",
								  "overloadedDeclarations": [],
								  "referencedDeclaration": 25,
								  "src": "426:8:0",
								  "typeDescriptions": {
									"typeIdentifier": "t_uint8",
									"typeString": "uint8"
								  }
								}
							  ],
							  "expression": {
								"argumentTypes": [
								  {
									"typeIdentifier": "t_string_memory_ptr",
									"typeString": "string memory"
								  },
								  {
									"typeIdentifier": "t_uint8",
									"typeString": "uint8"
								  },
								  {
									"typeIdentifier": "t_uint8",
									"typeString": "uint8"
								  },
								  {
									"typeIdentifier": "t_uint8",
									"typeString": "uint8"
								  }
								],
								"id": 37,
								"name": "Lime",
								"nodeType": "Identifier",
								"overloadedDeclarations": [],
								"referencedDeclaration": 14,
								"src": "392:4:0",
								"typeDescriptions": {
								  "typeIdentifier": "t_type$_t_struct$_Lime_$14_storage_ptr_$",
								  "typeString": "type(struct LimeFactory.Lime storage pointer)"
								}
							  },
							  "id": 42,
							  "isConstant": false,
							  "isLValue": false,
							  "isPure": false,
							  "kind": "structConstructorCall",
							  "lValueRequested": false,
							  "names": [],
							  "nodeType": "FunctionCall",
							  "src": "392:43:0",
							  "typeDescriptions": {
								"typeIdentifier": "t_struct$_Lime_$14_memory",
								"typeString": "struct LimeFactory.Lime memory"
							  }
							}
						  ],
						  "expression": {
							"argumentTypes": [
							  {
								"typeIdentifier": "t_struct$_Lime_$14_memory",
								"typeString": "struct LimeFactory.Lime memory"
							  }
							],
							"expression": {
							  "argumentTypes": null,
							  "id": 34,
							  "name": "limes",
							  "nodeType": "Identifier",
							  "overloadedDeclarations": [],
							  "referencedDeclaration": 17,
							  "src": "381:5:0",
							  "typeDescriptions": {
								"typeIdentifier": "t_array$_t_struct$_Lime_$14_storage_$dyn_storage",
								"typeString": "struct LimeFactory.Lime storage ref[] storage ref"
							  }
							},
							"id": 36,
							"isConstant": false,
							"isLValue": false,
							"isPure": false,
							"lValueRequested": false,
							"memberName": "push",
							"nodeType": "MemberAccess",
							"referencedDeclaration": null,
							"src": "381:10:0",
							"typeDescriptions": {
							  "typeIdentifier": "t_function_arraypush_nonpayable$_t_struct$_Lime_$14_storage_$returns$_t_uint256_$",
							  "typeString": "function (struct LimeFactory.Lime storage ref) returns (uint256)"
							}
						  },
						  "id": 43,
						  "isConstant": false,
						  "isLValue": false,
						  "isPure": false,
						  "kind": "functionCall",
						  "lValueRequested": false,
						  "names": [],
						  "nodeType": "FunctionCall",
						  "src": "381:55:0",
						  "typeDescriptions": {
							"typeIdentifier": "t_uint256",
							"typeString": "uint256"
						  }
						},
						"id": 44,
						"nodeType": "ExpressionStatement",
						"src": "381:55:0"
					  },
					  {
						"eventCall": {
						  "argumentTypes": null,
						  "arguments": [
							{
							  "argumentTypes": null,
							  "id": 46,
							  "name": "_name",
							  "nodeType": "Identifier",
							  "overloadedDeclarations": [],
							  "referencedDeclaration": 19,
							  "src": "465:5:0",
							  "typeDescriptions": {
								"typeIdentifier": "t_string_memory_ptr",
								"typeString": "string memory"
							  }
							}
						  ],
						  "expression": {
							"argumentTypes": [
							  {
								"typeIdentifier": "t_string_memory_ptr",
								"typeString": "string memory"
							  }
							],
							"id": 45,
							"name": "FreshLimeTest",
							"nodeType": "Identifier",
							"overloadedDeclarations": [],
							"referencedDeclaration": 5,
							"src": "451:13:0",
							"typeDescriptions": {
							  "typeIdentifier": "t_function_event_nonpayable$_t_string_memory_ptr_$returns$__$",
							  "typeString": "function (string memory)"
							}
						  },
						  "id": 47,
						  "isConstant": false,
						  "isLValue": false,
						  "isPure": false,
						  "kind": "functionCall",
						  "lValueRequested": false,
						  "names": [],
						  "nodeType": "FunctionCall",
						  "src": "451:20:0",
						  "typeDescriptions": {
							"typeIdentifier": "t_tuple$__$",
							"typeString": "tuple()"
						  }
						},
						"id": 48,
						"nodeType": "EmitStatement",
						"src": "446:25:0"
					  }
					]
				  },
				  "documentation": null,
				  "id": 50,
				  "implemented": true,
				  "kind": "function",
				  "modifiers": [],
				  "name": "createLime",
				  "nodeType": "FunctionDefinition",
				  "parameters": {
					"id": 26,
					"nodeType": "ParameterList",
					"parameters": [
					  {
						"constant": false,
						"id": 19,
						"name": "_name",
						"nodeType": "VariableDeclaration",
						"scope": 50,
						"src": "255:19:0",
						"stateVariable": false,
						"storageLocation": "memory",
						"typeDescriptions": {
						  "typeIdentifier": "t_string_memory_ptr",
						  "typeString": "string"
						},
						"typeName": {
						  "id": 18,
						  "name": "string",
						  "nodeType": "ElementaryTypeName",
						  "src": "255:6:0",
						  "typeDescriptions": {
							"typeIdentifier": "t_string_storage_ptr",
							"typeString": "string"
						  }
						},
						"value": null,
						"visibility": "internal"
					  },
					  {
						"constant": false,
						"id": 21,
						"name": "_carbohydrates",
						"nodeType": "VariableDeclaration",
						"scope": 50,
						"src": "276:20:0",
						"stateVariable": false,
						"storageLocation": "default",
						"typeDescriptions": {
						  "typeIdentifier": "t_uint8",
						  "typeString": "uint8"
						},
						"typeName": {
						  "id": 20,
						  "name": "uint8",
						  "nodeType": "ElementaryTypeName",
						  "src": "276:5:0",
						  "typeDescriptions": {
							"typeIdentifier": "t_uint8",
							"typeString": "uint8"
						  }
						},
						"value": null,
						"visibility": "internal"
					  },
					  {
						"constant": false,
						"id": 23,
						"name": "_fat",
						"nodeType": "VariableDeclaration",
						"scope": 50,
						"src": "298:10:0",
						"stateVariable": false,
						"storageLocation": "default",
						"typeDescriptions": {
						  "typeIdentifier": "t_uint8",
						  "typeString": "uint8"
						},
						"typeName": {
						  "id": 22,
						  "name": "uint8",
						  "nodeType": "ElementaryTypeName",
						  "src": "298:5:0",
						  "typeDescriptions": {
							"typeIdentifier": "t_uint8",
							"typeString": "uint8"
						  }
						},
						"value": null,
						"visibility": "internal"
					  },
					  {
						"constant": false,
						"id": 25,
						"name": "_protein",
						"nodeType": "VariableDeclaration",
						"scope": 50,
						"src": "310:14:0",
						"stateVariable": false,
						"storageLocation": "default",
						"typeDescriptions": {
						  "typeIdentifier": "t_uint8",
						  "typeString": "uint8"
						},
						"typeName": {
						  "id": 24,
						  "name": "uint8",
						  "nodeType": "ElementaryTypeName",
						  "src": "310:5:0",
						  "typeDescriptions": {
							"typeIdentifier": "t_uint8",
							"typeString": "uint8"
						  }
						},
						"value": null,
						"visibility": "internal"
					  }
					],
					"src": "254:71:0"
				  },
				  "returnParameters": {
					"id": 27,
					"nodeType": "ParameterList",
					"parameters": [],
					"src": "333:0:0"
				  },
				  "scope": 51,
				  "src": "235:243:0",
				  "stateMutability": "nonpayable",
				  "superFunction": null,
				  "visibility": "public"
				}
			  ],
			  "scope": 52,
			  "src": "25:455:0"
			}
		  ],
		  "src": "0:480:0"
		},
		"legacyAST": {
		  "absolutePath": "/Users/ognyanchikov/limepay-contracts/smart-contracts/contracts/LimeFactory.sol",
		  "exportedSymbols": {
			"LimeFactory": [
			  51
			]
		  },
		  "id": 52,
		  "nodeType": "SourceUnit",
		  "nodes": [
			{
			  "id": 1,
			  "literals": [
				"solidity",
				"^",
				"0.5",
				".0"
			  ],
			  "nodeType": "PragmaDirective",
			  "src": "0:23:0"
			},
			{
			  "baseContracts": [],
			  "contractDependencies": [],
			  "contractKind": "contract",
			  "documentation": null,
			  "fullyImplemented": true,
			  "id": 51,
			  "linearizedBaseContracts": [
				51
			  ],
			  "name": "LimeFactory",
			  "nodeType": "ContractDefinition",
			  "nodes": [
				{
				  "anonymous": false,
				  "documentation": null,
				  "id": 5,
				  "name": "FreshLimeTest",
				  "nodeType": "EventDefinition",
				  "parameters": {
					"id": 4,
					"nodeType": "ParameterList",
					"parameters": [
					  {
						"constant": false,
						"id": 3,
						"indexed": false,
						"name": "name",
						"nodeType": "VariableDeclaration",
						"scope": 5,
						"src": "73:11:0",
						"stateVariable": false,
						"storageLocation": "default",
						"typeDescriptions": {
						  "typeIdentifier": "t_string_memory_ptr",
						  "typeString": "string"
						},
						"typeName": {
						  "id": 2,
						  "name": "string",
						  "nodeType": "ElementaryTypeName",
						  "src": "73:6:0",
						  "typeDescriptions": {
							"typeIdentifier": "t_string_storage_ptr",
							"typeString": "string"
						  }
						},
						"value": null,
						"visibility": "internal"
					  }
					],
					"src": "72:13:0"
				  },
				  "src": "53:33:0"
				},
				{
				  "canonicalName": "LimeFactory.Lime",
				  "id": 14,
				  "members": [
					{
					  "constant": false,
					  "id": 7,
					  "name": "name",
					  "nodeType": "VariableDeclaration",
					  "scope": 14,
					  "src": "114:11:0",
					  "stateVariable": false,
					  "storageLocation": "default",
					  "typeDescriptions": {
						"typeIdentifier": "t_string_storage_ptr",
						"typeString": "string"
					  },
					  "typeName": {
						"id": 6,
						"name": "string",
						"nodeType": "ElementaryTypeName",
						"src": "114:6:0",
						"typeDescriptions": {
						  "typeIdentifier": "t_string_storage_ptr",
						  "typeString": "string"
						}
					  },
					  "value": null,
					  "visibility": "internal"
					},
					{
					  "constant": false,
					  "id": 9,
					  "name": "carbohydrates",
					  "nodeType": "VariableDeclaration",
					  "scope": 14,
					  "src": "135:19:0",
					  "stateVariable": false,
					  "storageLocation": "default",
					  "typeDescriptions": {
						"typeIdentifier": "t_uint8",
						"typeString": "uint8"
					  },
					  "typeName": {
						"id": 8,
						"name": "uint8",
						"nodeType": "ElementaryTypeName",
						"src": "135:5:0",
						"typeDescriptions": {
						  "typeIdentifier": "t_uint8",
						  "typeString": "uint8"
						}
					  },
					  "value": null,
					  "visibility": "internal"
					},
					{
					  "constant": false,
					  "id": 11,
					  "name": "fat",
					  "nodeType": "VariableDeclaration",
					  "scope": 14,
					  "src": "164:9:0",
					  "stateVariable": false,
					  "storageLocation": "default",
					  "typeDescriptions": {
						"typeIdentifier": "t_uint8",
						"typeString": "uint8"
					  },
					  "typeName": {
						"id": 10,
						"name": "uint8",
						"nodeType": "ElementaryTypeName",
						"src": "164:5:0",
						"typeDescriptions": {
						  "typeIdentifier": "t_uint8",
						  "typeString": "uint8"
						}
					  },
					  "value": null,
					  "visibility": "internal"
					},
					{
					  "constant": false,
					  "id": 13,
					  "name": "protein",
					  "nodeType": "VariableDeclaration",
					  "scope": 14,
					  "src": "183:13:0",
					  "stateVariable": false,
					  "storageLocation": "default",
					  "typeDescriptions": {
						"typeIdentifier": "t_uint8",
						"typeString": "uint8"
					  },
					  "typeName": {
						"id": 12,
						"name": "uint8",
						"nodeType": "ElementaryTypeName",
						"src": "183:5:0",
						"typeDescriptions": {
						  "typeIdentifier": "t_uint8",
						  "typeString": "uint8"
						}
					  },
					  "value": null,
					  "visibility": "internal"
					}
				  ],
				  "name": "Lime",
				  "nodeType": "StructDefinition",
				  "scope": 51,
				  "src": "92:111:0",
				  "visibility": "public"
				},
				{
				  "constant": false,
				  "id": 17,
				  "name": "limes",
				  "nodeType": "VariableDeclaration",
				  "scope": 51,
				  "src": "209:19:0",
				  "stateVariable": true,
				  "storageLocation": "default",
				  "typeDescriptions": {
					"typeIdentifier": "t_array$_t_struct$_Lime_$14_storage_$dyn_storage",
					"typeString": "struct LimeFactory.Lime[]"
				  },
				  "typeName": {
					"baseType": {
					  "contractScope": null,
					  "id": 15,
					  "name": "Lime",
					  "nodeType": "UserDefinedTypeName",
					  "referencedDeclaration": 14,
					  "src": "209:4:0",
					  "typeDescriptions": {
						"typeIdentifier": "t_struct$_Lime_$14_storage_ptr",
						"typeString": "struct LimeFactory.Lime"
					  }
					},
					"id": 16,
					"length": null,
					"nodeType": "ArrayTypeName",
					"src": "209:6:0",
					"typeDescriptions": {
					  "typeIdentifier": "t_array$_t_struct$_Lime_$14_storage_$dyn_storage_ptr",
					  "typeString": "struct LimeFactory.Lime[]"
					}
				  },
				  "value": null,
				  "visibility": "public"
				},
				{
				  "body": {
					"id": 49,
					"nodeType": "Block",
					"src": "333:145:0",
					"statements": [
					  {
						"expression": {
						  "argumentTypes": null,
						  "arguments": [
							{
							  "argumentTypes": null,
							  "commonType": {
								"typeIdentifier": "t_uint8",
								"typeString": "uint8"
							  },
							  "id": 31,
							  "isConstant": false,
							  "isLValue": false,
							  "isPure": false,
							  "lValueRequested": false,
							  "leftExpression": {
								"argumentTypes": null,
								"id": 29,
								"name": "_carbohydrates",
								"nodeType": "Identifier",
								"overloadedDeclarations": [],
								"referencedDeclaration": 21,
								"src": "351:14:0",
								"typeDescriptions": {
								  "typeIdentifier": "t_uint8",
								  "typeString": "uint8"
								}
							  },
							  "nodeType": "BinaryOperation",
							  "operator": "!=",
							  "rightExpression": {
								"argumentTypes": null,
								"hexValue": "30",
								"id": 30,
								"isConstant": false,
								"isLValue": false,
								"isPure": true,
								"kind": "number",
								"lValueRequested": false,
								"nodeType": "Literal",
								"src": "369:1:0",
								"subdenomination": null,
								"typeDescriptions": {
								  "typeIdentifier": "t_rational_0_by_1",
								  "typeString": "int_const 0"
								},
								"value": "0"
							  },
							  "src": "351:19:0",
							  "typeDescriptions": {
								"typeIdentifier": "t_bool",
								"typeString": "bool"
							  }
							}
						  ],
						  "expression": {
							"argumentTypes": [
							  {
								"typeIdentifier": "t_bool",
								"typeString": "bool"
							  }
							],
							"id": 28,
							"name": "require",
							"nodeType": "Identifier",
							"overloadedDeclarations": [
							  69,
							  70
							],
							"referencedDeclaration": 69,
							"src": "343:7:0",
							"typeDescriptions": {
							  "typeIdentifier": "t_function_require_pure$_t_bool_$returns$__$",
							  "typeString": "function (bool) pure"
							}
						  },
						  "id": 32,
						  "isConstant": false,
						  "isLValue": false,
						  "isPure": false,
						  "kind": "functionCall",
						  "lValueRequested": false,
						  "names": [],
						  "nodeType": "FunctionCall",
						  "src": "343:28:0",
						  "typeDescriptions": {
							"typeIdentifier": "t_tuple$__$",
							"typeString": "tuple()"
						  }
						},
						"id": 33,
						"nodeType": "ExpressionStatement",
						"src": "343:28:0"
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
								  "id": 38,
								  "name": "_name",
								  "nodeType": "Identifier",
								  "overloadedDeclarations": [],
								  "referencedDeclaration": 19,
								  "src": "397:5:0",
								  "typeDescriptions": {
									"typeIdentifier": "t_string_memory_ptr",
									"typeString": "string memory"
								  }
								},
								{
								  "argumentTypes": null,
								  "id": 39,
								  "name": "_carbohydrates",
								  "nodeType": "Identifier",
								  "overloadedDeclarations": [],
								  "referencedDeclaration": 21,
								  "src": "404:14:0",
								  "typeDescriptions": {
									"typeIdentifier": "t_uint8",
									"typeString": "uint8"
								  }
								},
								{
								  "argumentTypes": null,
								  "id": 40,
								  "name": "_fat",
								  "nodeType": "Identifier",
								  "overloadedDeclarations": [],
								  "referencedDeclaration": 23,
								  "src": "420:4:0",
								  "typeDescriptions": {
									"typeIdentifier": "t_uint8",
									"typeString": "uint8"
								  }
								},
								{
								  "argumentTypes": null,
								  "id": 41,
								  "name": "_protein",
								  "nodeType": "Identifier",
								  "overloadedDeclarations": [],
								  "referencedDeclaration": 25,
								  "src": "426:8:0",
								  "typeDescriptions": {
									"typeIdentifier": "t_uint8",
									"typeString": "uint8"
								  }
								}
							  ],
							  "expression": {
								"argumentTypes": [
								  {
									"typeIdentifier": "t_string_memory_ptr",
									"typeString": "string memory"
								  },
								  {
									"typeIdentifier": "t_uint8",
									"typeString": "uint8"
								  },
								  {
									"typeIdentifier": "t_uint8",
									"typeString": "uint8"
								  },
								  {
									"typeIdentifier": "t_uint8",
									"typeString": "uint8"
								  }
								],
								"id": 37,
								"name": "Lime",
								"nodeType": "Identifier",
								"overloadedDeclarations": [],
								"referencedDeclaration": 14,
								"src": "392:4:0",
								"typeDescriptions": {
								  "typeIdentifier": "t_type$_t_struct$_Lime_$14_storage_ptr_$",
								  "typeString": "type(struct LimeFactory.Lime storage pointer)"
								}
							  },
							  "id": 42,
							  "isConstant": false,
							  "isLValue": false,
							  "isPure": false,
							  "kind": "structConstructorCall",
							  "lValueRequested": false,
							  "names": [],
							  "nodeType": "FunctionCall",
							  "src": "392:43:0",
							  "typeDescriptions": {
								"typeIdentifier": "t_struct$_Lime_$14_memory",
								"typeString": "struct LimeFactory.Lime memory"
							  }
							}
						  ],
						  "expression": {
							"argumentTypes": [
							  {
								"typeIdentifier": "t_struct$_Lime_$14_memory",
								"typeString": "struct LimeFactory.Lime memory"
							  }
							],
							"expression": {
							  "argumentTypes": null,
							  "id": 34,
							  "name": "limes",
							  "nodeType": "Identifier",
							  "overloadedDeclarations": [],
							  "referencedDeclaration": 17,
							  "src": "381:5:0",
							  "typeDescriptions": {
								"typeIdentifier": "t_array$_t_struct$_Lime_$14_storage_$dyn_storage",
								"typeString": "struct LimeFactory.Lime storage ref[] storage ref"
							  }
							},
							"id": 36,
							"isConstant": false,
							"isLValue": false,
							"isPure": false,
							"lValueRequested": false,
							"memberName": "push",
							"nodeType": "MemberAccess",
							"referencedDeclaration": null,
							"src": "381:10:0",
							"typeDescriptions": {
							  "typeIdentifier": "t_function_arraypush_nonpayable$_t_struct$_Lime_$14_storage_$returns$_t_uint256_$",
							  "typeString": "function (struct LimeFactory.Lime storage ref) returns (uint256)"
							}
						  },
						  "id": 43,
						  "isConstant": false,
						  "isLValue": false,
						  "isPure": false,
						  "kind": "functionCall",
						  "lValueRequested": false,
						  "names": [],
						  "nodeType": "FunctionCall",
						  "src": "381:55:0",
						  "typeDescriptions": {
							"typeIdentifier": "t_uint256",
							"typeString": "uint256"
						  }
						},
						"id": 44,
						"nodeType": "ExpressionStatement",
						"src": "381:55:0"
					  },
					  {
						"eventCall": {
						  "argumentTypes": null,
						  "arguments": [
							{
							  "argumentTypes": null,
							  "id": 46,
							  "name": "_name",
							  "nodeType": "Identifier",
							  "overloadedDeclarations": [],
							  "referencedDeclaration": 19,
							  "src": "465:5:0",
							  "typeDescriptions": {
								"typeIdentifier": "t_string_memory_ptr",
								"typeString": "string memory"
							  }
							}
						  ],
						  "expression": {
							"argumentTypes": [
							  {
								"typeIdentifier": "t_string_memory_ptr",
								"typeString": "string memory"
							  }
							],
							"id": 45,
							"name": "FreshLimeTest",
							"nodeType": "Identifier",
							"overloadedDeclarations": [],
							"referencedDeclaration": 5,
							"src": "451:13:0",
							"typeDescriptions": {
							  "typeIdentifier": "t_function_event_nonpayable$_t_string_memory_ptr_$returns$__$",
							  "typeString": "function (string memory)"
							}
						  },
						  "id": 47,
						  "isConstant": false,
						  "isLValue": false,
						  "isPure": false,
						  "kind": "functionCall",
						  "lValueRequested": false,
						  "names": [],
						  "nodeType": "FunctionCall",
						  "src": "451:20:0",
						  "typeDescriptions": {
							"typeIdentifier": "t_tuple$__$",
							"typeString": "tuple()"
						  }
						},
						"id": 48,
						"nodeType": "EmitStatement",
						"src": "446:25:0"
					  }
					]
				  },
				  "documentation": null,
				  "id": 50,
				  "implemented": true,
				  "kind": "function",
				  "modifiers": [],
				  "name": "createLime",
				  "nodeType": "FunctionDefinition",
				  "parameters": {
					"id": 26,
					"nodeType": "ParameterList",
					"parameters": [
					  {
						"constant": false,
						"id": 19,
						"name": "_name",
						"nodeType": "VariableDeclaration",
						"scope": 50,
						"src": "255:19:0",
						"stateVariable": false,
						"storageLocation": "memory",
						"typeDescriptions": {
						  "typeIdentifier": "t_string_memory_ptr",
						  "typeString": "string"
						},
						"typeName": {
						  "id": 18,
						  "name": "string",
						  "nodeType": "ElementaryTypeName",
						  "src": "255:6:0",
						  "typeDescriptions": {
							"typeIdentifier": "t_string_storage_ptr",
							"typeString": "string"
						  }
						},
						"value": null,
						"visibility": "internal"
					  },
					  {
						"constant": false,
						"id": 21,
						"name": "_carbohydrates",
						"nodeType": "VariableDeclaration",
						"scope": 50,
						"src": "276:20:0",
						"stateVariable": false,
						"storageLocation": "default",
						"typeDescriptions": {
						  "typeIdentifier": "t_uint8",
						  "typeString": "uint8"
						},
						"typeName": {
						  "id": 20,
						  "name": "uint8",
						  "nodeType": "ElementaryTypeName",
						  "src": "276:5:0",
						  "typeDescriptions": {
							"typeIdentifier": "t_uint8",
							"typeString": "uint8"
						  }
						},
						"value": null,
						"visibility": "internal"
					  },
					  {
						"constant": false,
						"id": 23,
						"name": "_fat",
						"nodeType": "VariableDeclaration",
						"scope": 50,
						"src": "298:10:0",
						"stateVariable": false,
						"storageLocation": "default",
						"typeDescriptions": {
						  "typeIdentifier": "t_uint8",
						  "typeString": "uint8"
						},
						"typeName": {
						  "id": 22,
						  "name": "uint8",
						  "nodeType": "ElementaryTypeName",
						  "src": "298:5:0",
						  "typeDescriptions": {
							"typeIdentifier": "t_uint8",
							"typeString": "uint8"
						  }
						},
						"value": null,
						"visibility": "internal"
					  },
					  {
						"constant": false,
						"id": 25,
						"name": "_protein",
						"nodeType": "VariableDeclaration",
						"scope": 50,
						"src": "310:14:0",
						"stateVariable": false,
						"storageLocation": "default",
						"typeDescriptions": {
						  "typeIdentifier": "t_uint8",
						  "typeString": "uint8"
						},
						"typeName": {
						  "id": 24,
						  "name": "uint8",
						  "nodeType": "ElementaryTypeName",
						  "src": "310:5:0",
						  "typeDescriptions": {
							"typeIdentifier": "t_uint8",
							"typeString": "uint8"
						  }
						},
						"value": null,
						"visibility": "internal"
					  }
					],
					"src": "254:71:0"
				  },
				  "returnParameters": {
					"id": 27,
					"nodeType": "ParameterList",
					"parameters": [],
					"src": "333:0:0"
				  },
				  "scope": 51,
				  "src": "235:243:0",
				  "stateMutability": "nonpayable",
				  "superFunction": null,
				  "visibility": "public"
				}
			  ],
			  "scope": 52,
			  "src": "25:455:0"
			}
		  ],
		  "src": "0:480:0"
		},
		"compiler": {
		  "name": "solc",
		  "version": "0.5.1+commit.c8a2cb62.Emscripten.clang",
		  "optimizer": false,
		  "runs": 200
		},
		"networks": {},
		"schemaVersion": "1.1.2",
		"updatedAt": "2019-05-13T12:47:27.572Z"
}

module.exports = compiledContract;