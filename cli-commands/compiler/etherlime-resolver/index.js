var EPMSource = require("./epm");
var NPMSource = require("./npm");
var FSSource = require("./fs");
var whilst = require("async.whilst");
var expect = require("./../etherlime-expect");

function Resolver(options) {
  expect.options(options, [
    "working_directory",
    "contracts_build_directory",
  ]);

  this.options = options;

  this.sources = [
    new EPMSource(options.working_directory, options.contracts_build_directory),
    new NPMSource(options.working_directory),
    new FSSource(options.working_directory, options.contracts_build_directory)
  ];
};


Resolver.prototype.resolve = function (import_path, imported_from, callback) {
  var self = this;

  if (typeof imported_from == "function") {
    callback = imported_from;
    imported_from = null;
  }

  var resolved_body = null;
  var resolved_path = null;
  var current_index = -1;
  var current_source;

  // TODO refactor with while
  whilst(function () {
    return !resolved_body && current_index < self.sources.length - 1;
  }, function (next) {
      current_index += 1;
      current_source = self.sources[current_index];

      current_source.resolve(import_path, imported_from, function (error, body, file_path) {
        if (!error && body) {
          resolved_body = body;
          resolved_path = file_path;
        }

        next(error);
      });
    }, function (error) {
      // if (error) {
      //   return callback(error);
      // }

      if (!resolved_body) {
        var message = `Could not find ${import_path} from any sources`;

        if (imported_from) {
          message += `; imported from ${imported_from}`;
        }

        return callback(new Error(message));
      }
     
      callback(null, resolved_body, resolved_path, current_source);
  })
};

module.exports = Resolver;
