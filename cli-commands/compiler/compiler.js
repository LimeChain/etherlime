const fs = require('fs');
const compiler = require("./etherlime-workflow-compile/index");
const Resolver = require("./etherlime-resolver/index");
const colors = require("./../../utils/colors");
const CompilerSupplier = require("./etherlime-compile/compilerSupplier");
const supplier = new CompilerSupplier();
const logger = require('./../../logger-service/logger-service').logger;
const del = require('del');

const run = async (defaultPath, runs, solcVersion, useDocker, list, all, quite, contractsBuildDirectory, contractsWorkingDirectory, deleteCompiledFiles, abiOnly) => {
	if (list !== undefined) {
		await listVersions(supplier, list, all);

		return;
	}

	defaultPath = `${process.cwd()}/${defaultPath}`;

	return performCompilation(defaultPath, runs, solcVersion, useDocker, quite, contractsBuildDirectory, contractsWorkingDirectory, deleteCompiledFiles, abiOnly);
};

const performCompilation = async (defaultPath, runs, solcVersion, useDocker, quiet, contractsBuildDirectory, contractsWorkingDirectory, deleteCompiledFiles, abiOnly) => {
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

	compileOptions.abiOnly = abiOnly;

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

	await del(compileOptions.contracts_build_directory);

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