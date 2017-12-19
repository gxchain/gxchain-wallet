function isIphoneX () {
    return /iphone/gi.test(navigator.userAgent) && (screen.height == 812 && screen.width == 375);
}

export default {
    load (platform) {
        return new Promise((resolve, reject) => {
            if ($('#js-cdv').length == 0) {
                let start = new Date();
                $('html').removeClass('with-statusbar-overlay');
                if (platform == 'ios') {
                    $('html').addClass('native-ios');
                } else {
                    $('html').removeClass('native-ios');
                }
                if (isIphoneX()) {
                    $('html').addClass('native-ios-x');
                } else {
                    $('html').removeClass('native-ios-x');
                }
                document.write(`<script id="js-cdv" type="text/javascript" src="static/cordova/cordova.${platform}.js"></script>`);
                document.addEventListener('deviceready', function () {
                    let timeout = (new Date() - start) > 1000 ? 0 : 500;
                    setTimeout(() => {
                        resolve();
                    }, timeout);
                });
            } else {
                resolve();
            }
        });
    }
};
