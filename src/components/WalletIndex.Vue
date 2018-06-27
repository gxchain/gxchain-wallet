<template>
    <div class="page-group">
        <div class="page" id="page-wallet-index">
            <div ref="bar" class="bar bar-nav buttons-fixed" style="background: rgba(37, 40, 113, 0)">
                <a href="javascript:;" class="icon gxicon gxicon-user pull-left" @click="openPanel"></a>
                <a v-if="isNative" href="javascript:;" class="icon gxicon gxicon-scan pull-right" @click="openQRScaner">
                    <input ref="qrfile" @change="onFileUpload" v-if="!isNative" type="file" class="file-selector"/>
                </a>
            </div>
            <div ref="bg" id="bg"></div>
            <wallet-tab></wallet-tab>
            <div class="content pull-to-refresh-content" ref="content">
                <div class="row-top" ref="top" :class="{ios:$route.query.platform=='ios'}">
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
                    <div class="loading" v-if="wallets.length==0">
                        <div class="line-scale">
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                        </div>
                    </div>
                    <!--wallets-->
                    <swiper :options="swiperOption" :not-next-tick="true" ref="mySwiper" v-show="wallets.length>0">
                        <swiper-slide v-for="wallet in wallets" :key="wallet.name">
                            <div class="wallet-info">
                                <div class="text-center">
                                    <account-image :account="wallet.account" :size="30"></account-image>
                                    <div>
                                        <a @click="openQRCodeModal" href="javascript:;" class="link-qrcode">{{wallet.account}}&nbsp;
                                            <small class="icon icon-code"></small>
                                        </a>
                                    </div>
                                    <p class="bak-tip">
                                        <router-link :to="linkBackup(wallet.account)" class="btn-backup"
                                                     :class="{visible:!wallet.backup_date}" href="javascript:;">
                                            <small>{{$t('index.backup_wallet')}}&nbsp;
                                                <span class="red-dot"></span>
                                                <span class="icon icon-right"></span>
                                            </small>
                                        </router-link>
                                    </p>
                                </div>
                                <div class="row-balance">
                                    <div>
                                        <div>
                                            <small>{{$t('index.value')}}</small>
                                        </div>
                                        <div>
                                            <small>≈</small>
                                            <span class="digit balance">{{currentWallet.totalValue | number(2)}}</span>
                                        </div>
                                    </div>
                                    <div class="asset-button" @click="goAddAssets">
                                        <!-- <router-link :to="link('/add-assets')" href="javascript:;">
                                            <img src="../assets/images/asset_btn.png">
                                        </router-link> -->
                                        <img src="../assets/images/asset_btn.png">
                                    </div>
                                </div>
                            </div>
                        </swiper-slide>
                        <div class="swiper-pagination" slot="pagination" v-show="wallets&&wallets.length>1"></div>
                    </swiper>
                    <router-link :to="link('/loyalty-program')" class="link-loyalty-program" v-if="showLoyaltyProgram">
                        <img :src="`static/${$t('index.loyalty_program_icon')}`">
                    </router-link>
                </div>
                <!--function entries-->
                <div class="row-operation">
                    <router-link :to="link('/transfer')" class="item" href="javascript:;">
                        <span class="gxicon x2 gxicon-transfer"></span>
                        <span class="item-text">{{$t('index.transfer')}}</span>
                    </router-link>
                    <div class="sep"></div>
                    <a @click="openQRCodeModal" class="item" href="javascript:;">
                        <span class="gxicon x2 gxicon-collect"></span>
                        <span class="item-text">{{$t('index.receive')}}</span>
                    </a>
                </div>
                <!--assets-->
                <div class="table-assets" v-if="currentWallet">
                    <div class="list-block media-list">
                        <ul>
                            <li v-for="balance in currentWallet.balances" class="item-content item-asset"
                                :key="balance.symbol">
                                <div class="item-inner">
                                    <div class="symbol">
                                        <img :src="balance.icon" style="width: 1.5rem" v-if="balance.icon">
                                        <account-image :account="balance.symbol" :size="15" v-else></account-image>
                                        <div>&nbsp;&nbsp;{{balance.symbol}}</div>
                                    </div>
                                    <div class="price">
                                        <div class="digital">
                                            {{balance.amount | number(balance.precision)}}
                                        </div>
                                        <small v-if="balance.value != 0">
                                            ≈&nbsp;{{$t('index.unit')}}{{balance.value | number(2)}}
                                        </small>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <left-panel ref="panel"></left-panel>
        <account-q-r-code ref="qrcode" :account="this.currentWallet.account"></account-q-r-code>
    </div>
</template>
<script>
    import {swiper, swiperSlide} from 'vue-awesome-swiper';
    import AccountImage from './sub/AccountImage.vue';
    import LeftPanel from './sub/LeftPanel.vue';
    import AccountQRCode from './sub/AccountQRCode.vue';
    import util from '@/common/util';
    import WalletTab from './sub/WalletTab';

    import {
        fetch_account_balances, fetch_reference_accounts, get_assets_by_ids, get_wallet_index, get_wallets,
        set_wallet_index, set_wallets
    } from '@/services/WalletService';
    import {get_market_asset_price, get_market_asset_list} from '@/services/MarketService';
    import filters from '@/filters';
    import some from 'lodash/some';
    import unionBy from 'lodash/unionBy';
    export default {
        filters,
        data () {
            let self = this;
            let wallets = get_wallets();
            wallets = wallets.map((w) => {
                w.balances = [];
                return w;
            });
            let wallet_index = get_wallet_index();
            return {
                accountCopied: false,
                wallets: wallets,
                currentWalletIndex: wallet_index,
                swiperOption: {
                    pagination: '.swiper-pagination',
                    autoplay: false,
                    keyboardControl: true,
                    paginationClickable: true,
                    initialSlide: wallet_index,
                    onSlideChangeEnd: function (s) {
                        let wallets = get_wallets();
                        let wallet = wallets[s.activeIndex];
                        self.isAssetHidden = wallet.isAssetHidden;
                        set_wallet_index(s.activeIndex);
                        self.currentWalletIndex = s.activeIndex;
                    }
                },
                isAssetHidden: '',
                assetIconMap: {}
            };
        },
        watch: {
            currentWalletIndex () {
                this.loadBalances(this.currentWallet);
            }
        },

        methods: {
            loadWallets () {
                if (this.wallets.length == 0) {
                    this.$router.replace({
                        path: this.link('/wallet-create')
                    });
                } else {
                    get_market_asset_list().then(resp => {
                        let assetList = resp || [];
                        let assetIconMap = {};
                        assetList.forEach(asset => {
                            assetIconMap[asset.symbol] = asset.icon;
                        });
                        this.assetIconMap = assetIconMap;
                        this.wallets.forEach((wallet) => {
                            this.loadBalances(wallet);
                        });
                    }).catch(ex => {
                        console.error(ex);
                        this.wallets.forEach((wallet) => {
                            this.loadBalances(wallet);
                        });
                    });
                }
                setTimeout(() => {
                    $.pullToRefreshDone($(this.$el).find('.pull-to-refresh-content'));
                }, 500);
            },
            loadBalances (wallet) {
                if (wallet.account) {
                    let wallet_balances;
                    let assetMap = {};
                    let priceMap = {};
                    wallet.totalValue = '-';
                    fetch_account_balances(wallet.account).then(function (balances) {
                        if (!balances) {
                            return;
                        }
                        wallet_balances = balances;
                        let asset_ids = wallet_balances.map(b => {
                            return b.asset_id;
                        });
                        return get_assets_by_ids(asset_ids);
                    }).then(assets => {
                        let priceSymbol = '';
                        assets.forEach(asset => {
                            assetMap[asset.id] = asset;
                            priceSymbol += asset.symbol + ',';
                        });
                        priceSymbol = priceSymbol.substring(0, priceSymbol.length - 1);
                        wallet.balances = wallet_balances.map(b => {
                            return {
                                asset_id: b.asset_id,
                                amount: b.amount / Math.pow(10, assetMap[b.asset_id].precision),
                                precision: assetMap[b.asset_id].precision,
                                symbol: assetMap[b.asset_id].symbol,
                                value: 0
                            };
                        });
                        return get_market_asset_price(priceSymbol);
                    }).then(prices => {
                        wallet.totalValue = 0;
                        prices.forEach(price => {
                            priceMap[price.symbol] = price;
                        });
                        wallet.balances = wallet_balances.map(b => {
                            let assetValue = priceMap[assetMap[b.asset_id].symbol] ? b.amount / Math.pow(10, assetMap[b.asset_id].precision) * priceMap[assetMap[b.asset_id].symbol].price : 0;
                            wallet.totalValue += assetValue;
                            return {
                                asset_id: b.asset_id,
                                amount: b.amount / Math.pow(10, assetMap[b.asset_id].precision),
                                precision: assetMap[b.asset_id].precision,
                                symbol: assetMap[b.asset_id].symbol,
                                value: assetValue
                            };
                        });
                        return wallet.balances;
                    }).then((balances) => {
                        let wallet_balances = balances.map(b => {
                            return {
                                asset_id: b.asset_id,
                                amount: b.amount,
                                precision: b.precision,
                                value: b.value,
                                symbol: b.symbol,
                                icon: this.assetIconMap[b.symbol],
                                status: true
                            };
                        });
                        // 将当前钱包账号已有资产存入localStorage
                        let assetsArray = localStorage.getItem('assets_array');
                        if (!assetsArray) {
                            assetsArray = [];
                        } else {
                            assetsArray = JSON.parse(assetsArray);
                        }
                        let asset = {
                            account: wallet.account,
                            list: wallet_balances.filter((item) => {
                                return item.symbol != 'GXS' && item.symbol != 'GXC';
                            })
                        };
                        let alreadyExist = some(assetsArray, (item) => {
                            return item.account == wallet.account;
                        });

                        if (alreadyExist) {
                            assetsArray = assetsArray.map((item) => {
                                if (item.account == wallet.account) {
                                    item.list.forEach((i) => {
                                        wallet_balances = wallet_balances.map(b => {
                                            if (i.symbol == b.symbol) {
                                                b.status = i.status;
                                            }
                                            return b;
                                        });
                                    });
                                    let list = unionBy(wallet_balances, item.list, 'symbol');
                                    wallet.balances = list.filter((item) => {
                                        return item.status == true;
                                    });
                                    item.list = list.filter((item) => {
                                        return item.symbol != 'GXS' && item.symbol != 'GXC';
                                    });
                                }
                                return item;
                            });
                        } else {
                            wallet.balances = wallet_balances;
                            assetsArray.push(asset);
                        }
                        localStorage.setItem('assets_array', JSON.stringify(assetsArray));
                    }).catch(ex => {
                        console.error(ex);
                    });
                }
            },
            getMarketCap (wallet) {
                let balance = Number(wallet.balance);
                let price = this.price;
                if (!isNaN(balance) && price != '-') {
                    return wallet.balance * this.price;
                }
                return '-';
            },
            openPanel () {
                this.$refs.panel.open();
            },
            openQRScaner () {
                let self = this;
                if (this.isNative) {
                    cordova.exec(function (result) {// eslint-disable-line
                        let query = {
                            to: result
                        };
                        if (result.indexOf('qr://transfer') == 0) {
                            query = util.query2Obj(result.replace('qr://transfer', ''));
                        }
                        self.$router.push({
                            path: self.link('/transfer', query)
                        });
                    }, null, 'QRCode', 'scan', []);
                }
            },
            linkBackup (account) {
                let query = {
                    account: this.currentWallet.account,
                    from: this.$route.fullPath
                };
                return this.link('/wallet-backup-detail', query);
            },
            // TODO upload a qrcode image
            onFileUpload (e) {
                // let file = this.$refs.qrfile;
            },
            openQRCodeModal () {
                this.$refs.qrcode.show();
            },
            assetHideClick () {
                this.isAssetHidden = !this.isAssetHidden;
                this.wallets = this.wallets.map((w) => {
                    w.isAssetHidden = this.isAssetHidden;
                    return w;
                });
                set_wallets(this.wallets);
            },
            goAddAssets () {
                let query = {
                    account: this.currentWallet.account,
                    from: this.$route.fullPath
                };
                this.$router.push({
                    path: this.link('/add-assets', query)
                });
            }
        },
        destroyed () {
            $.allowPanelOpen = true;
            $(this.$el).off('refresh');
            this.stopFetchingMarket = true;
        },
        mounted () {
            $.init();
            this.loadWallets();
            fetch_reference_accounts(this.wallets.filter(wallet => {
                return !wallet.partial;
            }).map(wallet => {
                return wallet.account;
            })).then((wallets) => {
                if (wallets.length > this.wallets.length) {
                    location.reload();
                }
            }).catch(ex => {
                console.error(ex);
            });
            this.isAssetHidden = this.currentWallet.isAssetHidden;
            if (this.isNative) {
                window.webview = {
                    reload: () => {
                        this.loadWallets();
                    }
                };
                cordova.exec(null, null, 'statusBar', 'styleLightContent', []);// eslint-disable-line
            }
            $(this.$el).on('refresh', '.pull-to-refresh-content', (e) => {
                this.loadWallets();
            });
            $(this.$refs.content).on('scroll', () => {
                let offset = $(this.$el).find('.row-top').offset().top;
                if (offset < -20) {
                    let percent = Math.min((-40 - offset) / 40, 1);
                    $(this.$refs.bar).css({
                        background: `rgba(37, 40, 113, ${percent})`
                    });
                } else {
                    $(this.$refs.bar).css({
                        background: 'rgba(37, 40, 113, 0)'
                    });
                }
            }).on('touchmove', (e) => {
                $(this.$refs.bg).css({
                    height: Math.max($(this.$refs.top).height() + $(this.$refs.top).offset().top, $(
                        this.$refs.top).height()),
                    transition: 'none',
                    webkitTransition: 'none'
                });
                return true;
            }).on('touchend', () => {
                const end = () => {
                    $(this.$refs.bg).attr('style', '');
                    clearTimeout(timer);
                };
                let timer = setTimeout(end, 1000);
            });
            this.swiper.update();
        },
        computed: {
            showLoyaltyProgram () {
                return localStorage.getItem('version') != '1.2.0';
            },
            qrcode () {
                return `qr://transfer?account=${this.currentWallet.account}`;
            },
            currentWallet () {
                if (this.wallets.length > 0) {
                    return this.wallets[this.currentWalletIndex];
                }
                return {};
            },
            price () {
                if (!this.exchanges || this.exchanges.length == 0) {
                    return '-';
                } else {
                    let best_price = 0;
                    this.exchanges.forEach((exchange) => {
                        if (this.$i18n.locale == 'zh-CN') {
                            best_price = Math.max(Number(exchange.price_rmb), best_price);
                        } else {
                            best_price = Math.max(Number(exchange.price_dollar), best_price);
                        }
                    });
                    return best_price;
                }
            },
            swiper () {
                return this.$refs.mySwiper.swiper;
            }
        },
        components: {
            swiper,
            swiperSlide,
            AccountImage,
            LeftPanel,
            AccountQRCode,
            WalletTab
        }
    };
</script>
<style lang="scss" scoped="">
    @import "../assets/styles/components/refresh_layer";
    /*::-webkit-scrollbar {*/
    /*display: none;*/
    /*}*/

    #bg {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        background: linear-gradient(to bottom, #150838 0%, #3853bc 49%, #18bce2 100%);
        height: 16.75rem;
        transition: height .2s;
    }

    #page-wallet-index {
        .content {
            top: 0;
            -webkit-overflow-scrolling: auto;
        }
    }

    .bar-nav.buttons-fixed .icon {
        font-size: 1.2rem;
        color: #fff;
    }

    .row-top {
        background: transparent; //linear-gradient(to bottom, #150838 0%, #3853bc 49%, #18bce2 100%);
        color: #fff;
        min-height: 14.8rem;
        display: flex;
        position: relative;
        align-items: center;
        justify-content: center;
        .loading {
            position: absolute;
        }
        &.ios {
            padding-top: 5px;
        }
        .icon {
            font-size: 1.2rem;
            color: #fff;
        }
        .swiper-container {
            width: 100%;
            display: block;
        }
    }

    .wallet-info {
        margin-top: 3.5rem;
        .account-header {
            display: inline-block;
        }
        .link-qrcode {
            color: #fff;
            .icon {
                position: relative;
                top: -1px;
                font-size: .8rem;
            }
        }
        .bak-tip {
            margin: .4rem 0;
        }
        .btn-backup {
            visibility: hidden;
            color: #fff;
            .red-dot {
                position: relative;
                display: inline-block;
                top: -8px;
                border-radius: 2px;
                width: 4px;
                height: 4px;
                background: #ff6e35;
            }
            .icon-right {
                position: relative;
                top: -2px;
                font-size: .6rem;
                margin-left: .2rem;
            }
        }

        .row-balance {
            display: flex;
            justify-content: space-between;
            .asset-button {
                padding: .4rem 0;
                img {
                    width: 1.4rem;
                }
                display: flex;
                flex-direction: column;
                justify-content: flex-end;
            }
            small {
                font-size: .6rem;
            }
            padding: 0 .75rem;
            .digit {
                font-family: bebas;
                font-size: 1.1rem;
            }
        }
    }

    .row-operation {
        height: 3.6rem;
        display: flex;
        padding: 0.75rem;
        background: #fff;
        position: relative;
        z-index: 1;
        .item {
            display: flex;
            flex: 2;
            font-weight: bold;
            flex-direction: row;
            justify-content: center;
            align-items: center;
            .gxicon {
                width: 35px;
                margin-right: 1.25rem;
            }
        }

        .sep {
            display: flex;
            height: 100%;
            width: 1px;
            background: #eee;
        }
    }

    .pull-to-refresh-layer {
        position: absolute;
        top: 1rem;
        .line-scale > div {
            background-color: #fff !important;
        }
    }

    .link-loyalty-program {
        z-index: 2;
        position: absolute;
        top: 5.5rem;
        right: 0;
        width: 4.1rem;
        height: 1.6rem;
        img {
            width: 100%;
            height: 100%;
        }
    }

    .table-assets {
        position: relative;
        height: 25rem;
        background: #fff;
        .list-block {
            border-top: .2rem solid #e7e7e7;
            background: #e7e7e7;
            margin-top: 0;
            margin-bottom: 0;
            .item-asset {
                .item-inner {
                    display: flex;
                    flex-direction: row;
                    padding-top: .75rem;
                    padding-bottom: .65rem;
                    .symbol {
                        display: flex;
                        flex-direction: row;
                        align-items: center;
                        color: #3d3d3b;
                    }
                    .price {
                        text-align: right;
                        color: #3d3d3b;
                        small {
                            color: #888
                        }
                    }
                }
            }
        }
    }
</style>
