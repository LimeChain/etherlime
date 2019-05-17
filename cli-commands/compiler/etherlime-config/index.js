const _ = require("lodash");
const path = require("path");


/**
	 *
	 * @param {*} etherlime_directory path to compiler directory
	 * @param {*} working_directory current working directory 
	 */

class Config {

  constructor(etherlime_directory, working_directory) {
    const self = this;

    let default_tx_values = {
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
      },
      logger: {
        log: function () { },
      }
    };


    this.props = {

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
      }
    };

    Object.keys(self.props).forEach(function (prop) {
      self.addProp(prop, self.props[prop]);
    });
  }


  addProp(key, obj) {
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


  normalize(obj) {
    let clone = {};

    Object.keys(obj).forEach(function (key) {
      try {
        clone[key] = obj[key];
      } catch (e) {

      }
    });

    return clone;
  }


  with(obj) {
    let normalized = this.normalize(obj);
    let current = this.normalize(this);

    return _.extend({}, current, normalized);
  };


  merge(obj) {
    let self = this;
    let clone = this.normalize(obj);

    Object.keys(obj).forEach(function (key) {
      try {
        self[key] = clone[key];
      } catch (e) {

      }
    });

    return this;
  };

}

Config.default = function () {
  return new Config();
};


module.exports = Config;
