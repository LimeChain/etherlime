const { logsStore, logger, AppenderTypes } = require('etherlime-logger');
const utils = require('./../util');

const run = async (limit, output) => {
	const history = logsStore.getHistory();
	const start = (history.length > limit) ? history.length - limit : 0;	
	for (let i = start; i < history.length; i++) {
		logger.log(`Execution ID: ${i}:`)
		const currentRecord = history[i];

		if (output === AppenderTypes.NORMAL) {
			utils.printReportTable(currentRecord.actions);
			logger.log();
		}
	}
};


module.exports = {
	run
};