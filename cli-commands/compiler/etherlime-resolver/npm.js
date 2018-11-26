var path = require("path");
var fs = require("fs");

function NPM(working_directory) {
  this.working_directory = working_directory;
};

NPM.prototype.resolve = function (import_path, imported_from, callback) {

  var body;
  var modulesDir = this.working_directory;

  while (true) {
    var expected_path = path.join(modulesDir, "node_modules", import_path);

    try {
      var body = fs.readFileSync(expected_path, { encoding: "utf8" });
      break;
    } catch (error) { }                                                                 

    var oldModulesDir = modulesDir;
    modulesDir = path.join(modulesDir, '..');
    if (modulesDir === oldModulesDir) {
      break;
    }
  }

  return callback(null, body, import_path);
};

NPM.prototype.resolve_dependency_path = function (import_path, dependency_path) {
  var dirname = path.dirname(import_path);
  
  return path.join(dirname, dependency_path);
};

module.exports = NPM;
