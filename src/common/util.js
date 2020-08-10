import { compare_version } from '../services/CommonService';
var numeral = require('numeral');

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
        params = $.extend(params || {}, { _mId: mId });
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
        console.log(url);
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
        params = $.extend(params || {}, { _mId: mId });
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
        var result = url.match(new RegExp('[?&][^?&]+=[^?&]+', 'g')) || [];
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
    },
    format_number: function (number, decimals, trailing_zeros = true) {
        if (isNaN(number) || !isFinite(number) || number === undefined || number === null) {
            return '';
        }
        let zeros = '.';
        for (var i = 0; i < decimals; i++) {
            zeros += '0';
        }
        let num = numeral(number).format('0,0' + zeros);
        if (num.indexOf('.') > 0 && !trailing_zeros) {
            return num.replace(/0+$/, '').replace(/\.$/, '');
        }
        return num;
    },
    accDiv (arg1, arg2) {
        let t1 = 0;
        let t2 = 0;
        let r1;
        let r2;
        try {
            t1 = arg1.toString().split('.')[1].length;
        } catch (e) {}
        try {
            t2 = arg2.toString().split('.')[1].length;
        } catch (e) {}
        r1 = Number(arg1.toString().replace('.', ''));
        r2 = Number(arg2.toString().replace('.', ''));
        return (r1 / r2) * Math.pow(10, t2 - t1);
    },
    accMult (arg1, arg2) {
        let m = 0;
        let s1 = arg1.toString();
        let s2 = arg2.toString();
        try {
            m += s1.split('.')[1].length;
        } catch (e) {}
        try {
            m += s2.split('.')[1].length;
        } catch (e) {}
        return (
            (Number(s1.replace('.', '')) * Number(s2.replace('.', ''))) /
      Math.pow(10, m)
        );
    },
    accSub (arg1, arg2) {
        let r1, r2, m, n;
        try {
            r1 = arg1.toString().split('.')[1].length;
        } catch (e) {
            r1 = 0;
        }
        try {
            r2 = arg2.toString().split('.')[1].length;
        } catch (e) {
            r2 = 0;
        }
        m = Math.pow(10, Math.max(r1, r2));
        n = r1 >= r2 ? r1 : r2;
        return ((arg1 * m - arg2 * m) / m).toFixed(n);
    },
    accAdd (arg1, arg2) {
        let r1, r2, m;
        try {
            r1 = arg1.toString().split('.')[1].length;
        } catch (e) {
            r1 = 0;
        }
        try {
            r2 = arg2.toString().split('.')[1].length;
        } catch (e) {
            r2 = 0;
        }
        m = Math.pow(10, Math.max(r1, r2));
        return (arg1 * m + arg2 * m) / m;
    },
    callNativeForWebView (successFunction, failFunction, service, action, args, params) {
        var blockcityVersion = localStorage.getItem('blockcityVersion');
        let query = this.query2Obj(location.hash);

        if (query.platform == 'ios' && blockcityVersion && !compare_version(blockcityVersion, '2.2.4')) {
            if (service == 'Share') {
                action = 'share';
            }
            this.callNative(action, params, successFunction);
        } else {
        cordova.exec(successFunction, failFunction, service, action, args); // eslint-disable-line
        }
    },
    get_percentage (a, b) {
        return Math.round((a / b) * 100);
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
