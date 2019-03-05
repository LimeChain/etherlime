const dir = require("node-dir");
const path = require("path");
const fs = require("fs");

let find_contracts = async (workingPath) => {
  return new Promise((resolve, reject) => {
    let isFile = workingPath.includes('.sol');
    if (!isFile) {
      dir.files(workingPath, function (err, files) {
        if (err) {
          return reject(err);
        }
        files = files.filter(function (file) {
          return path.extname(file) == ".sol" && path.basename(file)[0] != ".";
        });
        return resolve(files);
      })
    } else {
      return resolve([workingPath]);
    }

  });
}

module.exports = find_contracts

