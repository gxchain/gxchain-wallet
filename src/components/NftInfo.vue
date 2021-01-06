<template>
    <div class="page-group">
        <div class="page" id="page-transfer">
            <header class="bar bar-nav">
                <h3 class="title">{{$t('nft.view_info')}}</h3>
                <router-link :to="link('/')" replace class="icon icon-left"></router-link>
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
                        <img class="nftImg" :src="nftinfo.tokenlink">
                        <div class="nftContent">
                            <div class="nft-title">
                                {{nftinfo.tokenname}}
                            </div>
                            <div class="nft-id">#{{nftinfo.tokenid}}</div>
                            <div class="nft-des">
                                {{$t('nft.details')}}{{nftinfo.tokendes}}
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
        <transfer-nft :currentaccount="this.currentWallet.account" :nftinfo="nftinfo" ref="confirm1" @closeModal="onCancel" @onTransferConfirm="onConfirm" :show='showTransfer' ></transfer-nft>
        <password-confirm ref="unlock" @unlocking="unlocking"></password-confirm>
        <transfer-nft-confirm ref="confirm" :account="this.currentWallet.account" :pwd="password" :to="to" :param="param" :fee="fee" @closeConfirmModal="closeConfirmModal" ></transfer-nft-confirm>
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
                currentAccountId: ''
            };
        },
        computed: {
            ...mapGetters({
                accountNFT: 'accountNFT'
            })
        },
        mounted () {
            let id = this.$route.params.id;
            if (this.accountNFT.length === 0) {
                this.getAccount();
            } else {
                this.nftinfo = find(this.accountNFT, (item) => item.tokenid == id);
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
            async getAccount () {
                let currentWallet = this.currentWallet.account;
                fetch_account(currentWallet).then(result => {
                    this.currentAccountId = result.id;
                    this.getNFTList();
                });
            },
            async getNFTList () {
                Promise.all([
                    get_contract_table(process.env.nftContract, 'account'),
                    get_contract_table(process.env.nftContract, 'token')
                ]).then((result) => {
                    let NFTAccount = result[0] && result[0].rows;
                    let NFTToken = result[1] && result[1].rows;
                    let _walletId = String(this.currentAccountId).split('.')[2];
                    let tokenId = find(NFTAccount, (item) => item.owner == _walletId);
                    let accountNFT = [];
                    tokenId.tokenids.forEach((id) => {
                        let obj = find(NFTToken, (item) => item.tokenid == id);
                        accountNFT.push(obj);
                    });
                    this.setAccountNft({accountNFT: accountNFT});
                    this.nftinfo = find(this.accountNFT, (item) => item.tokenid == this.$route.params.id);
                });
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
                this.param = {'tokenid': this.nftinfo.tokenid, to: _id, 'tokenname': this.nftinfo.tokenname};

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
