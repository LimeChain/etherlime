const logsStore = require('./../../logs-store/logs-store');
const utils = require('./../util');


const run = async (limit) => {
	const history = logsStore.getHistory();
	const start = (history.length > limit) ? history.length - limit : 0;
	for (let i = start; i < history.length; i++) {
		console.log(`Execution ID: ${i}:`)
		const currentRecord = history[i];
		utils.printReportTable(currentRecord.actions);
		console.log();
	}

}


module.exports = {
	run
}