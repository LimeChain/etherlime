'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

var _os = require('os');

var _os2 = _interopRequireDefault(_os);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * file path resolver.
 * @example
 * let pathResolver = new PathResolver('./src', 'foo/bar.js', 'foo-bar', 'foo/bar.js');
 * pathResolver.importPath; // 'foo-bar'
 * pathResolver.filePath; // 'src/foo/bar.js'
 * pathResolver.resolve('./baz.js'); // 'src/foo/baz.js'
 */
class PathResolver {
  /**
   * create instance.
   * @param {string} inDirPath - root directory path.
   * @param {string} filePath - relative file path from root directory path.
   * @param {string} [packageName] - npm package name.
   * @param {string} [mainFilePath] - npm main file path.
   */
  constructor(inDirPath, filePath, packageName = null, mainFilePath = null) {
    (0, _assert2.default)(inDirPath);
    (0, _assert2.default)(filePath);

    /** @type {string} */
    this._inDirPath = _path2.default.resolve(inDirPath);

    /** @type {string} */
    this._filePath = _path2.default.resolve(filePath);

    /** @type {NPMPackageObject} */
    this._packageName = packageName;

    if (mainFilePath) {
      /** @type {string} */
      this._mainFilePath = _path2.default.resolve(mainFilePath);
    }
  }

  /**
   * import path that is considered package name, main file and path prefix.
   * @type {string}
   */
  get importPath() {
    const relativeFilePath = this.filePath;

    if (this._mainFilePath === _path2.default.resolve(relativeFilePath)) {
      return this._packageName;
    }

    let filePath;
    if (this._packageName) {
      filePath = _path2.default.normalize(`${this._packageName}${_path2.default.sep}${relativeFilePath}`);
    } else {
      filePath = `./${relativeFilePath}`;
    }

    return this._slash(filePath);
  }

  /**
   * file full path.
   * @type {string}
   */
  get fileFullPath() {
    return this._slash(this._filePath);
  }

  /**
   * file path that is relative path on root dir.
   * @type {string}
   */
  get filePath() {
    const relativeFilePath = _path2.default.relative(_path2.default.dirname(this._inDirPath), this._filePath);
    return this._slash(relativeFilePath);
  }

  /**
   * resolve file path on this file.
   * @param {string} relativePath - relative path on this file.
   */
  resolve(relativePath) {
    const selfDirPath = _path2.default.dirname(this._filePath);
    const resolvedPath = _path2.default.resolve(selfDirPath, relativePath);
    const resolvedRelativePath = _path2.default.relative(_path2.default.dirname(this._inDirPath), resolvedPath);
    return this._slash(resolvedRelativePath);
  }

  /**
   * convert 'back slash' to 'slash'.
   * path separator is 'back slash' if platform is windows.
   * @param {string} filePath - target file path.
   * @returns {string} converted path.
   * @private
   */
  _slash(filePath) {
    if (_os2.default.platform() === 'win32') {
      filePath = filePath.replace(/\\/g, '/');
    }

    return filePath;
  }
}
exports.default = PathResolver;