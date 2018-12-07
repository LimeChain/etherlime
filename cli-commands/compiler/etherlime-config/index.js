var _ = require("lodash");
var path = require("path");
var EtherlimeError = require("./../etherlime-error");
var Module = require('module');
var findUp = require("find-up");
var originalRequire = require("original-require");

function Config(etherlime_directory, working_directory, network) {
  var self = this;

  var default_tx_values = {
    gas: 6721975,
    gasPrice: 100000000000, // 100 Shannon,
    from: null
  };

  this._values = {
    etherlime_directory: etherlime_directory || path.resolve(path.join(__dirname, "../")),
    working_directory: working_directory || process.cwd(),
    verboseRpc: false,
    build: null,
    resolver: null,
    artifactor: null,
    solc: {
      optimizer: {
        enabled: false,
        runs: 200
      },
      evmVersion: "byzantium"
    },
    logger: {
      log: function () { },
    }
  };

  var props = {

    etherlime_directory: function () { },
    working_directory: function () { },
    verboseRpc: function () { },
    build: function () { },
    resolver: function () { },
    artifactor: function () { },
    solc: function () { },
    logger: function () { },

    build_directory: function () {
      return path.join(self.working_directory, "build");
    },
    contracts_directory: function () {
      return path.join(self.working_directory, "contracts");
    },
    test_directory: function () {
      return path.join(self.working_directory, "test");
    },
    test_file_extension_regexp: function () {
      return /.*\.(js|es|es6|jsx|sol)$/
    },
    example_project_directory: function () {
      return path.join(self.etherlime_directory, "example");
    }
  };

  Object.keys(props).forEach(function (prop) {
    self.addProp(prop, props[prop]);
  });
};

Config.prototype.addProp = function (key, obj) {
  Object.defineProperty(this, key, {
    get: obj.get || function () {
      return this._values[key] || obj();
    },
    set: obj.set || function (val) {
      this._values[key] = val;
    },
    configurable: true,
    enumerable: true
  });
};

Config.prototype.normalize = function (obj) {
  var clone = {};

  Object.keys(obj).forEach(function (key) {
    try {
      clone[key] = obj[key];
    } catch (e) {

    }
  });

  return clone;
}

Config.prototype.with = function (obj) {
  var normalized = this.normalize(obj);
  var current = this.normalize(this);

  return _.extend({}, current, normalized);
};

Config.prototype.merge = function (obj) {
  var self = this;
  var clone = this.normalize(obj);

  Object.keys(obj).forEach(function (key) {
    try {
      self[key] = clone[key];
    } catch (e) {
      
    }
  });

  return this;
};

Config.default = function () {
  return new Config();
};

// Config.load = function (file, options) {
//   var config = new Config();

//   config.working_directory = path.dirname(path.resolve(file));

//   delete require.cache[Module._resolveFilename(file, module)];
//   var static_config = originalRequire(file);

//   config.merge(static_config);
//   config.merge(options);

//   return config;
// };

module.exports = Config;
