"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var test = require("blue-tape");
var index_1 = require("./index");
test('cli-table-2-json', function (t) {
    t.test('convert array of strings to array of objects', function (t) {
        var lines = ['NAME      ACTIVE   DRIVER      STATE     URL                         SWARM',
            'consul1   -        amazonec2   Running   tcp://54.175.200.212:2376   ',
            'consul2   -        amazonec2   Running   tcp://52.23.236.38:2376     ',
            'consul3   -        amazonec2   Running   tcp://54.85.111.241:2376    ',
            ''];
        var expected = [{
                active: '-', driver: 'amazonec2',
                name: 'consul1',
                state: 'Running',
                swarm: '',
                url: 'tcp://54.175.200.212:2376',
            }, {
                active: '-',
                driver: 'amazonec2',
                name: 'consul2',
                state: 'Running',
                swarm: '',
                url: 'tcp://52.23.236.38:2376',
            }, {
                active: '-',
                driver: 'amazonec2',
                name: 'consul3',
                state: 'Running',
                swarm: '',
                url: 'tcp://54.85.111.241:2376',
            }];
        var result = index_1.cliTable2Json(lines);
        t.equal(result.length, expected.length);
        t.equal(result[0].name, expected[0].name);
        t.end();
    });
});
//# sourceMappingURL=index.spec.js.map