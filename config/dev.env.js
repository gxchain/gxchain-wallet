var merge = require('webpack-merge');
var prodEnv = require('./prod.env');

module.exports = (function() {
    if (process.env.requestEnv) {
        return {
            NODE_ENV: '"development"',
            __HOST__: '"https://mwallet.gxb.io/#"',
            __SERVICE__: '"https://walletgateway.gxb.io"',
            witnesses: JSON.stringify([
                'wss://node1.gxb.io',
                'wss://node5.gxb.io',
                'wss://node23.gxb.io',
                'wss://node8.gxb.io',
                'wss://node11.gxb.io',
                'wss://node15.gxb.io',
                'wss://node16.gxb.io',
                'wss://node17.gxb.io'
            ]),
            faucet_addr: '"https://opengateway.gxb.io"',
            chain_id: '"4f7d07969c446f8342033acb3ab2ae5044cbe0fde93db02de75bd17fa8fd84b8"',
            network: '"Main Network"',
            staking_sum: '"https://wallet.gxb.io"',
            nftContract: '"gxc-nft"',
            flyContract: '"fly-nft"'
        }
    };
    return merge(prodEnv, {
        NODE_ENV: '"development"',
        __HOST__: '"http://localhost:8082/#"',
        __SERVICE__: '"http://dev.gxchain.cn/gateway"',
        witnesses: JSON.stringify(['wss://testnet.gxchain.org']),
        faucet_addr: '"https://testnet.faucet.gxchain.org"',
        chain_id: '"c2af30ef9340ff81fd61654295e98a1ff04b23189748f86727d0b26b40bb0ff4"',
        network: '"Test Network"',
        staking_sum: '"https://testnet.wallet.gxchain.org"',
        nftContract: '"testnft"',
        flyContract: '"fly-nft"'
    });
})();
