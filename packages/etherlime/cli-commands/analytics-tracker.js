const AnalyticsClient = require('cli-analytics-sdk');
let analytics = require('./analytics.json');
const debugTestModule = 'nyc';
const fs = require('fs-extra');

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

const analyticsClient = new AnalyticsClient({
    appId: analytics.app_id,
    url: analytics.app_url
})

class AnalyticsTracker {

    static async recordEvent(eventType, metadata) {

        if (!isProd || analytics.optOut) {
            return false
        }

        try {
            metadata = adjustData(metadata)
            await analyticsClient.recordEvent(eventType, metadata)
        } catch (e) {
            return false
        }

        return true
    }

    static optOutUser() {
        analytics.optOut = true;
        const spaces = 4; // number of space characters to be inserted for readability purposes	
        fs.writeFileSync(`${__dirname}/analytics.json`, JSON.stringify(analytics, null, spaces)) //second param is a string replacer if needed	
    }
}

// adjust data to array and remove unsuitable keys
function adjustData(metadata) {
    let data = [];
    Object.keys(metadata).forEach(key => {
        if (!key.startsWith('$') && !key.startsWith('_')) {
            data.push({
                [key]: metadata[key]
            })
        }
    })
    return data
}

module.exports = AnalyticsTracker