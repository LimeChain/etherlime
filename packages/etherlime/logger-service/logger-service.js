const fsExtra = require('fs-extra');
let outputCache; // = new Map();
let logger;

const AppenderTypes = {
	NONE: 'none',
	NORMAL: 'normal',
	STRUCTURED: 'structured'
};

const outputParameterStoragePath = `${process.cwd()}/.outputParameter`;

class Logger {

	constructor() {
	}

	log() {
		const appenderType = this.getOutputParameterValue();
		const args = Array.prototype.slice.call(arguments);

		if (appenderType === AppenderTypes.NONE) {
			return;
		}

		if (appenderType === AppenderTypes.STRUCTURED) {
			this.logToFile(args);
			return;
		}

		this.logToConsole(args);
	}

	logToConsole(args) {
		console.log(...args);
	}

	logToFile(args) {
		//ToDO: Log to file implementation
	}

	storeOutputParameter(value) {
		fsExtra.writeFileSync(outputParameterStoragePath, value);
		this.updateOutputCache(value);
	}

	getOutputParameterValue() {
		let fileContent;

		if (outputCache) {
			fileContent = outputCache;
			return fileContent;
		}

		if (!fsExtra.existsSync(outputParameterStoragePath)) {
			return AppenderTypes.NONE;
		}

		fileContent = fsExtra.readFileSync(outputParameterStoragePath).toString('utf-8');
		this.updateOutputCache(fileContent);

		return fileContent;
	}

	updateOutputCache(value) {
		outputCache = value;
	}

	clearOutputCache() {
		outputCache = '';
	}

	removeOutputStorage() {
		fsExtra.remove(outputParameterStoragePath);
	}
}

class WindowCompatibleLogger {

	constructor() {
	}

	log() {
		return;
	}

	logToConsole(args) {
		return;
	}

	logToFile(args) {
		return;
	}

	storeOutputParameter(value) {
		return;
	}

	getOutputParameterValue() {
		return;
	}

	updateOutputCache(value) {
		return;
	}

	clearOutputCache() {
		return;
	}

	removeOutputStorage() {
		return;
	}
}

if (typeof window === 'undefined') {
	logger = new Logger();
} else {
	logger = new WindowCompatibleLogger();
}

module.exports = {
	logger,
	AppenderTypes
};