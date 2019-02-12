
let Resolver = require("./etherlime-resolver/index");
var Profiler = require("./etherlime-compile/profiler");
var CompilerSupplier = require("./etherlime-compile/compilerSupplier");

const run = async (file) => {


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

	let solc = await supplier.load()

	const resolvedFiles = await (new Promise((resolve, reject) => {
		Profiler.resolveAllSources(resolver, [file], solc, (err, resolved) => {

			if (err) {
				return reject(err)
			}

			return resolve(resolved)

		})
	}))

	let sources = new Array();
	let resolvedPaths = Object.keys(resolvedFiles);
	for (let p in resolvedPaths) {
		sources.push(resolvedFiles[resolvedPaths[p]].body)
	}
	console.log(sources)

};


module.exports = {
	run
}