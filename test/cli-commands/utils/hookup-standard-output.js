const hook_stream = function (_stream, fn) {
	// Reference default write method
	const old_write = _stream.write;
	// _stream now write with our shiny function
	_stream.write = fn;

	return function () {
		// reset to the default write method
		_stream.write = old_write;
	};
};

module.exports = {
	hook_stream
};