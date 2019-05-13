'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _AbstractDoc = require('./AbstractDoc.js');

var _AbstractDoc2 = _interopRequireDefault(_AbstractDoc);

var _MethodDoc = require('./MethodDoc.js');

var _MethodDoc2 = _interopRequireDefault(_MethodDoc);

var _babelGenerator = require('babel-generator');

var _babelGenerator2 = _interopRequireDefault(_babelGenerator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Doc Class from Member Expression AST node.
 */
class MemberDoc extends _AbstractDoc2.default {
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

  /** specify ``member`` to kind. */
  _$kind() {
    super._$kind();
    this._value.kind = 'member';
  }

  /** use static property in class */
  _$static() {
    let parent = this._node.parent;
    while (parent) {
      if (parent.type === 'ClassMethod') {
        this._value.static = parent.static;
        break;
      }
      parent = parent.parent;
    }
  }

  /** take out self name from self node */
  _$name() {
    let name;
    if (this._node.left.computed) {
      const expression = (0, _babelGenerator2.default)(this._node.left.property).code.replace(/^this/, '');
      name = `[${expression}]`;
    } else {
      name = this._flattenMemberExpression(this._node.left).replace(/^this\./, '');
    }
    this._value.name = name;
  }

  /** borrow {@link MethodDoc#@_memberof} */
  _$memberof() {
    Reflect.apply(_MethodDoc2.default.prototype._$memberof, this, []);
  }
}
exports.default = MemberDoc;