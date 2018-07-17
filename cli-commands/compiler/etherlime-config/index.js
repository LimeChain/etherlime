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
    network: network,
    networks: {},
    verboseRpc: false,
    gas: null,
    gasPrice: null,
    from: null,
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
    network: function () { },
    networks: function () { },
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
    contracts_build_directory: function () {
      return path.join(self.build_directory, "contracts");
    },
    migrations_directory: function () {
      return path.join(self.working_directory, "migrations");
    },
    test_directory: function () {
      return path.join(self.working_directory, "test");
    },
    test_file_extension_regexp: function () {
      return /.*\.(js|es|es6|jsx|sol)$/
    },
    example_project_directory: function () {
      return path.join(self.etherlime_directory, "example");
    },
    network_id: {
      get: function () {
        try {
          return self.network_config.network_id;
        } catch (e) {
          return null;
        }
      },
      set: function (val) {
        throw new Error("Do not set config.network_id. Instead, set config.networks and then config.networks[<network name>].network_id");
      }
    },
    network_config: {
      get: function () {
        var network = self.network;

        if (network == null) {
          throw new Error("Network not set. Cannot determine network to use.");
        }

        var conf = self.networks[network];

        if (conf == null) {
          config = {};
        }

        conf = _.extend({}, default_tx_values, conf);

        return conf;
      },
      set: function (val) {
        throw new Error("Don't set config.network_config. Instead, set config.networks with the desired values.");
      }
    },
    from: {
      get: function () {
        try {
          return self.network_config.from;
        } catch (e) {
          return default_tx_values.from;
        }
      },
      set: function (val) {
        throw new Error("Don't set config.from directly. Instead, set config.networks and then config.networks[<network name>].from")
      }
    },
    gas: {
      get: function () {
        try {
          return self.network_config.gas;
        } catch (e) {
          return default_tx_values.gas;
        }
      },
      set: function (val) {
        throw new Error("Don't set config.gas directly. Instead, set config.networks and then config.networks[<network name>].gas")
      }
    },
    gasPrice: {
      get: function () {
        try {
          return self.network_config.gasPrice;
        } catch (e) {
          return default_tx_values.gasPrice;
        }
      },
      set: function (val) {
        throw new Error("Don't set config.gasPrice directly. Instead, set config.networks and then config.networks[<network name>].gasPrice")
      }
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

Config.load = function (file, options) {
  var config = new Config();

  config.working_directory = path.dirname(path.resolve(file));

  delete require.cache[Module._resolveFilename(file, module)];
  var static_config = originalRequire(file);

  config.merge(static_config);
  config.merge(options);

  return config;
};

module.exports = Config;
