const CompileError = require("./compile-error");
const preReleaseCompilerWarning = "This is a pre-release compiler version, please do not use it in production.";
const parseImports = (body, solc) => {
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

  let output = solc.compile(JSON.stringify(solcStandardInput));
  output = JSON.parse(output);

  const errors = output.errors.filter(
    ({
      message
    }) => !message.includes(preReleaseCompilerWarning)
  );

  const imports = errors
    .filter(({
      message
    }) => !message.includes(failingImportFileName))
    .map(({
      formattedMessage
    }) => {
      const matches = formattedMessage.match(
        /import[^'"]?.*("|')([^'"]+)("|')/
      );

      if (matches) return matches[2];
    })
    .filter(match => match !== undefined);

  return imports;
}
module.exports = {
  parseImports
}