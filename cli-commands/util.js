const ethersUtils = require("ethers").utils;
const colors = require('./../utils/colors');
const Table = require('cli-table');
const moment = require('moment');

const printReportTable = (recordActions) => {
	const table = new Table({
		head: ['Event Time', 'Executor', 'Name or Label', 'Tx Hash', 'Status', 'Gas Price', 'Gas Used', 'Result'],
		style: { head: ['magenta'], 'padding-left': 1, 'padding-right': 1 }
	});
	for (const action of recordActions) {
		table.push([
			`${moment(action.eventTimestamp).format('D MMM, HH:MM:ss')}`,
			`${action.deployerType}`,
			`${colors.colorName(action.nameOrLabel)}`,
			`${action.transactionHash}`,
			`${getReadableStatus(action.status)}`,
			`${ethersUtils.formatUnits(action.gasPrice, 'gwei')} Gwei`,
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