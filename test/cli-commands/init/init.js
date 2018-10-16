const assert = require('chai').assert;
const fs = require('fs-extra');
const init = require('../../../cli-commands/init/init');
const expectThrow = require('../utils/utils').expectThrow;

const deploymentDir = './deployment';
const deploymentFileDestination = `${deploymentDir}/deploy.js`;

const testDir = './test';
const testFileDestination = `${testDir}/exampleTest.js`;

const contractsDir = './contracts';
const contractFileDestination = `${contractsDir}/LimeFactory.sol`;

const packageJsonDestination = './package.json';

describe('Init cli command', () => {

    let currentDir;

    beforeEach( async function() {
        currentDir = process.cwd();
        process.chdir('/tmp');
    })
    
    describe('Create deployment dir and example file', async() => {
        
        it('should create deployment folder and example file', async() => {
            let dirExists = fs.existsSync(deploymentDir);
            assert.isFalse(dirExists, "The 'deployment' folder already exists.");

            await init.run()

            let dirExistsAfterCreation = fs.existsSync(deploymentDir);
            assert.isTrue(dirExistsAfterCreation, "The 'deployment' folder should exist.")

            let fileExists = fs.existsSync(deploymentFileDestination)
            assert.isTrue(fileExists, "The 'deployment example file' should be copied in deployment folder")

        }).timeout(50000);

        it('should throw error if deployment example file already exists in deployment folder', async () => {
            await init.run();

            fs.removeSync(testDir);
            fs.removeSync(contractsDir);

            await expectThrow(init.run());
        }).timeout(50000);

    })

    describe('Create contracts dir and example file', async() => {
        
        it('should create contract dir and example file', async() => {
            let dirExists = fs.existsSync(contractsDir);
            assert.isFalse(dirExists, "The 'contracts' folder already exists.");

            await init.run();

            let dirExistsAfterCreation = fs.existsSync(contractsDir);
            assert.isTrue(dirExistsAfterCreation, "The 'contracts' folder should exist.");

            let fileExists = fs.existsSync(contractFileDestination)
            assert.isTrue(fileExists, "The 'contract example file' should be copied in deployment folder")

        }).timeout(50000);

        it('should throw error if contract example file already exists in deployment folder', async () => {
            await init.run();

            fs.removeSync(testDir);
            fs.removeSync(deploymentDir);

            await expectThrow(init.run());
        }).timeout(50000);

    });

    describe('Create tests folder and example file', async() => {
        
        it('should create contract dir and example file', async() => {
            let dirExists = fs.existsSync(testDir);
            assert.isFalse(dirExists, "The 'test' folder already exists.");

            await init.run();

            let dirExistsAfterCreation = fs.existsSync(testDir);
            assert.isTrue(dirExistsAfterCreation, "The 'test' folder should exist.");

            let fileExists = fs.existsSync(testFileDestination);
            assert.isTrue(fileExists, "The 'test example file' should be copied in deployment folder")
        }).timeout(50000);

        it('should throw error if test example file already exists in deployment folder', async () => {
            await init.run();

            fs.removeSync(contractsDir);
            fs.removeSync(deploymentDir);

            await expectThrow(init.run());
        }).timeout(50000);
    });

    afterEach(async function() {
        fs.removeSync(deploymentDir);
        fs.removeSync(testDir);
        fs.removeSync(contractsDir);
        fs.removeSync(packageJsonDestination);
        fs.removeSync('./package-lock.json');
        fs.removeSync('./node_modules');
        process.chdir(currentDir);
    });

});

