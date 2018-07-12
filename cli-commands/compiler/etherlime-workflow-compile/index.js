var mkdirp = require("mkdirp");
var path = require("path");
var OS = require("os");

var Config = require("./../etherlime-config");
var compile = require("./../etherlime-compile");
var expect = require("./../etherlime-expect");
var Resolver = require("./../etherlime-resolver");
var Artifactor = require("./../etherlime-artifactor");

var Contracts = {

  compile: function (options, callback) {
    var self = this;

    expect.options(options, [
      "contracts_build_directory"
    ]);

    expect.one(options, [
      "contracts_directory",
      "files"
    ]);

    var config = Config.default().merge(options);

    if (!config.resolver) {
      config.resolver = new Resolver(config);
    }

    if (!config.artifactor) {
      config.artifactor = new Artifactor(config.contracts_build_directory);
    }

    function finished(err, contracts, paths) {
      if (err) return callback(err);

      if (contracts != null && Object.keys(contracts).length > 0) {
        self.write_contracts(contracts, config, function (err, abstractions) {
          callback(err, abstractions, paths);
        });
      } else {
        callback(null, [], paths);
      }
    };

    if (config.all === true || config.compileAll === true) {
      compile.all(config, finished);

    } else {
      compile.necessary(config, finished);
    }
  },

  write_contracts: function (contracts, options, callback) {
    var logger = options.logger || console;

    mkdirp(options.contracts_build_directory, function (err, result) {
      if (err != null) {
        callback(err);

        return;
      }

      if (options.quiet != true && options.quietWrite != true) {
        logger.log("Writing artifacts to ." + path.sep + path.relative(options.working_directory, options.contracts_build_directory) + OS.EOL);
      }

      var extra_opts = {
        network_id: options.network_id
      };

      options.artifactor.saveAll(contracts, extra_opts).then(function () {
        callback(null, contracts);
      }).catch(callback);
    });
  }
};

module.exports = Contracts;
