const path = require('path');
const fs = require('fs');

const deleteFolderRecursive = async (pathForDelete) => {
	if (!fs.existsSync(pathForDelete)) {
		return;
	}
	const files = await fs.readdirSync(pathForDelete);
	for (let i = 0; i < files.length; i++) {
		let currentPath = path.join(pathForDelete, files[i]);
		if (!fs.lstatSync(currentPath).isDirectory()) {
			fs.unlinkSync(currentPath);
		}
		deleteFolderRecursive(currentPath);
	}
	fs.rmdirSync(pathForDelete);

};

module.exports = { deleteFolderRecursive };