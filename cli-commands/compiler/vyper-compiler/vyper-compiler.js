const dockerCLI = require('docker-cli-js');
const docker = new dockerCLI.Docker();
const path = require("path");
const fs = require("fs");
const mkdirp = require("mkdirp");

const VYPER_EXTENSION = require('./config.js').VYPER_EXTENSION;

const run = async (allFiles, buildDirectory) => {

    await docker.command("pull ethereum/vyper")

    for (let i = 0; i < allFiles.length; i++) {
        try {
            let filePath = path.normalize(path.relative(process.cwd(), allFiles[i])) //extract pure file path
            let fileBaseName = path.basename(filePath, VYPER_EXTENSION)
            let fileTimestampStatus = await getFileTimestampStatus(filePath)

            if (!await isFileUpdated(fileBaseName, fileTimestampStatus, buildDirectory)) {
                return
            }

            const displayPath = '.' + path.sep + filePath;
            console.log(`Compiling ${displayPath}...`);

            let compiledObject = await compile(filePath, fileBaseName, fileTimestampStatus)

            await recordCompiledObject(compiledObject, buildDirectory)

        } catch (e) {
            console.error('Vyper compilation failed.')
            throw e;
        }
    }

}

//gets timestamp indicating the last time the file was changed or modified
const getFileTimestampStatus = async (filePath) => {
    let stats = fs.statSync(filePath)
    return (stats.ctime || stats.mtime).getTime()
}

//checks if file was changed or modified since once compiled
const isFileUpdated = async (fileBaseName, fileTimestampStatus, buildDirectory) => {
    let current;

    try {
        current = fs.readFileSync(`${buildDirectory}/${fileBaseName}.json`, 'utf8')
    } catch (e) {
        return true
    }

    current = JSON.parse(current)

    return (current.updatedAt < fileTimestampStatus)
}


const compile = async (filePath, fileBaseName, fileTimestampStatus) => {

    let data = await docker.command(`run  -v $(pwd):/code ethereum/vyper -f combined_json ${filePath}`)
     
    let compiledObject = JSON.parse(data.raw)
    compiledObject = Object.assign({contractName: fileBaseName}, compiledObject[filePath]) //restructuring the compiled object
    compiledObject.updatedAt = fileTimestampStatus

    return compiledObject
}

const recordCompiledObject = (compiledObject, buildDirectory) => {

    if (!fs.existsSync(buildDirectory)) {
        mkdirp.sync(buildDirectory);
    }

    const spaces = 2; // number of space characters to be inserted for readability purposes
    fs.writeFileSync(`${buildDirectory}/${compiledObject.contractName}.json`, JSON.stringify(compiledObject, null, spaces)) //second param is a string replacer if needed

}


module.exports = run;

