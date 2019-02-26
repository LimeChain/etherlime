var path = require("path");
var fs = require("fs");

function EPM(working_directory, contracts_build_directory) {
  this.working_directory = working_directory;
  this.contracts_build_directory = contracts_build_directory;
};

EPM.prototype.resolve = function (import_path, imported_from) {
  return new Promise((resolve, reject) => {
    var separator = import_path.indexOf("/");
    var package_name = import_path.substring(0, separator);
    var internal_path = import_path.substring(separator + 1);
    var installDir = this.working_directory;

    var body;

    while (true) {
      var file_path = path.join(installDir, "installed_contracts", import_path);

      try {
        body = fs.readFileSync(file_path, { encoding: "utf8" });
        break;
      }
      catch (err) { }

      file_path = path.join(installDir, "installed_contracts", package_name, "contracts", internal_path)

      try {
        body = fs.readFileSync(file_path, { encoding: "utf8" });
        break;
      }
      catch (err) { }

      var oldInstallDir = installDir;
      installDir = path.join(installDir, '..');
      if (installDir === oldInstallDir) {
        break;
      }
    }

    return resolve({ body, import_path });
  });
},

  EPM.prototype.resolve_dependency_path = function (import_path, dependency_path) {
    var dirname = path.dirname(import_path);
    var resolved_dependency_path = path.join(dirname, dependency_path);

    resolved_dependency_path = resolved_dependency_path.replace(/\\/g, "/");

    return resolved_dependency_path;
  };

module.exports = EPM;
