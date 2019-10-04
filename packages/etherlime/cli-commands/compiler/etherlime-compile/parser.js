const CompileError = require("./compile-error");
const preReleaseCompilerWarning = "This is a pre-release compiler version, please do not use it in production.";
const parseImports = (body, solc) => {
  const importErrorKey = "ETHERLIME_IMPORT";
  const nativeSolImportErrorKey = "File outside of allowed directories."
  const failingImportFileName = "__Etherlime__NotFound.sol";

  body = body + "\n\nimport '" + failingImportFileName + "';\n";

  let solcStandardInput = {
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
    return { error: (importErrorKey && nativeSolImportErrorKey) };
  });

  output = JSON.parse(output);

  let errors = output.errors.filter((solidity_error) => {
    return solidity_error.message.indexOf(preReleaseCompilerWarning) < 0;
  });

  let nonImportErrors = errors.filter((solidity_error) => {
    return (solidity_error.formattedMessage.indexOf(importErrorKey) < 0 && solidity_error.formattedMessage.indexOf(nativeSolImportErrorKey) < 0);
  });


  if (nonImportErrors.length > 0) {
    throw new CompileError(nonImportErrors[0].formattedMessage);
  }

  let imports = errors.filter((solidity_error) => {
    return solidity_error.message.indexOf(failingImportFileName) < 0;
  }).map((solidity_error) => {
    let matches = solidity_error.formattedMessage.match(/import[^'"]+("|')([^'"]+)("|');/);

    return matches[2];
  });

  return imports;
}
module.exports = { parseImports }
