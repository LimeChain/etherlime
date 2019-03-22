const child_process = require('child_process');
const path = require("path");
const fs = require("fs");
const mkdirp = require("mkdirp");
const find_contracts = require("./../etherlime-contract-sources");

const run = async (allFiles, buildDirectory) => {

    for (let i = 0; i < allFiles.length; i++) {
        try {
            let filePath = allFiles[i]
            let fileBaseName = path.basename(filePath, ".vy")
            let fileTimestampStatus = await getFileTimestampStatus(filePath)

            if (!await isFileUpdated(fileBaseName, fileTimestampStatus, buildDirectory)) {
                return
            }

            // await load()
            let {abi, bytecode} = await compile(filePath)

            let compiledObject =  {
                "contractName": fileBaseName,
                "abi": abi,
                "bytecode": bytecode,
                "updatedAt": fileTimestampStatus
            }

            await recordCompiledObject(compiledObject, buildDirectory)

            const displayPath = "." + path.sep + path.relative(`${process.cwd()}`, filePath);
            console.log(`Compiling ${displayPath}...`);
        } catch (e) {
            console.log(e.message)
            throw new Error("Vyper compilation failed." + e.message)
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

const load = async () => {
    // let phyton = await child_process.execSync('which python3', {
    //     'encoding': 'utf8'
    // })
    // console.log("obj", phyton)

    await child_process.execSync(`virtualenv -p python3  vyper-venv`)
}

const compile = async (filePath) => {
    ///home/travis/virtualenv/python3.6.7/bin/python3
    let abi = await child_process.execSync(`source ~/vyper-venv/bin/activate && vyper -f abi ${filePath}`, {
        'encoding': 'utf8'
    })
    let bytecode = await child_process.execSync(`source ~/vyper-venv/bin/activate && vyper -f bytecode ${filePath}`, {
        'encoding': 'utf8'
    })
    
    abi = JSON.parse(abi)
    bytecode = bytecode.replace('\n', '')
   
    return {
        abi,
        bytecode
    }
}

const recordCompiledObject = (compiledObject, buildDirectory) => {

    if (!fs.existsSync(buildDirectory)) {
        mkdirp.sync(buildDirectory);
    }

    const spaces = 4; // number of space characters to be inserted for readability purposes
    fs.writeFileSync(`${buildDirectory}/${compiledObject.contractName}.json`, JSON.stringify(compiledObject, null, spaces)) //second param is a string replacer if needed

}


module.exports = run;