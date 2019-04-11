<template>
    <div class="page-group">
        <div class="page" id="page-contract">
            <div class="content" v-show="unlocked && plugin === 'contract'">
                <div class="nav-box">
                    <div class="network">
                        <div class="network-tag">
                            <div class="network-status"></div>
                            {{network}}
                        </div>
                    </div>
                    <div class="account">
                        <div class="from">
                            <account-image :account="currentWallet.account" :size='14'></account-image>
                            {{currentWallet.account}}
                        </div>
                        <div class="to">
                            <account-image :account="contractName" :size='14'></account-image>
                            {{contractName}}
                        </div>
                        <div class="arrow-right"></div>
                    </div>
                </div>
                <div class="info-box">
                    <div class="tab-header">
                        <div class="func-name">Method: {{methodName}}</div>
                        <div class="func-total">{{asset.amount}}&nbsp;&nbsp;{{asset.symbol}}</div>
                        <div class="tab-bar">
                            <div class="tab-bar-item" :class="currentTab === 1 ? 'active' : ''" @click="handleTab(1)">{{$t('smart_contract.tabs.detail')}}</div>
                            <div class="tab-bar-item" :class="currentTab === 2 ? 'active' : ''" @click="handleTab(2)">{{$t('smart_contract.tabs.data')}}</div>
                        </div>
                    </div>
                    <div class="tab-container" v-show="currentTab === 1">
                        <div class="tab-item fee">
                            <div class="name">FEE</div>
                            <div class="asset">
                                <div class="amount">{{fee.amount}}&nbsp;&nbsp;{{fee.symbol}}</div>
                            </div>
                        </div>
                        <div class="tab-item total" v-if="asset.id === fee.asset_id">
                            <div class="name">TOTAL</div>
                            <div class="asset">
                                <div class="intro">AMOUNT + FEE</div>
                                <div class="amount">{{asset.amount + fee.amount}}&nbsp;&nbsp;{{asset.symbol}}</div>
                            </div>
                        </div>
                    </div>
                    <div class="tab-container" v-show="currentTab === 2">
                        <div class="func-type">{{$t('smart_contract.params.method_type')}}: <span>Method: {{methodName}}</span></div>
                        <div class="hex-data">
                            <div class="label">{{$t('smart_contract.params.request_data')}}:</div>
                            <div class="data"><pre>{{contractData}}</pre></div>
                        </div>
                    </div>
                </div>
                <div class="btn-box" v-show="unlocked">
                    <a href="javascript:;" class="button button-gxb disabled" @click="handleCancel">{{$t('smart_contract.btn.cancel')}}</a>
                    <a href="javascript:;" class="button button-gxb" :class="{disabled: submiting}" @click="handleConfirm">{{$t('smart_contract.btn.confirm')}}</a>
                </div>
            </div>
            <div class="content" v-show="plugin === 'auth'">
                <div class="authorize-box">
                    <div class="authorize-header"></div>
                    <div class="authorize-info">
                        <div class="list-block">
                            <ul>
                                <li class="item-content">
                                    <div class="item-inner">
                                        <div class="item-title">{{$t('oauth.authorize.confirm_tip1')}} <span class="highlight">{{$t('oauth.authorize.current_app')}}</span> {{$t('oauth.authorize.confirm_tip2')}}</div>
                                    </div>
                                </li>
                                <li class="item-content">
                                    <div class="item-inner auth-list">
                                        <div class="item-auth">
                                            <div class="item-auth-before">
                                                <span>•</span>
                                            </div>
                                            <div class="item-auth-after">{{$t('oauth.authorize.wallet_account')}}</div>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="authorize-footer">
                        <div class="confirm-tip"></div>
                        <a href="javascript:;" class="button button-gxb" @click="initStep">{{$t('oauth.authorize.btn.confirm')}}</a>
                        <div class="button-reject" @click="handleCancel">{{$t('oauth.authorize.btn.cancel')}}</div>
                    </div>
                </div>
            </div>
        </div>
        <password-confirm ref="confirm" :account="currentWallet.account" @fail="unlockFail" @cancel="handleCancel"
                @unlocking="unlocking"></password-confirm>
    </div>
</template>
<script>
    import {
        get_wallets,
        get_wallet_index,
        fetch_account,
        get_assets_by_ids,
        call_contract
    } from '@/services/WalletService';
    import {get_item_native} from '@/services/CommonService';
    import PasswordConfirm from './components/PwdConfirm.vue';
    import AccountImage from '@/components/sub/AccountImage.vue';
    import util from '@/common/util';
    export default {
        data () {
            let wallets = get_wallets();
            let walletIndex = get_wallet_index();
            return {
                unlocked: false,
                network: process.env.network,
                currentTab: 1,
                wallets: wallets,
                currentWallet: {
                    account: wallets[walletIndex].account
                },
                contractName: '',
                contractAccount: {},
                contractData: '',
                methodName: '',
                methodParams: {},
                asset: {},
                fee: {},
                amount: {},
                pwd: '',
                plugin: 'contract',
                version: '',
                submiting: false
            };
        },
        created () {
            this.plugin = this.$route.query.plugin || 'contract';
            switch (this.plugin) {
                case 'contract':
                    document.title = this.$t('smart_contract.title');
                    break;
                case 'auth':
                    document.title = this.$t('oauth.authorize.title');
                    break;
                default:
                    document.title = this.$t('smart_contract.title');
            }
        },
        mounted () {
            if (this.plugin === 'contract') {
                this.contractName = this.$route.query.contract_name || '';
                if (this.$route.query.version) {
                    let tmpArr = this.$route.query.version.split('contract_name=');
                    if (tmpArr.length > 1) {
                        this.version = tmpArr[0];
                        this.contractName = tmpArr[1];
                    }
                }
                this.amount = this.$route.query.amount && JSON.parse(decodeURIComponent(this.$route.query.amount)) || {amount: 0, asset_id: '1.3.1'};
                this.methodName = this.$route.query.method_name || '';
                this.methodParams = this.$route.query.params && JSON.parse(decodeURIComponent(this.$route.query.params)) || '';
                let loadTimer = setTimeout(() => {
                    $.showIndicator();
                }, 500);
                Promise.all([
                    get_assets_by_ids([this.amount.asset_id]),
                    fetch_account(this.contractName)
                ]).then((results) => {
                    clearTimeout(loadTimer);
                    $.hideIndicator();
                    this.asset = results[0][0];
                    this.asset.amount = (this.amount.amount || 0) / Math.pow(10, this.asset.precision);
                    this.contractAccount = results[1];
                    this.initStep();
                }).catch(ex => {
                    console.error(ex);
                    clearTimeout(loadTimer);
                    $.hideIndicator();
                    let message = ex.message && ex.message.replace(/\'/g, '') || '';
                    if (message.split('gxb-crypto').length > 1) {
                        message = message.split('gxb-crypto')[0];
                        message = message.substring(0, message.length - 1);
                    }
                    this.endContract({code: -1, msg: encodeURIComponent(message)});
                });
            } else {
                if (this.$route.query.version) {
                    let tmpArr = this.$route.query.version.split('v=');
                    if (tmpArr.length > 1) {
                        this.version = tmpArr[0];
                    }
                }
            }
        },
        methods: {
            endContract (params) {
                if ((this.version === '2.0.0') && (this.$route.query.platform === 'ios')) {
                    util.callNativeForContract('endContract', params);
                } else {
                    util.callNative('endContract', params);
                }
            },
            handleTab (index) {
                this.currentTab = index;
            },
            initStep () {
                get_item_native('gxb_contract_remember_pwd').then(pwd => {
                    if (!pwd) {
                        this.$refs.confirm.show();
                    } else {
                        this.pwd = pwd;
                        this.confirmAccount(pwd);
                    }
                }).catch(ex => {
                    this.$refs.confirm.show();
                });
            },
            unlocking (pwd) {
                this.$refs.confirm.unlocked();
                this.confirmAccount(pwd);
            },
            unlockFail () {
                let self = this;
                this.endContract({code: -1, msg: self.$t('unlock.error.invalid_password')});
            },
            confirmAccount (pwd) {
                let self = this;
                this.pwd = pwd;
                if (this.plugin === 'contract') {
                    if (!pwd.trim()) {
                        this.endContract({code: -1, msg: self.$t('unlock.error.invalid_password')});
                        return;
                    }
                    call_contract(this.currentWallet.account, this.contractName, this.methodName, this.methodParams, this.amount, pwd, false).then(res => {
                        let op = res && res.operations && res.operations[0];
                        this.fee = op[1].fee;
                        return get_assets_by_ids([this.fee.asset_id || '1.3.1']);
                    }).then(assets => {
                        this.fee.realAmount = this.fee.amount;
                        this.fee.amount = this.fee.amount / Math.pow(10, assets[0].precision);
                        this.fee.symbol = assets[0].symbol;
                        return fetch_account(this.currentWallet.account);
                    }).then(account => {
                        this.contractData = {
                            fee: {
                                amount: this.fee.realAmount,
                                asset_id: this.fee.asset_id
                            },
                            account: account.id,
                            contract_id: this.contractAccount.id,
                            method_name: this.methodName,
                            data: this.methodParams
                        };
                        this.contractAccount.abi.actions.forEach((item) => {
                            if (item.name == this.methodName) {
                                if (this.amount.amount && item.payable) {
                                    this.contractData.amount = this.amount;
                                }
                            }
                        });
                        this.contractData = JSON.stringify(this.contractData, null, 2);
                        this.unlocked = true;
                    }).catch(ex => {
                        console.error(ex);
                        let message = ex.message && ex.message.replace(/\'/g, '') || '';
                        if (message.split('gxb-crypto').length > 1) {
                            message = message.split('gxb-crypto')[0];
                            message = message.substring(0, message.length - 1);
                        }
                        this.endContract({code: -1, msg: encodeURIComponent(message)});
                    });
                }
                if (this.plugin === 'auth') {
                    this.endContract({code: 1, msg: 'success', data: JSON.stringify(this.currentWallet)});
                }
            },
            handleConfirm () {
                if (this.submiting) {
                    return;
                }
                let loadTimer = setTimeout(() => {
                    $.showIndicator();
                }, 500);
                this.submiting = true;
                call_contract(this.currentWallet.account, this.contractName, this.methodName, this.methodParams, this.amount, this.pwd, true).then(res => {
                    let data = {
                        trx_id: res[0].id,
                        block_num: res[0].block_num
                    };
                    clearTimeout(loadTimer);
                    $.hideIndicator();
                    this.submiting = false;
                    this.endContract({code: 1, msg: 'success', data: JSON.stringify(data)});
                }).catch(ex => {
                    console.error(ex);
                    clearTimeout(loadTimer);
                    $.hideIndicator();
                    let message = ex.message && ex.message.replace(/\'/g, '') || '';
                    if (message.split('gxb-crypto').length > 1) {
                        message = message.split('gxb-crypto')[0];
                        message = message.substring(0, message.length - 1);
                    }
                    this.submiting = false;
                    this.endContract({code: -1, msg: encodeURIComponent(message)});
                });
            },
            handleCancel () {
                this.endContract({code: 0, msg: 'cancel'});
            }
        },
        components: {
            AccountImage,
            PasswordConfirm
        }
    };
</script>
<style scoped lang="scss">
    .page {
        background-color: #fff;
        font-weight: 500;
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
                    border-bottom: 1zpx solid #ddd;
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
            .info-box {
                position: relative;
                width: 100%;
                background: #f9fafa;
                .tab-header {
                    padding: 1rem 1rem 0;
                    .func-name {
                        display: inline-block;
                        font-size: .6rem;
                        padding: .1rem .2rem;
                        border: 1px solid #8c8e93;
                        color: #8c8e93;
                        border-radius: 3px;
                    }
                    .func-total {
                        padding: .5rem 0;
                        font-size: 1rem;
                        font-family: 'Bebas';
                    }
                    .tab-bar {
                        position: relative;
                        width: 100%;
                        display: flex;
                        .tab-bar-item {
                            height: 1.5rem;
                            line-height: 1.5rem;
                            width: 2rem;
                            margin-right: .5rem;
                            text-align: center;
                            font-size: .65rem;
                            color: #8c8e93;
                        }
                        .tab-bar-item.active {
                            color: #000;
                            border-bottom: 2px solid #6699ff;
                        }
                    }
                }
                .tab-container {
                    position: relative;
                    width: 100%;
                    background: #fff;
                    border-top: 1px solid #ddd;
                    border-bottom: 1px solid #ddd;
                    padding: 0 1rem;
                    font-size: .65rem;
                    .loader {
                        position: relative;
                        width: 100%;
                        min-height: 10rem;
                        display: flex;
                        flex-direction: row;
                        justify-content: center;
                        align-items: center;
                        .ball-clip-rotate > div {
                            border-color: #222222;
                        }
                    }
                    .tab-item {
                        position: relative;
                        width: 100%;
                        display: flex;
                        flex-direction: row;
                        justify-content: space-between;
                        align-items: center;
                        border-bottom: 1px solid #ddd;
                        padding: .5rem 0;
                        font-family: 'Bebas';
                        .asset {
                            display: flex;
                            flex-direction: column;
                            justify-content: center;
                            align-items: flex-end;
                            .intro, .edit {
                                font-size: .6rem;
                            }
                        }
                    }
                    .tab-item.fee .edit {
                        color: #6699ff;
                    }
                    .tab-item.total .amount {
                        color: #6699ff;
                    }
                    .tab-item:last-child {
                        border-bottom: none;
                    }

                    .func-type, .hex-data {
                        margin: .5rem 0;
                        color: #8c8e93
                    }
                    .func-type span {
                        color: #000;
                    }
                    .hex-data pre {
                        word-break: break-all;
                        white-space: pre-wrap;
                        background: #f9fafa;
                        padding: .5rem;
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
            .authorize-box {
                position: relative;
                width: 100%;
                .authorize-header {
                    position: relative;
                    width: 100%;
                    height: 1.5rem;
                }
                .authorize-info {
                    .list-block {
                        color: #999;
                        font-size: .65rem;
                        margin-bottom: 0;
                        .highlight {
                            color: #666;
                        }
                        .auth-list {
                            flex-direction: column;
                            .item-auth {
                                padding-right: .75rem;
                                padding-top: .25rem;
                                padding-bottom: .25rem;
                                position: relative;
                                width: 100%;
                                overflow: hidden;
                                box-sizing: border-box;
                                display: flex;
                                justify-content: space-between;
                                align-items: center;
                                .item-auth-before {
                                    width: 1rem;
                                    text-align: center;
                                }
                                .item-auth-after {
                                    flex: 1;
                                }
                            }
                        }
                        .auth-list-title {
                            align-self: flex-start;
                            width: 100%;
                            position: relative;
                            padding: .5rem .25rem .25rem .25rem;
                            &::before {
                                content: '';
                                position: absolute;
                                left: 0;
                                bottom: 0;
                                right: auto;
                                top: 0;
                                height: 1px;
                                width: calc(100% + .75rem);
                                background-color: #e7e7e7;
                                display: block;
                                z-index: 15;
                                -webkit-transform-origin: 50% 100%;
                                transform-origin: 50% 100%;
                            }
                        }
                    }
                    .list-block ul:before {
                        height: 0;
                    }
                }
                .authorize-footer {
                    padding: 0 .75rem;
                    .confirm-tip {
                        position: relative;
                        width: 100%;
                        padding-top: .4rem;
                        padding-bottom: .35rem;
                        min-height: 2.4rem;
                        overflow: hidden;
                        box-sizing: border-box;
                        font-size: .65rem;
                        color: #999;
                        display: flex;
                        align-items: center;
                        .highlight {
                            color: #6699ff;
                        }
                    }
                    .button-reject {
                        position: relative;
                        width: 100%;
                        margin: .75rem 0;
                        font-size: .65rem;
                        text-align: center;
                        color: #6699ff;
                    }
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
