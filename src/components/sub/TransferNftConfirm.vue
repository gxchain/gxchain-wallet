<template>
    <div class="popup popup-transfer-confirm">
        <div class="bar bar-nav normal-nav">
            <h3 class="title">{{$t('nft.confirm_send')}}</h3>
            <a href="javascript:;" class="pull-right icon icon-close close-popup">&times;</a>
        </div>
        <div class="content">
          <div class="text-center">
                #{{param.tokenid}}
            </div>
            <div class="list-block">
                <ul>
                    <li class="item-content">
                        <div class="item-inner">
                            <div class="item-title label">{{$t('transfer.to')}}</div>
                            <div class="item-after">
                                <account-image :account="to" :size='14'></account-image>
                                <span class="account-name">{{to}}</span>
                            </div>
                        </div>
                    </li>
                    <li class="item-content">
                        <div class="item-inner">
                            <div class="item-title label">{{$t('transfer.fee')}}</div>
                            <div class="item-after">
                                <span class="color-danger">{{fee.amount | asset(2)}}</span>&nbsp;{{fee.symbol}}</div>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="content-block button-block">
                <p class="tip-error text-center" v-if="error.transfer">{{error.transfer}}</p>
                <p>
                    <a href="javascript:;" @click="onConfirm" class="button button-gxb">
                        <div class="line-scale-pulse-out" v-if="submitting">
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                        </div>
                        <span v-if="!submitting">{{$t('transfer.send')}}</span>
                    </a>
                </p>
            </div>
        </div>
    </div>
</template>
<script>
    import filters from '@/filters';
    import {
        call_contract
    } from '@/services/WalletService';
    import AccountImage from './AccountImage.vue';

    let defaultData = {
        submitting: false,
        error: {
            transfer: ''
        }
    };

    export default {
        filters,
        data () {
            return $.extend({}, defaultData);
        },
        props: {
            transaction: {
                type: Object
            },
            account: {
                type: String
            },
            fee: {
                type: Object
            },
            to: {
                type: String,
                default: ''
            },
            pwd: {
                type: String
            },
            param: {
                type: Object
            }
        },
        methods: {
            show () {
                this.submitting = false;
                this.error = {
                    transfer: ''
                };
                $.popup($(this.$el));
            },
            onConfirm () {
                if (this.submitting) {
                    return;
                }
                this.submitting = true;
                call_contract(this.account, process.env.nftContract, 'transfer', this.param, 0, this.pwd, true).then(res => {
                    console.log(res);
                    $.closeModal($(this.$el));
                    this.$emit('closeConfirmModal');
                }).catch(ex => {
                    if (ex.message.indexOf('Insufficient Balance') > -1) {
                        if (this.feeType.id !== this.currentAsset.id) {
                            this.error.transfer = this.$t('transfer.error.amount.insufficient_diff_fee');
                        } else {
                            this.error.transfer = this.$t('transfer.error.amount.insufficient_balance');
                        }
                    } else {
                        this.error.transfer = ex.message;
                    }
                    this.submitting = false;
                    console.error(ex);
                });
            }
        },
        components: {
            AccountImage
        }
    };
</script>
<style lang="scss" scoped>
    .asset {
        font-family: bebas;
        font-size: 1.1rem;
        color: #6699ff;
    }

    .bar-nav {
        background: transparent;
        .title {
            font-weight: normal;
            color: #3d3d3b;
        }
        .icon {
            color: #3d3d3b;
        }
    }

    .popup-transfer-confirm {
        max-height: 19.5rem;
        bottom: 0;
        top: initial;
        background: #fff;
        transition-duration: .2s;
    }

    .tip-error {
        word-break: break-word;
    }

    .list-block ul::before {
        height: 0;
    }

    .list-block .item-title.label {
        width: 4.5rem;
    }

    .list-block .account-name {
        padding-left: .5rem;
    }
</style>
