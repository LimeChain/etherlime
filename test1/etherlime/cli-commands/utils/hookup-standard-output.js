const hookStream = function (_stream, fn) {
	// Reference default write method
	const oldWrite = _stream.write;
	// _stream now write with our shiny function
	_stream.write = fn;

	return function () {
		// reset to the default write method
		_stream.write = oldWrite;
	};
};

module.exports = {
	hookStream
};