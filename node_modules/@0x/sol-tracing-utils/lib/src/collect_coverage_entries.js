"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ethUtil = require("ethereumjs-util");
var parser = require("solidity-parser-antlr");
var ast_visitor_1 = require("./ast_visitor");
var source_maps_1 = require("./source_maps");
// Parsing source code for each transaction/code is slow and therefore we cache it
var sourceHashToCoverageEntries = {};
exports.collectCoverageEntries = function (contractSource, ignoreRegexp) {
    var sourceHash = ethUtil.sha3(contractSource).toString('hex');
    if (sourceHashToCoverageEntries[sourceHash] === undefined && contractSource !== undefined) {
        var ast = parser.parse(contractSource, { range: true });
        var offsetToLocation = source_maps_1.getOffsetToLocation(contractSource);
        var ignoreRangesBeginningAt = ignoreRegexp === undefined ? [] : gatherRangesToIgnore(contractSource, ignoreRegexp);
        var visitor = new ast_visitor_1.ASTVisitor(offsetToLocation, ignoreRangesBeginningAt);
        parser.visit(ast, visitor);
        sourceHashToCoverageEntries[sourceHash] = visitor.getCollectedCoverageEntries();
    }
    var coverageEntriesDescription = sourceHashToCoverageEntries[sourceHash];
    return coverageEntriesDescription;
};
// Gather the start index of all code blocks preceeded by "/* solcov ignore next */"
function gatherRangesToIgnore(contractSource, ignoreRegexp) {
    var ignoreRangesStart = [];
    var match;
    do {
        match = ignoreRegexp.exec(contractSource);
        if (match) {
            var matchLen = match[0].length;
            ignoreRangesStart.push(match.index + matchLen);
        }
    } while (match);
    return ignoreRangesStart;
}
//# sourceMappingURL=collect_coverage_entries.js.map