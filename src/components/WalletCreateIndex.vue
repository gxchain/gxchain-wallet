<template>
    <div class="page-group">
        <div class="page" id="page-wallet-empty">
            <header class="bar bar-nav">
                <h3 class="title">{{$t('wallet_create.index.title')}}</h3>
                <a @click="switchLanguage" class="pull-right icon">
                    <img width="25px" :src="imgFlag">
                </a>
            </header>
            <div class="content">
                <div class="center-content">
                    <div class="content-block">
                        <p>
                            <i class="gxicon gxicon-bind"></i>
                        </p>
                        <p class="text-bind">{{$t('wallet_create.index.tip_empty')}}</p>
                    </div>
                    <div class="content-block block-button">
                        <p>
                            <router-link :to="link('/wallet-create-step-1',{from:$route.fullPath})" class="button button-gxb">
                                {{$t('wallet_create.index.button_create')}}
                            </router-link>
                        </p>
                        <p>
                            <router-link :to="link('/wallet-import',{from:$route.fullPath})" class="button button-gxb-secondary">
                                {{$t('wallet_create.index.button_import')}}
                            </router-link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import {
        mapGetters
    } from 'vuex';
    import {
        get_wallets
    } from '@/services/WalletService';
    import {
        set_item
    } from '@/services/CommonService';

    export default {
        methods: {
            loadWallets () {
                if (get_wallets().length > 0) {
                    this.$router.replace({
                        path: this.link('/')
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
            this.loadWallets();
            if (this.isNative) {
                window.webview = {
                    reload: () => {
                        this.loadWallets();
                    }
                };
            }
        },
        computed: {
            ...mapGetters({
                isNative: 'isNative'
            }),
            imgFlag () {
                let locale = this._i18n.locale.split('-')[1];
                return `static/img/${locale.toUpperCase()}.png`;
            }
        }
    };
</script>
<style scoped lang="scss">
    .content {
        background: #fff;
    }

    .center-content {
        margin-top: 3rem;
        flex-direction: column;
        align-items: flex-end;
        display: flex;
        justify-content: center;
        text-align: center;
        .gxicon-bind {
            font-size: 6.5rem;
            color: #d5d5d5;
        }
        .text-bind {
            font-size: .75rem;
        }
        .content-block {
            width: 100%;
        }
        .text-success {
            margin-top: 1.5rem;
        }
        .block-button {
            padding: 0 2rem;
            margin-top: 1rem;
            letter-spacing: .15rem;
        }
    }
</style>
