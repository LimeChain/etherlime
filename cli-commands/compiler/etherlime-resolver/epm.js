var path = require("path");
var fs = require("fs");

function EPM(working_directory, contracts_build_directory) {
  this.working_directory = working_directory;
  this.contracts_build_directory = contracts_build_directory;
};

EPM.prototype.require = function (import_path, search_path) {
  if (import_path.indexOf(".") == 0 || import_path.indexOf("/") == 0) {
    return null;
  }

  var contract_filename = path.basename(import_path);
  var contract_name = path.basename(import_path, ".sol");
  var separator = import_path.indexOf("/")
  var package_name = import_path.substring(0, separator);

  var install_directory = path.join(this.working_directory, "installed_contracts");
  var lockfile = path.join(install_directory, package_name, "lock.json");

  try {
    lockfile = fs.readFileSync(lockfile, "utf8");
  } catch (e) {
    return null;
  }

  lockfile = JSON.parse(lockfile);

  var json = {
    contract_name: contract_name,
    networks: {}
  };

  var contract_types = lockfile.contract_types || {};
  var type = contract_types[contract_name];

  if (!type) return null;

  json.abi = type.abi;
  json.unlinked_binary = type.bytecode;

  Object.keys(lockfile.deployments || {}).forEach(function (blockchain) {
    var deployments = lockfile.deployments[blockchain];

    Object.keys(deployments).forEach(function (name) {
      var deployment = deployments[name];
      if (deployment.contract_type == contract_name) {
        json.networks[blockchain] = {
          events: {},
          links: {},
          address: deployment.address
        };
      }
    });
  });

  return json;
}

EPM.prototype.resolve = function (import_path, imported_from, callback) {
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

  return callback(null, body, import_path);
},

EPM.prototype.resolve_dependency_path = function (import_path, dependency_path) {
  var dirname = path.dirname(import_path);
  var resolved_dependency_path = path.join(dirname, dependency_path);

  resolved_dependency_path = resolved_dependency_path.replace(/\\/g, "/");

  return resolved_dependency_path;
};

module.exports = EPM;
