$.fn.data = function (b, c) {
    var d = $(this).dataset();
    if (!b) { return d }
    if (typeof c == 'undefined') {
        var e = d[b];
        var f = this[0].__eleData;
        return f && b in f ? f[b] : e;
    }
    for (var g = 0; g < this.length; g++) {
        var h = this[g];
        if (b in d) {
            try {
                delete h.dataset[b];
            } catch (ex) {
                h.dataset[b] = null;
            }
        }
        // eslint-disable-next-line
        h.__eleData || (h.__eleData = {}),
            h.__eleData[b] = c;
    }
    return this;
};
// 日期格式化
Date.prototype.format = function (fmt) { // author: meizz
    var o = {
        'M+': this.getMonth() + 1, // 月份
        'd+': this.getDate(), // 日
        'h+': this.getHours(), // 小时
        'm+': this.getMinutes(), // 分
        's+': this.getSeconds(), // 秒
        'q+': Math.floor((this.getMonth() + 3) / 3), // 季度
        'S': this.getMilliseconds() // 毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
    for (var k in o) {
        if (new RegExp('(' + k + ')').test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)));
    }
    return fmt;
};

let start = null;
document.addEventListener('touchstart', function (e) {
    if (e.targetTouches[0].pageX < 20) {
        start = { x: e.targetTouches[0].pageX, y: e.targetTouches[0].pageY };
    } else {
        start = null;
    }
});
document.addEventListener('touchmove', function (e) {
    if (start) {
        let deltaX = e.targetTouches[0].pageX - start.x;
        if (deltaX > 30) {
            $('.page .bar-nav .icon-left').click();
        }
    }
});
document.addEventListener('touchend', function (e) {
    start = null;
});

window.goBack = function () {
    $('.page .bar-nav .icon-left').click();
};

if (!window.Intl) {
    require.ensure([
        'intl',
        'intl/locale-data/jsonp/en.js',
        'intl/locale-data/jsonp/zh.js'
    ], function (require) {
        require('intl');
        require('intl/locale-data/jsonp/en.js');
        require('intl/locale-data/jsonp/zh.js');
    });
}

export default {};
