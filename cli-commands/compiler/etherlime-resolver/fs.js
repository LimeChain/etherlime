const path = require("path");
const fs = require("fs");
const eachSeries = require("async-each-series");

class FS {
  constructor(working_directory, contracts_build_directory) {
    this.working_directory = working_directory;
    this.contracts_build_directory = contracts_build_directory;
  }

  getContractName(sourcePath, searchPath) {
    searchPath = searchPath || this.contracts_build_directory;

    let filenames = fs.readdirSync(searchPath);
    for (let i = 0; i < filenames.length; i++) {
      let filename = filenames[i];


      let artifact = JSON.parse(
        fs.readFileSync(path.resolve(searchPath, filename))
      );

      if (artifact.sourcePath == sourcePath) {
        return artifact.contractName;
      }
    };

    return path.basename(sourcePath, ".sol");
  }
  resolve(import_path, imported_from) {
    return new Promise((resolve, reject) => {
      imported_from = imported_from || "";

      let possible_paths = [
        import_path,
        path.join(path.dirname(imported_from), import_path)
      ];

      let resolved_body = null;
      let resolved_path = null;

      eachSeries(possible_paths, function (possible_path, finished) {
        if (resolved_body != null) {
          return finished();
        }

        fs.readFile(possible_path, {
          encoding: "utf8"
        }, function (err, body) {
          if (body) {
            resolved_body = body;
            resolved_path = possible_path;
          }

          return finished();
        });
      }, function () {
        resolve({ body: resolved_body, import_path: resolved_path });
      });
    })
  }
  resolve_dependency_path(import_path, dependency_path) {
    let dirname = path.dirname(import_path);
    return path.resolve(path.join(dirname, dependency_path));
  }
}

module.exports = FS;