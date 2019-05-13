"use strict";
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Prepends a subprovider to a provider
 * @param provider    Given provider
 * @param subprovider Subprovider to prepend
 */
function prependSubprovider(provider, subprovider) {
    subprovider.setEngine(provider);
    // HACK: We use implementation details of provider engine here
    // https://github.com/MetaMask/provider-engine/blob/master/index.js#L68
    provider._providers = __spread([subprovider], provider._providers);
}
exports.prependSubprovider = prependSubprovider;
//# sourceMappingURL=subprovider_utils.js.map