<template>
    <div class="page-group">
        <div class="page" id="page-node-vote">
            <header class="bar bar-nav">
                <router-link class="icon icon-left pull-left" :to="link('/')" replace></router-link>
                <h3 class="title">{{$t('node_vote.index.title')}}</h3>
            </header>
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
                <div class="content-block tips">
                    <p>{{$t('node_vote.index.intro')}}</p>
                    <p style="text-align: right">{{$t('node_vote.index.tips')}}</p>
                </div>
                <div class="content-block-title">
                    <div class="left">{{$t('node_vote.index.name')}}</div>
                    <div class="right">
                        <div class="btn-vote" :class="{'disabled': !selected}" @click="unlock">
                            {{isFirst ? $t('node_vote.index.btn_vote') : $t('node_vote.index.btn_update')}}
                        </div>
                    </div>
                </div>
                <div class="list-block accounts" v-if="accounts.length>0&&loaded">
                    <div class="gxb-checklist">
                        <gxb-cell v-for="(option, index) in accounts" :key="index">
                            <label class="account-item gxb-checklist__label" slot="title">
                                <div class="account-item-left">
                                    <account-image :size="15" :account="option.witness_account" slot="left"></account-image>
                                    <div class="account-info">
                                        <div class="account-name">{{option.name}}</div>
                                        <div class="account-url">{{option.url}}</div>
                                    </div>
                                </div>
                                <div class="account-item-center">{{$t('node_vote.index.vote_num')}}: {{parseInt(option.total_votes / 10000)}}</div>
                                <div class="account-item-right">
                                    <div class="gxb-checkbox is-right">
                                        <input class="gxb-checkbox__input"
                                               type="checkbox"
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
            </div>
        </div>
        <password-confirm ref="unlock" @unlocking="unlocking"></password-confirm>
        <vote-confirm ref="confirm" :account="currentWallet.account" :pwd="password" :fee="fee" :proxyAccount="proxyAccount" :voteAccounts="voteAccountsStr" @confirm="confirmVote"></vote-confirm>
    </div>
</template>

<script>
    import {
        get_objects,
        fetch_account,
        get_trust_nodes,
        vote_for_accounts,
        get_assets_by_ids,
        get_wallet_index,
        get_wallets
    } from '@/services/WalletService';
    import AccountImage from '@/components/sub/AccountImage.vue';
    import PasswordConfirm from '@/components/sub/PasswordConfirm.vue';
    import VoteConfirm from '@/components/sub/VoteConfirm.vue';
    import filters from '@/filters';

    export default {
        filters,
        data () {
            let wallets = get_wallets();
            return {
                loaded: false,
                isFirst: true,
                selected: false,
                submitting: false,
                tabIndex: 0,
                accounts: [],
                selected_accounts: [],
                currentValue: [],
                currentWallet: wallets[get_wallet_index()],
                fee: {
                    amount: 0,
                    symbol: 'GXC'
                },
                proxyAccount: {
                    id: '1.2.5',
                    name: ''
                },
                voteAccountsStr: '',
                password: ''
            };
        },
        components: {
            AccountImage,
            PasswordConfirm,
            VoteConfirm
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
                if (val.length > 0) {
                    this.selected = true;
                } else {
                    this.selected = false;
                }
                this.$emit('input', val);
            }
        },
        methods: {
            loadData () {
                Promise.all([
                    fetch_account(this.currentWallet.account),
                    get_trust_nodes()
                ]).then(results => {
                    this.currentValue = results[0].options.votes || [];
                    if (this.currentValue.length > 0) {
                        this.isFirst = false;
                    }
                    this.accounts = results[1] || [];
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
            unlock () {
                if (this.submitting) {
                    return;
                }
                this.selected_accounts = [];
                for (let i = 0; i < this.currentValue.length; i++) {
                    for (let j = 0; j < this.accounts.length; j++) {
                        if (this.currentValue[i] == this.accounts[j].vote_id) {
                            this.selected_accounts.push(this.accounts[j]);
                            continue;
                        }
                    }
                }
                this.$refs.unlock.show();
            },
            unlocking (pwd) {
                if (!pwd.trim()) {
                    $.toast(this.$t('unlock.error.invalid_password'));
                    this.$refs.unlock.unlocked();
                    return;
                }
                this.password = pwd;
                this.submitting = true;
                vote_for_accounts(this.selected_accounts, 'GXC', this.currentWallet.account, this.password, false).then(res => {
                    this.submitting = false;
                    this.$refs.unlock.unlocked();
                    this.fee = res.operations[0][1].fee;
                    return Promise.all([
                        get_assets_by_ids([this.fee.asset_id]),
                        get_objects([this.proxyAccount.id])
                    ]);
                }).then(results => {
                    this.fee.symbol = results[0][0].symbol;
                    this.fee.amount = this.fee.amount / Math.pow(10, results[0][0].precision);
                    this.proxyAccount.name = results[1][0].name;
                    this.voteAccountsStr = '';
                    this.selected_accounts.forEach(v => {
                        this.voteAccountsStr += v.name + '、';
                    });
                    this.voteAccountsStr = this.voteAccountsStr.substring(0, this.voteAccountsStr.length - 1);
                    this.$refs.confirm.show();
                }).catch(ex => {
                    console.error(ex);
                    this.submitting = false;
                    this.$refs.unlock.unlocked();
                    $.toast(ex.message);
                });
            },
            confirmVote () {
                if (this.submitting) {
                    return;
                }
                this.submitting = true;
                vote_for_accounts(this.selected_accounts, 'GXC', this.currentWallet.account, this.password, true).then(res => {
                    this.submitting = false;
                    this.$refs.confirm.cancel();
                    $.toast(this.$t('node_vote.confirm.success'));
                }).catch(ex => {
                    let msg = ex.message.split('gxb-crypto') && ex.message.split('gxb-crypto')[0] || this.$t('system.error.default_msg');
                    this.submitting = false;
                    this.$refs.confirm.cancel();
                    $.toast(msg);
                });
            }
        }
    };
</script>
<style lang="scss" scoped>
    .page {
        background-color: #fff;
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

    .content-block-title {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        .btn-vote {
            height: 1.2rem;
            width: 4rem;
            line-height: 1.2rem;
            border-radius: .6rem;
            text-align: center;
            background: #6699ff;
            color: #fff;
            font-size: .65rem;
        }
        .btn-vote.disabled {
            background-color: #c8c9cb;
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
                .account-info {
                    margin-left: .75rem;
                    height: 30px;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    align-items: flex-start;
                    .account-name {
                        color: #17233d;
                        font-size: .7rem;
                    }
                    .account-url {
                        color: #808695;
                        font-size: .6rem;
                    }
                }
            }
            .account-item-center {
                color: #17233d;
                font-size: .6rem;
                margin-right: .75rem;
                text-align: right;
            }
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
</style>
