<template>
  <div class="page-group">
        <div class="page" id="page-income">
            <header class="bar bar-nav">
                <h3 class="title">{{$t('proposals.title')}}</h3>
                <router-link :to="link('/')" replace class="icon icon-left"></router-link>
            </header>
            <div class="content">
                <div class="center-content">
                  <div class="list-block" v-for="(item, index) in proposals" :key="index">
                    <ul>
                        <li class="item-content" v-if="item.proposal_operation_type =='transfer'">
                            <div class="item-inner">
                              <div class="item-title">{{$t('proposals.item-title')}}</div>
                              <div class="item-after">{{getTransferMsg(item)}}</div>
                            </div>
                        </li>
                        <li class="item-content" v-else-if="item.proposal_operation_type =='committee_member_update_global_parameters'">
                            <div class="item-inner">
                              <div class="item-title">{{$t('proposals.item-title')}}</div>
                              <div class="item-after">{{$t('proposals.committee_member_update_global_parameters', {account: 'committee-account'})}}</div>
                            </div>
                        </li>
                        <li class="item-content" v-else>
                            <div class="item-inner">
                              <div class="item-title">{{$t('proposals.item-title')}}</div>
                              <div class="item-after">{{$t('proposals.createProposal')}}</div>
                            </div>
                        </li>
                        <li class="item-content">
                            <div class="item-inner">
                              <div class="item-title">{{$t('proposals.fees')}}</div>
                              <div class="item-after">{{item.proposed_transaction.operations[0][1].fee.amount/100000 | asset(2)}} GXC</div>
                            </div>
                        </li>
                        <li class="item-content" v-if="item.proposal_operation_type == 'transfer' || item.proposal_operation_type == 'committee_member_update_global_parameters'">
                            <div class="item-inner">
                              <div class="item-title">{{$t('proposals.status')}}</div>
                              <div class="item-after item-status-wrap">
                                  <div v-if="item.proposal_active_account.length > 1">
                                      <span>({{item.proposal_active_percent}}% / 100%) </span><span >{{item.proposal_required_account}}</span>
                                 </div>
                                  <div class="item-status" v-for="subItem in item.proposal_active_account">
                                      <span class="item-status-left"><span v-if="item.proposal_active_account.length > 1">({{subItem.percent}}%)</span> {{subItem.account}}</span> 
                                      <span>
                                            <i class="gxicon gxicon-success1" v-if="subItem.isOk"></i>
                                            <i class="gxicon gxicon-cancel" v-if="!subItem.isOk"></i>
                                      </span>
                                  </div>
                              </div>
                            </div>
                        </li>
                        <li class="item-content">
                            <div class="item-inner">
                              <div class="item-title">{{$t('proposals.expired-date')}}</div>
                              <div class="item-after">{{new Date(new Date(item.proposed_transaction.expiration+'Z').getTime()).format('yyyy-MM-dd hh:mm:ss')}}</div>
                            </div>
                        </li>
                        <li>
                          <div class="content-block btn-wrap">
                              <div class="row" v-if="item.proposal_operation_type =='transfer'">
                                  <div class="col-100"><a href="javascript:;" class="button button-gxb " @click="handleApproval(item)">{{$t('proposals.approval_btn')}}</a></div>
                              </div>
                              <div class="row" v-else-if="item.proposal_operation_type =='committee_member_update_global_parameters'">
                                  <div class="col-50" v-if="canReject(item)"><a href="javascript:;" class="button button-gxb" @click="handleReject(item)">{{$t('proposals.reject')}}</a></div>
                                  <div :class="{'col-50':canReject(item),  'col-100': !canReject(item)}"><a href="javascript:;" class="button button-gxb" @click="handleApproval(item)">{{$t('proposals.approval_btn')}}</a></div>
                              </div>
                              <div class="row" v-else>
                                  <div class="col-100"><a href="javascript:;" class="button button-gxb " @click="handleViewApproval(item)">{{$t('proposals.approval_view')}}</a></div>
                              </div>
                          </div>
                        </li>
                    </ul>
                  </div>
                  <p class="no-reocrd text-center" v-if="proposals.length==0&&loaded||emptyList">
                        <span class="icon icon-edit"></span>
                        {{$t('node_vote.index.no_record')}}
                    </p>
                    <div class="line-scale-pulse-out" v-if="!loaded">
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                </div>
                
            </div>
        </div>
        <password-confirm ref="unlock" @unlocking="unlocking"></password-confirm>
        <proposal-modal ref="proposalModal" :actionType="actionType" :activeAccountName="activeAccountName"  :account="wallets"  :proposal="currentProposal" :requiredAccount="requiredAccount" :accountMap="accountMap"  @onApproval="onApproval"></proposal-modal>
        <proposal-confirm ref="confirm"  :account="currentWallet.account" :pwd="password" :payee="payee" :proposalObject="proposalObject" :fee="fee" :accountIds="account"   @confirm="confirmIncome"></proposal-confirm>
        <proposal-view-modal ref="proposalViewModal"  :proposal="currentProposal"  @onApproval="onSubmit"></proposal-view-modal>
    </div>
</template>

<script>
import { get_objects, get_wallets, get_wallet_index, fetch_full_account, get_assets_by_ids, proposalAction, fetch_account } from '@/services/WalletService';
import PasswordConfirm from '@/components/sub/PasswordConfirm.vue';
import ProposalConfirm from '@/components/sub/ProposalConfirm.vue';
import ProposalModal from '@/components/sub/ProposalModal.vue';
import ProposalViewModal from '@/components/sub/ProposalViewModal.vue';
import filters from '@/filters';
import util from '@/common/util';
import { ChainTypes } from 'gxbjs/es';
import cloneDeep from 'lodash/cloneDeep';

export default {
    filters,
    components: {
        PasswordConfirm,
        ProposalConfirm,
        ProposalModal,
        ProposalViewModal
    },
    data () {
        let wallets = get_wallets();
        return {
            loaded: false,
            vestList: [],
            wallets: wallets,
            currentWallet: wallets[get_wallet_index()],
            secondsPerDay: 60 * 60 * 24,
            claimAll: false,
            password: '',
            submitting: false,
            currentVest: '',
            emptyList: true,
            incomeAmount: 0,
            fee: {
                amount: 0,
                symbol: 'GXC'
            },
            proposals: [],
            operationsMap: [],
            items: {},
            account: {},
            assetItems: {},
            assetAccount: {},
            currentProposal: {},
            requiredAccount: [],
            accountMap: {},
            currentType: '',
            proposalObject: {},
            proposal_operation_type: '',
            activeAuthAccount: [],
            activeAccountName: '',
            activeAccountPercent: 0,
            actionType: '',
            payee: ''
        };
    },
    mounted () {
        $.init();
        this.loadData();
    },
    methods: {
        async loadData () {
            fetch_full_account(this.currentWallet.account).then(res => {
                let proposals = res[0][1].proposals.length > 0 ? res[0][1].proposals : [];
                if (proposals.length > 0) {
                    this.emptyList = false;
                }
                this.operationsMap = Object.keys(ChainTypes.operations);
                this.formatted_asset('1.3.1');
                this.getProposalObject().then(account => {
                    let committeeAccount = account[1].account.active.account_auths;
                    let flag = false;
                    for (let i = 0; i < committeeAccount.length; i++) {
                        if (committeeAccount[i][0] == res[0][1].account.id) {
                            flag = true;
                            break;
                        }
                    }
                    if (flag) {
                        let _proposals = account[1].proposals.length > 0 ? account[1].proposals : [];
                        if (_proposals.length > 0) {
                            this.emptyList = false;
                        }
                        Promise.all([
                            this.handleAccountAuth(_proposals),
                            this.handleCommonAccount(proposals)
                        ]).then(results => {
                            this.proposals = results[0].concat(results[1]);
                        });
                    } else {
                        this.handleCommonAccount(proposals).then(result => {
                            this.proposals = result;
                        });
                    }
                });

                this.loaded = true;
            });
        },
        canReject (proposal) {
            return (proposal.available_active_approvals.length || proposal.available_owner_approvals.length);
        },
        async getProposalObject () {
            let committee = await fetch_full_account('committee-account').then(res => {
                return res[0];
            });
            return committee;
        },
        async handleCommonAccount (proposals) {
            for (const proposal of proposals) {
                let proposal_operation_type = this.operationsMap[this.getProposalsOperations(proposal)[0][0]];
                proposal['proposal_operation_type'] = proposal_operation_type;
                let _item = proposal.required_active_approvals[0];
                await get_objects([_item]).then(res => {
                    let _name = res[0].name;
                    let _available = [];
                    proposal['required_active_accountName'] = _name;
                    _available.push({
                        id: _item,
                        account: _name,
                        percent: 100,
                        isOk: false
                    });
                    proposal['proposal_active_account'] = _available;
                });
            }
            return proposals;
        },
        async handleAccountAuth (proposals, common) {
            let auths = await get_objects(['1.2.0']).then(accounts => {
                return accounts[0];
            });
            this.activeAuthAccount = await this.getActiveAccount(auths.active);
            this.activeAccountName = auths.name;
            proposals.forEach(item => {
                let proposal_operation_type = this.operationsMap[this.getProposalsOperations(item)[0][0]];
                let newAvailable = [];
                let authPercent = 0;
                item['proposal_operation_type'] = proposal_operation_type;
                item['proposal_required_account'] = auths.name;
                if (item.available_active_approvals.length > 0) {
                    item.available_active_approvals.forEach(available => {
                        newAvailable = this.activeAuthAccount.map(auth => {
                            if (auth.id == available) {
                                authPercent += auth.percent;
                            }

                            return auth.id == available ? Object.assign(auth, {isOk: true}) : auth;
                        });
                    });
                } else {
                    newAvailable = this.activeAuthAccount;
                }

                item['proposal_active_percent'] = authPercent;
                item['proposal_active_account'] = newAvailable;
            });
            return proposals;
        },
        async getActiveAccount (actives) {
            let items = actives.account_auths;
            let _activeAuthAccount = [];
            for (const item of items) {
                let _item = item[0];
                let obj = {};
                await get_objects([_item]).then(res => {
                    let _name = res[0].name;
                    this.account[_item] = res[0].name;
                    this.accountMap[_name] = _item;
                    obj = {
                        id: _item,
                        account: res[0].name,
                        percent: util.get_percentage(item[1], actives.weight_threshold),
                        isOk: false
                    };
                    _activeAuthAccount.push(obj);
                });
            }
            return _activeAuthAccount;
        },
        getAvailableAccount (proposals) {
            return proposals ? proposals.available_active_approvals : [];
        },
        getProposalsOperations (proposals) {
            return proposals ? proposals.proposed_transaction.operations : [];
        },
        formatted_account (id) {
            let self = this;
            if (this.items[id]) {
                return this.account[id];
            }
            this.items[id] = true;
            get_objects([id]).then((accounts) => {
                let account = accounts[0];
                self.$set(self.account, id, account.name);
            }).catch(ex => {
                console.error(ex);
            });
            return this.account[id];
        },
        formatted_asset (id) {
            let self = this;
            if (this.assetItems[id]) {
                return this.assetAccount[id];
            }
            this.assetItems[id] = true;
            get_assets_by_ids([id]).then((assets) => {
                let asset = assets[0];
                self.$set(self.assetAccount, id, asset.symbol);
            }).catch(ex => {
                console.error(ex);
            });
            return this.assetAccount[id];
        },
        getTransferMsg (item) {
            let _operations = item.proposed_transaction.operations[0][1];
            let param = {
                from: this.formatted_account(_operations.from),
                amount: `${_operations.amount.amount / 100000} ${this.formatted_asset(_operations.amount.asset_id)}`,
                to: this.formatted_account(_operations.to)
            };
            return this.$t('proposals.transfer', param);
        },
        handleReject (item) {
            this.currentProposal = cloneDeep(item);
            this.requiredAccount = [];
            let type = this.currentProposal.required_active_approvals.length ? 'active' : 'owner';
            this.currentType = type;
            this.actionType = 'reject';

            if (item.available_active_approvals.length > 0) {
                item.available_active_approvals.forEach(available => {
                    let _account = this.formatted_account(available);
                    this.requiredAccount.push(_account);
                    this.accountMap[_account] = available;
                });
            }
            this.$refs.proposalModal.show();
        },
        handleApproval (item) {
            this.currentProposal = cloneDeep(item);
            this.requiredAccount = [];
            this.actionType = 'approval';
            let type = this.currentProposal.required_active_approvals.length ? 'active' : 'owner';
            let available = this.currentProposal[`available_${type}_approvals`];
            let required = this.currentProposal[`required_${type}_approvals`];
            let account = required.concat(available);
            this.currentType = type;
            if (this.currentProposal.proposal_operation_type === 'committee_member_update_global_parameters') {
                let _requiredAccount = [];
                this.currentProposal.proposal_active_account.forEach(item => {
                    if (item.isOk == false) {
                        _requiredAccount.push(item.account);
                    }
                });
                this.requiredAccount = _requiredAccount;
            } else {
                account.forEach(item => {
                    let _account = this.formatted_account(item);
                    this.requiredAccount.push(_account);
                    this.accountMap[_account] = item;
                });
            }

            this.$refs.proposalModal.show();
        },
        handleViewApproval (item) {
            this.currentProposal = item.proposed_transaction.operations[0][1];
            this.$refs.proposalViewModal.show();
        },
        onSubmit () {
            this.$refs.proposalViewModal.cancel();
        },
        onApproval (payee, approval) {
            let isAdd = this.actionType == 'approval';
            this.payee = payee;
            fetch_account(payee).then(res => {
                let proposal = {
                    fee_paying_account: res.id,
                    proposal: this.currentProposal.id,
                    active_approvals_to_add: [],
                    active_approvals_to_remove: [],
                    owner_approvals_to_add: [],
                    owner_approvals_to_remove: [],
                    key_approvals_to_add: [],
                    key_approvals_to_remove: []
                };
                let hasValue = this.currentProposal[`available_${this.currentType}_approvals`].indexOf(this.accountMap[approval]) > -1;
                if ((!hasValue && isAdd) || (hasValue && !isAdd)) {
                    let _account = this.accountMap[approval];
                    if (this.actionType === 'approval') {
                        proposal[`${this.currentType}_approvals_to_add`] = [_account];
                    } else if (this.actionType === 'reject') {
                        proposal[`${this.currentType}_approvals_to_remove`] = [_account];
                    }
                }
                this.proposalObject = proposal;
                this.$refs.proposalModal.cancel();
                this.$refs.unlock.show();
            });
        },
        unlocking (pwd) {
            if (!pwd.trim()) {
                $.toast(this.$t('unlock.error.invalid_password'));
                this.$refs.unlock.unlocked();
                return;
            }
            this.password = pwd;
            this.submitting = true;
            proposalAction('GXC', this.currentWallet.account, this.proposalObject, this.password, false).then(res => {
                this.submitting = false;
                this.$refs.unlock.unlocked();
                this.fee = res.operations[0][1].fee;
                return Promise.all([
                    get_assets_by_ids([this.fee.asset_id])
                ]);
            }).then(results => {
                this.fee.symbol = results[0][0].symbol;
                this.fee.amount = this.fee.amount / Math.pow(10, results[0][0].precision);
                // this.incomeAmount = this.claimAll ? this.currentVest.balance.amount / 100000 : this.getAvailableCoinAmount(this.currentVest);
                this.$refs.confirm.show();
            }).catch(ex => {
                console.error(ex);
                let message = '';
                if (ex.message.indexOf('Insufficient Balance') > -1 || ex.message.indexOf('account balance not enough') > -1) {
                    message = this.$t('staking.error.insufficient_balance');
                } else {
                    message = ex.message;
                }
                this.submitting = false;
                this.$refs.unlock.unlocked();
                $.toast(message);
            });
        },
        confirmIncome () {
            if (this.submitting) {
                return;
            }
            this.submitting = true;
            proposalAction('GXC', this.currentWallet.account, this.proposalObject, this.password, true).then(res => {
                this.submitting = false;
                this.$refs.confirm.cancel();
                this.claimAll = '';
                $.toast(this.$t('proposals.update_proposals_success'));
                this.loadData();
            }).catch(ex => {
                console.error(ex);
                let message = '';
                if (ex.message.indexOf('Insufficient Balance') > -1 || ex.message.indexOf('account balance not enough') > -1) {
                    message = this.$t('staking.error.insufficient_balance');
                } else {
                    message = ex.message;
                }
                this.submitting = false;
                $.toast(message);
            });
        }
    }
};
</script>

<style lang="scss" scoped>
.pull-right {
    font-size: .65rem;
    color: #6699ff;
}

.bar .button-nav.pull-right {
    margin-right: 0;
}
.bar-staking{
    bottom: 2.5rem;
}
.page {
    background-color: #fff;
}

.content {
    padding-bottom: 2.5rem;
}
.native-ios-x .content {
    padding-bottom: 3.7rem;
}
.list-block {
    margin: .6rem 0;
    font-size: .65rem;
    .button-big{
      font-size: .65rem;
      line-height: 1.4rem;
      height: 1.4rem;
      width: 80%;
      margin: 0 auto;
      border-radius: 1.25rem;
    }
}
.line-scale-pulse-out {
        margin-top: 2.5rem;
        text-align: center;
    }
    .line-scale-pulse-out > div {
        background: #6699ff;
        width: 2px;
        height: 18px;

    }
.btn-wrap {
  margin: 0;
  padding: .75rem;
}
.item-status-wrap{
    display: block;
    max-height: none;
}
.item-status{
    display: flex;
    justify-content: space-between;
    .item-status-left{
        padding-right:.1rem
    }
}
</style>