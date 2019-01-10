
const logger = require('../../logger-service/logger-service').logger;
const utils = require('./utils');
const util = require('util');
const exec = util.promisify(require('child_process').exec);

const angularUrl = require('./urlConfig').angularUrl;




const run = async (name, url) => {

    if (name && name === 'angular') {
        let result = await utils.verifyUrl(angularUrl)
        
        if(result.statusCode === 200) {
            try{
                console.log('====== Shaping dApp with predefined Anglular front-end framework =====');
                await exec('git init')
                await exec(`git remote add origin ${angularUrl}`)
                await exec('git pull origin master')
                const { stdout, stderr } = await exec('etherlime init')
                console.log(stdout)
            } catch (e) {
                if(e) {
                    throw new Error(e.message);
                }
            }
            
        }
        
    }


}

module.exports = {
    run
};