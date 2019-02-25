const EPMSource = require("./epm");
const NPMSource = require("./npm");
const FSSource = require("./fs");
const whilst = require("async.whilst");
const expect = require("./../etherlime-expect");


// class Resolver {

//   constructor(options) {
//     expect.options(options, [
//       "working_directory",
//       "contracts_build_directory",
//     ]);

//     this.options = options;

//     this.sources = [
//       new EPMSource(options.working_directory, options.contracts_build_directory),
//       new NPMSource(options.working_directory),
//       new FSSource(options.working_directory, options.contracts_build_directory)
//     ];
//   }


//   resolve (import_path, imported_from, callback) {
//     var self = this;

//     if (typeof imported_from == "function") {
//       callback = imported_from;
//       imported_from = null;
//     }

//     var resolved_body = null;
//     var resolved_path = null;
//     var current_index = -1;
//     var current_source;

//     // TODO refactor with while
//     whilst(function () {
//       return !resolved_body && current_index < self.sources.length - 1;
//     }, function (next) {
//         current_index += 1;
//         current_source = self.sources[current_index];

//         current_source.resolve(import_path, imported_from, function (error, body, file_path) {
//           if (!error && body) {
//             resolved_body = body;
//             resolved_path = file_path;
//           }

//           next(error);
//         });
//       }, function (error) {
//         // if (error) {
//         //   return callback(error);
//         // }

//         if (!resolved_body) {
//           var message = `Could not find ${import_path} from any sources`;

//           if (imported_from) {
//             message += `; imported from ${imported_from}`;
//           }

//           return callback(new Error(message));
//         }

//         callback(null, resolved_body, resolved_path, current_source);
//     })
//   }


// }

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


  // if (typeof imported_from == "function") {
  //   callback = imported_from;
  //   imported_from = null;
  // }

  var resolved_body = null;
  var resolved_path = null;
  var current_index = -1;
  var current_source;

  // TODO refactor with while
  // whilst(function () {
  //   return !resolved_body && current_index < self.sources.length - 1;
  // }, function (next) {
  //   console.log('here1')
  //   current_index += 1;
  //   current_source = self.sources[current_index];

  //   current_source.resolve(import_path, imported_from, function (error, body, file_path) {
  //     if (!error && body) {
  //       resolved_body = body;
  //       resolved_path = file_path;
  //     }
  //     next(error);
  //   });
  // }, function (error) {
  //   // if (error) {
  //   //   return callback(error);
  //   // }
  //   console.log('here')
  //   if (!resolved_body) {
  //     var message = `Could not find ${import_path} from any sources`;

  //     if (imported_from) {
  //       message += `; imported from ${imported_from}`;
  //     }

  //     return callback(new Error(message));
  //   }

  //   callback(null, resolved_body, resolved_path, current_source);
  // })
  return new Promise((resolve, reject) => {
    var self = this;
    while (!resolved_body && current_index < self.sources.length - 1) {
      try {
        current_index += 1;
        current_source = self.sources[current_index];


        current_source.resolve(import_path, imported_from, function (error, body, file_path) {


          if (!error && body) {
            resolved_body = body;
            resolved_path = file_path;
            return resolve({ resolved_body, resolved_path, current_source })
          }
        });
      } catch (error) {

        if (error) {
          return reject(error);
        }
      }
    }
    // if (!resolved_body) {


    //   var message = `Could not find ${import_path} from any sources`;

    //   if (imported_from) {
    //     message += `; imported from ${imported_from}`;
    //   }

    //   return reject(new Error(message));
    // }

  });


  // while(!resolved_body && current_index < self.sources.length - 1) {

  // }
};

module.exports = Resolver;
