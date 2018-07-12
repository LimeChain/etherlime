var Blockchain = {

  getBlockByNumber: function (blockNumber, provider, callback) {
    var params = [blockNumber, true];

    provider.sendAsync({
      jsonrpc: '2.0',
      method: 'eth_getBlockByNumber',
      params: params,
      id: Date.now(),
    }, callback)
  },

  getBlockByHash: function (blockHash, provider, callback) {
    var params = [blockHash, true];

    provider.sendAsync({
      jsonrpc: '2.0',
      method: 'eth_getBlockByHash',
      params: params,
      id: Date.now(),
    }, callback)
  },

  parse: function (uri) {
    var parsed = {};
    if (uri.indexOf("blockchain://") != 0) return parsed;

    uri = uri.replace("blockchain://", "");

    var pieces = uri.split("/block/");

    parsed.genesis_hash = "0x" + pieces[0];
    parsed.block_hash = "0x" + pieces[1];

    return parsed;
  },

  matches: function (uri, provider, callback) {
    var self = this;
    uri = self.parse(uri);

    var expected_genesis = uri.genesis_hash;
    var expected_block = uri.block_hash;

    self.getBlockByNumber("0x0", provider, function (err, response) {
      if (err) return callback(err);
      var block = response.result;
      if (block.hash != expected_genesis) return callback(null, false);

      self.getBlockByHash(expected_block, provider, function (err, response) {
        var block = response.result;
        if (err || block == null) {
          return callback(null, false);
        }

        callback(null, true);
      });
    });
  }
};

module.exports = Blockchain;
