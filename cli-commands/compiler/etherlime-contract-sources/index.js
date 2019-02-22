var dir = require("node-dir");
var path = require("path");

let find_contracts = async (directory) => {
  return new Promise((accept, reject) => {
    dir.files(directory, function (err, files) {
      if (err) {
        return reject(err);
      }
      files = files.filter(function (file) {
        return path.extname(file) == ".sol" && path.basename(file)[0] != ".";
      });
      return accept(files);
    })
  });
}

module.exports = find_contracts

