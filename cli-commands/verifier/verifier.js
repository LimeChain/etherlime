const { runWithoutWriteFiles } = require('../flattener/flatten');
const axios = require('axios');
const querystring = require('querystring');
const logger = require('../../logger-service/logger-service').logger;
const colors = require('../../utils/colors');
const ethers = require('ethers');

class Verifier {

	constructor() {

	}

	async verifySmartContract(contractWrapper, deploymentArguments, libraries, defaultOverrides) {

		this.apiKey = defaultOverrides.apiKey;
		this.contractAddress = contractWrapper.contractAddress;
		this.contractName = contractWrapper._contract.contractName;
		this.flattenCode = await this._flattenSourceCode(contractWrapper);
		this.optimization = contractWrapper._contract.compiler.optimizer;
		this.runs = contractWrapper._contract.compiler.runs;
		this.optimization = contractWrapper._contract.compiler.optimizer ? 1 : 0;
		this.constructorArguments = await this._buildConstructorArguments(contractWrapper, deploymentArguments);
		this.libraries = this._buildLibrariesArguments(libraries);
		this.apiUrl = await this._buildApiUrl(contractWrapper.provider);
		this.solcVersionCompiler = this._buildSolcVersionCompiler(contractWrapper._contract.compiler.version);
		logger.log(`Attempting to verify your contract: ${colors.colorName(this.contractName)} on network ${colors.colorParams(this.name)}`);
		let data = this._constructRequestData();

		const response = await this._sendVerificationRequest(data);
		return await this._checkVerificationStatus(response);
	}

	async _flattenSourceCode(contractWrapper) {
		const regexp = /[0-9]?\.[0-9]?\.[0-9]?/;
		const sourcePath = contractWrapper._contract.sourcePath;
		const solcVersion = regexp.exec(contractWrapper._contract.compiler.version)[0];
		const sourceCode = await runWithoutWriteFiles(`${this.contractName}.sol`, solcVersion);
		return sourceCode
	}

	async _buildConstructorArguments(contractWrapper, deploymentArguments) {
		if (!deploymentArguments.length) {
			return;
		}
		let encoder = new ethers.utils.AbiCoder();
		let types = [];
		contractWrapper.interface.deployFunction.inputs.forEach(element => {
			types.push(element.type);
		});
		let encodedConstructorArgs = (await encoder.encode(types, deploymentArguments)).substr(2);
		return encodedConstructorArgs;
	}

	_buildLibrariesArguments(libraries) {
		if (!libraries || Object.keys(libraries).length === 0) {
			return
		}
		let arrayLib = Object.entries(libraries).map(([key, value]) => ({ name: key, address: value }));
		return arrayLib
	}

	_buildSolcVersionCompiler(solcVersion) {
		const version = `v${solcVersion.replace(/.Emscripten.clang/g, '')}`;
		return version;
	}

	async _buildApiUrl(provider) {
		const { name } = await provider.getNetwork();
		this.name = name;
		if (this.name === 'ropsten' || 'rinkeby' || 'kovan' || 'goerli') {
			return `https://api-${this.name}.etherscan.io/api`;
		}
		return 'https://api.etherscan.io/api';
	}

	_constructRequestData() {
		let data = {
			apikey: this.apiKey,
			module: 'contract', // DO NOT CHANGE
			action: 'verifysourcecode', // DO NOT CHANGE
			contractaddress: this.contractAddress,
			sourceCode: this.flattenCode,
			contractname: this.contractName,
			compilerversion: this.solcVersionCompiler,
			optimizationUsed: this.optimization,
			runs: this.runs,
			constructorArguements: this.constructorArguments
		}
		if (this.libraries) {
			for (let i = 0; i < this.libraries.length; i++) {
				data[`libraryname${i + 1}`] = this.libraries[i].name;
				data[`libraryaddress${i + 1}`] = this.libraries[i].address;
			}
		}
		let stringData = querystring.stringify(data);
		return stringData
	}

	async _sendVerificationRequest(stringData) {

		const ms = 10000;
		let count = 0;
		const self = this;
		async function sendRequest(ms) {
			await self.timeout(ms)
			const response = await axios.post(self.apiUrl, stringData);
			if (count < 10) {
				if (response.data.message == 'OK') {
					logger.log(`Request successfully sent, your GUID is ${colors.colorParams(response.data.result)}`);
					return response.data
				} else {
					console.log('Processing verification. Please wait. It might take a few minutes');
					count++;
					return await sendRequest(ms);
				}
			} else {
				throw new Error('Contract Verification Timeout!!! Please try again');
			}
		}

		return sendRequest(ms);

	}

	async _checkVerificationStatus(response) {
		let params = {
			guid: response.result,
			module: "contract", // DO NOT CHANGE
			action: "checkverifystatus" // DO NOT CHANGE
		};
		const ms = 5000;
		let count = 0;

		const self = this;
		async function checkGuid(ms) {
			await self.timeout(ms);
			const response = await axios.get(self.apiUrl, { params });
			if (count < 10) {
				if (response.data.result == 'Pending in queue') {

					console.log('Pending...');
					console.log('Please wait...');

					count++;
					return await checkGuid(ms);
				} else {
					return response.data
				}
			} else {
				throw new Error('Contract Verification Timeout!!! Check Final Status on Etherscan');
			}
		}

		const result = await checkGuid(ms);
		if (result.message === 'OK') {
			logger.log(`Contract: ${colors.colorName(this.contractName)} is verified ${colors.colorSuccess('successfully!')}`);
			return 'Success';
		}
		logger.log(`Contract: ${colors.colorName(this.contractName)} verification failed with error: ${colors.colorFailure(result.result)}`);
		return result.result;
	};

	timeout(ms) {
		return new Promise(resolve => setTimeout(resolve, ms));
	}
}

module.exports = Verifier;
