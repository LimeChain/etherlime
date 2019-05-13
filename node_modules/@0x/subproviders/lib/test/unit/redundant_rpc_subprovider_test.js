"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("@0x/utils");
var chai = require("chai");
var Sinon = require("sinon");
var src_1 = require("../../src");
var chai_setup_1 = require("../chai_setup");
var ganache_subprovider_1 = require("../utils/ganache_subprovider");
var report_callback_errors_1 = require("../utils/report_callback_errors");
var expect = chai.expect;
chai_setup_1.chaiSetup.configure();
var DEFAULT_NUM_ACCOUNTS = 10;
describe('RedundantSubprovider', function () {
    var provider;
    it('succeeds when supplied a healthy endpoint', function (done) {
        provider = new src_1.Web3ProviderEngine();
        var subproviders = [ganache_subprovider_1.ganacheSubprovider];
        var redundantSubprovider = new src_1.RedundantSubprovider(subproviders);
        provider.addProvider(redundantSubprovider);
        utils_1.providerUtils.startProviderEngine(provider);
        var payload = {
            jsonrpc: '2.0',
            method: 'eth_accounts',
            params: [],
            id: 1,
        };
        var callback = report_callback_errors_1.reportCallbackErrors(done)(function (err, response) {
            expect(err).to.be.a('null');
            expect(response.result.length).to.be.equal(DEFAULT_NUM_ACCOUNTS);
            done();
        });
        provider.sendAsync(payload, callback);
    });
    it('succeeds when supplied at least one healthy endpoint', function (done) {
        provider = new src_1.Web3ProviderEngine();
        var nonExistentSubprovider = new src_1.RPCSubprovider('http://does-not-exist:3000');
        var handleRequestStub = Sinon.stub(nonExistentSubprovider, 'handleRequest').throws(new Error('REQUEST_FAILED'));
        var subproviders = [nonExistentSubprovider, ganache_subprovider_1.ganacheSubprovider];
        var redundantSubprovider = new src_1.RedundantSubprovider(subproviders);
        provider.addProvider(redundantSubprovider);
        utils_1.providerUtils.startProviderEngine(provider);
        var payload = {
            jsonrpc: '2.0',
            method: 'eth_accounts',
            params: [],
            id: 1,
        };
        var callback = report_callback_errors_1.reportCallbackErrors(done)(function (err, response) {
            expect(err).to.be.a('null');
            expect(response.result.length).to.be.equal(DEFAULT_NUM_ACCOUNTS);
            handleRequestStub.restore();
            done();
        });
        provider.sendAsync(payload, callback);
    });
});
//# sourceMappingURL=redundant_rpc_subprovider_test.js.map