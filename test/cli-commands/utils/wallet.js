const ethers = require('ethers');

function getAddressByPrivateKey(privateKey) {
	const wallet = new ethers.Wallet(privateKey);

	return wallet.address.toLowerCase();
}

module.exports = {
	getAddressByPrivateKey
};