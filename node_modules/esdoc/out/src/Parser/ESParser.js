'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _fsExtra = require('fs-extra');

var _fsExtra2 = _interopRequireDefault(_fsExtra);

var _Plugin = require('../Plugin/Plugin.js');

var _Plugin2 = _interopRequireDefault(_Plugin);

var _babylon = require('babylon');

var babylon = _interopRequireWildcard(_babylon);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * ECMAScript Parser class.
 *
 * @example
 * let ast = ESParser.parse('./src/foo.js');
 */
class ESParser {
  /**
   * parse ECMAScript source code.
   * @param {string} filePath - source code file path.
   * @returns {AST} AST of source code.
   */
  static parse(filePath) {
    let code = _fsExtra2.default.readFileSync(filePath, { encode: 'utf8' }).toString();
    code = _Plugin2.default.onHandleCode(code, filePath);
    if (code.charAt(0) === '#') code = code.replace(/^#!/, '//');

    let parserOption = { sourceType: 'module', plugins: [] };
    let parser = code => {
      return babylon.parse(code, parserOption);
    };

    ({ parser, parserOption } = _Plugin2.default.onHandleCodeParser(parser, parserOption, filePath, code));

    let ast = parser(code);

    ast = _Plugin2.default.onHandleAST(ast, filePath, code);

    return ast;
  }
}
exports.default = ESParser;