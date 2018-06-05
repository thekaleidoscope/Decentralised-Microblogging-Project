var HDWalletProvider = require("truffle-hdwallet-provider");
var mnemonic ="casual tent october favorite swarm eagle genius media note fly creek conduct";

  // See <http://truffleframework.com/docs/advanced/configuration>
  // for more about customizing your Truffle configuration!

module.exports = {
  networks: {
    development: {
      host: '127.0.0.1',
      port: 8545,
      network_id: '*' // Match any network id
    },
    ropsten: {
      provider: function() {
        return new HDWalletProvider(mnemonic, "https://ropsten.infura.io/qNjs8vdB2KGt3QSe53cG")
      },
      network_id: 3,
      // from:"0x656b1BAeD7C7f8B561dCE054E91239b699b4a0EF",
      gas: 6612388,
      gasPrice: 20000000000
  },

  ganache:
  {
    host: "127.0.0.1",
    port: 7545,
    network_id: "*" // matching any id
    },
    rpc:
     {
        host: 'localhost',
        post:8080
    },
    solc:
    {
        optimizer: {
        enabled: true,
        runs: 200
                    }
    }

}
}
