var CompileError = require("./compile-error");
var solc = require("solc");
var fs = require("fs");
var path = require("path");

// Clean up after solc.
var listeners = process.listeners("uncaughtException");
var solc_listener = listeners[listeners.length - 1];

if (solc_listener) {
  process.removeListener("uncaughtException", solc_listener);
}

// Warning issued by a pre-release compiler version, ignored by this component.
var preReleaseCompilerWarning = "This is a pre-release compiler version, please do not use it in production.";

var installedContractsDir = "installed_contracts"

module.exports = {
  parse: function (body, fileName) {
    // Here, we want a valid AST even if imports don't exist. The way to
    // get around that is to tell the compiler, as they happen, that we
    // have source for them (an empty file).

    var build_remappings = function () {
      // Maps import paths to paths from EthPM installed contracts, so we can correctly solve imports
      // e.g. "my_pkg/=installed_contracts/my_pkg/contracts/"
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
      // Resolve dependency manually.
      if (fs.existsSync(file_path)) {
        contents = fs.readFileSync(file_path, { encoding: 'UTF-8' });
      } else {
        contents = "pragma solidity ^0.4.0;";
      }

      return { contents: contents };
    });

    output = JSON.parse(output);

    // Filter out the "pre-release compiler" warning, if present.
    var errors = output.errors ? output.errors.filter(function (solidity_error) {
      return solidity_error.message.indexOf(preReleaseCompilerWarning) < 0;
    }) : [];

    // Filter out warnings.
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

  // This needs to be fast! It is fast (as of this writing). Keep it fast!
  parseImports: function (body) {
    var self = this;

    // WARNING: Kind of a hack (an expedient one).

    // So we don't have to maintain a separate parser, we'll get all the imports
    // in a file by sending the file to solc and evaluating the error messages
    // to see what import statements couldn't be resolved. To prevent full-on
    // compilation when a file has no import statements, we inject an import
    // statement right on the end; just to ensure it will error and we can parse
    // the imports speedily without doing extra work.

    // Helper to detect import errors with an easy regex.
    var importErrorKey = "ETHERLIME_IMPORT";

    // Inject failing import.
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
            "*": [] // We don't need any output.
          }
        }
      }
    };

    var output = solc.compileStandard(JSON.stringify(solcStandardInput), function () {
      // The existence of this function ensures we get a parsable error message.
      // Without this, we'll get an error message we *can* detect, but the key will make it easier.
      // Note: This is not a normal callback. See docs here: https://github.com/ethereum/solc-js#from-version-021
      return { error: importErrorKey };
    });

    output = JSON.parse(output);

    // Filter out the "pre-release compiler" warning, if present.
    var errors = output.errors.filter(function (solidity_error) {
      return solidity_error.message.indexOf(preReleaseCompilerWarning) < 0;
    });

    var nonImportErrors = errors.filter(function (solidity_error) {
      // If the import error key is not found, we must not have an import error.
      // This means we have a *different* parsing error which we should show to the user.
      // Note: solc can return multiple parsing errors at once.
      // We ignore the "pre-release compiler" warning message.
      return solidity_error.formattedMessage.indexOf(importErrorKey) < 0;
    });

    // Should we try to throw more than one? (aside; we didn't before)
    if (nonImportErrors.length > 0) {
      throw new CompileError(nonImportErrors[0].formattedMessage);
    }

    // Now, all errors must be import errors.
    // Filter out our forced import, then get the import paths of the rest.
    var imports = errors.filter(function (solidity_error) {
      return solidity_error.message.indexOf(failingImportFileName) < 0;
    }).map(function (solidity_error) {
      var matches = solidity_error.formattedMessage.match(/import[^'"]+("|')([^'"]+)("|');/);

      // Return the item between the quotes.
      return matches[2];
    });

    return imports;
  }
}
