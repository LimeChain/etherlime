let chainIdToUrlMap = new Map();

chainIdToUrlMap.set(1, {url: 'https://blockscout.com/etc/mainnet/api', name: 'Ethereum Mainnet'});
chainIdToUrlMap.set(77, {url: 'https://blockscout.com/poa/sokol/api', name: 'POA Sokol'});
chainIdToUrlMap.set(99, {url: 'https://blockscout.com/poa/core/api', name: 'POA Core'});
chainIdToUrlMap.set(30, {url: 'https://blockscout.com/rsk/mainnet/api', name: 'RSK Mainnet'});
chainIdToUrlMap.set(100, {url: 'https://blockscout.com/poa/xdai/api', name: 'xDai Chain'});
chainIdToUrlMap.set(61, {url: 'https://blockscout.com/api', name: 'Ethereum Classic'});

module.exports = { chainIdToUrlMap }