const assert = require('chai').assert;
const sinon = require('sinon');
const _module = require('module');
const fs = require('fs-extra');

describe('event tracking', () => {

    let requireStub;
    beforeEach(() => {
        delete require.cache[require.resolve('../../../../packages/etherlime/cli-commands/event-tracker')]
        requireStub = sinon.stub(_module, '_load');
    })

    it('The etherlime sends events in prod', () => {

        requireStub.withArgs('nyc').throws(new Error(`Cannot find module 'nyc'`));
        requireStub.callThrough();

        const { analyticsClient, recordEvent } = require('../../../../packages/etherlime/cli-commands/event-tracker')

        const recordEventStub = sinon.stub(analyticsClient, 'recordEvent')
        recordEventStub.returns(true)

        recordEvent('test-event', {})

        assert(recordEventStub.called, 'recordEvent should be called in prod mode')

        recordEventStub.restore();

    })

    it('The etherlime is ran in debug mode', () => {

        requireStub.withArgs('nyc').returns({});
        requireStub.callThrough();

        const { analyticsClient, recordEvent } = require('../../../../packages/etherlime/cli-commands/event-tracker')

        const recordEventStub = sinon.stub(analyticsClient, 'recordEvent')
        recordEventStub.returns(true)

        recordEvent('test', {})

        assert(recordEventStub.notCalled, 'recordEvent should not be called in debug mode')

        recordEventStub.restore();
    })

    it('The etherlime throws if no mode is identified', () => {

        requireStub.withArgs('nyc').throws(new Error('Incorrect Error'));
        requireStub.callThrough();

        assert.throws(() => { require('../../../../packages/etherlime/cli-commands/event-tracker') }, 'Incorrect Error')


    })

    it('The etherlime does not sends events if user opt-out', async () => {
        const analyticsBefore = fs.readFileSync(`${process.cwd()}/packages/etherlime/cli-commands/analytics.json`, 'utf8')
        const parsedAnalytics = JSON.parse(analyticsBefore)

        requireStub.withArgs('nyc').throws(new Error(`Cannot find module 'nyc'`));
        requireStub.callThrough();

        const { analyticsClient, recordEvent, optOutUser } = require('../../../../packages/etherlime/cli-commands/event-tracker')

        optOutUser()

        const recordEventStub = sinon.stub(analyticsClient, 'recordEvent')
        assert(recordEventStub.notCalled, 'recordEvent should not be called if user opt-out')
        
        fs.writeFileSync(`${process.cwd()}/packages/etherlime/cli-commands/analytics.json`, JSON.stringify(parsedAnalytics, null, 2))
    })

    afterEach(() => {
        requireStub.restore();
        sinon.reset()
    })


})