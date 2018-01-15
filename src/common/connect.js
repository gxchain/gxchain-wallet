import { ChainStore } from 'gxbjs';
import { Apis, Manager } from 'gxbjs-ws';

let witnesses = process.env.witnesses;
let connectionManager = null;
let connected = false;

let connect = function (callback) {
    if (!callback) callback = function () { };
    if (connected) {
        return callback(connected);
    }
    if (!connectionManager) {
        connectionManager = new Manager({ url: witnesses[0], urls: witnesses });
    }
    connectionManager.connectWithFallback(true).then(() => {
        // ChainStore.subscribed = false;
        // ChainStore.subError = null;
        // ChainStore.clearCache();
        // ChainStore.head_block_time_string = null;
        // ChainStore.init().then(() => {
        //     callback && callback(connected);
        // }).catch(ex => {
        //     console.error(ex);
        //     callback && callback(connected);
        // });
        callback && callback(connected);
    });
};

// websocket 状态处理
Apis.setRpcConnectionStatusCallback(function (status) {
    console.log('Witness status:', status);
    if (!connected && status == 'open') {
        connected = true;
    }

    if (status === 'reconnect') {
        console.log('Reconnecting');
        ChainStore.resetCache();
    } else if (connected && (status == 'closed' || status == 'error')) { // 出错重连
        console.log('Connection failed,try another connection');
        connected = false;
        connect();
    }
});

export default connect;
