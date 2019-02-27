let ethers = require('ethers');

module.exports = class Logger {
	constructor(port) {
		this.provider = new ethers.providers.JsonRpcProvider(`http://localhost:${port}`);
		this._totalGasUsed = 0;
	}

	async startNewLogForTest() {
		this.startingBlockNumber = await this.provider.getBlockNumber() + 1;
	}

	async getGasUsedForCurrentTest() {
		let lastBlockNumber = await this.provider.getBlockNumber();
		let gasUsed = 0;
		while (this.startingBlockNumber <= lastBlockNumber) {
			let block = await this.provider.getBlock(this.startingBlockNumber);
			gasUsed += Number(block.gasUsed.toString());
			this.startingBlockNumber++;
		}
		this._addToTotalGas(gasUsed);
		return gasUsed;
	}

	getTotalGasUsed() {
		return this._totalGasUsed;
	}

	_addToTotalGas(amount) {
		this._totalGasUsed += amount;
	}
};
