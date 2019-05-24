var merge = require('webpack-merge');
var prodEnv = require('./prod.env');

module.exports = merge(prodEnv, {
    NODE_ENV: '"development"',
    __HOST__: '"http://localhost:8082/#"',
    __SERVICE__: '"http://dev.gxchain.cn/gateway"',
    witnesses: JSON.stringify(['ws://47.96.164.78:28090']),
    faucet_addr: '"http://dev.gxchain.cn/faucet"',
    chain_id: '"bc59e6e7f500fa56504ce7101f7df8eb74151398f62167567adcf18a026928d1"',
    network: '"Dev Network"'
});
