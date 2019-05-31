(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("Etherlime-cli", [], factory);
	else if(typeof exports === 'object')
		exports["Etherlime-cli"] = factory();
	else
		root["Etherlime-cli"] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 52);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./circuit-compile": 30,
	"./circuit-compile.js": 30,
	"./generate-call": 32,
	"./generate-call.js": 32,
	"./generate-proof": 33,
	"./generate-proof.js": 33,
	"./generate-verify": 34,
	"./generate-verify.js": 34,
	"./trusted-setup": 31,
	"./trusted-setup.js": 31,
	"./verify-proof": 35,
	"./verify-proof.js": 35
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number or string
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 2;

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("etherlime-utils");

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("etherlime-logger");

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("ethers");

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = require("child_process");

/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = require("fs-extra");

/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = require("util");

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

const fs = __webpack_require__(1);
const compiler = __webpack_require__(59);
const Resolver = __webpack_require__(15);
const colors = __webpack_require__(3).colors;
const CompilerSupplier = __webpack_require__(14);
const supplier = new CompilerSupplier();
const logger = __webpack_require__(4).logger;
const deleteFolderRecursive = __webpack_require__(3).deleteFolderRecursive;

const run = async (defaultPath, runs, solcVersion, useDocker, list, all, quite, contractsBuildDirectory, contractsWorkingDirectory, deleteCompiledFiles, exportAbi) => {
	if (list !== undefined) {
		await listVersions(supplier, list, all);

		return;
	}

	defaultPath = `${process.cwd()}/${defaultPath}`;

	return performCompilation(defaultPath, runs, solcVersion, useDocker, quite, contractsBuildDirectory, contractsWorkingDirectory, deleteCompiledFiles, exportAbi);
};

const performCompilation = async (defaultPath, runs, solcVersion, useDocker, quiet, contractsBuildDirectory, contractsWorkingDirectory, deleteCompiledFiles, exportAbi) => {
	if (useDocker && !solcVersion) {
		throw new Error('In order to use the docker, please set an image name: --solcVersion=<image-name>');
	}

	let compilerSolcOptions = {
		solc: {
			version: solcVersion,
			docker: useDocker
		}
	};

	let resolverOptions = {
		"working_directory": contractsWorkingDirectory || `${defaultPath}/contracts`,
		"contracts_build_directory": contractsBuildDirectory || `${defaultPath}/build`,
		"compilers": compilerSolcOptions,
		"quiet": quiet
	};

	new Resolver(resolverOptions);

	let compileOptions = {
		"contracts_directory": contractsWorkingDirectory || `${defaultPath}/contracts`,
		"contracts_build_directory": contractsBuildDirectory || `${defaultPath}/build`,
		"compilers": compilerSolcOptions,
		"quiet": quiet
	};

	compileOptions.exportAbi = exportAbi;

	if (runs) {
		compileOptions.solc = {
			optimizer: {
				enabled: true,
				runs: runs
			}
		}
	}

	if (!deleteCompiledFiles) {
		return await compilePromise(compileOptions, quiet);
	}

	if (!fs.existsSync(compileOptions.contracts_build_directory)) {
		return await compilePromise(compileOptions, quiet)
	}

	await deleteFolderRecursive(compileOptions.contracts_build_directory);

	return await compilePromise(compileOptions, quiet)

};

const compilePromise = async (compileOptions, quiet) => {

	return new Promise(async (resolve, reject) => {
		try {
			await compiler.compile(compileOptions);
			if (!quiet) {
				logger.log(colors.colorSuccess('Compilation finished successfully'));
			}

			resolve();
		}
		catch (error) {
			let stack = error['stack'].split(',/');

			stack.forEach(message => {
				logger.log(message);
			});

			return reject(stack);
		}
	});
};

const listVersions = async (supplier, list, all) => {
	if (list === '') {
		logger.log(help());

		return;
	}

	if (list === 'docker') {
		let tags = await supplier.getDockerTags();
		tags.push('See more at: hub.docker.com/r/ethereum/solc/tags/');

		logger.log(JSON.stringify(tags, null, ' '));

		return;
	}

	let releases = await supplier.getReleases();
	const replacer = all ? null : shortener;
	const versionsList = JSON.stringify(releases[list], replacer, ' ');

	logger.log(versionsList);
};

const shortener = (key, value) => {
	const defaultLength = 10;

	if (Array.isArray(value) && value.length > defaultLength) {
		const length = value.length;
		const remaining = length - defaultLength;
		const more = `.. and ${remaining} more. Use \`--all\` to see full list.`;
		value.length = defaultLength;
		value.push(more);
	}

	return value;
}

const help = () => {
	return "\n" +
		"See available solc versions. (Default: solcjs stable releases)\n\n" +

		"USAGE:\n" +
		"   --list [option] [--all]\n\n" +

		"OPTIONS:\n" +
		" `docker`         recently published docker tags\n" +
		" `releases`       solcjs stable releases\n" +
		" `prereleases`    solcjs nightly builds\n" +
		" `latestRelease`  solcjs latest\n\n";
}

module.exports = {
	run
}

/***/ }),
/* 10 */
/***/ (function(module, exports) {


let options = (options, expected_keys) => {
    expected_keys.forEach((key) => {
        if (options[key] == null) {
            throw new Error(`Expected parameter "${key}" not passed to function.`);
        }
    });
}

let one = (options, expected_keys) => {
    let found = [];

    expected_keys.forEach((key) => {
        if (options[key] != null) {
            found.push(1);
        } else {
            found.push(0);
        }
    });

    let total = found.reduce((t, value) => {
        return t + value;
    });

    if (total >= 1) return;

    throw new Error(`Expected one of the following parameters, but found none: ${expected_keys.join(", ")}`);
}

module.exports = {
    options,
    one
};


/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = require("original-require");

/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = require("snarkjs");

/***/ }),
/* 13 */
/***/ (function(module, exports) {

module.exports = require("os");

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

const fs = __webpack_require__(1);
const child = __webpack_require__(6);
const axios = __webpack_require__(43);
const axiosInstance = axios.create();
const requireFromString = __webpack_require__(66);
const findCacheDir = __webpack_require__(67);
const originalRequire = __webpack_require__(11);
const solcWrap = __webpack_require__(68);

class CompilerSupplier {
    /**
	 * @param {*} _config configuration options for compilation
	 */
    constructor(_config) {
        _config = _config || {};
        this.config = {
            version: null,
            versionsUrl: 'https://relay.trufflesuite.com/solc/bin/list.json',
            compilerUrlRoot: 'https://relay.trufflesuite.com/solc/bin/',
            dockerTagsUrl: 'https://registry.hub.docker.com/v2/repositories/ethereum/solc/tags/',
            cache: false,
        }
        this.config = Object.assign(this.config, _config);

        this.cachePath = findCacheDir({
            name: 'etherlime',
            cwd: __dirname,
            create: true,
        });
    }


    /**
     * Load solcjs from four possible locations:
     * - local node_modules            (config.version = <undefined>)
     * - absolute path to a local solc (config.version = <path>)
     *
     * OR specify that solc.compile should wrap:
     * - dockerized solc               (config.version = "<image-name>" && config.docker: true)
     */
    load() {
        const self = this;
        const version = self.config.version;

        // We get local solc path
        const nodeModulesSolc = getLocalSolcPath();


        return new Promise((accept, reject) => {
            const useDocker = self.config.docker;
            const useDefaultEtherlime = !version; // Checking for version number
            const useDefaultNodeModules = useDefaultEtherlime && self.isLocal(nodeModulesSolc); // Checking for version number
            const useLocal = !useDefaultEtherlime && self.isLocal(version); // We're checking if the version is set as path and then we're checking the path
            const useRemote = !useLocal;

            if (useDocker) return accept(self.getBuilt("docker"));
            if (useLocal) return accept(self.getLocal(version));
            if (useDefaultNodeModules) return accept(self.getLocal(nodeModulesSolc));
            if (useDefaultEtherlime) return accept(self.getDefaultEtherlime());
            if (useRemote) return accept(self.getByUrl(version));
        });
    }


    getReleases() {
        return this
            .getVersions()
            .then(list => {

                const prereleases = list
                    .builds
                    .filter(build => build['prerelease'])
                    .map(build => build['longVersion']);

                const releases = Object.keys(list.releases);

                return {
                    prereleases: prereleases,
                    releases: releases,
                    latestRelease: list.latestRelease,
                }
            });
    }

    getDockerTags() {
        const self = this;
        return axiosInstance.get(self.config.dockerTagsUrl)
            .then(response =>
                response.data
                    .results
                    .map(item => item.name)
            )
            .catch(err => { throw self.errors('noRequest', url, err) });
    }

    // Methods
    getDefaultEtherlime() {
        const compiler = __webpack_require__(69);
        this.removeListener();

        return compiler;
    }


    /**
	 * @param {*} localPath local path to node_modules/solc
	 */
    getLocal(localPath) {
        const self = this;
        let compiler;

        try {
            compiler = originalRequire(localPath)
            self.removeListener();
        } catch (err) {
            throw self.errors('noPath', localPath);
        }

        return compiler;
    }

    getVersions() {
        const self = this;
        return axiosInstance.get(self.config.versionsUrl)
            .then(response => {
                return response.data
            }
            )
            .catch(err => { throw self.errors('noRequest', self.config.versionsUrl, err) });
    }


    /**
    * @param {*} version of solj version
    * @param {*} allVersions object containing all versions of solj
    */
    getVersionUrlSegment(version, allVersions) {
        if (allVersions.releases[version]) return allVersions.releases[version];

        const isPrerelease = version.includes('nightly') || version.includes('commit');

        if (isPrerelease) {
            for (let build of allVersions.builds) {
                const exists = build['prerelease'] === version ||
                    build['build'] === version ||
                    build['longVersion'] === version;

                if (exists) return build['path'];
            }
        }

        return null;
    }

    /**
    * @param {*} version of solj version
    */
    getByUrl(version) {
        const self = this;

        return self
            .getVersions(self.config.versionsUrl)
            .then(allVersions => {
                const file = self.getVersionUrlSegment(version, allVersions);

                if (!file) throw self.errors('noVersion', version);

                if (self.isCached(file)) return self.getFromCache(file);

                const url = self.config.compilerUrlRoot + file;
                return axiosInstance
                    .get(url)
                    .then(response => {
                        self.addToCache(response.data, file);
                        return self.compilerFromString(response.data);
                    })
                    .catch(err => { throw self.errors('noRequest', url, err) });
            });
    }

    /**
    * @param {*} buildType of solc, e.g -> nightly-alpine-0.5.3-8825533222519c051693d1fb4bcaba6ea0cde2
    */
    getBuilt(buildType) {
        let versionString;
        let command;

        switch (buildType) {
            case "docker":
                versionString = this.validateDocker();
                command = 'docker run -i ethereum/solc:' + this.config.version + ' --standard-json';
                break;
        }

        const commit = this.getCommitFromVersion(versionString);

        return this
            .getByUrl(commit)
            .then(solcjs => {
                return {
                    compile: (options) => String(child.execSync(command, { input: options })),
                    version: () => versionString,
                    importsParser: solcjs,
                }
            });
    }


    // Utils 
    /**
	 * @param {*} localPath - local path to node_modules/solc
	 */
    isLocal(localPath) {

        return fs.existsSync(localPath);
    }

    validateDocker() {
        const image = this.config.version;
        const fileName = image + '.version';

        // Skip validation if they've validated for this image before.
        if (this.isCached(fileName)) {
            const cachePath = this.resolveCache(fileName);
            return fs.readFileSync(cachePath, 'utf-8');
        }

        // Image specified
        if (!image) throw this.errors('noString', image);

        // Docker exists locally
        try {
            child.execSync('docker -v');
        } catch (err) {
            throw this.errors('noDocker');
        }

        // Image exists locally
        try {
            child.execSync('docker inspect --type=image ethereum/solc:' + image);
        } catch (err) {
            throw this.errors('noImage', image);
        }

        // Get version & cache.
        const version = child.execSync('docker run ethereum/solc:' + image + ' --version');
        const normalized = this.normalizeVersion(version);
        this.addToCache(normalized, fileName);

        return normalized;
    }

    /**
	 * @param {*} versionString - object containing version parameters: e.g: 
     *      "path": "soljson-v0.1.1+commit.6ff4cd6.js",
            "version": "0.1.1",
            "build": "commit.6ff4cd6",
            "longVersion": "0.1.1+commit.6ff4cd6",
            "keccak256": "0xd8b8c64f4e9de41e6604e6ac30274eff5b80f831f8534f0ad85ec0aff466bb25",
            "urls": [
              "bzzr://8f3c028825a1b72645f46920b67dca9432a87fc37a8940a2b2ce1dd6ddc2e29b"
	 */
    getCommitFromVersion(versionString) {
        return 'commit.' + versionString.match(/commit\.(.*?)\./)[1]
    }

    /**
	 * @param {*} version - type and version of your operating system
	 */
    normalizeVersion(version) {
        version = String(version);
        return version.split(':')[1].trim();
    }

    /**
	 * @param {*} fileName - name of soljson file, e.g: soljson-v0.4.21+commit.dfe3193c.js
	 */
    resolveCache(fileName) {
        const thunk = findCacheDir({ name: 'etherlime', cwd: __dirname, thunk: true });

        return thunk(fileName);
    }

    /**
    * @param {*} fileName - name of soljson file, e.g: soljson-v0.4.21+commit.dfe3193c.js
    */
    isCached(fileName) {
        const file = this.resolveCache(fileName);
        return fs.existsSync(file);
    }

    /**
    * @param {*} fileName - name of soljson file, e.g: soljson-v0.4.21+commit.dfe3193c.js
    * @param {*} code - code of soljson file
    */
    addToCache(code, fileName) {
        if (!this.config.cache) return;
        const filePath = this.resolveCache(fileName);
        fs.writeFileSync(filePath, code);
    }

    /**
    * @param {*} fileName - name of soljson file, e.g: soljson-v0.4.21+commit.dfe3193c.js
    */
    getFromCache(fileName) {
        const filePath = this.resolveCache(fileName);
        const soljson = originalRequire(filePath);
        const wrapped = solcWrap(soljson);
        this.removeListener();

        return wrapped;
    }

    /**
    * @param {*} code - code of soljson file
    */
    compilerFromString(code) {
        const soljson = requireFromString(code);
        const wrapped = solcWrap(soljson);
        this.removeListener();

        return wrapped;
    }

    removeListener() {
        const listeners = process.listeners("uncaughtException");
        const exceptionHandler = listeners[listeners.length - 1];

        if (exceptionHandler) {
            process.removeListener("uncaughtException", exceptionHandler);
        }
    }

    errors(kind, input, err) {
        const info = 'Run `etherlime compile --list` to see available versions.'

        const kinds = {

            noPath: "Could not find compiler at: " + input,
            noVersion: "Could not find compiler version:\n" + input + ".\n" + info,
            noRequest: "Failed to complete request to: " + input + ".\n\n" + err,
            noDocker: "You are trying to run dockerized solc, but docker is not installed.",
            noImage: "Please pull " + input + " from docker before trying to compile with it.",
            noNative: "Could not execute local solc binary: " + err,

            // Lists
            noString: "`compilers.solc.version` option must be a string specifying:\n" +
                "   - a path to a locally installed solcjs\n" +
                "   - a solc version (ex: '0.4.22')\n" +
                "   - a docker image name (ex: 'stable')\n" +
                "Received: " + input + " instead.",
        }

        return new Error(kinds[kind]);
    }


}


getLocalSolcPath = () => {
    return `${process.cwd()}/node_modules/solc`;
}

module.exports = CompilerSupplier;

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

const EPMSource = __webpack_require__(70);
const NPMSource = __webpack_require__(71);
const FSSource = __webpack_require__(72);
const expect = __webpack_require__(10);

class Resolver {
  constructor(options) {
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
  }

  resolve(import_path, imported_from) {
    let resolved_body = null;
    let resolved_path = null;
    let current_index = -1;
    let current_source;

    return new Promise(async (resolve, reject) => {
      let self = this;
      while (!resolved_body && current_index < self.sources.length - 1) {
        current_index += 1;
        current_source = self.sources[current_index];


        let result = await current_source.resolve(import_path, imported_from)

        if (result.body) {
          resolved_body = result.body;
          resolved_path = result.import_path;
          return resolve({ resolved_body, resolved_path, current_source })
        }
      }

      let message = `Could not find ${import_path} from any sources`;

      if (imported_from) {
        message += `; imported from ${imported_from}`;
      }

      return reject(new Error(message));

    });
  }
}

module.exports = Resolver;


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

let mineBlock = __webpack_require__(27).mineBlock;
let firstTimeRequestedTime = true;
async function latestTimestamp(provider) {
    // this is done as a workaround for a bug when first requested block get return wrong timestamp
    if (firstTimeRequestedTime) {
        await mineBlock(provider);
        firstTimeRequestedTime = false;
    }
    let latestBlock = await provider.getBlock(await provider.getBlockNumber());
    return latestBlock.timestamp;
}

const timeTravel = async (provider, seconds) => {
	await provider.send('evm_increaseTime', seconds);
	await provider.send('evm_mine');
}

const setTimeTo = async (provider, timestamp) => {
    const ct = await latestTimestamp(provider);
    if (ct > timestamp) {
        throw new Error(`cannot decrease time to ${timestamp} from ${ct}`);
    }
    let differenceInSeconds = timestamp - ct;
    return timeTravel(provider , differenceInSeconds);
}

module.exports = {
    timeTravel,
    setTimeTo,
    latestTimestamp
}

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

let expect = __webpack_require__(26).expect;
const hasEvent = (receipt, contract, eventName) => {
    expect(receipt).to.have.property("logs");
    expect(contract.interface.events).to.have.property(eventName);
    return receipt.logs.find(e => {
        return e.topics.find(t => {
            return contract.interface.events[eventName].topic == t;
        }) !== undefined;
    }) !== undefined;
}

const parseLogs = (receipt, contract, eventName) => {
    expect(receipt).to.have.property("logs");
    expect(contract.interface.events).to.have.property(eventName);
    const filter = receipt.logs.filter(e => {
        return e.topics.find(t => {
            return contract.interface.events[eventName].topic == t;
        }) !== undefined;
    });

    const res = []
    for (let f of filter) {
        res.push(contract.interface.events[eventName].decode(f.data, f.topics));
    }

    return res
}


module.exports = {
    hasEvent,
    parseLogs
}

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

const mocha = __webpack_require__(25);
const Base = mocha.reporters.Base;
const color = Base.color;
const GasLogger = __webpack_require__(28);
const inherits = __webpack_require__(8).inherits;

function CustomReporter(runner, options) {
	Base.call(this, runner);
	const self = this;
	let port = options.reporterOptions.port;
	let indents = 0;
	let n = 0;
	let failed = false;
	let gasLogger = new GasLogger(port);
	const indent = () => Array(indents).join('  ');

	runner.on('start', () => {

	});

	runner.on('suite', suite => {
		++indents;
		console.log(color('suite', '%s%s'), indent(), suite.title)
	});

	runner.on('suite end', () => {
		--indents;
	});

	runner.on('pending', test => {
		let fmt = indent() + color('pending', '  - %s');
		console.log(fmt, test.title)
	});

	runner.on('test', async () => {
	});

	runner.on('hook end', async () => {
		gasLogger.startNewLogForTest();
	});

	runner.on('pass', async test => {
		let fmt;
		let fmtArgs;
		let gasUsedString;
		let timeSpentString = color(test.speed, '%dms');
		let consumptionString;
		let gasUsed = await gasLogger.getGasUsedForCurrentTest();
		if (gasUsed) {
			gasUsedString = color('checkmark', '%d gas');

			consumptionString = ' (' + timeSpentString + ', ' + gasUsedString + ')';
			fmtArgs = [test.title, test.duration, gasUsed]
		
			fmt = indent() +
				color('checkmark', '  ' + Base.symbols.ok) +
				color('pass', ' %s') +
				consumptionString
		} else {
		
			consumptionString = ' (' + timeSpentString + ')';
			fmtArgs = [test.title, test.duration]
			
			fmt = indent() +
				color('checkmark', '  ' + Base.symbols.ok) +
				color('pass', ' %s') +
				consumptionString
		}
		console.log.apply(null, [fmt, ...fmtArgs])
	});

	runner.on('fail',async test => {
		failed = true;
		let consumptionString = "";
		let gasUsed = await gasLogger.getGasUsedForCurrentTest();
		if (gasUsed) {
			consumptionString = ' (' + gasUsed + ' gas)';
		}
		let fmt = indent() + color('fail', '  %d) %s');
		console.log();
		console.log(fmt, ++n, test.title + consumptionString)
	});

	runner.on('end', () => {
		indents = 2;
		//Note(Nikolay): We need this Hack to display properly the last test indents and put in the proper Suite.
		//              This is cause because we now use Async tests to measure the Gas and the reporter will wait
		//              on the Transaction completion to calculate the Gas before showing information.
		// Maybe you can figure a better way to do this ?
		setTimeout(() => {
			console.log();
			console.log(indent() + color('bright yellow', ' %s'), `Total Gas Used: ${gasLogger.getTotalGasUsed()}`);
			console.log();
			self.epilogue();
		}, 1000);
	});
}

inherits(CustomReporter, Base);

module.exports = CustomReporter;


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

var ethers = __webpack_require__(5);

module.exports = function (chai, utils) {
  var assert = chai.assert;
  chai.Assertion.addProperty('address', function () {
    this.assert(this._obj.length === 42, 'expected #{this} to be a 42 character address (0x...)', 'expected #{this} to not be a 42 character address (0x...)');
    
    var number = ethers.utils.bigNumberify(this._obj);
    this.assert(number.eq(0) === false, 'expected address #{this} to not be zero', 'you shouldn\'t ever see this.');
  });
  assert.isAddress = function (val, exp, msg) {
    return new chai.Assertion(val, msg).to.be.address;
  };

  assert.revert = async (promise, msg) => {
    try {
      let result = await promise;
      console.log(result);
    } catch (error) {
      const invalidJump = error.message.search('invalid JUMP') >= 0
      const invalidOpcode = error.message.search('invalid opcode') >= 0
      const outOfGas = error.message.search('out of gas') >= 0
      const revert = error.message.search('revert') >= 0
      assert(invalidJump || invalidOpcode || outOfGas || revert, msg ? `Expected throw, got ${error.message} instead. ${msg}` : `Expected throw, got ${error.message} instead`)
      return
    }
    assert.fail(msg ? msg : 'Expected throw not received')
  }
};


/***/ }),
/* 20 */
/***/ (function(module, exports) {

module.exports = {"accounts":[{"secretKey":"0x7ab741b57e8d94dd7e1a29055646bafde7010f38a900f55bbd7647880faa6ee8","balance":"0x90000000000000000000000000000000"},{"secretKey":"0x2030b463177db2da82908ef90fa55ddfcef56e8183caf60db464bc398e736e6f","balance":"0x90000000000000000000000000000000"},{"secretKey":"0x62ecd49c4ccb41a70ad46532aed63cf815de15864bc415c87d507afd6a5e8da2","balance":"0x90000000000000000000000000000000"},{"secretKey":"0xf473040b1a83739a9c7cc1f5719fab0f5bf178f83314d98557c58aae1910e03a","balance":"0x90000000000000000000000000000000"},{"secretKey":"0x823d590ed2cb5e8493bb0efc834771c1cde36f9fc49b9fe3620ebd0754ad6ea2","balance":"0x90000000000000000000000000000000"},{"secretKey":"0xd6d710943471e4c37ceb787857e7a2b41ca57f9cb4307ee9a9b21436a8e709c3","balance":"0x90000000000000000000000000000000"},{"secretKey":"0x187bb12e927c1652377405f81d93ce948a593f7d66cfba383ee761858b05921a","balance":"0x90000000000000000000000000000000"},{"secretKey":"0xf41486fdb04505e7966c8720a353ed92ce0d6830f8a5e915fbde735106a06d25","balance":"0x90000000000000000000000000000000"},{"secretKey":"0x6ca40ba4cca775643398385022264c0c414da1abd21d08d9e7136796a520a543","balance":"0x90000000000000000000000000000000"},{"secretKey":"0xfac0bc9325ad342033afe956e83f0bf8f1e863c1c3e956bc75d66961fe4cd186","balance":"0x90000000000000000000000000000000"}],"defaultPort":8545,"forkParams":null,"gasPrice":"0x77359400","gasLimit":"0x6691b7"}

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

const _ = __webpack_require__(38);
const path = __webpack_require__(0);


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


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

const path = __webpack_require__(0);
const fs = __webpack_require__(1);
const VYPER_EXTENSION = __webpack_require__(42).VYPER_EXTENSION;
const SOL_EXTENSION = '.sol';


let find_contracts = async (workingPath) => {
  return new Promise(async (resolve, reject) => {

    if (workingPath.includes(VYPER_EXTENSION)) {
      return resolve({ solFiles: [], vyperFiles: [workingPath] })
    }

    if (workingPath.includes(SOL_EXTENSION)) {
      if (!fs.existsSync(workingPath)) {
        return reject(new Error(`File '${process.cwd()}/${workingPath}' does not exist!`))
      }
      return resolve({ solFiles: [workingPath], vyperFiles: [] });
    }

    try {
      let files = [];
      fs.readdirSync(workingPath).forEach(function (file) {
        let currentPath = path.join(workingPath, file);
        files.push(currentPath)
      });
      return resolve(fetchSolAndVyperFiles(files))
    } catch (err) {
      return reject(err)
    }

  });
}

const fetchSolAndVyperFiles = (files) => {
  let solFiles = [];
  let vyperFiles = [];

  files.forEach(file => {
    if (path.extname(file) == SOL_EXTENSION && path.basename(file)[0] != '.') solFiles.push(file)
    if (path.extname(file) == VYPER_EXTENSION && path.basename(file)[0] != '.') vyperFiles.push(file)
  })

  return { solFiles, vyperFiles }
}

module.exports = { find_contracts, fetchSolAndVyperFiles }




/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

let etherlimeTest = __webpack_require__(24);
let etherlimeCoverage = __webpack_require__(29);
const fs = __webpack_require__(7);
const path = __webpack_require__(0);
let Config = __webpack_require__(21);

const run = async (path, timeout, skipCompilation, runs, solcVersion, enableGasReport, port) => {

	var config = Config.default();
	var testDirectory = '';

	if (path.includes('.js')) {
		await etherlimeTest.run([path], timeout, skipCompilation, runs, solcVersion, enableGasReport, port);

		return;
	}

	testDirectory = path;

	if (!path.includes(config.test_directory)) {
		testDirectory = `${process.cwd()}/${path}`;
	}

	const files = await getFiles(testDirectory, config);

	await etherlimeTest.run(files, timeout, skipCompilation, runs, solcVersion, enableGasReport, port);
}

const getFiles = async function (testDirectory, config) {

	let files = [];
	await fs.readdirSync(testDirectory).forEach(function (file) {
		let currentPath = path.join(testDirectory, file);
		files.push(currentPath)
	});
	files = files.filter(function (file) {
		return file.match(config.test_file_extension_regexp) != null;
	});
	return files;
}

const runCoverage = async (path, timeout, port, runs, solcVersion, buildDirectory, workingDirectory, shouldOpenCoverage) => {
	var config = Config.default();
	var testDirectory = '';
	if (path.includes('.js')) {

		await etherlimeCoverage.runCoverage([path], timeout, port, runs, solcVersion, buildDirectory, workingDirectory, shouldOpenCoverage);

		return;
	}

	testDirectory = path;

	if (!path.includes(config.test_directory)) {
		testDirectory = `${process.cwd()}/${path}`;
	}

	const files = await getFiles(testDirectory, config);
	await etherlimeCoverage.runCoverage(files, timeout, port, runs, solcVersion, buildDirectory, workingDirectory, shouldOpenCoverage);

}

module.exports = {
	run,
	runCoverage
}

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

var Mocha = __webpack_require__(25);
var chai = __webpack_require__(26);
var originalRequire = __webpack_require__(11);
let timeTravel = __webpack_require__(16);
let events = __webpack_require__(17);

let accounts = __webpack_require__(20).accounts;
let compiler = __webpack_require__(9);
let ethers = __webpack_require__(5);
let CustomReporter = __webpack_require__(18);

chai.use(__webpack_require__(19));

const run = async (files, timeout, skipCompilation, runs, solcVersion, enableGasReport, port) => {
	var mochaConfig = { 'useColors': true, 'timeout': timeout };
	let mocha = createMocha(mochaConfig, files);

	files.forEach(function (file) {
		delete originalRequire.cache[file];

		mocha.addFile(file);
	});

	setJSTestGlobals(port);
	if (enableGasReport) {
		mocha.reporter(CustomReporter, { port });
	}
	if (!skipCompilation) {
		await compiler.run('.', runs, solcVersion, false, undefined, false, true);
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

const runMocha = async (mocha) => {
	return new Promise((resolve, reject) => {
		mocha.run(failures => {
			process.exitCode = failures ? -1 : 0;
			if (failures) {
				reject('Some of the test scenarios failed!')
			} else {
				resolve();

			}
		});
	})
}

const setJSTestGlobals = async (port) => {
	global.ethers = ethers;
	global.assert = chai.assert;
	global.expect = chai.expect;
	global.utils = {
		timeTravel: timeTravel.timeTravel,
		setTimeTo: timeTravel.setTimeTo,
		latestTimestamp: timeTravel.latestTimestamp,
		parseLogs: events.parseLogs,
		hasEvent: events.hasEvent
	}
	const localNodeProvider = new ethers.providers.JsonRpcProvider(`http://localhost:${port}`);
	global.ganacheProvider = localNodeProvider
	const importedAccounts = new Array();
	for (const acc of accounts) {
		importedAccounts.push({
			secretKey: acc.secretKey,
			signer: new ethers.Wallet(acc.secretKey, localNodeProvider)
		})
	}
	global.accounts = importedAccounts;
}

module.exports = {
	run,
}


/***/ }),
/* 25 */
/***/ (function(module, exports) {

module.exports = require("mocha");

/***/ }),
/* 26 */
/***/ (function(module, exports) {

module.exports = require("chai");

/***/ }),
/* 27 */
/***/ (function(module, exports) {

const mineBlock = async (provider) => {
    await provider.send('evm_mine');
}

module.exports = {
    mineBlock
}

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

let ethers = __webpack_require__(5);

module.exports = class Logger {
	constructor(port) {
		this.provider = new ethers.providers.JsonRpcProvider(`http://localhost:${port}`);
		this._totalGasUsed = 0;
	}

	async startNewLogForTest() {
		this.startingBlockNumber = await this.provider.getBlockNumber() + 1;
	}

	async getGasUsedForCurrentTest() {
		let lastBlockNumber = await this.provider.getBlockNumber();
		let gasUsed = 0;
		while (this.startingBlockNumber <= lastBlockNumber) {
			let block = await this.provider.getBlock(this.startingBlockNumber);
			gasUsed += Number(block.gasUsed.toString());
			this.startingBlockNumber++;
		}
		this._addToTotalGas(gasUsed);
		return gasUsed;
	}

	getTotalGasUsed() {
		return this._totalGasUsed;
	}

	_addToTotalGas(amount) {
		this._totalGasUsed += amount;
	}
};


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

var Mocha = __webpack_require__(25);
var chai = __webpack_require__(26);
var originalRequire = __webpack_require__(11);
let timeTravel = __webpack_require__(16);
let events = __webpack_require__(17);

let accounts = __webpack_require__(20).accounts;
let compiler = __webpack_require__(9);
let ethers = __webpack_require__(5);
let CustomReporter = __webpack_require__(18);

chai.use(__webpack_require__(19));

const ganache = __webpack_require__(36);
const child_process = __webpack_require__(6);
const ProviderEngine = __webpack_require__(79);
const RpcProvider = __webpack_require__(80);
const { CoverageSubprovider } = __webpack_require__(46);
const SolCompilerArtifactAdapter = __webpack_require__(46).SolCompilerArtifactAdapter;

const defaultFromAddress = "0xd9995bae12fee327256ffec1e3184d492bd94c31";
const isVerbose = true;
let artifacts = `./coverage-artifacts`;
const Compiler = __webpack_require__(81).Compiler;
const provider = new ProviderEngine();
const path = __webpack_require__(0);
const fs = __webpack_require__(1)
var istanbul = __webpack_require__(82);

const runCoverage = async (files, timeout, port, runs, solcVersion, buildDirectory, workingDirectory, shouldOpenCoverage) => {
	var mochaConfig = { 'useColors': true, 'timeout': timeout };
	let mocha = createMocha(mochaConfig, files);
	mocha.reporter(CustomReporter, { port });

	files.forEach(function (file) {
		delete originalRequire.cache[file];

		mocha.addFile(file);
	});

	const coverageProvider = await prepareCoverage(workingDirectory, port)
	await setJSTestGlobals(port, coverageProvider);

	await compiler.run('.', undefined, solcVersion, false, undefined, false, true, buildDirectory, workingDirectory);
	await compileCoverageArtifacts(solcVersion, workingDirectory, runs, buildDirectory);
	await runMocha(mocha);
	await generateCoverageReports(shouldOpenCoverage);
}

// Compile contracts in desired format in order to pass them to coverage library
const compileCoverageArtifacts = async (solcVersion, workingDirectory, runs, buildDirectory) => {
	const compilerOptions = {
		contractsDir: `${process.cwd()}/${workingDirectory}`,
		artifactsDir: `${process.cwd()}/${artifacts}`,
		compilerSettings: {
			outputSelection: {
				['*']: {
					['*']: ['abi', 'evm.bytecode.object', 'evm.deployedBytecode.object'],
				},
			},
			optimizer: {
				enabled: runs ? true : false,
				runs: runs
			}
		},
		contracts: '*',
		solcVersion: solcVersion,
	};

	const compiler = new Compiler(compilerOptions);

	console.log('Preparing coverage environment and building artifacts...');

	await compiler.compileAsync();


	await overrideCoverageBytecodes(buildDirectory)

}


// Override necessary bytecode params in order to pass them to coverage
const overrideCoverageBytecodes = async (buildDirectory) => {
	let buildFilesPaths = await findFiles(buildDirectory);
	let coverageBuildFilesPaths = await findFiles(artifacts);

	for (buildFilePath of buildFilesPaths) {
		for (coverageBuildFilePath of coverageBuildFilesPaths) {

			let buildFile = __webpack_require__(47)(`${process.cwd()}/${buildFilePath}`);
			let coverageBuildFile = __webpack_require__(47)(`${process.cwd()}/${coverageBuildFilePath}`);
			if (buildFile.contractName === coverageBuildFile.contractName) {
				coverageBuildFile.compilerOutput.evm.bytecode.object = buildFile.bytecode;
				coverageBuildFile.compilerOutput.evm.deployedBytecode.object = buildFile.deployedBytecode;
				coverageBuildFile.compilerOutput.abi = buildFile.abi;
				coverageBuildFile = JSON.stringify(coverageBuildFile, '', 2);
				fs.writeFileSync(coverageBuildFilePath, coverageBuildFile, 'utf-8')
			}
		}
	}
}

// Create mocha
const createMocha = (config, files) => {

	var mocha = new Mocha(config);

	files.forEach(file => {
		mocha.addFile(file);
	});

	return mocha;
}

// Run mocha
const runMocha = async (mocha) => {

	return new Promise((resolve, reject) => {
		mocha.run(async failures => {
			await writeCoverageFile();
			resolve();
		});
	})

}

// Set test globals
const setJSTestGlobals = async (port, coverageProvider) => {

	global.ethers = ethers;
	global.assert = chai.assert;
	global.expect = chai.expect;
	global.utils = {
		timeTravel: timeTravel.timeTravel,
		setTimeTo: timeTravel.setTimeTo,
		latestTimestamp: timeTravel.latestTimestamp,
		parseLogs: events.parseLogs,
		hasEvent: events.hasEvent
	}
	const localNodeProvider = new ethers.providers.Web3Provider(coverageProvider)
	global.ganacheProvider = localNodeProvider
	const importedAccounts = new Array();
	for (const acc of accounts) {
		importedAccounts.push({
			secretKey: acc.secretKey,
			signer: new ethers.Wallet(acc.secretKey, localNodeProvider)
		})
	}
	global.accounts = importedAccounts;
}

// Set and run coverage providers
const prepareCoverage = async (workingDirectory, port) => {

	let artifactAdapter = new SolCompilerArtifactAdapter(artifacts, workingDirectory);
	global.coverageSubprovider = new CoverageSubprovider(
		artifactAdapter,
		defaultFromAddress,
		isVerbose
	);
	provider.addProvider(global.coverageSubprovider);
	provider.addProvider(new RpcProvider({ rpcUrl: `http://localhost:${port}` }));
	global.provider = provider;

	// start pulling blocks
	provider.start();
	return provider
}

// Write coverage.json file
const writeCoverageFile = async () => {
	await global.coverageSubprovider.writeCoverageAsync();
	provider.stop();
}


// Generate html report and table report 
const generateCoverageReports = async (shouldOpenCoverage) => {

	const collector = new istanbul.Collector();
	const reporter = new istanbul.Reporter();
	const sync = false;
	const coverageFile = !(function webpackMissingModule() { var e = new Error("Cannot find module \".\""); e.code = 'MODULE_NOT_FOUND'; throw e; }());
	collector.add(coverageFile);
	reporter.add(['text']);
	reporter.add(['html']);

	setTimeout(async () => {
		console.log();
		await reporter.write(collector, sync, function () {
			console.log('All reports generated');
			if (shouldOpenCoverage) {
				const url = `${process.cwd()}/coverage/index.html`;
				const start = (process.platform == 'darwin' ? 'open' : process.platform == 'win32' ? 'start' : 'xdg-open');
				__webpack_require__(6).exec(start + ' ' + url);
			}
		});
	}, 100);
}


// Find compiled files from passed directory, e.g ./build
const findFiles = async (directory) => {

	let files = [];
	await fs.readdirSync(directory).forEach(function (file) {
		let currentPath = path.join(directory, file);
		files.push(currentPath)
	});

	files = files.filter(function (file) {
		return path.extname(file) == ".json" && path.basename(file)[0] != ".";
	});
	return files;
}

module.exports = {
	runCoverage,
	findFiles
}


/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

const circom = __webpack_require__(96);
const fs = __webpack_require__(1);
const path = __webpack_require__(0);

const circuitsPath = './zero-knowledge-proof/circuits';
const compiledCircuits = './zero-knowledge-proof/compiled-circuits';

const run = async () => {

	createZKProofCompiledCircuitFolder()
	const circuitFiles = await findFiles(circuitsPath);
	await compileCircuits(circuitFiles);
	console.log('===== Compilation Finished =====');
};

let findFiles = async (workingDirectory) => {

	let files = [];
	await fs.readdirSync(workingDirectory).forEach(function (file) {
		let currentPath = path.join(workingDirectory, file);
		files.push(currentPath)
	});

	files = files.filter(function (file) {
		return path.extname(file) == ".circom" && path.basename(file)[0] != ".";
	});
	return files;
}

const createZKProofCompiledCircuitFolder = () => {
	if (!fs.existsSync(compiledCircuits)) {
		console.log('===== Creating ZK Proof compiled folder =====');
		fs.mkdirSync(compiledCircuits);
	}
}

const compileCircuits = async (circuitFiles) => {
	console.log('===== Compiling your circuits =====');
	for (circuitFile of circuitFiles) {
		let extension = path.extname(circuitFile, 'circom');
		let nameOfFile = path.basename(circuitFile, extension);
		let compiledCir = await circom.compile(circuitFile);
		fs.writeFileSync(`${compiledCircuits}/${nameOfFile}.json`, JSON.stringify(compiledCir, null, 1), "utf8")
	}
}

module.exports = {
	run,
	findFiles
}

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

const zkSnark = __webpack_require__(12);
const fs = __webpack_require__(1);
const path = __webpack_require__(0);

const compiledCircuitsPaths = './zero-knowledge-proof/compiled-circuits';
const trustedSetup = './zero-knowledge-proof/trusted-setup'

const run = async () => {

	createZKProofTrustedSetupFolder(trustedSetup)
	const compiledCircuitFiles = await findFiles(compiledCircuitsPaths);
	await createTrustedSetup(compiledCircuitFiles);
	console.log('===== Trusted Setup Completed =====');
};

let findFiles = async (workingDirectory) => {
	try {
		let files = [];
		await fs.readdirSync(workingDirectory).forEach(function (file) {
			let currentPath = path.join(workingDirectory, file);
			files.push(currentPath)
		});

		files = files.filter(function (file) {
			return path.extname(file) == ".json" && path.basename(file)[0] != ".";
		});
		return files;
	} catch (err) {
		throw err;
	}
}

const createZKProofTrustedSetupFolder = (folderPath) => {
	if (!fs.existsSync(folderPath)) {
		console.log('===== Creating ZK Proof trusted setup folder =====');
		fs.mkdirSync(folderPath);
	}
}

const createTrustedSetup = async (compiledCircuitFiles) => {
	console.log('===== Trusted Setup Started =====');
	console.log('===== Generating pk and vk =====');
	for (compiledCircuit of compiledCircuitFiles) {
		let extension = path.extname(compiledCircuit, 'json');
		let nameOfFile = path.basename(compiledCircuit, extension);
		const file = __webpack_require__(2)(`${process.cwd()}/${compiledCircuit}`);
		let circuit = new zkSnark.Circuit(file);
		let setup = zkSnark.original.setup(circuit);
		fs.writeFileSync(`${trustedSetup}/${nameOfFile}_proving_key.json`, JSON.stringify(zkSnark.stringifyBigInts(setup.vk_proof), null, 1), "utf8");
		fs.writeFileSync(`${trustedSetup}/${nameOfFile}_verification_key.json`, JSON.stringify(zkSnark.stringifyBigInts(setup.vk_verifier), null, 1), "utf8");
	}
}

module.exports = {
	run,
	findFiles
}

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

const zkSnark = __webpack_require__(12);
const fs = __webpack_require__(1);

const generatedProofPath = './zero-knowledge-proof/generated-proof';
const generatedCallPath = './zero-knowledge-proof/generated-call';

const run = async (signals, proof) => {
	const publicSignals = __webpack_require__(2)(`${process.cwd()}/${generatedProofPath}/${signals}`);
	const generatedProof = zkSnark.unstringifyBigInts((__webpack_require__(2)(`${process.cwd()}/${generatedProofPath}/${proof}`)));

	createGenerateCallFolder(generatedCallPath);

	const generatedCall = await zkSnark.generateCall(publicSignals, generatedProof);
	
	
	fs.writeFileSync(`${generatedCallPath}/generatedCall.json`, zkSnark.stringifyBigInts(generatedCall));
	console.log('===== Generated Call Complete! =====');
	console.log('===== Generated Call: =====')
	console.log(generatedCall)
};

const createGenerateCallFolder = (folderPath) => {
	if (!fs.existsSync(folderPath)) {
		console.log('===== Creating Generated Call folder =====');
		fs.mkdirSync(folderPath);
	}
}

module.exports = {
	run
}

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

const zkSnark = __webpack_require__(12);
const fs = __webpack_require__(1);
const path = __webpack_require__(0);

const generatedProofPath = './zero-knowledge-proof/generated-proof';
const trustedSetupPath = './zero-knowledge-proof/trusted-setup';
const compiledCircuitsPath = './zero-knowledge-proof/compiled-circuits';
const signalsInputPath = './zero-knowledge-proof/input'

const run = async (signal, circuit, pk) => {
	const compiledCircuit = __webpack_require__(2)(`${process.cwd()}/${compiledCircuitsPath}/${circuit}`);
	const inputSignal = __webpack_require__(2)(`${process.cwd()}/${signalsInputPath}/${signal}`);
	const provingKey = zkSnark.unstringifyBigInts(__webpack_require__(2)(`${process.cwd()}/${trustedSetupPath}/${pk}`));

	createZKProofFolder(generatedProofPath);

	const witness = calculateWitness(compiledCircuit, inputSignal);
	generateProof(provingKey, witness, circuit);
	console.log('===== Generation Finished =====');

};

const createZKProofFolder = (folderPath) => {
	if (!fs.existsSync(folderPath)) {
		console.log('===== Creating ZK Proof folder =====');
		fs.mkdirSync(folderPath);
	}
}

const calculateWitness = (compiledCircuit, signal) => {
	const circuit = new zkSnark.Circuit(compiledCircuit);
	const witness = circuit.calculateWitness(signal);
	return witness;
}

const generateProof = (provingKey, witness, circuit) => {
	console.log('===== Generating Proof =====');
	const proofObject = zkSnark.original.genProof(provingKey, witness);

	let extension = path.extname(circuit, 'json');
	let nameOfFile = path.basename(circuit, extension);
	fs.writeFileSync(`${generatedProofPath}/${nameOfFile}_proof.json`, JSON.stringify(zkSnark.stringifyBigInts(proofObject.proof), null, 1), "utf8");
	fs.writeFileSync(`${generatedProofPath}/${nameOfFile}_public_signals.json`, JSON.stringify(zkSnark.stringifyBigInts(proofObject.publicSignals), null, 1), "utf8");

}

module.exports = {
	run
}

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

const zkSnark = __webpack_require__(12);
const fs = __webpack_require__(1);
const path = __webpack_require__(0);

const trustedSetupPath = './zero-knowledge-proof/trusted-setup';
const contractsPath = `./contracts`;

const run = async (vk) => {
	console.log('===== Creating Smart Contract for OnChain verification =====');
	const verifierKey = zkSnark.unstringifyBigInts(__webpack_require__(2)(`${process.cwd()}/${trustedSetupPath}/${vk}`));
	const template = zkSnark.generateVerifier(verifierKey);
	fs.writeFileSync(`${contractsPath}/Verifier.sol`, template);
	console.log('===== Smart Contract Created Successfully. Please check your contracts folder =====');
};

module.exports = {
	run
}

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

const zkSnark = __webpack_require__(12);
const fs = __webpack_require__(1);
const path = __webpack_require__(0);

const generatedProofPath = './zero-knowledge-proof/generated-proof';
const trustedSetupPath = './zero-knowledge-proof/trusted-setup';
const verifiedProof = './zero-knowledge-proof/verified-proof'

const run = async (signals, proof, vk) => {
	const publicSignals = __webpack_require__(2)(`${process.cwd()}/${generatedProofPath}/${signals}`);
	const generatedProof = zkSnark.unstringifyBigInts((__webpack_require__(2)(`${process.cwd()}/${generatedProofPath}/${proof}`)));
	const verifierKey = zkSnark.unstringifyBigInts(__webpack_require__(2)(`${process.cwd()}/${trustedSetupPath}/${vk}`));

	createZKProofFolder(verifiedProof);

	await verifyProof(publicSignals, generatedProof, verifierKey);
	console.log('===== Verifying Completed. Please check output.json =====');
};

const createZKProofFolder = (folderPath) => {
	if (!fs.existsSync(folderPath)) {
		console.log('===== Creating ZK Verifier folder =====');
		fs.mkdirSync(folderPath);
	}
}

const verifyProof = async (publicSignals, generatedProof, verifierKey) => {
	console.log('===== Verifying Proof =====');
	const verified = await zkSnark.original.isValid(verifierKey, generatedProof, publicSignals);
	const timestamp = new Date().getTime();
	const object = {
		verified,
		timestamp
	}

	fs.writeFileSync(`${verifiedProof}/output.json`, JSON.stringify(object, null, 1), "utf8");
}

module.exports = {
	run
}

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

const ganache = __webpack_require__(54);
const setup = __webpack_require__(20);
const { ganacheSetupConfig } = __webpack_require__(55);
const colors = __webpack_require__(3).colors;
const logger = __webpack_require__(4).logger;
const ethers = __webpack_require__(5);
const fs = __webpack_require__(1);
const path = __webpack_require__(0);
let port;

const run = (inPort, inLogger, forkParams, gasPrice, gasLimit, mnemonic, generate) => {
	if (mnemonic && generate) {
		generateAccounts(mnemonic, generate);
	}
	port = (inPort) ? inPort : setup.defaultPort;
	fork = (forkParams) ? forkParams : setup.forkParams;
	gasPrice = (gasPrice) ? ethers.utils.hexlify(gasPrice) : setup.gasPrice;
	gasLimit = (gasLimit) ? ethers.utils.hexlify(gasLimit) : setup.gasLimit;
	const server = ganache.server({
		accounts: setup.accounts,
		logger: inLogger,
		fork,
		gasPrice,
		gasLimit
	});

	server.listen(port, ganacheServerListenCallback);
};
const ganacheServerListenCallback = (err, blockchain) => {
	if (err) {
		logger.log(err);
		return;
	}
	const accountsLength = blockchain.options.accounts.length;
	const forkedNetwork = blockchain.options.fork;
	const forkedBlockNumber = parseInt(blockchain.options.fork_block_number, 16);
	for (let i = 0; i < accountsLength; i++) {
		logger.log(`[${i}] Address: ${Object.getOwnPropertyNames(blockchain.personal_accounts)[i]} Private key: ${blockchain.options.accounts[i].secretKey}`);
	}
	logger.log(`\nListening on http://localhost:${port}`);
	forkedNetwork ? logger.log(`Etherlime ganache is forked from network: ${colors.colorSuccess(forkedNetwork)}`) : null;
	forkedBlockNumber ? logger.log(`Network is forked from block number: ${colors.colorSuccess(forkedBlockNumber)}`) : null;
};

const generateAccounts = (mnemonic, generate) => {

	// Every time the command is run with mnemonic, reset the account list with the default one and add the number of accounts, the user specifies.
	const currentAccounts = ganacheSetupConfig.accounts;
	for (let i = 0; i < generate; i++) {
		let path = `m/44'/60'/${i}'/0/0`;
		let wallet = ethers.Wallet.fromMnemonic(mnemonic, path);
		currentAccounts.push({ secretKey: wallet.signingKey.privateKey, balance: "0x90000000000000000000000000000000" });
	}
	setup.accounts = currentAccounts;
	fs.writeFileSync(path.resolve(__dirname, 'setup.json'), JSON.stringify(setup, null, 1), "utf8");
}

module.exports = {
	run,
	ganacheServerListenCallback
};



/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

const ethersUtils = __webpack_require__(5).utils;
const colors = __webpack_require__(3).colors;
const Table = __webpack_require__(58);
const getReadableTime = __webpack_require__(3).getReadableTime;

const printReportTable = (recordActions) => {

	const table = new Table();
	let actionIndex = 0;

	for (const action of recordActions) {
		actionIndex++;
		table.push(
			{ 'Event Time': `${getReadableTime(action.eventTimestamp)}` },
			{ 'Executor': `${action.deployerType}` },
			{ 'Name or Label': `${colors.colorName(action.nameOrLabel)}` },
			{ 'Tx Hash': `${action.transactionHash}` },
			{ 'Status': `${getReadableStatus(action.status)}` },
			{ 'Gas Price': `${ethersUtils.formatUnits(action.gasPrice, 'gwei')} Gwei` },
			{ 'Gas Used': `${action.gasUsed}` },
			{ 'NetworkID': action.networkID ? `${action.networkID}` : `Not recorded` },
			{ 'Result': `${action.result}` },
			{ 'Solc Version': action.solcVersion ? `${action.solcVersion}` : `Not recorded` },
			{ 'Contract Verification': action.verification ? `${getVerificationStatus(action.verification)}` : `Not recorded` }
		);

		if (recordActions.length > 1 && actionIndex < recordActions.length) {
			table.push({ '': '' });
		}
	}

	console.log(table.toString());
};

const getReadableStatus = (status) => {
	if (status === 0) {
		return `${colors.colorSuccess('Success')}`
	}

	return `${colors.colorFailure('Fail')}`
};

const getVerificationStatus = (status) => {
	if (status === 'Success') {
		return `${colors.colorSuccess(status)}`
	}

	return `${colors.colorFailure(status)}`
}

module.exports = {
	printReportTable,
	getReadableStatus
};

/***/ }),
/* 38 */
/***/ (function(module, exports) {

module.exports = require("lodash");

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

const OS = __webpack_require__(13);
const path = __webpack_require__(0);
const Profiler = __webpack_require__(40);
const CompileError = __webpack_require__(41);
const expect = __webpack_require__(10);
const find_contracts = __webpack_require__(22).find_contracts;
const Config = __webpack_require__(21);
const CompilerSupplier = __webpack_require__(14);
const logger = __webpack_require__(4).logger;

let compile = async (sources, options) => {
	return new Promise(async (resolve, reject) => {
		expect.options(options, [
			"contracts_directory",
			"solc"
		]);
		const operatingSystemIndependentSources = {};
		const originalPathMappings = {};
		Object.keys(sources).forEach((source) => {
			let replacement = source.replace(/\\/g, "/");
			if (replacement.length >= 2 && replacement[1] == ":") {
				replacement = "/" + replacement;
				replacement = replacement.replace(":", "");
			}
			operatingSystemIndependentSources[replacement] = sources[source];
			originalPathMappings[replacement] = source;
		});
		const solcStandardInput = {
			language: "Solidity",
			sources: {},
			settings: {
				evmVersion: options.solc.evmVersion,
				optimizer: options.solc.optimizer,
				outputSelection: {
					"*": {
						"": [
							"legacyAST",
							"ast"
						],
						"*": [
							"abi",
							"evm.bytecode.object",
							"evm.bytecode.sourceMap",
							"evm.deployedBytecode.object",
							"evm.deployedBytecode.sourceMap"
						]
					},
				}
			}
		};
		if (Object.keys(sources).length == 0) {
			return resolve([], []);
		}
		Object.keys(operatingSystemIndependentSources).forEach((file_path) => {
			solcStandardInput.sources[file_path] = {
				content: operatingSystemIndependentSources[file_path]
			}
		});
		const supplier = new CompilerSupplier(options.compilers.solc);
		let solc = await supplier.load();
		const result = solc.compile(JSON.stringify(solcStandardInput));
		const standardOutput = JSON.parse(result);
		let errors = standardOutput.errors || [];
		let warnings = [];
		if (options.strict !== true) {
			warnings = errors.filter((error) => {
				return error.severity == "warning";
			});
			errors = errors.filter((error) => {
				return error.severity != "warning";
			});
			if (options.quiet !== true && warnings.length > 0) {
				logger.log(`${OS.EOL} Compilation warnings encountered: ${OS.EOL}`);
				logger.log(warnings.map((warning) => {
					return warning.formattedMessage;
				}).join());
			}
		}
		if (errors.length > 0) {
			logger.log("");
			return reject(new CompileError(standardOutput.errors.map((error) => {
				return error.formattedMessage;
			}).join()));
		}
		let contracts = standardOutput.contracts;
		let files = [];
		Object.keys(standardOutput.sources).forEach((filename) => {
			const source = standardOutput.sources[filename];
			files[source.id] = originalPathMappings[filename];
		});
		let returnVal = {};
		Object.keys(contracts).forEach((source_path) => {
			const files_contracts = contracts[source_path];
			Object.keys(files_contracts).forEach((contract_name) => {
				const contract = files_contracts[contract_name];
				const contract_definition = {
					contract_name: contract_name,
					sourcePath: originalPathMappings[source_path],
					source: operatingSystemIndependentSources[source_path],
					sourceMap: contract.evm.bytecode.sourceMap,
					deployedSourceMap: contract.evm.deployedBytecode.sourceMap,
					legacyAST: standardOutput.sources[source_path].legacyAST,
					ast: standardOutput.sources[source_path].ast,
					abi: contract.abi,
					bytecode: "0x" + contract.evm.bytecode.object,
					deployedBytecode: "0x" + contract.evm.deployedBytecode.object,
					unlinked_binary: "0x" + contract.evm.bytecode.object,
					compiler: {
						"name": "solc",
						"version": solc.version(),
						"optimizer": options.solc.optimizer.enabled,
						"runs": options.solc.optimizer.runs
					}
				}
				contract_definition.abi = orderABI(contract_definition);
				Object.keys(contract.evm.bytecode.linkReferences).forEach((file_name) => {
					const fileLinks = contract.evm.bytecode.linkReferences[file_name];
					Object.keys(fileLinks).forEach((library_name) => {
						const linkReferences = fileLinks[library_name] || [];
						contract_definition.bytecode = replaceLinkReferences(contract_definition.bytecode, linkReferences, library_name);
						contract_definition.unlinked_binary = replaceLinkReferences(contract_definition.unlinked_binary, linkReferences, library_name);
					});
				});
				Object.keys(contract.evm.deployedBytecode.linkReferences).forEach((file_name) => {
					const fileLinks = contract.evm.deployedBytecode.linkReferences[file_name];
					Object.keys(fileLinks).forEach((library_name) => {
						const linkReferences = fileLinks[library_name] || [];
						contract_definition.deployedBytecode = replaceLinkReferences(contract_definition.deployedBytecode, linkReferences, library_name);
					});
				});
				returnVal[contract_name] = contract_definition;
			});
		});
		let object = { returnVal, files }
		resolve(object);
	});

}

replaceLinkReferences = (bytecode, linkReferences, libraryName) => {
	let linkId = "__" + libraryName;
	while (linkId.length < 40) {
		linkId += "_";
	}
	linkReferences.forEach((ref) => {
		let start = (ref.start * 2) + 2;
		bytecode = bytecode.substring(0, start) + linkId + bytecode.substring(start + 40);
	});
	return bytecode;
};
orderABI = (contract) => {
	let contract_definition;
	let ordered_function_names = [];
	let ordered_functions = [];
	for (let i = 0; i < contract.legacyAST.children.length; i++) {
		const definition = contract.legacyAST.children[i];
		if (definition.name !== "ContractDefinition" ||
			definition.attributes.name !== contract.contract_name) {
			continue;
		}
		contract_definition = definition;
		break;
	}
	if (!contract_definition) {
		return contract.abi;
	}
	if (!contract_definition.children) {
		return contract.abi;
	}
	contract_definition.children.forEach((child) => {
		if (child.name == "FunctionDefinition") {
			ordered_function_names.push(child.attributes.name);
		}
	});
	let functions_to_remove = ordered_function_names.reduce((obj, value, index) => {
		obj[value] = index;
		return obj;
	}, {});
	let function_definitions = contract.abi.filter((item) => {
		return functions_to_remove[item.name] != null;
	});
	function_definitions = function_definitions.sort((item_a, item_b) => {
		const a = functions_to_remove[item_a.name];
		const b = functions_to_remove[item_b.name];
		if (a > b) return 1;
		if (a < b) return -1;
		return 0;
	});
	let newABI = [];
	contract.abi.forEach((item) => {
		if (functions_to_remove[item.name] != null) {
			return;
		}
		newABI.push(item);
	});
	Array.prototype.push.apply(newABI, function_definitions);
	return newABI;
}
compile.all = async (options) => {
	let files;
	let object;
	try {
		files = await find_contracts(options.contracts_directory);

		options.paths = files.solFiles;
		object = await compile.with_dependencies(options);
		return object;
	} catch (e) {
		throw e;
	}
}
compile.necessary = async (options) => {
	return new Promise(async (resolve, reject) => {
		let updated = [];
		let object;
		try {
			updated = await Profiler.updated(options);
			if (updated.length == 0 && options.quiet != true) {
				return resolve([], {});
			}
			options.paths = updated;
			object = await compile.with_dependencies(options);
			resolve(object);
		}
		catch (e) {
			return reject(e);
		}

	});
}
compile.with_dependencies = async (options) => {
	return new Promise(async (resolve, reject) => {
		options.contracts_directory = options.contracts_directory || process.cwd();
		expect.options(options, [
			"paths",
			"working_directory",
			"contracts_directory",
			"resolver"
		]);
		const config = Config.default().merge(options);
		let result;
		try {
			result = await Profiler.required_sources(config.with({
				paths: options.paths,
				base_path: options.contracts_directory,
				resolver: options.resolver
			}));
			if (options.quiet != true) {
				Object.keys(result).sort().forEach((import_path) => {
					const display_path = "." + path.sep + path.relative(options.working_directory, import_path);
					logger.log(`Compiling ${display_path}...`);
				});
			}
			let object = await compile(result, options);
			resolve(object);
		} catch (e) {
			return reject(e);
		}
	})
}
compile.CompilerSupplier = CompilerSupplier;
module.exports = compile;

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

const path = __webpack_require__(0);
const fs = __webpack_require__(1);
const Parser = __webpack_require__(60);
const expect = __webpack_require__(10);
const find_contracts = __webpack_require__(22).find_contracts;
const fetchSolAndVyperFiles = __webpack_require__(22).fetchSolAndVyperFiles;
const vyperCompiler = __webpack_require__(64);

const CompilerSupplier = __webpack_require__(14);

let updated = async (options) => {
  expect.options(options, [
    "resolver"
  ]);

  let sourceFilesArtifacts;
  let sourceFilesArtifactsUpdatedTimes;
  let updatedFiles;

  try {
    sourceFilesArtifacts = await prepareFiles(options);
    sourceFilesArtifacts = await readFiles(options.contracts_build_directory, sourceFilesArtifacts);
    sourceFilesArtifactsUpdatedTimes = await prepareArtifacts(sourceFilesArtifacts);
    updatedFiles = await updateFiles(sourceFilesArtifacts, sourceFilesArtifactsUpdatedTimes);
    return updatedFiles;
  } catch (e) {
    throw (e);
  }
}

let prepareFiles = async (options) => {
  let sourceFilesArtifacts = {};
  try {
    let { solFiles, vyperFiles } = await getFiles(options);

    if (vyperFiles && vyperFiles.length > 0) {
      await vyperCompiler(vyperFiles, options)
    }

    if (solFiles && solFiles.length > 0) {
      solFiles.forEach(function (sourceFile) {
        sourceFilesArtifacts[sourceFile] = [];
      });
    }

    return sourceFilesArtifacts

  }
  catch (e) {
    throw e;
  }
}

let getFiles = async (options) => {
  if (options.files) {
    return fetchSolAndVyperFiles(options.files);
  } else {

    let files;
    try {
      files = await find_contracts(options.contracts_directory);

      return files;
    } catch (e) {
      throw e;
    }
  }
}

let readFiles = async (build_directory, sourceFilesArtifacts) => {
  return new Promise(async (resolve, reject) => {
    try {
      let build_files;
      try {
        build_files = fs.readdirSync(build_directory);
      } catch (error) {

        if (error.message.indexOf("ENOENT: no such file or directory") >= 0) {
          build_files = [];
        } else {
          return reject(error);
        }

      }

      build_files = build_files.filter(function (build_file) {
        return path.extname(build_file) == ".json";
      });

      let jsonData = await prepareBuildFiles(build_files, build_directory);
      for (let i = 0; i < jsonData.length; i++) {
        let data = JSON.parse(jsonData[i]);

        if (sourceFilesArtifacts[data.sourcePath] == null) {
          sourceFilesArtifacts[data.sourcePath] = [];
        }

        sourceFilesArtifacts[data.sourcePath].push(data);
      }
      resolve(sourceFilesArtifacts);
    }
    catch (error) {
      return reject(error)
    }
  });
}

let prepareBuildFiles = async (build_files, build_directory) => {
  let body = [];
  build_files.forEach(buildFile => {
    try {
      body.push(fs.readFileSync(path.join(build_directory, buildFile)));
    } catch (e) {
      throw e
    }
  });
  return body;
}

let prepareArtifacts = async (sourceFilesArtifacts) => {
  let sourceFilesArtifactsUpdatedTimes = {};
  Object.keys(sourceFilesArtifacts).forEach(function (sourceFile) {
    let artifacts = sourceFilesArtifacts[sourceFile];

    sourceFilesArtifactsUpdatedTimes[sourceFile] = artifacts.reduce(function (minimum, current) {
      let updatedAt = new Date(current.updatedAt).getTime();

      if (updatedAt < minimum) {
        return updatedAt;
      }

      return minimum;
    }, Number.MAX_SAFE_INTEGER);

    if (sourceFilesArtifactsUpdatedTimes[sourceFile] == Number.MAX_SAFE_INTEGER) {
      sourceFilesArtifactsUpdatedTimes[sourceFile] = 0;
    }
  });

  return sourceFilesArtifactsUpdatedTimes
}

let updateFiles = async (sourceFilesArtifacts, sourceFilesArtifactsUpdatedTimes) => {
  let updatedFiles = [];
  return new Promise(async (resolve, reject) => {
    let sourceFiles = Object.keys(sourceFilesArtifacts);
    let sourceFileStats = await prepareUpdateFiles(sourceFiles);

    sourceFiles.forEach(function (sourceFile, index) {
      let sourceFileStat = sourceFileStats[index];

      if (sourceFileStat == null) {
        return;
      }

      let artifactsUpdatedTime = sourceFilesArtifactsUpdatedTimes[sourceFile] || 0;
      let sourceFileUpdatedTime = (sourceFileStat.mtime || sourceFileStat.ctime).getTime();

      if (sourceFileUpdatedTime > artifactsUpdatedTime) {
        updatedFiles.push(sourceFile);
      }
    });
    resolve(updatedFiles);
  });
}

let prepareUpdateFiles = async (sourceFiles) => {
  return new Promise(async (resolve, reject) => {
    let stats = [];
    (sourceFiles).forEach(sourceFile => {
      let stat;
      try {
        stat = fs.statSync(sourceFile);
      } catch (e) {
        stat = null;
      }
      stats.push(stat);
    });
    resolve(stats);
  });
}


//Find all contract's sources
let required_sources = async function (options) {
  return new Promise(async (resolve, reject) => {

    expect.options(options, [
      "paths",
      "base_path",
      "resolver"
    ]);

    let resolver = options.resolver;

    // Fetch the whole contract set
    let allSolPathsInitial;
    try {
      let allPathsInitial = await find_contracts(options.contracts_directory);
      allSolPathsInitial = allPathsInitial.solFiles;
    } catch (e) {
      return reject(e)
    }

    options.paths.forEach(_path => {
      if (!allSolPathsInitial.includes(_path)) {
        allSolPathsInitial.push(_path)
      }
    });
    let updates = convert_to_absolute_paths(options.paths, options.base_path).sort();
    let allPaths = convert_to_absolute_paths(allSolPathsInitial, options.base_path).sort();

    let allSources = {};
    let compilationTargets = [];

    const supplier = new CompilerSupplier(options.compilers.solc)
    supplier.load().then(async solc => {

      let resolved;
      let resolvedPaths;
      // Get all the source code
      try {
        resolved = await resolveAllSources(resolver, allPaths, solc);
        // Generate hash of all sources including external packages - passed to solc inputs.
        resolvedPaths = Object.keys(resolved);
        resolvedPaths.forEach(file => allSources[file] = resolved[file].body)
        // Exit w/out minimizing if we've been asked to compile everything, or nothing.
        if (listsEqual(options.paths, allPaths)) {
          resolve(allSources, {});
        } else if (!options.paths.length) {
          resolve({}, {});
        }

        // Seed compilationTargets with known updates

        updates.forEach(update => compilationTargets.push(update));

        // While there are updated files in the queue, we take each one
        // and search the entire file corpus to find any sources that import it.
        // Those sources are added to list of compilation targets as well as
        // the update queue because their own ancestors need to be discovered.
        while (updates.length > 0) {
          let currentUpdate = updates.shift();
          let files = allPaths.slice();
          while (files.length > 0) {

            let currentFile = files.shift();
            // Ignore targets already selected.

            if (compilationTargets.includes(currentFile)) {
              continue
            }

            let imports;
            try {
              imports = getImports(currentFile, resolved[currentFile], solc);
            } catch (err) {
              err.message = "Error parsing " + currentFile + ": " + err.message;
              return reject(err)
            }

            // If file imports a compilation target, add it
            // to list of updates and compilation targets
            if (imports.includes(currentUpdate)) {
              updates.push(currentFile);
              compilationTargets.push(currentFile);
            }
          }
        }

        resolve(allSources, compilationTargets)

      } catch (err) {
        return reject(err);
      }

    });
  });
}

let resolveAllSources = async function (resolver, initialPaths, solc) {
  let allPaths = initialPaths.slice();
  let resolvedResources = {};
  while (allPaths.length) {
    try {
      resolvedResources = await generateMapping(allPaths, resolver, solc, resolvedResources);
    } catch (e) {
      throw e;
    }
  }
  return resolvedResources;
}


let generateMapping = async function (allPaths, resolver, solc, mapping) {
  let promises = [];

  // Dequeue all the known paths, generating resolver promises,
  // We'll add paths if we discover external package imports.
  while (allPaths.length) {
    let file = ''
    let parent = null;

    let candidate = allPaths.shift();

    // Some paths will have been extracted as imports from a file
    // and have information about their parent location we need to track.
    if (typeof candidate === 'object') {
      file = candidate.file;
      parent = candidate.parent;
    } else {
      file = candidate;
    }

    let promise = new Promise(async (accept, reject) => {
      let result;
      try {
        result = await resolver.resolve(file, parent);
        accept({ file: result.resolved_path, body: result.resolved_body, source: result.current_source });
      } catch (err) {
        reject(err)
      }
    });
    promises.push(promise);
  };

  // Resolve everything known and add it to the map, then inspect each file's
  // imports and add those to the list of paths to resolve if we don't have it.
  return Promise.all(promises).then(results => {

    // Generate the sources mapping
    results.forEach(item => mapping[item.file] = Object.assign({}, item));

    // Queue unknown imports for the next resolver cycle
    while (results.length) {
      let result = results.shift();

      // Inspect the imports
      let imports;
      try {
        imports = getImports(result.file, result, solc);
      } catch (err) {
        err.message = "Error parsing " + result.file + ": " + err.message;
        throw err;
      }

      // Detect unknown external packages / add them to the list of files to resolve
      // Keep track of location of this import because we need to report that.
      imports.forEach(item => {
        if (!mapping[item])
          allPaths.push({ file: item, parent: result.file });
      });
    };
    return mapping
  }).catch(err => {
    throw err;
  });
}


let getImports = function (file, resolved, solc) {
  let imports = Parser.parseImports(resolved.body, solc);

  // Convert explicitly relative dependencies of modules back into module paths.
  return imports.map(dependencyPath => {
    return (isExplicitlyRelative(dependencyPath))
      ? resolved.source.resolve_dependency_path(file, dependencyPath)
      : dependencyPath;
  });
}

let listsEqual = function (listA, listB) {
  let a = listA.sort();
  let b = listB.sort();

  return JSON.stringify(a) === JSON.stringify(b);
}

let convert_to_absolute_paths = function (paths, base) {

  return paths.map(function (p) {
    if (path.isAbsolute(p)) {
      return p;
    }

    if (!isExplicitlyRelative(p)) {
      return p;
    }

    return path.resolve(path.join(base, p));
  });
}

let isExplicitlyRelative = function (import_path) {
  return import_path.indexOf(".") == 0;
}

module.exports = {
  updated,
  required_sources,
  resolveAllSources,
  getImports,
  listsEqual,
  convert_to_absolute_paths,
  isExplicitlyRelative

}


/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

const colors = __webpack_require__(61);
const EtherlimeError = __webpack_require__(62);

class CompileError extends EtherlimeError {
  constructor(message) {
    let trimmedMessage = message.trim();
    let errorMessage = colors.red("Compilation failed. See above.");

    let fancy_message = `${trimmedMessage}\n${errorMessage}`;
    let normal_message = message.trim();
    super(normal_message);
    this.message = fancy_message;
  }
}

module.exports = CompileError;


/***/ }),
/* 42 */
/***/ (function(module, exports) {

const VYPER_EXTENSION = '.vy';
module.exports = {VYPER_EXTENSION};

/***/ }),
/* 43 */
/***/ (function(module, exports) {

module.exports = require("axios");

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

const Schema = __webpack_require__(73);
const fs = __webpack_require__(7);
const path = __webpack_require__(0);
const _ = __webpack_require__(38);

class Artifactor {

  /**
	 * @param {*} destination destination of the contracts build directory 
	 */

  constructor(destination) {
    this.destination = destination
  }


  async save(object, extra_opts, skipNormalize) {
    const self = this;

    if (!skipNormalize) {
      object = Schema.normalize(object);
    }

    if (object.contractName == null) {
      throw new Error('You must specify a contract name.');
    }

    let output_path = object.contractName;

    output_path = path.join(self.destination, output_path);
    output_path = path.resolve(output_path);
    output_path = `${output_path}.json`;

    let finalObject = object;

    try {
      let json = await fs.readFile(output_path, { encoding: "utf8" });

      let existingObjDirty = JSON.parse(json);

      if (!skipNormalize) {
        finalObject = Schema.normalize(existingObjDirty);
      }
      let finalNetworks = {};

      _.merge(finalNetworks, finalObject.networks, object.networks);
      _.assign(finalObject, object);

      finalObject.networks = finalNetworks;

    } catch (error) {

    }

    finalObject.updatedAt = new Date().toISOString();
    await fs.outputFile(output_path, JSON.stringify(finalObject, null, 2), "utf8");

    if (typeof extra_opts == 'undefined') {
      return;
    }

    if (!extra_opts.exportAbi) {
      return
    }

    await self.exportABI(finalObject)

  }

  async exportABI(object) {
    const self = this;
    const ABIsDirName = 'abis';
    const abiDir = path.join(self.destination, ABIsDirName)

    if (!fs.existsSync(abiDir)) {
      fs.mkdirpSync(abiDir);
    }

    const contractName = object.contractName;
    let output_path = path.join(abiDir, contractName);
    output_path = `${output_path}-abi.json`;

    await fs.outputFile(output_path, JSON.stringify(object.abi, null, 2), "utf8");

  }


  async saveAll(objects, extra_options) {
    const self = this;

    if (Array.isArray(objects)) {
      let array = objects;
      objects = {};

      array.forEach((item) => {
        objects[item.contract_name] = item;
      })
    }

    try {
      await fs.stat(self.destination);

      let promises = [];

      Object.keys(objects).forEach((contractName) => {
        let object = objects[contractName];

        object.contractName = contractName;
        promises.push(self.save(object, extra_options));
      });

      return Promise.all(promises);

    } catch (error) {
      throw new Error(`Destination ${self.destination}`);
    }
  }

}

module.exports = Artifactor;


/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

const fs = __webpack_require__(7);
const path = __webpack_require__(0);
let Profiler = __webpack_require__(40);
let { resolver, supplier } = __webpack_require__(76)

const versionRegex = /^\s*pragma\ssolidity\s+(.*?)\s*;/; //regex for pragma solidity version 
const importRegex = /^\s*import(\s+).*$/gm; //regex for imported files

const returnFilesAndPaths = async (file, solcVersion) => {
	if (solcVersion) {
		supplier.config.version = solcVersion
	}

	let resolvedFiles = await resolveSources(`./contracts/${file}`)
	let resolvedPaths = resolvePaths(resolvedFiles)
	let orderedPaths = orderPaths(resolvedFiles, resolvedPaths)
	return { resolvedFiles, orderedPaths }
}

const run = async (file, solcVersion) => {


	const { resolvedFiles, orderedPaths } = await returnFilesAndPaths(file, solcVersion);
	recordFiles(file, resolvedFiles, orderedPaths)
	console.log('Contract was flattened successfully. Check your "./flat" folder')

};

const runWithoutWriteFiles = async (file, solcVersion) => {

	const { resolvedFiles, orderedPaths } = await returnFilesAndPaths(file, solcVersion);
	return returnFiles(file, resolvedFiles, orderedPaths)

};


const resolveSources = async (file) => {
	let solc = await supplier.load()
	let resolvedFiles
	resolvedFiles = await Profiler.resolveAllSources(resolver, [file], solc)

	return resolvedFiles
}

const resolvePaths = (files) => {
	return Object.keys(files)
}

//sort files according imported dependencies; contracts with no imports are added first
const orderPaths = (resolvedFiles, resolvedPaths) => {
	let orderedPaths = new Array();
	while (resolvedPaths.length > orderedPaths.length) {

		for (let i = 0; i < resolvedPaths.length; i++) {
			let currentPath = resolvedPaths[i]
			let imports = resolvedFiles[currentPath].body.match(importRegex)

			if (!imports) {
				pushPath(orderedPaths, currentPath)
				continue
			}

			let importsCount = countOrderedImports(imports, resolvedPaths, orderedPaths)
			if (importsCount === imports.length) {
				pushPath(orderedPaths, currentPath)
			}
		}
	}

	return orderedPaths
}

//counts if all imported sources in current file has already been ordered
const countOrderedImports = (imports, resolvedPaths, orderedPaths) => {
	let counter = 0;
	for (let i = 0; i < imports.length; i++) {
		let currentImport = imports[i].replace(/[\n\'\"\;]/g, '') //removes quotes and semicolon
		currentImport = path.basename(currentImport, '.sol') //extract the base name of file
		let fullPath = findFullPath(resolvedPaths, currentImport) //find full path
		if (orderedPaths.includes(fullPath)) {
			counter++
		}
	}
	return counter
}

const pushPath = (orderedPaths, currentPath) => {
	if (!orderedPaths.includes(currentPath)) {
		orderedPaths.push(currentPath)
	}
}

const recordFiles = (fileName, resolvedFiles, orderedPaths) => {
	let baseName = path.basename(fileName, '.sol')
	let flatFileName = `./flat/${baseName}_flat.sol`;

	createFolderAndFile(resolvedFiles, fileName, flatFileName)


	let content = getFlattenedCode(resolvedFiles, orderedPaths);
	fs.appendFileSync(flatFileName, content)
}

const returnFiles = (fileName, resolvedFiles, orderedPaths) => {
	let solVersionAndCode = getSolcVersion(resolvedFiles, fileName)

	let content = getFlattenedCode(resolvedFiles, orderedPaths);
	solVersionAndCode += content;
	return solVersionAndCode
}

const getFlattenedCode = (resolvedFiles, orderedPaths) => {
	let flattenedCode = '';
	for (let i = 0; i < orderedPaths.length; i++) {
		let content = resolvedFiles[orderedPaths[i]].body;
		content = removeVersionAndImports(content)
		flattenedCode += content;
	}

	orderedPaths = [];
	return flattenedCode
}

const createFolderAndFile = (resolvedFiles, fileName, flatFileName) => {
	let solidityVersion = getSolcVersion(resolvedFiles, fileName);

	if (!fs.existsSync('./flat')) {
		fs.mkdirSync('./flat')
	}

	fs.writeFileSync(flatFileName, solidityVersion)
}

const getSolcVersion = (resolvedFiles, fileName) => {
	let solidityVersion = resolvedFiles[`./contracts/${fileName}`].body.match(versionRegex) //takes pragma solidity version
	return solidityVersion[0]
}

const removeVersionAndImports = (fileContent) => {
	return fileContent.replace(versionRegex, '').replace(importRegex, '') //removes pragma solidity version and imported files
}

const findFullPath = (resolvedPaths, importPath) => {
	for (let i = 0; i < resolvedPaths.length; i++) {
		let basePath = path.basename(resolvedPaths[i], '.sol')
		if (basePath === importPath) {
			return resolvedPaths[i]
		}
	}
}


module.exports = {
	run,
	runWithoutWriteFiles
}

/***/ }),
/* 46 */
/***/ (function(module, exports) {

module.exports = require("@0x/sol-coverage");

/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./assertions": 19,
	"./assertions.js": 19,
	"./coverage-config": 48,
	"./coverage-config.json": 48,
	"./etherlime-coverage": 29,
	"./etherlime-coverage.js": 29,
	"./etherlime-test": 24,
	"./etherlime-test.js": 24,
	"./events": 17,
	"./events.js": 17,
	"./evm-commands": 27,
	"./evm-commands.js": 27,
	"./gas-logger/gas-logger": 28,
	"./gas-logger/gas-logger.js": 28,
	"./gas-logger/gas-reporter": 18,
	"./gas-logger/gas-reporter.js": 18,
	"./test": 23,
	"./test.js": 23,
	"./time-travel": 16,
	"./time-travel.js": 16
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number or string
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 47;

/***/ }),
/* 48 */
/***/ (function(module, exports) {

module.exports = {"compileCommand":"etherlime compile","testCommand":"etherlime test","buildDirPath":"/build"}

/***/ }),
/* 49 */
/***/ (function(module, exports) {

module.exports = require("simple-git/promise");

/***/ }),
/* 50 */
/***/ (function(module, exports) {

module.exports = require("debug");

/***/ }),
/* 51 */
/***/ (function(module, exports) {

module.exports = require("ethereum-transaction-debugger");

/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

const commands = __webpack_require__(53);
module.exports = commands;

/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

const ganache = __webpack_require__(36);
const init = __webpack_require__(56);
const deployer = __webpack_require__(57);
const history = __webpack_require__(78);
const compiler = __webpack_require__(9);
const test = __webpack_require__(23);
const shape = __webpack_require__(84);
const logger = __webpack_require__(4).logger;
const eventTracker = __webpack_require__(86);
const recordEvent = eventTracker.recordEvent
const debug = __webpack_require__(89);
const flatten = __webpack_require__(45);
const circuitCompile = __webpack_require__(30);
const trustedSetup = __webpack_require__(31);
const generateProof = __webpack_require__(33);
const verifier = __webpack_require__(35);
const generateVerify = __webpack_require__(34);
const generateCall = __webpack_require__(32);
const ide = __webpack_require__(97);

const commands = [
	{
		command: 'ganache [port] [output] [fork] [gasPrice] [gasLimit] [mnemonic] [count]',
		description: 'start etherlime ganache-cli instance with static accounts with a lot of ETH.',
		argumentsProcessor: (yargs) => {
			yargs.positional('port', {
				describe: 'port to run ganache-cli on',
				type: 'number'
			});

			yargs.positional('output', {
				describe: 'Defines the way that the logs are shown',
				type: 'string',
				default: 'normal',
				choices: ['none', 'normal', 'structured']
			});

			yargs.positional('fork', {
				describe: 'Define the fork network where etherlime ganache-cli can fork and continue to exists',
				type: 'string'
			});

			yargs.positional('gasPrice', {
				describe: 'The price of gas in wei - default is 20000000000',
				type: 'number'
			});

			yargs.positional('gasLimit', {
				describe: 'The block gas limit default is 0x6691b7',
				type: 'number'
			});

			yargs.positional('mnemonic', {
				describe: 'Pass mnemonic to generate account',
				type: 'string'
			});

			yargs.positional('count', {
				describe: 'Number of accounts to generate based on passed mnemonic',
				type: 'number',
				default: 1
			});

		},
		commandProcessor: (argv) => {
			// recordEvent('etherlime ganache', {
			// 	argv
			// });

			logger.storeOutputParameter(argv.output);

			try {
				ganache.run(argv.port, logger, argv.fork, argv.gasPrice, argv.gasLimit, argv.mnemonic, argv.count);
			} catch (err) {
				console.error(err);
			} finally {
				logger.removeOutputStorage();
			}
		}
	},
	{
		command: 'init [output] [zk]',
		description: 'initialize deployment folder structure and deployment files ready for etherlime deploy',
		argumentsProcessor: (yargs) => {
			yargs.positional('output', {
				describe: 'Defines the way that the logs are shown',
				type: 'string',
				default: 'normal',
				choices: ['none', 'normal', 'structured']
			});
		},

		argumentsProcessor: (yargs) => {
			yargs.positional('zk', {
				describe: 'Defines if to include in project a zk-proof folder with primary circuit for compiling',
				type: 'string',
				default: false,
			});
		},
		commandProcessor: async (argv) => {
			recordEvent('etherlime init', {
				argv
			});
			logger.storeOutputParameter(argv.output);

			try {
				await init.run(argv.zk);
			} catch (err) {
				console.error(err);
			} finally {
				logger.removeOutputStorage();
			}
		}
	},
	{
		command: 'deploy [file] [network] [secret] [compile] [runs] [output] [etherscanApiKey]',
		description: 'run the deployment script passed as file param (default ./deployment/deployer.js). You can optionally pass network param to be passed to the deployer for easy network switching. You can pass secret in order to pass non-committable data - suitable for private keys.',
		argumentsProcessor: (yargs) => {
			yargs.positional('file', {
				describe: 'port to run ganache-cli on',
				type: 'string'
			});

			yargs.positional('network', {
				describe: 'network param to pass to the deployment script',
				type: 'string'
			});

			yargs.positional('secret', {
				describe: 'secret string to be passed to your deployer. Useful for private keys or api keys',
				type: 'string'
			});

			yargs.positional('compile', {
				describe: 'Enable compilation of the smart contracts before their deployment. By default the deployment is done with a compilation',
				type: 'boolean',
				default: true
			});

			yargs.positional('runs', {
				describe: 'enables the optimizer and runs it the specified number of times',
				type: 'number'
			});

			yargs.positional('output', {
				describe: 'Defines the way that the logs are shown',
				type: 'string',
				default: 'normal',
				choices: ['none', 'normal', 'structured']
			});
			yargs.positional('etherscanApiKey', {
				describe: 'Etherscan apiKey for contract verification API',
				type: 'string'
			});
		},
		commandProcessor: async (argv) => {
			logger.storeOutputParameter(argv.output);

			try {
				await deployer.run(argv.file, argv.network, argv.secret, argv.silent, argv.compile, argv.runs, argv.output, argv.etherscanApiKey);
			} catch (err) {
				console.error(err);
			} finally {
				logger.removeOutputStorage();
				const statistics = {
					argv
				}
				delete statistics.argv.secret;

				recordEvent('etherlime deploy', {
					statistics
				});
			}
		}
	},
	{
		command: 'history [limit] [output]',
		description: 'Show historical log of execution and reports of the executions.',
		argumentsProcessor: (yargs) => {
			yargs.positional('limit', {
				describe: 'Limit to the execution logs',
				type: 'number',
				default: 5
			});

			yargs.positional('output', {
				describe: 'Defines the way that the logs are shown',
				type: 'string',
				default: 'normal',
				choices: ['none', 'normal', 'structured']
			});
		},
		commandProcessor: async (argv) => {
			recordEvent('etherlime history', {
				argv
			});
			logger.storeOutputParameter(argv.output);

			try {
				await history.run(argv.limit, argv.output);
			} catch (err) {
				console.error(err);
			} finally {
				logger.removeOutputStorage();
			}
		}
	},
	{
		command: 'compile [dir] [runs] [solc-version] [docker] [list] [all] [quite] [output] [buildDirectory] [deleteCompiledFiles]',
		description: 'Compiles the smart contracts that are in the directory contracts in the path provided by the dir parameter (defaults to .)',
		argumentsProcessor: (yargs) => {
			yargs.positional('dir', {
				describe: 'Specifies the root dir to read the contracts and place the build folder',
				type: 'string',
				default: '.'
			});

			yargs.positional('runs', {
				describe: 'enables the optimizer and runs it the specified number of times',
				type: 'number'
			});

			yargs.positional('solc-version', {
				describe: 'Sets the solc version used for compiling the smart contracts. By default it use the solc version from the node modules',
				type: 'string'
			});

			yargs.positional('docker', {
				describe: 'Enable the usage of a docker. By default it is set to false.',
				type: 'boolean',
				default: false
			});

			yargs.positional('list', {
				describe: 'List available solc versions. The default is solcjs stable release',
				type: 'string'
			});

			yargs.positional('all', {
				describe: 'Print the full list',
				type: 'boolean',
				default: false
			});

			yargs.positional('quite', {
				describe: 'Disable verboseness during compilation. By the default is set to false.',
				type: 'boolean',
				default: false
			});

			yargs.positional('output', {
				describe: 'Defines the way that the logs are shown',
				type: 'string',
				default: 'normal',
				choices: ['none', 'normal', 'structured']
			});

			yargs.positional('buildDirectory', {
				describe: 'Defines where to place builded contracts',
				type: 'string',
			});

			yargs.positional('workingDirectory', {
				describe: 'Defines which folder to use for reading contracts from, instead of the default one: ./contracts',
				type: 'string',
			});

			yargs.positional('deleteCompiledFiles', {
				describe: 'Delete previously compiled files from build directory before compilation of the contracts files',
				type: 'boolean',
				default: false
			});

			yargs.positional('exportAbi', {
				describe: 'Creates abi directory inside the build directory containing only the ABIs of all contract',
				type: 'boolean',
				default: false
			});
		},
		commandProcessor: async (argv) => {
			// recordEvent('etherlime compile', {
			// 	argv
			// });
			logger.storeOutputParameter(argv.output);

			try {
				await compiler.run(argv.dir, argv.runs, argv.solcVersion, argv.docker, argv.list, argv.all, argv.quite, argv.buildDirectory, argv.workingDirectory, argv.deleteCompiledFiles, argv.exportAbi);
			} catch (err) {
				console.error(err);
			} finally {
				logger.removeOutputStorage();
			}
		}
	},
	{
		command: 'test [path] [timeout] [skip-compilation] [gas-report] [runs] [solc-version] [output] [port]',
		description: 'Run all the tests that are in the test directory',
		argumentsProcessor: (yargs) => {
			yargs.positional('path', {
				describe: 'Specifies the path in which tests should be ran',
				type: 'string',
				default: './test'
			});

			yargs.positional('skip-compilation', {
				describe: 'Skips compilation of the contracts before running the tests',
				type: 'boolean',
				default: 'false'
			});

			yargs.positional('gas-report', {
				describe: 'Enables Gas reporting future that will show Gas Usage after each test.',
				type: 'boolean',
				default: 'false'
			});

			yargs.positional('runs', {
				describe: 'enables the optimizer and runs it the specified number of times',
				type: 'number'
			});

			yargs.positional('solc-version', {
				describe: 'Sets the solc version used for compiling the smart contracts. By default it use the solc version from the node modules',
				type: 'string'
			});

			yargs.positional('output', {
				describe: 'Defines the way that the logs are shown',
				type: 'string',
				default: 'none',
				choices: ['none', 'normal', 'structured']
			});

			yargs.positional('port', {
				describe: 'The port that the etherlime ganache is running in order to instantiate the test accounts',
				type: 'number',
				default: 8545
			});

			yargs.positional('timeout', {
				describe: 'Set test timeout in milliseconds',
				type: 'number',
				default: 2000
			});
		},
		commandProcessor: async (argv) => {
			recordEvent('etherlime test', {
				argv
			});
			logger.storeOutputParameter(argv.output);

			try {
				await test.run(argv.path, argv.timeout, argv.skipCompilation, argv.runs, argv.solcVersion, argv.gasReport, argv.port);
			} catch (err) {
				console.error(err);
			} finally {
				logger.removeOutputStorage();
			}
		}
	},
	{
		command: 'coverage [path] [timeout] [port] [runs] [solcVersion] [buildDirectory] [workingDirectory] [html]',
		description: 'Run all tests with code coverage.',
		argumentsProcessor: (yargs) => {
			yargs.positional('path', {
				describe: 'Specifies the path in which tests should be ran',
				type: 'string',
				default: './test'
			});

			yargs.positional('port', {
				describe: 'The port to run the solidity coverage testrpc (compatible with etherlime ganache deployer)',
				type: 'number',
				default: 8545
			});

			yargs.positional('runs', {
				describe: 'enables the optimizer on the compiler and specifies the runs',
				type: 'number'
			});

			yargs.positional('solcVersion', {
				describe: 'Sets the solc version used for compiling the smart contracts. By default it use the solc version from the node modules',
				type: 'string'
			});

			yargs.positional('buildDirectory', {
				describe: 'Defines which folder to use for reading builded contracts from, instead of the default one: ./build',
				type: 'string',
				default: './build'
			});

			yargs.positional('workingDirectory', {
				describe: 'Defines which folder to use for reading contracts from, instead of the default one: ./contracts',
				type: 'string',
				default: './contracts'
			});

			yargs.positional('html', {
				describe: 'Defines whether to open automatically the html coverage report located in: ./coverage',
				type: 'string',
				default: 'false'
			});

			yargs.positional('timeout', {
				describe: 'Set test timeout in milliseconds',
				type: 'number',
				default: 2000
			});

		},
		commandProcessor: async (argv) => {
			recordEvent('etherlime coverage', {
				argv
			});
			try {
				await test.runCoverage(argv.path, argv.timeout, argv.port, argv.runs, argv.solcVersion, argv.buildDirectory, argv.workingDirectory, argv.html);
			} catch (e) {
				console.error(e);
				global.provider.stop();
			} finally {
				logger.removeOutputStorage();
			}

		}
	},
	{
		command: 'debug [transactionHash] [port]',
		description: 'Debug transaction hash',
		argumentsProcessor: (yargs) => {
			yargs.positional('transactionHash', {
				describe: 'Specifies the transaction hash',
				type: 'string'
			})

			yargs.positional('port', {
				describe: 'The port to run the debugger for listening for local ganache',
				type: 'number',
				default: 8545
			})
		},
		commandProcessor: async (argv) => {
			recordEvent('etherlime debbuger', {
				argv
			});
			try {
				await debug.run(argv.transactionHash, argv.port)
			} catch (err) {
				console.error(err);
			} finally {
				logger.removeOutputStorage();
			}

		}
	},
	{
		command: 'shape [name]',
		description: 'Shapes ready to use dApp containing all files and settings.',
		argumentsProcessor: (yargs) => {
			yargs.positional('name', {
				describe: 'Specifies the name of the framework or library that the project will be build up.',
				type: 'string'
			})
		},
		commandProcessor: (argv) => {
			recordEvent('etherlime shape', {
				argv
			});

			logger.storeOutputParameter(argv.output);

			try {
				shape.run(argv.name);
			} catch (err) {
				console.error(err);
			} finally {
				logger.removeOutputStorage();
			}
		}
	},
	{
		command: 'opt-out',
		description: `Opt out of the event tracking etherlime uses in order to improve itself (please don't)`,
		argumentsProcessor: (yargs) => {
		},
		commandProcessor: (argv) => {
			recordEvent('etherlime opt-out', {
				argv
			});

			try {
				eventTracker.optOutUser();
			} catch (err) {
				console.error(err);
			} finally {
				logger.removeOutputStorage();
			}
		}
	},
	{
		command: 'flatten [file] [solcVersion]',
		description: 'Flattens a smart contract combining all Solidity code in one file along with imported sources.',
		argumentsProcessor: (yargs) => {
			yargs.positional('file', {
				describe: 'Specifies the file to be flattened',
				type: 'string'
			});

			yargs.positional('solcVersion', {
				describe: 'Specifies the version of the solidity compiler',
				type: 'string'
			});
		},
		commandProcessor: async (argv) => {
			try {
				await flatten.run(argv.file, argv.solcVersion);
			} catch (err) {
				console.error(err);
			} finally {
				logger.removeOutputStorage();
			}
		}
	},
	{
		command: 'ide [port]',
		description: 'Runs web-based Solidity IDE that works with the file system',
		argumentsProcessor: (yargs) => {
			yargs.positional('port', {
				describe: 'Specifies the port ganache is running on',
				type: 'string'
			});
		},
		commandProcessor: async (argv) => {
			try {
				await ide.run(argv.port);
			} catch (err) {
				console.error(err);
			} finally {
				logger.removeOutputStorage();
			}
		}
	},
	{
		command: 'zk <zk-command>',
		description: 'Ability to work with Zero Knowledge Concept',
		argumentsProcessor: (yargs) => {
			yargs.positional('zk-command', {
				describe: "Specify the desired command that you want to run: ['compile', 'setup', 'proof', 'verify', 'generate', 'call']",
				type: 'string',
				choices: ['compile', 'setup', 'proof', 'verify', 'generate', 'call']
			});
		},
		commandProcessor: async (argv) => {
			try {
				await zkCommandProcessor(argv);
			} catch (err) {
				console.error(err);
			} finally {
				logger.removeOutputStorage();
			}
		}
	}
];

const zkCommandProcessor = async (argv) => {

	// Set default command values for optional params:
	let signal = 'input.json';
	let circuit = 'circuit.json';
	let provingKey = 'circuit_proving_key.json';
	let publicSignals = 'circuit_public_signals.json';
	let proof = 'circuit_proof.json';
	let verifierKey = 'circuit_verification_key.json';


	// check command and optional scenarios:
	switch (argv.zkCommand) {
		case 'compile':
			await circuitCompile.run();
			break;
		case 'setup':
			await trustedSetup.run();
			break;
		case 'proof':
			if (argv.signal) {
				signal = argv.signal;
			}
			if (argv.circuit) {
				circuit = argv.circuit;
			}
			if (argv.provingKey) {
				provingKey = argv.provingKey;
			}
			await generateProof.run(signal, circuit, provingKey);
			break;
		case 'verify':
			if (argv.publicSignals) {
				publicSignals = argv.publicSignals;
			}
			if (argv.proof) {
				proof = argv.proof;
			}
			if (argv.verifierKey) {
				verifierKey = argv.verifierKey;
			}

			await verifier.run(publicSignals, proof, verifierKey);
			break;
		case 'generate':
			if (argv.verifierKey) {
				verifierKey = argv.verifierKey;
			}
			await generateVerify.run(verifierKey);
			break;
		case 'call':
			if (argv.publicSignals) {
				publicSignals = argv.publicSignals;
			}
			if (argv.proof) {
				proof = argv.proof;
			}
			await generateCall.run(publicSignals, proof);
			break;
	}
}

module.exports = commands;

/***/ }),
/* 54 */
/***/ (function(module, exports) {

module.exports = require("ganache-cli");

/***/ }),
/* 55 */
/***/ (function(module, exports) {

module.exports = require("etherlime-config");

/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

const fs = __webpack_require__(1);
const util = __webpack_require__(8);
const exec = util.promisify(__webpack_require__(6).exec);

const deploymentDir = './deployment';
const deploymentFileDestination = `${deploymentDir}/deploy.js`;

const testDir = './test';
const testFileDestination = `${testDir}/exampleTest.js`;

const contractsDir = './contracts';
const contractFileDestination = `${contractsDir}/LimeFactory.sol`;

const zkProofDir = './zero-knowledge-proof';
const zkProofCircuitDir = './circuits';
const zkCircuitDestination = `${zkProofDir}/${zkProofCircuitDir}/circuit.circom`;

const zkInputParamsDir = './input';
const zkInputParamsDestionation = `${zkProofDir}/${zkInputParamsDir}/input.json`;

const packageJsonDestination = './package.json';

const gitIgnoreFileDestination = './.gitignore';

const logger = __webpack_require__(4).logger;

const createDeploymentDir = () => {
	logger.log('===== Creating deployment file structure =====');
	if (!fs.existsSync(deploymentDir)) {
		fs.mkdirSync(deploymentDir);
	}
};

const copyDeployFile = (libraryDirectory) => {
	if (fs.existsSync(deploymentFileDestination)) {
		throw new Error(`deploy.js already exists in ${deploymentDir} directory. You've probably already initialized etherlime for this project.`);
	}

	const deploymentFileSource = `${libraryDirectory}/deploymentTemplate.js`;

	fs.copyFileSync(deploymentFileSource, deploymentFileDestination);
};

const copyTestFile = (libraryDirectory) => {
	if (fs.existsSync(testFileDestination)) {
		throw new Error(`example.js already exists in ${testDir} directory. You've probably already initialized etherlime for this project.`);
	}

	const testFileSource = `${libraryDirectory}/testTemplate.js`;

	fs.copyFileSync(testFileSource, testFileDestination);
};

const copyContractFile = (libraryDirectory) => {
	if (fs.existsSync(contractFileDestination)) {
		throw new Error(`LimeFactory.sol already exists in ${contractsDir} directory. You've probably already initialized etherlime for this project.`);
	}

	const contractFileSource = `${libraryDirectory}/LimeFactory.sol`;
	fs.copyFileSync(contractFileSource, contractFileDestination);
};

const createContractsFolder = () => {
	logger.log('===== Creating contracts file structure =====');
	if (!fs.existsSync(contractsDir)) {
		fs.mkdirSync(contractsDir);
	}
};

const createTestsFolder = () => {
	logger.log('===== Creating tests file structure =====');
	if (!fs.existsSync(testDir)) {
		fs.mkdirSync(testDir);
	}
};

const copyPackageJsonFile = (libraryDirectory) => {
	logger.log('===== Generating package.json =====');

	if (fs.existsSync(packageJsonDestination)) {
		return;
	}

	const packageJsonFileSource = `${libraryDirectory}/package.json`;

	fs.copyFileSync(packageJsonFileSource, packageJsonDestination);
};

const createGitIgnoreFile = (libraryDirectory) => {
	if (!fs.existsSync(gitIgnoreFileDestination)) {
		logger.log('===== Creating .gitignore file =====');

		const gitIgnoreSource = `${libraryDirectory}/gitIgnoreSource.js`;

		fs.copyFileSync(gitIgnoreSource, gitIgnoreFileDestination)
	}
}

const createZKProofFolder = () => {
	logger.log('===== Creating ZK Proof file structure =====');
	if (!fs.existsSync(zkProofDir)) {
		fs.mkdirSync(zkProofDir);
	}
}

const createZKProofCircuitFolder = () => {
	logger.log('===== Creating ZK Proof circuit folder =====');
	if (!fs.existsSync(`${zkProofDir}/${zkProofCircuitDir}`)) {
		fs.mkdirSync(`${zkProofDir}/${zkProofCircuitDir}`);
	}
}

const copyCircuitFile = (libraryDirectory) => {
	if (fs.existsSync(zkCircuitDestination)) {
		throw new Error(`circuit.circom already exists in ${zkProofDir} directory. You've probably already initialized etherlime for this project.`);
	}

	const circuitFileSource = `${libraryDirectory}/circuit.circom`;
	fs.copyFileSync(circuitFileSource, zkCircuitDestination);
};

const createZKProofInputParamsFolder = () => {
	logger.log('===== Creating ZK Proof input params folder =====');
	if (!fs.existsSync(`${zkProofDir}/${zkInputParamsDir}`)) {
		fs.mkdirSync(`${zkProofDir}/${zkInputParamsDir}`);
	}
}

const copyInputParamsFile = (libraryDirectory) => {
	if (fs.existsSync(zkInputParamsDestionation)) {
		throw new Error(`input.json already exists in ${zkProofDir} directory. You've probably already initialized etherlime for this project.`);
	}
	const inputFileSource = `${libraryDirectory}/input.json`;
	fs.copyFileSync(inputFileSource, zkInputParamsDestionation);
};

const run = async (zkEnabled) => {
	const libraryDirectory = __dirname;
	console.log('JERE OGI', libraryDirectory)
	try {
		logger.log('===== Installing etherlime =====');
		copyPackageJsonFile(libraryDirectory);
		const { stdout, stderr } = await exec('npm install etherlime-lib');
		logger.log(stdout);
		createContractsFolder();
		copyContractFile(libraryDirectory);
		createTestsFolder();
		createDeploymentDir();
		copyDeployFile(libraryDirectory);
		copyTestFile(libraryDirectory);
		createGitIgnoreFile(libraryDirectory)
		if (zkEnabled) {
			createZKProofFolder();
			createZKProofCircuitFolder();
			copyCircuitFile(libraryDirectory);
			createZKProofInputParamsFolder();
			copyInputParamsFile(libraryDirectory);
		}
		logger.log(`Etherlime was successfully initialized! Check ${deploymentFileDestination} for your deployment script.`);
	} catch (e) {
		throw new Error(e.message);
	}
};

module.exports = {
	run
};

/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

const fs = __webpack_require__(1);
const defaultDeploymentFilePath = `deployment/deploy.js`;
const { logsStore, logger, AppenderTypes } = __webpack_require__(4);
const utils = __webpack_require__(37);
let compiler = __webpack_require__(9);
const Verifier = __webpack_require__(75);
const originalRequire = __webpack_require__(11);

const verifyDeploymentFile = (deploymentFile) => {
	if (!fs.existsSync(deploymentFile)) {
		throw new Error(`${deploymentFile} file not found. Probably you've not initialized etherlime. Please run etherlime init first.`)
	}
};

const getDeployMethod = (deploymentFilePath) => {
	const _deploymentFilePath = (deploymentFilePath) ? deploymentFilePath : defaultDeploymentFilePath;
	verifyDeploymentFile(_deploymentFilePath)
	const deploymentFile = `${process.cwd()}/${_deploymentFilePath}`;
	const deployModule = originalRequire(`${deploymentFile}`);

	return deployModule.deploy;
};

const run = async (deploymentFilePath, network, secret, silent, compile, runs, output, etherscanApiKey) => {
	if (compile && typeof (runs) === 'number') {
		await compiler.run('.', runs);
	} else if (compile) {
		await compiler.run('.');
	}
	const initialRecords = logsStore.getHistory();
	console.log()
	const deployMethod = getDeployMethod(deploymentFilePath);

	try {
		global.Verifier = new Verifier();
		await deployMethod(network, secret, etherscanApiKey);
		logger.log(`Your deployment script finished successfully!`);
	} catch (e) {
		if (!silent) {
			console.error(e);
		}

		logger.log(`Your deployment script finished with failure!`);
	}

	const records = logsStore.getHistory();

	if (initialRecords && initialRecords.length > 0) {
		if ((records.length == initialRecords.length) && records[records.length - 1]['actions'].length === initialRecords[initialRecords.length - 1]['actions'].length) {
			return
		}
	}

	const currentRecord = records[records.length - 1];
	logger.log(`\nHere is your report:`);

	if (output === AppenderTypes.NORMAL) {
		utils.printReportTable(currentRecord.actions);
	}
};

module.exports = {
	run
};

/***/ }),
/* 58 */
/***/ (function(module, exports) {

module.exports = require("cli-table");

/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

const path = __webpack_require__(0);
const OS = __webpack_require__(13);
const fs = __webpack_require__(7);

const Config = __webpack_require__(21);
const etherlimeCompile = __webpack_require__(39);
const expect = __webpack_require__(10);
const Resolver = __webpack_require__(15);
const Artifactor = __webpack_require__(44);

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


/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

const CompileError = __webpack_require__(41);
const preReleaseCompilerWarning = "This is a pre-release compiler version, please do not use it in production.";

const parseImports = (body, solc) => {
  const importErrorKey = "ETHERLIME_IMPORT";
  const failingImportFileName = "__Etherlime__NotFound.sol";

  body = body + "\n\nimport '" + failingImportFileName + "';\n";

  let solcStandardInput = {
    language: "Solidity",
    sources: {
      "ParsedContract.sol": {
        content: body
      }
    },
    settings: {
      outputSelection: {
        "ParsedContract.sol": {
          "*": []
        }
      }
    }
  };

  let output = solc.compile(JSON.stringify(solcStandardInput), () => {
    return { error: importErrorKey };
  });

  output = JSON.parse(output);

  let errors = output.errors.filter((solidity_error) => {
    return solidity_error.message.indexOf(preReleaseCompilerWarning) < 0;
  });

  let nonImportErrors = errors.filter((solidity_error) => {

    return solidity_error.formattedMessage.indexOf(importErrorKey) < 0;
  });

  if (nonImportErrors.length > 0) {
    throw new CompileError(nonImportErrors[0].formattedMessage);
  }

  let imports = errors.filter((solidity_error) => {
    return solidity_error.message.indexOf(failingImportFileName) < 0;
  }).map((solidity_error) => {
    let matches = solidity_error.formattedMessage.match(/import[^'"]+("|')([^'"]+)("|');/);

    return matches[2];
  });

  return imports;
}
module.exports = { parseImports }


/***/ }),
/* 61 */
/***/ (function(module, exports) {

module.exports = require("colors");

/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

var ExtendableBuiltin = __webpack_require__(63);

class ExtendableError extends ExtendableBuiltin(Error) {
  constructor(message) {
    super();
    this.message = message;
    this.stack = (new Error(message)).stack;
    this.name = this.constructor.name;
  }

  formatForMocha() {
    this.message = this.message.replace(/\n/g, "\n     ");
  };
}

module.exports = ExtendableError;


/***/ }),
/* 63 */
/***/ (function(module, exports) {

function ExtendableBuiltin(cls) {
  function ExtendableBuiltin() {
    cls.apply(this, arguments);
  }

  ExtendableBuiltin.prototype = Object.create(cls.prototype);
  Object.setPrototypeOf(ExtendableBuiltin, cls);

  return ExtendableBuiltin;
}

module.exports = ExtendableBuiltin;


/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

const dockerCLI = __webpack_require__(65);
const docker = new dockerCLI.Docker();
const path = __webpack_require__(0);
const fs = __webpack_require__(1);

const VYPER_EXTENSION = __webpack_require__(42).VYPER_EXTENSION;

const run = async (allFiles, options) => {

    const buildDirectory = options.contracts_build_directory;

    await docker.command("pull ethereum/vyper")

    for (let i = 0; i < allFiles.length; i++) {
        try {
            let filePath = path.normalize(path.relative(process.cwd(), allFiles[i])) //extract pure file path
            let fileBaseName = path.basename(filePath, VYPER_EXTENSION)
            let fileTimestampStatus = await getFileTimestampStatus(filePath)

            if (!await isFileUpdated(fileBaseName, fileTimestampStatus, buildDirectory)) {
                return
            }

            const displayPath = '.' + path.sep + filePath;
            console.log(`Compiling ${displayPath}...`);

            let compiledObject = await compile(filePath, fileBaseName, fileTimestampStatus)

            await options.artifactor.save(compiledObject, options, true)

        } catch (e) {
            console.error('Vyper compilation failed.')
            throw e;
        }
    }

}

//gets timestamp indicating the last time the file was changed or modified
const getFileTimestampStatus = async (filePath) => {
    let stats = fs.statSync(filePath)
    return (stats.ctime || stats.mtime).getTime()
}

//checks if file was changed or modified since once compiled
const isFileUpdated = async (fileBaseName, fileTimestampStatus, buildDirectory) => {
    let current;

    try {
        current = fs.readFileSync(`${buildDirectory}/${fileBaseName}.json`, 'utf8')
    } catch (e) {
        return true
    }

    current = JSON.parse(current)

    return (current.updatedAt < fileTimestampStatus)
}


const compile = async (filePath, fileBaseName, fileTimestampStatus) => {

    let data = await docker.command(`run  -v $(pwd):/code ethereum/vyper -f combined_json ${filePath}`)

    let compiledObject = JSON.parse(data.raw)
    compiledObject = Object.assign({ contractName: fileBaseName }, compiledObject[filePath]) //restructuring the compiled object
    compiledObject.updatedAt = fileTimestampStatus

    return compiledObject
}

module.exports = run;



/***/ }),
/* 65 */
/***/ (function(module, exports) {

module.exports = require("docker-cli-js");

/***/ }),
/* 66 */
/***/ (function(module, exports) {

module.exports = require("require-from-string");

/***/ }),
/* 67 */
/***/ (function(module, exports) {

module.exports = require("find-cache-dir");

/***/ }),
/* 68 */
/***/ (function(module, exports) {

module.exports = require("solc/wrapper");

/***/ }),
/* 69 */
/***/ (function(module, exports) {

module.exports = require("solc");

/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

const path = __webpack_require__(0);
const fs = __webpack_require__(1);

class EPM {
  constructor(working_directory, contracts_build_directory) {
    this.working_directory = working_directory;
    this.contracts_build_directory = contracts_build_directory;
  }

  resolve(import_path, imported_from) {
    return new Promise((resolve, reject) => {
      let separator = import_path.indexOf("/");
      let package_name = import_path.substring(0, separator);
      let internal_path = import_path.substring(separator + 1);
      let installDir = this.working_directory;

      let body;

      while (true) {
        let file_path = path.join(installDir, "installed_contracts", import_path);

        try {
          body = fs.readFileSync(file_path, { encoding: "utf8" });
          break;
        }
        catch (err) { }

        file_path = path.join(installDir, "installed_contracts", package_name, "contracts", internal_path)

        try {
          body = fs.readFileSync(file_path, { encoding: "utf8" });
          break;
        }
        catch (err) { }

        let oldInstallDir = installDir;
        installDir = path.join(installDir, '..');
        if (installDir === oldInstallDir) {
          break;
        }
      }

      return resolve({ body, import_path });
    });
  };

  resolve_dependency_path(import_path, dependency_path) {
    let dirname = path.dirname(import_path);
    let resolved_dependency_path = path.join(dirname, dependency_path);

    resolved_dependency_path = resolved_dependency_path.replace(/\\/g, "/");

    return resolved_dependency_path;
  }
}
module.exports = EPM;


/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

const path = __webpack_require__(0);
const fs = __webpack_require__(1);

class NPM {
  constructor(working_directory) {
    this.working_directory = working_directory;
  }
  resolve(import_path, imported_from) {
    return new Promise((resolve, reject) => {
      let body;
      let modulesDir = this.working_directory;

      while (true) {
        let expected_path = path.join(modulesDir, "node_modules", import_path);

        try {
          body = fs.readFileSync(expected_path, { encoding: "utf8" });
          break;
        } catch (error) { }

        let oldModulesDir = modulesDir;
        modulesDir = path.join(modulesDir, '..');
        if (modulesDir === oldModulesDir) {
          break;
        }
      }

      return resolve({ body, import_path });
    })
  }
  resolve_dependency_path(import_path, dependency_path) {
    let dirname = path.dirname(import_path);

    return path.join(dirname, dependency_path);
  }
}

module.exports = NPM;


/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

const path = __webpack_require__(0);
const fs = __webpack_require__(1);

class FS {
  constructor(working_directory, contracts_build_directory) {
    this.working_directory = working_directory;
    this.contracts_build_directory = contracts_build_directory;
  }

  getContractName(sourcePath, searchPath) {
    searchPath = searchPath || this.contracts_build_directory;

    let filenames = fs.readdirSync(searchPath);
    for (let i = 0; i < filenames.length; i++) {
      let filename = filenames[i];


      let artifact = JSON.parse(
        fs.readFileSync(path.resolve(searchPath, filename))
      );

      if (artifact.sourcePath == sourcePath) {
        return artifact.contractName;
      }
    };

    return path.basename(sourcePath, ".sol");
  }
  resolve(import_path, imported_from) {
    return new Promise(async (resolve, reject) => {
      imported_from = imported_from || "";

      let possible_paths = [
        import_path,
        path.join(path.dirname(imported_from), import_path)
      ];

      let resolved_body = null;
      let resolved_path = null;

      for (let i = 0; i < possible_paths.length; i++) {
        if (fs.existsSync(possible_paths[i])) {
          const body = fs.readFileSync(possible_paths[i], { encoding: "utf8" });
          if (body) {
            resolved_body = body;
            resolved_path = possible_paths[i];
            resolve({ body: resolved_body, import_path: resolved_path });
          }
        }
      }
      resolve({ body: resolved_body, import_path: resolved_path });
    })
  }
  resolve_dependency_path(import_path, dependency_path) {
    let dirname = path.dirname(import_path);
    return path.resolve(path.join(dirname, dependency_path));
  }
}

module.exports = FS;

/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

const pkgVersion = __webpack_require__(74).version;


/**
 * Property definitions for Contract Objects
 *
 * Describes canonical output properties as sourced from some "dirty" input
 * object. Describes normalization process to account for deprecated and/or
 * nonstandard keys and values.
 *
 * Maps (key -> property) where:
 *  - `key` is the top-level output key matching up with those in the schema
 *  - `property` is an object with optional values:
 *      - `sources`: list of sources (see below); default `key`
 *      - `transform`: function(value) -> transformed value; default x -> x
 *
 * Each source represents a means to select a value from dirty object.
 * Allows:
 *  - dot-separated (`.`) string, corresponding to path to value in dirty
 *    object
 *  - function(dirtyObj) -> (cleanValue | undefined)
 *
 * The optional `transform` parameter standardizes value regardless of source,
 * for purposes of ensuring data type and/or string schemas.
 */
let properties = {
  "contractName": {
    "sources": ["contractName", "contract_name"]
  },
  "abi": {
    "sources": ["abi", "interface"],
    "transform": (value) => {
      if (typeof value === "string") {
        try {
          value = JSON.parse(value)
        } catch (e) {
          value = undefined;
        }
      }
      return value;
    }
  },
  "bytecode": {
    "sources": [
      "bytecode", "binary", "unlinked_binary", "evm.bytecode.object"
    ],
    "transform": (value) => {
      if (value && value.indexOf("0x") != 0) {
        value = "0x" + value;
      }
      return value;
    }
  },
  "deployedBytecode": {
    "sources": [
      "deployedBytecode", "runtimeBytecode", "evm.deployedBytecode.object"
    ],
    "transform": (value) => {
      if (value && value.indexOf("0x") != 0) {
        value = "0x" + value;
      }
      return value;
    }
  },
  "sourceMap": {
    "sources": ["sourceMap", "srcmap", "evm.bytecode.sourceMap"]
  },
  "deployedSourceMap": {
    "sources": ["deployedSourceMap", "srcmapRuntime", "evm.deployedBytecode.sourceMap"]
  },
  "source": {},
  "sourcePath": {},
  "ast": {},
  "legacyAST": {
    "transform": (value, obj) => {
      let schemaVersion = obj.schemaVersion || "0.0.0";

      // legacyAST introduced in v2.0.0
      if (schemaVersion[0] < 2) {
        return obj.ast;
      } else {
        return value
      }
    }
  },
  "compiler": {},
  "networks": {
    "transform": (value) => {
      if (value === undefined) {
        value = {}
      }
      return value;
    }
  },
  "schemaVersion": {
    "sources": ["schemaVersion", "schema_version"]
  },
  "updatedAt": {
    "sources": ["updatedAt", "updated_at"],
    "transform": (value) => {
      if (typeof value === "number") {
        value = new Date(value).toISOString();
      }
      return value;
    }
  }
};

/**
 * Construct a getter for a given key, possibly applying some post-retrieve
 * transformation on the resulting value.
 *
 * @return {Function} Accepting dirty object and returning value || undefined
 */
let getter = (key) => {

  const transform = (x) => {
    return x
  };

  return (obj) => {
    return transform(obj[key]);
  }
}

/**
 * Chains together a series of function(obj) -> value, passing resulting
 * returned value to next function in chain.
 *
 * Accepts any number of functions passed as arguments
 * @return {Function} Accepting initial object, returning end-of-chain value
 *
 * Assumes all intermediary values to be objects, with well-formed sequence
 * of operations.
 */
let chain = function () {
  let getters = Array.prototype.slice.call(arguments);
  return (obj) => {
    return getters.reduce((cur, get) => {
      return get(cur);
    }, obj);
  }
}



let normalize = (objDirty, options) => {
  let normalized = {};

  Object.keys(properties).forEach((key) => {
    let property = properties[key];
    let value;

    let sources = property.sources || [key];

    for (let i = 0; value === undefined && i < sources.length; i++) {
      let source = sources[i];

      if (typeof source === "string") {
        let traversals = source.split(".")
          .map((k) => {
            return getter(k)
          });
        source = chain.apply(null, traversals);
      }

      value = source(objDirty);
    }

    if (property.transform) {
      value = property.transform(value, objDirty);
    }

    normalized[key] = value;
  });

  Object.keys(objDirty).forEach((key) => {
    if (key.indexOf("x-") === 0) {
      normalized[key] = getter(key)(objDirty);
    }
  });

  normalized.schemaVersion = pkgVersion;

  return normalized
}

module.exports = {
  normalize
}

/***/ }),
/* 74 */
/***/ (function(module, exports) {

module.exports = {"name":"etherlime","version":"2.0.1","description":"etherlime is an ethereum development and deployment framework based on ethers.js","main":"dist/etherlime-cli.js","scripts":{"postinstall":"node --eval 'console.log(\"By installing Etherlime you automatically opt-in for analytics. To opt-out run `etherlime opt-out`.\")'","prepare":"npm run build","build":"webpack --config webpack/webpack.config.js"},"nyc":{"exclude":["Solidity-IDE/*.js","test/**/*.js","tmpTest/**/*.js"]},"repository":{"type":"git","url":"https://github.com/LimeChain/etherlime/tree/master/packages/etherlime"},"keywords":[],"author":"http://www.limechain.tech","license":"ISC","dependencies":{"@0x/sol-coverage":"^3.0.0","axios":"^0.18.0","bn":"^1.0.1","chai":"4.1.2","circom":"LimeChain/circom","cli-table":"0.3.1","colors":"1.3.2","docker-cli-js":"^2.5.2","ethereum-transaction-debugger":"0.0.5","etherlime-config":"^1.0.0","etherlime-logger":"^1.0.0","etherlime-utils":"^1.0.0","ethers":"^4.0.27","find-cache-dir":"2.0.0","fs-extra":"7.0.1","ganache-cli":"^6.4.1","keen-tracking":"4.0.15","mocha":"5.2.0","original-require":"1.0.1","require-from-string":"2.0.2","simple-git":"^1.107.0","snarkjs":"LimeChain/snarkjs","solc":"^0.5.1","tcp-port-used":"^1.0.1","yargs":"11.0.0"},"devDependencies":{"babel-core":"^6.26.0","babel-loader":"^7.1.2","babel-plugin-transform-object-rest-spread":"^6.26.0","babel-plugin-transform-runtime":"^6.23.0","babel-preset-env":"^1.6.1","babel-runtime":"^6.26.0","mocha":"5.2.0","mocha-webpack":"^1.1.0","node-interval-tree":"^1.3.3","webpack":"^3.8.1","webpack-dev-middleware":"^2.0.4","webpack-merge":"^4.1.1","webpack-node-externals":"^1.6.0","write-file-webpack-plugin":"^4.2.0","nyc":"^13.3.0"},"bin":{"etherlime":"./cli.js"},"browser":{"fs":false,"fs-extra":false,"path":false,"os":false}}

/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

const { runWithoutWriteFiles } = __webpack_require__(45);
const axios = __webpack_require__(43);
const querystring = __webpack_require__(77);
const logger = __webpack_require__(4).logger;
const colors = __webpack_require__(3).colors;
const ethers = __webpack_require__(5);
const DEFAULT_SEND_REQUEST_TIMEOUT = 10000;
const DEFAULT_CHECK_STATUS_TIMEOUT = 5000;
const MODULE_NAME = 'contract';
const ACTION_VERIFY_SOURCE = 'verifysourcecode';
const ACTION_VERIFY_STATUS = 'checkverifystatus';
class Verifier {

	constructor() {

	}

	async verifySmartContract(contractWrapper, deploymentArguments, libraries, defaultOverrides) {

		const etherscanApiKey = defaultOverrides.etherscanApiKey;
		const contractName = contractWrapper._contract.contractName;
		const flattenedCode = await this._flattenSourceCode(contractWrapper);
		const constructorArguments = await this._buildConstructorArguments(contractWrapper, deploymentArguments);
		const contractLibraries = this._buildLibrariesArguments(libraries);
		const { apiUrl, networkName } = await this._buildApiUrl(contractWrapper);
		const solcVersionCompiler = this._buildSolcVersionCompiler(contractWrapper._contract.compiler.version);
		logger.log(`Attempting to verify your contract: ${colors.colorName(contractName)} on network ${colors.colorParams(networkName)}`);
		let data = this._constructRequestData(etherscanApiKey, contractWrapper, contractLibraries, flattenedCode, solcVersionCompiler, constructorArguments);

		const response = await this._sendVerificationRequest(data, defaultOverrides, apiUrl);
		return await this._checkVerificationStatus(response, defaultOverrides, contractName, apiUrl);
	}

	async _flattenSourceCode(contractWrapper) {
		const regexp = /[0-9]?\.[0-9]?\.[0-9]?/;
		const solcVersion = regexp.exec(contractWrapper._contract.compiler.version)[0];
		const sourceCode = await runWithoutWriteFiles(`${contractWrapper._contract.contractName}.sol`, solcVersion);
		return sourceCode
	}

	async _buildConstructorArguments(contractWrapper, deploymentArguments) {
		if (!deploymentArguments.length) {
			return;
		}
		let encoder = new ethers.utils.AbiCoder();
		let types = [];
		for (let i = 0; i < contractWrapper.interface.deployFunction.inputs.length; i++) {
			types.push(contractWrapper.interface.deployFunction.inputs[i].type);
		}
		let encodedConstructorArgs = (await encoder.encode(types, deploymentArguments)).substr(2);
		return encodedConstructorArgs;
	}

	_buildLibrariesArguments(libraries) {
		if (!libraries || Object.keys(libraries).length === 0) {
			return
		}
		let arrayLib = Object.entries(libraries).map(([key, value]) => ({ name: key, address: value }));
		return arrayLib
	}

	_buildSolcVersionCompiler(solcVersion) {
		const version = `v${solcVersion.replace(/.Emscripten.clang/g, '')}`;
		return version;
	}

	async _buildApiUrl(contractWrapper) {
		const { name } = await contractWrapper.provider.getNetwork();

		if ((/^(ropsten|rinkeby|kovan|goerli)$/.test(name))) {
			return { apiUrl: `https://api-${name}.etherscan.io/api`, networkName: name };
		}
		return { apiUrl: 'https://api.etherscan.io/api', networkName: name };
	}

	_constructRequestData(etherscanApiKey, contractWrapper, contractLibraries, flattenedCode, solcVersionCompiler, constructorArguments) {
		let data = {
			apikey: etherscanApiKey,
			module: MODULE_NAME,
			action: ACTION_VERIFY_SOURCE, // DO NOT CHANGE
			contractaddress: contractWrapper.contractAddress,
			sourceCode: flattenedCode,
			contractname: contractWrapper._contract.contractName,
			compilerversion: solcVersionCompiler,
			optimizationUsed: contractWrapper._contract.compiler.optimizer ? 1 : 0,
			runs: contractWrapper._contract.compiler.runs,
			constructorArguements: constructorArguments
		}
		if (contractLibraries) {
			for (let i = 0; i < contractLibraries.length; i++) {
				let index = i + 1
				data[`libraryname${index}`] = contractLibraries[i].name;
				data[`libraryaddress${index}`] = contractLibraries[i].address;
			}
		}
		let stringData = querystring.stringify(data);
		return stringData
	}

	async _sendVerificationRequest(stringData, defaultOverrides, apiUrl) {

		const ms = defaultOverrides.waitInterval || DEFAULT_SEND_REQUEST_TIMEOUT;
		const self = this;
		async function sendRequest(ms, count) {
			const response = await axios.post(apiUrl, stringData);
			if (!(count > 10)) {
				if (response.data.message !== 'OK') {
					logger.log('Processing verification. Please wait. It might take a few minutes')
					await self.timeout(ms);
					return await sendRequest(ms, ++count);
				}
				logger.log(`Request successfully sent, your GUID is ${colors.colorParams(response.data.result)}`);
				return response.data
			}
			throw new Error('Contract Verification Timeout! Please try again');

		}
		await self.timeout(ms)
		return sendRequest(ms, 0);

	}

	async _checkVerificationStatus(response, defaultOverrides, contractName, apiUrl) {
		let params = {
			guid: response.result,
			module: MODULE_NAME,
			action: ACTION_VERIFY_STATUS
		};
		const ms = defaultOverrides.waitInterval || DEFAULT_CHECK_STATUS_TIMEOUT;
		const self = this;
		async function checkGuid(ms, count) {
			const response = await axios.get(apiUrl, { params });
			if (!(count > 10)) {
				if (response.data.result !== 'Pending in queue') {
					return response.data
				}
				logger.log('Pending...')
				logger.log('Please wait...')
				await self.timeout(ms);
				return await checkGuid(ms, ++count);
			}
			throw new Error('Contract Verification Timeout! Check Final Status on Etherscan');

		}
		await self.timeout(ms);
		const result = await checkGuid(ms, 0);
		if (result.message !== 'OK') {
			logger.log(`Contract: ${colors.colorName(contractName)} verification failed with error: ${colors.colorFailure(result.result)}`);
			return result.result;
		}
		logger.log(`Contract: ${colors.colorName(contractName)} is verified ${colors.colorSuccess('successfully!')}`);
		return 'Success';
	};

	timeout(ms) {
		return new Promise(resolve => setTimeout(resolve, ms));
	}
}

module.exports = Verifier;


/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

let Resolver = __webpack_require__(15);
let CompilerSupplier = __webpack_require__(14);

let resolverOptions = {
    "working_directory": `${process.cwd()}`,
    "contracts_build_directory": `${process.cwd()}/build`,
    "quiet": false
};

let resolver = new Resolver(resolverOptions);

var supplier = new CompilerSupplier({
    version: undefined,
    docker: false
})

module.exports = {
    resolver,
    supplier
}

/***/ }),
/* 77 */
/***/ (function(module, exports) {

module.exports = require("querystring");

/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

const { logsStore, logger, AppenderTypes } = __webpack_require__(4);
const utils = __webpack_require__(37);

const run = async (limit, output) => {
	const history = logsStore.getHistory();
	const start = (history.length > limit) ? history.length - limit : 0;	
	for (let i = start; i < history.length; i++) {
		logger.log(`Execution ID: ${i}:`)
		const currentRecord = history[i];

		if (output === AppenderTypes.NORMAL) {
			utils.printReportTable(currentRecord.actions);
			logger.log();
		}
	}
};


module.exports = {
	run
};

/***/ }),
/* 79 */
/***/ (function(module, exports) {

module.exports = require("web3-provider-engine");

/***/ }),
/* 80 */
/***/ (function(module, exports) {

module.exports = require("web3-provider-engine/subproviders/rpc.js");

/***/ }),
/* 81 */
/***/ (function(module, exports) {

module.exports = require("@0x/sol-compiler");

/***/ }),
/* 82 */
/***/ (function(module, exports) {

module.exports = require("istanbul");

/***/ }),
/* 83 */
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	throw new Error("Cannot find module '" + req + "'.");
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = 83;

/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

const git = __webpack_require__(49)()
const util = __webpack_require__(8);
const exec = util.promisify(__webpack_require__(6).exec);
const repoToUrlMap = __webpack_require__(85).repoToUrlMap;


const cloneRepo = async (url) => {
    console.log('====== Cloning repository =====')
    await git.init()
    await git.addRemote('origin', url)
    await git.pull('origin', 'master')
}

const installProjectsModules = async () => {
    console.log('====== Installing projects modules =====')
    await exec('npm install')
}

const getRepo = (framework) => {
    let url = repoToUrlMap.get(framework)

    if (!url) {
        throw new Error(`Invalid shape ${framework}`)
    }
    return `https://github.com/${url}`
}

const run = async (name) => {

    let repo = getRepo(name)
    console.log(`====== Shaping ${name} dApp =====`)
    await cloneRepo(repo)
    await installProjectsModules()
    console.log('====== Shaping finished successful! =====')
    return
}

module.exports = {
    run
};

/***/ }),
/* 85 */
/***/ (function(module, exports) {

let repoToUrlMap = new Map();

repoToUrlMap.set('angular', 'LimeChain/etherlime-shape-angular.git');
repoToUrlMap.set('react', 'LimeChain/etherlime-shape-react.git');
repoToUrlMap.set('monoplasma', 'LimeChain/etherlime-shape-monoplasma.git');

module.exports = { repoToUrlMap }

/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

const KeenTracking = __webpack_require__(87);
const analytics = __webpack_require__(88);
const debugTestModule = 'nyc';
const fs = __webpack_require__(7);
const originalRequire = __webpack_require__(11);

let isProd = false;
try {
	originalRequire(`${debugTestModule}`);
} catch (e) {
	if (e.message.includes(`Cannot find module '${debugTestModule}'`)) {
		isProd = true;
	} else {
		throw e
	}
}

const analyticsClient = new KeenTracking({
	projectId: analytics.projectId,
	writeKey: analytics.writeKey
});

const recordEvent = (command, params) => {
	if (!isProd || analytics.optOut) {
		return false
	}
	analyticsClient.recordEvent(command, {
		params
	});
	return true
}

const optOutUser = () => {
	analytics.optOut = true;
	const spaces = 4; // number of space characters to be inserted for readability purposes
	fs.writeFileSync(`${__dirname}/analytics.json`, JSON.stringify(analytics, null, spaces)) //second param is a string replacer if needed
}

module.exports = {
	analyticsClient,
	recordEvent,
	optOutUser
};

/***/ }),
/* 87 */
/***/ (function(module, exports) {

module.exports = require("keen-tracking");

/***/ }),
/* 88 */
/***/ (function(module, exports) {

module.exports = {"projectId":"5bd2f7bcc9e77c0001739419","writeKey":"083B02F37B8AF77598EA87A946E8CFC92D5660A0FDF1E3489F25E720502E59E45FCBA59E0F6CB6679D5E3A3B5EEBC52ABA25EE432D29E17C02769320859EC57A3ED338E5FE5DE5414CFB358F19EE37930DEAA206602793BF8FA64046BFD47430"}

/***/ }),
/* 89 */
/***/ (function(module, exports, __webpack_require__) {


const OS = __webpack_require__(13);
const path = __webpack_require__(0);
const util = __webpack_require__(8);

const debugModule = __webpack_require__(50);
const debug = debugModule("lib:commands:debug");
const safeEval = __webpack_require__(90);
const BN = __webpack_require__(91);
const ethers = __webpack_require__(5);
const colors = __webpack_require__(3).colors;
let port;
let provider;



const ReplManager = __webpack_require__(92);

const Artifactor = __webpack_require__(44);
const compile = __webpack_require__(39);
const Resolver = __webpack_require__(15);
const compiler = __webpack_require__(9);

const Debugger = __webpack_require__(51);
const selectors = __webpack_require__(51).selectors;

const DebugUtils = __webpack_require__(95);


// Debugger Session properties
const trace = selectors.trace;
const solidity = selectors.solidity;
const controller = selectors.controller;

const config = {
	"contracts_directory": `${process.cwd()}/contracts`,
	"working_directory": `${process.cwd()}`,
	"contracts_build_directory": `${process.cwd()}/build`,
	"artifactor": new Artifactor(`${process.cwd()}/build`),
	"compilers": {
		"solc": {
			"version": undefined,
			"docker": undefined
		}
	},
	"build_directory": `${process.cwd()}/build`,
	networks: {
		development: {
			host: "127.0.0.1",     // Localhost (default: none)
			port: 8545,            // Standard Ethereum port (default: none)
			network_id: "*",       // Any network (default: none)
		}
	},
	network: "etherlime ganache"
};
config.resolver = new Resolver(config)
config.solc = {
	optimizer: { enabled: false, runs: 200 },
};

let lastCommand = "n";
let enabledExpressions = new Set();

let txHash;


let sessionInterpreter = (session, repl) => {
	return async function interpreter(cmd) {
		cmd = cmd.trim();
		let cmdArgs, splitArgs;
		debug("cmd %s", cmd);

		//split arguments for commands that want that; split on runs of spaces
		splitArgs = cmd
			.trim()
			.split(/ +/)
			.slice(1);
		debug("splitArgs %O", splitArgs);

		//warning: this bit *alters* cmd!
		if (cmd.length > 0) {
			cmdArgs = cmd.slice(1).trim();
			cmd = cmd[0];
		}

		if (cmd === "") {
			cmd = lastCommand;
		}

		//quit if that's what we were given
		if (cmd === "q") {
			console.log('Exiting debugger...')
			return await util.promisify(repl.stop.bind(repl))();
		}

		let alreadyFinished = session.view(trace.finished);

		// If not finished, perform commands that require state changes
		// (other than quitting or resetting)
		if (!alreadyFinished) {
			switch (cmd) {
				case "o":
					await session.stepOver();
					break;
				case "i":
					await session.stepInto();
					break;
				case "u":
					await session.stepOut();
					break;
				case "n":
					await session.stepNext();
					break;
				case ";":
					await session.advance();
					break;
				case "c":
					await session.continueUntilBreakpoint();
					break;
			}
		} //otherwise, inform the user we can't do that
		else {
			switch (cmd) {
				case "o":
				case "i":
				case "u":
				case "n":
				case ";":
				case "c":
					console.log(`${colors.colorFailure('Transaction has halted; cannot advance.')}`);
					console.log("");
			}
		}
		if (cmd === "r") {
			//reset if given the reset command
			await session.reset();
		}

		// Check if execution has (just now) stopped.
		if (session.view(trace.finished) && !alreadyFinished) {
			console.log("");
			//check if transaction failed
			if (!session.view(selectors.session.transaction.receipt).status) {
				console.log(`${colors.colorFailure('Transaction halted with a RUNTIME ERROR.')}`);
				console.log("");
				console.log(
					"This is likely due to an intentional halting expression, like assert(), require() or revert(). It can also be due to out-of-gas exceptions. Please inspect your transaction parameters and contract code to determine the meaning of this error."
				);
			} else {
				//case if transaction succeeded
				console.log(`${colors.colorSuccess('Transaction completed successfully.')}`);
			}
		}

		// Perform post printing
		// (we want to see if execution stopped before printing state).
		switch (cmd) {
			case "+":
				enabledExpressions.add(cmdArgs);
				await printWatchExpressionResult(cmdArgs, session);
				break;
			case "-":
				enabledExpressions.delete(cmdArgs);
				console.log('Expression removed!')
				break;
			case "!":
				printSelector(cmdArgs, session);
				break;
			case "?":
				printWatchExpressions();
				break;
			case "v":
				await printVariables(session);
				break;
			case ":":
				evalAndPrintExpression(cmdArgs, undefined, undefined, session);
				break;
			case "b":
				await setOrClearBreakpoint(splitArgs, true, session);
				break;
			case "B":
				await setOrClearBreakpoint(splitArgs, false, session);
				break;
			case ";":
			case "p":
				printFile(session);
				printInstruction(session);
				printState(session);
				await printWatchExpressionsResults(session);
				break;
			case "o":
			case "i":
			case "u":
			case "n":
			case "c":
				if (!session.view(trace.finished)) {
					if (!session.view(solidity.current.source).source) {
						printInstruction(session);
					}

					printFile(session);
					printState(session);
				}
				await printWatchExpressionsResults(session);
				break;
			case "r":
				printAddressesAffected(session);
				printFile(session);
				printState(session);
				break;
			default:
				printHelp();
		}

		if (
			cmd !== "i" &&
			cmd !== "u" &&
			cmd !== "b" &&
			cmd !== "B" &&
			cmd !== "v" &&
			cmd !== "h" &&
			cmd !== "p" &&
			cmd !== "?" &&
			cmd !== "!" &&
			cmd !== ":" &&
			cmd !== "+" &&
			cmd !== "r" &&
			cmd !== "-"
		) {
			lastCommand = cmd;
		}
	}
}

let setOrClearBreakpoint = async (args, setOrClear, session) => {
	//setOrClear: true for set, false for clear
	let currentLocation = session.view(controller.current.location);
	let breakpoints = session.view(controller.breakpoints);

	let currentNode = currentLocation.node.id;
	let currentLine = currentLocation.sourceRange.lines.start.line;
	let currentSourceId = currentLocation.source.id;

	let sourceName; //to be used if a source is entered

	let breakpoint = {};

	debug("args %O", args);

	if (args.length === 0) {
		//no arguments, want currrent node
		debug("node case");
		breakpoint.node = currentNode;
		breakpoint.line = currentLine;
		breakpoint.sourceId = currentSourceId;
	}

	//the special case of "B all"
	else if (args[0] === "all") {
		if (setOrClear) {
			// only "B all" is legal, not "b all"
			console.log("Cannot add breakpoint everywhere.\n");
			return;
		}
		await session.removeAllBreakpoints();
		console.log("Removed all breakpoints.\n");
		return;
	}

	//if the argument starts with a "+" or "-", we have a relative
	//line number
	else if (args[0][0] === "+" || args[0][0] === "-") {
		debug("relative case");
		let delta = parseInt(args[0], 10); //want an integer
		debug("delta %d", delta);
		if (isNaN(delta)) {
			console.log("Offset must be an integer.\n");
			return;
		}
		breakpoint.sourceId = currentSourceId;
		breakpoint.line = currentLine + delta;
	}

	//if it contains a colon, it's in the form source:line
	else if (args[0].includes(":")) {
		debug("source case");
		let sourceArgs = args[0].split(":");
		let sourceArg = sourceArgs[0];
		let lineArg = sourceArgs[1];
		debug("sourceArgs %O", sourceArgs);

		//first let's get the line number as usual
		let line = parseInt(lineArg, 10); //want an integer
		if (isNaN(line)) {
			console.log("Line number must be an integer.\n");
			return;
		}

		//search sources for given string
		let sources = session.view(solidity.info.sources);

		//we will indeed need the sources here, not just IDs
		let matchingSources = Object.values(sources).filter(source =>
			source.sourcePath.includes(sourceArg)
		);

		if (matchingSources.length === 0) {
			console.log(
				`No source file found matching ${sourceArg}.\n`
			);
			return;
		} else if (matchingSources.length > 1) {
			console.log(
				`Multiple source files found matching ${sourceArg}.  Which did you mean?`
			);
			matchingSources.forEach(source =>
				console.log(source.sourcePath)
			);
			console.log("");
			return;
		}

		//otherwise, we found it!
		sourceName = path.basename(matchingSources[0].sourcePath);
		breakpoint.sourceId = matchingSources[0].id;
		breakpoint.line = line - 1; //adjust for zero-indexing!
	}

	//otherwise, it's a simple line number
	else {
		debug("absolute case");
		let line = parseInt(args[0], 10); //want an integer
		debug("line %d", line);

		if (isNaN(line)) {
			console.log("Line number must be an integer.\n");
			return;
		}

		breakpoint.sourceId = currentSourceId;
		breakpoint.line = line - 1; //adjust for zero-indexing!
	}

	//having constructed the breakpoint, here's now a user-readable
	//message describing its location
	let locationMessage;
	if (breakpoint.node !== undefined) {
		locationMessage = `this point in line ${breakpoint.line + 1}`;
		//+1 to adjust for zero-indexing
	} else if (breakpoint.sourceId !== currentSourceId) {
		//note: we should only be in this case if a source was entered!
		//if no source as entered and we are here, something is wrong
		locationMessage = `line ${breakpoint.line + 1} in ${sourceName}`;
		//+1 to adjust for zero-indexing
	} else {
		locationMessage = `line ${breakpoint.line + 1}`;
		//+1 to adjust for zero-indexing
	}

	//one last check -- does this breakpoint already exist?
	let alreadyExists =
		breakpoints.filter(
			existingBreakpoint =>
				existingBreakpoint.sourceId === breakpoint.sourceId &&
				existingBreakpoint.line === breakpoint.line &&
				existingBreakpoint.node === breakpoint.node //may be undefined
		).length > 0;

	//NOTE: in the "set breakpoint" case, the above check is somewhat
	//redundant, as we're going to check again when we actually make the
	//call to add or remove the breakpoint!  But we need to check here so
	//that we can display the appropriate message.  Hopefully we can find
	//some way to avoid this redundant check in the future.

	//if it already exists and is being set, or doesn't and is being
	//cleared, report back that we can't do that
	if (setOrClear === alreadyExists) {
		if (setOrClear) {
			console.log(
				`Breakpoint at ${locationMessage} already exists.\n`
			);
			return;
		} else {
			console.log(
				`No breakpoint at ${locationMessage} to remove.\n`
			);
			return;
		}
	}

	//finally, if we've reached this point, do it!
	//also report back to the user on what happened
	if (setOrClear) {
		await session.addBreakpoint(breakpoint);
		console.log(`Breakpoint added at ${locationMessage}.\n`);
	} else {
		await session.removeBreakpoint(breakpoint);
		console.log(`Breakpoint removed at ${locationMessage}.\n`);
	}
	return;
}

let splitLines = (str) => {
	// We were splitting on OS.EOL, but it turns out on Windows,
	// in some environments (perhaps?) line breaks are still denoted by just \n
	return str.split(/\r?\n/g);
}

let printAddressesAffected = (session) => {
	const affectedInstances = session.view(
		selectors.session.info.affectedInstances
	);

	console.log("Contracts and addresses affected:");
	console.log(
		DebugUtils.formatAffectedInstances(affectedInstances)
	);
}

let printHelp = () => {
	console.log("");
	console.log(DebugUtils.formatHelp());
}

let printFile = (session) => {
	let message = "";

	debug("about to determine sourcePath");
	const sourcePath = session.view(solidity.current.source).sourcePath;

	if (sourcePath) {
		message += path.basename(sourcePath);
	} else {
		message += "?";
	}

	console.log("");
	console.log(message + ":");
}

let printState = (session) => {
	const source = session.view(solidity.current.source).source;
	const range = session.view(solidity.current.sourceRange);

	debug("source: %o", source);
	debug("range: %o", range);

	if (!source) {
		console.log();
		console.log("1: // No source code found.");
		console.log("");
		return;
	}

	let lines = splitLines(source);

	console.log("");
	console.log(DebugUtils.formatRangeLines(lines, range.lines));

	console.log("");
}

let printInstruction = (session) => {
	const instruction = session.view(solidity.current.instruction);
	const step = session.view(trace.step);
	const traceIndex = session.view(trace.index);

	console.log("");
	console.log(
		DebugUtils.formatInstruction(traceIndex, instruction)
	);
	console.log(DebugUtils.formatStack(step.stack));
}

let select = (expr, session) => {
	let selector, result;

	try {
		selector = expr
			.split(".")
			.filter(function (next) {
				return next.length > 0;
			})
			.reduce(function (sel, next) {
				return sel[next];
			}, selectors);
	} catch (_) {
		throw new Error("Unknown selector: %s", expr);
	}

	// throws its own exception
	result = session.view(selector);

	return result;
}

/**
 * @param {string} selector
 */
let printSelector = (selector, session) => {
	const result = select(selector, session);
	const debugSelector = debugModule(selector);
	debugSelector.enabled = true;
	debugSelector("%O", result);
}

let printWatchExpressions = () => {
	if (enabledExpressions.size === 0) {
		console.log("No watch expressions added.");
		return;
	}

	console.log("");
	enabledExpressions.forEach(function (expression) {
		console.log("  " + expression);
	});
}

let printWatchExpressionsResults = async (session) => {
	debug("enabledExpressions %o", enabledExpressions);
	await Promise.all(
		[...enabledExpressions].map(async expression => {
			console.log(expression);
			// Add some padding. Note: This won't work with all loggers,
			// meaning it's not portable. But doing this now so we can get something
			// pretty until we can build more architecture around this.
			// Note: Selector results already have padding, so this isn't needed.
			if (expression[0] === ":") {
				process.stdout.write("  ");
			}
			await printWatchExpressionResult(expression, session);
		})
	);
}

let printWatchExpressionResult = async (expression, session) => {
	const type = expression[0];
	const exprArgs = expression.substring(1);

	if (type === "!") {
		printSelector(exprArgs, session);
	} else {
		await evalAndPrintExpression(exprArgs, 2, true, session);
	}
}

// TODO make this more robust for all cases and move to
// truffle-debug-utils
let formatValue = (value, indent) => {
	if (!indent) {
		indent = 0;
	}

	return util
		.inspect(value, {
			colors: true,
			depth: null,
			breakLength: 30
		})
		.split(/\r?\n/g)
		.map(function (line, i) {
			// don't indent first line
			let padding = i > 0 ? Array(indent).join(" ") : "";
			return padding + line;
		})
		.join(OS.EOL);
}

let printVariables = async (session) => {
	const variables = await session.variables();
	debug("variables %o", variables);

	// Get the length of the longest name.
	const longestNameLength = Math.max.apply(
		null,
		Object.keys(variables).map(function (name) {
			return name.length;
		})
	);

	console.log();

	Object.keys(variables).forEach(function (name) {
		let paddedName = name + ":";

		while (paddedName.length <= longestNameLength) {
			paddedName = " " + paddedName;
		}

		let value = variables[name];
		let formatted = formatValue(value, longestNameLength + 5);

		console.log("  " + paddedName, formatted);
	});

	console.log();
}

/**
 * Convert all !<...> expressions to JS-valid selector requests
 */
let preprocessSelectors = (expr) => {
	const regex = /!<([^>]+)>/g;
	const select = "$"; // expect repl context to have this func
	const replacer = (_, selector) => `${select}("${selector}")`;

	return expr.replace(regex, replacer);
}

/**
 * @param {string} raw - user input for watch expression
 *
 * performs pre-processing on `raw`, using !<...> delimeters to refer
 * to selector expressions.
 *
 * e.g., to see a particular part of the current trace step's stack:
 *
 *    debug(development:0x4228cdd1...)>
 *
 *        :!<trace.step.stack>[1]
 */
let evalAndPrintExpression = async (raw, indent, suppress, session) => {
	let context = Object.assign(
		{ $: select },

		await session.variables()
	);

	const expr = preprocessSelectors(raw);

	try {
		let result = safeEval(expr, context);
		let formatted = formatValue(result, indent);
		console.log(formatted);
		console.log();
	} catch (e) {
		// HACK: safeEval edits the expression to capture the result, which
		// produces really weird output when there are errors. e.g.,
		//
		//   evalmachine.<anonymous>:1
		//   SAFE_EVAL_857712=a
		//   ^
		//
		//   ReferenceError: a is not defined
		//     at evalmachine.<anonymous>:1:1
		//     at ContextifyScript.Script.runInContext (vm.js:59:29)
		//
		// We want to hide this from the user if there's an error.
		e.stack = e.stack.replace(/SAFE_EVAL_\d+=/, "");
		if (!suppress) {
			console.log(e);
		} else {
			console.log(formatValue(undefined));
		}
	}
}

let compileAllContracts = async (config) => {

	return new Promise(async (resolve, reject) => {
		let result;
		try {
			result = await compile.all(config);
			return resolve({
				contracts: result.returnVal,
				files: result.files
			});
		} catch (err) {
			return reject(err);
		}
	});
}

const run = async function (inputParams, inputPort) {
	// set the port for running the provider of the debugger
	port = inputPort;

	// set the provider with the desired port
	provider = new ethers.providers.JsonRpcProvider(`http://localhost:${port}`);

	//add custom inspect options for BNs
	BN.prototype[util.inspect.custom] = function (depth, inputParams) {
		return inputParams.stylize(this.toString(), "number");
	};

	console.log(DebugUtils.formatStartMessage());

	return new Promise(async (resolve, reject) => {
		txHash = inputParams;
		try {
			const compileResult = await compileAllContracts(config);
			const debuggerConfig = {
				provider: provider,
				files: compileResult.files,
				contracts: Object.keys(compileResult.contracts).map(function (name) {
					const contract = compileResult.contracts[name];
					return {
						contractName: contract.contractName || contract.contract_name,
						source: contract.source,
						sourcePath: contract.sourcePath,
						ast: contract.ast,
						binary: contract.binary || contract.bytecode,
						sourceMap: contract.sourceMap,
						deployedBinary: contract.deployedBinary || contract.deployedBytecode,
						deployedSourceMap: contract.deployedSourceMap,
						compiler: contract.compiler
					};
				})
			}

			const bugger = await Debugger.forTx(txHash, debuggerConfig);


			const session = bugger.connect()

			printAddressesAffected(session);
			printHelp();
			debug("Help printed");
			printFile(session);
			debug("File printed");
			printState(session);
			debug("State printed");

			let repl = inputParams.repl || new ReplManager(config);

			repl.start({
				prompt:
					"debugging(" +
					`${colors.colorNetwork(config.network)}` +
					":" +
					`${colors.colorTransactionHash(txHash)}` +
					")> ",
				interpreter: util.callbackify(sessionInterpreter(session, repl)),
				ignoreUndefined: true,
				done: resolve
			});
		} catch (err) {
			console.log(err);
			reject(err);
		}
	})

}

module.exports = {
	run
};

/***/ }),
/* 90 */
/***/ (function(module, exports) {

module.exports = require("safe-eval");

/***/ }),
/* 91 */
/***/ (function(module, exports) {

module.exports = require("bn.js");

/***/ }),
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

const repl = __webpack_require__(93);
const expect = __webpack_require__(10);
const EventEmitter = __webpack_require__(94);

class ReplManager extends EventEmitter {

	constructor(options) {
		super()
		EventEmitter.call(this);
		expect.options(options, [
			"working_directory",
			"contracts_directory",
			"contracts_build_directory",
			"build_directory"
		]);

		this.options = options;
		this.repl = options.repl;

		this.contexts = [];
	}

	start(options) {
		let self = this;
		this.contexts.push({
			prompt: options.prompt,
			interpreter: options.interpreter,
			ignoreUndefined: options.ignoreUndefined,
			done: options.done
		});

		let currentContext = this.contexts[this.contexts.length - 1];

		if (!this.repl) {
			this.repl = repl.start({
				prompt: currentContext.prompt,
				eval: this.interpret.bind(this)
			});
		}

		// Bubble the internal repl's exit event
		this.repl.on("exit", function () {
			self.emit("exit");
			console.log('Exiting...')
		});

		this.activate(options);
	};


	activate(session) {
		const { prompt, context, ignoreUndefined } = session;
		this.repl.setPrompt(prompt);
		this.repl.ignoreUndefined = ignoreUndefined;
	};


	stop(callback) {
		const oldContext = this.contexts.pop();
		if (oldContext.done) {
			oldContext.done();
		}

		process.exit();
	};

	interpret(cmd, context, filename, callback) {
		let currentContext = this.contexts[this.contexts.length - 1];
		currentContext.interpreter(cmd, context, filename, callback);
	};

}

module.exports = ReplManager;


/***/ }),
/* 93 */
/***/ (function(module, exports) {

module.exports = require("repl");

/***/ }),
/* 94 */
/***/ (function(module, exports) {

module.exports = require("events");

/***/ }),
/* 95 */
/***/ (function(module, exports, __webpack_require__) {

const OS = __webpack_require__(13);
const path = __webpack_require__(0);
const debug = __webpack_require__(50)("lib:debug");
const colors = __webpack_require__(3).colors;

const commandReference = {
  "o": "step over",
  "i": "step into",
  "u": "step out",
  "n": "step next",
  ";": "step instruction",
  "p": "print instruction",
  "h": "print this help",
  "v": "print variables and values",
  ":": `evaluate expression - see ${colors.colorCommand('`v`')}`,
  "+": `add watch expression (${colors.colorCommand('`+:<expr>`')})`,
  "-": `remove watch expression (${colors.colorCommand('`-:<expr>`')})`,
  "?": "list existing watch expressions",
  "b": "add breakpoint",
  "B": "remove breakpoint",
  "c": "continue until breakpoint",
  "q": "quit",
  "r": "reset"
};


let formatStartMessage = () => {
  const lines = ["", "Loading transaction data...", ""];

  return lines.join(OS.EOL);
}

let formatCommandDescription = (commandId) => {
  return "(" + `${colors.colorCommand(commandId)}` + ") " + commandReference[commandId];
}

let formatAffectedInstances = (instances) => {
  let hasAllSource = true;

  let lines = Object.keys(instances).map(function (address) {
    let instance = instances[address];

    if (instance.contractName) {
      return " " + `${colors.colorAddress(address)}` + " - " + `${colors.colorName(instance.contractName)}`;
    }

    if (!instance.source) {
      hasAllSource = false;
    }

    return " " + address + "(UNKNOWN)";
  });

  if (!hasAllSource) {
    lines.push("");
    lines.push(
      "Warning: The source code for one or more contracts could not be found."
    );
  }

  return lines.join(OS.EOL);
}

let formatHelp = (lastCommand) => {
  if (!lastCommand) {
    lastCommand = "n";
  }

  let prefix = [
    `${colors.colorName("Commands:")}`,
    `(${colors.colorCommand('enter')}) last command entered (${colors.colorCommand(commandReference[lastCommand])})`
  ];

  let commandSections = [
    ["o", "i", "u", "n", ";"],
    ["p", "h", "q", "r"],
    ["b", "B", "c"],
    ["+", "-"],
    ["?"],
    ["v", ":"]
  ].map(function (shortcuts) {
    return shortcuts.map(formatCommandDescription).join(", ");
  });

  let suffix = [""];

  let lines = prefix.concat(commandSections).concat(suffix);

  return lines.join(OS.EOL);
}

let formatLineNumberPrefix = (line, number, cols, tab) => {
  if (!tab) {
    tab = "  ";
  }

  let prefix = number + "";
  while (prefix.length < cols) {
    prefix = " " + prefix;
  }

  prefix += ": ";
  return prefix + line.replace(/\t/g, tab);
}

let formatLinePointer = (line, startCol, endCol, padding, tab) => {
  if (!tab) {
    tab = "  ";
  }

  padding += 2; // account for ": "
  let prefix = "";
  while (prefix.length < padding) {
    prefix += " ";
  }

  let output = "";
  for (let i = 0; i < line.length; i++) {
    let pointedAt = i >= startCol && i < endCol;
    let isTab = line[i] === "\t";

    let additional;
    if (isTab) {
      additional = tab;
    } else {
      additional = " "; // just a space
    }

    if (pointedAt) {
      additional = additional.replace(/./g, `${colors.colorName('^')}`);
    }

    output += additional;
  }

  return prefix + output;
}

let formatRangeLines = (source, range, contextBefore) => {
  // range is {
  //   start: { line, column },
  //   end: { line, column}
  // }
  //

  if (contextBefore == undefined) {
    contextBefore = 2;
  }

  let startBeforeIndex = Math.max(range.start.line - contextBefore, 0);

  let prefixLength = (range.start.line + 1 + "").length;

  let beforeLines = source
    .filter(function (line, index) {
      return index >= startBeforeIndex && index < range.start.line;
    })
    .map(function (line, index) {
      let number = startBeforeIndex + index + 1; // 1 to account for 0-index
      return formatLineNumberPrefix(line, number, prefixLength);
    });

  let line = source[range.start.line];
  let number = range.start.line + 1; // zero-index

  let pointerStart = range.start.column;
  let pointerEnd;

  // range.end is undefined in some cases
  // null/undefined check to avoid exceptions
  if (range.end && range.start.line === range.end.line) {
    // start and end are same line: pointer ends at column
    pointerEnd = range.end.column;
  } else {
    pointerEnd = line.length;
  }

  let allLines = beforeLines.concat([
    formatLineNumberPrefix(line, number, prefixLength),
    formatLinePointer(line, pointerStart, pointerEnd, prefixLength)
  ]);

  return allLines.join(OS.EOL);
}

let formatInstruction = (traceIndex, instruction) => {
  return (`(${traceIndex}) ${instruction.name} ${instruction.pushData ? instruction.pushData : ''}`);
}

let formatStack = (stack) => {
  let formatted = stack.map(function (item, index) {
    item = "  " + item;
    if (index === stack.length - 1) {
      item += " (top)";
    }

    return item;
  });

  if (stack.length === 0) {
    formatted.push("  No data on stack.");
  }

  return formatted.join(OS.EOL);
}

module.exports = {
  formatStartMessage,
  formatCommandDescription,
  formatAffectedInstances,
  formatHelp,
  formatLineNumberPrefix,
  formatLinePointer,
  formatRangeLines,
  formatInstruction,
  formatStack
}


/***/ }),
/* 96 */
/***/ (function(module, exports) {

module.exports = require("circom");

/***/ }),
/* 97 */
/***/ (function(module, exports, __webpack_require__) {

const fs = __webpack_require__(7);
const path = __webpack_require__(0);
const git = __webpack_require__(49)();
const util = __webpack_require__(8);
const exec = util.promisify(__webpack_require__(6).exec);
const spawn = __webpack_require__(6).spawn;

const ideRepoUrl = `https://github.com${path.sep}LimeChain${path.sep}Solidity-IDE.git`;
const ideFolder = 'Solidity-IDE';
const ideServerRun = `Solidity-IDE${path.sep}solc-server.js`;

let projectWorkingDir = process.cwd(); //save current working dir of the project

const run = async (port) => {
    let etherlimeRootDir = getRootDir();
    await fetchIdeRepo(etherlimeRootDir);
    await runIde(etherlimeRootDir, port)
}

// find etherlime root dir
const getRootDir = () => {
    let currentDir = path.parse(__dirname)
    return path.dirname(currentDir.dir)
}

//clone IDE repo or pull new updates if it was already initialized
const fetchIdeRepo = async (rootDir) => {

    if(fs.existsSync(`${rootDir}${path.sep}${ideFolder}`)) {
        console.log("====== Updating IDE ======")
        try {
            changeCurrentWorkingDir(`${rootDir}${path.sep}${ideFolder}`) //change working dir in order to pull the repo
            await git.pull('origin', 'master')
        } catch (e) {
        }
        
        fs.removeSync(`.${path.sep}node_modules`);
        await installIdeModules()
        return
    }

    console.log('====== Initializing IDE ======')
    await git.clone(ideRepoUrl, `${rootDir}${path.sep}${ideFolder}`);
    changeCurrentWorkingDir(`${rootDir}${path.sep}${ideFolder}`); //change working dir to install the packages
    await installIdeModules();
}

const installIdeModules = async () => {
    console.log('====== Installing IDE modules ======')
    await exec(`npm install`)
}

const runIde = async (rootDir, port) => {
    console.log("====== Running IDE ======");
    if(port){
        fs.writeFileSync('.env', `VUE_APP_PORT=${port}`)
    }
    await exec('npm run build-local')
    changeCurrentWorkingDir(projectWorkingDir); //return to project's working dir
    let pathToFolder = `${projectWorkingDir}${path.sep}contracts`; // path to folder with .sol contracts that will be opened in IDE
    let ideProcess = spawn('node', [`${rootDir}${path.sep}${ideServerRun}`, `--path=${pathToFolder}`, '--noganache']) //run IDE

    // log the data form the running process
    ideProcess.stdout.on('data', (data) => {
        console.log(data.toString('utf-8'))
    });
      
    ideProcess.stderr.on('data', (data) => {
        console.log(`stderr: ${data}`);
    });

}

const changeCurrentWorkingDir = (dir) => {
    process.chdir(`${dir}`);
}


module.exports = {run};

/***/ })
/******/ ]);
});