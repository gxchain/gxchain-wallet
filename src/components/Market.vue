<template>
    <div class="page-group">
        <div class="page" id="page-market">
            <header class="bar bar-nav">
                <h3 class="title">{{$t('market.title')}}</h3>
            </header>
            <wallet-tab></wallet-tab>
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
                <div class="table-exchanges">
                    <div class="list-block media-list">
                        <ul>
                            <li v-for="(exchange, exchangekey) in exchanges" :key="exchangekey">
                                <!-- <router-link :to="`/realtime-quotations/${exchange.name}/${exchange.symbol}`" href="javascript:;"> -->
                                <router-link :to="link(`/realtime-quotations/${exchange.name}/${exchange.symbol}`)"
                                             href="javascript:;">
                                    <div class="item-content item-exchange">
                                        <div class="item-inner">
                                            <div class="title-ex-name">
                                                <div class="asset-name">{{exchange.symbol}}</div>
                                                <div class="ex-name">{{exchange.name}}</div>
                                            </div>
                                            <div class="price">
                                                <div class="price_primary">
                                                    {{exchange.price}}
                                                </div>
                                                <div class="price_secondary">
                                                    {{_i18n.locale == 'zh-CN' ? `￥${exchange.price_rmb}` :
                                                    `$${exchange.price_dollar}`}}
                                                </div>
                                            </div>
                                            <div class="quote" :class="{green:exchange.quote>0}">
                                                {{(exchange.quote > 0 ? '+' : '') + (exchange.quote).toFixed(2) + '%'}}
                                            </div>
                                        </div>
                                    </div>
                                </router-link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import {get_market_info} from '@/services/MarketService';
    import WalletTab from './sub/WalletTab';

    export default {
        components: {
            WalletTab
        },
        data () {
            return {
                exchanges: [],
                stopFetchingMarket: false
            };
        },
        destroyed () {
            $(this.$el).off('refresh');
        },
        mounted () {
            $.init();
            this.stopFetchingMarket = false;
            this.loadMarketInfo();
            $(this.$el).on('refresh', '.pull-to-refresh-content', (e) => {
                this.loadMarketInfo();
            });
        },
        methods: {
            loadMarketInfo () {
                get_market_info(localStorage.getItem('version')).then((resp) => {
                    this.exchanges = resp;
                    setTimeout(() => {
                        if (!this.stopFetchingMarket) {
                            this.loadMarketInfo();
                        }
                    }, 3000);
                    setTimeout(() => {
                        $.pullToRefreshDone($(this.$el).find('.pull-to-refresh-content'));
                    }, 500);
                }).catch(ex => {
                    console.error(ex);
                    setTimeout(() => {
                        if (!this.stopFetchingMarket) {
                            this.loadMarketInfo();
                        }
                    }, 3000);
                    setTimeout(() => {
                        $.pullToRefreshDone($(this.$el).find('.pull-to-refresh-content'));
                    }, 500);
                });
            }
        }
    };
</script>
<style lang="scss" scoped="">
    .table-exchanges {
        .item-exchange .item-inner {
            display: flex;
            flex-direction: row;
            padding-top: .75rem;
            padding-bottom: .65rem;
            .title-ex-name {
                text-align: left;
                .asset-name {
                    color: #3d3d3b;
                }
                .ex-name {
                    font-size: .7rem;
                    color: #888;
                }
            }

            .price {
                text-align: right;
                .price_secondary {
                    font-size: .7rem;
                    color: #888;
                }
            }

            .quote {
                height: 1.2rem;
                line-height: 1.2rem;
                width: 3.5rem;
                text-align: right;
                padding: 0 .2rem;
                font-weight: bold;
                font-size: .65rem;
                color: #fff;
                background: #d63932;
                &.green {
                    background: #076f8a;
                }
            }
        }
    }
</style>
