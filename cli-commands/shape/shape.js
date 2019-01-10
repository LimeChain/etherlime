const logger = require('../../logger-service/logger-service').logger;
const utils = require('./utils');
const util = require('util');
const exec = util.promisify(require('child_process').exec);
const angularUrl = require('./urlConfig').angularUrl;


const run = async (name, url) => {

    if (name && name === 'angular') {

        await utils.verifyUrl(angularUrl)

        try {
            console.log('====== Shaping dApp with predefined Anglular front-end framework =====');
            await exec('git init')
            await exec(`git remote add origin ${angularUrl}`)
            await exec('git pull origin master')
            console.log('====== Shaping finished successful! =====');
            return
        } catch (e) {
            throw new Error(e.message);
        }

    }

    if (url) {
        await utils.verifyUrl(url)

        try {
            console.log('====== Shaping your dApp integration with etherlime project =====');
            
            await exec('git init')
            await exec(`git remote add origin ${url}`)
            await exec('git pull origin master')

            const {stdout, stderr} = await exec('etherlime init')
            console.log(stdout)

            return
        } catch (err) {
            throw new Error(err.message);
        }

    }


}

module.exports = {
    run
};