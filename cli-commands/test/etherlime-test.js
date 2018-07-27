var Mocha = require("mocha");
var chai = require("chai");
var path = require("path");
var Config = require("truffle-config");
var expect = require("truffle-expect");
var originalRequire = require("original-require");

let accounts = require('./accounts.json');
let compiler = require('./../compiler/compiler');

chai.use(require("./assertions"));

var Test = {
  run: async (options) => {
    expect.options(options, [
      "contracts_directory",
      "contracts_build_directory",
      "test_files"
    ]);

    var config = Config.default().merge(options);

    config.test_files = config.test_files.map(function (test_file) {
      return path.resolve(test_file);
    });

    var mocha = this.createMocha();

    var js_tests = config.test_files.filter(function (file) {
      return path.extname(file) != ".sol";
    });

    js_tests.forEach(function (file) {
      delete originalRequire.cache[file];

      mocha.addFile(file);
    });

    var runner;
    var test_resolver;

    await compileContracts();

    this.setJSTestGlobals(web3, accounts, test_resolver, runner);

    mocha.run();
  },

  createMocha: () => {
    var mochaConfig = {};
    mochaConfig.useColors = true;

    return new Mocha(mochaConfig);
  },

  compileContracts: async () => {
    await compiler.run('.');
  },

  // setJSTestGlobals: function (web3, accounts, test_resolver, runner) {
  //   return new Promise(function (accept, reject) {
  //     global.web3 = web3;
  //     global.assert = chai.assert;
  //     global.expect = chai.expect;
  //     global.artifacts = {
  //       require: function (import_path) {
  //         return test_resolver.require(import_path);
  //       }
  //     };

  //     var template = function (tests) {
  //       this.timeout(runner.TEST_TIMEOUT);

  //       before("prepare suite", function (done) {
  //         this.timeout(runner.BEFORE_TIMEOUT);
  //         runner.initialize(done);
  //       });

  //       beforeEach("before test", function (done) {
  //         runner.startTest(this, done);
  //       });

  //       afterEach("after test", function (done) {
  //         runner.endTest(this, done);
  //       });

  //       tests(accounts);
  //     }

  //     global.contract = function (name, tests) {
  //       Mocha.describe("Contract: " + name, function () { template.bind(this, tests)() });
  //     };

  //     global.contract.only = function (name, tests) {
  //       Mocha.describe.only("Contract: " + name, function () { template.bind(this, tests)() });
  //     }

  //     global.contract.skip = function (name, tests) {
  //       Mocha.describe.skip("Contract: " + name, function () { template.bind(this, tests)() });
  //     }

  //     accept();
  //   });
  // }
};

module.exports = Test;
