const assert = require('chai').assert;
const chai = require('chai')
let chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);
const fs = require('fs-extra');
const runCmdHandler = require('../utils/spawn-child-process').runCmdHandler;
const sinon = require('sinon');
const ganache = require('../../../cli-commands/ganache/ganache');
const myDebugger = require('../../../cli-commands/debugger/index');

const commands = require('../../../cli-commands/commands');


describe('root calling cli commands', () => {

    it('should throw err if init cli command failed', async function () {
        let expectedOutput = "Command failed:"
        let childProcess = await runCmdHandler(`etherlime init`, expectedOutput);
        assert.include(JSON.stringify(childProcess), expectedOutput)
    });

    it('should throw err if compile cli command failed', async function () {
        let expectedOutput = "ENOENT: no such file or directory"
        let childProcess = await runCmdHandler(`etherlime compile`, expectedOutput);
        assert.include(childProcess.output, expectedOutput)
    });

    it('should throw err if test cli command failed', async function () {
        let expectedOutput = "ENOENT: no such file or directory"
        let childProcess = await runCmdHandler(`etherlime test`, expectedOutput);
        console.log(childProcess)
        assert.include(childProcess, expectedOutput)
    });

    it('should throw err if history failed', async function () {
        let expectedError = "Cannot read property"
        let childProcess = await runCmdHandler(`etherlime history --limit=0.4`, expectedError);
        assert.include(JSON.stringify(childProcess), expectedError)
    });

    it('should throw err if deploy failed', async function () {
        let expectedOutput = "ENOENT: no such file or directory"
        let childProcess = await runCmdHandler(`etherlime deploy`, expectedOutput);
        assert.include(childProcess.output, expectedOutput)

    });

    it('should throw err if ganache failed', async function () {
        let stub = sinon.stub(ganache, "run")
        stub.throws()
        let argv = {
            output: "some message"
        }
        let errorMessage = "Error"
        let consoleSpy = sinon.spy(console, "error");
        commands[0].commandProcessor(argv)
        let logs = consoleSpy.getCall(0);
        let error = String(logs.args[0])
        let errorLogged = error.includes(errorMessage);
        assert.isTrue(errorLogged, errorMessage);
        stub.restore();
        consoleSpy.restore();
    })
    describe('root calling etherlime debug', async () => {
        // let childProcess;
        // before(async function () {
        //     fs.mkdirSync('./contracts')
        //     fs.copyFileSync('./cli-commands/init/LimeFactory.sol', './contracts/LimeFactory.sol');
        // });

        it('should throw err if starting of debugger failed', async function () {
            let stub = sinon.stub(myDebugger, "run")
            stub.throws()
            let argv = {
                output: "some message"
            }
            let errorMessage = "Error"
            let consoleSpy = sinon.spy(console, "error");
            commands[7].commandProcessor(argv)
            let logs = consoleSpy.getCall(0);
            let error = String(logs.args[0])
            let errorLogged = error.includes(errorMessage);
            assert.isTrue(errorLogged, errorMessage);
            stub.restore();
            consoleSpy.restore();
        });

        // after(async function () {
        //     fs.removeSync('./contracts');
        // });
    });
})