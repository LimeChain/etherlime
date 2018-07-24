const isValidLibrary = require('./../utils/linking-utils').isValidLibrary;

const isValidContract = function (contract) {
	if (!contract.bytecode) {
		return false;
	}

	if (!contract.abi) {
		return false;
	}

	if (!contract.contractName) {
		return false;
	}

	return true;
};

const isValidBytecode = function (libraries, bytecode) {
	if (!isValidLibrary(libraries)) {
		return false;
	}

	if (bytecode === undefined
		|| bytecode === null
		|| bytecode === {}
		|| !isNaN(bytecode)) {
			return false;
	}

	for (const key in Object.keys(libraries)) {
		if (libraries.hasOwnProperty(key)) {
			continue;
		}

		if (!bytecode.includes(`__${key}`)) {
			return false;
		}
	}

	return true;
}

module.exports = {
	isValidContract,
	isValidBytecode
}