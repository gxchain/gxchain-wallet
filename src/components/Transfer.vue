<template>
    <div class="page-group">
        <div class="page" id="page-transfer">
            <header class="bar bar-nav">
                <h3 class="title">{{$t('transfer.title')}}</h3>
                <router-link :to="link('/')" replace class="icon icon-left"></router-link>
                <a v-if="isNative" href="javascript:;" class="icon gxicon gxicon-scan pull-right" @click="openQRScaner">
                    <input ref="qrfile" @change="onFileUpload" v-if="!isNative" type="file" class="file-selector" />
                </a>
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
                <div class="list-block">
                    <ul>
                        <li class="item-content item-link">
                            <div class="item-inner">
                                <div class="item-title label">{{$t('transfer.from')}}</div>
                                <div class="item-select">
                                    <select @change="switchAccount">
                                        <option v-for="(w,i) in wallets" :key="i" :value="i" :selected="i==currentWalletIndex">{{w.account}}</option>
                                    </select>
                                </div>
                                <div class="item-after">
                                    <account-image :account="currentWallet.account" :size='14'></account-image>
                                </div>
                            </div>
                        </li>
                        <li class="item-content">
                            <div class="item-inner">
                                <div class="item-title label">{{$t('transfer.to')}}</div>
                                <div class="item-input">
                                    <input @change="onAccountChange" class="input-account" v-model="account" type="text" maxlength="80" :placeholder="$t('transfer.to_placeholder')">
                                </div>
                                <div class="item-after">
                                    <account-image :account="account" :size='14'></account-image>
                                </div>
                            </div>
                        </li>
                        <li class="tip-alert" v-if="error.account">
                            <div>{{error.account}}</div>
                        </li>
                        <li class="item-content item-link last">
                            <div class="item-inner">
                                <div class="item-title label">{{$t('transfer.amount')}}</div>
                                <div class="item-input">
                                    <input @change="onAmountChange" class="input-amount" v-model="amount" type="number" maxlength="80" :placeholder="$t('transfer.amount_placeholder', {symbol: currentAsset.symbol})">
                                </div>
                                <div class="item-after">
                                    <div class="item-select">
                                        <select @change="switchAsset">
                                            <option v-for="(asset, i) in assetList" :key="i" :value="asset.id" :selected="asset.id==currentAsset.id">{{asset.symbol}}</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li class="tip-alert" v-if="error.amount">
                            <div>{{error.amount}}</div>
                        </li>
                        <li class="tip-success" v-if="balance!=-1">
                            <div v-html="$t('transfer.available', {amount: formattedBalance, symbol: currentAsset.symbol})"></div>
                        </li>
                        <li class="item-content item-link">
                            <div class="item-inner">
                                <div class="item-title label">{{$t('transfer.fee')}}</div>
                                <div class="item-select">
                                    <select @change="switchFee">
                                        <option v-for="(fee, i) in feeList" :key="i" :value="i" :selected="fee.id==currentFee.id">{{fee.symbol}}</option>
                                    </select>
                                </div>
                            </div>
                        </li>
                        <li class="item-content align-top">
                            <div class="item-inner">
                                <div class="item-title label">{{$t('transfer.memo')}}</div>
                                <div class="item-input">
                                    <textarea v-model="memo" :placeholder="showMemoPlaceholder ? $t('transfer.memo_placeholder') : ''"></textarea>
                                </div>
                            </div>
                        </li>
                        <div class="alert-tip" v-if="!showMemoPlaceholder">
                            <img src="static/alert.png" alt="">
                            <span>{{$t('transfer.memo_tip')}}</span>
                        </div>
                    </ul>
                </div>
                <div class="content-block">
                    <p class="text-center tip-error" v-if="error.other">{{error.other}}</p>
                </div>
                <div class="button-block content-block ">
                    <p>
                        <a @click="onSubmit" href="javascript:;" class="button button-gxb" :class="{disabled:!submitEnable}">{{$t('transfer.send')}}</a>
                    </p>
                </div>
            </div>
        </div>
        <password-confirm ref="unlock" @unlocking="unlocking"></password-confirm>
        <transfer-confirm :transaction="transaction" :account="currentWallet.account" :pwd="password" :currentAsset="currentAsset" :feeType="currentFee" :amount="amount" :to="account"
            :memo="memo" ref="confirm"></transfer-confirm>
    </div>
</template>
<script>
    import AccountImage from './sub/AccountImage.vue';
    import {
        get_wallets,
        get_wallet_index,
        set_wallet_index,
        fetch_account_balances,
        get_assets_by_ids,
        transfer
    } from '@/services/WalletService';
    import util from '@/common/util';
    import filters from '@/filters';
    import PasswordConfirm from './sub/PasswordConfirm.vue';
    import TransferConfirm from './sub/TransferConfirm.vue';
    import {get_need_memo_accounts} from '@/services/MarketService';
    import errorHandler from '@/common/errorHandler';
    export default {
        filters,
        data () {
            let wallets = get_wallets();
            return {
                transaction: null,
                account: '',
                amount: '',
                memo: '',
                balance: -1,
                password: '',
                assetList: [],
                currentAsset: {},
                currentAssetId: '1.3.1',
                // feeList: get_fee_list(),
                // currentFee: get_fee_list()[0],
                feeList: [],
                currentFee: {},
                currentFeeIndex: 0,
                wallets: wallets,
                currentWallet: wallets[get_wallet_index()],
                currentWalletIndex: get_wallet_index(),
                error: {
                    account: '',
                    amount: '',
                    other: ''
                },
                needMemoAccounts: []
            };
        },
        watch: {
            account () {
                this.error.other = '';
                this.account = this.account.toLowerCase();
            },
            amount () {
                this.error.other = '';
            },
            currentWallet () {
                this.error.other = '';
                this.fetch_balance();
            }
        },
        mounted () {
            $.init();
            $.initPullToRefresh(this.$el);
            this.account = this.$route.query.to || '';
            this.amount = this.$route.query.amount || '';
            this.memo = this.$route.query.memo || '';
            this.fetch_balance();
            $(this.$el).on('refresh', '.pull-to-refresh-content', (e) => {
                this.fetch_balance();
            });
            get_need_memo_accounts().then((resp) => {
                let result = resp.data;
                if (result && result.data) {
                    this.needMemoAccounts = result.data;
                }
            }).catch((ex) => {
                errorHandler(ex);
            });
        },
        methods: {
            onSubmit () {
                if (!this.submitEnable) {
                    return;
                }
                if (this.validateAccount() && this.validateAmount()) {
                    this.error.other = '';
                    this.$refs.unlock.show();
                }
            },
            unlocking (pwd) {
                let self = this;
                if (!pwd.trim()) {
                    this.error.other = this.$t('unlock.error.invalid_password');
                    this.$refs.unlock.unlocked();
                    return;
                }
                transfer(this.currentWallet.account, this.account, this.currentAsset, this.currentFee.id, this.amount, this.memo, pwd, false).then((resp) => {
                    self.transaction = resp;
                    self.password = pwd;
                    self.$refs.confirm.show();
                }).catch(ex => {
                    self.error.other = ex.message;
                    self.$refs.unlock.unlocked();
                });
            },
            onAmountChange () {
                this.validateAmount();
            },
            onAccountChange () {
                this.validateAccount();
            },
            validateAccount () {
                let account_err = this.is_account_name_error();
                if (account_err) {
                    this.error.account = this.$t(`transfer.error.account.${account_err}`);
                    return false;
                }
                if (this.currentWallet.account == this.account) {
                    this.error.account = this.$t('transfer.error.account.cannot_send_to_yourself');
                    return false;
                } else {
                    this.error.account = '';
                }
                return true;
            },
            validateAmount () {
                let amount = Number(this.amount);
                if (isNaN(amount) || amount == 0) {
                    this.error.amount = this.$t('transfer.error.amount.invalid');
                    return false;
                } else if (amount > this.balance) {
                    if (this.currentFee.id !== this.currentAsset.id) {
                        this.error.amount = this.$t('transfer.error.amount.insufficient_diff_balance');
                    } else {
                        this.error.amount = this.$t('transfer.error.amount.insufficient_balance');
                    }
                    return false;
                }
                this.error.amount = '';
                return true;
            },
            is_account_name_error () {
                let account = this.account;
                var i, label, len, length;

                if (!account) {
                    return 'empty_account';
                }
                length = account.length;
                if (length < 3) {
                    return 'account_should_be_longer';
                }
                if (length > 63) {
                    return 'account_should_be_shorter';
                }

                let ref = account.split('.');
                for (i = 0, len = ref.length; i < len; i++) {
                    label = ref[i];
                    if (!/^[~a-z]/.test(label)) {
                        return 'account_should_start_with_a_letter';
                    }
                    if (!/^[~a-z0-9-]*$/.test(label)) {
                        return 'account_format_error';
                    }
                    if (/--/.test(label)) {
                        return 'account_one_dash_error';
                    }
                    if (!/[a-z0-9]$/.test(label)) {
                        return 'account_end_error';
                    }
                    if (!(label.length >= 3)) {
                        return 'account_segment_should_be_longer';
                    }
                }
                return null;
            },
            openQRScaner () {
                let self = this;
                if (this.isNative) {
                    cordova.exec(function (result) {// eslint-disable-line
                        if (result.indexOf('qr://transfer') > -1) {
                            let query = util.query2Obj(result.replace('qr://transfer', ''));
                            self.account = query.to || '';
                            self.amount = query.amount || '';
                            self.memo = query.memo || '';
                        } else {
                            self.account = result;
                        }
                    }, null, 'QRCode', 'scan', []);
                }
            },
            fetch_balance () {
                let wallet_balances;
                fetch_account_balances(this.currentWallet.account).then(function (balances) {
                    if (!balances) {
                        return;
                    }
                    wallet_balances = balances;
                    let asset_ids = wallet_balances.map(b => {
                        return b.asset_id;
                    });
                    return get_assets_by_ids(asset_ids);
                }).then(assets => {
                    let assetMap = {};
                    assets.forEach(asset => {
                        assetMap[asset.id] = asset;
                    });
                    this.assetList = assets;
                    this.feeList = assets;
                    this.currentFee = assets[0];
                    for (let i = 0; i < this.assetList.length; i++) {
                        if (this.currentAssetId == this.assetList[i].id) {
                            this.currentAsset = this.assetList[i];
                            break;
                        }
                    }
                    // 有其他币种而没有GXS的钱包
                    if (!this.currentAsset.id) {
                        this.currentAssetId == this.assetList[0].id;
                        this.currentAsset = this.assetList[0];
                    }
                    let amount = wallet_balances.filter(item => {
                        return item.asset_id == this.currentAsset.id;
                    })[0].amount;
                    this.balance = amount / Math.pow(10, this.currentAsset.precision);
                    setTimeout(() => {
                        $.pullToRefreshDone($(this.$el).find('.pull-to-refresh-content'));
                    }, 500);
                }).catch(ex => {
                    console.error(ex);
                    setTimeout(() => {
                        $.pullToRefreshDone($(this.$el).find('.pull-to-refresh-content'));
                    }, 500);
                });
            },
            switchAccount (e) {
                let index = e.target.value;
                set_wallet_index(index);
                this.currentWalletIndex = index;
                this.currentWallet = this.wallets[index];
            },
            switchAsset (e) {
                let id = e.target.value;
                this.currentAssetId = id;
                for (let i = 0; i < this.assetList.length; i++) {
                    if (this.currentAssetId == this.assetList[i].id) {
                        this.currentAsset = this.assetList[i];
                        break;
                    }
                }
                this.fetch_balance();
            },
            switchFee (e) {
                let index = e.target.value;
                this.currentFeeIndex = index;
                this.currentFee = this.feeList[index];
            },
            validateMemo () {
                let accounts = this.needMemoAccounts;
                if (accounts.indexOf(this.account) > -1) {
                    return false;
                } else {
                    return true;
                }
            }
        },
        computed: {
            formattedBalance () {
                if (!this.balance) {
                    return '0';
                }
                return filters.asset(this.balance, this.currentAsset.precision);
            },
            submitEnable () {
                return this.account && this.amount && (this.validateMemo() || this.memo);
            },
            showMemoPlaceholder () {
                return this.validateMemo();
            }
        },
        components: {
            AccountImage,
            PasswordConfirm,
            TransferConfirm
        }
    };
</script>
<style scoped lang="scss">
    .tip-error,
    .tip-alert {
        word-break: break-word;
    }

    .tip-alert,
    .tip-success {
        padding-left: .75rem;
    }

    .color-gray {
        color: lighten(#3d3d3b, 20%)
    }

    .list-block .item-title.label {
        width: 4.5rem;
    }

    .list-block .input-account {
        text-transform: lowercase;
    }

    .list-block textarea {
        margin-top: .2rem;
    }

    .list-block .last .item-inner:after {
        height: 0;
    }

    .list-block .last .item-after{
        justify-content: flex-end;
        align-items: center;
    }

    .list-block .item-select {
        width: 100%;
    }
    .alert-tip {
        display: flex;
        img {
            width: 1rem;
            margin-right: .6rem;
        }
        font-size: .7rem;
        background-color: #f1d3d0;
        color: #c2433b;
        align-items: center;
        padding: .75rem;
    }
</style>
