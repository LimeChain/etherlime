const assert = require('chai').assert;
let chai = require("chai");
let chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);
const fs = require('fs-extra');
const test = require('../../../cli-commands/etherlime-test/test');
const sinon = require('sinon');

let currentDir;
    
    describe('coverage cli command', () => {
        
        before(async function() {
            fs.mkdirSync('./tmpTest')
            currentDir = process.cwd();
            process.chdir('./tmpTest')
            fs.mkdirSync('./contracts')
            fs.copyFileSync('../test/cli-commands/test/LimeFactory.sol', './contracts/LimeFactory.sol')
            fs.mkdirSync('./testsToRun')
            fs.copyFileSync('../test/cli-commands/coverage/exampleForCoverage.js', './testsToRun/exampleForCoverage.js')
            fs.mkdirSync('./build')
        })
    
        it('should run coverage cli command', async function() {
            await assert.isFulfilled(test.runWithCoverage('./testsToRun/exampleForCoverage.js'))
        })
    
        it('should run coverage cli command by specifying number runs', async function() {
            await assert.isFulfilled(test.runWithCoverage(undefined, undefined, 10))
        });
    
        after(async function() { 
            fs.removeSync('./testsToRun/exampleForCoverage.js')
            fs.removeSync('./testsToRun')
            fs.removeSync('./contracts/LimeFactory.sol')
            fs.removeSync('./contracts')
            fs.removeSync('./build')
            fs.removeSync('./.etherlime-store/.history.json')
            fs.removeSync('./.etherlime-store')
            fs.removeSync('./tmpTest')
            process.chdir(currentDir);
            
        })
    
    })

