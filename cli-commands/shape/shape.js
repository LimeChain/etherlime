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

const installProjectsModules = async () => {
    console.log('====== Installing projects modules =====')
    await exec('npm install')
}

const getRepo = (framework) => {
    return `https://github.com/${reposUrl.get(framework)}`
}

const run = async (name) => {
        
    let repo = getRepo(name)

    if(repo.includes(undefined)) {
        throw new Error(`Invalid shape ${name}`)
    }

    console.log(`====== Shaping ${name} dApp =====`)
    await cloneRepo(repo)
    await installProjectsModules()
    console.log('====== Shaping finished successful! =====')
    return
}

module.exports = {
    run
};