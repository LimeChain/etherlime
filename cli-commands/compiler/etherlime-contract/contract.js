var ethJSABI = require("ethjs-abi");
var BlockchainUtils = require("./../etherlime-blockchain-utils");
var Web3 = require("web3");
var StatusError = require("./status-error.js")

if (typeof Web3 == "object" && Object.keys(Web3).length == 0) {
    Web3 = global.Web3;
}

var contract = (function (module) {
    function Provider(provider) {
        this.provider = provider;
    }

    Provider.prototype.send = function () {
        return this.provider.send.apply(this.provider, arguments);
    };

    Provider.prototype.sendAsync = function () {
        return this.provider.sendAsync.apply(this.provider, arguments);
    };

    var BigNumber = (new Web3()).toBigNumber(0).constructor;

    var Utils = {
        is_object: function (val) {
            return typeof val == "object" && !Array.isArray(val);
        },
        is_big_number: function (val) {
            if (typeof val != "object") return false;

            try {
                new BigNumber(val);
                return true;
            } catch (e) {
                return false;
            }
        },
        decodeLogs: function (C, instance, logs) {
            return logs.map(function (log) {
                var logABI = C.events[log.topics[0]];

                if (logABI == null) {
                    return null;
                }

                var copy = Utils.merge({}, log);

                function partialABI(fullABI, indexed) {
                    var inputs = fullABI.inputs.filter(function (i) {
                        return i.indexed === indexed;
                    });

                    var partial = {
                        inputs: inputs,
                        name: fullABI.name,
                        type: fullABI.type,
                        anonymous: fullABI.anonymous
                    };

                    return partial;
                }

                var argTopics = logABI.anonymous ? copy.topics : copy.topics.slice(1);
                var indexedData = "0x" + argTopics.map(function (topics) { return topics.slice(2); }).join("");
                var indexedParams = ethJSABI.decodeEvent(partialABI(logABI, true), indexedData);

                var notIndexedData = copy.data;
                var notIndexedParams = ethJSABI.decodeEvent(partialABI(logABI, false), notIndexedData);

                copy.event = logABI.name;

                copy.args = logABI.inputs.reduce(function (acc, current) {
                    var val = indexedParams[current.name];

                    if (val === undefined) {
                        val = notIndexedParams[current.name];
                    }

                    acc[current.name] = val;
                    return acc;
                }, {});

                Object.keys(copy.args).forEach(function (key) {
                    var val = copy.args[key];

                    if (val.constructor.isBN) {
                        copy.args[key] = C.web3.toBigNumber("0x" + val.toString(16));
                    }
                });

                delete copy.data;
                delete copy.topics;

                return copy;
            }).filter(function (log) {
                return log != null;
            });
        },
        promisifyFunction: function (fn, C) {
            var self = this;
            return function () {
                var instance = this;

                var args = Array.prototype.slice.call(arguments);
                var tx_params = {};
                var last_arg = args[args.length - 1];

                if (Utils.is_object(last_arg) && !Utils.is_big_number(last_arg)) {
                    tx_params = args.pop();
                }

                tx_params = Utils.merge(C.class_defaults, tx_params);

                return C.detectNetwork().then(function () {
                    return new Promise(function (accept, reject) {
                        var callback = function (error, result) {
                            if (error != null) {
                                reject(error);
                            } else {
                                accept(result);
                            }
                        };
                        args.push(tx_params, callback);
                        fn.apply(instance.contract, args);
                    });
                });
            };
        },
        synchronizeFunction: function (fn, instance, C) {
            var self = this;
            return function () {
                var args = Array.prototype.slice.call(arguments);
                var tx_params = {};
                var last_arg = args[args.length - 1];

                if (Utils.is_object(last_arg) && !Utils.is_big_number(last_arg)) {
                    tx_params = args.pop();
                }

                tx_params = Utils.merge(C.class_defaults, tx_params);

                return C.detectNetwork().then(function () {
                    return new Promise(function (accept, reject) {
                        var callback = function (error, tx) {
                            if (error != null) {
                                reject(error);
                                return;
                            }

                            var timeout;
                            if (C.synchronization_timeout === 0 || C.synchronization_timeout !== undefined) {
                                timeout = C.synchronization_timeout;
                            } else {
                                timeout = 240000;
                            }

                            var start = new Date().getTime();

                            var make_attempt = function () {
                                C.web3.eth.getTransactionReceipt(tx, function (error, receipt) {
                                    if (error && !error.toString().includes('unknown transaction')) {
                                        return reject(error);
                                    }

                                    // Reject on transaction failures, accept otherwise
                                    // Handles "0x00" or hex 0
                                    if (receipt != null) {
                                        if (parseInt(receipt.status, 16) == 0) {
                                            var statusError = new StatusError(tx_params, tx, receipt);
                                            return reject(statusError);
                                        } else {
                                            return accept({
                                                tx: tx,
                                                receipt: receipt,
                                                logs: Utils.decodeLogs(C, instance, receipt.logs)
                                            });
                                        }
                                    }

                                    if (timeout > 0 && new Date().getTime() - start > timeout) {
                                        return reject(new Error("Transaction " + tx + " wasn't processed in " + (timeout / 1000) + " seconds!"));
                                    }

                                    setTimeout(make_attempt, 1000);
                                });
                            };

                            make_attempt();
                        };

                        args.push(tx_params, callback);
                        fn.apply(self, args);
                    });
                });
            };
        },
        merge: function () {
            var merged = {};
            var args = Array.prototype.slice.call(arguments);

            for (var i = 0; i < args.length; i++) {
                var object = args[i];
                var keys = Object.keys(object);
                for (var j = 0; j < keys.length; j++) {
                    var key = keys[j];
                    var value = object[key];
                    merged[key] = value;
                }
            }

            return merged;
        },
        parallel: function (arr, callback) {
            callback = callback || function () { };
            if (!arr.length) {
                return callback(null, []);
            }
            var index = 0;
            var results = new Array(arr.length);
            arr.forEach(function (fn, position) {
                fn(function (error, result) {
                    if (error) {
                        callback(error);
                        callback = function () { };
                    } else {
                        index++;
                        results[position] = result;
                        if (index >= arr.length) {
                            callback(null, results);
                        }
                    }
                });
            });
        },
        bootstrap: function (fn) {
            Object.keys(fn._static_methods).forEach(function (key) {
                fn[key] = fn._static_methods[key].bind(fn);
            });

            Object.keys(fn._properties).forEach(function (key) {
                fn.addProp(key, fn._properties[key]);
            });

            return fn;
        },
        linkBytecode: function (bytecode, links) {
            Object.keys(links).forEach(function (library_name) {
                var library_address = links[library_name];
                var regex = new RegExp("__" + library_name + "_+", "g");

                bytecode = bytecode.replace(regex, library_address.replace("0x", ""));
            });

            return bytecode;
        }
    };

    function Contract(contract) {
        var self = this;
        var constructor = this.constructor;
        this.abi = constructor.abi;

        if (typeof contract == "string") {
            var address = contract;
            var contract_class = constructor.web3.eth.contract(this.abi);
            contract = contract_class.at(address);
        }

        this.contract = contract;
        for (var i = 0; i < this.abi.length; i++) {
            var item = this.abi[i];
            if (item.type == "function") {
                if (item.constant == true) {
                    this[item.name] = Utils.promisifyFunction(contract[item.name], constructor);
                } else {
                    this[item.name] = Utils.synchronizeFunction(contract[item.name], this, constructor);
                }

                this[item.name].call = Utils.promisifyFunction(contract[item.name].call, constructor);
                this[item.name].sendTransaction = Utils.promisifyFunction(contract[item.name].sendTransaction, constructor);
                this[item.name].request = contract[item.name].request;
                this[item.name].estimateGas = Utils.promisifyFunction(contract[item.name].estimateGas, constructor);
            }

            if (item.type == "event") {
                this[item.name] = contract[item.name];
            }
        }

        this.sendTransaction = Utils.synchronizeFunction(function (tx_params, callback) {
            if (typeof tx_params == "function") {
                callback = tx_params;
                tx_params = {};
            }

            tx_params.to = self.address;

            constructor.web3.eth.sendTransaction.apply(constructor.web3.eth, [tx_params, callback]);
        }, this, constructor);

        this.send = function (value) {
            return self.sendTransaction({ value: value });
        };

        this.allEvents = contract.allEvents;
        this.address = contract.address;
        this.transactionHash = contract.transactionHash;
    };

    Contract._static_methods = {
        setProvider: function (provider) {
            if (!provider) {
                throw new Error("Invalid provider passed to setProvider(); provider is " + provider);
            }

            var wrapped = new Provider(provider);
            this.web3.setProvider(wrapped);
            this.currentProvider = provider;
        },

        new: function () {
            var self = this;

            if (this.currentProvider == null) {
                throw new Error(this.contractName + " error: Please call setProvider() first before calling new().");
            }

            var args = Array.prototype.slice.call(arguments);

            if (!this.bytecode) {
                throw new Error(this._json.contractName + " error: contract binary not set. Can't deploy new instance.");
            }

            return self.detectNetwork().then(function (network_id) {
                var regex = /__[^_]+_+/g;
                var unlinked_libraries = self.binary.match(regex);

                if (unlinked_libraries != null) {
                    unlinked_libraries = unlinked_libraries.map(function (name) {
                        return name.replace(/_/g, "");
                    }).sort().filter(function (name, index, arr) {
                        if (index + 1 >= arr.length) {
                            return true;
                        }

                        return name != arr[index + 1];
                    }).join(", ");

                    throw new Error(`${self.contractName} contains unresolved libraries. You must deploy and link the following libraries before you can deploy a new version of ${self._json.contractName}: ${unlinked_libraries}`);
                }
            }).then(function () {
                return new Promise(function (accept, reject) {
                    var contract_class = self.web3.eth.contract(self.abi);
                    var tx_params = {};
                    var last_arg = args[args.length - 1];

                    if (Utils.is_object(last_arg) && !Utils.is_big_number(last_arg)) {
                        tx_params = args.pop();
                    }

                    var constructor = self.abi.filter(function (item) {
                        return item.type === 'constructor';
                    });

                    if (constructor.length && constructor[0].inputs.length !== args.length) {
                        throw new Error(`${self.contractName} contract constructor expected ${constructor[0].inputs.length} arguments, received ${args.length}`);
                    }

                    tx_params = Utils.merge(self.class_defaults, tx_params);

                    if (tx_params.data == null) {
                        tx_params.data = self.binary;
                    }

                    var intermediary = function (error, web3_instance) {
                        if (error != null) {
                            reject(error);
                            
                            return;
                        }

                        if (error == null && web3_instance != null && web3_instance.address != null) {
                            accept(new self(web3_instance));
                        }
                    };

                    args.push(tx_params, intermediary);
                    contract_class.new.apply(contract_class, args);
                });
            });
        },

        at: function (address) {
            var self = this;

            if (address == null || typeof address != "string" || address.length != 42) {
                throw new Error(`Invalid address passed to ${this._json.contractName}.at(): ${address}`);
            }

            var contract = new this(address);

            contract.then = function (fn) {
                return self.detectNetwork().then(function (network_id) {
                    var instance = new self(address);

                    return new Promise(function (accept, reject) {
                        self.web3.eth.getCode(address, function (error, code) {
                            if (error) return reject(error);

                            if (!code || code.replace("0x", "").replace(/0/g, "") === '') {
                                return reject(new Error(`Cannot create instance of ${self.contractName}; no code at address ${address}`));
                            }

                            accept(instance);
                        });
                    });
                }).then(fn);
            };

            return contract;
        },

        deployed: function () {
            var self = this;
            return self.detectNetwork().then(function () {
                if (self._json.networks[self.network_id] == null) {
                    throw new Error(`${self.contractName} has not been deployed to detected network (network/artifact mismatch)`);
                }

                if (!self.isDeployed()) {
                    throw new Error(`${self.contractName} has not been deployed to detected network (${self.network_id})`);
                }

                return new self(self.address);
            });
        },

        defaults: function (class_defaults) {
            if (this.class_defaults == null) {
                this.class_defaults = {};
            }

            if (class_defaults == null) {
                class_defaults = {};
            }

            var self = this;
            Object.keys(class_defaults).forEach(function (key) {
                var value = class_defaults[key];
                self.class_defaults[key] = value;
            });

            return this.class_defaults;
        },

        hasNetwork: function (network_id) {
            return this._json.networks[network_id + ""] != null;
        },

        isDeployed: function () {
            if (this.network_id == null) {
                return false;
            }

            if (this._json.networks[this.network_id] == null) {
                return false;
            }

            return !!this.network.address;
        },

        detectNetwork: function () {
            var self = this;

            return new Promise(function (accept, reject) {
                if (self.network_id) {
                    if (self.networks[self.network_id] != null) {
                        return accept(self.network_id);
                    }
                }

                self.web3.version.getNetwork(function (error, result) {
                    if (error) {
                        return reject(error);
                    }

                    var network_id = result.toString();

                    if (self.hasNetwork(network_id)) {
                        self.setNetwork(network_id);

                        return accept();
                    }

                    var uris = Object.keys(self._json.networks).filter(function (network) {
                        return network.indexOf("blockchain://") == 0;
                    });

                    var matches = uris.map(function (uri) {
                        return BlockchainUtils.matches.bind(BlockchainUtils, uri, self.web3.currentProvider);
                    });

                    Utils.parallel(matches, function (error, results) {
                        if (error) {
                            return reject(error);
                        }

                        for (var i = 0; i < results.length; i++) {
                            if (results[i]) {
                                self.setNetwork(uris[i]);

                                return accept();
                            }
                        }

                        self.setNetwork(network_id);
                        accept();
                    });

                });
            });
        },

        setNetwork: function (network_id) {
            if (!network_id) {
                return;
            }

            this.network_id = network_id + "";
        },

        resetAddress: function () {
            delete this.network.address;
        },

        link: function (name, address) {
            var self = this;

            if (typeof name == "function") {
                var contract = name;

                if (contract.isDeployed() == false) {
                    throw new Error("Cannot link contract without an address.");
                }

                this.link(contract.contractName, contract.address);

                Object.keys(contract.events).forEach(function (topic) {
                    self.network.events[topic] = contract.events[topic];
                });

                return;
            }

            if (typeof name == "object") {
                var obj = name;

                Object.keys(obj).forEach(function (name) {
                    var a = obj[name];
                    self.link(name, a);
                });

                return;
            }

            if (this._json.networks[this.network_id] == null) {
                this._json.networks[this.network_id] = {
                    events: {},
                    links: {}
                };
            }

            this.network.links[name] = address;
        },

        clone: function (json) {
            var self = this;

            json = json || {};

            var temp = function EtherlimeContract() {
                this.constructor = temp;

                return Contract.apply(this, arguments);
            };

            temp.prototype = Object.create(self.prototype);

            var network_id;

            if (typeof json != "object") {
                network_id = json;
                json = self._json;
            }

            json = Utils.merge({}, self._json || {}, json);

            temp._static_methods = this._static_methods;
            temp._properties = this._properties;

            temp._property_values = {};
            temp._json = json;

            Utils.bootstrap(temp);

            temp.web3 = new Web3();
            temp.class_defaults = temp.prototype.defaults || {};

            if (network_id) {
                temp.setNetwork(network_id);
            }

            Object.keys(json).forEach(function (key) {
                if (key.indexOf("x-") != 0) return;
                temp[key] = json[key];
            });

            return temp;
        },

        addProp: function (key, fn) {
            var self = this;

            var getter = function () {
                if (fn.get != null) {
                    return fn.get.call(self);
                }

                return self._property_values[key] || fn.call(self);
            }

            var setter = function (val) {
                if (fn.set != null) {
                    fn.set.call(self, val);

                    return;
                }

                throw new Error(`${key} property is immutable`);
            };

            var definition = {};

            definition.enumerable = false;
            definition.configurable = false;
            definition.get = getter;
            definition.set = setter;

            Object.defineProperty(this, key, definition);
        },

        toJSON: function () {
            return this._json;
        }
    };

    Contract._properties = {
        contract_name: {
            get: function () {
                return this.contractName;
            },
            set: function (val) {
                this.contractName = val;
            }
        },
        contractName: {
            get: function () {
                return this._json.contractName || "Contract";
            },
            set: function (val) {
                this._json.contractName = val;
            }
        },
        abi: {
            get: function () {
                return this._json.abi;
            },
            set: function (val) {
                this._json.abi = val;
            }
        },
        network: function () {
            var network_id = this.network_id;

            if (network_id == null) {
                throw new Error(`${this.contractName} has no network id set, cannot lookup artifact data. Either set the network manually using ${this.contractName}setNetwork(), run ${this.contractName}.detectNetwork(), or use new(), at() or deployed() as a thenable which will detect the network automatically.`);
            }

            if (this._json.networks[network_id] == null) {
                throw new Error(`${this.contractName} has no network configuration for its current network id (${network_id}).`);
            }

            var returnVal = this._json.networks[network_id];

            if (returnVal.links == null) {
                returnVal.links = {};
            }

            if (returnVal.events == null) {
                returnVal.events = {};
            }

            return returnVal;
        },
        networks: function () {
            return this._json.networks;
        },
        address: {
            get: function () {
                var address = this.network.address;

                if (address == null) {
                    throw new Error(`Cannot find deployed address: ${this.contractName} not deployed or address not set.`);
                }

                return address;
            },
            set: function (val) {
                if (val == null) {
                    throw new Error(`Cannot set deployed address; malformed value: ${val}`);
                }

                var network_id = this.network_id;

                if (network_id == null) {
                    throw new Error(`${this.contractName} has no network id set, cannot lookup artifact data. Either set the network manually using ${this.contractName}.setNetwork(), run ${this.contractName}.detectNetwork(), or use new(), at() or deployed() as a thenable which will detect the network automatically.`);
                }

                if (this._json.networks[network_id] == null) {
                    this._json.networks[network_id] = {
                        events: {},
                        links: {}
                    };
                }

                this.network.address = val;
            }
        },
        transactionHash: {
            get: function () {
                var transactionHash = this.network.transactionHash;

                if (transactionHash === null) {
                    throw new Error(`Could not find transaction hash for ${this.contractName}`);
                }

                return transactionHash;
            },
            set: function (val) {
                this.network.transactionHash = val;
            }
        },
        links: function () {
            if (!this.network_id) {
                throw new Error(`${this.contractName} has no network id set, cannot lookup artifact data. Either set the network manually using ${this.contractName}.setNetwork(), run ${this.contractName}.detectNetwork(), or use new(), at() or deployed() as a thenable which will detect the network automatically.`);
            }

            if (this._json.networks[this.network_id] == null) {
                return {};
            }

            return this.network.links || {};
        },
        events: function () {
            var web3 = new Web3();

            var events;

            if (this._json.networks[this.network_id] == null) {
                events = {};
            } else {
                events = this.network.events || {};
            }

            var abi = this.abi;

            abi.forEach(function (item) {
                if (item.type != "event") return;

                var signature = item.name + "(";

                item.inputs.forEach(function (input, index) {
                    signature += input.type;

                    if (index < item.inputs.length - 1) {
                        signature += ",";
                    }
                });

                signature += ")";

                var topic = web3.sha3(signature);

                events[topic] = item;
            });

            return events;
        },
        binary: function () {
            return Utils.linkBytecode(this.bytecode, this.links);
        },
        deployedBinary: function () {
            return Utils.linkBytecode(this.deployedBytecode, this.links);
        },
        unlinked_binary: {
            get: function () {
                return this.bytecode;
            },
            set: function (val) {
                this.bytecode = val;
            }
        },
        bytecode: {
            get: function () {
                return this._json.bytecode;
            },
            set: function (val) {
                this._json.bytecode = val;
            }
        },
        deployedBytecode: {
            get: function () {
                var code = this._json.deployedBytecode;

                if (code.indexOf("0x") != 0) {
                    code = "0x" + code;
                }

                return code;
            },
            set: function (val) {
                var code = val;

                if (val.indexOf("0x") != 0) {
                    code = "0x" + code;
                }

                this._json.deployedBytecode = code;
            }
        },
        sourceMap: {
            get: function () {
                return this._json.sourceMap;
            },
            set: function (val) {
                this._json.sourceMap = val;
            }
        },
        deployedSourceMap: {
            get: function () {
                return this._json.deployedSourceMap;
            },
            set: function (val) {
                this._json.deployedSourceMap = val;
            }
        },
        source: {
            get: function () {
                return this._json.source;
            },
            set: function (val) {
                this._json.source = val;
            }
        },
        sourcePath: {
            get: function () {
                return this._json.sourcePath;
            },
            set: function (val) {
                this._json.sourcePath = val;
            }
        },
        legacyAST: {
            get: function () {
                return this._json.legacyAST;
            },
            set: function (val) {
                this._json.legacyAST = val;
            }
        },
        ast: {
            get: function () {
                return this._json.ast;
            },
            set: function (val) {
                this._json.ast = val;
            }
        },
        compiler: {
            get: function () {
                return this._json.compiler;
            },
            set: function (val) {
                this._json.compiler = val;
            }
        },
        // Deprecated
        schema_version: function () {
            return this.schemaVersion;
        },
        schemaVersion: function () {
            return this._json.schemaVersion;
        },
        // deprecated
        updated_at: function () {
            return this.updatedAt;
        },
        updatedAt: function () {
            try {
                return this.network.updatedAt || this._json.updatedAt;
            } catch (e) {
                return this._json.updatedAt;
            }
        }
    };

    Utils.bootstrap(Contract);

    module.exports = Contract;

    return Contract;
})(module || {});
