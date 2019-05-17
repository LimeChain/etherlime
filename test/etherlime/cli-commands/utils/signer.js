const ethers = require('ethers');

function getAddressByPrivateKey(privateKey) {
	const signer = new ethers.Wallet(privateKey);

	return signer.address.toLowerCase();
}

module.exports = {
	getAddressByPrivateKey
};