const pkgVersion = require("./../../../package.json").version;


/**
 * Property definitions for Contract Objects
 *
 * Describes canonical output properties as sourced from some "dirty" input
 * object. Describes normalization process to account for deprecated and/or
 * nonstandard keys and values.
 *
 * Maps (key -> property) where:
 *  - `key` is the top-level output key matching up with those in the schema
 *  - `property` is an object with optional values:
 *      - `sources`: list of sources (see below); default `key`
 *      - `transform`: function(value) -> transformed value; default x -> x
 *
 * Each source represents a means to select a value from dirty object.
 * Allows:
 *  - dot-separated (`.`) string, corresponding to path to value in dirty
 *    object
 *  - function(dirtyObj) -> (cleanValue | undefined)
 *
 * The optional `transform` parameter standardizes value regardless of source,
 * for purposes of ensuring data type and/or string schemas.
 */
let properties = {
  "contractName": {
    "sources": ["contractName", "contract_name"]
  },
  "abi": {
    "sources": ["abi", "interface"],
    "transform": (value) => {
      if (typeof value === "string") {
        try {
          value = JSON.parse(value)
        } catch (e) {
          value = undefined;
        }
      }
      return value;
    }
  },
  "bytecode": {
    "sources": [
      "bytecode", "binary", "unlinked_binary", "evm.bytecode.object"
    ],
    "transform": (value) => {
      if (value && value.indexOf("0x") != 0) {
        value = "0x" + value;
      }
      return value;
    }
  },
  "deployedBytecode": {
    "sources": [
      "deployedBytecode", "runtimeBytecode", "evm.deployedBytecode.object"
    ],
    "transform": (value) => {
      if (value && value.indexOf("0x") != 0) {
        value = "0x" + value;
      }
      return value;
    }
  },
  "sourceMap": {
    "sources": ["sourceMap", "srcmap", "evm.bytecode.sourceMap"]
  },
  "deployedSourceMap": {
    "sources": ["deployedSourceMap", "srcmapRuntime", "evm.deployedBytecode.sourceMap"]
  },
  "source": {},
  "sourcePath": {},
  "ast": {},
  "legacyAST": {
    "transform": (value, obj) => {
      let schemaVersion = obj.schemaVersion || "0.0.0";

      // legacyAST introduced in v2.0.0
      if (schemaVersion[0] < 2) {
        return obj.ast;
      } else {
        return value
      }
    }
  },
  "compiler": {},
  "networks": {
    "transform": (value) => {
      if (value === undefined) {
        value = {}
      }
      return value;
    }
  },
  "schemaVersion": {
    "sources": ["schemaVersion", "schema_version"]
  },
  "updatedAt": {
    "sources": ["updatedAt", "updated_at"],
    "transform": (value) => {
      if (typeof value === "number") {
        value = new Date(value).toISOString();
      }
      return value;
    }
  }
};

/**
 * Construct a getter for a given key, possibly applying some post-retrieve
 * transformation on the resulting value.
 *
 * @return {Function} Accepting dirty object and returning value || undefined
 */
let getter = (key) => {

  const transform = (x) => {
    return x
  };

  return (obj) => {
    return transform(obj[key]);
  }
}

/**
 * Chains together a series of function(obj) -> value, passing resulting
 * returned value to next function in chain.
 *
 * Accepts any number of functions passed as arguments
 * @return {Function} Accepting initial object, returning end-of-chain value
 *
 * Assumes all intermediary values to be objects, with well-formed sequence
 * of operations.
 */
let chain = function () {
  let getters = Array.prototype.slice.call(arguments);
  return (obj) => {
    return getters.reduce((cur, get) => {
      return get(cur);
    }, obj);
  }
}



let normalize = (objDirty, options) => {
  let normalized = {};

  Object.keys(properties).forEach((key) => {
    let property = properties[key];
    let value;

    let sources = property.sources || [key];

    for (let i = 0; value === undefined && i < sources.length; i++) {
      let source = sources[i];

      if (typeof source === "string") {
        let traversals = source.split(".")
          .map((k) => {
            return getter(k)
          });
        source = chain.apply(null, traversals);
      }

      value = source(objDirty);
    }

    if (property.transform) {
      value = property.transform(value, objDirty);
    }

    normalized[key] = value;
  });

  Object.keys(objDirty).forEach((key) => {
    if (key.indexOf("x-") === 0) {
      normalized[key] = getter(key)(objDirty);
    }
  });

  normalized.schemaVersion = pkgVersion;

  return normalized
}

module.exports = {
  normalize
}