const fs = require('fs-extra');
const path = require('path');
let Profiler = require("../compiler/etherlime-compile/profiler");
let {
	resolver,
	supplier
} = require('./config.js')

const versionRegex = /pragma\ssolidity\s+(.*?)\s*;/; //regex for pragma solidity version 
const importRegex = /^\s*import(\s+).*$/gm; //regex for imported files

const returnFilesAndPaths = async (file, solcVersion) => {
	if (solcVersion) {
		supplier.config.version = solcVersion
	}

	const { resolvedFiles, resolvedPathsImportsMap } = await resolveSourcesAndImports(`./contracts/${file}`)

	const orderedPaths = orderPaths(resolvedPathsImportsMap)

	return {
		resolvedFiles,
		orderedPaths
	}
}

const run = async (file, solcVersion) => {

	const {
		resolvedFiles,
		orderedPaths
	} = await returnFilesAndPaths(file, solcVersion);
	recordFiles(file, resolvedFiles, orderedPaths)
	console.log('Contract was flattened successfully. Check your "./flat" folder')

};

const runWithoutWriteFiles = async (file, solcVersion) => {
	file = path.relative(`${process.cwd()}/contracts`, file)
	const {
		resolvedFiles,
		orderedPaths
	} = await returnFilesAndPaths(file, solcVersion);
	return returnFiles(file, resolvedFiles, orderedPaths)

};


const resolveSourcesAndImports = async (file) => {
	const solc = await supplier.load()
	const resolvedFiles = await Profiler.resolveAllSources(resolver, [file], solc)

	const resolvedPaths = resolvePaths(resolvedFiles)
	
	const resolvedPathsImportsMap = new Map();
	resolvedPaths.forEach(path => {
		const imports = Profiler.getImports(path, resolvedFiles[path], solc)
		resolvedPathsImportsMap.set(path, imports)
	})

	return { resolvedFiles, resolvedPathsImportsMap }
}

const resolvePaths = (files) => {
	return Object.keys(files)
}

//sort files according imported dependencies; contracts with no imports are added first
const orderPaths = (pathImportsMap) => {
	const orderedPaths = new Array(); // keeps final order of the paths
	const pendingPaths = new Array(); // keeps paths which imports are not ordered yet

	function computeImports(importsArray) {
		for(let i = 0; i < importsArray.length; i++) {
			const currentImport = importsArray[i];

			// if current import has already been added => continue with the next import
			if(orderedPaths.includes(currentImport)){
				continue
			}

			const childImports = pathImportsMap.get(currentImport);
			// if current import has no childImports => directly add it and continue with the next import
			if(childImports.length === 0) {
				orderedPaths.push(currentImport)
				continue
			}

			// if current import has been added to pending =>
			// means that not all of its child imports were computed yet and we are still looping through them
			// this can happen only for circular imports
			// i.e. X.sol imports Y.sol and Y.sol imports X.sol
			// so do nothing for the moment and continue with the next import
			// this current (parent) import will be added when all of his child imports are computed
			if(pendingPaths.includes(currentImport)){
				continue
			}
			

			pendingPaths.push(currentImport) // if no of the scenarios above are met, add current import to pending
			computeImports(childImports) // and compute its child imports
			
			// at the end remove the current import from pending and add it to ordered
			const index = pendingPaths.indexOf(currentImport);
			pendingPaths.splice(index, 1)
			orderedPaths.push(currentImport)
		}
	}

	const initialPath = pathImportsMap.keys().next().value // takes the first file path from the mapping, i.e. the main file that should be flattened
	computeImports([initialPath])
	return orderedPaths
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


module.exports = {
	run,
	runWithoutWriteFiles
}