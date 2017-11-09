import store from '../vuex/store'

export default {
  load(platform) {
    return new Promise((resolve, reject) => {
      if ($('#js-cdv').length == 0) {
        let start = new Date();
        $('html').removeClass('with-statusbar-overlay');
        if (platform == 'ios') {
          $('html').addClass('native-ios');
        }
        else {
          $('html').removeClass('native-ios');
        }
        document.write(`<script id="js-cdv" type="text/javascript" src="/static/cordova/cordova.${platform}.js"></script>`);
        document.addEventListener('deviceready', function () {
          let timeout = (new Date() - start) > 1000 ? 0 : 500;
          setTimeout(() => {
            store.commit('setLoading', {loading: false});
            resolve()
          }, timeout)
        })
      }
      else {
        resolve();
      }
    })
  }
}
