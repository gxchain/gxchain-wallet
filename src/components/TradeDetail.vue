<template>
    <div class="page-group">
        <div class="page" id="page-trade-detail">
            <header class="bar bar-nav">
                <h3 class="title">{{$t('trade.title')}}</h3>
                <router-link :to="link('/trade-history')" replace class="icon icon-left"></router-link>
            </header>
            <div class="content" v-if="account">
                <div class="content-block text-center">
                    <p>{{$t(`trade.${type}`)}}</p>
                    <p>
                        <account-image :account="formatted_account(account)" :size="45"></account-image>
                    </p>
                    <p>
                        <span class="asset">{{type == 'sent' ? '-' : '+'}}{{amount | asset(2)}}</span>&nbsp;{{symbol}}
                    </p>
                </div>
                <div class="list-block">
                    <ul>
                        <li class="item-content">
                            <div class="item-inner">
                                <div class="item-title label">{{$t('trade.label.from')}}</div>
                                <div class="item-after">
                                    {{formatted_account(from)}}&nbsp;
                                    <account-image class="sm-img" :account="formatted_account(from)"
                                                   :size="10"></account-image>
                                </div>
                            </div>
                        </li>
                        <li class="item-content">
                            <div class="item-inner">
                                <div class="item-title label">{{$t('trade.label.to')}}</div>
                                <div class="item-after">
                                    {{formatted_account(to)}}&nbsp;
                                    <account-image class="sm-img" :account="formatted_account(to)"
                                                   :size="10"></account-image>
                                </div>
                            </div>
                        </li>
                        <li class="item-content">
                            <div class="item-inner">
                                <div class="item-title label">{{$t('trade.label.fee', {symbol: fee_symbol})}}</div>
                                <div class="item-after">
                                    {{fee}}
                                </div>
                            </div>
                        </li>
                        <li class="item-content">
                            <div class="item-inner">
                                <div class="item-title label">{{$t('trade.label.timestamp')}}</div>
                                <div class="item-after">
                                    {{timestamp}}
                                </div>
                            </div>
                        </li>
                        <li class="item-content" v-if="memo.message">
                            <div class="item-inner">
                                <div class="item-title label">{{$t('trade.label.memo')}}</div>
                                <div class="item-after">
                                    <span class="gxicon gxicon-lock" @click="unlock"
                                          v-if="!unlocked&&memo.message"></span>{{memo.decryptedMemo}}
                                </div>
                            </div>
                        </li>
                        <li class="item-content" v-if="txid">
                            <div class="item-inner">
                                <div class="item-title label">txid</div>
                                <div class="item-after">
                                    <a href="javascript:;" class="icon icon-search" @click="showTxid"></a>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
                <p class="tip-error text-center" v-if="error.common">{{error.common}}</p>
            </div>
        </div>
        <password-confirm ref="confirm" @unlocking="unlocking"></password-confirm>
    </div>
</template>
<script>
    import PasswordConfirm from './sub/PasswordConfirm.vue';
    import AccountImage from './sub/AccountImage.vue';
    import filters from '@/filters';
    import {
        get_objects,
        fetch_block,
        fetch_account,
        get_wallets,
        get_wallet_index,
        get_assets_by_ids,
        unlock_wallet
    } from '@/services/WalletService';
    import {
        Aes,
        PrivateKey
    } from 'gxbjs';

    export default {
        filters,
        data () {
            return {
                account_id: '-unknown',
                wallets: get_wallets(),
                wallet_index: get_wallet_index(),
                amount: '',
                symbol: '',
                fee_symbol: '',
                timestamp: '',
                fee: '',
                from: '',
                to: '',
                memo: {},
                accounts: {},
                items: {},
                unlocked: false,
                txid: '',
                error: {
                    common: ''
                }
            };
        },
        mounted () {
            $.init();
            this.loadTradeInfo();
        },
        methods: {
            showTxid () {
                let self = this;
                $.modal({
                    title: 'txid',
                    text: `<div style="word-break: break-all;">${self.txid}</div>`,
                    buttons: [
                        {
                            text: self.$t('trade.modal.ok')
                        }
                    ]
                });
            },
            loadTradeInfo () {
                Promise.all([
                    fetch_account(this.currentWallet.account),
                    get_objects([this.$route.params.id])
                ]).then((results) => {
                    let account = results[0];
                    this.account_id = account.id;
                    let operation = results[1][0];
                    get_assets_by_ids([operation.op[1].fee.asset_id]).then((resp) => {
                        this.fee = operation.op[1].fee.amount / Math.pow(10, resp[0].precision);
                        this.fee_symbol = resp[0].symbol;
                    });
                    this.from = operation.op[1].from;
                    this.to = operation.op[1].to;
                    this.memo = $.extend({
                        decryptedMemo: ''
                    }, operation.op[1].memo);
                    get_assets_by_ids([operation.op[1].amount.asset_id]).then(res => {
                        this.amount = operation.op[1].amount.amount / Math.pow(10, res[0].precision);
                        this.symbol = res[0].symbol;
                    });
                    fetch_block(operation.block_num).then((block) => {
                        this.timestamp = new Date(block.timestamp + 'Z').toLocaleString();
                        if (block.transaction_ids[operation.trx_in_block] != undefined) {
                            this.txid = block.transaction_ids[operation.trx_in_block];
                        }
                    });
                });
            },
            formatted_account (id) {
                let self = this;
                if (this.items[id]) {
                    return this.accounts[id];
                }
                this.items[id] = true;
                get_objects([id]).then((accounts) => {
                    let account = accounts[0];
                    self.$set(self.accounts, id, account.name);
                }).catch(ex => {
                    this.items[id] = false;
                    console.error(ex);
                });
            },
            unlock () {
                this.error.common = '';
                this.$refs.confirm.show();
            },
            unlocking (pwd) {
                let self = this;
                if (!pwd.trim()) {
                    this.error.common = this.$t('unlock.error.invalid_password');
                    this.$refs.confirm.unlocked();
                    return;
                }
                unlock_wallet(this.currentWallet.account, pwd).then((info) => {
                    self.unlocked = true;
                    let private_key = PrivateKey.fromWif(info.wifKey);
                    self.memo.decryptedMemo = Aes.decrypt_with_checksum(private_key, self.type == 'receive'
                    ? self.memo.from : self.memo.to, self.memo.nonce, self.memo.message).toString('utf-8');
                    self.$refs.confirm.unlocked();
                }).catch((ex) => {
                    self.$refs.confirm.unlocked();
                    self.error.common = self.$t('unlock.error.invalid_password');
                });
            }
        },
        computed: {
            type () {
                if (this.currentWallet && this.from && this.to) {
                    if (this.account_id == this.from) {
                        return 'sent';
                    }
                    if (this.account_id == this.to) {
                        return 'receive';
                    }
                    return '';
                } else {
                    return '';
                }
            },
            currentWallet () {
                return this.wallets[this.wallet_index];
            },
            account () {
                if (this.type == 'receive') {
                    return this.from;
                } else {
                    return this.to;
                }
            }
        },
        components: {
            AccountImage,
            PasswordConfirm
        }
    };
</script>
<style scoped>
    .asset {
        font-family: bebas;
        font-weight: bold;
        font-size: 1.1rem;
    }

    .sm-img {
        width: 1rem;
        height: 1rem;
    }

    .list-block .item-title.label {
        width: auto;
    }

    .list-block .item-after {
        align-items: center;
    }
</style>
