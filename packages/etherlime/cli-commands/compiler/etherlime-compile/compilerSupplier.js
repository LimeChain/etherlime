const fs = require('fs');
const child = require('child_process');
const axios = require('axios');
const axiosInstance = axios.create();
const requireFromString = require('require-from-string');
const findCacheDir = require('find-cache-dir');
const originalRequire = require('original-require');
const solcWrap = require('solc/wrapper');
const { execSync } = require("child_process");
const process = require('process');

class CompilerSupplier {
    /**
	 * @param {*} _config configuration options for compilation
	 */
    constructor(_config) {
        _config = _config || {};
        this.config = {
            version: null,
            versionsUrl: 'http://etherlime.limechain.tech/solc/bin/list.json',
            compilerUrlRoot: 'http://etherlime.limechain.tech/solc/bin/',
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
            const useNative = (self.config.version === 'native');


            if (useDocker) return accept(self.getBuilt("docker"));
            if (useLocal) return accept(self.getLocal(version));
            if (useNative) return accept(self.getNative());
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
        const compiler = require('solc');
        this.removeListener();

        return compiler;
    }

    getNative() {
        const versionString = this.getNativeSolcVersion();
        const command = `solc --standard-json --allow-paths ${process.cwd()}`;

        try {
        return {
            compile: options => String(execSync(command, { input: options })),
            version: () => versionString
        };
        } catch (error) {
        if (error.message === "No matching version found") {
            throw this.errors("noVersion", versionString);
        }
        throw new Error(error);
        }
    }

    getNativeSolcVersion() {
        let version;
        try {
            version = execSync("solc --version");
        } catch (error) {
          throw this.errors("noNative", null, error);
        }
        return version.toString().split(":")[1].trim();
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