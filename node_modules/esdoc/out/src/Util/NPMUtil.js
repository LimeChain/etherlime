'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _fsExtra = require('fs-extra');

var _fsExtra2 = _interopRequireDefault(_fsExtra);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Node Package Manager(npm) util class.
 */
class NPMUtil {
  /**
   * find ESDoc package.json object.
   * @returns {Object} package.json object.
   */
  static findPackage() {
    let packageObj = null;
    try {
      const packageFilePath = _path2.default.resolve(__dirname, '../../package.json');
      const json = _fsExtra2.default.readFileSync(packageFilePath, { encode: 'utf8' });
      packageObj = JSON.parse(json);
    } catch (e) {
      const packageFilePath = _path2.default.resolve(__dirname, '../../../package.json');
      const json = _fsExtra2.default.readFileSync(packageFilePath, { encode: 'utf8' });
      packageObj = JSON.parse(json);
    }

    return packageObj;
  }
}
exports.default = NPMUtil;