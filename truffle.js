module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  networks: {
    ganache: {
      host: "localhost",
      port: 7545,
      network_id: "*"
    },
    testrpc: {
      host: "localhost",
      port: 8545,
      network_id: "*"
    }
  }
};