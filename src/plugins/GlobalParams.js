import { mapGetters } from 'vuex';

export default {
    install (Vue, options) {
        Vue.mixin({
            computed: {
                ...mapGetters({
                    isNative: 'isNative'
                })
            },
            methods: {
                link (path, query) {
                    query = $.extend({ platform: this.$route.query.platform }, query);
                    return `${path || '/'}?${$.param(query)}`;
                }
            }
        });
    }
};
