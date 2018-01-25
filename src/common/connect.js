import {Apis, Manager} from 'gxbjs-ws';

let witnesses = process.env.witnesses;
let connectionManager = null;
let connected = false;

let connect = function (callback) {
    if (!callback) {
        callback = function () {
            // empty logic
        };
    }
    if (connected) {
        return callback(connected);
    }
    if (!connectionManager) {
        connectionManager = new Manager({url: witnesses[0], urls: witnesses});
    }
    connectionManager.connectWithFallback(true).then(() => {
        callback && callback(connected);
    });
};

// websocket 状态处理
Apis.setRpcConnectionStatusCallback(function (status) {
    console.log('Witness status:', status);
    if (!connected && status == 'open') {
        connected = true;
    }

    if (connected && (status == 'closed' || status == 'error')) { // 出错重连
        Apis.reset();
        console.log('Connection failed,try another connection');
        connected = false;
        setTimeout(() => {
            connect();
        }, 1000);
    }
});

export default connect;
