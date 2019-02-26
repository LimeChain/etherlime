var repl = require("repl");
var expect = require("../compiler/etherlime-expect");
var async = require("async");
var EventEmitter = require("events");
var inherits = require("util").inherits;

// inherits(ReplManager, EventEmitter);

class ReplManager extends EventEmitter{
	
	constructor(options) {
		super()
		EventEmitter.call(this);
		expect.options(options, [
			"working_directory",
			"contracts_directory",
			"contracts_build_directory",
			"build_directory"
		]);

		this.options = options;
		this.repl = options.repl;

		this.contexts = [];
	}

	start (options) {
		let self = this;
		this.contexts.push({
			prompt: options.prompt,
			interpreter: options.interpreter,
			ignoreUndefined: options.ignoreUndefined || false,
			done: options.done
		});
	
		let currentContext = this.contexts[this.contexts.length - 1];
	
		if (!this.repl) {
			this.repl = repl.start({
				prompt: currentContext.prompt,
				eval: this.interpret.bind(this)
			});
		}
	
		// Bubble the internal repl's exit event
		this.repl.on("exit", function () {
			self.emit("exit");
			console.log('Exiting...')
		});
	
		this.activate(options);
	};


	activate (session) {
		const { prompt, context, ignoreUndefined } = session;
		this.repl.setPrompt(prompt);
		this.repl.ignoreUndefined = ignoreUndefined;
	};


	stop (callback) {
		const oldContext = this.contexts.pop();
		if (oldContext.done) {
			oldContext.done();
		}
	
		process.exit();
	};

	interpret (cmd, context, filename, callback) {
		let currentContext = this.contexts[this.contexts.length - 1];
		currentContext.interpreter(cmd, context, filename, callback);
	};

}

// function ReplManager(options) {
// 	EventEmitter.call(this);
// 	expect.options(options, [
// 		"working_directory",
// 		"contracts_directory",
// 		"contracts_build_directory",
// 		// "migrations_directory",
// 		// "network",
// 		// "network_id",
// 		// "provider",
// 		// "resolver",
// 		"build_directory"
// 	]);

// 	this.options = options;
// 	this.repl = options.repl;

// 	this.contexts = [];
// }

// ReplManager.prototype.start = function (options) {
// 	var self = this;
// 	this.contexts.push({
// 		prompt: options.prompt,
// 		interpreter: options.interpreter,
// 		ignoreUndefined: options.ignoreUndefined || false,
// 		done: options.done
// 	});

// 	var currentContext = this.contexts[this.contexts.length - 1];

// 	if (!this.repl) {
// 		this.repl = repl.start({
// 			prompt: currentContext.prompt,
// 			eval: this.interpret.bind(this)
// 		});
// 	}

// 	// Bubble the internal repl's exit event
// 	this.repl.on("exit", function () {
// 		self.emit("exit");
// 		console.log('Exiting...')
// 	});

// 	this.activate(options);
// };

// ReplManager.prototype.activate = function (session) {
// 	const { prompt, context, ignoreUndefined } = session;
// 	this.repl.setPrompt(prompt);
// 	this.repl.ignoreUndefined = ignoreUndefined;
// };

// ReplManager.prototype.stop = function (callback) {
// 	var oldContext = this.contexts.pop();
// 	if (oldContext.done) {
// 		oldContext.done();
// 	}

// 	process.exit();
// };

// ReplManager.prototype.interpret = function (cmd, context, filename, callback) {
// 	var currentContext = this.contexts[this.contexts.length - 1];
// 	currentContext.interpreter(cmd, context, filename, callback);
// };

module.exports = ReplManager;
