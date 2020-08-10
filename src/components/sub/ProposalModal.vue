<template>
    <div class="popup popup-vote-confirm">
        <div class="bar bar-nav normal-nav">
            <h3 class="title" v-if="actionType=='approval'">
                {{$t('proposals.add_approval')}}
            </h3>
            <h3 class="title" v-if="actionType=='reject'">
                {{$t('proposals.remove_approval')}}
            </h3>
            <a href="javascript:;" class="pull-right icon icon-close close-popup" @click="cancel">&times;</a>
        </div>
        <div class="content">
            <div class="list-block">
                <ul>
                    <li class="item-content">
                        <div class="item-inner">
                            <div class="item-title label">{{$t('proposals.payee_account')}}</div>
                            <div class="item-input">
                                <select v-model="currentPayAccount">
                                    <option value='' selected="selected">{{$t('proposals.please_select_account')}}</option>
                                    <option v-for="(item, index) in account" :key="index" :value="item.account"  >{{item.account}}</option>
                                </select>
                            </div>
                        </div>
                    </li>
                    <li class="item-content">
                        <div class="item-inner">
                            <div class="item-title label">  {{actionType=='approval' ? $t('proposals.approval_to_add') : $t('proposals.approval_to_remove')}}</div>
                            <div class="item-input">
                                <select v-model="currentApprovalAccount" @change="handleChangeApproval">
                                    <option value='' selected="selected">{{$t('proposals.please_select_account')}}</option>
                                    <option v-for="(item, index) in requiredAccount" :key="index" :value="item"  >{{item}}</option>
                                </select>
                            </div>
                        </div>
                    </li>
                    <li class="item-content">
                            <div class="item-inner">
                              <div class="item-title label">{{$t('proposals.status')}}</div>
                              <div class="item-after item-status-wrap">
                                  <div v-if="proposal.proposal_active_account&&proposal.proposal_active_account.length > 1"> 
                                      <span class="proposal_percent">({{proposal.proposal_active_percent}}% / 100%)</span> <span v-if="activeAccountName">{{activeAccountName}}</span>
                                  </div>
                                  <div class="item-status" v-for="subItem in proposal.proposal_active_account">
                                      <span><span v-if="proposal.proposal_active_account&&proposal.proposal_active_account.length > 1">({{subItem.percent}}%)</span> {{subItem.account}}</span>
                                      <span>
                                            <i class="gxicon gxicon-success1" v-if="subItem.isOk"></i>
                                            <i class="gxicon gxicon-cancel" v-if="!subItem.isOk"></i>
                                      </span>
                                  </div>
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

    export default {
        filters,
        data () {
            return {
                submitting: false,
                currentPayAccount: '',
                currentApprovalAccount: ''
            };
        },
        props: {
            account: {
                type: Array
            },
            requiredAccount: {
                type: Array
            },
            accountMap: {
                type: Object
            },
            proposal: {
                type: Object
            },
            fee: {
                type: Object
            },
            pwd: {
                type: String
            },
            activeAccountName: {
                type: String
            },
            actionType: {
                type: String
            }
        },
        methods: {
            show () {
                this.submitting = false;
                this.currentPayAccount = '';
                this.currentApprovalAccount = '';
                $.popup($(this.$el));
            },
            handleChangeApproval () {
                let activeAccount = this.proposal.proposal_active_account;
                let _percent = 0;
                console.log(this.actionType);
                if (this.proposal.available_active_approvals.length > 0) {
                    this.proposal.available_active_approvals.forEach(available => {
                        activeAccount.forEach(auth => {
                            if (auth.id == available) {
                                auth.isOk = true;
                                _percent += auth.percent;
                            } else {
                                auth.isOk = false;
                            }
                        });
                    });
                } else {
                    activeAccount.forEach(auth => {
                        auth.isOk = false;
                    });
                }
                for (let i = 0; i < activeAccount.length; i++) {
                    if (activeAccount[i].account == this.currentApprovalAccount) {
                        if (this.actionType === 'reject') {
                            activeAccount[i].isOk = false;
                            _percent -= activeAccount[i].percent;
                        } else {
                            activeAccount[i].isOk = true;
                            _percent += activeAccount[i].percent;
                        }
    
                        // this.proposal.proposal_active_account[i].isOk = true;
                    }
                }
                this.proposal.proposal_active_percent = _percent;
            },
            onConfirm () {
                if (!this.currentPayAccount) {
                    $.toast(this.$t('proposals.please_select_account'));
                    return;
                }
                if (!this.currentApprovalAccount) {
                    $.toast(this.$t('proposals.please_select_account'));
                    return;
                }
                if (this.submitting) {
                    return;
                }
                this.submitting = true;
                this.$emit('onApproval', this.currentPayAccount, this.currentApprovalAccount);
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
        max-height: 27rem;
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
        width: 5.8rem;
    }

    .list-block .account-name {
        padding-left: .5rem;
    }
    .list-block select{
        font-size: .65rem;
    }
    .item-status-wrap{
        display: block;
        max-height: none;
        font-size: .65rem;
    }
    .item-status{
        display: flex;
        justify-content: space-between;
    }
    .proposal_percent{
        min-width: 5rem;
        display: inline-block;
    }
</style>
