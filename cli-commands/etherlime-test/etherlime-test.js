var Mocha = require("mocha");
var chai = require("chai");
var originalRequire = require("original-require");

let accounts = require('./../ganache/setup.json').accounts;
let compiler = require('./../compiler/compiler');
let ethers = require('ethers');

chai.use(require("./assertions"));

const run = async (files, runCompilation) => {
  var mochaConfig = {'useColors': true};
  let mocha = createMocha(mochaConfig, files);

  files.forEach(function (file) {
    delete originalRequire.cache[file];

    mocha.addFile(file);
  });
  
  setJSTestGlobals();

  if (runCompilation) {
    await compiler.run('.');
  }

  await runMocha(mocha);
}

const createMocha = (config, files) => {
  var mocha = new Mocha(config);

  files.forEach(file => {
		mocha.addFile(file);
  });
  
  return mocha;
}

const runMocha = (mocha) => {
	mocha.run(failures => {
		process.exitCode = failures ? -1 : 0;
	});
}

const setJSTestGlobals = async () => {
  global.ethers = ethers;
  global.assert = chai.assert;
  global.expect = chai.expect;
  global.accounts = accounts;
}

module.exports = {
  run
}
