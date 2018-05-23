export default {
    install (Vue, opt) {
        Vue.http.postX = (url, body, options) => {
            if (!options) {
                options = {};
            }
            if (!options.headers) {
                options.headers = {};
                options.headers['Accept-Language'] = localStorage.getItem('_locale');
            }
            return Vue.http.post(url, body, options);
        };
        Vue.http.getX = (url, options) => {
            if (!options) {
                options = {};
            }
            if (!options.headers) {
                options.headers = {};
                options.headers['Accept-Language'] = localStorage.getItem('_locale');
            }
            return Vue.http.get(url, options);
        };
    }
};
