<template>
    <div class="page-group">
        <div class="page" id="page-transfer">
            <header class="bar bar-nav">
                <h3 class="title">{{$t('nft.view_info')}}</h3>
                <router-link :to="link(`/nftGroup/${type}`)" replace class="icon icon-left"></router-link>
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
                    <div class="card-content" v-if="nftinfo">
                        <img class="nftImg" :src="nftinfo.link">
                        <div class="nftContent">
                            <div class="nft-title">
                                {{nftinfo.name}}
                            </div>
                            <div class="nft-id">#{{nftinfo.id}}</div>
                            <div class="nft-des">
                                {{$t('nft.details')}}{{handleShowDes(nftinfo.extra).description}}
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
        <transfer-nft :currentaccount="this.currentWallet.account" :nftinfo="nftinfo" ref="confirm1" @closeModal="onCancel" @onTransferConfirm="onConfirm" :show='showTransfer'></transfer-nft>
        <password-confirm ref="unlock" @unlocking="unlocking"></password-confirm>
        <transfer-nft-confirm ref="confirm" :account="this.currentWallet.account" :pwd="password" :to="to" :param="param" :fee="fee" @closeConfirmModal="closeConfirmModal" :contract="type"></transfer-nft-confirm>
    </div>
</template>
<script>
    import AccountImage from '@/components/sub/AccountImage.vue';
    import {
        get_wallets,
        get_wallet_index,
        fetch_account,
        call_contract,
        get_assets_by_ids,
        get_contract_table
    } from '@/services/WalletService';
    import {
        mapGetters,
        mapActions
    } from 'vuex';
    import PasswordConfirm from '@/components/sub/PasswordConfirm.vue';
    import TransferNftConfirm from '@/components/sub/TransferNftConfirm.vue';
    import TransferNft from '@/components/sub/TransferNft.vue';
    import find from 'lodash/find';
    export default {
        data () {
            let wallets = get_wallets();
            return {
                transaction: null,
                account: '',
                balance: -1,
                password: '',
                wallets: wallets,
                currentWallet: wallets[get_wallet_index()],
                currentWalletIndex: get_wallet_index(),
                error: {
                    account: '',
                    amount: '',
                    other: ''
                },
                showTransfer: false,
                to: '',
                toAccount: '',
                param: {},
                fee: {},
                nftinfo: {},
                type: process.env.nftContract
            };
        },
        computed: {
            ...mapGetters({
                accountNFT: 'accountNFT'
            })
        },
        mounted () {
            let id = this.$route.params.id;
            this.type = this.$route.query.type;
            if (this.accountNFT.length === 0) {
                this.getNFTInfo();
            } else {
                this.nftinfo = find(this.accountNFT, (item) => item.id == id);
            }
        },
        methods: {
            ...mapActions({
                setAccountNft: 'setAccountNft'
            }),
            show () {
                $.popup($(this.$el));
            },
            onSubmit () {
                this.showTransfer = true;
            },
            handleShowDes (str) {
                if (str) {
                    return JSON.parse(str);
                } else {
                    return {};
                }
            },
            async getNFTInfo () {
                let _id = this.$route.params.id;
                let _token = await get_contract_table(this.type, 'token', _id, _id + 1);
                this.nftinfo = _token.rows[0];
            },
            async onConfirm (account) {
                this.to = account.trim();
                this.toAccount = await fetch_account(this.to);
                if (this.toAccount) {
                    this.showTransfer = false;
                    this.$refs.unlock.show();
                } else {
                    $.toast(this.$t('transfer.error.account.to_account_not_exist'));
                }
            },
            onCancel () {
                this.showTransfer = false;
            },
            closeConfirmModal () {
                let query = {
                    from: this.$route.fullPath
                };
                this.$router.push({
                    path: this.link('/transferNftSuccess', query)
                });
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
                this.param = {'id': this.nftinfo.id, 'to': _id, 'name': this.nftinfo.name};

                call_contract(this.currentWallet.account, this.type, 'transfer', this.param, 0, pwd, false).then(res => {
                    let op = res && res.operations && res.operations[0];
                    this.fee = op[1].fee;
                    return get_assets_by_ids([this.fee.asset_id || '1.3.1']);
                }).then(assets => {
                    this.fee.realAmount = this.fee.amount;
                    this.fee.amount = this.fee.amount / Math.pow(10, assets[0].precision);
                    this.fee.symbol = assets[0].symbol;
                    this.$refs.unlock.unlocked();
                    this.$refs.confirm.show();
                }).catch(ex => {
                    $.hideIndicator();
                    console.error(ex);
                    let message = '';
                    if (ex.message.indexOf('Insufficient Balance') > -1 || ex.message.indexOf('account balance not enough') > -1) {
                        message = this.$t('transfer.error.amount.insufficient_balance');
                    } else {
                        message = ex.message;
                    }
                    this.$refs.unlock.unlocked();
                    $.toast(message);
                });
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
        padding: 0 20px;
    }
    .nftInfoContent{
        background: #fff;
    }
    .nftImg{
        width: 100%;
    }
    .nft-id {
        font-weight: bold;
    }
    .nft-des {
        font-size: .6rem;
        color: #888;
    }
    .nftContent{
        text-align: left;
        padding: 10px 0 0 20px;
        font-size: .65rem;
        .nft-title{
            font-size: .75rem;
            font-weight: bold;
        }
    }
    #video_wrap{
        width: 100%;
        text-align: center;
    }
</style>
