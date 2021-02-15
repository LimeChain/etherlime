const assert = require('chai').assert;	
const sinon = require('sinon');	
const _module = require('module');	
const fs = require('fs-extra');	

describe('analytics tracking', () => {	

    let requireStub;	
    beforeEach(() => {	
        delete require.cache[require.resolve('../../../packages/etherlime/cli-commands/analytics-tracker.js')]	
        requireStub = sinon.stub(_module, '_load');	
    })

    // it('The etherlime record event data in prod', async () => {	

    //     requireStub.withArgs('nyc').throws(new Error(`Cannot find module 'nyc'`));	
    //     requireStub.callThrough();	

    //     const analyticsClient = require('../../../packages/etherlime/cli-commands/analytics-tracker');

    //     let returnValue = await analyticsClient.recordEvent('test-event', {key: "value"});
    //     assert.isTrue(returnValue, 'recordEvent should be called in prod mode');
    // })	

    it('The etherlime is ran in debug mode', async () => {	

        requireStub.withArgs('nyc').returns({});	
        requireStub.callThrough();	

        const analyticsClient = require('../../../packages/etherlime/cli-commands/analytics-tracker');
        let returnValue = await analyticsClient.recordEvent('test', {});

        assert.isFalse(returnValue, 'recordEvent should not be called in debug mode');
    })

    it('The etherlime throws if no mode is identified', () => {	

        requireStub.withArgs('nyc').throws(new Error('Incorrect Error'));	
        requireStub.callThrough();	

        assert.throws(() => { require('../../../packages/etherlime/cli-commands/analytics-tracker') }, 'Incorrect Error')	

    })
    
    it('The etherlime not throws if api client is down for some reason', async () => {
        delete require.cache[require.resolve('../../../packages/etherlime/cli-commands/analytics.json')]
        const analyticsBefore = fs.readFileSync(`${process.cwd()}/packages/etherlime/cli-commands/analytics.json`, 'utf8')	
        let parsedAnalytics = JSON.parse(analyticsBefore)
        parsedAnalytics.app_url = 'http://unexisting:3000'
    
        await fs.writeFileSync(`${process.cwd()}/packages/etherlime/cli-commands/analytics.json`, JSON.stringify(parsedAnalytics, null, 2))

        requireStub.withArgs('nyc').throws(new Error(`Cannot find module 'nyc'`));	
        requireStub.callThrough();
        
        const analyticsClient = require('../../../packages/etherlime/cli-commands/analytics-tracker');
        let returnValue = await analyticsClient.recordEvent('test', {});

        assert.isFalse(returnValue, 'recordEvent should not throws or returns true');
        parsedAnalytics = JSON.parse(analyticsBefore)
        await fs.writeFileSync(`${process.cwd()}/packages/etherlime/cli-commands/analytics.json`, JSON.stringify(parsedAnalytics, null, 2))	
    })

    it('The etherlime does not sends events if user opt-out', async () => {	
        const analyticsBefore = fs.readFileSync(`${process.cwd()}/packages/etherlime/cli-commands/analytics.json`, 'utf8')	
        const parsedAnalytics = JSON.parse(analyticsBefore)	

        requireStub.withArgs('nyc').throws(new Error(`Cannot find module 'nyc'`));	
        requireStub.callThrough();	

        const analyticsClient = require('../../../packages/etherlime/cli-commands/analytics-tracker')	

        analyticsClient.optOutUser()	

        let returnValue = await analyticsClient.recordEvent('test-command', {})
        assert.isFalse(returnValue, 'recordEvent should not be called if user opt-out')	

        fs.writeFileSync(`${process.cwd()}/packages/etherlime/cli-commands/analytics.json`, JSON.stringify(parsedAnalytics, null, 2))	
    })

    afterEach(() => {	
        requireStub.restore();	
        sinon.reset()	
    })	


}) 