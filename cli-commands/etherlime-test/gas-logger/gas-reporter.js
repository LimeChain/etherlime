const mocha = require('mocha');
const Base = mocha.reporters.Base;
const color = Base.color;
const GasLogger = require('./gas-logger');
const inherits = require('util').inherits;

function CustomReporter(runner, options) {
	Base.call(this, runner);
	const self = this;
	let port = options.reporterOptions.port;
	let indents = 0;
	let n = 0;
	let failed = false;
	let gasLogger = new GasLogger(port);
	const indent = () => Array(indents).join('  ');

	runner.on('start', () => {

	});

	runner.on('suite', suite => {
		++indents;
		console.log(color('suite', '%s%s'), indent(), suite.title)
	});

	runner.on('suite end', () => {
		--indents;
	});

	runner.on('pending', test => {
		let fmt = indent() + color('pending', '  - %s');
		console.log(fmt, test.title)
	});

	runner.on('test', async () => {
	});

	runner.on('hook end', async () => {
		gasLogger.startNewLogForTest();
	});

	runner.on('pass', async test => {
		let fmt;
		let fmtArgs;
		let gasUsedString;
		let timeSpentString = color(test.speed, '%dms');
		let consumptionString;
		let gasUsed = await gasLogger.getGasUsedForCurrentTest();
		if (gasUsed) {
			gasUsedString = color('checkmark', '%d gas');

			consumptionString = ' (' + timeSpentString + ', ' + gasUsedString + ')';
			fmtArgs = [test.title, test.duration, gasUsed]
		
			fmt = indent() +
				color('checkmark', '  ' + Base.symbols.ok) +
				color('pass', ' %s') +
				consumptionString
		} else {
		
			consumptionString = ' (' + timeSpentString + ')';
			fmtArgs = [test.title, test.duration]
			
			fmt = indent() +
				color('checkmark', '  ' + Base.symbols.ok) +
				color('pass', ' %s') +
				consumptionString
		}
		console.log.apply(null, [fmt, ...fmtArgs])
	});

	runner.on('fail',async test => {
		failed = true;
		let consumptionString = "";
		let gasUsed = await gasLogger.getGasUsedForCurrentTest();
		if (gasUsed) {
			consumptionString = ' (' + gasUsed + ' gas)';
		}
		let fmt = indent() + color('fail', '  %d) %s');
		console.log();
		console.log(fmt, ++n, test.title + consumptionString)
	});

	runner.on('end', () => {
		indents = 2;
		//Note(Nikolay): We need this Hack to display properly the last test indents and put in the proper Suite.
		//              This is cause because we now use Async tests to measure the Gas and the reporter will wait
		//              on the Transaction completion to calculate the Gas before showing information.
		// Maybe you can figure a better way to do this ?
		setTimeout(() => {
			console.log();
			console.log(indent() + color('bright yellow', ' %s'), `Total Gas Used: ${gasLogger.getTotalGasUsed()}`);
			console.log();
			self.epilogue();
		}, 1000);
	});
}

inherits(CustomReporter, Base);

module.exports = CustomReporter;
