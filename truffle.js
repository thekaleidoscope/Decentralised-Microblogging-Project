module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // for more about customizing your Truffle configuration!
  networks: {
      solc: {
   optimizer: {
     enabled: true,
     runs: 200
   }
 },
      ropsten: {
     host: "127.0.0.1",
     port: 8545,
     network_id: 3,
     gas: 4700000,
      gasPrice: 21000000000
   },
    ganache: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*" // matching any id
  },
  rpc: {
host: 'localhost',
post:8080
  }
  }
};
