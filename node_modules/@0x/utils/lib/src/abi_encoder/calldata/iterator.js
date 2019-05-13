"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
/* tslint:disable max-classes-per-file */
var _ = require("lodash");
var queue_1 = require("../utils/queue");
var blob_1 = require("./blocks/blob");
var pointer_1 = require("./blocks/pointer");
var set_1 = require("./blocks/set");
/**
 * Iterator class for Calldata Blocks. Blocks follows the order
 * they should be put into calldata that is passed to he EVM.
 *
 * Example #1:
 * Let root = Set {
 *                  Blob{} A,
 *                  Pointer {
 *                      Blob{} a
 *                  } B,
 *                  Blob{} C
 *            }
 * It will iterate as follows: [A, B, C, B.a]
 *
 * Example #2:
 * Let root = Set {
 *                  Blob{} A,
 *                  Pointer {
 *                      Blob{} a
 *                      Pointer {
 *                          Blob{} b
 *                      }
 *                  } B,
 *                  Pointer {
 *                      Blob{} c
 *                  } C
 *            }
 * It will iterate as follows: [A, B, C, B.a, B.b, C.c]
 */
var BaseIterator = /** @class */ (function () {
    function BaseIterator(root) {
        this._root = root;
        this._queue = BaseIterator._createQueue(root);
    }
    BaseIterator._createQueue = function (block) {
        var queue = new queue_1.Queue();
        // Base case
        if (!(block instanceof set_1.SetCalldataBlock)) {
            queue.pushBack(block);
            return queue;
        }
        // This is a set; add members
        var set = block;
        _.eachRight(set.getMembers(), function (member) {
            queue.mergeFront(BaseIterator._createQueue(member));
        });
        // Add children
        _.each(set.getMembers(), function (member) {
            // Traverse child if it is a unique pointer.
            // A pointer that is an alias for another pointer is ignored.
            if (member instanceof pointer_1.PointerCalldataBlock && member.getAlias() === undefined) {
                var dependency = member.getDependency();
                queue.mergeBack(BaseIterator._createQueue(dependency));
            }
        });
        // Put set block at the front of the queue
        queue.pushFront(set);
        return queue;
    };
    BaseIterator.prototype[Symbol.iterator] = function () {
        var _this = this;
        return {
            next: function () {
                var nextBlock = _this.nextBlock();
                if (nextBlock !== undefined) {
                    return {
                        value: nextBlock,
                        done: false,
                    };
                }
                return {
                    done: true,
                    value: new blob_1.BlobCalldataBlock('', '', '', new Buffer('')),
                };
            },
        };
    };
    return BaseIterator;
}());
var CalldataIterator = /** @class */ (function (_super) {
    __extends(CalldataIterator, _super);
    function CalldataIterator(root) {
        return _super.call(this, root) || this;
    }
    CalldataIterator.prototype.nextBlock = function () {
        return this._queue.popFront();
    };
    return CalldataIterator;
}(BaseIterator));
exports.CalldataIterator = CalldataIterator;
var ReverseCalldataIterator = /** @class */ (function (_super) {
    __extends(ReverseCalldataIterator, _super);
    function ReverseCalldataIterator(root) {
        return _super.call(this, root) || this;
    }
    ReverseCalldataIterator.prototype.nextBlock = function () {
        return this._queue.popBack();
    };
    return ReverseCalldataIterator;
}(BaseIterator));
exports.ReverseCalldataIterator = ReverseCalldataIterator;
//# sourceMappingURL=iterator.js.map