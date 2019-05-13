'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _AbstractDoc = require('./AbstractDoc.js');

var _AbstractDoc2 = _interopRequireDefault(_AbstractDoc);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Doc Class from source file.
 */
class FileDoc extends _AbstractDoc2.default {
  /**
   * apply own tag.
   * @private
   */
  _apply() {
    super._apply();

    Reflect.deleteProperty(this._value, 'export');
    Reflect.deleteProperty(this._value, 'importPath');
    Reflect.deleteProperty(this._value, 'importStyle');
  }

  /** specify ``file`` to kind. */
  _$kind() {
    super._$kind();
    this._value.kind = 'file';
  }

  /** take out self name from file path */
  _$name() {
    super._$name();
    this._value.name = this._pathResolver.filePath;
  }

  /** specify name to longname */
  _$longname() {
    this._value.longname = this._pathResolver.fileFullPath;
  }

  /** specify file content to value.content */
  _$content() {
    super._$content();

    const filePath = this._pathResolver.fileFullPath;
    const content = _fs2.default.readFileSync(filePath, { encode: 'utf8' }).toString();
    this._value.content = content;
  }
}
exports.default = FileDoc;