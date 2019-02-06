var repl = require("repl");
var expect = require("../compiler/etherlime-expect");
var async = require("async");
var EventEmitter = require("events");
var inherits = require("util").inherits;

inherits(ReplManager, EventEmitter);

function ReplManager(options) {
	EventEmitter.call(this);
	expect.options(options, [
		"working_directory",
		"contracts_directory",
		"contracts_build_directory",
		// "migrations_directory",
		// "network",
		// "network_id",
		// "provider",
		// "resolver",
		"build_directory"
	]);

	this.options = options;
	this.repl = options.repl;

	this.contexts = [];
}

ReplManager.prototype.start = function (options) {
	var self = this;
	this.contexts.push({
		prompt: options.prompt,
		interpreter: options.interpreter,
		ignoreUndefined: options.ignoreUndefined || false,
		done: options.done
	});

	var currentContext = this.contexts[this.contexts.length - 1];

	if (!this.repl) {
		this.repl = repl.start({
			prompt: currentContext.prompt,
			eval: this.interpret.bind(this)
		});

		// this.repl.on("exit", function () {
		// 	// If we exit for some reason, call done functions for good measure
		// 	// then ensure the process is completely killed. Once the repl exits,
		// 	// the process is in a bad state and can't be recovered (e.g., stdin is closed).
		// 	var doneFunctions = self.contexts.map(function (context) {
		// 		return context.done
		// 			? function () {
		// 				// context.done();
		// 			}
		// 			: function () { };
		// 	});
		// 	async.series(doneFunctions, function () {
		// 		process.exit();
		// 	});
		// });
	}

	// Bubble the internal repl's exit event
	this.repl.on("exit", function () {
		console.log('Exiting...')
		self.emit("exit");
	});

	this.activate(options);
};

// ReplManager.prototype.setContextVars = function (obj) {
// 	var self = this;
// 	if (this.repl) {
// 		Object.keys(obj || {}).forEach(function (key) {
// 			self.repl.context[key] = obj[key];
// 		});
// 	}
// };

ReplManager.prototype.activate = function (session) {
	const { prompt, context, ignoreUndefined } = session;
	this.repl.setPrompt(prompt);
	this.repl.ignoreUndefined = ignoreUndefined;
	// this.setContextVars(context);
};

ReplManager.prototype.stop = function (callback) {
	var oldContext = this.contexts.pop();
	if (oldContext.done) {
		oldContext.done();
	}

	process.exit();
};

ReplManager.prototype.interpret = function (cmd, context, filename, callback) {
	var currentContext = this.contexts[this.contexts.length - 1];
	currentContext.interpreter(cmd, context, filename, callback);
};

module.exports = ReplManager;
