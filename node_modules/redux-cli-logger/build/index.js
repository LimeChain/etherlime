'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createCLILogger;
var colors = require("colors/safe");

// gets top level keys and prints them in format
var topLevel = function topLevel(obj, rightArrow) {
  var formatted = '';
  Object.keys(obj).forEach(function (key) {
    if (key.length > 0) {
      formatted += rightArrow + ' ' + key + ' ';
    }
    if (obj.hasOwnProperty(key)) {
      formatted += JSON.stringify(obj[key]) + '\n';
    }
  });

  return formatted;
};

var renderToConsole = function renderToConsole(obj, rightArrow) {
  try {
    return topLevel(obj, rightArrow);
  } catch (e) {
    return obj;
  }
};

function createCLILogger(options) {
  var _options$downArrow = options.downArrow,
      downArrow = _options$downArrow === undefined ? '▼' : _options$downArrow,
      _options$rightArrow = options.rightArrow,
      rightArrow = _options$rightArrow === undefined ? '▶' : _options$rightArrow,
      _options$messageColor = options.messageColor,
      messageColor = _options$messageColor === undefined ? 'yellow' : _options$messageColor,
      _options$prevColor = options.prevColor,
      prevColor = _options$prevColor === undefined ? 'grey' : _options$prevColor,
      _options$actionColor = options.actionColor,
      actionColor = _options$actionColor === undefined ? 'blue' : _options$actionColor,
      _options$nextColor = options.nextColor,
      nextColor = _options$nextColor === undefined ? 'green' : _options$nextColor,
      _options$predicate = options.predicate,
      predicate = _options$predicate === undefined ? null : _options$predicate,
      _options$log = options.log,
      log = _options$log === undefined ? console.log : _options$log,
      _options$stateTransfo = options.stateTransformer,
      stateTransformer = _options$stateTransfo === undefined ? function (x) {
    return x;
  } : _options$stateTransfo,
      _options$actionTransf = options.actionTransformer,
      actionTransformer = _options$actionTransf === undefined ? function (x) {
    return x;
  } : _options$actionTransf;


  return function (store) {
    return function (next) {
      return function (action) {
        var getState = store.getState;


        if (predicate && !predicate(getState, action)) {
          return next(action);
        }

        if (typeof console === 'undefined') {
          return next(action);
        }

        var prevState = renderToConsole(stateTransformer(getState()), rightArrow);
        var actionDisplay = renderToConsole(actionTransformer(action), rightArrow);
        var returnValue = next(action);
        var nextState = renderToConsole(stateTransformer(getState()), rightArrow);
        var time = new Date();

        var h = padLeft(time.getHours(), 2, "0");
        var m = padLeft(time.getMinutes(), 2, "0");
        var s = padLeft(time.getSeconds(), 2, "0");
        var message = downArrow + ' action ' + action.type + ' @ ' + h + ':' + m + ':' + s;

        var output = colors[messageColor](message) + '\n' + ('  ' + colors[prevColor]('prev state\n' + prevState)) + ('  ' + colors[actionColor]('action\n' + actionDisplay)) + ('  ' + colors[nextColor]('next\n' + nextState));

        log(output);
        return returnValue;
      };
    };
  };
}

function padLeft(input, len, filler) {
  var output = "" + input;
  while (output.length < len) {
    output = filler + output;
  }
  return output;
}