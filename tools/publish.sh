#!/usr/bin/env bash
npm run build
echo '开始打包'
node archive.js
echo '打包完成'
echo '开始部署119'
scp mobile-wallet.zip 119:/root/html
ssh 119 << EOF
    cd /root/html
    unzip -o -d mobile-wallet mobile-wallet.zip;
    exit;
EOF
echo '119完成部署'

