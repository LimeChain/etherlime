var CompileError = require("./compile-error");
var solc = require("solc");
var fs = require("fs");
var path = require("path");

var listeners = process.listeners("uncaughtException");
var solc_listener = listeners[listeners.length - 1];

if (solc_listener) {
  process.removeListener("uncaughtException", solc_listener);
}

var preReleaseCompilerWarning = "This is a pre-release compiler version, please do not use it in production.";
var installedContractsDir = "installed_contracts"

module.exports = {
  parse: function (body, fileName) {
    var build_remappings = function () {
      var remappings = [];

      if (fs.existsSync('ethpm.json')) {
        ethpm = JSON.parse(fs.readFileSync('ethpm.json'));

        for (pkg in ethpm.dependencies) {
          remappings.push(pkg + "/=" + path.join(installedContractsDir, pkg, 'contracts', '/'));
        }
      }

      return remappings;
    }

    var fileName = fileName || "ParsedContract.sol";

    var remappings = build_remappings();

    var solcStandardInput = {
      language: "Solidity",
      sources: {
        [fileName]: {
          content: body
        }
      },
      settings: {
        remappings: remappings,
        outputSelection: {
          "*": {
            "": [
              "ast"
            ]
          }
        }
      }
    };

    var output = solc.compileStandard(JSON.stringify(solcStandardInput), function (file_path) {
      if (fs.existsSync(file_path)) {
        contents = fs.readFileSync(file_path, { encoding: 'UTF-8' });
      } else {
        contents = "pragma solidity ^0.4.0;";
      }

      return { contents: contents };
    });

    output = JSON.parse(output);

    var errors = output.errors ? output.errors.filter(function (solidity_error) {
      return solidity_error.message.indexOf(preReleaseCompilerWarning) < 0;
    }) : [];

    var warnings = output.errors ? output.errors.filter(function (solidity_error) {
      return solidity_error.severity == "warning";
    }) : [];
    var errors = output.errors ? output.errors.filter(function (solidity_error) {
      return solidity_error.severity != "warning";
    }) : [];

    if (errors.length > 0) {
      throw new CompileError(errors[0].formattedMessage);
    }

    return {
      contracts: Object.keys(output.contracts[fileName]),
      ast: output.sources[fileName].ast
    };
  },

  parseImports: function (body) {
    var importErrorKey = "ETHERLIME_IMPORT";
    var failingImportFileName = "__Etherlime__NotFound.sol";

    body = body + "\n\nimport '" + failingImportFileName + "';\n";

    var solcStandardInput = {
      language: "Solidity",
      sources: {
        "ParsedContract.sol": {
          content: body
        }
      },
      settings: {
        outputSelection: {
          "ParsedContract.sol": {
            "*": []
          }
        }
      }
    };

    var output = solc.compileStandard(JSON.stringify(solcStandardInput), function () {
      return { error: importErrorKey };
    });

    output = JSON.parse(output);

    var errors = output.errors.filter(function (solidity_error) {
      return solidity_error.message.indexOf(preReleaseCompilerWarning) < 0;
    });

    var nonImportErrors = errors.filter(function (solidity_error) {
      return solidity_error.formattedMessage.indexOf(importErrorKey) < 0;
    });

    if (nonImportErrors.length > 0) {
      throw new CompileError(nonImportErrors[0].formattedMessage);
    }

    var imports = errors.filter(function (solidity_error) {
      return solidity_error.message.indexOf(failingImportFileName) < 0;
    }).map(function (solidity_error) {
      var matches = solidity_error.formattedMessage.match(/import[^'"]+("|')([^'"]+)("|');/);

      return matches[2];
    });

    return imports;
  }
}
