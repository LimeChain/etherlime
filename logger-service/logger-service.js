const fs = require('fs');
const fsExtra = require('fs-extra');

const AppenderTypes = {
	NONE: 'none',
	NORMAL: 'normal',
	STRUCTURED: 'structured'
};

const outputParameterStoragePath = `${process.cwd()}/.outputParameter.txt`;

class LoggerService {

	constructor() {
	}

	record(data, appenderType = AppenderTypes.NORMAL) {
		if (appenderType === AppenderTypes.NONE) {
			return;
		}

		if (appenderType === AppenderTypes.STRUCTURED) {
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
			return '';
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