const assert = require('chai').assert;
let chai = require("chai");
let chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);
const fs = require('fs-extra');
const test = require('../../../cli-commands/etherlime-test/test');
const sinon = require('sinon');

const find = require('find-process');


let currentDir;
    
    describe('coverage cli command', () => {
        
        before(async function() {
            fs.mkdirSync('./tmpTest')
            currentDir = process.cwd();
            process.chdir('./tmpTest')
            fs.mkdirSync('./build')
            fs.mkdirSync('./contracts')
            fs.copyFileSync('../test/cli-commands/test/LimeFactory.sol', './contracts/LimeFactory.sol')
            fs.mkdirSync('./testsToRun')
            fs.copyFileSync('../test/cli-commands/coverage/exampleForCoverage.js', './testsToRun/exampleForCoverage.js')
        })
    
        it('should run coverage cli command', async function() {
            await assert.isFulfilled(test.runWithCoverage('./testsToRun/exampleForCoverage.js', undefined, undefined, true))
        })
    
        it('should run coverage cli command by specifying number runs', async function() {
            await assert.isFulfilled(test.runWithCoverage('./testsToRun/exampleForCoverage.js', undefined, 10, true))
        });

        after(async function() {
            process.chdir(currentDir);
            fs.removeSync('./tmpTest')
            
        })
    
    })

   