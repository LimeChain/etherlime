var Profiler = require("./profiler");
var OS = require("os");

var path = require("path");
var Profiler = require("./profiler");
var CompileError = require("./compile-error");
var expect = require("./../etherlime-expect");
var find_contracts = require("./../etherlime-contract-sources");
var Config = require("./../etherlime-config");

var CompilerSupplier = require("./compilerSupplier");

var compile = function (sources, options, callback) {
  if (typeof options == "function") {
    callback = options;
    options = {};
  }

  if (options.logger == null) {
    options.logger = console;
  }

  expect.options(options, [
    "contracts_directory",
    "solc"
  ]);

  var solc = require("solc");

  var listeners = process.listeners("uncaughtException");
  var solc_listener = listeners[listeners.length - 1];

  if (solc_listener) {
    process.removeListener("uncaughtException", solc_listener);
  }

  var operatingSystemIndependentSources = {};
  var originalPathMappings = {};

  Object.keys(sources).forEach(function (source) {
    var replacement = source.replace(/\\/g, "/");

    if (replacement.length >= 2 && replacement[1] == ":") {
      replacement = "/" + replacement;
      replacement = replacement.replace(":", "");
    }

    operatingSystemIndependentSources[replacement] = sources[source];
    originalPathMappings[replacement] = source;
  });

  var solcStandardInput = {
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
    return callback(null, [], []);
  }

  Object.keys(operatingSystemIndependentSources).forEach(function (file_path) {
    solcStandardInput.sources[file_path] = {
      content: operatingSystemIndependentSources[file_path]
    }
  });

  var supplier = new CompilerSupplier(options.compilers.solc);

  supplier.load().then(solc => {
    var result = solc.compileStandard(JSON.stringify(solcStandardInput));

    var standardOutput = JSON.parse(result);

    var errors = standardOutput.errors || [];
    var warnings = [];

    if (options.strict !== true) {
      warnings = errors.filter(function (error) {
        return error.severity == "warning";
      });

      errors = errors.filter(function (error) {
        return error.severity != "warning";
      });

      if (options.quiet !== true && warnings.length > 0) {
        options.logger.log(`${OS.EOL} Compilation warnings encountered: ${OS.EOL}`);
        options.logger.log(warnings.map(function (warning) {
          return warning.formattedMessage;
        }).join());
      }
    }

    if (errors.length > 0) {
      options.logger.log("");
      return callback(new CompileError(standardOutput.errors.map(function (error) {
        return error.formattedMessage;
      }).join()));
    }

    var contracts = standardOutput.contracts;

    var files = [];
    Object.keys(standardOutput.sources).forEach(function (filename) {
      var source = standardOutput.sources[filename];
      files[source.id] = originalPathMappings[filename];
    });

    var returnVal = {};

    Object.keys(contracts).forEach(function (source_path) {
      var files_contracts = contracts[source_path];

      Object.keys(files_contracts).forEach(function (contract_name) {
        var contract = files_contracts[contract_name];

        var contract_definition = {
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
            "version": solc.version()
          }
        }

        contract_definition.abi = orderABI(contract_definition);

        Object.keys(contract.evm.bytecode.linkReferences).forEach(function (file_name) {
          var fileLinks = contract.evm.bytecode.linkReferences[file_name];

          Object.keys(fileLinks).forEach(function (library_name) {
            var linkReferences = fileLinks[library_name] || [];

            contract_definition.bytecode = replaceLinkReferences(contract_definition.bytecode, linkReferences, library_name);
            contract_definition.unlinked_binary = replaceLinkReferences(contract_definition.unlinked_binary, linkReferences, library_name);
          });
        });

        Object.keys(contract.evm.deployedBytecode.linkReferences).forEach(function (file_name) {
          var fileLinks = contract.evm.deployedBytecode.linkReferences[file_name];

          Object.keys(fileLinks).forEach(function (library_name) {
            var linkReferences = fileLinks[library_name] || [];

            contract_definition.deployedBytecode = replaceLinkReferences(contract_definition.deployedBytecode, linkReferences, library_name);
          });
        });

        returnVal[contract_name] = contract_definition;
      });
    });

    callback(null, returnVal, files);
  })
  .catch(callback);
};

function replaceLinkReferences(bytecode, linkReferences, libraryName) {
  var linkId = "__" + libraryName;

  while (linkId.length < 40) {
    linkId += "_";
  }

  linkReferences.forEach((ref) => {
    var start = (ref.start * 2) + 2;
    bytecode = bytecode.substring(0, start) + linkId + bytecode.substring(start + 40);
  });

  return bytecode;
};

function orderABI(contract) {
  var contract_definition;
  var ordered_function_names = [];
  var ordered_functions = [];

  for (var i = 0; i < contract.legacyAST.children.length; i++) {
    var definition = contract.legacyAST.children[i];

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

  var functions_to_remove = ordered_function_names.reduce((obj, value, index) => {
    obj[value] = index;

    return obj;
  }, {});

  var function_definitions = contract.abi.filter((item) => {
    return functions_to_remove[item.name] != null;
  });

  function_definitions = function_definitions.sort((item_a, item_b) => {
    var a = functions_to_remove[item_a.name];
    var b = functions_to_remove[item_b.name];

    if (a > b) return 1;
    if (a < b) return -1;

    return 0;
  });

  var newABI = [];
  contract.abi.forEach((item) => {
    if (functions_to_remove[item.name] != null) {
      return;
    }

    newABI.push(item);
  });

  Array.prototype.push.apply(newABI, function_definitions);

  return newABI;
}

compile.all = function (options, callback) {
  find_contracts(options.contracts_directory, (error, files) => {
    options.paths = files;
    compile.with_dependencies(options, callback);
  });
};

compile.necessary = function (options, callback) {
  options.logger = options.logger || console;

  Profiler.updated(options, (error, updated) => {
    if (error) {
      return callback(error);
    }

    if (updated.length == 0 && options.quiet != true) {
      return callback(null, [], {});
    }

    options.paths = updated;
    compile.with_dependencies(options, callback);
  });
};

compile.with_dependencies = function (options, callback) {
  options.logger = options.logger || console;
  options.contracts_directory = options.contracts_directory || process.cwd();

  expect.options(options, [
    "paths",
    "working_directory",
    "contracts_directory",
    "resolver"
  ]);

  var config = Config.default().merge(options);

  Profiler.required_sources(config.with({
    paths: options.paths,
    base_path: options.contracts_directory,
    resolver: options.resolver
  }), (error, result) => {
    if (error) {
      return callback(error);
    }

    if (options.quiet != true) {
      Object.keys(result).sort().forEach((import_path) => {
        var display_path = import_path;

        if (path.isAbsolute(import_path)) {
          display_path = "." + path.sep + path.relative(options.working_directory, import_path);
        }

        console.log(`Compiling ${display_path}...`);
      });
    }

    compile(result, options, callback);
  });
};

compile.CompilerSupplier = CompilerSupplier;
module.exports = compile;
