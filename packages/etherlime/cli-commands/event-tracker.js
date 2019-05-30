const KeenTracking = require('keen-tracking');
const analytics = require('./analytics.json');
let debugTestModule;
const fs = require('fs-extra');

let isProd = false;
// try {
// 	debugTestModule = require('nyc');
// } catch (e) {
// 	if (e.message.includes(`Cannot find module '${debugTestModule}'`)) {
// 		isProd = true;
// 	} else {
// 		throw e
// 	}
// }

const analyticsClient = new KeenTracking({
	projectId: analytics.projectId,
	writeKey: analytics.writeKey
});

const recordEvent = (command, params) => {
	if (!isProd || analytics.optOut) {
		return false
	}
	analyticsClient.recordEvent(command, {
		params
	});
	return true
}

const optOutUser = () => {
	analytics.optOut = true;
	const spaces = 4; // number of space characters to be inserted for readability purposes
	fs.writeFileSync(`${__dirname}/analytics.json`, JSON.stringify(analytics, null, spaces)) //second param is a string replacer if needed
}

module.exports = {
	analyticsClient,
	recordEvent,
	optOutUser
};