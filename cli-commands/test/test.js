let etherlimeTest = require('./etherlime-test');

let dir = require('node-dir');
let Config = require('./../compiler/etherlime-config');

const run = async (path) => {
	var config = Config.default();
	var testDirectory = '';

	if (path.includes('.js')) {
		etherlimeTest.run([path]);
		return;
	} 
	
	if (!path.includes(config.test_directory)) {
		testDirectory = `${process.cwd()}/${path}`;
	} else {
		testDirectory = path;
	}

	dir.files(testDirectory, (error, files) => {
		if (error) {
			throw new Error(error);
		}

		files = files.filter(function (file) {
			return file.match(config.test_file_extension_regexp) != null;
		});

		etherlimeTest.run(files);
	});
}

module.exports = {
	run
}