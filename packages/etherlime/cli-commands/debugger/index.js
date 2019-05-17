
const OS = require("os");
const path = require("path");
const util = require("util");

const debugModule = require("debug");
const debug = debugModule("lib:commands:debug");
const safeEval = require("safe-eval");
const BN = require("bn.js");
const ethers = require('ethers');
const colors = require('etherlime-utils').colors;
let port;
let provider;



const ReplManager = require("./repl");

const Artifactor = require('../compiler/etherlime-artifactor');
const compile = require('../compiler/etherlime-compile');
const Resolver = require('../compiler/etherlime-resolver');
const compiler = require('../compiler/compiler');

const Debugger = require("ethereum-transaction-debugger");
const selectors = require("ethereum-transaction-debugger").selectors;

const DebugUtils = require("./etherlime-debug-utils");


// Debugger Session properties
const trace = selectors.trace;
const solidity = selectors.solidity;
const controller = selectors.controller;

const config = {
	"contracts_directory": `${process.cwd()}/contracts`,
	"working_directory": `${process.cwd()}`,
	"contracts_build_directory": `${process.cwd()}/build`,
	"artifactor": new Artifactor(`${process.cwd()}/build`),
	"compilers": {
		"solc": {
			"version": undefined,
			"docker": undefined
		}
	},
	"build_directory": `${process.cwd()}/build`,
	networks: {
		development: {
			host: "127.0.0.1",     // Localhost (default: none)
			port: 8545,            // Standard Ethereum port (default: none)
			network_id: "*",       // Any network (default: none)
		}
	},
	network: "etherlime ganache"
};
config.resolver = new Resolver(config)
config.solc = {
	optimizer: { enabled: false, runs: 200 },
};

let lastCommand = "n";
let enabledExpressions = new Set();

let txHash;


let sessionInterpreter = (session, repl) => {
	return async function interpreter(cmd) {
		cmd = cmd.trim();
		let cmdArgs, splitArgs;
		debug("cmd %s", cmd);

		//split arguments for commands that want that; split on runs of spaces
		splitArgs = cmd
			.trim()
			.split(/ +/)
			.slice(1);
		debug("splitArgs %O", splitArgs);

		//warning: this bit *alters* cmd!
		if (cmd.length > 0) {
			cmdArgs = cmd.slice(1).trim();
			cmd = cmd[0];
		}

		if (cmd === "") {
			cmd = lastCommand;
		}

		//quit if that's what we were given
		if (cmd === "q") {
			console.log('Exiting debugger...')
			return await util.promisify(repl.stop.bind(repl))();
		}

		let alreadyFinished = session.view(trace.finished);

		// If not finished, perform commands that require state changes
		// (other than quitting or resetting)
		if (!alreadyFinished) {
			switch (cmd) {
				case "o":
					await session.stepOver();
					break;
				case "i":
					await session.stepInto();
					break;
				case "u":
					await session.stepOut();
					break;
				case "n":
					await session.stepNext();
					break;
				case ";":
					await session.advance();
					break;
				case "c":
					await session.continueUntilBreakpoint();
					break;
			}
		} //otherwise, inform the user we can't do that
		else {
			switch (cmd) {
				case "o":
				case "i":
				case "u":
				case "n":
				case ";":
				case "c":
					console.log(`${colors.colorFailure('Transaction has halted; cannot advance.')}`);
					console.log("");
			}
		}
		if (cmd === "r") {
			//reset if given the reset command
			await session.reset();
		}

		// Check if execution has (just now) stopped.
		if (session.view(trace.finished) && !alreadyFinished) {
			console.log("");
			//check if transaction failed
			if (!session.view(selectors.session.transaction.receipt).status) {
				console.log(`${colors.colorFailure('Transaction halted with a RUNTIME ERROR.')}`);
				console.log("");
				console.log(
					"This is likely due to an intentional halting expression, like assert(), require() or revert(). It can also be due to out-of-gas exceptions. Please inspect your transaction parameters and contract code to determine the meaning of this error."
				);
			} else {
				//case if transaction succeeded
				console.log(`${colors.colorSuccess('Transaction completed successfully.')}`);
			}
		}

		// Perform post printing
		// (we want to see if execution stopped before printing state).
		switch (cmd) {
			case "+":
				enabledExpressions.add(cmdArgs);
				await printWatchExpressionResult(cmdArgs, session);
				break;
			case "-":
				enabledExpressions.delete(cmdArgs);
				console.log('Expression removed!')
				break;
			case "!":
				printSelector(cmdArgs, session);
				break;
			case "?":
				printWatchExpressions();
				break;
			case "v":
				await printVariables(session);
				break;
			case ":":
				evalAndPrintExpression(cmdArgs, undefined, undefined, session);
				break;
			case "b":
				await setOrClearBreakpoint(splitArgs, true, session);
				break;
			case "B":
				await setOrClearBreakpoint(splitArgs, false, session);
				break;
			case ";":
			case "p":
				printFile(session);
				printInstruction(session);
				printState(session);
				await printWatchExpressionsResults(session);
				break;
			case "o":
			case "i":
			case "u":
			case "n":
			case "c":
				if (!session.view(trace.finished)) {
					if (!session.view(solidity.current.source).source) {
						printInstruction(session);
					}

					printFile(session);
					printState(session);
				}
				await printWatchExpressionsResults(session);
				break;
			case "r":
				printAddressesAffected(session);
				printFile(session);
				printState(session);
				break;
			default:
				printHelp();
		}

		if (
			cmd !== "i" &&
			cmd !== "u" &&
			cmd !== "b" &&
			cmd !== "B" &&
			cmd !== "v" &&
			cmd !== "h" &&
			cmd !== "p" &&
			cmd !== "?" &&
			cmd !== "!" &&
			cmd !== ":" &&
			cmd !== "+" &&
			cmd !== "r" &&
			cmd !== "-"
		) {
			lastCommand = cmd;
		}
	}
}

let setOrClearBreakpoint = async (args, setOrClear, session) => {
	//setOrClear: true for set, false for clear
	let currentLocation = session.view(controller.current.location);
	let breakpoints = session.view(controller.breakpoints);

	let currentNode = currentLocation.node.id;
	let currentLine = currentLocation.sourceRange.lines.start.line;
	let currentSourceId = currentLocation.source.id;

	let sourceName; //to be used if a source is entered

	let breakpoint = {};

	debug("args %O", args);

	if (args.length === 0) {
		//no arguments, want currrent node
		debug("node case");
		breakpoint.node = currentNode;
		breakpoint.line = currentLine;
		breakpoint.sourceId = currentSourceId;
	}

	//the special case of "B all"
	else if (args[0] === "all") {
		if (setOrClear) {
			// only "B all" is legal, not "b all"
			console.log("Cannot add breakpoint everywhere.\n");
			return;
		}
		await session.removeAllBreakpoints();
		console.log("Removed all breakpoints.\n");
		return;
	}

	//if the argument starts with a "+" or "-", we have a relative
	//line number
	else if (args[0][0] === "+" || args[0][0] === "-") {
		debug("relative case");
		let delta = parseInt(args[0], 10); //want an integer
		debug("delta %d", delta);
		if (isNaN(delta)) {
			console.log("Offset must be an integer.\n");
			return;
		}
		breakpoint.sourceId = currentSourceId;
		breakpoint.line = currentLine + delta;
	}

	//if it contains a colon, it's in the form source:line
	else if (args[0].includes(":")) {
		debug("source case");
		let sourceArgs = args[0].split(":");
		let sourceArg = sourceArgs[0];
		let lineArg = sourceArgs[1];
		debug("sourceArgs %O", sourceArgs);

		//first let's get the line number as usual
		let line = parseInt(lineArg, 10); //want an integer
		if (isNaN(line)) {
			console.log("Line number must be an integer.\n");
			return;
		}

		//search sources for given string
		let sources = session.view(solidity.info.sources);

		//we will indeed need the sources here, not just IDs
		let matchingSources = Object.values(sources).filter(source =>
			source.sourcePath.includes(sourceArg)
		);

		if (matchingSources.length === 0) {
			console.log(
				`No source file found matching ${sourceArg}.\n`
			);
			return;
		} else if (matchingSources.length > 1) {
			console.log(
				`Multiple source files found matching ${sourceArg}.  Which did you mean?`
			);
			matchingSources.forEach(source =>
				console.log(source.sourcePath)
			);
			console.log("");
			return;
		}

		//otherwise, we found it!
		sourceName = path.basename(matchingSources[0].sourcePath);
		breakpoint.sourceId = matchingSources[0].id;
		breakpoint.line = line - 1; //adjust for zero-indexing!
	}

	//otherwise, it's a simple line number
	else {
		debug("absolute case");
		let line = parseInt(args[0], 10); //want an integer
		debug("line %d", line);

		if (isNaN(line)) {
			console.log("Line number must be an integer.\n");
			return;
		}

		breakpoint.sourceId = currentSourceId;
		breakpoint.line = line - 1; //adjust for zero-indexing!
	}

	//having constructed the breakpoint, here's now a user-readable
	//message describing its location
	let locationMessage;
	if (breakpoint.node !== undefined) {
		locationMessage = `this point in line ${breakpoint.line + 1}`;
		//+1 to adjust for zero-indexing
	} else if (breakpoint.sourceId !== currentSourceId) {
		//note: we should only be in this case if a source was entered!
		//if no source as entered and we are here, something is wrong
		locationMessage = `line ${breakpoint.line + 1} in ${sourceName}`;
		//+1 to adjust for zero-indexing
	} else {
		locationMessage = `line ${breakpoint.line + 1}`;
		//+1 to adjust for zero-indexing
	}

	//one last check -- does this breakpoint already exist?
	let alreadyExists =
		breakpoints.filter(
			existingBreakpoint =>
				existingBreakpoint.sourceId === breakpoint.sourceId &&
				existingBreakpoint.line === breakpoint.line &&
				existingBreakpoint.node === breakpoint.node //may be undefined
		).length > 0;

	//NOTE: in the "set breakpoint" case, the above check is somewhat
	//redundant, as we're going to check again when we actually make the
	//call to add or remove the breakpoint!  But we need to check here so
	//that we can display the appropriate message.  Hopefully we can find
	//some way to avoid this redundant check in the future.

	//if it already exists and is being set, or doesn't and is being
	//cleared, report back that we can't do that
	if (setOrClear === alreadyExists) {
		if (setOrClear) {
			console.log(
				`Breakpoint at ${locationMessage} already exists.\n`
			);
			return;
		} else {
			console.log(
				`No breakpoint at ${locationMessage} to remove.\n`
			);
			return;
		}
	}

	//finally, if we've reached this point, do it!
	//also report back to the user on what happened
	if (setOrClear) {
		await session.addBreakpoint(breakpoint);
		console.log(`Breakpoint added at ${locationMessage}.\n`);
	} else {
		await session.removeBreakpoint(breakpoint);
		console.log(`Breakpoint removed at ${locationMessage}.\n`);
	}
	return;
}

let splitLines = (str) => {
	// We were splitting on OS.EOL, but it turns out on Windows,
	// in some environments (perhaps?) line breaks are still denoted by just \n
	return str.split(/\r?\n/g);
}

let printAddressesAffected = (session) => {
	const affectedInstances = session.view(
		selectors.session.info.affectedInstances
	);

	console.log("Contracts and addresses affected:");
	console.log(
		DebugUtils.formatAffectedInstances(affectedInstances)
	);
}

let printHelp = () => {
	console.log("");
	console.log(DebugUtils.formatHelp());
}

let printFile = (session) => {
	let message = "";

	debug("about to determine sourcePath");
	const sourcePath = session.view(solidity.current.source).sourcePath;

	if (sourcePath) {
		message += path.basename(sourcePath);
	} else {
		message += "?";
	}

	console.log("");
	console.log(message + ":");
}

let printState = (session) => {
	const source = session.view(solidity.current.source).source;
	const range = session.view(solidity.current.sourceRange);

	debug("source: %o", source);
	debug("range: %o", range);

	if (!source) {
		console.log();
		console.log("1: // No source code found.");
		console.log("");
		return;
	}

	let lines = splitLines(source);

	console.log("");
	console.log(DebugUtils.formatRangeLines(lines, range.lines));

	console.log("");
}

let printInstruction = (session) => {
	const instruction = session.view(solidity.current.instruction);
	const step = session.view(trace.step);
	const traceIndex = session.view(trace.index);

	console.log("");
	console.log(
		DebugUtils.formatInstruction(traceIndex, instruction)
	);
	console.log(DebugUtils.formatStack(step.stack));
}

let select = (expr, session) => {
	let selector, result;

	try {
		selector = expr
			.split(".")
			.filter(function (next) {
				return next.length > 0;
			})
			.reduce(function (sel, next) {
				return sel[next];
			}, selectors);
	} catch (_) {
		throw new Error("Unknown selector: %s", expr);
	}

	// throws its own exception
	result = session.view(selector);

	return result;
}

/**
 * @param {string} selector
 */
let printSelector = (selector, session) => {
	const result = select(selector, session);
	const debugSelector = debugModule(selector);
	debugSelector.enabled = true;
	debugSelector("%O", result);
}

let printWatchExpressions = () => {
	if (enabledExpressions.size === 0) {
		console.log("No watch expressions added.");
		return;
	}

	console.log("");
	enabledExpressions.forEach(function (expression) {
		console.log("  " + expression);
	});
}

let printWatchExpressionsResults = async (session) => {
	debug("enabledExpressions %o", enabledExpressions);
	await Promise.all(
		[...enabledExpressions].map(async expression => {
			console.log(expression);
			// Add some padding. Note: This won't work with all loggers,
			// meaning it's not portable. But doing this now so we can get something
			// pretty until we can build more architecture around this.
			// Note: Selector results already have padding, so this isn't needed.
			if (expression[0] === ":") {
				process.stdout.write("  ");
			}
			await printWatchExpressionResult(expression, session);
		})
	);
}

let printWatchExpressionResult = async (expression, session) => {
	const type = expression[0];
	const exprArgs = expression.substring(1);

	if (type === "!") {
		printSelector(exprArgs, session);
	} else {
		await evalAndPrintExpression(exprArgs, 2, true, session);
	}
}

// TODO make this more robust for all cases and move to
// truffle-debug-utils
let formatValue = (value, indent) => {
	if (!indent) {
		indent = 0;
	}

	return util
		.inspect(value, {
			colors: true,
			depth: null,
			breakLength: 30
		})
		.split(/\r?\n/g)
		.map(function (line, i) {
			// don't indent first line
			let padding = i > 0 ? Array(indent).join(" ") : "";
			return padding + line;
		})
		.join(OS.EOL);
}

let printVariables = async (session) => {
	const variables = await session.variables();
	debug("variables %o", variables);

	// Get the length of the longest name.
	const longestNameLength = Math.max.apply(
		null,
		Object.keys(variables).map(function (name) {
			return name.length;
		})
	);

	console.log();

	Object.keys(variables).forEach(function (name) {
		let paddedName = name + ":";

		while (paddedName.length <= longestNameLength) {
			paddedName = " " + paddedName;
		}

		let value = variables[name];
		let formatted = formatValue(value, longestNameLength + 5);

		console.log("  " + paddedName, formatted);
	});

	console.log();
}

/**
 * Convert all !<...> expressions to JS-valid selector requests
 */
let preprocessSelectors = (expr) => {
	const regex = /!<([^>]+)>/g;
	const select = "$"; // expect repl context to have this func
	const replacer = (_, selector) => `${select}("${selector}")`;

	return expr.replace(regex, replacer);
}

/**
 * @param {string} raw - user input for watch expression
 *
 * performs pre-processing on `raw`, using !<...> delimeters to refer
 * to selector expressions.
 *
 * e.g., to see a particular part of the current trace step's stack:
 *
 *    debug(development:0x4228cdd1...)>
 *
 *        :!<trace.step.stack>[1]
 */
let evalAndPrintExpression = async (raw, indent, suppress, session) => {
	let context = Object.assign(
		{ $: select },

		await session.variables()
	);

	const expr = preprocessSelectors(raw);

	try {
		let result = safeEval(expr, context);
		let formatted = formatValue(result, indent);
		console.log(formatted);
		console.log();
	} catch (e) {
		// HACK: safeEval edits the expression to capture the result, which
		// produces really weird output when there are errors. e.g.,
		//
		//   evalmachine.<anonymous>:1
		//   SAFE_EVAL_857712=a
		//   ^
		//
		//   ReferenceError: a is not defined
		//     at evalmachine.<anonymous>:1:1
		//     at ContextifyScript.Script.runInContext (vm.js:59:29)
		//
		// We want to hide this from the user if there's an error.
		e.stack = e.stack.replace(/SAFE_EVAL_\d+=/, "");
		if (!suppress) {
			console.log(e);
		} else {
			console.log(formatValue(undefined));
		}
	}
}

let compileAllContracts = async (config) => {

	return new Promise(async (resolve, reject) => {
		let result;
		try {
			result = await compile.all(config);
			return resolve({
				contracts: result.returnVal,
				files: result.files
			});
		} catch (err) {
			return reject(err);
		}
	});
}

const run = async function (inputParams, inputPort) {
	// set the port for running the provider of the debugger
	port = inputPort;

	// set the provider with the desired port
	provider = new ethers.providers.JsonRpcProvider(`http://localhost:${port}`);

	//add custom inspect options for BNs
	BN.prototype[util.inspect.custom] = function (depth, inputParams) {
		return inputParams.stylize(this.toString(), "number");
	};

	console.log(DebugUtils.formatStartMessage());

	return new Promise(async (resolve, reject) => {
		txHash = inputParams;
		try {
			const compileResult = await compileAllContracts(config);
			const debuggerConfig = {
				provider: provider,
				files: compileResult.files,
				contracts: Object.keys(compileResult.contracts).map(function (name) {
					const contract = compileResult.contracts[name];
					return {
						contractName: contract.contractName || contract.contract_name,
						source: contract.source,
						sourcePath: contract.sourcePath,
						ast: contract.ast,
						binary: contract.binary || contract.bytecode,
						sourceMap: contract.sourceMap,
						deployedBinary: contract.deployedBinary || contract.deployedBytecode,
						deployedSourceMap: contract.deployedSourceMap,
						compiler: contract.compiler
					};
				})
			}

			const bugger = await Debugger.forTx(txHash, debuggerConfig);


			const session = bugger.connect()

			printAddressesAffected(session);
			printHelp();
			debug("Help printed");
			printFile(session);
			debug("File printed");
			printState(session);
			debug("State printed");

			let repl = inputParams.repl || new ReplManager(config);

			repl.start({
				prompt:
					"debugging(" +
					`${colors.colorNetwork(config.network)}` +
					":" +
					`${colors.colorTransactionHash(txHash)}` +
					")> ",
				interpreter: util.callbackify(sessionInterpreter(session, repl)),
				ignoreUndefined: true,
				done: resolve
			});
		} catch (err) {
			console.log(err);
			reject(err);
		}
	})

}

module.exports = {
	run
};