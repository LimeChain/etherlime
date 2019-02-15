
const fs = require('fs-extra');
const path = require('path');
let Profiler = require("../compiler/etherlime-compile/profiler");
let {resolver, supplier} = require('./config.js')

const versionRegex = /^\s*pragma\ssolidity\s+(.*?)\s*;/; //regex for pragma solidity version 
const importRegex = /^\s*import(\s+).*$/gm; //regex for imported files
let resolvedPaths = new Array();
let resolvedFiles = new Array();
let orderedDependencies = new Array();

const run = async (file, solcVersion) => {
	if(solcVersion) {
		supplier.config.version = solcVersion
	}

	try {
		await resolveSources(`./contracts/${file}`)
		sortFiles()
		recordFiles(file)
		console.log('Contract was flattened successfully. Check your "./flat" folder')
	} catch (e) {
		throw new Error(e.message);
	}
	

};


const resolveSources = async (file) => {
	let solc = await supplier.load()
	resolvedFiles = await (new Promise((resolve, reject) => {
		Profiler.resolveAllSources(resolver, [file], solc, (err, resolved) => {

			if (err) {
				return reject(err)
			}

			return resolve(resolved)

		})
	}))

	resolvedPaths = Object.keys(resolvedFiles);
}

//sort files according imported dependencies; contracts with no imports are added first
const sortFiles = () => {
	while(resolvedPaths.length > orderedDependencies.length){
		
		for(let i = 0; i < resolvedPaths.length; i++) {
			let currentDependency = resolvedPaths[i]
			let imports = resolvedFiles[currentDependency].body.match(importRegex)
			
			if(!imports) {
				pushDependency(currentDependency)
				continue
			}

			let dependenciesCount = countOrderedDependencies(imports)
			if(dependenciesCount === imports.length) {
				pushDependency(currentDependency)	
			}
		}	
	}
}

//counts if all imported sources in current file has already been ordered
const countOrderedDependencies = (imports) => {
	let counter = 0;
		for(let i = 0; i < imports.length; i++) {
			let currentImport = imports[i].replace(/[\n\'\"\;]/g, '') //removes quotes and semicolon
			currentImport = path.basename(currentImport, '.sol') //extract the base name of file
			let fullPath = findFullPath(currentImport) //find full path
			if(orderedDependencies.includes(fullPath)){
				counter++
			}
		}
	return counter
}

const pushDependency = (dependency) => {
	if(!orderedDependencies.includes(dependency)){
		orderedDependencies.push(dependency)
	}
}

const recordFiles = (file) => {
	let baseName = path.basename(file, '.sol')
	let flatFileName = `./flat/${baseName}_flat.sol`;

	createFolderAndFile(flatFileName)

	orderedDependencies.forEach(dependency => {
		let content = resolvedFiles[dependency].body
		content = clearContent(content)

		fs.appendFileSync(flatFileName, content)
	})

	orderedDependencies = []
}

const createFolderAndFile = (fileName) => {
	let solidityVersion = resolvedFiles[resolvedPaths[0]].body.match(versionRegex) //takes pragma solidity version
	
	if(!fs.existsSync('./flat')){
		fs.mkdirSync('./flat')
	}

	fs.writeFileSync(fileName, solidityVersion[0])
}

const clearContent = (fileContent) => {
    return fileContent.replace(versionRegex, '').replace(importRegex, '') //removes pragma solidity version and imported files
}

const findFullPath = (importPath) => {
	for(let i = 0; i < resolvedPaths.length; i++) {
		let basePath = path.basename(resolvedPaths[i], '.sol')
		if(basePath === importPath){
			return resolvedPaths[i]
		}
	}
}


module.exports = {
	run
}