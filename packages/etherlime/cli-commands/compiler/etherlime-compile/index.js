const OS = require("os");
const path = require("path");
const Profiler = require("./profiler");
const CompileError = require("./compile-error");
const expect = require("./../etherlime-expect");
const find_contracts = require("./../etherlime-contract-sources").find_contracts;
const Config = require("./../etherlime-config");
const CompilerSupplier = require("./compilerSupplier");
const logger = require('etherlime-logger').logger;

let compile = async (sources, options) => {
	return new Promise(async (resolve, reject) => {
		expect.options(options, [
			"contracts_directory",
			"solc"
		]);
		const operatingSystemIndependentSources = {};
		const originalPathMappings = {};
		Object.keys(sources).forEach((source) => {
			let replacement = source.replace(/\\/g, "/");
			if (replacement.length >= 2 && replacement[1] == ":") {
				replacement = "/" + replacement;
				replacement = replacement.replace(":", "");
			}
			operatingSystemIndependentSources[replacement] = sources[source];
			originalPathMappings[replacement] = source;
		});
		const solcStandardInput = {
			language: "Solidity",
			sources: {},
			settings: {
				evmVersion: options.solc.evmVersion,
				optimizer: options.solc.optimizer,
				outputSelection: {
					"*": {
						"": [
							"legacyAST",
							"ast"
						],
						"*": [
							"abi",
							"evm.bytecode.object",
							"evm.bytecode.sourceMap",
							"evm.deployedBytecode.object",
							"evm.deployedBytecode.sourceMap"
						]
					},
				}
			}
		};
		if (Object.keys(sources).length == 0) {
			return resolve([], []);
		}
		Object.keys(operatingSystemIndependentSources).forEach((file_path) => {
			solcStandardInput.sources[file_path] = {
				content: operatingSystemIndependentSources[file_path]
			}
		});
		const supplier = new CompilerSupplier(options.compilers.solc);
		let solc = await supplier.load();
		const result = solc.compile(JSON.stringify(solcStandardInput));
		const standardOutput = JSON.parse(result);
		let errors = standardOutput.errors || [];
		let warnings = [];
		if (options.strict !== true) {
			warnings = errors.filter((error) => {
				return error.severity == "warning";
			});
			errors = errors.filter((error) => {
				return error.severity != "warning";
			});
			if (options.quiet !== true && warnings.length > 0) {
				logger.log(`${OS.EOL} Compilation warnings encountered: ${OS.EOL}`);
				logger.log(warnings.map((warning) => {
					return warning.formattedMessage;
				}).join());
			}
		}
		if (errors.length > 0) {
			logger.log("");
			return reject(new CompileError(standardOutput.errors.map((error) => {
				return error.formattedMessage;
			}).join()));
		}
		let contracts = standardOutput.contracts;
		let files = [];
		Object.keys(standardOutput.sources).forEach((filename) => {
			const source = standardOutput.sources[filename];
			files[source.id] = originalPathMappings[filename];
		});
		let returnVal = {};
		Object.keys(contracts).forEach((source_path) => {
			const files_contracts = contracts[source_path];
			Object.keys(files_contracts).forEach((contract_name) => {
				const contract = files_contracts[contract_name];
				const contract_definition = {
					contract_name: contract_name,
					sourcePath: originalPathMappings[source_path],
					source: operatingSystemIndependentSources[source_path],
					sourceMap: contract.evm.bytecode.sourceMap,
					deployedSourceMap: contract.evm.deployedBytecode.sourceMap,
					legacyAST: standardOutput.sources[source_path].legacyAST,
					ast: standardOutput.sources[source_path].ast,
					abi: contract.abi,
					bytecode: "0x" + contract.evm.bytecode.object,
					deployedBytecode: "0x" + contract.evm.deployedBytecode.object,
					unlinked_binary: "0x" + contract.evm.bytecode.object,
					compiler: {
						"name": "solc",
						"version": solc.version(),
						"optimizer": options.solc.optimizer.enabled,
						"runs": options.solc.optimizer.runs
					}
				}
				contract_definition.abi = orderABI(contract_definition);
				Object.keys(contract.evm.bytecode.linkReferences).forEach((file_name) => {
					const fileLinks = contract.evm.bytecode.linkReferences[file_name];
					Object.keys(fileLinks).forEach((library_name) => {
						const linkReferences = fileLinks[library_name] || [];
						contract_definition.bytecode = replaceLinkReferences(contract_definition.bytecode, linkReferences, library_name);
						contract_definition.unlinked_binary = replaceLinkReferences(contract_definition.unlinked_binary, linkReferences, library_name);
					});
				});
				Object.keys(contract.evm.deployedBytecode.linkReferences).forEach((file_name) => {
					const fileLinks = contract.evm.deployedBytecode.linkReferences[file_name];
					Object.keys(fileLinks).forEach((library_name) => {
						const linkReferences = fileLinks[library_name] || [];
						contract_definition.deployedBytecode = replaceLinkReferences(contract_definition.deployedBytecode, linkReferences, library_name);
					});
				});
				returnVal[contract_name] = contract_definition;
			});
		});
		let object = { returnVal, files }
		resolve(object);
	});

}

replaceLinkReferences = (bytecode, linkReferences, libraryName) => {
	let linkId = "__" + libraryName;
	while (linkId.length < 40) {
		linkId += "_";
	}
	linkReferences.forEach((ref) => {
		let start = (ref.start * 2) + 2;
		bytecode = bytecode.substring(0, start) + linkId + bytecode.substring(start + 40);
	});
	return bytecode;
};
orderABI = (contract) => {
	let contract_definition;
	let ordered_function_names = [];
	let ordered_functions = [];
	for (let i = 0; i < contract.legacyAST.children.length; i++) {
		const definition = contract.legacyAST.children[i];
		if (definition.name !== "ContractDefinition" ||
			definition.attributes.name !== contract.contract_name) {
			continue;
		}
		contract_definition = definition;
		break;
	}
	if (!contract_definition) {
		return contract.abi;
	}
	if (!contract_definition.children) {
		return contract.abi;
	}
	contract_definition.children.forEach((child) => {
		if (child.name == "FunctionDefinition") {
			ordered_function_names.push(child.attributes.name);
		}
	});
	let functions_to_remove = ordered_function_names.reduce((obj, value, index) => {
		obj[value] = index;
		return obj;
	}, {});
	let function_definitions = contract.abi.filter((item) => {
		return functions_to_remove[item.name] != null;
	});
	function_definitions = function_definitions.sort((item_a, item_b) => {
		const a = functions_to_remove[item_a.name];
		const b = functions_to_remove[item_b.name];
		if (a > b) return 1;
		if (a < b) return -1;
		return 0;
	});
	let newABI = [];
	contract.abi.forEach((item) => {
		if (functions_to_remove[item.name] != null) {
			return;
		}
		newABI.push(item);
	});
	Array.prototype.push.apply(newABI, function_definitions);
	return newABI;
}
compile.all = async (options) => {
	let files;
	let object;
	try {
		files = await find_contracts(options.contracts_directory);

		options.paths = files.solFiles;
		object = await compile.with_dependencies(options);
		return object;
	} catch (e) {
		throw e;
	}
}
compile.necessary = async (options) => {
	return new Promise(async (resolve, reject) => {
		let updated = [];
		let object;
		try {
			updated = await Profiler.updated(options);
			if (updated.length == 0 && options.quiet != true) {
				return resolve([], {});
			}
			options.paths = updated;
			object = await compile.with_dependencies(options);
			resolve(object);
		}
		catch (e) {
			return reject(e);
		}

	});
}
compile.with_dependencies = async (options) => {
	return new Promise(async (resolve, reject) => {
		options.contracts_directory = options.contracts_directory || process.cwd();
		expect.options(options, [
			"paths",
			"working_directory",
			"contracts_directory",
			"resolver"
		]);
		const config = Config.default().merge(options);
		let result;
		try {
			result = await Profiler.required_sources(config.with({
				paths: options.paths,
				base_path: options.contracts_directory,
				resolver: options.resolver
			}));
			if (options.quiet != true) {
				Object.keys(result).sort().forEach((import_path) => {
					const display_path = "." + path.sep + path.relative(options.working_directory, import_path);
					logger.log(`Compiling ${display_path}...`);
				});
			}
			let object = await compile(result, options);
			resolve(object);
		} catch (e) {
			return reject(e);
		}
	})
}
compile.CompilerSupplier = CompilerSupplier;
module.exports = compile;