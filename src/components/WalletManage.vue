<template>
    <div class="page-group">
        <div class="page" id="page-wallet-manage">
            <header class="bar bar-nav">
                <h3 class="title">{{$t('wallet_manage.title')}}</h3>
                <router-link :to="link('/')" replace class="icon icon-left"></router-link>
            </header>
            <div class="content pull-to-refresh-content">
                <div class="pull-to-refresh-layer">
                    <div class="preloader">
                        <div class="line-scale">
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                        </div>
                    </div>
                </div>
                <div class="list-block wallets">
                    <ul v-for="wallet in wallets" :key="wallet.account">
                        <li class="wallet-info">
                            <router-link :to="link('/wallet-backup',{from:$route.fullPath,account:wallet.account})" href="javascript:;" class="item-content item-link">
                                <div class="item-media">
                                    <account-image :account="wallet.account" :size="20"></account-image>
                                </div>
                                <div class="item-inner">
                                    <div class="item-title">
                                        {{wallet.account}}
                                    </div>
                                    <small class="item-after color-danger" v-if="!wallet.backup_date">{{$t('wallet_manage.tip_backup')}}
                                    </small>
                                </div>
                            </router-link>
                        </li>
                        <li class="item-content price-info">
                            <div class="item-inner">
                                <div class="item-title"></div>
                                <div class="item-after">
                                    <span class="color-primary price">{{wallet.balance}}</span>&nbsp;
                                    <small>GXS
                                    </small>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <nav class="bar bar-tab">
                <router-link class="tab-item" :to="link('/wallet-import',{from:$route.fullPath})">
                    <span class="gxicon gxicon-import"></span>
                    &nbsp;
                    <span class="tab-label">{{$t('wallet_manage.button_import')}}</span>
                </router-link>
                <router-link class="tab-item" :to="link('/wallet-create-step-1',{from:$route.fullPath})">
                    <span class="gxicon gxicon-wallet"></span>
                    &nbsp;
                    <span class="tab-label">{{$t('wallet_manage.button_create')}}</span>
                </router-link>
            </nav>
        </div>
    </div>
</template>
<script>
    import {
        get_wallets,
        fetch_account_balance
    } from '@/services/WalletService';
    import AccountImage from './sub/AccountImage.vue';

    export default {
        data () {
            let wallets = get_wallets();
            wallets = wallets.map((w) => {
                w.balance = this.$t('index.balance_loading');
                return w;
            });
            return {
                wallets: wallets
            };
        },
        methods: {
            loadWallets () {
                if (this.wallets.length == 0) {
                    this.$router.replace({
                        path: this.link('/wallet-create')
                    });
                } else {
                    this.wallets.forEach((wallet) => {
                        this.loadBalance(wallet);
                    });
                }
                setTimeout(() => {
                    $.pullToRefreshDone($(this.$el).find('.pull-to-refresh-content'));
                }, 500);
            },
            loadBalance (wallet) {
                if (wallet.account) {
                    fetch_account_balance(wallet.account).then(function (balance) {
                        wallet.balance = balance.amount / 100000;
                    }).catch(ex => {
                        console.error(ex);
                    });
                }
            }
        },
        mounted () {
            $.init();
            $.initPullToRefresh(this.$el);
            this.loadWallets();
            $(this.$el).on('refresh', '.pull-to-refresh-content', (e) => {
                this.loadWallets();
            });
        },
        components: {
            AccountImage
        }
    };
</script>
<style scoped lang="scss">
    .page,
    .content {}

    .pull-to-refresh-layer {
        .line-scale>div {
            background-color: #3d3d3b;
        }
    }

    .wallets {
        margin-top: 0;
        margin-bottom: 3.8rem;
        .wallet-info {
            .item-media {
                padding-bottom: .65rem;
            }
            .item-inner {
                padding-bottom: 1rem;
                padding-top: 1rem;
            }
        }
        ul {
            margin-bottom: .2rem;
            /*background: #f0f5f6;*/
        }
        .price-info {
            .item-after {
                align-items: baseline;
                .price {
                    font-size: 1rem;
                    font-weight: bold;
                }
            }
        }
    }
</style>
