var path = require("path");
var fs = require("fs");
var eachSeries = require("async-each-series");

function FS(working_directory, contracts_build_directory) {
  this.working_directory = working_directory;
  this.contracts_build_directory = contracts_build_directory;
}

FS.prototype.getContractName = function (sourcePath, searchPath) {
  searchPath = searchPath || this.contracts_build_directory;

  var filenames = fs.readdirSync(searchPath);
  for (var i = 0; i < filenames.length; i++) {
    var filename = filenames[i];

    
    var artifact = JSON.parse(
      fs.readFileSync(path.resolve(searchPath, filename))
    );

    if (artifact.sourcePath == sourcePath) {
      return artifact.contractName;
    }
  };

  return path.basename(sourcePath, ".sol");
}

FS.prototype.resolve = function (import_path, imported_from, callback) {
  imported_from = imported_from || "";

  var possible_paths = [
    import_path,
    path.join(path.dirname(imported_from), import_path)
  ];

  var resolved_body = null;
  var resolved_path = null;

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
    callback(null, resolved_body, resolved_path);
  });
};

FS.prototype.resolve_dependency_path = function (import_path, dependency_path) {
  var dirname = path.dirname(import_path);
  return path.resolve(path.join(dirname, dependency_path));
};

module.exports = FS;