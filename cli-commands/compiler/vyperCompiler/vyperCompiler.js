const child_process = require('child_process');
const path = require("path");
const fs = require("fs");
const find_contracts = require("./../etherlime-contract-sources");

const run = async (allFiles) => {
    
    for(let i = 0; i < allFiles.length; i++) {
        try {
            let filePath = allFiles[i]
            let fileTime = await getFileTime(filePath)
            if (!await updated(filePath, fileTime)) {
                return
            }
            let { abi, bytecode } = await compileContract(filePath)
            await recordCompiledObject(abi, bytecode, filePath, fileTime)
            console.log("Compiling " + filePath)
        } catch (e) {
            throw new Error("Vyper compilation failed." + e.message)
        }
    }
   

}

const updated = async (filePath, fileTime) => {
    let fileName = path.basename(filePath, ".vy")
    let current;
    try {
        current = fs.readFileSync(`${process.cwd()}/build/${fileName}.json`, 'utf8')
    } catch (e) {
        return true
    }

    current = JSON.parse(current)

    if (current.updatedAt < fileTime) return true

    return false
}

const getFileTime = async (filePath) => {
    try {
        let stats = fs.statSync(filePath)
        return (stats.ctime || stats.mtime).getTime()
    } catch (e) {
        throw e
    }

}

const compileContract = async (filePath) => {
    let abi = await child_process.execSync(`source ~/vyper-env/bin/activate && vyper -f abi ${filePath}`, {
        'encoding': 'utf8'
    })
    let bytecode = await child_process.execSync(`source ~/vyper-env/bin/activate && vyper -f bytecode ${filePath}`, {
        'encoding': 'utf8'
    })
    abi = JSON.parse(abi)
    bytecode = bytecode.replace('\n', '')
    return {
        abi,
        bytecode
    }
}

const recordCompiledObject = (abi, bytecode, filePath, fileTime) => {
    let contractName = path.basename(filePath, ".vy")
    let buildFolder = `${process.cwd()}/build`;
    if (!fs.existsSync(buildFolder)) {
        fs.mkdirSync(buildFolder);
    }

    let compiledJSON = {
        "contractName": contractName,
        "abi": abi,
        "bytecode": bytecode,
        "updatedAt": fileTime
    }

    const spaces = 4; // number of space characters to be inserted for readability purposes
    fs.writeFileSync(`${buildFolder}/${contractName}.json`, JSON.stringify(compiledJSON, null, spaces)) //second param is a string replacer if needed

}


module.exports = run;