const CompileError = require("./compile-error");
const preReleaseCompilerWarning = "This is a pre-release compiler version, please do not use it in production.";

const parseImports = (body, solc) => {
  const importErrorKey = "ETHERLIME_IMPORT";
  const failingImportFileName = "__Etherlime__NotFound.sol";

  body = body + "\n\nimport '" + failingImportFileName + "';\n";

  const solcStandardInput = {
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

  let output = solc.compile(JSON.stringify(solcStandardInput), () => {
    return { error: importErrorKey };
  });

  output = JSON.parse(output);

  const errors = output.errors.filter((solidity_error) => {
    return solidity_error.message.indexOf(preReleaseCompilerWarning) < 0;
  });

  const nonImportErrors = errors.filter((solidity_error) => {
    return solidity_error.formattedMessage.indexOf(importErrorKey) < 0;
  });

  if (nonImportErrors.length > 0) {
    throw new CompileError(nonImportErrors[0].formattedMessage);
  }

  const imports = errors.filter((solidity_error) => {
    return solidity_error.message.indexOf(failingImportFileName) < 0;
  }).map((solidity_error) => {
    let matches = solidity_error.formattedMessage.match(/import[^'"]+("|')([^'"]+)("|');/);

    return matches[2];
  });

  return imports;
}
module.exports = { parseImports }
