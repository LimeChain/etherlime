const ethersUtils = require("ethers").utils;
const colors = require('etherlime-utils').colors;
const Table = require('etherlime-utils').Table;

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

const getReadableTime = (timeStamp) => {
	const monthNames = ["January", "February", "March", "April", "May", "June",
		"July", "August", "September", "October", "November", "December"
	];
	// Full date from timestamp
	let fullDate = new Date(timeStamp);

	// Current month:
	let month = monthNames[fullDate.getMonth()]

	// Current day of the month
	let date = fullDate.getDate();

	// Hours part from the timestamp
	let hours = fullDate.getHours();

	// Minutes part from the timestamp
	let minutes = "0" + fullDate.getMinutes();

	// Seconds part from the timestamp
	let seconds = "0" + fullDate.getSeconds();

	let formattedTime = `${date} ${month}, ${hours}:${minutes.substr(-2)}:${seconds.substr(-2)}`;
	return formattedTime
}

module.exports = {
	printReportTable,
	getReadableStatus
};