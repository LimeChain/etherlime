'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _babelGenerator = require('babel-generator');

var _babelGenerator2 = _interopRequireDefault(_babelGenerator);

var _AbstractDoc = require('./AbstractDoc.js');

var _AbstractDoc2 = _interopRequireDefault(_AbstractDoc);

var _NamingUtil = require('../Util/NamingUtil.js');

var _NamingUtil2 = _interopRequireDefault(_NamingUtil);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Doc Class from Function declaration AST node.
 */
class FunctionDoc extends _AbstractDoc2.default {
  /** specify ``function`` to kind. */
  _$kind() {
    super._$kind();
    this._value.kind = 'function';
  }

  /** take out self name from self node */
  _$name() {
    super._$name();

    if (this._node.id) {
      if (this._node.id.type === 'MemberExpression') {
        // e.g. foo[bar.baz] = function bal(){}
        const expression = (0, _babelGenerator2.default)(this._node.id).code;
        this._value.name = `[${expression}]`;
      } else {
        this._value.name = this._node.id.name;
      }
    } else {
      this._value.name = _NamingUtil2.default.filePathToName(this._pathResolver.filePath);
    }
  }

  /** take out self name from file path */
  _$memberof() {
    super._$memberof();
    this._value.memberof = this._pathResolver.filePath;
  }

  /** check generator property in self node */
  _$generator() {
    super._$generator();
    this._value.generator = this._node.generator;
  }

  /**
   * use async property of self node.
   */
  _$async() {
    super._$async();
    this._value.async = this._node.async;
  }
}
exports.default = FunctionDoc;