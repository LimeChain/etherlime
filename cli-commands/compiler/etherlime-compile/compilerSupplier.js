const path = require('path');
const fs = require('fs');
const child = require('child_process');
const request = require('request-promise');
const requireFromString = require('require-from-string');
const findCacheDir = require('find-cache-dir');
const originalRequire = require('original-require');
const solcWrap = require('./solcWrap.js');

function CompilerSupplier(_config) {
    _config = _config || {};
    this.config = Object.assign(this.config, _config);
}

CompilerSupplier.prototype.config = {
    version: null,
    versionsUrl: 'https://solc-bin.ethereum.org/bin/list.json',
    compilerUrlRoot: 'https://solc-bin.ethereum.org/bin/',
    dockerTagsUrl: 'https://registry.hub.docker.com/v2/repositories/ethereum/solc/tags/',
    cache: false,
}

CompilerSupplier.prototype.cachePath = findCacheDir({
    name: 'etherlime',
    cwd: __dirname,
    create: true,
})

/**
 * Load solcjs from four possible locations:
 * - local node_modules            (config.version = <undefined>)
 * - absolute path to a local solc (config.version = <path>)
 *
 * OR specify that solc.compileStandard should wrap:
 * - dockerized solc               (config.version = "<image-name>" && config.docker: true)
 * - native built solc             (config.version = "native")
 */
CompilerSupplier.prototype.load = function () {
    const self = this;
    const version = self.config.version;
    const isNative = self.config.version === 'native';
    // const nodeModulesSolc = `${process.cwd()}/node_modules/solc`;
    const nodeModulesSolc = ((process.cwd().indexOf('coverageEnv')) > -1 ? (path.resolve(process.cwd() + '/../node_modules/solc')) : (process.cwd() + '/node_modules/solc'));


    return new Promise((accept, reject) => {
        const useDocker = self.config.docker;
        const useDefaultEtherlime = !version; // Checking for version number
        const useDefaultNodeModules = useDefaultEtherlime && self.isLocal(nodeModulesSolc); // Checking for version number
        const useLocal = !useDefaultEtherlime && self.isLocal(version); // We're checking if the version is set as path and then we're checking the path
        const useNative = !useLocal && isNative;
        const useRemote = !useNative

        if (useDocker) return accept(self.getBuilt("docker"));
        if (useNative) return accept(self.getBuilt("native"));
        if (useLocal) return accept(self.getLocal(version));
        if (useDefaultNodeModules) return accept(self.getLocal(nodeModulesSolc));
        if (useDefaultEtherlime) return accept(self.getDefaultEtherlime());
        if (useRemote) return accept(self.getByUrl(version));
    });
}

CompilerSupplier.prototype.getReleases = function () {
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

CompilerSupplier.prototype.getDockerTags = function () {
    const self = this;

    return request(self.config.dockerTagsUrl)
        .then(list =>
            JSON
                .parse(list)
                .results
                .map(item => item.name)
        )
        .catch(err => { throw self.errors('noRequest', url, err) });
}

//------------------------------------ Getters -----------------------------------------------------

CompilerSupplier.prototype.getDefaultEtherlime = function () {
    const compiler = require('solc');
    this.removeListener();

    return compiler;
}

CompilerSupplier.prototype.getLocal = function (localPath) {
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

CompilerSupplier.prototype.getVersions = function () {
    const self = this;

    return request(self.config.versionsUrl)
        .then(list => JSON.parse(list))
        .catch(err => { throw self.errors('noRequest', url, err) });
}

CompilerSupplier.prototype.getVersionUrlSegment = function (version, allVersions) {

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

CompilerSupplier.prototype.getByUrl = function (version) {
    const self = this;

    return self
        .getVersions(self.config.versionsUrl)
        .then(allVersions => {
            const file = self.getVersionUrlSegment(version, allVersions);

            if (!file) throw self.errors('noVersion', version);

            if (self.isCached(file)) return self.getFromCache(file);

            const url = self.config.compilerUrlRoot + file;

            return request
                .get(url)
                .then(response => {
                    self.addToCache(response, file);
                    return self.compilerFromString(response);
                })
                .catch(err => { throw self.errors('noRequest', url, err) });
        });
}

CompilerSupplier.prototype.getBuilt = function (buildType) {
    let versionString;
    let command;

    switch (buildType) {
        case "native":
            versionString = this.validateNative();
            command = 'solc --standard-json';
            break;
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
                compileStandard: (options) => String(child.execSync(command, { input: options })),
                version: () => versionString,
                importsParser: solcjs,
            }
        });
}

//------------------------------------ Utils -------------------------------------------------------

CompilerSupplier.prototype.isLocal = function (localPath) {
    return fs.existsSync(localPath);
}

CompilerSupplier.prototype.validateDocker = function () {
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

CompilerSupplier.prototype.validateNative = function () {
    let version;
    try {
        version = child.execSync('solc --version');
    } catch (err) {
        throw this.errors('noNative', null, err);
    }

    return this.normalizeVersion(version);
}

CompilerSupplier.prototype.getCommitFromVersion = function (versionString) {
    return 'commit.' + versionString.match(/commit\.(.*?)\./)[1]
}

CompilerSupplier.prototype.normalizeVersion = function (version) {
    version = String(version);

    return version.split(':')[1].trim();
}

CompilerSupplier.prototype.resolveCache = function (fileName) {
    const thunk = findCacheDir({ name: 'etherlime', cwd: __dirname, thunk: true });

    return thunk(fileName);
}

CompilerSupplier.prototype.isCached = function (fileName) {
    const file = this.resolveCache(fileName);

    return fs.existsSync(file);
}

CompilerSupplier.prototype.addToCache = function (code, fileName) {
    if (!this.config.cache) return;

    const filePath = this.resolveCache(fileName);
    fs.writeFileSync(filePath, code);
}

CompilerSupplier.prototype.getFromCache = function (fileName) {
    const filePath = this.resolveCache(fileName);
    const soljson = originalRequire(filePath);
    const wrapped = solcWrap(soljson);
    this.removeListener();

    return wrapped;
}

CompilerSupplier.prototype.compilerFromString = function (code) {
    const soljson = requireFromString(code);
    const wrapped = solcWrap(soljson);
    this.removeListener();

    return wrapped;
}

CompilerSupplier.prototype.removeListener = function () {
    const listeners = process.listeners("uncaughtException");
    const exceptionHandler = listeners[listeners.length - 1];

    if (exceptionHandler) {
        process.removeListener("uncaughtException", exceptionHandler);
    }
}

CompilerSupplier.prototype.errors = function (kind, input, err) {
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

module.exports = CompilerSupplier;
