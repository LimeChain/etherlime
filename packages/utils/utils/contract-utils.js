const isValidContract = function (contract) {
	if (!contract) {
		return false;
	}
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

const isValidBytecode = function (bytecode) {
	if (typeof bytecode !== 'string') {
		return false;
	}

	if (bytecode.length <= 0) {
		return false;
	}

	return true;
}

module.exports = {
	isValidContract,
	isValidBytecode
}