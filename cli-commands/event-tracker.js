const KeenTracking = require('keen-tracking');
const analyticsKeys = require('./analytics.json');
const debugTestModule = 'nyc';
const config = require('../.config')
console.log(config.optOut)

let isProd = false;
try {
	require(debugTestModule);
} catch (e) {
	if (e.message.includes(`Cannot find module '${debugTestModule}'`)) {
		isProd = true;
	} else {
		throw e
	}
}

const analyticsClient = new KeenTracking({
	projectId: analyticsKeys.projectId,
	writeKey: analyticsKeys.writeKey
});

const recordEvent = (command, params) => {
	if (!isProd || config.optOut) {
		return false
	}
	analyticsClient.recordEvent(command, {
		params
	});
	return true
}



module.exports = {
	analyticsClient,
	recordEvent
};