const logger = require('../../logger-service/logger-service').logger;
const utils = require('./utils');
const util = require('util');
const exec = util.promisify(require('child_process').exec);
const angularUrl = require('./urlConfig').angularUrl;


const cloneRepo = async (url) => {
    console.log('====== Cloning repository =====')
    await exec('git init')
    await exec(`git remote add origin ${url}`)
    await exec('git pull origin master')
}

const installAngularModules = async () => {
    console.log('====== Installing Angular modules =====')
    let currentWorkingDir = process.cwd()
    process.chdir('./my-app')
    await exec ('npm install')
    process.chdir(currentWorkingDir)
}

const initEtherlime = async () => {
    const {stdout, stderr} = await exec('etherlime init')
    console.log(stdout)
}

const instalProjectsModules = async () => {
    console.log('====== Installing projects modules =====')
    await exec('npm install')
}



const run = async (name, url) => {

    if (name && name === 'angular') {

        await utils.verifyUrl(angularUrl)

        try {
            console.log('====== Shaping dApp with predefined Anglular front-end framework =====')
            await cloneRepo(angularUrl)
            await installAngularModules()
            await initEtherlime()
            await instalProjectsModules()
            console.log('====== Shaping finished successful! =====')
            return
        } catch (e) {
            throw new Error(e.message);
        }

    }

    if (url) {
        await utils.verifyUrl(url)

        try {
            console.log('====== Shaping your dApp integration with etherlime project =====');
            await cloneRepo(url)
            await initEtherlime()
            console.log('====== Shaping finished successful! =====');
            return
        } catch (err) {
            throw new Error(err.message);
        }

    }


}

module.exports = {
    run
};