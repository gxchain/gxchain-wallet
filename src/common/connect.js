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
    if (connectionManager && connectionManager.isConnected) {
        return callback(connectionManager.isConnected);
    }
    if (!connectionManager) {
        connectionManager = new Manager({url: witnesses[0], urls: witnesses, autoFallback: true});
    }
    connectionManager.connectWithFallback(true).then(() => {
        callback && callback(connected);
    }).catch(ex => {
        connected = false;
        console.error(ex);
        setTimeout(() => {
            console.log('>>> reconnect');
            connect();
        }, 1000);
    });
};

// websocket 状态处理
Apis.setRpcConnectionStatusCallback(function (status) {
    console.log('Witness status:', status);
});

export default connect;
