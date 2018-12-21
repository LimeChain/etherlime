var CompileError = require("./compile-error");
var solc = require("solc");
var fs = require("fs");
var path = require("path");

var preReleaseCompilerWarning = "This is a pre-release compiler version, please do not use it in production.";
var installedContractsDir = "installed_contracts"

module.exports = {

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
