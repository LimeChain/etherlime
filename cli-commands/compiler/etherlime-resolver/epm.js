const path = require("path");
const fs = require("fs");

class EPM {
  constructor(working_directory, contracts_build_directory) {
    this.working_directory = working_directory;
    this.contracts_build_directory = contracts_build_directory;
  }

  resolve(import_path, imported_from) {
    return new Promise((resolve, reject) => {
      let separator = import_path.indexOf("/");
      let package_name = import_path.substring(0, separator);
      let internal_path = import_path.substring(separator + 1);
      let installDir = this.working_directory;

      let body;

      while (true) {
        let file_path = path.join(installDir, "installed_contracts", import_path);

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

        let oldInstallDir = installDir;
        installDir = path.join(installDir, '..');
        if (installDir === oldInstallDir) {
          break;
        }
      }

      return resolve({ body, import_path });
    });
  };

  resolve_dependency_path(import_path, dependency_path) {
    let dirname = path.dirname(import_path);
    let resolved_dependency_path = path.join(dirname, dependency_path);

    resolved_dependency_path = resolved_dependency_path.replace(/\\/g, "/");

    return resolved_dependency_path;
  }
}
module.exports = EPM;
