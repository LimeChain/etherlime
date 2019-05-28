const zkSnark = require("snarkjs");
const fs = require("fs");
const path = require("path");

const trustedSetupPath = './zero-knowledge-proof/trusted-setup';
const contractsPath = `./contracts`;

const run = async (vk) => {
	console.log('===== Creating Smart Contract for OnChain verification =====');
	const verifierKey = zkSnark.unstringifyBigInts(require(`${process.cwd()}/${trustedSetupPath}/${vk}`));
	const template = zkSnark.generateVerifier(verifierKey);
	fs.writeFileSync(`${contractsPath}/Verifier.sol`, template);
	console.log('===== Smart Contract Created Successfully. Please check your contracts folder =====');
};

module.exports = {
	run
}