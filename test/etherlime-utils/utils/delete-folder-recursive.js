const fs = require('fs');
const assert = require('assert');
const deleteFolderRecursive = require('./../../../packages/etherlime-utils/utils/delete-folder-recursive').deleteFolderRecursive;

describe('deleteFolderRecursive utils tests', () => {
	let folderWithFileName = './folderWithFile'
	before(() => {
		fs.mkdirSync('./recursiveDelete');
		currentDir = process.cwd();
		process.chdir('./recursiveDelete');
		fs.mkdirSync(folderWithFileName);
		fs.writeFileSync(`${folderWithFileName}/Test.json`, 'Test File For Deletion')
	})

	it('should delete folder and file', async () => {
		await deleteFolderRecursive(`${process.cwd()}/${folderWithFileName}`);
		assert.ok(!fs.existsSync(folderWithFileName))
	});

	after(async () => {
		process.chdir(currentDir);
		fs.rmdirSync('./recursiveDelete');
	})
});