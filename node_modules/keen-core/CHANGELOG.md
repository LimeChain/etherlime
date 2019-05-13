<!--
<a name="{version}"></a>
# {version}
**FIXED:**
**NEW:**
**BREAKING:**
-->

<a name="0.1.3"></a>
# 0.1.3 Fix `window.navigator` check for IE10

**FIXED:**
* This patch fixes the way `window.navigator` is referenced to avoid errors in environments that expose non-standard `window` objects, such as React Native.


<a name="0.1.2"></a>
# 0.1.2 Update resource map

**NEW:**
* This patch includes resource mappings for `events` and `queries`.


<a name="0.1.1"></a>
# 0.1.1 Exclude legacy SDKs from namespace blending

**FIXED:**
* This patch improves the `Keen.extendLibrary()` function by excluding earlier versions of `Keen.prototype` methods from being blended into the global namespace of more recent SDKs.


<a name="0.1.0"></a>
# 0.1.0 Manage modular namespace

**FIXED:**
* Modular SDKs containing this release will coalesce into a shared global namespace, rather than colliding and overwriting one another, and will store a reference to legacy versions of keen-js when detected. This legacy version can be referenced with `Keen.legacyVersion`, or returned to the `Keen` namespace by calling `var ModularLibs = Keen.noConflict();`.


<a name="0.0.2"></a>
# 0.0.2 RequireJS fix

**FIXED:**
* Fixed RequireJS module definition name typo (#2)


<a name="0.0.1"></a>
# 0.0.1 Hello, world!

**NEW:**
* [Everything](./README.md) :)
