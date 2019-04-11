import {get_item_native, set_item_native} from '@/services/CommonService';

function isIphoneX () {
    return /iphone/gi.test(navigator.userAgent) && (screen.height == 812 && screen.width == 375);
}

export default {
    load (platform) {
        return new Promise((resolve, reject) => {
            if ($('#js-cdv').length == 0) {
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
                    if (platform === 'ios' || platform === 'android') {
                        /* clear remember pwd in localStorage */
                        get_item_native('clear_remember_pwd').then(res => {
                            if (res) {
                                localStorage.setItem('gxb_contract_remember_pwd', '');
                                set_item_native('clear_remember_pwd', false);
                                resolve();
                            }
                        });
                    } else {
                        resolve();
                    }
                });
            } else {
                resolve();
            }
        });
    }
};
