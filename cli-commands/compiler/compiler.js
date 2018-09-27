let compiler = require("./etherlime-workflow-compile/index");
let Resolver = require("./etherlime-resolver/index");
let colors = require("./../../utils/colors");
var CompilerSupplier = require("./etherlime-compile/compilerSupplier");
var supplier = new CompilerSupplier();
const loggerService = require('./../../logger-service/logger-service').loggerService;

let outputParameter;

const run = async (defaultPath, runs, solcVersion, useDocker, list, all, quite) => {
	outputParameter = loggerService.getOutputParameterValue();

	if (list !== undefined) {
		await listVersions(supplier, list, all);

		return;
	}

	defaultPath = `${process.cwd()}/${defaultPath}`;

	return performCompilation(defaultPath, runs, solcVersion, useDocker, quite);
};

const performCompilation = async (defaultPath, runs, solcVersion, useDocker, quite) => {
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
		"working_directory": `${defaultPath}/contracts`,
		"contracts_build_directory": `${defaultPath}/build`,
		"compilers": compilerSolcOptions,
		"quiet": quite
	};

	Resolver(resolverOptions);

	let compileOptions = {
		"contracts_directory": `${defaultPath}/contracts`,
		"contracts_build_directory": `${defaultPath}/build`,
		"compilers": compilerSolcOptions,
		"quiet": quite
	};

	if (runs) {
		compileOptions.solc = {
			optimizer: {
				enabled: true,
				runs: runs
			}
		}
	}

	return compilePromise(compileOptions, quite);
};

const compilePromise = async (compileOptions, quite) => {

	return new Promise((resolve, reject) => {
		compiler.compile(compileOptions, (error, artifacts, paths) => {
			if (error) {
				var stack = error['stack'].split(',/');

				stack.forEach(message => {
					loggerService.record(message, outputParameter);
				});

				reject(stack);

				return;
			}

			if (!quite) {
				loggerService.record(colors.colorSuccess('Compilation finished successfully'), outputParameter);
			}

			resolve();
		});
	});
};

const listVersions = async (supplier, list, all) => {
	if (list === '') {
		loggerService.record(help());

		return;
	}

	if (list === 'docker') {
		let tags = await supplier.getDockerTags();
		tags.push('See more at: hub.docker.com/r/ethereum/solc/tags/');

		loggerService.record(JSON.stringify(tags, null, ' '), outputParameter);

		return;
	}

	let releases = await supplier.getReleases();
	const replacer = all ? null : shortener;
	const versionsList = JSON.stringify(releases[list], replacer, ' ');

	loggerService.record(versionsList, outputParameter);
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