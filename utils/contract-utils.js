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

module.exports = {
	isValidContract
}