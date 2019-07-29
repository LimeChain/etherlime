const { runWithoutWriteFiles } = require('../flattener/flatten');
const axios = require('axios');
const querystring = require('querystring');
const logger = require('etherlime-logger').logger;
const colors = require('etherlime-utils').colors;
const ethers = require('ethers');
const DEFAULT_SEND_REQUEST_TIMEOUT = 10000;
const DEFAULT_CHECK_STATUS_TIMEOUT = 5000;
const MODULE_NAME = 'contract';
const ACTION_VERIFY_SOURCE = 'verifysourcecode';
const ACTION_VERIFY_STATUS = 'checkverifystatus';
class Verifier {

	constructor() {

	}

	async verifySmartContract(contractWrapper, deploymentArguments, libraries, defaultOverrides) {

		const etherscanApiKey = defaultOverrides.etherscanApiKey;
		const contractName = contractWrapper._contract.contractName;
		const flattenedCode = await this._flattenSourceCode(contractWrapper);
		const constructorArguments = await this._buildConstructorArguments(contractWrapper, deploymentArguments);
		const contractLibraries = this._buildLibrariesArguments(libraries);
		const { apiUrl, networkName } = await this._buildApiUrl(contractWrapper);
		const solcVersionCompiler = this._buildSolcVersionCompiler(contractWrapper._contract.compiler.version);
		logger.log(`Attempting to verify your contract: ${colors.colorName(contractName)} on network ${colors.colorParams(networkName)}`);
		let data = this._constructRequestData(etherscanApiKey, contractWrapper, contractLibraries, flattenedCode, solcVersionCompiler, constructorArguments);

		const response = await this._sendVerificationRequest(data, defaultOverrides, apiUrl);
		return await this._checkVerificationStatus(response, defaultOverrides, contractName, apiUrl);
	}

	async _flattenSourceCode(contractWrapper) {
		const regexp = /[0-9]?\.[0-9]?\.[0-9]?[0-9]?/;
		const solcVersion = regexp.exec(contractWrapper._contract.compiler.version)[0];
		const sourceCode = await runWithoutWriteFiles(contractWrapper._contract.sourcePath, solcVersion);
		return sourceCode
	}

	async _buildConstructorArguments(contractWrapper, deploymentArguments) {
		if (!deploymentArguments.length) {
			return;
		}
		let encoder = new ethers.utils.AbiCoder();
		let types = [];
		for (let i = 0; i < contractWrapper.interface.deployFunction.inputs.length; i++) {
			types.push(contractWrapper.interface.deployFunction.inputs[i].type);
		}
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

	async _buildApiUrl(contractWrapper) {
		const { name } = await contractWrapper.provider.getNetwork();

		if ((/^(ropsten|rinkeby|kovan|goerli)$/.test(name))) {
			return { apiUrl: `https://api-${name}.etherscan.io/api`, networkName: name };
		}
		return { apiUrl: 'https://api.etherscan.io/api', networkName: name };
	}

	_constructRequestData(etherscanApiKey, contractWrapper, contractLibraries, flattenedCode, solcVersionCompiler, constructorArguments) {
		let data = {
			apikey: etherscanApiKey,
			module: MODULE_NAME,
			action: ACTION_VERIFY_SOURCE, // DO NOT CHANGE
			contractaddress: contractWrapper.contractAddress,
			sourceCode: flattenedCode,
			contractname: contractWrapper._contract.contractName,
			compilerversion: solcVersionCompiler,
			optimizationUsed: contractWrapper._contract.compiler.optimizer ? 1 : 0,
			runs: contractWrapper._contract.compiler.runs,
			constructorArguements: constructorArguments
		}
		if (contractLibraries) {
			for (let i = 0; i < contractLibraries.length; i++) {
				let index = i + 1
				data[`libraryname${index}`] = contractLibraries[i].name;
				data[`libraryaddress${index}`] = contractLibraries[i].address;
			}
		}
		let stringData = querystring.stringify(data);
		return stringData
	}

	async _sendVerificationRequest(stringData, defaultOverrides, apiUrl) {

		const ms = defaultOverrides.waitInterval || DEFAULT_SEND_REQUEST_TIMEOUT;
		const self = this;
		async function sendRequest(ms, count) {
			const response = await axios.post(apiUrl, stringData);
			if (!(count > 10)) {
				if (response.data.message !== 'OK') {
					logger.log('Processing verification. Please wait. It might take a few minutes')
					await self.timeout(ms);
					return await sendRequest(ms, ++count);
				}
				logger.log(`Request successfully sent, your GUID is ${colors.colorParams(response.data.result)}`);
				return response.data
			}
			throw new Error('Contract Verification Timeout! Please try again');

		}
		await self.timeout(ms)
		return sendRequest(ms, 0);

	}

	async _checkVerificationStatus(response, defaultOverrides, contractName, apiUrl) {
		let params = {
			guid: response.result,
			module: MODULE_NAME,
			action: ACTION_VERIFY_STATUS
		};
		const ms = defaultOverrides.waitInterval || DEFAULT_CHECK_STATUS_TIMEOUT;
		const self = this;
		async function checkGuid(ms, count) {
			const response = await axios.get(apiUrl, { params });
			if (!(count > 10)) {
				if (response.data.result !== 'Pending in queue') {
					return response.data
				}
				logger.log('Pending...')
				logger.log('Please wait...')
				await self.timeout(ms);
				return await checkGuid(ms, ++count);
			}
			throw new Error('Contract Verification Timeout! Check Final Status on Etherscan');

		}
		await self.timeout(ms);
		const result = await checkGuid(ms, 0);
		if (result.message !== 'OK') {
			logger.log(`Contract: ${colors.colorName(contractName)} verification failed with error: ${colors.colorFailure(result.result)}`);
			return result.result;
		}
		logger.log(`Contract: ${colors.colorName(contractName)} is verified ${colors.colorSuccess('successfully!')}`);
		return 'Success';
	};

	timeout(ms) {
		return new Promise(resolve => setTimeout(resolve, ms));
	}
}

module.exports = Verifier;
