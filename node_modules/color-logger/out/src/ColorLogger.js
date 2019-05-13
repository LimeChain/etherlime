'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
// ASCII ESCAPE SEQUENCE http://www5c.biglobe.ne.jp/~ecb/assembler2/b_2.html
const levelToColor = {
  n: '[N]', // no color
  v: '[35m[V]', // purple
  d: '[34m[D]', // blue
  i: '[32m[I]', // green
  w: '[33m[W]', // yellow
  e: '[31m[E]' // red
};

/**
 * display colorful log. now, not support browser.
 *
 * format:
 * ``[LogLevel] [Time] [File] log text``
 *
 * format with tag:
 * ``[LogLevel] [Time] [File] [Tag] log text``
 *
 * log level and color:
 * - verbose: purple
 * - debug: blue
 * - info: green
 * - warning: yellow
 * - error: red
 *
 * @example
 * import Logger from 'color-logger'
 *
 * // simple usage
 * Logger.v('verbose log');
 *
 * // tag usage
 * let logger = new Logger('MyTag');
 * logger.d('debug log');
 */
class ColorLogger {
  /**
   * create instance.
   */
  constructor() {
    this._allLogs = [];
  }

  /**
   * log information.
   * @return {string} - file name and line number.
   * @private
   */
  _getInfo() {
    let info;
    try {
      throw new Error();
    } catch (e) {
      const lines = e.stack.split('\n');
      const line = lines[4];
      const matched = line.match(/([\w\d\-_.]*:\d+:\d+)/);
      info = matched[1];
    }

    return info;
  }

  /**
   * clear all logs.
   */
  clearAllLogs() {
    this._allLogs = [];
  }

  /**
   * all logs
   * @type {String[]}
   */
  get allLogs() {
    return [].concat(this._allLogs);
  }

  /**
   * if false, not display log. default is true.
   */
  set debug(v) {
    this._debug = v;
  }

  /**
   * display log.
   * @param {string} level - log level. v, d, i, w, e.
   * @param {...*} msg - log message.
   * @returns {string} - formatted log message.
   * @private
   */
  _output(level) {
    const text = [];

    for (var _len = arguments.length, msg = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      msg[_key - 1] = arguments[_key];
    }

    for (const m of msg) {
      if (typeof m === 'object') {
        text.push(JSON.stringify(m, null, 2));
      } else {
        text.push(m);
      }
    }

    const color = levelToColor[level];
    const info = this._getInfo();

    const d = new Date();
    let month = d.getMonth() + 1;
    if (month < 10) month = `0${ month }`;
    let date = d.getDate();
    if (date < 10) date = `0${ date }`;
    let hour = d.getHours();
    if (hour < 10) hour = `0${ hour }`;
    let minutes = d.getMinutes();
    if (minutes < 10) minutes = `0${ minutes }`;
    let sec = d.getSeconds();
    if (sec < 10) sec = `0${ sec }`;
    const now = `${ d.getFullYear() }-${ month }-${ date }T${ hour }:${ minutes }:${ sec }.${ d.getMilliseconds() }Z`;

    const log = `${ color } [${ now }] [${ info }] ${ text.join(' ') }[0m`;
    const offColorLog = `[${ level.toUpperCase() }] [${ now }] [${ info }] ${ text.join(' ') }`;

    this._allLogs.push(offColorLog);
    if (this._allLogs.length > 10000) this._allLogs.shift();

    if (this._debug) console.log(log);

    return log;
  }

  /**
   * display verbose(purple) log.
   * @param {...*} msg - log message.
   * @returns {string} formatted log message.
   */
  v() {
    for (var _len2 = arguments.length, msg = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      msg[_key2] = arguments[_key2];
    }

    return this._output.apply(this, ['v'].concat(msg));
  }

  /**
   * display debug(blue) log.
   * @param {...*} msg - log message.
   * @returns {string} formatted log message.
   */
  d() {
    for (var _len3 = arguments.length, msg = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
      msg[_key3] = arguments[_key3];
    }

    return this._output.apply(this, ['d'].concat(msg));
  }

  /**
   * display normal(no color) log.
   * @param {...*} msg - log message.
   * @returns {string} formatted log message.
   */
  n() {
    for (var _len4 = arguments.length, msg = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
      msg[_key4] = arguments[_key4];
    }

    return this._output.apply(this, ['n'].concat(msg));
  }

  /**
   * display info(green) log.
   * @param {...*} msg - log message.
   * @returns {string} formatted log message.
   */
  i() {
    for (var _len5 = arguments.length, msg = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
      msg[_key5] = arguments[_key5];
    }

    return this._output.apply(this, ['i'].concat(msg));
  }

  /**
   * display warning(yellow) log.
   * @param {...*} msg - log message.
   * @returns {string} formatted log message.
   */
  w() {
    for (var _len6 = arguments.length, msg = Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
      msg[_key6] = arguments[_key6];
    }

    return this._output.apply(this, ['w'].concat(msg));
  }

  /**
   * display warning(red) log.
   * @param {...*} msg - log message.
   * @returns {string} formatted log message.
   */
  e() {
    for (var _len7 = arguments.length, msg = Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
      msg[_key7] = arguments[_key7];
    }

    return this._output.apply(this, ['e'].concat(msg));
  }
}

exports.ColorLogger = ColorLogger;
const logger = new ColorLogger();
logger.debug = true;
exports.default = logger;