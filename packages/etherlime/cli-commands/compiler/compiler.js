const fs = require('fs');
const compiler = require("./etherlime-workflow-compile/index");
const Resolver = require("./etherlime-resolver/index");
const colors = require("etherlime-utils").colors;
const CompilerSupplier = require("./etherlime-compile/compilerSupplier");
const supplier = new CompilerSupplier();
const logger = require('etherlime-logger').logger;
const deleteFolderRecursive = require('etherlime-utils').deleteFolderRecursive;
const path = require("path")

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

	if (contractsBuildDirectory) {
		contractsBuildDirectory = `${defaultPath}/${contractsBuildDirectory}`;
	}
	if (contractsWorkingDirectory) {
		contractsWorkingDirectory = `${defaultPath}/${contractsWorkingDirectory}`;
		contractsWorkingDirectory = path.normalize(contractsWorkingDirectory)
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
		} catch (error) {
			return reject(error);
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