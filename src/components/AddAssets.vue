<template>
    <div class="page-group">
        <div class="page" id="page-add-symbol">
            <header class="bar bar-nav">
                <h3 class="title">{{$t('add_assets.title')}}</h3>
                <router-link :to="link('/')" replace class="icon icon-left"></router-link>
            </header>
            <div class="content">
                <div class="list-block asset-list" v-if="loaded">
                    <ul>
                        <li v-for="asset in assetList" class="item-content item-asset"
                            :key="asset.symbol">
                            <div class="item-inner">
                                <div class="symbol">
                                    <img :src="asset.icon" style="width: 1.5rem" v-if="asset.icon">
                                    <account-image :account="asset.symbol" :size="15" v-else></account-image>
                                    <div class="symbol-title">
                                        <div>{{asset.symbol}}</div>
                                        <div v-if="asset.describe" class="symbol-desc">{{asset.describe}}</div>
                                    </div>
                                </div>
                                <div class="item-after">
                                    <div class="item-input" @click="assetClick($event,asset)">
                                        <label class="label-switch">
                                            <input type="checkbox" v-model="asset.status">
                                            <div class="checkbox"></div>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import AccountImage from './sub/AccountImage.vue';
    import {mapGetters} from 'vuex';
    import {get_market_asset_list} from '@/services/MarketService';
    import some from 'lodash/some';
    import unionBy from 'lodash/unionBy';
    export default {
        data () {
            return {
                assetList: [],
                localAssetsArray: [],
                account: '',
                loaded: false,
                describeMap: {}
            };
        },
        mounted () {
            $.init();
            this.account = this.$route.query.account;
            this.loadLocalAssetArray();
            this.loadAssetList();
        },
        computed: {
            ...mapGetters({
                isNative: 'isNative'
            })
        },
        methods: {
            loadLocalAssetArray () {
                let localAssetsArray = localStorage.getItem('assets_array');
                if (!localAssetsArray) {
                    localAssetsArray = [];
                } else {
                    localAssetsArray = JSON.parse(localAssetsArray);
                    // this.localAssetsArray = localAssetsArray.filter((item) => {
                    //     return item.account == this.account;
                    // });
                }
                this.localAssetsArray = localAssetsArray;
            },
            loadAssetList () {
                $.showIndicator();
                get_market_asset_list().then(resp => {
                    let assetList = resp || [];
                    assetList = assetList.filter((item) => {
                        return item.symbol != 'GXS' && item.symbol != 'GXC';
                    });
                    let describeMap = {};
                    assetList.forEach(asset => {
                        describeMap[asset.symbol] = asset.describe;
                    });
                    this.describeMap = describeMap;
                    let localArray = this.localAssetsArray.filter((item) => {
                        return item.account == this.account;
                    });
                    let unionByList = unionBy(localArray[0].list, assetList, 'symbol');
                    this.assetList = unionByList.map((item) => {
                        item.describe = this.describeMap[item.symbol];
                        return item;
                    });
                    $.hideIndicator();
                    this.loaded = true;
                }).catch(ex => {
                    $.hideIndicator();
                    console.error(ex);
                });
            },
            assetClick (e, asset) {
                if (asset.status) {
                    if (asset.amount && asset.amount > 0) {
                        $.alert(this.$t('add_assets.tip'));
                        e.preventDefault();
                        return;
                    }
                }
                let localArray = this.localAssetsArray.filter((item) => {
                    return item.account == this.account;
                });
                let list = localArray[0].list;
                let alreadyExist = some(list, (item) => {
                    return item.symbol == asset.symbol;
                });
                if (alreadyExist) {
                    list = list.map((item) => {
                        if (item.symbol == asset.symbol) {
                            item.status = !item.status;
                            item.icon = asset.icon;
                        }
                        return item;
                    });
                } else {
                    list.push({
                        'symbol': asset.symbol,
                        'status': true,
                        'icon': asset.icon,
                        'amount': 0,
                        'value': 0,
                        'precision': 5

                    });
                }
                let assetsArray = this.localAssetsArray.map((item) => {
                    if (item.account == this.account) {
                        item.list = list;
                    }
                    return item;
                });
                localStorage.setItem('assets_array', JSON.stringify(assetsArray));
                let tempAssetList = unionBy(list, this.assetList, 'symbol');
                let tempStatus;
                tempAssetList.forEach((i) => {
                    if (i.symbol == asset.symbol) {
                        tempStatus = i.status;
                    }
                });
                this.assetList = this.assetList.map((item) => {
                    if (item.symbol == asset.symbol) {
                        item.status = tempStatus;
                    }
                    return item;
                });
                e.preventDefault();
                return false;
            }
        },
        components: {
            AccountImage
        }
    };
</script>
<style scoped lang="scss">
    .list-block {
        margin-top: 0;
        .item-inner {
            min-height: 3rem;
        }
        .symbol {
            display: flex;
            flex-direction: row;
            align-items: center;
            color: #3d3d3b;
        }
        .label-switch input[type=checkbox]:checked+.checkbox {
            background: #6699ff;
        }
        .label-switch {
            .checkbox {
                width: 2.4rem;
                height: 1.3rem;
            }
            .checkbox:after {
                height: 1.1rem;
                width: 1.1rem;
                border-radius: 1.1rem;
            }
        }
        .symbol-title {
            margin-left: .7rem;
        }
        .symbol-desc {
            font-size: .6rem;
            color: #666;
        }
    }
</style>
