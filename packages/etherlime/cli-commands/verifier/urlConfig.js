let chainIdToUrlMap = new Map();

chainIdToUrlMap.set(1, 'https://blockscout.com/etc/mainnet/api');
chainIdToUrlMap.set(77, 'https://blockscout.com/poa/sokol/api');

module.exports = { chainIdToUrlMap }