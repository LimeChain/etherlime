const logsStore = require('./../../logs-store/logs-store');
const utils = require('./../util');
const logger = require('./../../logger-service/logger-service').logger;
const loggerAppenderTypes = require('./../../logger-service/logger-service').AppenderTypes;

const run = async (limit, output) => {
	const history = logsStore.getHistory();
	const start = (history.length > limit) ? history.length - limit : 0;
	for (let i = start; i < history.length; i++) {
		logger.log(`Execution ID: ${i}:`)
		const currentRecord = history[i];

		if (output === loggerAppenderTypes.NORMAL) {
			utils.printReportTable(currentRecord.actions);
			logger.log();
		}
	}
};


module.exports = {
	run
};