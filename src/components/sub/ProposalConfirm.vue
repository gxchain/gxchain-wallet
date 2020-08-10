<template>
    <div class="popup popup-vote-confirm">
        <div class="bar bar-nav normal-nav">
            <h3 class="title">
                {{$t('staking.income.confirmTitle')}}
            </h3>
            <a href="javascript:;" class="pull-right icon icon-close close-popup" @click="cancel">&times;</a>
        </div>
        <div class="content">
            <div class="text-center tips">
                {{$t('proposals.update_proposals')}}
            </div>
            <div class="list-block">
                <ul>
                  <li class="item-content">
                        <div class="item-inner">
                            <div class="item-title label">{{$t('proposals.payee_account')}}</div>
                            <div class="item-after">
                                <span class="account-name">{{payee}}</span>
                            </div>
                        </div>
                    </li>
                    <li class="item-content" v-if="proposalObject.active_approvals_to_add && proposalObject.active_approvals_to_add.length>0">
                        <div class="item-inner">
                            <div class="item-title label"> {{$t('proposals.active_approvals_to_add')}}</div>
                            <div class="item-after">
                                <span class="account-name">{{formatAccount(proposalObject.active_approvals_to_add).join(',')}}</span>
                            </div>
                        </div>
                    </li>
                    <li class="item-content" v-if="proposalObject.active_approvals_to_remove && proposalObject.active_approvals_to_remove.length>0">
                        <div class="item-inner">
                            <div class="item-title label"> {{$t('proposals.active_approvals_to_remove')}}</div>
                            <div class="item-after">
                                <span class="account-name">{{formatAccount(proposalObject.active_approvals_to_remove).join(',')}}</span>
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

    let defaultData = {
        submitting: false
    };

    export default {
        filters,
        data () {
            return $.extend({}, defaultData);
        },
        props: {
            account: {
                type: String
            },
            fee: {
                type: Object
            },
            payee: {
                type: String
            },
            proposalObject: {
                type: Object
            },
            pwd: {
                type: String
            },
            accountIds: {
                type: Object
            }
        },
        methods: {
            formatAccount (arr) {
                let accountArr = [];
                arr.forEach(item => {
                    accountArr.push(this.accountIds[arr]);
                });
                return accountArr;
            },
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
        }
    };
</script>
<style lang="scss" scoped>
    .tips{
        color:#999;
        font-size: .7rem;
    }
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
        width: 7.5rem;
    }

    .list-block .account-name {
        padding-left: .5rem;
    }
</style>
