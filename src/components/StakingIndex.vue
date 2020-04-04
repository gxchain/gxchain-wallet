<template>
    <div class="page-group">
        <div class="page" id="page-node-vote">
            <header class="bar bar-nav">
                <h3 class="title">{{$t('staking.title')}}</h3>
                <a class="pull-right icon account-switch" v-if="wallets&&wallets.length>1">
                {{$t('trade_history.switch')}}
                    <select @change="switchWallet">
                        <option v-for="(wallet,i) in wallets" :key="i" :value="i" :selected="i==currentWalletIndex">{{wallet.account}}
                        </option>
                    </select>
                </a>
            </header>
            <wallet-tab></wallet-tab>
            <div class="content pull-to-refresh-content">
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
                <div class="tip-info text-center">
                    {{$t('trade_history.currentAccount', {account: currentWallet.account})}}
                </div>
                <div class="tab-nav">
                    <div :class="tabIndex === 'tab-container1' ? 'tab-nav-item active' : 'tab-nav-item'" @click="tabIndex = 'tab-container1'">{{$t('node_vote.tab.tab1')}}</div>
                    <div :class="tabIndex === 'tab-container2' ? 'tab-nav-item active' : 'tab-nav-item'" @click="tabIndex = 'tab-container2'">{{$t('node_vote.index.records')}}</div>
                </div>
                <div class="tab-container">
                    <gxb-tab-container v-model="tabIndex">
                        <gxb-tab-container-item id="tab-container1">
                            <div class="content-block tips">
                                <p>{{$t('node_vote.index.intro')}}</p>
                                <p class="proxy-tip" v-if="isProxyed">{{$t('node_vote.index.proxy_tip')}}</p>
                            </div>
                            <div class="content-block-title">
                                <div class="left">{{$t('node_vote.index.name')}}</div>
                                <div class="right">{{$t('node_vote.index.tips')}} </div>
                            </div>
                            <div class="list-block accounts" v-if="accounts.length>0&&loaded">
                                <div class="gxb-checklist">
                                    <gxb-cell v-for="(option, index) in accounts" :key="index">
                                        <label class="account-item gxb-checklist__label" slot="title">
                                            <div class="account-item-left">
                                                <div class="account-avatar" v-if="option.logo">
                                                    <img :src="option.logo" class="logo">
                                                </div>
                                                <div class="account-avatar" v-else>
                                                    <account-image :size="15" :account="option.witness_account" slot="left"></account-image>
                                                </div>
                                                <div class="account-info">
                                                    <div class="account-name">{{index + 1}}. {{option.name}}</div>
                                                    <div class="account-url">{{option.nodeName}}</div>
                                                </div>
                                            </div>
                                            <div>
                                                <div class="account-item-center"><span>{{$t('node_vote.index.vote_num_weight')}}: {{parseInt(option.total_vote_weights / 100000)}}</span></div>
                                                <div class="account-item-center account-commision">{{$t('staking.node_rate')}}: {{parseInt(option.commission_rate / 10)}}%</div>
                                            </div>
                                            
                                            <div class="account-item-right" v-if="!isProxyed">
                                                <div class="gxb-checkbox is-right">
                                                    <input class="gxb-checkbox__input"
                                                        type="radio"
                                                        v-model="currentValue"
                                                        :value="option.vote_id || option">
                                                    <span class="gxb-checkbox__core"></span>
                                                </div>
                                            </div>
                                        </label>
                                    </gxb-cell>
                                </div>
                            </div>
                            <p class="no-reocrd text-center" v-if="accounts.length==0&&loaded">
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
                        </gxb-tab-container-item>
                        <gxb-tab-container-item id="tab-container2">
                            <div class="content-block tips">
                            </div>
                            <div class="list-block accounts">
                                <div class="gxb-checklist">
                                        <gxb-cell v-for="(item, index) in stakingList" :key="index">
                                          <label class="account-item gxb-checklist__label" slot="title">
                                              <div class="account-item-left account-history-item-left">
                                                  <div class="account-info">
                                                      <div class="account-name staking-name">{{$t('staking.staking_for_node')}}{{item.name}}</div>
                                                      <div class="account-time">{{new Date(new Date(item.create_date_time + 'Z').getTime()).format('yyyy-MM-dd hh:mm:ss')}}</div>
                                                  </div>
                                                  <div class="staking-days">
                                                    {{ item.staking_days < 30 ? $tc('loyalty_program.day', item.staking_days, {
                                                            day: item.staking_days
                                                        }) : $tc('loyalty_program.month', item.staking_days / 30, {
                                                            month: item.staking_days / 30
                                                        }) 
                                                    }}
                                                  </div>
                                              </div>
                                              <div class="account-item-center">{{item.amount.amount/100000}} 
                                                GXC
                                              </div>
                                              <div class="account-item-right" >
                                                  <div class="gxb-checkbox is-right">
                                                      <input class="gxb-checkbox__input"
                                                          type="radio"
                                                          v-model="currentStakingValue"
                                                          :value="item">
                                                      <span class="gxb-checkbox__core"></span>
                                                  </div>
                                              </div>
                                          </label>
                                        </gxb-cell>
                                        <p class="no-reocrd text-center" v-if="stakingList.length==0&&loaded">
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
                            <div class="content-block">
                                <div class="row">
                                    <div class="col-50"><a href="#" class="button button-big button-fill " :class="{'disabled':isStakingValid(currentStakingValue)}" @click="staking_claim">{{$t('staking.staking_claim')}}</a></div>
                                    <div class="col-50"><a href="#" class="button button-big button-fill "  :class="{'disabled':isStakingUpdateValid(currentStakingValue)}"  @click="onUpdateStaking">{{$t('staking.staking_update')}}</a></div>
                                </div>
                            </div>
                        </gxb-tab-container-item>
                    </gxb-tab-container>
                </div>
            </div>
            <nav class="bar bar-tab bar-staking" v-show="tabIndex === 'tab-container1' && loaded">
                <div class="tab-item tab-vote" v-if="!isProxyed" :class="{'disabled': !selected}" @click="showConfirm(1)">
                    <div class="tip1">{{$t('node_vote.index.btn_vote')}}</div>
                </div>
            </nav>
            
        </div>
        <password-confirm ref="unlock" @unlocking="unlocking"></password-confirm>
        <staking-confirm ref="confirm1" @closeModal="onCancel" @onStakingConfirm="onStakingConfirm" :programList="programList" :balance="currentBalance" :stakingFee="stakingFee" :minStakingAmount="min_staking_amount" :show='showStakingConfirm' ></staking-confirm>
        <staking-update ref="confirm2" @onCancel="onCancelUpdate()" @onUpdateStakingConfirm="onUpdateStakingConfirm" :accounts="accounts" :stakingInfo="stakingInfo"  :stakingFee="stakingFee" :show='showUpdateModel' ></staking-update>
        <staking-claim ref="confirm3" @onCancel="onCancelClaim()" @onClaimStakingConfirm="onClaimStakingConfirm"  :stakingInfo="stakingInfo" :show='showClaimModel'  :stakingFee="stakingFee"></staking-claim>

    </div>
</template>

<script>
    import {
        get_objects,
        fetch_account,
        get_trust_nodes,
        get_wallet_index,
        get_wallets,
        get_nodes_detail,
        stakingCreate,
        get_staking_object,
        stakingUpdate,
        stakingClaim,
        fetch_account_balance,
        get_staking_fee,
        set_wallet_index
    } from '@/services/WalletService';
    import sortBy from 'lodash/sortBy';
    import AccountImage from '@/components/sub/AccountImage.vue';
    import PasswordConfirm from '@/components/sub/PasswordConfirm.vue';
    import VoteConfirm from '@/components/sub/VoteConfirm.vue';
    import StakingConfirm from '@/components/sub/StakingConfirm.vue';
    import StakingUpdate from '@/components/sub/StakingUpdate.vue';
    import StakingClaim from '@/components/sub/StakingClaim.vue';
    import filters from '@/filters';
    import find from 'lodash/find';
    import WalletTab from './sub/WalletTab';

    export default {
        filters,
        data () {
            let wallets = get_wallets();
            return {
                loaded: false,
                isFirst: true,
                wallets: get_wallets(),
                selected: false,
                submitting: false,
                tabIndex: 'tab-container1',
                accounts: [],
                selected_accounts: '',
                currentValue: '',
                currentWallet: wallets[get_wallet_index()],
                fee: {
                    amount: 0,
                    symbol: 'GXC'
                },
                proxyAccount: {
                    id: '1.2.5',
                    name: ''
                },
                confirmProxyAccount: '',
                validProxyAccount: false,
                confirmType: 1,
                isProxyed: false,
                isProxyCanRmoved: false,
                voteAccountsStr: '',
                password: '',
                error: {
                    account: ''
                },
                showStakingConfirm: false,
                programList: [],
                terms: [],
                stakingList: [],
                currentStakingValue: '',
                showUpdateModel: false,
                updateNode: [],
                stakingInfo: {},
                showClaimModel: false,
                currentBalance: {},
                stakingFee: {},
                max_staking_count: 10,
                currentType: '',
                min_staking_amount: 100000,
                currentWalletIndex: get_wallet_index(),
                showOldVotes: false,
                staking_mode_on: false
            };
        },
        components: {
            AccountImage,
            PasswordConfirm,
            VoteConfirm,
            StakingConfirm,
            StakingUpdate,
            StakingClaim,
            WalletTab
        },
        mounted () {
            $.init();
            this.loadData();
            $(this.$el).on('refresh', '.pull-to-refresh-content', (e) => {
                this.loadData();
            });
        },
        watch: {
            currentValue (val) {
                if (val) {
                    this.selected = true;
                } else {
                    this.selected = false;
                }
                this.$emit('input', val);
            },
            currentStakingValue (val) {
                if (val) {
                    for (let i = 0; i < this.stakingList.length; i++) {
                        if (this.stakingList[i].id === val.id) {
                            this.stakingInfo = this.stakingList[i];
                            break;
                        }
                    }
                    for (let i = 0; i < this.programList.length; i++) {
                        if (this.programList[i].id === this.stakingInfo.program_id) {
                            this.stakingInfo.text = this.programList[i].text;
                            break;
                        }
                    }
                } else {
                    this.stakingInfo = {};
                }
                this.$emit('input', val);
            }
        },
        methods: {
            loadData () {
                Promise.all([
                    fetch_account(this.currentWallet.account),
                    get_trust_nodes(),
                    get_nodes_detail()
                ]).then(results => {
                    get_objects(['2.0.0']).then((res) => {
                        let programSettings = find(res[0].parameters.extensions, (item) => item[0] == 11);
                        let max_staking_count_obj = find(res[0].parameters.extensions, (item) => item[0] == 12);
                        let _programList = sortBy(programSettings[1].params, (item) => {
                            return -parseInt(item[1].staking_days);
                        });
                        if (programSettings) {
                            this.programList = _programList.map(param => {
                                let staking_days = param[1].staking_days;
                                return {
                                    id: param[0],
                                    staking_days: param[1].staking_days,
                                    is_valid: param[1].is_valid,
                                    weight: param[1].weight,
                                    text: staking_days < 30 ? this.$tc('loyalty_program.day', staking_days, {
                                        day: staking_days
                                    }) : this.$tc('loyalty_program.month', staking_days / 30, {
                                        month: staking_days / 30
                                    })
                                };
                            });
                            if (this.programList.length > 0) {
                                this.term = this.programList[this.programList.length - 1];
                            }
                        }
                        if (max_staking_count_obj) {
                            this.max_staking_count = max_staking_count_obj[1].max_staking_count;
                            this.min_staking_amount = max_staking_count_obj[1].min_staking_amount;
                            this.staking_mode_on = max_staking_count_obj[1].staking_mode_on;
                        }
                    });
                    this.fetch_account_balance();
                    this.get_staking_fee();
                    get_staking_object(results[0].id).then(res => {
                        let stakingList = res;
                        let nodeList = results[1];
                        for (let i = 0; i < stakingList.length; i++) {
                            for (let j = 0; j < nodeList.length; j++) {
                                if (stakingList[i].trust_node === nodeList[j].id) {
                                    stakingList[i].name = nodeList[j].name;
                                    break;
                                }
                            }
                        }
                        this.stakingList = stakingList;
                    });
                    if (results[1].length > 0) {
                        // 过滤保护节点和vote_id为空的节点
                        let accounts = results[1].filter(item => {
                            let nodes = [
                                'aaron',
                                'caitlin',
                                'kairos',
                                'sakura',
                                'taffy',
                                'miner1',
                                'miner2',
                                'miner3',
                                'miner4',
                                'miner5',
                                'miner6',
                                'miner7',
                                'miner8',
                                'miner9',
                                'miner10',
                                'miner11',
                                'hrrs',
                                'dennis1',
                                'david12',
                                'marks-lee',
                                'robin-green'
                            ];
                            let tmp = false;
                            for (let i = 0; i < nodes.length; i++) {
                                if (item.vote_id === '') {
                                    tmp = true;
                                    break;
                                }
                                if (item.name === nodes[i]) {
                                    tmp = true;
                                    break;
                                }
                            }
                            return !tmp;
                        });
                        // 票数排序，佣金比例降序，得票数升序
                        this.accounts = sortBy(accounts, (item) => {
                            return -parseInt(item.commission_rate);
                        }, (item) => {
                            return parseInt(item.total_vote_weights);
                        }, (item) => {
                            return parseInt(item.vote_id.split(':')[1]);
                        });
                    }
                    let nodeInfoList = results[2] || [];
                    for (let i = 0; i < this.accounts.length; i++) {
                        for (let j = 0; j < nodeInfoList.length; j++) {
                            if (this.accounts[i].name === nodeInfoList[j].accountName) {
                                this.accounts[i].nodeName = nodeInfoList[j].nodeName;
                                this.accounts[i].logo = nodeInfoList[j].logo;
                                break;
                            }
                        }
                    }
                    this.loaded = true;
                    setTimeout(() => {
                        $.pullToRefreshDone($(this.$el).find('.pull-to-refresh-content'));
                    }, 500);
                }).catch(ex => {
                    console.error(ex);
                    $.toast(ex.message);
                    this.loaded = true;
                    setTimeout(() => {
                        $.pullToRefreshDone($(this.$el).find('.pull-to-refresh-content'));
                    }, 500);
                });
            },
            isStakingValid (item) {
                return (!this.currentStakingValue) || (this.currentStakingValue && this.currentStakingValue.is_valid);
            },
            isStakingUpdateValid (item) {
                return (!this.currentStakingValue) || (this.currentStakingValue && !this.currentStakingValue.is_valid);
            },
            switchWallet (e) {
                let index = e.target.value;
                set_wallet_index(index);
                this.currentWalletIndex = index;
                this.currentWallet = this.wallets[this.currentWalletIndex];
                this.loadData();
            },
            switchVoteType () {
                this.showOldVotes = !this.showOldVotes;
            },
            fetch_account_balance () {
                fetch_account_balance(this.currentWallet.account).then(res => {
                    this.currentBalance = res;
                }).catch(ex => {
                    $.toast(ex.message);
                });
            },
            get_staking_fee () {
                get_staking_fee().then(res => {
                    this.stakingFee = res[0];
                }).catch(ex => {
                    $.toast(ex.message);
                }); ;
            },
            showConfirm () {
                if (this.stakingList.length >= this.max_staking_count) {
                    $.toast(this.$t('staking.staking_max_count'));
                    return;
                }
                this.currentType = 1;
                this.showStakingConfirm = true;
            },
            unlock (type) {
                if (this.submitting) {
                    return;
                }
                this.confirmType = type;
                if (type === 1) {
                    // type(1):update votes_id
                    this.selected_accounts = '';
                    for (let i = 0; i < this.accounts.length; i++) {
                        if (this.currentValue == this.accounts[i].vote_id) {
                            this.selected_accounts = this.accounts[i];
                            continue;
                        }
                    }
                    this.$refs.unlock.show();
                }
            },
            accMult (arg1, arg2) {
                let m = 0;
                let s1 = arg1.toString();
                let s2 = arg2.toString();
                try {
                    m += s1.split('.')[1].length;
                } catch (e) {
                }
                try {
                    m += s2.split('.')[1].length;
                } catch (e) {
                }
                return Number(s1.replace('.', '')) * Number(s2.replace('.', '')) / Math.pow(10, m);
            },
            unlocking (pwd) {
                if (!pwd.trim()) {
                    $.toast(this.$t('unlock.error.invalid_password'));
                    this.$refs.unlock.unlocked();
                    return;
                }
                this.password = pwd;
                this.submitting = true;
                if (this.currentType == 2) {
                    stakingUpdate(this.updateNode, 'GXC', this.currentWallet.account, this.currentStakingValue.id, this.password, true).then(res => {
                        this.submitting = false;
                        this.loadData();
                        this.showUpdateModel = false;
                        this.$refs.unlock.unlocked();
                        this.currentType = '';
                        $.toast(this.$t('staking.staking_update_success'));
                    }).catch(ex => {
                        console.error(ex);
                        let message = '';
                        if (ex.message.indexOf('Insufficient Balance') > -1 || ex.message.indexOf('account balance not enough') > -1) {
                            message = this.$t('transfer.error.amount.insufficient_balance');
                        } else {
                            message = ex.message;
                        }
                        this.submitting = false;
                        this.showUpdateModel = false;
                        this.$refs.unlock.unlocked();
                        $.toast(message);
                    });
                }
                if (this.currentType == 1) {
                    var obj = {};
                    obj.amount = this.accMult(this.stakingForm.amount, 100000);
                    obj.program = this.stakingForm.program;
                    stakingCreate(this.selected_accounts, 'GXC', this.currentWallet.account, obj, this.password, true).then(res => {
                        this.submitting = false;
                        this.$refs.unlock.unlocked();
                        this.loadData();
                        this.showStakingConfirm = false;
                        this.currentType = '';
                        $.toast(this.$t('staking.staking_success'));
                    }).catch(ex => {
                        console.error(ex);
                        let message = '';
                        if (ex.message.indexOf('Insufficient Balance') > -1 || ex.message.indexOf('account balance not enough') > -1) {
                            message = this.$t('transfer.error.amount.insufficient_balance');
                        } else {
                            message = ex.message;
                        }
                        this.submitting = false;
                        this.$refs.unlock.unlocked();
                        $.toast(message);
                    });
                }
                if (this.currentType == 3) {
                    stakingClaim('GXC', this.currentWallet.account, this.currentStakingValue.id, this.password, true).then(res => {
                        this.submitting = false;
                        this.$refs.unlock.unlocked();
                        this.showClaimModel = false;
                        this.currentType = '';
                        $.toast(this.$t('staking.staking_claim_success'));
                        this.loadData();
                    }).catch(ex => {
                        console.error(ex);
                        let message = '';
                        if (ex.message.indexOf('Insufficient Balance') > -1 || ex.message.indexOf('account balance not enough') > -1) {
                            message = this.$t('transfer.error.amount.insufficient_balance');
                        } else if (ex.message.indexOf('claim timepoint has not arrived yet') > -1) {
                            message = this.$t('transfer.error.claim.not_arrived');
                        } else {
                            message = ex.message;
                        }
                        this.submitting = false;
                        this.$refs.unlock.unlocked();
                        this.showClaimModel = false;
                        $.toast(message);
                    });
                }
            },
            onCancel () {
                this.showStakingConfirm = false;
            },
            onStakingConfirm (program, amount) {
                this.stakingForm = {
                    program: program,
                    amount: amount
                };
                this.unlock(1);
            },
            onUpdateStaking () {
                if (this.isStakingUpdateValid(this.currentStakingValue)) {
                    return;
                }
                this.currentType = 2;
                this.showUpdateModel = true;
            },
            onCancelUpdate () {
                this.showUpdateModel = false;
            },
            onUpdateStakingConfirm (currentSelectValue) {
                this.updateNode = currentSelectValue;
                this.$refs.unlock.show();
            },
            staking_claim () {
                if (this.isStakingValid(this.currentStakingValue)) {
                    return;
                }
                this.showClaimModel = true;
            },
            onClaimStakingConfirm () {
                this.currentType = 3;
                this.$refs.unlock.show();
            },
            onCancelClaim () {
                this.showClaimModel = false;
            }
        }
    };
</script>
<style lang="scss" scoped>
    .account-switch {
        font-size: .75rem;
        select {
            position: absolute;
            left: 0;
            top: 0;
            bottom: 0;
            opacity: 0;
            width: 100%;
        }
    }
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

    .line-scale-pulse-out {
        margin-top: 2.5rem;
        text-align: center;
    }
    .line-scale-pulse-out > div {
        background: #6699ff;
        width: 2px;
        height: 18px;

    }
    .oldVotes{
        color: #999;
    }

    .tab-nav {
        position: relative;
        height: 2rem;
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        .tab-nav-item {
            flex: 1;
            height: 2rem;
            line-height: 2rem;
            text-align: center;
            font-size: .65rem;
            border-bottom: 1px solid #f2f2f2;
        }
        .tab-nav-item.active {
            color: #6699ff;
            font-weight: bold;
            border-bottom: 1px solid #6699ff;
        }
    }

    .tip-info,
    .tip-alert,
    .tip-success {
        padding-left: .75rem;
    }

    .content-banner img {
        width: 100%;
    }

    .list-block ul:before {
        height: 0;
    }

    .content-block {
        font-size: .75rem;
    }

    .content-block.tips {
        font-size: .6rem;
        margin: .3rem 0;
        color: #6981a7;
        line-height: 1rem;
        letter-spacing: 0.5px;
    }

    .content-block .proxy-tip {
        font-size: .6rem;
        margin: .3rem 0;
        color: #ed4014;
        line-height: 1rem;
        letter-spacing: 0.5px;
        text-align: center;
    }

    .content-block-title {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        .right {
            font-size: .6rem !important;
            color: #6699ff;
            font-weight: bold;
        }
    }

    .list-block {
        margin: .75rem 0;
        .item-title {
            width: 6.5rem;
            font-size: .75rem;
            &.auto-width {
                width: auto;
            }
        }
        .last .item-inner:after {
            height: 0;
        }
    }

    .accounts {
        margin-top: 0;
        .account-item {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            .account-item-left {
                flex: 1;
                display: flex;
                flex-direction: row;
                justify-content: flex-start;
                align-items: center;
                .account-avatar {
                    .logo {
                        width: 30px;
                        height: 30px;
                        border-radius: 100%;
                        border: 1px solid #f2f2f2;
                    }
                }
                .account-info {
                    margin-left: .75rem;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    align-items: flex-start;
                    .account-name {
                        color: #17233d;
                        font-size: .7rem;
                    }
                    .staking-name{
                      line-height: 150%;
                    }
                    .account-url {
                        color: #808695;
                        font-size: .6rem;
                        height: 13px;
                        max-width: 8rem;
                        white-space: nowrap;
                        overflow: hidden;
                        text-overflow: ellipsis;
                    }
                    .account-time{
                        font-size: .6rem;
                        color: #808695;
                        height: 13px;
                    }
                }
                .staking-days{
                    margin-right: .75rem;
                    display: flex;
                    font-size: .6rem;
                    flex-direction: column;
                    justify-content: space-between;
                    align-items: flex-start;
                }
            }
            .account-item-center {
                color: #17233d;
                font-size: .6rem;
                min-width: 2.5rem;
                margin-right: .75rem;
                text-align: right;
            }
            .account-commision{
                color: #6699ff;
                font-size: .5rem;
                line-height: 150%;
                height: 13px;
                max-width: 8rem;
            }
        }
        .account-history-item-left{
             justify-content: space-between !important;
             align-items: center !important;
        }
    }

    .no-reocrd {
        margin-top: 1.5rem;
        font-size: .7rem;
        color: #80848f;
        span {
            padding-right: 5px;
        }
    }

    .button-gxb {
        font-size: .7rem;
    }

    .btn-remove {
        margin: 1.5rem auto 0;
        width: 50%;
    }

    .tab-vote, .tab-modify {
        background: #6699ff;
        color: #fff !important;
    }
    .tab-vote:active, .tab-modify :active{
        color: #fff !important;
    }
    .tab-remove {
        background: #ed4014;
        color: #fff !important;
    }
    .tab-remove:active{
        color: #fff !important;
    }
    .tab-vote.disabled, .tab-modify.disabled {
        background-color: #c8c9cb;
    }
    .processWrap{
        height: 1rem;
        background-color: #ccc;
        .inner {
            display: inline-block;
            text-align: right;
            padding-right: .2rem;
            height: 100%;
            color: #fff;
            background-color: #6699ff;
        }
        .inner-right{
            text-align: right;
        }
    }
</style>
