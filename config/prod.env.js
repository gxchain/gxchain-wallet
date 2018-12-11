module.exports = (function () {
    console.log('isProd', !!process.env.prod);
    if (!!process.env.prod) {
        return {
            NODE_ENV: '"production"',
            __HOST__: '"https://mwallet.gxb.io/#"',
            __SERVICE__: '"https://walletgateway.gxb.io"',
            witnesses: JSON.stringify(["wss://node1.gxb.io", "wss://node5.gxb.io", "wss://node23.gxb.io", "wss://node8.gxb.io", "wss://node11.gxb.io", "wss://node15.gxb.io", "wss://node16.gxb.io", "wss://node17.gxb.io"]),
            faucet_addr: '"https://opengateway.gxb.io"',
            chain_id: '"4f7d07969c446f8342033acb3ab2ae5044cbe0fde93db02de75bd17fa8fd84b8"'
        };
    }
    else {
        return {
            NODE_ENV: '"production"',
            __HOST__: '"http://47.96.164.78/#"',
            __SERVICE__: '"http://47.96.164.78:9218"',
            witnesses: JSON.stringify(['ws://47.96.164.78:28090']),
            faucet_addr: '"http://47.96.164.78:8888"',
            chain_id: '"bc59e6e7f500fa56504ce7101f7df8eb74151398f62167567adcf18a026928d1"'
        };
    }
})();
