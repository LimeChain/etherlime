const compile = require('../../../cli-commands/compiler/compiler')
const assert = require('chai').assert;
let chai = require("chai");
let chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);
const init = require('../../../cli-commands/init/init');
const fs = require('fs-extra');
let currentDir;

describe('Compile cli command', () => {

    before( async function() {
        fs.mkdirSync('./tmpCompile')
        currentDir = process.cwd();
        process.chdir('./tmpCompile');
        // await init.run();
    });

    it('should run compile without parameters', async function() {
        await assert.isFulfilled(compile.run(), "It is not successfuly executed!")
    })

})