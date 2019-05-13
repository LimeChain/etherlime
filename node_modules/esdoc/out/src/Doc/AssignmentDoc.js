'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _AbstractDoc = require('./AbstractDoc.js');

var _AbstractDoc2 = _interopRequireDefault(_AbstractDoc);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Doc Class for Assignment AST node.
 */
class AssignmentDoc extends _AbstractDoc2.default {
  /**
   * specify ``variable`` to kind.
   */
  _$kind() {
    super._$kind();
    this._value.kind = 'variable';
  }

  /**
   * take out self name from self node.
   */
  _$name() {
    super._$name();
    const name = this._flattenMemberExpression(this._node.left).replace(/^this\./, '');
    this._value.name = name;
  }

  /**
   * take out self memberof from file path.
   */
  _$memberof() {
    super._$memberof();
    this._value.memberof = this._pathResolver.filePath;
  }
}
exports.default = AssignmentDoc;