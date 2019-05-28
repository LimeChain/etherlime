let assert = require('assert');
let fs = require('fs');
let path = require('path');
let requireFromString = require('../../../../packages/etherlime-utils/utils/require-from-string');


it('should accept only string as code', function () {
	assert.throws(function () {
		requireFromString();
	}, /code must be a string, not undefined/);
});

it('should require from string', function () {
	assert.equal(requireFromString('module.exports = 1;'), 1);
});

it('should accept filename', function () {
	assert.throws(function () {
		requireFromString('module.exports = ', 'bug.js');
	}, /bug\.js|Unexpected token }/);
});

it('should work with relative require in file and object as filename', function () {
	const file = require('./helpers/module.js');
	let result = requireFromString('', file);

	assert.ok(result);
});

it('should work with relative require in file', function () {
	let file = path.join(__dirname, '/helpers/module.js');
	let code = fs.readFileSync(file, 'utf8');
	let result = requireFromString(code, file);

	assert.ok(result);
	assert.ok(module === result.parent.parent);
});

it('should have appended and preppended paths', function () {
	let file = path.join(__dirname, '/helpers/submodule.js');
	let code = fs.readFileSync(file, 'utf8');
	let result = requireFromString(code, file, {
		appendPaths: ['append'],
		prependPaths: ['prepend']
	});

	assert.ok(result);
	assert.equal(result.paths.indexOf('append'), result.paths.length - 1);
	assert.equal(result.paths.indexOf('prepend'), 0);
});

it('should have meaningful error message', function () {
	try {
		requireFromString('throw new Error("Boom!");');
	} catch (err) {
		assert.ok(/\(<anonymous>:1:69\)/.test(err.stack), 'should contain (<anonymous>:1:69) in stack');
	}

	try {
		requireFromString('throw new Error("Boom!");', '');
	} catch (err) {
		assert.ok(/\(<anonymous>:1:69\)/.test(err.stack), 'should contain (<anonymous>:1:69) in stack');
	}
});

it('should cleanup parent.children', function () {
	let file = path.join(__dirname, '/helpers/submodule.js');
	let code = fs.readFileSync(file, 'utf8');
	let result = requireFromString(code, file);

	assert.ok(module.children.indexOf(result) === -1);
});