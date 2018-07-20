var dir = require("node-dir");
var path = require("path");

module.exports = function (directory, callback) {
  dir.files(directory, function (err, files) {
    if (err) return callback(err);

    files = files.filter(function (file) {
      return path.extname(file) == ".sol" && path.basename(file)[0] != ".";
    });

    callback(null, files);
  })
};
