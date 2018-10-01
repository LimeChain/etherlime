const fsExtra = require('fs-extra');
const outputCache = new Map();

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
		console.log.apply(console, args);
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

		if (outputCache.has(outputParameterStoragePath)) {
			fileContent = outputCache.get(outputParameterStoragePath);
			return fileContent;
		}

		if (!fsExtra.existsSync(outputParameterStoragePath)) {
			throw new Error('Missing the storage file for output parameter.');
		}

		fileContent = fsExtra.readFileSync(outputParameterStoragePath).toString('utf-8');
		this.updateOutputCache(fileContent);

		return fileContent;
	}

	updateOutputCache(value) {
		outputCache.set(outputParameterStoragePath, value);
	}

	clearOutputCache() {
		outputCache.clear();
	}

	removeOutputStorage() {
		fsExtra.remove(outputParameterStoragePath);
	}
}

const logger = new Logger();

module.exports = {
	logger,
	AppenderTypes
};