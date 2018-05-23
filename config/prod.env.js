module.exports = (function () {
  console.log('isProd',!!process.env.prod);
  if(!!process.env.prod){
    return {
      NODE_ENV: '"production"',
      __HOST__:'"https://mwallet.gxb.io/#"',
      __SERVICE__:'"https://walletgateway.gxb.io"',
      witnesses:JSON.stringify(["wss://node1.gxb.io","wss://node5.gxb.io","wss://node23.gxb.io","wss://node8.gxb.io","wss://node11.gxb.io","wss://node15.gxb.io","wss://node16.gxb.io","wss://node17.gxb.io"]),
      faucet_addr:'"https://opengateway.gxb.io"'
    }
  }
  else{
    return {
      NODE_ENV: '"production"',
      __HOST__:'"http://47.96.164.78/#"',
      __SERVICE__:'"http://47.96.164.78:9218"',
      witnesses:JSON.stringify(['ws://47.96.164.78:28090']),
      faucet_addr:'"http://47.96.164.78:8888"'
    }
  }
})()
