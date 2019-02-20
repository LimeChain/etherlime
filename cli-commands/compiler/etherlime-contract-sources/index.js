var dir = require("node-dir");
var path = require("path");

// module.exports = function (directory, callback) {
//   dir.files(directory, function (err, files) {
//     if (err) return callback(err);

//     files = files.filter(function (file) {
//       return path.extname(file) == ".sol" && path.basename(file)[0] != ".";
//     });

//     callback(null, files);
//   })
// };
let find_contracts = async (directory) => {
  return new Promise((accept, reject) => {
    dir.files(directory, function (err, files) {
      if (err) {
        console.log(err)
        reject(err);
      }
      files = files.filter(function (file) {
        return path.extname(file) == ".sol" && path.basename(file)[0] != ".";
      });
      accept(files);
    })
  });
}

module.exports = find_contracts

