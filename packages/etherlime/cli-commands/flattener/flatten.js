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

	let resolvedFiles = await resolveSources(`./contracts/${file}`)
	let resolvedPaths = resolvePaths(resolvedFiles)
	let orderedPaths = orderPaths(resolvedFiles, resolvedPaths)
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