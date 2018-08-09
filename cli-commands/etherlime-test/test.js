let etherlimeTest = require('./etherlime-test');

let dir = require('node-dir');
let Config = require('./../compiler/etherlime-config');

const run = async (path) => {
	var config = Config.default();
	var testDirectory = '';

	if (path.includes('.js')) {
		await etherlimeTest.run([path]);

		return;
	} 
	
	if (!path.includes(config.test_directory)) {
		testDirectory = `${process.cwd()}/${path}`;
	} else {
		testDirectory = path;
	}

	const files = await getFiles(testDirectory, config);

	await etherlimeTest.run(files);
}

const getFiles = async function(testDirectory, config) {

	return new Promise((resolve, reject) => {
		dir.files(testDirectory, (error, files) => {
			if (error) {
				reject(new Error(error));

				return;
			}
	
			files = files.filter(function (file) {
				return file.match(config.test_file_extension_regexp) != null;
			});
	
			resolve(files);
		});
	});
}

module.exports = {
	run
}