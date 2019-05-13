"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _ = require("lodash");
function cliTable2Json(lines) {
    lines[0] = lines[0].toLowerCase();
    var headerline = lines[0];
    var result = [];
    var column_headers = headerline.split(/ [ ]+/);
    var next_index = 1;
    var locations = column_headers.reduce(function (result2, title) {
        result2[title] = {
            end: next_index < column_headers.length ?
                headerline.indexOf(column_headers[next_index++])
                : headerline.indexOf(title) + 1000,
            start: headerline.indexOf(title),
        };
        return result2;
    }, {});
    lines.slice(1).forEach(function (line) {
        if (line.trim().length === 0) {
            return;
        }
        var item = {};
        result.push(item);
        _.forEach(locations, function (position, title) {
            item[title] = line.substring(position.start, position.end).trim();
        });
    });
    return result;
}
exports.cliTable2Json = cliTable2Json;
//# sourceMappingURL=index.js.map