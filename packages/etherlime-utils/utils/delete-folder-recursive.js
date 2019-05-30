const path = require('path');
const fs = require('fs');

const deleteFolderRecursive = async (pathForDelete) => {
	if (!fs.existsSync(pathForDelete)) {
		return;
	}
	let readFile = await fs.readdirSync(pathForDelete);
	for (let i = 0; i < readFile.length; i++) {
		let currentPath = path.join(pathForDelete, readFile[i]);
		if (!fs.lstatSync(currentPath).isDirectory()) {
			fs.unlinkSync(currentPath);
		}
		await deleteFolderRecursive(currentPath);
	}
	fs.rmdirSync(pathForDelete);

};

module.exports = { deleteFolderRecursive };