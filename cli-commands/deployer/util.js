const colors = require('../../utils/colors');
const Table = require('cli-table');
const moment = require('moment');

const printReportTable = (recordActions) => {
	console.log(`Here is your report:`);
	const table = new Table({
		head: ['Event Time', 'Executor', 'Contract name or TX label', 'Transaction Hash', 'Status', 'Gas Price', 'Gas Used', 'Result'],
		style: { head: ['magenta'] }
	});
	for (const action of recordActions) {
		table.push([
			`${moment(action.eventTimestamp).format('D MMM, HH:MM:ss')}`,
			`${action.deployerType}`,
			`${colors.colorName(action.nameOrLabel)}`,
			`${action.transactionHash}`,
			`${getReadableStatus(action.status)}`,
			`${action.gasPrice}`,
			`${action.gasUsed}`,
			`${action.result}`
		])
	}

	console.log(table.toString());
}

const getReadableStatus = (status) => {
	if (status === 0) {
		return `${colors.colorSuccess('Success')}`
	}

	return `${colors.colorFailure('Fail')}`
}

module.exports = {
	printReportTable,
	getReadableStatus
}