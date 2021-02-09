<template>
    <div class="page-group">
        <div class="page" id="page-wallet-index">
            <header class="bar bar-nav">
                <h3 class="title">{{$t('nft.nft_list')}}</h3>
                <router-link :to="link('/')" replace class="icon icon-left"></router-link>
            </header>
            <div class="content pull-to-refresh-content" ref="content">
                <div class="tab-container">
                    <div class="table-assets" v-if="accountNFT.length>0">
                        <div class="list-block media-list">
                            <ul>
                                <li v-for="(item, index) in accountNFT" class="item-content item-asset"
                                    :key="index">
                                    <div class="item-inner" @click="showNFTInfo(item)">
                                        <div class="symbol">
                                            <img :src="item.link" width="30" height="30">
                                            <div>&nbsp;&nbsp;#{{item.id}} </div>
                                        </div>
                                        <div class="price">
                                            <div class="digital">
                                                <small>
                                                    {{item.name}}
                                                </small>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div v-else class="no-reocrd table-assets">
                        {{$t('node_vote.index.no_record')}}
                            </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import {
        fetch_account,
        get_contract_table,
        get_wallets,
        get_wallet_index
    } from '@/services/WalletService';
    import filters from '@/filters';
    export default {
        filters,
        data () {
            let wallets = get_wallets();
            wallets = wallets.map((w) => {
                w.balances = [];
                return w;
            });
            let wallet_index = get_wallet_index();
            return {
                accountNFT: [],
                currentWallet: wallets[wallet_index]
            };
        },
        methods: {
            showNFTInfo (item) {
                let query = {
                    type: this.type
                };
                this.$router.push({
                    path: this.link(`/nftInfo/${item.id}`, query)
                });
            },
            async getNFTList () {
                this.accountNFT = [];
                let currentAccountId = await fetch_account(this.currentWallet.account);
                let _walletId = String(currentAccountId.id).split('.')[2];
                let _walletId_up = Number(_walletId) + 1;
                let _accountInfo = await get_contract_table(this.type, 'account', _walletId, _walletId_up);
                let NFTAccountIds = _accountInfo && _accountInfo.rows[0] && _accountInfo.rows[0].ids;
                if (NFTAccountIds && NFTAccountIds.length > 0) {
                    let NFTAccountIdsMap = NFTAccountIds.map(item => get_contract_table(this.type, 'token', item, item + 1));
                    Promise.all(NFTAccountIdsMap).then((res) => {
                        this.accountNFT = res.map(item => item.rows[0]);
                    }).catch(ex => {
                        console.error(ex);
                        $.toast(ex.message);
                    });
                }
            }
        },
        mounted () {
            if (this.$route.query.channel) {
                this.channel = this.$route.query.channel;
            }
            this.type = this.$route.params.id;
            $.init();
            this.getNFTList();
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
            top: 2.2rem;
            background-color: #fff;
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
        border-bottom: .2rem solid #e7e7e7;
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

    .link-vote-index {
        z-index: 2;
        position: absolute;
        top: 5.5rem;
        left: 1rem;
        width: 1.6rem;
        height: 1.6rem;
        img {
            width: 100%;
            height: 100%;
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
    .index-tab {
    }
    .table-assets {
        position: relative;
        min-height: 25rem;
        background: #fff;
        .list-block {
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
                    .stakingAmount{
                        font-size: .6rem;

                    }
                }
            }
        }
    }
    .tab-nav {
        background-color: #fff;
        position: relative;
        height: 2rem;
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        .tab-nav-item {
            flex: 1;
            height: 2rem;
            line-height: 2rem;
            text-align: center;
            font-size: .65rem;
            border-bottom: 1px solid #f2f2f2;
        }
        .tab-nav-item.active {
            color: #6699ff;
            font-weight: bold;
            border-bottom: 1px solid #6699ff;
        }
    }
    .tab-container{
        background-color: #fff;
    }
    .no-reocrd {
        margin: 1.5rem 0;
        font-size: .7rem;
        color: #80848f;
        text-align: center;
    }
</style>
