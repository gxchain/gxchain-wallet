<template>
    <div class="popup popup-vote-confirm">
        <div class="bar bar-nav normal-nav">
            <h3 class="title">
                {{ confirmType == 1 ? $t('node_vote.confirm.title') : $t('node_vote.confirm.title2') }}
            </h3>
            <a href="javascript:;" class="pull-right icon icon-close close-popup" @click="cancel">&times;</a>
        </div>
        <div class="content">
            <div class="text-center">
                {{fee.symbol}}&nbsp;
                <span class="asset">{{fee.amount | asset(2)}}</span>
            </div>
            <div class="list-block">
                <ul>
                     <li class="item-content">
                        <div class="item-inner">
                            <div class="item-title label">{{$t('node_vote.confirm.account')}}</div>
                            <div class="item-after">
                                <account-image :account="account" :size='14'></account-image>
                                <span class="account-name">{{account}}</span>
                            </div>
                        </div>
                    </li>
                    <li class="item-content">
                        <div class="item-inner">
                            <div class="item-title label">{{$t('node_vote.confirm.proxy_account')}}</div>
                            <div class="item-after">
                                <account-image :account="proxyAccount" :size='14'></account-image>
                                <span class="account-name">{{proxyAccount}}</span>
                            </div>
                        </div>
                    </li>
                    <li class="item-content" v-if="confirmType == 1">
                        <div class="item-inner">
                            <div class="item-title label">{{$t('node_vote.confirm.selected_node')}}</div>
                            <div class="item-after" style="max-height: 100%">
                                <pre class="selected-votes">{{voteAccounts}}</pre>
                            </div>
                        </div>
                    </li>
                    <li class="item-content">
                        <div class="item-inner">
                            <div class="item-title label">{{$t('node_vote.confirm.fee')}}</div>
                            <div class="item-after">
                                <span class="color-danger">{{fee.amount | asset(2)}}</span>&nbsp;{{fee.symbol}}
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="content-block button-block">
                <p>
                    <a href="javascript:;" @click="onConfirm" class="button button-gxb">
                        <div class="line-scale-pulse-out" v-if="submitting">
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                        </div>
                        <span v-if="!submitting">{{$t('node_vote.confirm.btn_confirm')}}</span>
                    </a>
                </p>
            </div>
        </div>
    </div>
</template>
<script>
    import filters from '@/filters';
    import AccountImage from './AccountImage.vue';

    let defaultData = {
        submitting: false
    };

    export default {
        filters,
        data () {
            return $.extend({}, defaultData);
        },
        props: {
            confirmType: {
                type: Number
            },
            account: {
                type: String
            },
            fee: {
                type: Object
            },
            proxyAccount: {
                type: String
            },
            voteAccounts: {
                type: String
            },
            pwd: {
                type: String
            }
        },
        methods: {
            show () {
                this.submitting = false;
                $.popup($(this.$el));
            },
            onConfirm () {
                if (this.submitting) {
                    return;
                }
                this.submitting = true;
                this.$emit('confirm');
            },
            cancel () {
                this.submitting = false;
                $.closeModal($(this.$el));
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

    .popup-vote-confirm {
        max-height: 25rem;
        bottom: 0;
        top: initial;
        background: #fff;
        transition-duration: .2s;
    }
    .selected-votes {
        max-height: 7rem;
        width: 10rem;
        margin: 0;
        white-space: pre-wrap;
        word-wrap: break-word;
        text-align: right;
    }

    .tip-error {
        word-break: break-all;
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
