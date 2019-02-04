const ethersUtils = require("ethers").utils;
const colors = require('./../utils/colors');
const Table = require('cli-table');
const moment = require('moment');

const printReportTable = (recordActions) => {

	const table = new Table();
	let actionIndex = 0;

	for (const action of recordActions) {
		actionIndex++;

		table.push(
			{ 'Event Time': `${moment(action.eventTimestamp).format('D MMM, HH:MM:ss')}` },
			{ 'Executor': `${action.deployerType}` },
			{ 'Name or Label': `${colors.colorName(action.nameOrLabel)}` },
			{ 'Tx Hash': `${action.transactionHash}` },
			{ 'Status': `${getReadableStatus(action.status)}` },
			{ 'Gas Price': `${ethersUtils.formatUnits(action.gasPrice, 'gwei')} Gwei` },
			{ 'Gas Used': `${action.gasUsed}` },
			{ 'NetworkID': `${action.networkID}`},
			{ 'Result': `${action.result}` }
		);

		if (recordActions.length > 1 && actionIndex < recordActions.length) {
			table.push({ '': '' });
		}
	}

	console.log(table.toString());
};

const getReadableStatus = (status) => {
	if (status === 0) {
		return `${colors.colorSuccess('Success')}`
	}

	return `${colors.colorFailure('Fail')}`
};

module.exports = {
	printReportTable,
	getReadableStatus
};