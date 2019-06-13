const mockTokenOptimized = {
		"contractName": "Mock_Token_Optimized",
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
		"bytecode": "0x608060405234801561001057600080fd5b50604080518082018252600d81527f4c696d6550617920546f6b656e0000000000000000000000000000000000000060208083019182528351808501909452600284527f4c5000000000000000000000000000000000000000000000000000000000000090840152815191929160129161008d91600391906101ac565b5081516100a19060049060208501906101ac565b506005805460ff191660ff92909216919091179055506100d690503369152d02c7e14af68000006401000000006100db810204565b610247565b600160a060020a03821615156100f057600080fd5b60025461010a90826401000000006107fb61019382021704565b600255600160a060020a03821660009081526020819052604090205461013d90826401000000006107fb61019382021704565b600160a060020a0383166000818152602081815260408083209490945583518581529351929391927fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9281900390910190a35050565b6000828201838110156101a557600080fd5b9392505050565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f106101ed57805160ff191683800117855561021a565b8280016001018555821561021a579182015b8281111561021a5782518255916020019190600101906101ff565b5061022692915061022a565b5090565b61024491905b808211156102265760008155600101610230565b90565b610840806102566000396000f3fe6080604052600436106100b3577c0100000000000000000000000000000000000000000000000000000000600035046306fdde0381146100b8578063095ea7b31461014257806318160ddd1461018f57806323b872dd146101b65780632ff2e9dc146101f9578063313ce5671461020e578063395093511461023957806370a082311461027257806395d89b41146102a5578063a457c2d7146102ba578063a9059cbb146102f3578063dd62ed3e1461032c575b600080fd5b3480156100c457600080fd5b506100cd610367565b6040805160208082528351818301528351919283929083019185019080838360005b838110156101075781810151838201526020016100ef565b50505050905090810190601f1680156101345780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b34801561014e57600080fd5b5061017b6004803603604081101561016557600080fd5b50600160a060020a0381351690602001356103fd565b604080519115158252519081900360200190f35b34801561019b57600080fd5b506101a461047b565b60408051918252519081900360200190f35b3480156101c257600080fd5b5061017b600480360360608110156101d957600080fd5b50600160a060020a03813581169160208101359091169060400135610481565b34801561020557600080fd5b506101a461054a565b34801561021a57600080fd5b50610223610558565b6040805160ff9092168252519081900360200190f35b34801561024557600080fd5b5061017b6004803603604081101561025c57600080fd5b50600160a060020a038135169060200135610561565b34801561027e57600080fd5b506101a46004803603602081101561029557600080fd5b5035600160a060020a0316610611565b3480156102b157600080fd5b506100cd61062c565b3480156102c657600080fd5b5061017b600480360360408110156102dd57600080fd5b50600160a060020a03813516906020013561068d565b3480156102ff57600080fd5b5061017b6004803603604081101561031657600080fd5b50600160a060020a0381351690602001356106d8565b34801561033857600080fd5b506101a46004803603604081101561034f57600080fd5b50600160a060020a03813581169160200135166106ee565b60038054604080516020601f60026000196101006001881615020190951694909404938401819004810282018101909252828152606093909290918301828280156103f35780601f106103c8576101008083540402835291602001916103f3565b820191906000526020600020905b8154815290600101906020018083116103d657829003601f168201915b5050505050905090565b6000600160a060020a038316151561041457600080fd5b336000818152600160209081526040808320600160a060020a03881680855290835292819020869055805186815290519293927f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925929181900390910190a350600192915050565b60025490565b600160a060020a03831660009081526001602090815260408083203384529091528120546104b5908363ffffffff61071916565b600160a060020a03851660009081526001602090815260408083203384529091529020556104e484848461072e565b600160a060020a0384166000818152600160209081526040808320338085529083529281902054815190815290519293927f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925929181900390910190a35060019392505050565b69152d02c7e14af680000081565b60055460ff1690565b6000600160a060020a038316151561057857600080fd5b336000908152600160209081526040808320600160a060020a03871684529091529020546105ac908363ffffffff6107fb16565b336000818152600160209081526040808320600160a060020a0389168085529083529281902085905580519485525191937f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925929081900390910190a350600192915050565b600160a060020a031660009081526020819052604090205490565b60048054604080516020601f60026000196101006001881615020190951694909404938401819004810282018101909252828152606093909290918301828280156103f35780601f106103c8576101008083540402835291602001916103f3565b6000600160a060020a03831615156106a457600080fd5b336000908152600160209081526040808320600160a060020a03871684529091529020546105ac908363ffffffff61071916565b60006106e533848461072e565b50600192915050565b600160a060020a03918216600090815260016020908152604080832093909416825291909152205490565b60008282111561072857600080fd5b50900390565b600160a060020a038216151561074357600080fd5b600160a060020a03831660009081526020819052604090205461076c908263ffffffff61071916565b600160a060020a0380851660009081526020819052604080822093909355908416815220546107a1908263ffffffff6107fb16565b600160a060020a038084166000818152602081815260409182902094909455805185815290519193928716927fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef92918290030190a3505050565b60008282018381101561080d57600080fd5b939250505056fea165627a7a72305820c819268e55d13b22d5a7181526738879a49286f21bdbe30854a85568196c35aa0029",
		"deployedBytecode": "0x6080604052600436106100b3577c0100000000000000000000000000000000000000000000000000000000600035046306fdde0381146100b8578063095ea7b31461014257806318160ddd1461018f57806323b872dd146101b65780632ff2e9dc146101f9578063313ce5671461020e578063395093511461023957806370a082311461027257806395d89b41146102a5578063a457c2d7146102ba578063a9059cbb146102f3578063dd62ed3e1461032c575b600080fd5b3480156100c457600080fd5b506100cd610367565b6040805160208082528351818301528351919283929083019185019080838360005b838110156101075781810151838201526020016100ef565b50505050905090810190601f1680156101345780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b34801561014e57600080fd5b5061017b6004803603604081101561016557600080fd5b50600160a060020a0381351690602001356103fd565b604080519115158252519081900360200190f35b34801561019b57600080fd5b506101a461047b565b60408051918252519081900360200190f35b3480156101c257600080fd5b5061017b600480360360608110156101d957600080fd5b50600160a060020a03813581169160208101359091169060400135610481565b34801561020557600080fd5b506101a461054a565b34801561021a57600080fd5b50610223610558565b6040805160ff9092168252519081900360200190f35b34801561024557600080fd5b5061017b6004803603604081101561025c57600080fd5b50600160a060020a038135169060200135610561565b34801561027e57600080fd5b506101a46004803603602081101561029557600080fd5b5035600160a060020a0316610611565b3480156102b157600080fd5b506100cd61062c565b3480156102c657600080fd5b5061017b600480360360408110156102dd57600080fd5b50600160a060020a03813516906020013561068d565b3480156102ff57600080fd5b5061017b6004803603604081101561031657600080fd5b50600160a060020a0381351690602001356106d8565b34801561033857600080fd5b506101a46004803603604081101561034f57600080fd5b50600160a060020a03813581169160200135166106ee565b60038054604080516020601f60026000196101006001881615020190951694909404938401819004810282018101909252828152606093909290918301828280156103f35780601f106103c8576101008083540402835291602001916103f3565b820191906000526020600020905b8154815290600101906020018083116103d657829003601f168201915b5050505050905090565b6000600160a060020a038316151561041457600080fd5b336000818152600160209081526040808320600160a060020a03881680855290835292819020869055805186815290519293927f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925929181900390910190a350600192915050565b60025490565b600160a060020a03831660009081526001602090815260408083203384529091528120546104b5908363ffffffff61071916565b600160a060020a03851660009081526001602090815260408083203384529091529020556104e484848461072e565b600160a060020a0384166000818152600160209081526040808320338085529083529281902054815190815290519293927f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925929181900390910190a35060019392505050565b69152d02c7e14af680000081565b60055460ff1690565b6000600160a060020a038316151561057857600080fd5b336000908152600160209081526040808320600160a060020a03871684529091529020546105ac908363ffffffff6107fb16565b336000818152600160209081526040808320600160a060020a0389168085529083529281902085905580519485525191937f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925929081900390910190a350600192915050565b600160a060020a031660009081526020819052604090205490565b60048054604080516020601f60026000196101006001881615020190951694909404938401819004810282018101909252828152606093909290918301828280156103f35780601f106103c8576101008083540402835291602001916103f3565b6000600160a060020a03831615156106a457600080fd5b336000908152600160209081526040808320600160a060020a03871684529091529020546105ac908363ffffffff61071916565b60006106e533848461072e565b50600192915050565b600160a060020a03918216600090815260016020908152604080832093909416825291909152205490565b60008282111561072857600080fd5b50900390565b600160a060020a038216151561074357600080fd5b600160a060020a03831660009081526020819052604090205461076c908263ffffffff61071916565b600160a060020a0380851660009081526020819052604080822093909355908416815220546107a1908263ffffffff6107fb16565b600160a060020a038084166000818152602081815260409182902094909455805185815290519193928716927fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef92918290030190a3505050565b60008282018381101561080d57600080fd5b939250505056fea165627a7a72305820c819268e55d13b22d5a7181526738879a49286f21bdbe30854a85568196c35aa0029",
		"sourceMap": "161:250:0:-;;;297:112;8:9:-1;5:2;;;30:1;27;20:12;5:2;-1:-1;405:163:3;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;493:12;;405:163;;;355:2:0;;493:12:3;;:5;;405:163;493:12;:::i;:::-;-1:-1:-1;515:16:3;;;;:7;;:16;;;;;:::i;:::-;-1:-1:-1;541:9:3;:20;;-1:-1:-1;;541:20:3;;;;;;;;;;;;-1:-1:-1;369:33:0;;-1:-1:-1;375:10:0;262:28;369:5;;;;:33;:::i;:::-;161:250;;6198:263:2;-1:-1:-1;;;;;6272:21:2;;;;6264:30;;;;;;6320:12;;:23;;6337:5;6320:16;;;;;;:23;:::i;:::-;6305:12;:38;-1:-1:-1;;;;;6374:18:2;;:9;:18;;;;;;;;;;;:29;;6397:5;6374:22;;;;;;:29;:::i;:::-;-1:-1:-1;;;;;6353:18:2;;:9;:18;;;;;;;;;;;:50;;;;6418:36;;;;;;;6353:18;;:9;;6418:36;;;;;;;;;;6198:263;;:::o;1431:145:1:-;1489:7;1520:5;;;1543:6;;;;1535:15;;;;;;1568:1;1431:145;-1:-1:-1;;;1431:145:1:o;161:250:0:-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;161:250:0;;;-1:-1:-1;161:250:0;:::i;:::-;;;:::o;:::-;;;;;;;;;;;;;;;;;;;;:::o;:::-;;;;;;;",
		"deployedSourceMap": "161:250:0:-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;628:81:3;;8:9:-1;5:2;;;30:1;27;20:12;5:2;628:81:3;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;8:100:-1;33:3;30:1;27:10;8:100;;;90:11;;;84:18;71:11;;;64:39;52:2;45:10;8:100;;;12:14;628:81:3;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;2735:238:2;;8:9:-1;5:2;;;30:1;27;20:12;5:2;2735:238:2;;;;;;13:2:-1;8:3;5:11;2:2;;;29:1;26;19:12;2:2;-1:-1;;;;;;2735:238:2;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;936:89;;8:9:-1;5:2;;;30:1;27;20:12;5:2;936:89:2;;;:::i;:::-;;;;;;;;;;;;;;;;3436:294;;8:9:-1;5:2;;;30:1;27;20:12;5:2;3436:294:2;;;;;;13:2:-1;8:3;5:11;2:2;;;29:1;26;19:12;2:2;-1:-1;;;;;;3436:294:2;;;;;;;;;;;;;;;;;:::i;221:69:0:-;;8:9:-1;5:2;;;30:1;27;20:12;5:2;221:69:0;;;:::i;930:81:3:-;;8:9:-1;5:2;;;30:1;27;20:12;5:2;930:81:3;;;:::i;:::-;;;;;;;;;;;;;;;;;;;4233:317:2;;8:9:-1;5:2;;;30:1;27;20:12;5:2;4233:317:2;;;;;;13:2:-1;8:3;5:11;2:2;;;29:1;26;19:12;2:2;-1:-1;;;;;;4233:317:2;;;;;;;;:::i;1234:104::-;;8:9:-1;5:2;;;30:1;27;20:12;5:2;1234:104:2;;;;;;13:2:-1;8:3;5:11;2:2;;;29:1;26;19:12;2:2;-1:-1;1234:104:2;-1:-1:-1;;;;;1234:104:2;;:::i;771:85:3:-;;8:9:-1;5:2;;;30:1;27;20:12;5:2;771:85:3;;;:::i;5058:327:2:-;;8:9:-1;5:2;;;30:1;27;20:12;5:2;5058:327:2;;;;;;13:2:-1;8:3;5:11;2:2;;;29:1;26;19:12;2:2;-1:-1;;;;;;5058:327:2;;;;;;;;:::i;1962:137::-;;8:9:-1;5:2;;;30:1;27;20:12;5:2;1962:137:2;;;;;;13:2:-1;8:3;5:11;2:2;;;29:1;26;19:12;2:2;-1:-1;;;;;;1962:137:2;;;;;;;;:::i;1669:129::-;;8:9:-1;5:2;;;30:1;27;20:12;5:2;1669:129:2;;;;;;13:2:-1;8:3;5:11;2:2;;;29:1;26;19:12;2:2;-1:-1;;;;;;1669:129:2;;;;;;;;;;:::i;628:81:3:-;697:5;690:12;;;;;;;;-1:-1:-1;;690:12:3;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;665:13;;690:12;;697:5;;690:12;;697:5;690:12;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;628:81;:::o;2735:238:2:-;2800:4;-1:-1:-1;;;;;2824:21:2;;;;2816:30;;;;;;2866:10;2857:20;;;;:8;:20;;;;;;;;-1:-1:-1;;;;;2857:29:2;;;;;;;;;;;;:37;;;2909:36;;;;;;;2857:29;;2866:10;2909:36;;;;;;;;;;;-1:-1:-1;2962:4:2;2735:238;;;;:::o;936:89::-;1006:12;;936:89;:::o;3436:294::-;-1:-1:-1;;;;;3560:14:2;;3515:4;3560:14;;;:8;:14;;;;;;;;3575:10;3560:26;;;;;;;;:37;;3591:5;3560:37;:30;:37;:::i;:::-;-1:-1:-1;;;;;3531:14:2;;;;;;:8;:14;;;;;;;;3546:10;3531:26;;;;;;;:66;3607:26;3540:4;3623:2;3627:5;3607:9;:26::i;:::-;-1:-1:-1;;;;;3648:54:2;;3675:14;;;;:8;:14;;;;;;;;3663:10;3675:26;;;;;;;;;;;3648:54;;;;;;;3663:10;;3648:54;;;;;;;;;;;;-1:-1:-1;3719:4:2;3436:294;;;;;:::o;221:69:0:-;262:28;221:69;:::o;930:81:3:-;995:9;;;;930:81;:::o;4233:317:2:-;4313:4;-1:-1:-1;;;;;4337:21:2;;;;4329:30;;;;;;4411:10;4402:20;;;;:8;:20;;;;;;;;-1:-1:-1;;;;;4402:29:2;;;;;;;;;;:45;;4436:10;4402:45;:33;:45;:::i;:::-;4379:10;4370:20;;;;:8;:20;;;;;;;;-1:-1:-1;;;;;4370:29:2;;;;;;;;;;;;:77;;;4462:60;;;;;;4370:29;;4462:60;;;;;;;;;;;-1:-1:-1;4539:4:2;4233:317;;;;:::o;1234:104::-;-1:-1:-1;;;;;1315:16:2;1289:7;1315:16;;;;;;;;;;;;1234:104::o;771:85:3:-;842:7;835:14;;;;;;;;-1:-1:-1;;835:14:3;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;810:13;;835:14;;842:7;;835:14;;842:7;835:14;;;;;;;;;;;;;;;;;;;;;;;;5058:327:2;5143:4;-1:-1:-1;;;;;5167:21:2;;;;5159:30;;;;;;5241:10;5232:20;;;;:8;:20;;;;;;;;-1:-1:-1;;;;;5232:29:2;;;;;;;;;;:50;;5266:15;5232:50;:33;:50;:::i;1962:137::-;2023:4;2039:32;2049:10;2061:2;2065:5;2039:9;:32::i;:::-;-1:-1:-1;2088:4:2;1962:137;;;;:::o;1669:129::-;-1:-1:-1;;;;;1767:15:2;;;1741:7;1767:15;;;:8;:15;;;;;;;;:24;;;;;;;;;;;;;1669:129::o;1205:145:1:-;1263:7;1290:6;;;;1282:15;;;;;;-1:-1:-1;1319:5:1;;;1205:145::o;5599:256:2:-;-1:-1:-1;;;;;5686:16:2;;;;5678:25;;;;;;-1:-1:-1;;;;;5732:15:2;;:9;:15;;;;;;;;;;;:26;;5752:5;5732:26;:19;:26;:::i;:::-;-1:-1:-1;;;;;5714:15:2;;;:9;:15;;;;;;;;;;;:44;;;;5784:13;;;;;;;:24;;5802:5;5784:24;:17;:24;:::i;:::-;-1:-1:-1;;;;;5768:13:2;;;:9;:13;;;;;;;;;;;;:40;;;;5823:25;;;;;;;5768:13;;5823:25;;;;;;;;;;;;;5599:256;;;:::o;1431:145:1:-;1489:7;1520:5;;;1543:6;;;;1535:15;;;;;;1568:1;1431:145;-1:-1:-1;;;1431:145:1:o",
		"source": "pragma solidity 0.5.1;\n\nimport \"openzeppelin-solidity/contracts/token/ERC20/ERC20.sol\";\nimport \"openzeppelin-solidity/contracts/token/ERC20/ERC20Detailed.sol\";\n\ncontract Mock_Token_Optimized is ERC20, ERC20Detailed {\n    uint256 public constant INITIAL_SUPPLY = 100000 * (10 ** uint256(18));\n\n    constructor() public ERC20Detailed(\"LimePay Token\", \"LP\", 18) {\n        _mint(msg.sender, INITIAL_SUPPLY);\n    }\n}",
		"sourcePath": "/Users/ognyanchikov/limepay-contracts/smart-contracts/contracts/Mock_Token_Optimized.sol",
		"ast": {
		  "absolutePath": "/Users/ognyanchikov/limepay-contracts/smart-contracts/contracts/Mock_Token_Optimized.sol",
		  "exportedSymbols": {
			"Mock_Token_Optimized": [
			  33
			]
		  },
		  "id": 34,
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
			  "absolutePath": "openzeppelin-solidity/contracts/token/ERC20/ERC20.sol",
			  "file": "openzeppelin-solidity/contracts/token/ERC20/ERC20.sol",
			  "id": 2,
			  "nodeType": "ImportDirective",
			  "scope": 34,
			  "sourceUnit": 594,
			  "src": "24:63:0",
			  "symbolAliases": [],
			  "unitAlias": ""
			},
			{
			  "absolutePath": "openzeppelin-solidity/contracts/token/ERC20/ERC20Detailed.sol",
			  "file": "openzeppelin-solidity/contracts/token/ERC20/ERC20Detailed.sol",
			  "id": 3,
			  "nodeType": "ImportDirective",
			  "scope": 34,
			  "sourceUnit": 652,
			  "src": "88:71:0",
			  "symbolAliases": [],
			  "unitAlias": ""
			},
			{
			  "baseContracts": [
				{
				  "arguments": null,
				  "baseName": {
					"contractScope": null,
					"id": 4,
					"name": "ERC20",
					"nodeType": "UserDefinedTypeName",
					"referencedDeclaration": 593,
					"src": "194:5:0",
					"typeDescriptions": {
					  "typeIdentifier": "t_contract$_ERC20_$593",
					  "typeString": "contract ERC20"
					}
				  },
				  "id": 5,
				  "nodeType": "InheritanceSpecifier",
				  "src": "194:5:0"
				},
				{
				  "arguments": null,
				  "baseName": {
					"contractScope": null,
					"id": 6,
					"name": "ERC20Detailed",
					"nodeType": "UserDefinedTypeName",
					"referencedDeclaration": 651,
					"src": "201:13:0",
					"typeDescriptions": {
					  "typeIdentifier": "t_contract$_ERC20Detailed_$651",
					  "typeString": "contract ERC20Detailed"
					}
				  },
				  "id": 7,
				  "nodeType": "InheritanceSpecifier",
				  "src": "201:13:0"
				}
			  ],
			  "contractDependencies": [
				593,
				651,
				720
			  ],
			  "contractKind": "contract",
			  "documentation": null,
			  "fullyImplemented": true,
			  "id": 33,
			  "linearizedBaseContracts": [
				33,
				651,
				593,
				720
			  ],
			  "name": "Mock_Token_Optimized",
			  "nodeType": "ContractDefinition",
			  "nodes": [
				{
				  "constant": true,
				  "id": 17,
				  "name": "INITIAL_SUPPLY",
				  "nodeType": "VariableDeclaration",
				  "scope": 33,
				  "src": "221:69:0",
				  "stateVariable": true,
				  "storageLocation": "default",
				  "typeDescriptions": {
					"typeIdentifier": "t_uint256",
					"typeString": "uint256"
				  },
				  "typeName": {
					"id": 8,
					"name": "uint256",
					"nodeType": "ElementaryTypeName",
					"src": "221:7:0",
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
					"id": 16,
					"isConstant": false,
					"isLValue": false,
					"isPure": true,
					"lValueRequested": false,
					"leftExpression": {
					  "argumentTypes": null,
					  "hexValue": "313030303030",
					  "id": 9,
					  "isConstant": false,
					  "isLValue": false,
					  "isPure": true,
					  "kind": "number",
					  "lValueRequested": false,
					  "nodeType": "Literal",
					  "src": "262:6:0",
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
						  "id": 14,
						  "isConstant": false,
						  "isLValue": false,
						  "isPure": true,
						  "lValueRequested": false,
						  "leftExpression": {
							"argumentTypes": null,
							"hexValue": "3130",
							"id": 10,
							"isConstant": false,
							"isLValue": false,
							"isPure": true,
							"kind": "number",
							"lValueRequested": false,
							"nodeType": "Literal",
							"src": "272:2:0",
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
								"id": 12,
								"isConstant": false,
								"isLValue": false,
								"isPure": true,
								"kind": "number",
								"lValueRequested": false,
								"nodeType": "Literal",
								"src": "286:2:0",
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
							  "id": 11,
							  "isConstant": false,
							  "isLValue": false,
							  "isPure": true,
							  "lValueRequested": false,
							  "nodeType": "ElementaryTypeNameExpression",
							  "src": "278:7:0",
							  "typeDescriptions": {
								"typeIdentifier": "t_type$_t_uint256_$",
								"typeString": "type(uint256)"
							  },
							  "typeName": "uint256"
							},
							"id": 13,
							"isConstant": false,
							"isLValue": false,
							"isPure": true,
							"kind": "typeConversion",
							"lValueRequested": false,
							"names": [],
							"nodeType": "FunctionCall",
							"src": "278:11:0",
							"typeDescriptions": {
							  "typeIdentifier": "t_uint256",
							  "typeString": "uint256"
							}
						  },
						  "src": "272:17:0",
						  "typeDescriptions": {
							"typeIdentifier": "t_uint256",
							"typeString": "uint256"
						  }
						}
					  ],
					  "id": 15,
					  "isConstant": false,
					  "isInlineArray": false,
					  "isLValue": false,
					  "isPure": true,
					  "lValueRequested": false,
					  "nodeType": "TupleExpression",
					  "src": "271:19:0",
					  "typeDescriptions": {
						"typeIdentifier": "t_uint256",
						"typeString": "uint256"
					  }
					},
					"src": "262:28:0",
					"typeDescriptions": {
					  "typeIdentifier": "t_uint256",
					  "typeString": "uint256"
					}
				  },
				  "visibility": "public"
				},
				{
				  "body": {
					"id": 31,
					"nodeType": "Block",
					"src": "359:50:0",
					"statements": [
					  {
						"expression": {
						  "argumentTypes": null,
						  "arguments": [
							{
							  "argumentTypes": null,
							  "expression": {
								"argumentTypes": null,
								"id": 26,
								"name": "msg",
								"nodeType": "Identifier",
								"overloadedDeclarations": [],
								"referencedDeclaration": 735,
								"src": "375:3:0",
								"typeDescriptions": {
								  "typeIdentifier": "t_magic_message",
								  "typeString": "msg"
								}
							  },
							  "id": 27,
							  "isConstant": false,
							  "isLValue": false,
							  "isPure": false,
							  "lValueRequested": false,
							  "memberName": "sender",
							  "nodeType": "MemberAccess",
							  "referencedDeclaration": null,
							  "src": "375:10:0",
							  "typeDescriptions": {
								"typeIdentifier": "t_address_payable",
								"typeString": "address payable"
							  }
							},
							{
							  "argumentTypes": null,
							  "id": 28,
							  "name": "INITIAL_SUPPLY",
							  "nodeType": "Identifier",
							  "overloadedDeclarations": [],
							  "referencedDeclaration": 17,
							  "src": "387:14:0",
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
							"id": 25,
							"name": "_mint",
							"nodeType": "Identifier",
							"overloadedDeclarations": [],
							"referencedDeclaration": 508,
							"src": "369:5:0",
							"typeDescriptions": {
							  "typeIdentifier": "t_function_internal_nonpayable$_t_address_$_t_uint256_$returns$__$",
							  "typeString": "function (address,uint256)"
							}
						  },
						  "id": 29,
						  "isConstant": false,
						  "isLValue": false,
						  "isPure": false,
						  "kind": "functionCall",
						  "lValueRequested": false,
						  "names": [],
						  "nodeType": "FunctionCall",
						  "src": "369:33:0",
						  "typeDescriptions": {
							"typeIdentifier": "t_tuple$__$",
							"typeString": "tuple()"
						  }
						},
						"id": 30,
						"nodeType": "ExpressionStatement",
						"src": "369:33:0"
					  }
					]
				  },
				  "documentation": null,
				  "id": 32,
				  "implemented": true,
				  "kind": "constructor",
				  "modifiers": [
					{
					  "arguments": [
						{
						  "argumentTypes": null,
						  "hexValue": "4c696d6550617920546f6b656e",
						  "id": 20,
						  "isConstant": false,
						  "isLValue": false,
						  "isPure": true,
						  "kind": "string",
						  "lValueRequested": false,
						  "nodeType": "Literal",
						  "src": "332:15:0",
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
						  "id": 21,
						  "isConstant": false,
						  "isLValue": false,
						  "isPure": true,
						  "kind": "string",
						  "lValueRequested": false,
						  "nodeType": "Literal",
						  "src": "349:4:0",
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
						  "id": 22,
						  "isConstant": false,
						  "isLValue": false,
						  "isPure": true,
						  "kind": "number",
						  "lValueRequested": false,
						  "nodeType": "Literal",
						  "src": "355:2:0",
						  "subdenomination": null,
						  "typeDescriptions": {
							"typeIdentifier": "t_rational_18_by_1",
							"typeString": "int_const 18"
						  },
						  "value": "18"
						}
					  ],
					  "id": 23,
					  "modifierName": {
						"argumentTypes": null,
						"id": 19,
						"name": "ERC20Detailed",
						"nodeType": "Identifier",
						"overloadedDeclarations": [],
						"referencedDeclaration": 651,
						"src": "318:13:0",
						"typeDescriptions": {
						  "typeIdentifier": "t_type$_t_contract$_ERC20Detailed_$651_$",
						  "typeString": "type(contract ERC20Detailed)"
						}
					  },
					  "nodeType": "ModifierInvocation",
					  "src": "318:40:0"
					}
				  ],
				  "name": "",
				  "nodeType": "FunctionDefinition",
				  "parameters": {
					"id": 18,
					"nodeType": "ParameterList",
					"parameters": [],
					"src": "308:2:0"
				  },
				  "returnParameters": {
					"id": 24,
					"nodeType": "ParameterList",
					"parameters": [],
					"src": "359:0:0"
				  },
				  "scope": 33,
				  "src": "297:112:0",
				  "stateMutability": "nonpayable",
				  "superFunction": null,
				  "visibility": "public"
				}
			  ],
			  "scope": 34,
			  "src": "161:250:0"
			}
		  ],
		  "src": "0:411:0"
		},
		"legacyAST": {
		  "absolutePath": "/Users/ognyanchikov/limepay-contracts/smart-contracts/contracts/Mock_Token_Optimized.sol",
		  "exportedSymbols": {
			"Mock_Token_Optimized": [
			  33
			]
		  },
		  "id": 34,
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
			  "absolutePath": "openzeppelin-solidity/contracts/token/ERC20/ERC20.sol",
			  "file": "openzeppelin-solidity/contracts/token/ERC20/ERC20.sol",
			  "id": 2,
			  "nodeType": "ImportDirective",
			  "scope": 34,
			  "sourceUnit": 594,
			  "src": "24:63:0",
			  "symbolAliases": [],
			  "unitAlias": ""
			},
			{
			  "absolutePath": "openzeppelin-solidity/contracts/token/ERC20/ERC20Detailed.sol",
			  "file": "openzeppelin-solidity/contracts/token/ERC20/ERC20Detailed.sol",
			  "id": 3,
			  "nodeType": "ImportDirective",
			  "scope": 34,
			  "sourceUnit": 652,
			  "src": "88:71:0",
			  "symbolAliases": [],
			  "unitAlias": ""
			},
			{
			  "baseContracts": [
				{
				  "arguments": null,
				  "baseName": {
					"contractScope": null,
					"id": 4,
					"name": "ERC20",
					"nodeType": "UserDefinedTypeName",
					"referencedDeclaration": 593,
					"src": "194:5:0",
					"typeDescriptions": {
					  "typeIdentifier": "t_contract$_ERC20_$593",
					  "typeString": "contract ERC20"
					}
				  },
				  "id": 5,
				  "nodeType": "InheritanceSpecifier",
				  "src": "194:5:0"
				},
				{
				  "arguments": null,
				  "baseName": {
					"contractScope": null,
					"id": 6,
					"name": "ERC20Detailed",
					"nodeType": "UserDefinedTypeName",
					"referencedDeclaration": 651,
					"src": "201:13:0",
					"typeDescriptions": {
					  "typeIdentifier": "t_contract$_ERC20Detailed_$651",
					  "typeString": "contract ERC20Detailed"
					}
				  },
				  "id": 7,
				  "nodeType": "InheritanceSpecifier",
				  "src": "201:13:0"
				}
			  ],
			  "contractDependencies": [
				593,
				651,
				720
			  ],
			  "contractKind": "contract",
			  "documentation": null,
			  "fullyImplemented": true,
			  "id": 33,
			  "linearizedBaseContracts": [
				33,
				651,
				593,
				720
			  ],
			  "name": "Mock_Token_Optimized",
			  "nodeType": "ContractDefinition",
			  "nodes": [
				{
				  "constant": true,
				  "id": 17,
				  "name": "INITIAL_SUPPLY",
				  "nodeType": "VariableDeclaration",
				  "scope": 33,
				  "src": "221:69:0",
				  "stateVariable": true,
				  "storageLocation": "default",
				  "typeDescriptions": {
					"typeIdentifier": "t_uint256",
					"typeString": "uint256"
				  },
				  "typeName": {
					"id": 8,
					"name": "uint256",
					"nodeType": "ElementaryTypeName",
					"src": "221:7:0",
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
					"id": 16,
					"isConstant": false,
					"isLValue": false,
					"isPure": true,
					"lValueRequested": false,
					"leftExpression": {
					  "argumentTypes": null,
					  "hexValue": "313030303030",
					  "id": 9,
					  "isConstant": false,
					  "isLValue": false,
					  "isPure": true,
					  "kind": "number",
					  "lValueRequested": false,
					  "nodeType": "Literal",
					  "src": "262:6:0",
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
						  "id": 14,
						  "isConstant": false,
						  "isLValue": false,
						  "isPure": true,
						  "lValueRequested": false,
						  "leftExpression": {
							"argumentTypes": null,
							"hexValue": "3130",
							"id": 10,
							"isConstant": false,
							"isLValue": false,
							"isPure": true,
							"kind": "number",
							"lValueRequested": false,
							"nodeType": "Literal",
							"src": "272:2:0",
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
								"id": 12,
								"isConstant": false,
								"isLValue": false,
								"isPure": true,
								"kind": "number",
								"lValueRequested": false,
								"nodeType": "Literal",
								"src": "286:2:0",
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
							  "id": 11,
							  "isConstant": false,
							  "isLValue": false,
							  "isPure": true,
							  "lValueRequested": false,
							  "nodeType": "ElementaryTypeNameExpression",
							  "src": "278:7:0",
							  "typeDescriptions": {
								"typeIdentifier": "t_type$_t_uint256_$",
								"typeString": "type(uint256)"
							  },
							  "typeName": "uint256"
							},
							"id": 13,
							"isConstant": false,
							"isLValue": false,
							"isPure": true,
							"kind": "typeConversion",
							"lValueRequested": false,
							"names": [],
							"nodeType": "FunctionCall",
							"src": "278:11:0",
							"typeDescriptions": {
							  "typeIdentifier": "t_uint256",
							  "typeString": "uint256"
							}
						  },
						  "src": "272:17:0",
						  "typeDescriptions": {
							"typeIdentifier": "t_uint256",
							"typeString": "uint256"
						  }
						}
					  ],
					  "id": 15,
					  "isConstant": false,
					  "isInlineArray": false,
					  "isLValue": false,
					  "isPure": true,
					  "lValueRequested": false,
					  "nodeType": "TupleExpression",
					  "src": "271:19:0",
					  "typeDescriptions": {
						"typeIdentifier": "t_uint256",
						"typeString": "uint256"
					  }
					},
					"src": "262:28:0",
					"typeDescriptions": {
					  "typeIdentifier": "t_uint256",
					  "typeString": "uint256"
					}
				  },
				  "visibility": "public"
				},
				{
				  "body": {
					"id": 31,
					"nodeType": "Block",
					"src": "359:50:0",
					"statements": [
					  {
						"expression": {
						  "argumentTypes": null,
						  "arguments": [
							{
							  "argumentTypes": null,
							  "expression": {
								"argumentTypes": null,
								"id": 26,
								"name": "msg",
								"nodeType": "Identifier",
								"overloadedDeclarations": [],
								"referencedDeclaration": 735,
								"src": "375:3:0",
								"typeDescriptions": {
								  "typeIdentifier": "t_magic_message",
								  "typeString": "msg"
								}
							  },
							  "id": 27,
							  "isConstant": false,
							  "isLValue": false,
							  "isPure": false,
							  "lValueRequested": false,
							  "memberName": "sender",
							  "nodeType": "MemberAccess",
							  "referencedDeclaration": null,
							  "src": "375:10:0",
							  "typeDescriptions": {
								"typeIdentifier": "t_address_payable",
								"typeString": "address payable"
							  }
							},
							{
							  "argumentTypes": null,
							  "id": 28,
							  "name": "INITIAL_SUPPLY",
							  "nodeType": "Identifier",
							  "overloadedDeclarations": [],
							  "referencedDeclaration": 17,
							  "src": "387:14:0",
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
							"id": 25,
							"name": "_mint",
							"nodeType": "Identifier",
							"overloadedDeclarations": [],
							"referencedDeclaration": 508,
							"src": "369:5:0",
							"typeDescriptions": {
							  "typeIdentifier": "t_function_internal_nonpayable$_t_address_$_t_uint256_$returns$__$",
							  "typeString": "function (address,uint256)"
							}
						  },
						  "id": 29,
						  "isConstant": false,
						  "isLValue": false,
						  "isPure": false,
						  "kind": "functionCall",
						  "lValueRequested": false,
						  "names": [],
						  "nodeType": "FunctionCall",
						  "src": "369:33:0",
						  "typeDescriptions": {
							"typeIdentifier": "t_tuple$__$",
							"typeString": "tuple()"
						  }
						},
						"id": 30,
						"nodeType": "ExpressionStatement",
						"src": "369:33:0"
					  }
					]
				  },
				  "documentation": null,
				  "id": 32,
				  "implemented": true,
				  "kind": "constructor",
				  "modifiers": [
					{
					  "arguments": [
						{
						  "argumentTypes": null,
						  "hexValue": "4c696d6550617920546f6b656e",
						  "id": 20,
						  "isConstant": false,
						  "isLValue": false,
						  "isPure": true,
						  "kind": "string",
						  "lValueRequested": false,
						  "nodeType": "Literal",
						  "src": "332:15:0",
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
						  "id": 21,
						  "isConstant": false,
						  "isLValue": false,
						  "isPure": true,
						  "kind": "string",
						  "lValueRequested": false,
						  "nodeType": "Literal",
						  "src": "349:4:0",
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
						  "id": 22,
						  "isConstant": false,
						  "isLValue": false,
						  "isPure": true,
						  "kind": "number",
						  "lValueRequested": false,
						  "nodeType": "Literal",
						  "src": "355:2:0",
						  "subdenomination": null,
						  "typeDescriptions": {
							"typeIdentifier": "t_rational_18_by_1",
							"typeString": "int_const 18"
						  },
						  "value": "18"
						}
					  ],
					  "id": 23,
					  "modifierName": {
						"argumentTypes": null,
						"id": 19,
						"name": "ERC20Detailed",
						"nodeType": "Identifier",
						"overloadedDeclarations": [],
						"referencedDeclaration": 651,
						"src": "318:13:0",
						"typeDescriptions": {
						  "typeIdentifier": "t_type$_t_contract$_ERC20Detailed_$651_$",
						  "typeString": "type(contract ERC20Detailed)"
						}
					  },
					  "nodeType": "ModifierInvocation",
					  "src": "318:40:0"
					}
				  ],
				  "name": "",
				  "nodeType": "FunctionDefinition",
				  "parameters": {
					"id": 18,
					"nodeType": "ParameterList",
					"parameters": [],
					"src": "308:2:0"
				  },
				  "returnParameters": {
					"id": 24,
					"nodeType": "ParameterList",
					"parameters": [],
					"src": "359:0:0"
				  },
				  "scope": 33,
				  "src": "297:112:0",
				  "stateMutability": "nonpayable",
				  "superFunction": null,
				  "visibility": "public"
				}
			  ],
			  "scope": 34,
			  "src": "161:250:0"
			}
		  ],
		  "src": "0:411:0"
		},
		"compiler": {
		  "name": "solc",
		  "version": "0.5.1+commit.c8a2cb62.Emscripten.clang",
		  "optimizer": true,
		  "runs": 300
		},
		"networks": {},
		"schemaVersion": "1.1.2",
		"updatedAt": "2019-05-14T13:12:39.934Z"
}

module.exports = mockTokenOptimized;