<template>
    <div class="page-group">
        <div class="page" id="page-disclaimer">
            <header class="bar bar-nav">
                <router-link :to="link('/')" replace class="pull-left icon icon-left" v-if="canGoBack"></router-link>
                <h3 class="title">{{$t('disclaimer.title')}}</h3>
                <a @click="switchLanguage" class="pull-right icon">
                    <img width="25px" :src="imgFlag">
                </a>
            </header>
            <div class="content">
                <div class="content-block" v-html="$t('disclaimer.content')">
                </div>
            </div>
            <nav class="bar bar-tab">
                <a href="javascript:;" @click="accepted" class="tab-item external active">
                    <span class="tab-label">{{$t('disclaimer.accept')}}</span>
                </a>
            </nav>
        </div>
    </div>
</template>
<script>
    import {
        set_disclaimer_accepted,
        get_disclaimer_accepted
    } from '@/services/WalletService';
    import {
        set_item
    } from '@/services/CommonService';

    export default {

        methods: {
            accepted () {
                set_disclaimer_accepted(true);
                if (this.isPopup) {
                    $.closeModal('.popup-disclaimer');
                } else {
                    this.$router.replace({
                        path: this.link(this.$route.query.from || '/')
                    });
                }
            },
            switchLanguage () {
                if (this.$i18n.locale == 'zh-CN') {
                    this.$i18n.locale = 'en-US';
                } else {
                    this.$i18n.locale = 'zh-CN';
                }
                set_item('_locale', this.$i18n.locale);
            }
        },
        mounted () {
            $.init();
        },
        computed: {
            canGoBack () {
                return get_disclaimer_accepted();
            },
            pageClass () {
                if (this.isPopup) {
                    return 'popup popup-disclaimer';
                } else {
                    return 'page';
                }
            },
            imgFlag () {
                let locale = this._i18n.locale.split('-')[1];
                return `static/img/${locale.toUpperCase()}.png`;
            }
        }
    };
</script>
<style scoped lang="scss">
    .content-block {
        margin: 1.2rem 0 3.4rem 0;
        font-size: .75rem;
    }

    .tab-item.active {
        font-weight: bold;
    }
</style>
