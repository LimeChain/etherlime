const logger = require('../../logger-service/logger-service').logger;
const git = require('simple-git/promise')()
const util = require('util');
const exec = util.promisify(require('child_process').exec);
const reposUrl = require('./urlConfig').reposUrls;


const cloneRepo = async (url) => {
    console.log('====== Cloning repository =====')
    await git.init()
    await git.addRemote('origin', url)
    await git.pull('origin', 'master')
}

const initEtherlime = async () => {
    const {stdout, stderr} = await exec('etherlime init')
    console.log(stdout)
}

const installProjectsModules = async () => {
    console.log('====== Installing projects modules =====')
    await exec('npm install')
}

const getRepo = (framework) => {
    return `https://github.com/${reposUrl.get(framework)}`
}

const run = async (name) => {
        
    let repo = getRepo(name)

    //if a user pass his own repo to be integrated with etherlime
    if(repo.includes(undefined)) {
        try {
            console.log('====== Shaping your dApp integration with etherlime project =====');
            await cloneRepo(name)
            await installProjectsModules()
            await initEtherlime()
            console.log('====== Shaping finished successful! =====')
            return
        } catch (e) {
            throw new Error(e.message);
        }
        
    }

    try {
        console.log('====== Shaping dApp with predefined Anglular front-end framework =====')
        await cloneRepo(repo)
        await installProjectsModules()
        console.log('====== Shaping finished successful! =====')
        return
    } catch (e) {
        throw new Error(e.message);
    }


}

module.exports = {
    run
};