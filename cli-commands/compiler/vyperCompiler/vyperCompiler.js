const dockerCLI = require('docker-cli-js');
const docker = new dockerCLI.Docker();
const path = require("path");
const fs = require("fs");
const mkdirp = require("mkdirp");
const find_contracts = require("./../etherlime-contract-sources");


const run = async (allFiles, buildDirectory) => {

    for (let i = 0; i < allFiles.length; i++) {
        try {
            let filePath = path.normalize(path.relative(process.cwd(), allFiles[i])) //extract pure file path
            let fileBaseName = path.basename(filePath, ".vy")
            let fileTimestampStatus = await getFileTimestampStatus(filePath)

            if (!await isFileUpdated(fileBaseName, fileTimestampStatus, buildDirectory)) {
                return
            }

            let compiledObject = await compile(filePath)
            compiledObject = Object.assign({"contractName": fileBaseName}, compiledObject[filePath]) //restructuring the compiled object
            compiledObject.updatedAt = fileTimestampStatus

            await recordCompiledObject(compiledObject, buildDirectory)

            const displayPath = "." + path.sep + filePath;
            console.log(`Compiling ${displayPath}...`);
        } catch (e) {
            throw new Error("Vyper compilation failed." + e)
        }
    }

}

//gets timestamp indicating the last time the file was changed or modified
const getFileTimestampStatus = async (filePath) => {
    try {
        let stats = fs.statSync(filePath)
        return (stats.ctime || stats.mtime).getTime()
    } catch (e) {
        throw e
    }

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

    if (current.updatedAt < fileTimestampStatus) return true

    return false
}


const compile = async (filePath) => {
    let compiledObject;
    await docker.command("pull ethereum/vyper", function (err, data) {
       if (err) {
           throw err
       }
    })

    await docker.command(`run  -v $(pwd):/code ethereum/vyper -f combined_json ${filePath}`, function (err, data) {
        if (err) {
            throw err
        }
        compiledObject = JSON.parse(data.raw)
        
    })

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

