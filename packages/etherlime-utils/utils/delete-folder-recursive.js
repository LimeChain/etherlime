const path = require('path');
const fs = require('fs');

const deleteFolderRecursive = async (pathForDelete) => {
	if (!fs.existsSync(pathForDelete)) {
		return;
	}
	fs.readdirSync(pathForDelete).forEach(function (file) {
		let currentPath = path.join(pathForDelete, file);
		if (!fs.lstatSync(currentPath).isDirectory()) {
			fs.unlinkSync(currentPath);
		}
		deleteFolderRecursive(currentPath);
	});
	fs.rmdirSync(pathForDelete);

};

module.exports = { deleteFolderRecursive };