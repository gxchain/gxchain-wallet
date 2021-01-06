var merge = require('webpack-merge');
var prodEnv = require('./prod.env');

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  __HOST__: '"http://localhost:8082/#"',
  __SERVICE__: '"http://dev.gxchain.cn/gateway"',
  witnesses: JSON.stringify(['wss://testnet.gxchain.org']),
  faucet_addr: '"https://testnet.faucet.gxchain.org"',
  chain_id:
    '"c2af30ef9340ff81fd61654295e98a1ff04b23189748f86727d0b26b40bb0ff4"',
  network: '"Test Network"',
  staking_sum: '"https://testnet.wallet.gxchain.org"',
  nftContract: '"bjnnft3"'
});
