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

const isValidLibrary = function (libraries) {
	if (JSON.stringify(libraries) !== JSON.stringify({})) {
		return true;
	}

	return false;
}

const isValidBytecode = function (libraries, bytecode) {
	if (isValidLibrary(libraries)) {
		for (const key in Object.keys(libraries)) {
			if (libraries.hasOwnProperty(key)) {
				if (!bytecode.includes(`__${key}`)) {
					return false;
				}
			}
		}

		return true;
	}

	return false;
}

module.exports = {
	isValidContract,
	isValidLibrary,
	isValidBytecode
}