var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  __HOST__:'"http://192.168.100.174:8081/#"',
  __SERVICE__:'"http://192.168.1.124:9218"',
  witnesses:JSON.stringify(["ws://192.168.1.118:28090",'ws://192.168.1.119:28090']),
  faucet_addr:'"http://192.168.1.118:1337/gateway"'
  // witnesses:JSON.stringify(["wss://node1.gxb.io","wss://node5.gxb.io","wss://node8.gxb.io","wss://node11.gxb.io"]),
  // faucet_addr:'"https://opengateway.gxb.io"'
})
