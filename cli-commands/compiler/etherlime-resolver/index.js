const EPMSource = require("./epm");
const NPMSource = require("./npm");
const FSSource = require("./fs");
const expect = require("./../etherlime-expect");

class Resolver {
  constructor(options) {
    expect.options(options, [
      "working_directory",
      "contracts_build_directory",
    ]);

    this.options = options;

    this.sources = [
      new EPMSource(options.working_directory, options.contracts_build_directory),
      new NPMSource(options.working_directory),
      new FSSource(options.working_directory, options.contracts_build_directory)
    ];
  }

  resolve(import_path, imported_from) {
    let resolved_body = null;
    let resolved_path = null;
    let current_index = -1;
    let current_source;

    return new Promise(async (resolve, reject) => {
      let self = this;
      while (!resolved_body && current_index < self.sources.length - 1) {
        current_index += 1;
        current_source = self.sources[current_index];


        let result = await current_source.resolve(import_path, imported_from)

        if (result.body) {
          resolved_body = result.body;
          resolved_path = result.import_path;
          return resolve({ resolved_body, resolved_path, current_source })
        }
      }

      let message = `Could not find ${import_path} from any sources`;

      if (imported_from) {
        message += `; imported from ${imported_from}`;
      }

      return reject(new Error(message));

    });
  }
}

module.exports = Resolver;
