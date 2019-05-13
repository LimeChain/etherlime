'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _colorLogger = require('color-logger');

var _colorLogger2 = _interopRequireDefault(_colorLogger);

var _AbstractDoc = require('./AbstractDoc.js');

var _AbstractDoc2 = _interopRequireDefault(_AbstractDoc);

var _ParamParser = require('../Parser/ParamParser.js');

var _ParamParser2 = _interopRequireDefault(_ParamParser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Doc Class from virtual comment node of external.
 */
class ExternalDoc extends _AbstractDoc2.default {
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

  /** specify ``external`` to kind. */
  _$kind() {
    super._$kind();
    this._value.kind = 'external';
  }

  /** take out self name from tag */
  _$name() {
    const value = this._findTagValue(['@external']);
    if (!value) {
      _colorLogger2.default.w('can not resolve name.');
    }

    this._value.name = value;

    const tags = this._findAll(['@external']);
    if (!tags) {
      _colorLogger2.default.w('can not resolve name.');
      return;
    }

    let name;
    for (const tag of tags) {
      const { typeText, paramDesc } = _ParamParser2.default.parseParamValue(tag.tagValue, true, false, true);
      name = typeText;
      this._value.externalLink = paramDesc;
    }

    this._value.name = name;
  }

  /** take out self memberof from file path. */
  _$memberof() {
    super._$memberof();
    this._value.memberof = this._pathResolver.filePath;
  }

  /** specify name to longname */
  _$longname() {
    super._$longname();
    if (this._value.longname) return;
    this._value.longname = this._value.name;
  }

  /** avoid unknown tag */
  _$external() {}
}
exports.default = ExternalDoc;