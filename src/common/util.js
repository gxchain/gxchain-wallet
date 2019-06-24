let methods = {};
let methodID = 0;

window.nativeCallback = function (mId) {
    var args = Array.prototype.slice.call(arguments, 1);
    typeof methods[mId] === 'function' && methods[mId].apply(this, args);
};

export default {
    callBridge: function (schema, method, params, callback) {
        var mId = methodID++;
        methods[mId] = function () {
            typeof callback === 'function' && callback.apply(this, arguments);
            if (methods[mId]) {
                try {
                    delete methods[mId];
                } catch (err) {
                    methods[mId] = null;
                }
            }
        };
        params = $.extend(params || {}, {_mId: mId});
        var url = `${schema}://${method}?${$.param(params)}`;
        var iFrame;
        iFrame = document.createElement('iframe');
        iFrame.setAttribute('src', url);
        iFrame.setAttribute('style', 'display:none;');
        iFrame.setAttribute('height', '0px');
        iFrame.setAttribute('width', '0px');
        iFrame.setAttribute('frameborder', '0');
        document.body.appendChild(iFrame);
        // 发起请求后这个 iFrame 就没用了，所以把它从 dom 上移除掉
        iFrame.parentNode.removeChild(iFrame);
        iFrame = null;
    },
    callBridgeForContract: function (schema, method, params, callback) {
        var mId = methodID++;
        methods[mId] = function () {
            typeof callback === 'function' && callback.apply(this, arguments);
            if (methods[mId]) {
                try {
                    delete methods[mId];
                } catch (err) {
                    methods[mId] = null;
                }
            }
        };
        params = $.extend(params || {}, {_mId: mId});
        var url = `${schema}://${method}?'${$.param(params)}'`;
        var iFrame;
        iFrame = document.createElement('iframe');
        iFrame.setAttribute('src', url);
        iFrame.setAttribute('style', 'display:none;');
        iFrame.setAttribute('height', '0px');
        iFrame.setAttribute('width', '0px');
        iFrame.setAttribute('frameborder', '0');
        document.body.appendChild(iFrame);
        // 发起请求后这个 iFrame 就没用了，所以把它从 dom 上移除掉
        iFrame.parentNode.removeChild(iFrame);
        iFrame = null;
    },
    callNative: function (method, params, callback) {
        this.callBridge('native', method, params, callback);
    },
    callNativeForContract: function (method, params, callback) {
        this.callBridgeForContract('native', method, params, callback);
    },
    query2Obj: function (query) {
        var url = query || location.search;
        var result = url.match(new RegExp('[\?\&][^\?\&]+=[^\?\&]+', 'g')) || [];
        var obj = {};
        for (var i = 0; i < result.length; i++) {
            result[i] = result[i].substring(1);
            var splits = result[i].split('=');
            if (splits.length > 2) {
                splits[1] = result[i].substr(result[i].indexOf('=') + 1);
            }
            obj[splits[0]] = splits[1];
        }
        return obj;
    }
};

export function getMobileOperatingSystem () {
    var userAgent = navigator.userAgent || navigator.vendor || window.opera;

    // Windows Phone must come first because its UA also contains "Android"
    if (/windows phone/i.test(userAgent)) {
        return 'wp';
    }

    if (/android/i.test(userAgent)) {
        return 'android';
    }

    // iOS detection from: http://stackoverflow.com/a/9039885/177710
    if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
        return 'ios';
    }

    return 'unknown';
}
