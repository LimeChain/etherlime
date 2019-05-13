"use strict";
var __values = (this && this.__values) || function (o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
};
Object.defineProperty(exports, "__esModule", { value: true });
var _ = require("lodash");
function parseNode(node) {
    var components = [];
    _.each(node.children, function (child) {
        var component = parseNode(child);
        components.push(component);
    });
    var dataItem = {
        name: node.name,
        type: node.value,
    };
    if (!_.isEmpty(components)) {
        dataItem.components = components;
    }
    return dataItem;
}
/**
 * Returns a DataItem corresponding to the input signature.
 * A signature can be in two forms: `type` or `(type_1,type_2,...,type_n)`
 * An example of the first form would be 'address' or 'uint256[]' or 'bytes[5][]'
 * An example of the second form would be '(address,uint256)' or '(address,uint256)[]'
 * @param signature of input DataItem.
 * @return DataItem derived from input signature.
 */
function generateDataItemFromSignature(signature) {
    var e_1, _a;
    // No data item corresponds to an empty signature
    if (_.isEmpty(signature)) {
        throw new Error("Cannot parse data item from empty signature, ''");
    }
    // Create a parse tree for data item
    var node = {
        name: '',
        value: '',
        children: [],
    };
    try {
        for (var signature_1 = __values(signature), signature_1_1 = signature_1.next(); !signature_1_1.done; signature_1_1 = signature_1.next()) {
            var char = signature_1_1.value;
            switch (char) {
                case '(':
                    var child = {
                        name: '',
                        value: '',
                        children: [],
                        parent: node,
                    };
                    node.value = 'tuple';
                    node.children.push(child);
                    node = child;
                    break;
                case ')':
                    node = node.parent;
                    break;
                case ',':
                    var sibling = {
                        name: '',
                        value: '',
                        children: [],
                        parent: node.parent,
                    };
                    node.parent.children.push(sibling);
                    node = sibling;
                    break;
                case ' ':
                    node.name = node.value;
                    node.value = '';
                    break;
                default:
                    node.value += char;
                    break;
            }
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (signature_1_1 && !signature_1_1.done && (_a = signature_1.return)) _a.call(signature_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
    // Interpret data item from parse tree
    var dataItem = parseNode(node);
    return dataItem;
}
exports.generateDataItemFromSignature = generateDataItemFromSignature;
//# sourceMappingURL=signature_parser.js.map