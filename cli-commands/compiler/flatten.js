
const fs = require('fs-extra');
const path = require('path')
let Resolver = require("./etherlime-resolver/index");
var Profiler = require("./etherlime-compile/profiler");
var CompilerSupplier = require("./etherlime-compile/compilerSupplier");

let sources = new Array();

const getSources = async (file) => {
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

	let resolvedPaths = Object.keys(resolvedFiles);
	for (let p in resolvedPaths) {
		sources.push(resolvedFiles[resolvedPaths[p]].body)
	}
	
}

const createFolderAndFile = async (file) => {
	let baseName = path.basename(file, '.sol');
	if(!fs.existsSync('.contracts/flat')){
		fs.mkdirSync('./contracts/flat')
	}

	if(!fs.existsSync(`./contracts/flat/${baseName}_flattened.sol`)){
		fs.writeFileSync(`./contracts/flat/${baseName}_flattened.sol`)
	}
}

const clearContent = async () => {
	
}

const recordFiles = async (file) => {
	await createFolderAndFile(file)
	let baseName = path.basename(file, '.sol');
	sources.forEach(s => {
		fs.appendFileSync(`./contracts/flat/${baseName}_flattened.sol`, s)
	})

}



const run = async (file) => {
	await getSources(file)
	await recordFiles(file)

};


module.exports = {
	run
}