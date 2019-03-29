const fs = require('fs-extra');
const path = require('path');
const git = require('simple-git/promise')();
const util = require('util');
const exec = util.promisify(require('child_process').exec);
const spawn = require('child_process').spawn;

const ideRepoUrl = 'https://github.com/LimeChain/Solidity-IDE.git';
const ideFolder = 'Solidity-IDE';
const ideServerRun = 'Solidity-IDE/solc-server.js';

let projectWorkingDir = process.cwd(); //save current working dir of the project

const run = async (port) => {
    let etherlimeRootDir = getRootDir();
    await fetchIdeRepo(etherlimeRootDir);
    await runIde(etherlimeRootDir, port)
}

// find etherlime root dir
const getRootDir = () => {
    let currentDir = path.parse(__dirname)
    return path.dirname(currentDir.dir)
}

//clone IDE repo or pull new updates if it was already initialized
const fetchIdeRepo = async (rootDir) => {

    if(fs.existsSync(`${rootDir}/${ideFolder}`)) {
        console.log("====== Updating IDE ======")
        try {
            changeCurrentWorkingDir(`${rootDir}/${ideFolder}`) //change working dir in order to pull the repo
            await git.pull('origin', 'master')
        } catch (e) {
        }
        
        fs.removeSync('./node_modules');
        await installIdeModules()
        return
    }

    console.log('====== Initializing IDE ======')
    await git.clone(ideRepoUrl, `${rootDir}/${ideFolder}`);
    changeCurrentWorkingDir(`${rootDir}/${ideFolder}`); //change working dir to install the packages
    await installIdeModules();
}

const installIdeModules = async () => {
    console.log('====== Installing IDE modules ======')
    await exec(`npm install`)
}

const runIde = async (rootDir, port) => {
    console.log("====== Running IDE ======");
    await exec('npm run build-local')
    changeCurrentWorkingDir(projectWorkingDir); //return to project's working dir
    runGanache(port) //run etherlime ganache
    let path = `${projectWorkingDir}/contracts`; // path to folder with .sol contracts that will be opened in IDE
    let ideProcess = spawn('node', [`${rootDir}/${ideServerRun}`, `--path=${path}`, '--noganache']) //run IDE

    // log the data form the running process
    ideProcess.stdout.on('data', (data) => {
        console.log(data.toString('utf-8'))
    });
      
    ideProcess.stderr.on('data', (data) => {
        console.log(`stderr: ${data}`);
    });

}

const runGanache = (port) => {
    if (port) {
        spawn('etherlime', ['ganache', `--port=${port}`])
        return
    }
    spawn('etherlime', ['ganache'])
}

const changeCurrentWorkingDir = (dir) => {
    process.chdir(`${dir}`);
}


module.exports = {run};