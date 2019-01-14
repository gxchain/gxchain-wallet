<template>
    <div class="page-group">
        <div class="page" id="page-contract">
            <div class="content" v-show="unlocked">
                <div class="nav-box">
                    <div class="network">
                        <div class="network-tag">
                            <div class="network-status"></div>
                            {{network}}
                        </div>
                    </div>
                </div>
                <div class="description">
                    {{$t('transactionConfirm.vote')}}
                </div>
                <!--info-panel-->
                <info-panel :items="infoItems" :data="infoData"></info-panel>
                <div class="btn-box" v-show="unlocked">
                    <a href="javascript:;" class="button button-gxb disabled" @click="handleCancel">{{$t('smart_contract.btn.cancel')}}</a>
                    <a href="javascript:;" class="button button-gxb" :class="{disabled: submiting}" @click="handleConfirm">{{$t('smart_contract.btn.confirm')}}</a>
                </div>
            </div>
        </div>
        <password-confirm ref="confirm" :account="currentWallet.account" @fail="unlockFail" @cancel="handleCancel"
                @unlocking="unlocking"></password-confirm>
    </div>
</template>
<script>
    import {
        get_assets_by_ids,
        simpleVote
    } from '@/services/WalletService';
    import AccountImage from '@/components/sub/AccountImage.vue';
    import util from '@/common/util';
    import PasswordConfirm from './components/PwdConfirm.vue';
    import InfoPanel from './components/InfoPanel.vue';
    import Error from './error/Error';

    export default {
        components: {
            AccountImage,
            PasswordConfirm,
            InfoPanel
        },
        data () {
            return {
                unlocked: false,
                network: process.env.network,
                currentTab: 1,
                currentWallet: {
                    account: ''
                },
                accounts: [],
                fee: {},
                pwd: '',
                infoItems: [],
                infoData: {},
                feeAssetSymbol: 'GXC',
                submiting: false
            };
        },
        props: {
            extra: {
                default: {},
                type: Object
            }
        },
        created () {
            this.currentWallet.account = this.extra.account;
            this.accounts = this.extra.accounts;
            this.feeAssetSymbol = this.extra.feeAssetSymbol;

            document.title = this.$t('vote');
        },
        mounted () {
            this.initStep();
        },
        methods: {
            endContract (params) {
                util.callNative('endContract', params);
            },
            initStep () {
                util.callNative('getScatterPWD', {}, (pwd) => {
                    if (!pwd) {
                        this.$refs.confirm.show();
                    } else {
                        this.pwd = pwd;
                        this.confirmAccount(this.extra.account, 0, pwd);
                    }
                });
            },
            confirmAccount (account, index, pwd) {
                $.showIndicator();
                this.getTransactionData(pwd).then((fee) => {
                    $.hideIndicator();
                    this.buildInfo();
                    this.unlocked = true;
                }).catch(err => {
                    $.hideIndicator();
                    console.error(err);
                    this.unlocked = true;
                });
            },
            getTransactionData (pwd) {
                return this.getTransactionFee(pwd);
            },
            getTransactionFee (pwd) {
                return this.sendTransaction(pwd, false).then(res => {
                    let op = res && res.operations && res.operations[0];
                    this.fee = op[1].fee;
                    return get_assets_by_ids([this.fee.asset_id || '1.3.1']);
                }).then(assets => {
                    this.fee.realAmount = this.fee.amount;
                    this.fee.amount = this.fee.amount / Math.pow(10, assets[0].precision);
                    this.fee.symbol = assets[0].symbol;
                    return this.fee;
                }).catch(ex => {
                    let message = ex.message && ex.message.replace(/\'/g, '') || '';
                    if (message.split('gxb-crypto').length > 1) {
                        message = message.split('gxb-crypto')[0];
                        message = message.substring(0, message.length - 1);
                    }
                    this.endContract(new Error(undefined, encodeURIComponent(message)));
                });
            },
            sendTransaction (pwd, broadcast = true) {
                return simpleVote(this.currentWallet.account, this.accounts, 'GXC', pwd, broadcast);
            },
            handleConfirm () {
                if (this.submiting) {
                    return;
                }
                this.submiting = true;
                this.sendTransaction(this.pwd).then((res) => {
                    let data = {
                        trx_id: res[0].id,
                        block_num: res[0].block_num
                    };
                    this.submiting = false;
                    this.endContract({code: 1, msg: 'success', data: JSON.stringify(data)});
                }).catch(ex => {
                    this.submiting = false;
                    let message = ex.message && ex.message.replace(/\'/g, '') || '';
                    if (message.split('gxb-crypto').length > 1) {
                        message = message.split('gxb-crypto')[0];
                        message = message.substring(0, message.length - 1);
                    }
                    this.endContract(new Error(undefined, encodeURIComponent(message)));
                });
            },
            handleCancel () {
                this.endContract(Error.rejectSignature());
            },
            unlocking (pwd) {
                this.pwd = pwd;
                this.$refs.confirm.unlocked();
                this.confirmAccount(this.extra.account, 0, pwd);
            },
            unlockFail () {
                this.endContract(Error.passwordError(this.$t('unlock.error.invalid_password')));
            },
            buildInfo () {
                this.buildInfoItems();
                this.buildInfoData();
            },
            buildInfoItems () {
                // fee、memo
                this.infoItems = [{
                    key: 'ACCOUNTS',
                    value: this.accounts.join(',')
                }, {
                    key: 'FEE',
                    value: this.fee.amount + ' ' + this.fee.symbol
                }];
            },
            buildInfoData () {
                this.infoData = {
                    from: this.currentWallet.account,
                    accounts: this.accounts.join(','),
                    fee: {
                        amount: this.fee.realAmount,
                        asset_id: this.fee.asset_id
                    }
                };
            }
        }
    };
</script>
<style scoped lang="scss" type="text/scss">
    .page {
        background-color: #fff;
        font-weight: 500;

        .description {
            padding: .5rem 1rem;
            font-size: 1rem;
            font-family: 'Bebas';
        }

        .content {

            .nav-box {
                position: relative;
                width: 100%;

                .network {
                    position: relative;
                    width: 100%;
                    height: 2rem;
                    line-height: 2rem;
                    border-bottom: 1px solid #ddd;

                    .network-tag {
                        display: flex;
                        flex-direction: row;
                        justify-content: center;
                        align-items: center;
                        height: 1rem;
                        line-height: 1rem;
                        padding: 0 .5rem;
                        position: absolute;
                        top: 50%;
                        transform: translateY(-50%);
                        right: 1rem;
                        font-size: .6rem;
                        background: #e8fdff;
                        color: #333;
                        border-radius: 3px;
                    }

                    .network-status {
                        position: relative;
                        width: .5rem;
                        height: .5rem;
                        background: #108688;
                        border-radius: 50%;
                        margin-right: .25rem;
                    }

                }
                .account {
                    position: relative;
                    width: 100%;
                    height: 2rem;
                    line-height: 2rem;
                    border-bottom: 1px solid #ddd;
                    display: flex;
                    flex-direction: row;
                    justify-content: center;
                    align-items: center;

                    .from, .to {
                        font-size: .65rem;
                        flex: 1;
                        text-align: center;
                        display: flex;
                        justify-content: center;
                        align-items: center;

                        canvas {
                            margin-right: .5rem;
                        }

                    }
                    .arrow-right {
                        position: absolute;
                        top: 50%;
                        left: 50%;
                        transform: translate(-50%, -50%);
                        width: 1.5rem;
                        height: 1.5rem;
                        background: url("../../assets/images/common/arrow-right.png") no-repeat;
                        background-size: 100% 100%;
                    }

                }
            }
            .btn-box {
                display: flex;
                flex-direction: row;
                justify-content: center;
                align-items: center;

                a {
                    flex: 1;
                    margin: 1rem 1rem;
                }

            }
        }
    }

    @media only screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) {
        .nav-box {
            padding-top: 44px;
        }
    }
</style>
