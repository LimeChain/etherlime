const assert = require('chai').assert;
let chai = require("chai");
let chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);
const fs = require('fs-extra');
const killProcessByPID = require('../utils/spawn-child-process').killProcessByPID;



const compiler = require('../../../../packages/etherlime/cli-commands/compiler/compiler');
const config = require('../../../config.json')
const ethers = require('ethers');
const runCmdHandler = require('../utils/spawn-child-process').runCmdHandler;
let contractForFailCompilation = require('../compile/examples/ContractForFailCompilation').contractForFailCompilation;
const DebugUtils = require('../../../../packages/etherlime/cli-commands/debugger/etherlime-debug-utils');

let currentDir;

describe('Debug cli command', () => {
	let txHash;
	let foodCartTxHash;
	let contractAddress;
	let childProcess;
	before(async function () {

		fs.mkdirSync('./debuggerContracts');
		currentDir = process.cwd();
		process.chdir('./debuggerContracts');
		fs.mkdirSync('./build');
		fs.mkdirSync('./contracts');
		fs.copyFileSync('../test/etherlime/cli-commands/examples/LimeFactory.sol', './contracts/LimeFactory.sol');
		fs.copyFileSync('../test/etherlime/cli-commands/compile/examples/SafeMath.sol', './contracts/SafeMath.sol');
		fs.copyFileSync('../test/etherlime/cli-commands/examples/FoodCart.sol', './contracts/FoodCart.sol');
		await compiler.run('.');

		jsonRpcProvider = new ethers.providers.JsonRpcProvider('http://localhost:8545');
		localInitializedWallet = new ethers.Wallet(config.localPrivateKey, jsonRpcProvider);
		const LimeFactory = require(`${process.cwd()}/build/LimeFactory.json`);
		const FoodCart = require(`${process.cwd()}/build/FoodCart.json`);
		let factory = new ethers.ContractFactory(LimeFactory.abi, LimeFactory.bytecode, localInitializedWallet);
		let factoryFoodCart = new ethers.ContractFactory(FoodCart.abi, FoodCart.bytecode, localInitializedWallet);
		let contract = await factory.deploy();
		let foodCartContract = await factoryFoodCart.deploy();
		let localDeployedFoodCart = await foodCartContract.deployed();
		let localDeployedContractResult = await contract.deployed();
		contractAddress = localDeployedContractResult.address;
		const transaction = await localDeployedContractResult.createLime('ogi', 1, 2, 3);
		const foodCartTransaction = await localDeployedFoodCart.addFoodItem('Item1', 10);
		foodCartTxHash = foodCartTransaction.hash;

		txHash = transaction.hash;
	});

	it('should start debugger with right transaction hash', async function () {
		let expectedOutput = contractAddress;
		childProcess = await runCmdHandler(`etherlime debug ${txHash}`, expectedOutput, 'q\n');

		assert.include(childProcess.output, expectedOutput);

	});

	it('should start debug transaction and go on the next step when "n" is send', async function () {
		let expectedOutput = 'function createLime(string memory _name, uint8 _carbohydrates, uint8 _fat, uint8 _protein) public {';
		childProcess = await runCmdHandler(`etherlime debug ${txHash}`, expectedOutput, 'n\n');
		assert.include(childProcess.output, expectedOutput);
	});

	it('should start debug transaction and print VM instruction when "p" is send', async function () {
		let expectedOutput = '(0) PUSH1 0x80';
		childProcess = await runCmdHandler(`etherlime debug ${txHash}`, expectedOutput, 'p\n');
		assert.include(childProcess.output, expectedOutput);
	});

	it('should start debug transaction and add breakpoint when "b" is send', async function () {
		let expectedOutput = 'Breakpoint added at this point in line 3.';
		childProcess = await runCmdHandler(`etherlime debug ${txHash}`, expectedOutput, 'b\n');
		assert.include(childProcess.output, expectedOutput);

	});

	it('should start debug transaction and remove breakpoint when "B" is send', async function () {
		let expectedOutput = 'Breakpoint removed at this point in line 3.';
		childProcess = await runCmdHandler(`etherlime debug ${txHash}`, expectedOutput, 'b\n', 'B\n');
		assert.include(childProcess.output, expectedOutput);

	});

	it('should start debug transaction and proceed when "n" is send, then  print VM instruction when "p" is send', async function () {
		let expectedOutput = '(29) JUMPDEST';
		childProcess = await runCmdHandler(`etherlime debug ${txHash}`, expectedOutput, 'n\n', 'p\n');
		assert.include(childProcess.output, expectedOutput);

	});

	it('should start debug transaction and proceed when "n" is send, then another "n" is send and then print VM instruction when "p" is send', async function () {
		let expectedOutput = '(top)';
		childProcess = await runCmdHandler(`etherlime debug ${txHash}`, expectedOutput, 'n\n', 'n\n', 'p\n');
		assert.include(childProcess.output, expectedOutput);

	});

	it('should start debug transaction and proceed when "n" is send, then another "n" is send and then print VM instruction when ";" is send', async function () {
		let expectedOutput = 'require(_carbohydrates != 0);';
		childProcess = await runCmdHandler(`etherlime debug ${txHash}`, expectedOutput, 'n\n', 'n\n', ';\n');
		assert.include(childProcess.output, expectedOutput);

	});

	it('should start debug transaction and proceed when "n" is send, then restart when "r" is send', async function () {
		let expectedOutput = 'pragma solidity ^0.6.0;';
		childProcess = await runCmdHandler(`etherlime debug ${txHash}`, expectedOutput, 'n\n', 'r\n');
		assert.include(childProcess.output, expectedOutput);

	});

	it('should start debug transaction and proceed when "n" is send, then print variables and values when "v" is send', async function () {
		let expectedOutput = "limes: []";
		childProcess = await runCmdHandler(`etherlime debug ${txHash}`, expectedOutput, 'n\n', 'v\n');
		assert.include(childProcess.output, expectedOutput);

	});

	it('should start debug transaction and proceed when "n" is send, then print help when "h" is send', async function () {
		let expectedOutput = "Commands:";
		childProcess = await runCmdHandler(`etherlime debug ${txHash}`, expectedOutput, 'n\n', 'h\n');
		assert.include(childProcess.output, expectedOutput);

	});

	it('should start debug transaction and print second step instruction when send ";" two times', async function () {
		let expectedOutput = "(2) MSTORE";
		childProcess = await runCmdHandler(`etherlime debug ${txHash}`, expectedOutput, ';\n', ';\n');
		assert.include(childProcess.output, expectedOutput);

	});

	it('should start debug transaction and proceed when "n" is send, then goes to the end of transaction when "c" is send without setting breakpoint', async function () {
		let expectedOutput = "Transaction completed successfully.";
		childProcess = await runCmdHandler(`etherlime debug ${txHash}`, expectedOutput, 'n\n', 'c\n');
		assert.include(childProcess.output, expectedOutput);

	});

	it('should start debug transaction and proceed when "?" is send, then print no watch expression is added', async function () {
		let expectedOutput = "No watch expressions added.";
		childProcess = await runCmdHandler(`etherlime debug ${txHash}`, expectedOutput, '?\n');
		assert.include(childProcess.output, expectedOutput);

	});

	it('should start debug transaction and proceed when "n" is send two times, then print variables when "v" is send', async function () {
		let expectedOutput = "_carbohydrates:";
		childProcess = await runCmdHandler(`etherlime debug ${txHash}`, expectedOutput, 'n\n', 'n\n', 'v\n');
		assert.include(childProcess.output, expectedOutput);

	});

	// TO DO - To be included in the tests after release. It is breaking Travis CI build somehow...

	// it('should return error when try to start debugger without txHash', async function () {
	// 	let expectedOutput = "Error: Cannot read property 'toString' of null";
	// 	childProcess = await runCmdHandler(`etherlime debug`, expectedOutput);
	// 	assert.include(childProcess.output, expectedOutput);
	// });

	it('should start debug transaction and return SyntaxError when ":" is send', async function () {
		let expectedOutput = "SyntaxError: Unexpected end of input";
		childProcess = await runCmdHandler(`etherlime debug ${txHash}`, expectedOutput, ':\n');
		assert.include(childProcess.output, expectedOutput);

	});

	it('should start debug transaction and set watch expression when it is added and then print it on the screen when "?" is send', async function () {
		let expectedOutput = ":Lime";
		childProcess = await runCmdHandler(`etherlime debug ${txHash}`, expectedOutput, '+:Lime\n', '?\n');
		assert.include(childProcess.output, expectedOutput);

	});

	it('should start debug transaction and set watch expression when it is added and then print it on the screen the value of expression, when the watch expression is changed - 1', async function () {
		let expectedOutput = "[ constructor:";
		childProcess = await runCmdHandler(`etherlime debug ${txHash}`, expectedOutput, '+:limes\n', 'n\n');
		assert.include(childProcess.output, expectedOutput);

	});

	it('should start debug transaction and set watch expression when it is added and then print it on the screen the value of expression, when the watch expression is changed - 2', async function () {
		let expectedOutput = "require(_carbohydrates != 0);";
		childProcess = await runCmdHandler(`etherlime debug ${txHash}`, expectedOutput, '+:createLime\n', 'n\n', 'n\n');
		assert.include(childProcess.output, expectedOutput);

	});

	it('should start debug transaction and set watch expression when it is added and then print it on the screen the value of expression, when the watch expression is changed - 3', async function () {
		let expectedOutput = "foodItems[skuCount] = FoodItem({name: _name,";
		childProcess = await runCmdHandler(`etherlime debug ${foodCartTxHash}`, expectedOutput, '+:foodItems\n', 'n\n', 'n\n');
		assert.include(childProcess.output, expectedOutput);

	});

	it('should start debug transaction and set watch expression (without semicolon) when it is added, and then print it on the screen the value of expression, when the watch expression is changed - 4', async function () {
		let expectedOutput = "foodItems[skuCount] = FoodItem({name: _name,";
		childProcess = await runCmdHandler(`etherlime debug ${foodCartTxHash}`, expectedOutput, '+foodItems\n', 'n\n', 'n\n');
		assert.include(childProcess.output, expectedOutput);

	});

	it('should start debug transaction and set watch expression (without semicolon) when it is added, and then print it on the screen the value of expression, when the transaction completes - 5', async function () {
		let expectedOutput = "limes: [ { name:";
		childProcess = await runCmdHandler(`etherlime debug ${txHash}`, expectedOutput, '+Lime\n', 'c\n', 'v\n');
		assert.include(childProcess.output, expectedOutput);

	});

	it('should start debug transaction and set watch expression when it is added and then print it on the screen the value of expression, when the watch expression is changed - 4', async function () {
		let expectedOutput = "evm.current.call";
		childProcess = await runCmdHandler(`etherlime debug ${txHash}`, expectedOutput, '+!evm.current.call\n', 'q\n');
		assert.include(childProcess, expectedOutput);

	});

	it('should start debug transaction and set watch expression when it is added and then fail if we try to print invalid selector', async function () {
		let expectedOutput = "Unknown selector: %s";
		childProcess = await runCmdHandler(`etherlime debug ${txHash}`, expectedOutput, '!evm.step.isJump\n');
		assert.include(childProcess.output, expectedOutput);

	});

	it('should start debug transaction and add breakpoint when "b" is send, then if on the same line is added breakpoint a message is expected', async function () {
		let expectedOutput = "already exists";
		childProcess = await runCmdHandler(`etherlime debug ${txHash}`, expectedOutput, 'b\n', 'b\n');
		assert.include(childProcess.output, expectedOutput);

	});

	it('should start debug transaction and when "B" is send, if no breakpoint is set, a message is expected', async function () {
		let expectedOutput = "No breakpoint at this point in line 3 to remove.";
		childProcess = await runCmdHandler(`etherlime debug ${txHash}`, expectedOutput, 'B\n');
		assert.include(childProcess.output, expectedOutput);

	});

	it('should start debug transaction and when "b" is send with args, a message is expexted', async function () {
		let expectedOutput = "Breakpoint added at this point in line 3.";
		childProcess = await runCmdHandler(`etherlime debug ${txHash}`, expectedOutput, 'b:LimeFactory\n');
		assert.include(childProcess.output, expectedOutput);

	});

	it('should start debug transaction and when "b" is send with specific line, a message is expexted with setting brakepoint at this line', async function () {
		let expectedOutput = "Breakpoint added at line 19.";
		childProcess = await runCmdHandler(`etherlime debug ${txHash}`, expectedOutput, 'b 19\n');
		assert.include(childProcess.output, expectedOutput);

	});

	it('should start debug transaction and when "b" is send with specific wrong line number, a message is expexted', async function () {
		let expectedOutput = "Offset must be an integer.";
		childProcess = await runCmdHandler(`etherlime debug ${txHash}`, expectedOutput, 'b + 19\n');
		assert.include(childProcess.output, expectedOutput);

	});

	it('should start debug transaction and when "b" is send with specific source file, a message is expexted', async function () {
		let expectedOutput = "Multiple source files found matching";
		childProcess = await runCmdHandler(`etherlime debug ${txHash}`, expectedOutput, 'b :2\n');
		assert.include(childProcess.output, expectedOutput);

	});

	it('should start debug transaction and when "b" is send with missing source file, a message is expexted', async function () {
		let expectedOutput = "No source file found matching 1.";
		childProcess = await runCmdHandler(`etherlime debug ${txHash}`, expectedOutput, 'b 1:2\n');
		assert.include(childProcess.output, expectedOutput);

	});

	it('should start debug transaction and when "b" is send with specific source path and line for breakpoint, a message is expexted', async function () {
		let expectedOutput = "Breakpoint added at line 2 in SafeMath.sol";
		childProcess = await runCmdHandler(`etherlime debug ${txHash}`, expectedOutput, `b ${process.cwd()}/contracts/SafeMath.sol:2\n`);
		assert.include(childProcess.output, expectedOutput);

	});

	it('should start debug transaction and when "b" is send with wrong line number, a message is expexted', async function () {
		let expectedOutput = "Line number must be an integer.";
		childProcess = await runCmdHandler(`etherlime debug ${txHash}`, expectedOutput, 'b : 11\n');
		assert.include(childProcess.output, expectedOutput);

	});

	it('should start debug transaction and when "b" is send with wrong non a line number, a message is expexted', async function () {
		let expectedOutput = "Line number must be an integer.";
		childProcess = await runCmdHandler(`etherlime debug ${txHash}`, expectedOutput, 'b b\n');
		assert.include(childProcess.output, expectedOutput);

	});

	it('should start debug transaction and when "b" is send with plus sign and a number, a message is expexted with setting brakepoint at the line equal to current plus the number after plus sign', async function () {
		let expectedOutput = "Breakpoint added at line 8.";
		childProcess = await runCmdHandler(`etherlime debug ${txHash}`, expectedOutput, 'b +5\n');
		assert.include(childProcess.output, expectedOutput);

	});

	it('should start debug transaction and when "b" is send with "all" parameter, should expect message', async function () {
		let expectedOutput = "Cannot add breakpoint everywhere.";
		childProcess = await runCmdHandler(`etherlime debug ${txHash}`, expectedOutput, 'b all\n');
		assert.include(childProcess.output, expectedOutput);

	});

	it('should start debug transaction and when "B" is send with "all" parameter, should expect message', async function () {
		let expectedOutput = "Removed all breakpoints.";
		childProcess = await runCmdHandler(`etherlime debug ${txHash}`, expectedOutput, 'B all\n');
		assert.include(childProcess.output, expectedOutput);

	});

	it('should start debug transaction and when "!" is send should return expression printed', async function () {
		let expectedOutput = "state:";
		childProcess = await runCmdHandler(`etherlime debug ${txHash}`, expectedOutput, '!evm\n', 'q\n');
		assert.include(childProcess, expectedOutput);

	});

	it('should start debug transaction and when "-" is send should remove expression', async function () {
		let expectedOutput = "Expression removed!";
		childProcess = await runCmdHandler(`etherlime debug ${txHash}`, expectedOutput, '-\n');
		assert.include(childProcess.output, expectedOutput);

	});

	it('should start debug transaction and when "c" is send should proceed to the end of the transaction', async function () {
		let expectedOutput = "Transaction completed successfully.";
		childProcess = await runCmdHandler(`etherlime debug ${txHash}`, expectedOutput, 'c\n');
		assert.include(childProcess.output, expectedOutput);

	});

	it('should start debug transaction and when "c" is send should proceed to the end of the transaction and then when "c" is send again a message is expected', async function () {
		let expectedOutput = "Transaction has halted; cannot advance.";
		childProcess = await runCmdHandler(`etherlime debug ${txHash}`, expectedOutput, 'c\n', 'c\n');
		assert.include(childProcess.output, expectedOutput);

	});

	it('should start debug transaction and when "o" is send should step over and then when "o" is send again a new step over is made', async function () {
		let expectedOutput = "Transaction has halted; cannot advance.";
		childProcess = await runCmdHandler(`etherlime debug ${txHash}`, expectedOutput, 'o\n', 'o\n', 'o\n');
		assert.include(childProcess.output, expectedOutput);

	});

	it('should start debug transaction and when "u" is send should send step out command', async function () {
		let expectedOutput = "function createLime(string memory _name, uint8 _carbohydrates, uint8 _fat, uint8 _protein) public {";
		childProcess = await runCmdHandler(`etherlime debug ${txHash}`, expectedOutput, 'u\n');
		assert.include(childProcess.output, expectedOutput);

	});

	it('should start debug transaction and when "i" is send should send step into command', async function () {
		let expectedOutput = "function createLime(string memory _name, uint8 _carbohydrates, uint8 _fat, uint8 _protein) public {";
		childProcess = await runCmdHandler(`etherlime debug ${txHash}`, expectedOutput, 'i\n');
		assert.include(childProcess.output, expectedOutput);

	});

	it('should start debug transaction and when "o" is send should send step over command', async function () {
		let expectedOutput = "function createLime(string memory _name, uint8 _carbohydrates, uint8 _fat, uint8 _protein) public {";
		childProcess = await runCmdHandler(`etherlime debug ${txHash}`, expectedOutput, 'o\n');
		assert.include(childProcess.output, expectedOutput);

	});

	it('should start debug transaction and when "enter" is send should send last command or "n" ', async function () {
		let expectedOutput = "function createLime(string memory _name, uint8 _carbohydrates, uint8 _fat, uint8 _protein) public {";
		childProcess = await runCmdHandler(`etherlime debug ${txHash}`, expectedOutput, '\n');
		assert.include(childProcess.output, expectedOutput);

	});

	it('should start debug transaction and when "q" is send should terminate the debugger', async function () {
		let expectedOutput = "Exiting debugger...";
		childProcess = await runCmdHandler(`etherlime debug ${txHash}`, expectedOutput, 'q\n');
		assert.include(childProcess.output, expectedOutput);

	});

	it('should start debug transaction and when "n" is send, it should go to the next step of contract that is written with tabs, not spaces', async function () {
		let expectedOutput = "function addFoodItem (string memory _name, uint16 _price) public {";
		childProcess = await runCmdHandler(`etherlime debug ${foodCartTxHash}`, expectedOutput, 'n\n');
		assert.include(childProcess.output, expectedOutput);

	});

	it('should start debug transaction and when "n" is send and then ".exit", it should exit the debugger', async function () {
		let expectedOutput = "Exiting...";
		childProcess = await runCmdHandler(`etherlime debug ${foodCartTxHash}`, expectedOutput, 'n\n', '.exit\n');
		assert.include(childProcess.output, expectedOutput);

	});

	it('should start debug transaction and when ".exit" is send, it should exit the debugger', async function () {
		let expectedOutput = "Exiting...";
		childProcess = await runCmdHandler(`etherlime debug ${foodCartTxHash}`, expectedOutput, '.exit\n');
		assert.include(childProcess.output, expectedOutput);

	});


	describe('Fail transaction', async () => {
		let failedTransactionHash;
		before(async function () {
			const defaultConfigs = {
				gasPrice: 1,
				gasLimit: 470000,
			}

			jsonRpcProvider = new ethers.providers.JsonRpcProvider('http://localhost:8545');
			localInitializedWallet = new ethers.Wallet(config.localPrivateKey, jsonRpcProvider);
			const FoodCart = require(`${process.cwd()}/build/FoodCart.json`);
			let factory = new ethers.ContractFactory(FoodCart.abi, FoodCart.bytecode, localInitializedWallet);
			try {
				let contract = await factory.deploy(defaultConfigs);
			} catch (e) {
				failedTransactionHash = e.transactionHash;
			}
		});

		it('should fail transaction and then when start to debug the transaction, a message is expected', async function () {
			let expectedOutput = "Transaction halted with a RUNTIME ERROR.";
			childProcess = await runCmdHandler(`etherlime debug ${failedTransactionHash}`, expectedOutput, 'c\n');
			assert.include(childProcess.output, expectedOutput);

		});
	});

	describe('Compile errors', async () => {
		before(async function () {
			await fs.writeFileSync('./contracts/ContractForFailCompilation.sol', contractForFailCompilation);
		});

		it('should return error trying to compile with wrong config file', async function () {
			let expectedOutput = 'ParserError: Source file requires different compiler version';
			childProcess = await runCmdHandler(`etherlime debug ${txHash}`, expectedOutput);
			assert.include(childProcess.output, expectedOutput);
		});

	});

	describe('Start debugger without contract files and print related debugger errors', async () => {
		before(async function () {
			process.chdir(currentDir);
			fs.mkdirSync('./emptyContract');
			await process.chdir('./emptyContract');

			fs.mkdirSync('./build');
			fs.mkdirSync('./contracts');
			fs.copyFileSync('../test/etherlime/cli-commands/examples/EmptyLimeFactory.sol', './contracts/EmptyLimeFactory.sol');
		});
		it('should return error trying to compile with wrong config file', async function () {
			let expectedOutput = 'No source code found';
			childProcess = await runCmdHandler(`etherlime debug ${txHash}`, expectedOutput);
			assert.include(childProcess.output, expectedOutput);
		});

		it('should print the help if we do not have current session enabled and trace is finished', async function () {
			let expectedOutput = "1: // No source code found.";
			childProcess = await runCmdHandler(`etherlime debug ${txHash}`, expectedOutput, 'c\n');
			assert.include(childProcess.output, expectedOutput);

		});

		it('should return warning message when try to go to the next line and then reset the process', async function () {
			let expectedOutput = 'Warning: The source code for one or more contracts could not be found.';
			childProcess = await runCmdHandler(`etherlime debug ${txHash}`, expectedOutput, 'n\n', 'r\n');
			assert.include(childProcess.output, expectedOutput);
		});

	});


	afterEach(async function () {
		if (childProcess && childProcess.process) {
			killProcessByPID(childProcess.process.pid)
		}
	});

	after(async function () {
		if (childProcess && childProcess.process) {
			killProcessByPID(childProcess.process.pid)
		}
		process.chdir(currentDir);
		fs.removeSync('./debuggerContracts');
		fs.removeSync('./emptyContract');
	});

});

describe('Debug utils', async () => {
	let source = ['pragma solidity ^0.6.0;',
		'',
		'contract FoodCart{',
		'\t/* set owner of contract */',
		'\taddress owner;',
		'',
		'\t/* a variable to track the most recent sku of a food item */',
		'\tuint8 skuCount; ',
		'',
		'\t/* an enum to store food item state */',
		'\tenum State {ForSale, Sold}',
		'',
		'\t/* add event to emit when a new food item is added to cart */',
		'\tevent ForSale(string name, uint8 sku, uint16 price, uint8 state, bool foodItemExist);',
		'',
		'\t/* add event to emit when a new food item is sold */',
		'\tevent Sold(string name, uint8 sku, uint16 price, uint8 state, bool foodItemExist);',
		'',
		'\t/* a struct to store details of a food item */',
		'\tstruct FoodItem {',
		'\t\tstring name;',
		'\t\tuint8 sku;',
		'\t\tuint16 price;',
		'\t\tState state;',
		'\t\tbool foodItemExist;',
		'\t}',
		'',
		'\t/* a map that maps sku to food item */',
		'\tmapping (uint8 => FoodItem) public foodItems;',
		'\t',
		'\t/* a modifier to check that food item exist */',
		'\tmodifier doesFoodItemExist(uint8 _sku){',
		'\t\trequire(foodItems[_sku].foodItemExist);',
		'\t\t_;',
		'\t}',
		'\t',
		'\t/* a modifier to check that an item is forsale */',
		'\tmodifier isFoodItemForSale(uint8 _sku){',
		'\t\trequire(foodItems[_sku].state == State.ForSale);',
		'\t\t_;',
		'\t}',
		'',
		'\t/* a modifier to check that the right price is paid for the food item */',
		'\tmodifier hasBuyerPaidEnough(uint16 _price){',
		'\t\trequire(msg.value >= _price);',
		'\t\t_;',
		'\t}',
		'',
		'\tconstructor() public {',
		'\t\towner = msg.sender;',
		'\t\tskuCount = 0;',
		'\t}',
		'',
		'\t',
		'\tfunction addFoodItem (string memory _name, uint16 _price) public {',
		'\t\tfoodItems[skuCount] = FoodItem({name: _name, ',
		'\t\t\t\t\t\tsku: skuCount, ',
		'\t\t\t\t\t\tprice: _price, ',
		'\t\t\t\t\t\tstate: State.ForSale, ',
		'\t\t\t\t\t\tfoodItemExist: true});',
		'\t\temit ForSale(_name, skuCount , _price, uint8(State.ForSale), true);',
		'\t\tskuCount = skuCount + 1;',
		'\t}  ',
		'',
		'\tfunction buyFoodItem (uint8 _sku)',
		'\tpayable',
		'\tpublic',
		'\tdoesFoodItemExist(_sku)',
		'\tisFoodItemForSale(_sku)',
		'\thasBuyerPaidEnough(foodItems[_sku].price)',
		'\t{',
		'\t\tfoodItems[_sku].state = State.Sold;',
		'\t\tfoodItems[_sku].foodItemExist = false;',
		'\t\temit Sold(foodItems[_sku].name, ',
		'\t\t\t  foodItems[_sku].sku, ',
		'\t\t\t  foodItems[_sku].price, ',
		'\t\t\t  uint8(foodItems[_sku].state), ',
		'\t\t\t  foodItems[_sku].foodItemExist);',
		'\t}',
		'',
		'\tfunction fetchFoodItem(uint8 _sku) ',
		'\tdoesFoodItemExist(_sku)',
		'\tpublic ',
		'\tview ',
		'\treturns (string memory name, uint8 sku, uint16 price, uint8 state, bool foodItemExist){',
		'\t\tname = foodItems[_sku].name;',
		'\t\tsku = foodItems[_sku].sku;',
		'\t\tprice = foodItems[_sku].price;',
		'\t\tstate = uint8(foodItems[_sku].state);',
		'\t\tfoodItemExist = foodItems[_sku].foodItemExist;',
		'',
		'\t\treturn (name, sku, price, state, foodItemExist);',
		'\t}',
		'',
		'\tfunction () external payable {',
		'',
		'\t}',
		'}'
	]

	const expectedValue = `1: pragma solidity ^0.6.0;\n2: \n3: contract FoodCart{\n   \u001b[1m\u001b[94m^\u001b[39m\u001b[22m\u001b[1m\u001b[94m^\u001b[39m\u001b[22m\u001b[1m\u001b[94m^\u001b[39m\u001b[22m\u001b[1m\u001b[94m^\u001b[39m\u001b[22m\u001b[1m\u001b[94m^\u001b[39m\u001b[22m\u001b[1m\u001b[94m^\u001b[39m\u001b[22m\u001b[1m\u001b[94m^\u001b[39m\u001b[22m\u001b[1m\u001b[94m^\u001b[39m\u001b[22m\u001b[1m\u001b[94m^\u001b[39m\u001b[22m\u001b[1m\u001b[94m^\u001b[39m\u001b[22m\u001b[1m\u001b[94m^\u001b[39m\u001b[22m\u001b[1m\u001b[94m^\u001b[39m\u001b[22m\u001b[1m\u001b[94m^\u001b[39m\u001b[22m\u001b[1m\u001b[94m^\u001b[39m\u001b[22m\u001b[1m\u001b[94m^\u001b[39m\u001b[22m\u001b[1m\u001b[94m^\u001b[39m\u001b[22m\u001b[1m\u001b[94m^\u001b[39m\u001b[22m\u001b[1m\u001b[94m^\u001b[39m\u001b[22m`
	it('should return the line prefix with correct number of spaces or tabs(4)', async function () {
		const line = 'function addFoodItem (string memory _name, uint16 _price) public {';
		const result = await DebugUtils.formatLineNumberPrefix(line, 53, 4);
		assert.deepStrictEqual(result, '  53: function addFoodItem (string memory _name, uint16 _price) public {');

	});

	it('should return the line prefix with correct number of spaces or tabs(6)', async function () {
		const line = 'function addFoodItem (string memory _name, uint16 _price) public {';
		const result = await DebugUtils.formatLineNumberPrefix(line, 53, 6);
		assert.deepStrictEqual(result, '    53: function addFoodItem (string memory _name, uint16 _price) public {');

	});

	it('should return the line prefix with correct number of spaces or tabs(undefined)', async function () {
		const line = 'function addFoodItem (string memory _name, uint16 _price) public {';
		const result = await DebugUtils.formatLineNumberPrefix(line, 53, undefined);
		assert.deepStrictEqual(result, '53: function addFoodItem (string memory _name, uint16 _price) public {');

	});

	it('should correct format range lines', async function () {
		const result = await DebugUtils.formatRangeLines(source, {
			start: {
				line: 2,
				column: 0
			},
			end: {
				line: null,
				column: null
			}
		}, 4);
		assert.deepStrictEqual(result, expectedValue);

	});

	it('should return correct format range lines', async function () {
		const line = 'contract FoodCart{';
		const startCol = 0;
		const endCol = 18;
		const padding = 1;
		const tab = undefined;
		const result = await DebugUtils.formatLinePointer(line, startCol, endCol, padding, tab);
		assert.deepStrictEqual(result.length, 363);
	});

	it('should return correct format range lines with tabs specified', async function () {
		const line = 'function createLime(string memory _name, uint8 _carbohydrates, uint8 _fat, uint8 _protein) public {';
		const startCol = 0;
		const endCol = 18;
		const padding = 1;
		const tab = 4;
		const result = await DebugUtils.formatLinePointer(line, startCol, endCol, padding, tab);
		assert.deepStrictEqual(result.length, 444);
	});
});