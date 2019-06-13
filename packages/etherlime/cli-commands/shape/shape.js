const git = require('simple-git/promise')()
const util = require('util');
const exec = util.promisify(require('child_process').exec);
const repoToUrlMap = require('./urlConfig').repoToUrlMap;


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
    let url = repoToUrlMap.get(framework)

    if (!url) {
        throw new Error(`Invalid shape ${framework}`)
    }
    return `https://github.com/${url}`
}

const run = async (name) => {

    let repo = getRepo(name)
    console.log(`====== Shaping ${name} dApp =====`)
    await cloneRepo(repo)
    await installProjectsModules()
    console.log('====== Shaping finished successful! =====')
    return
}

module.exports = {
    run
};