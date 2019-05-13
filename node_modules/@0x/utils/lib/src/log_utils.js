"use strict";
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
var chalk_1 = require("chalk");
var _ = require("lodash");
var DEFAULT_TERMINAL_WIDTH = 80;
var TERMINAL_WIDTH = _.get(process, 'stdout.columns') || DEFAULT_TERMINAL_WIDTH;
exports.logUtils = {
    log: function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        console.log.apply(console, __spread(args)); // tslint:disable-line:no-console
    },
    header: function (text, padStr) {
        if (padStr === void 0) { padStr = '='; }
        var padLength = TERMINAL_WIDTH - text.length;
        var padLengthEnd = (padLength + 1) / 2;
        var leftPadded = text.padStart(TERMINAL_WIDTH - padLengthEnd, padStr);
        var padded = leftPadded.padEnd(TERMINAL_WIDTH, padStr);
        console.log(padded); // tslint:disable-line:no-console
    },
    warn: function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        console.warn.apply(console, __spread(args)); // tslint:disable-line:no-console
    },
    table: function (columnarData) {
        var formattedColumnarData = _.mapValues(columnarData, function (columnOrColumns, _rowName) {
            return _.isNumber(columnOrColumns) ? columnOrColumns.toLocaleString() : columnOrColumns;
        });
        console.table(formattedColumnarData); // tslint:disable-line:no-console
    },
    logWithTime: function (arg) {
        exports.logUtils.log("[" + chalk_1.default.gray(new Date().toLocaleTimeString()) + "] " + arg);
    },
};
//# sourceMappingURL=log_utils.js.map