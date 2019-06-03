const ethersUtils = require("ethers").utils;
const colors = require('etherlime-utils').colors;
const Table = require('cli-table');
const getReadableTime = require('etherlime-utils').getReadableTime;

const printReportTable = (recordActions) => {

	const table = new Table();
	let actionIndex = 0;

	for (const action of recordActions) {
		actionIndex++;
		table.push(
			{ 'Event Time': `${getReadableTime(action.eventTimestamp)}` },
			{ 'Executor': `${action.deployerType}` },
			{ 'Name or Label': `${colors.colorName(action.nameOrLabel)}` },
			{ 'Tx Hash': `${action.transactionHash}` },
			{ 'Status': `${getReadableStatus(action.status)}` },
			{ 'Gas Price': `${ethersUtils.formatUnits(action.gasPrice, 'gwei')} Gwei` },
			{ 'Gas Used': `${action.gasUsed}` },
			{ 'NetworkID': action.networkID ? `${action.networkID}` : `Not recorded` },
			{ 'Result': `${action.result}` },
			{ 'Solc Version': action.solcVersion ? `${action.solcVersion}` : `Not recorded` },
			{ 'Contract Verification': action.verification ? `${getVerificationStatus(action.verification)}` : `Not recorded` }
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

const getVerificationStatus = (status) => {
	if (status === 'Success') {
		return `${colors.colorSuccess(status)}`
	}

	return `${colors.colorFailure(status)}`
}

module.exports = {
	printReportTable,
	getReadableStatus
};