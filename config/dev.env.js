var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
    __HOST__: '"http://localhost:8082/#"',
    __SERVICE__: '"http://47.96.164.78:9218"',
    witnesses: JSON.stringify(['ws://47.96.164.78:28090']),
    faucet_addr: '"http://47.96.164.78:8888"'
  // witnesses:JSON.stringify(["wss://node1.gxb.io","wss://node5.gxb.io","wss://node8.gxb.io","wss://node11.gxb.io"]),
  // faucet_addr:'"https://opengateway.gxb.io"'
})
