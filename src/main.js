// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import '@/common/global';
import Vue from 'vue';
import App from './App';
import router from './router';
import VueResource from 'vue-resource';
import store from '@/vuex/store';
import locales from '@/locales';
import GlobalPalrams from './plugins/GlobalParams';
import Authorization from './plugins/Authorization';

Vue.use(VueResource);
Vue.use(GlobalPalrams);
Vue.use(Authorization);

Vue.http.interceptors.push(
    function (request, next) {
        next(function (response) {
            if (!response.headers['content-type'] || (response.headers['content-type'].indexOf('application/json') > -1 && typeof response.data == 'string')) {
                response.data = JSON.parse(response.bodyText);
            }
        });
    }
);

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
    el: '#app',
    i18n: locales,
    store,
    router,
    template: '<App/>',
    components: { App }
});
