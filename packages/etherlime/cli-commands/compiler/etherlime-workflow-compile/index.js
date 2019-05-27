const path = require("path");
const OS = require("os");
const fs = require('fs-extra');

const Config = require("./../etherlime-config");
const etherlimeCompile = require("./../etherlime-compile");
const expect = require("./../etherlime-expect");
const Resolver = require("./../etherlime-resolver");
const Artifactor = require("./../etherlime-artifactor");

const compile = async (options) => {
  return new Promise(async (resolve, reject) => {
    let config = configOptions(options);

    if (config.all === true || config.compileAll === true) {
      try {
        let result = await etherlimeCompile.all(config)
        await finish(result.returnVal, result.files, config)
        resolve()
      } catch (err) {
        reject(err)
      }
    } else {
      try {
        let result = await etherlimeCompile.necessary(config)
        await finish(result.returnVal, result.files, config)

        resolve()
      } catch (err) {
        return reject(err)
      }
    }
  })

}



const configOptions = (options) => {
  expect.options(options, [
    "contracts_build_directory"
  ]);

  expect.one(options, [
    "contracts_directory",
    "files"
  ]);

  let config = Config.default().merge(options);

  if (!config.resolver) {
    config.resolver = new Resolver(config);
  }

  if (!config.artifactor) {
    config.artifactor = new Artifactor(config.contracts_build_directory);
  }

  return config
}


const finish = async function (contracts, paths, config) {

  return new Promise(async (resolve, reject) => {
    if (contracts != null && Object.keys(contracts).length > 0) {
      await write_contracts(contracts, config);
      resolve()
    } else {
      resolve([], paths)
    }
  })
}

const write_contracts = async function (contracts, options) {
  let logger = options.logger || console;
  return new Promise(async (resolve, reject) => {
    try {
      fs.mkdirpSync(options.contracts_build_directory);

      if (options.quiet != true && options.quietWrite != true) {
        logger.log(`Writing artifacts to .${path.sep}${path.relative(options.working_directory, options.contracts_build_directory)}${OS.EOL}`);
      }

      let extra_opts = {
        network_id: options.network_id,
        exportAbi: options.exportAbi
      };

      await options.artifactor.saveAll(contracts, extra_opts);
      resolve(contracts);
    } catch (error) {
      reject(error);
    }
  })
}

module.exports = { compile, write_contracts };
