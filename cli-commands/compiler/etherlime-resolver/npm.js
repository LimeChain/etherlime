const path = require("path");
const fs = require("fs");

class NPM {
  constructor(working_directory) {
    this.working_directory = working_directory;
  }
  resolve(import_path, imported_from) {
    return new Promise((resolve, reject) => {
      let body;
      let modulesDir = this.working_directory;

      while (true) {
        let expected_path = path.join(modulesDir, "node_modules", import_path);

        try {
          body = fs.readFileSync(expected_path, { encoding: "utf8" });
          break;
        } catch (error) { }

        let oldModulesDir = modulesDir;
        modulesDir = path.join(modulesDir, '..');
        if (modulesDir === oldModulesDir) {
          break;
        }
      }

      return resolve({ body, import_path });
    })
  }
  resolve_dependency_path(import_path, dependency_path) {
    let dirname = path.dirname(import_path);

    return path.join(dirname, dependency_path);
  }
}

module.exports = NPM;
