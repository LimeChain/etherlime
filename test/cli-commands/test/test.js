const assert = require('chai').assert;
let chai = require("chai");
let chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);
const fs = require('fs-extra');
const test = require('../../../cli-commands/etherlime-test/test');
const sinon = require('sinon');


let etherlimeTest = require('../../../cli-commands/etherlime-test/etherlime-test');
let calledArgs = [ '/Users/desimiramitkova/Projects/etherlime/testForTest/secondTestTemplate.js', '/Users/desimiramitkova/Projects/etherlime/testForTest/testTemplate.js' ]

let currentDir;

describe('test cli command', () => {

    before(async function() {
        fs.mkdirSync('./contracts')
        fs.copyFileSync('./cli-commands/init/LimeFactory.sol', './contracts/LimeFactory.sol')
        fs.mkdirSync('./testForTest')
        fs.copyFileSync('./test/cli-commands/test/exampleTest.js', './testForTest/testTemplate.js')
    })

    it('should execute test cli command with specific path', async function() {
        let etherlimeTestSpy = sinon.spy(etherlimeTest, "run")
        await assert.isFulfilled(test.run('testForTest/testTemplate.js'))
        sinon.assert.calledWith(etherlimeTestSpy, ["testForTest/testTemplate.js"], undefined)
        etherlimeTestSpy.restore();
    });

    it('should execute test cli command without specific js file', async function() {
        fs.copyFileSync('./test/cli-commands/test/exampleTest.js', './testForTest/secondTestTemplate.js')
        let etherlimeTestSpy = sinon.spy(etherlimeTest, "run")
        await assert.isFulfilled(test.run('./testForTest'))
        sinon.assert.calledWith(etherlimeTestSpy, calledArgs)
        etherlimeTestSpy.restore();
    })


    after(async function() {
        fs.removeSync('./testForTest/testTemplate.js')
        fs.removeSync('./testForTest')
        fs.removeSync('./contracts/LimeFactory.sol')
        fs.removeSync('./contracts')
    })
})