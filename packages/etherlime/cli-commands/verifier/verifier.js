const { runWithoutWriteFiles } = require('../flattener/flatten');
const axios = require('axios');
const querystring = require('querystring');
const logger = require('etherlime-logger').logger;
const colors = require('etherlime-utils').colors;
const ethers = require('ethers');
const chainIdToUrlMap = require('./urlConfig').chainIdToUrlMap;
const DEFAULT_SEND_REQUEST_TIMEOUT = 10000;
const DEFAULT_CHECK_STATUS_TIMEOUT = 5000;
const MODULE_NAME = 'contract';
const ACTION_VERIFY_SOURCE = 'verifysourcecode';
const ACTION_VERIFY_STATUS = 'checkverifystatus';
class Verifier {

	constructor() {

	}

	async verifySmartContract(platform, contractWrapper, deploymentArguments, libraries, defaultOverrides) {

		let apiUrl;
		let data;
		let networkName;
		console.log("1")
		const contractName = contractWrapper._contract.contractName;
		const flattenedCode = await this._flattenSourceCode(contractWrapper);
		const constructorArguments = await this._buildConstructorArguments(contractWrapper, deploymentArguments);
		const contractLibraries = this._buildLibrariesArguments(libraries);
		const solcVersionCompiler = this._buildSolcVersionCompiler(contractWrapper._contract.compiler.version);
		
		if(platform === 'blockscout') {
			const urlData = await this._buildBlockscoutApiUrl(contractWrapper);
			apiUrl = urlData.url;
			networkName = urlData.name
			data = this._constructBlockscoutRequestData(contractWrapper, flattenedCode, solcVersionCompiler, constructorArguments, contractLibraries);
			
			logger.log(`Attempting to verify your contract: ${colors.colorName(contractName)} on network ${colors.colorParams(networkName)}`);
			const response = await this._sendVerificationRequest(data, defaultOverrides, apiUrl);

			let params = {
				module: MODULE_NAME,
				action: "getabi",
				address: contractWrapper.contractAddress
			};

			return await this._checkVerificationStatus(defaultOverrides, contractName, apiUrl, params);
		} else {
			const etherscanApiKey = defaultOverrides.etherscanApiKey;
			const urlData = await this._buildEtherscanApiUrl(contractWrapper);
			apiUrl = urlData.apiUrl
			networkName = urlData.networkName
			data = this._constructEtherscanRequestData(etherscanApiKey, contractWrapper, contractLibraries, flattenedCode, solcVersionCompiler, constructorArguments);
			
			logger.log(`Attempting to verify your contract: ${colors.colorName(contractName)} on network ${colors.colorParams(networkName)}`);
			const response = await this._sendVerificationRequest(data, defaultOverrides, apiUrl);
			console.log("response.resut", response.result)
			let params = {
				guid: response.result,
				module: MODULE_NAME,
				action: ACTION_VERIFY_STATUS
			};

			return await this._checkVerificationStatus(defaultOverrides, contractName, apiUrl, params);
		}
		
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

	async _buildEtherscanApiUrl(contractWrapper) {
		const { name } = await contractWrapper.provider.getNetwork();

		if ((/^(ropsten|rinkeby|kovan|goerli)$/.test(name))) {
			return { apiUrl: `https://api-${name}.etherscan.io/api`, networkName: name };
		}
		return { apiUrl: 'https://api.etherscan.io/api', networkName: name };
	}

	async _buildBlockscoutApiUrl(contractWrapper) {
		const network = await contractWrapper.provider.getNetwork();
		const urlData = chainIdToUrlMap.get(network.chainId);
		if (!urlData) {
			throw new Error(`Unsupported chain. ID: ${network.chainId}`);
		}

		return urlData
	}

	_constructEtherscanRequestData(etherscanApiKey, contractWrapper, contractLibraries, flattenedCode, solcVersionCompiler, constructorArguments) {
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
			const librariesData = this._constructLibrariesData(contractLibraries, data);
			data = Object.assign(data, librariesData);
		}

		let stringData = querystring.stringify(data);
		return stringData
	}

	_constructBlockscoutRequestData(contractWrapper, flattenedCode, solcVersionCompiler, constructorArguments, contractLibraries) {
		let data = {
			module: MODULE_NAME,
			action: 'verify', // DO NOT CHANGE
			addressHash: contractWrapper.contractAddress,
			contractSourceCode: flattenedCode,
			name: contractWrapper._contract.contractName,
			compilerVersion: solcVersionCompiler,
			optimization: contractWrapper._contract.compiler.optimizer ? true : false,
			runs: contractWrapper._contract.compiler.runs,
			constructorArguments: constructorArguments
		}

		if (contractLibraries) {
			const librariesData = this._constructLibrariesData(contractLibraries, data);
			data = Object.assign(data, librariesData);
		}

		let stringData = querystring.stringify(data);
		return stringData
	}

	_constructLibrariesData(contractLibraries, data) {
		let librariesData = {}; 
		for (let i = 0; i < contractLibraries.length; i++) {
			let index = i + 1
			librariesData[`library${index}Name`] = contractLibraries[i].name;
			librariesData[`library${index}Address`] = contractLibraries[i].address;
		}

		return librariesData
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

	async _checkVerificationStatus(defaultOverrides, contractName, apiUrl, params) {	
		const ms = defaultOverrides.waitInterval || DEFAULT_CHECK_STATUS_TIMEOUT;
		const self = this;
		async function checkGuid(ms, count) {
			const response = await axios.get(apiUrl, {params});
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
		console.log("reult", result)
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
