<template>
    <div class="popup popup-qrcode">
        <div class="page" id="page-transfer">
            <header class="bar bar-nav">
                <h3 class="title">查看信息</h3>
                <a href="javascript:;" class="pull-right icon icon-close close-popup">&times;</a>
            </header>
            <div class="content pull-to-refresh-content nftInfoContent">
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
                    <div class="card-content">
                      <video controls=""  name="media" id="video_wrap">
                          <source src="https://static.gxchain.org/gxchain/video/video.mp4" id="video_src" type="video/mp4">
                      </video>
                      <div class="nftContent">
                          <div class="nft-title">
                              G.BRUCE
                          </div>
                          <div>#{{nftinfo.tokenid}}</div>
                          <div>
                              简介：信小宝是一款公信宝的吉祥物
                          </div>
                      </div>
                    </div>
                </div>
                <div class="button-block content-block ">
                    <p>
                        <a @click="onSubmit" href="javascript:;" class="button button-gxb" >{{$t('transfer.send')}}</a>
                    </p>
                </div>
            </div>
        </div>
        <transfer-nft :currentaccount="this.currentWallet.account" :nftinfo="nftinfo" ref="confirm1" @closeModal="onCancel" @onConfirm="onConfirm" :show='showTransfer' ></transfer-nft>
        <password-confirm ref="unlock" @unlocking="unlocking"></password-confirm>
        <transfer-nft-confirm ref="confirm" :account="this.currentWallet.account" :pwd="password" :to="to" :param="param" :fee="fee" @closeConfirmModal="closeConfirmModal" ></transfer-nft-confirm>
    </div>
</template>
<script>
    import AccountImage from '@/components/sub/AccountImage.vue';
    import {
        get_wallets,
        get_wallet_index,
        set_wallet_index,
        fetch_account,
        call_contract,
        get_assets_by_ids
    } from '@/services/WalletService';
    import filters from '@/filters';
    import PasswordConfirm from '@/components/sub/PasswordConfirm.vue';
    import TransferNftConfirm from '@/components/sub/TransferNftConfirm.vue';
    import TransferNft from '@/components/sub/TransferNft.vue';
    export default {
        filters,
        props: {
            nftinfo: {
                type: Object
            }
        },
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
                needMemoAccounts: [],
                showTransfer: false,
                to: '',
                toAccount: '',
                param: {},
                fee: {}
            };
        },
        watch: {
            account () {
                this.error.other = '';
                this.account = this.account.toLowerCase();
            },
            amount () {
                this.error.other = '';
            }
        },
        mounted () {
        },
        methods: {
            show () {
                $.popup($(this.$el));
            },
            onSubmit () {
                this.showTransfer = true;
            },
            async onConfirm (account) {
                this.to = account;
                this.toAccount = await fetch_account(account);
                this.showTransfer = false;
                this.$refs.unlock.show();
            },
            onCancel () {
                this.showTransfer = false;
            },
            closeConfirmModal () {
                $.closeModal($(this.$el));
            },
            async unlocking (pwd) {
                if (!pwd.trim()) {
                    this.error.other = this.$t('unlock.error.invalid_password');
                    this.$refs.unlock.unlocked();
                    return;
                }
                this.password = pwd;
                let _id = String(this.toAccount.id).split('.')[2];
                this.param = {'tokenid': this.nftinfo.tokenid, to: _id};

                call_contract(this.currentWallet.account, process.env.nftContract, 'transfer', this.param, 0, pwd, false).then(res => {
                    let op = res && res.operations && res.operations[0];
                    this.fee = op[1].fee;
                    return get_assets_by_ids([this.fee.asset_id || '1.3.1']);
                }).then(assets => {
                    this.fee.realAmount = this.fee.amount;
                    this.fee.amount = this.fee.amount / Math.pow(10, assets[0].precision);
                    this.fee.symbol = assets[0].symbol;
                    this.$refs.unlock.unlocked();
                    this.$refs.confirm.show();
                    // return fetch_account(this.currentWallet.account);
                }).catch(ex => {
                    $.hideIndicator();
                    console.error(ex);
                    let message = (ex.message && ex.message.replace(/\'/g, '')) || '';
                    if (message.split('gxb-crypto').length > 1) {
                        message = message.split('gxb-crypto')[0];
                        message = message.substring(0, message.length - 1);
                    }
                    // this.endContract({code: -1, msg: encodeURIComponent(message)});
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
                    // if (!(label.length >= 3)) {
                    //     return 'account_segment_should_be_longer';
                    // }
                }
                return null;
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
            TransferNftConfirm,
            TransferNft
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
    .card-content {
        text-align: center;
    }
    .nftInfoContent{
        background: #fff;
    }
    .nftContent{
        text-align: left;
        padding: 10px 22px;
        font-size: .65rem;
        border-bottom: #eee solid 1px;
        .nft-title{
            font-size: .75rem;
            font-weight: bold;
        }
    }
</style>
