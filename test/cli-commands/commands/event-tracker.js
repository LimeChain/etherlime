const assert = require('chai').assert;
const sinon = require('sinon');
const _module = require('module');

describe('event tracking', () => {

    let requireStub;
    beforeEach(() => {
        delete require.cache[require.resolve('../../../cli-commands/event-tracker')]
        requireStub = sinon.stub(_module, '_load');
    })

    it('The etherlime sends events in prod', () => {

        requireStub.withArgs('nyc').throws(new Error(`Cannot find module 'nyc'`));
        requireStub.callThrough();

        const { analyticsClient, recordEvent } = require('../../../cli-commands/event-tracker')

        const recordEventStub = sinon.stub(analyticsClient, 'recordEvent')
        recordEventStub.returns(true)

        recordEvent('test-event', {})

        assert(recordEventStub.called, 'recordEvent should be called in prod mode')

        recordEventStub.restore();

    })

    it('The etherlime is ran in debug mode', () => {

        requireStub.withArgs('nyc').returns({});
        requireStub.callThrough();

        const { analyticsClient, recordEvent } = require('../../../cli-commands/event-tracker')

        const recordEventStub = sinon.stub(analyticsClient, 'recordEvent')
        recordEventStub.returns(true)

        recordEvent('test', {})

        assert(recordEventStub.notCalled, 'recordEvent should not be called in debug mode')

        recordEventStub.restore();
    })

    afterEach(() => {
        requireStub.restore();
        sinon.reset()
    })


})