exports.__esModule = true;
var global_1 = require("../core/global");
/**
 * @hidden
 */
var bfsSetImmediate;
if (typeof (setImmediate) !== "undefined") {
    bfsSetImmediate = setImmediate;
}
else {
    var gScope_1 = global_1["default"];
    var timeouts_1 = [];
    var messageName_1 = "zero-timeout-message";
    var canUsePostMessage = function () {
        if (typeof gScope_1.importScripts !== 'undefined' || !gScope_1.postMessage) {
            return false;
        }
        var postMessageIsAsync = true;
        var oldOnMessage = gScope_1.onmessage;
        gScope_1.onmessage = function () {
            postMessageIsAsync = false;
        };
        gScope_1.postMessage('', '*');
        gScope_1.onmessage = oldOnMessage;
        return postMessageIsAsync;
    };
    if (canUsePostMessage()) {
        bfsSetImmediate = function (fn) {
            timeouts_1.push(fn);
            gScope_1.postMessage(messageName_1, "*");
        };
        var handleMessage = function (event) {
            if (event.source === self && event.data === messageName_1) {
                if (event.stopPropagation) {
                    event.stopPropagation();
                }
                else {
                    event.cancelBubble = true;
                }
                if (timeouts_1.length > 0) {
                    var fn = timeouts_1.shift();
                    return fn();
                }
            }
        };
        if (gScope_1.addEventListener) {
            gScope_1.addEventListener('message', handleMessage, true);
        }
        else {
            gScope_1.attachEvent('onmessage', handleMessage);
        }
    }
    else if (gScope_1.MessageChannel) {
        // WebWorker MessageChannel
        var channel_1 = new gScope_1.MessageChannel();
        channel_1.port1.onmessage = function (event) {
            if (timeouts_1.length > 0) {
                return timeouts_1.shift()();
            }
        };
        bfsSetImmediate = function (fn) {
            timeouts_1.push(fn);
            channel_1.port2.postMessage('');
        };
    }
    else {
        bfsSetImmediate = function (fn) {
            return setTimeout(fn, 0);
        };
    }
}
exports["default"] = bfsSetImmediate;
//# sourceMappingURL=setImmediate.js.map