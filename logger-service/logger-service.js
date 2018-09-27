const fs = require('fs');
const fsExtra = require('fs-extra');

const AppenderTypes = {
	NONE: 'silence',
	CONSOLE: 'console',
	STRUCTURED_FILE: 'file'
};

const outputParameterStoragePath = `${process.cwd()}/.outputParameter.txt`;

class LoggerService {

	constructor() {
	}

	record(data, appenderType = AppenderTypes.CONSOLE) {
		if (appenderType === AppenderTypes.NONE) {
			return;
		}

		if (appenderType === AppenderTypes.STRUCTURED_FILE) {
			this.logToFile(data);
			return;
		}

		this.logToConsole(data);
	}

	logToConsole(data) {
		console.log(data.toString());
	}

	logToFile(data) {
		//ToDO: Log to file implementation
	}


	storeOutputParameter(value) {
		fs.writeFileSync(outputParameterStoragePath, value);
	}

	getOutputParameterValue() {
		if (!fsExtra.existsSync(outputParameterStoragePath)) {
			return;
		}

		const fileContent = fs.readFileSync(outputParameterStoragePath).toString('utf-8');

		return fileContent;
	}

	removeOutputStorage() {
		fsExtra.remove(outputParameterStoragePath);
	}
}

const loggerService = new LoggerService();

module.exports = {
	loggerService,
	AppenderTypes
};