<template>
    <div class="page-group">
        <div class="page" id="page-loyalty-program">
            <header class="bar bar-nav">
                <router-link class="icon icon-left pull-left" :to="link('/')" replace></router-link>
                <h3 class="title">{{$t('loyalty_program.title')}}</h3>
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
                <div class="content-banner">
                    <img :src="`static/${$t('loyalty_program.banner')}`">
                </div>
                <div class="content-block tips">
                    <p>{{$t('loyalty_program.tip3')}}</p>
                </div>
                <div class="content-block-title">
                    {{$t('loyalty_program.history')}}
                </div>
                <div class="list-block history" v-if="histories.length>0">
                    <ul>
                        <li v-for="history in histories" :key="history.id">
                            <router-link :to="link(`/loyalty-program/${history.id}`)" class="item-content">
                                <div class="item-inner">
                                    <div class="item-title-row">
                                        <div class="item-title">{{history.amount | asset(2)}} GXS</div>
                                        <div class="item-subtitle">{{$d(history.created_at,'long')}}</div>
                                    </div>
                                    <div class="item-after">
                                        <small :class="{'color-primary':history.status=='can_unlock'}">
                                            {{$t(`loyalty_program.status.${history.status}`)}}
                                        </small>
                                    </div>
                                </div>
                            </router-link>
                        </li>
                    </ul>
                </div>
                <p class="no-reocrd text-center" v-else>
                    <span class="icon icon-edit"></span>
                    {{$t('loyalty_program.no_record')}}
                </p>
            </div>
        </div>
        <password-confirm ref="confirm" @unlocking="unlocking"
                          :tips="$t('loyalty_program.modal.message')"></password-confirm>
    </div>
</template>

<script>
    import {
        fetch_account_balance, fetch_full_account, get_objects, get_wallet_index, get_wallets,
        lock_balance
    } from '@/services/WalletService';
    import filters from '@/filters';
    import PasswordConfirm from './sub/PasswordConfirm.vue';
    import find from 'lodash/find';

    export default {
        filters,
        data () {
            let wallets = get_wallets();
            return {
                tabIndex: 0,
                histories: [],
                currentWallet: wallets[get_wallet_index()],
                amount: '',
                terms: [],
                term: {},
                submitting: false,
                balance: -1,
                error: {
                    common: '',
                    amount: ''
                }
            };
        },
        watch: {
            amount () {
                this.error = {
                    common: '',
                    amount: ''
                };
            }
        },
        components: {
            PasswordConfirm
        },
        computed: {
            submittingHTML () {
                return `<div class="button-loading line-scale-pulse-out">
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                </div>`;
            },
            rate () {
                return this.term.interest_rate;
            },
            due () {
                if (!this.term.lock_days) {
                    return '';
                }
                let date = new Date();
                date.setDate(date.getDate() + Number(this.term.lock_days));
                return date;
            },
            bonus () {
                if (!this.amount || isNaN(Number(this.amount)) || !this.rate) {
                    return '';
                }
                return filters.asset(this.term.lock_days / 360 * this.rate / 100 * this.amount, 2);
            },
            formattedBalance () {
                if (!this.balance) {
                    return '0';
                }
                return filters.asset(this.balance);
            },
            submitEnable () {
                return this.amount && !this.error.amount;
            }
        },
        mounted () {
            $.init();
            this.load_init_data();
            $(this.$el).on('refresh', '.pull-to-refresh-content', (e) => {
                this.load_init_data();
            });
        },
        methods: {
            load_init_data () {
                this.loadSettings();
                this.fetch_balance();
                this.fetch_history();
            },
            onSubmit () {
                if (this.validate()) {
                    this.unlock();
                }
            },
            validate () {
                if (this.amount < 1) {
                    this.error.amount = this.$t('loyalty_program.error.too_less');
                }
                return this.validateAmount() && this.rate;
            },
            validateAmount () {
                if (!/^\d+(\.\d{0,5})?$/.test(this.amount)) {
                    let index = this.amount.indexOf('.');
                    this.amount = this.amount.slice(0, index + 6);
                }
                let amount = Number(this.amount);
                if (isNaN(amount) || amount == 0) {
                    this.error.amount = this.$t('transfer.error.amount.invalid');
                    return false;
                } else if (amount > this.balance) {
                    this.error.amount = this.$t('transfer.error.amount.insufficient_balance');
                    return false;
                } else if (amount < 1) {
                    this.error.amount = this.$t('transfer.error.amount.minimum');
                    return false;
                }
                this.error.amount = '';
                return true;
            },
            onAmountChange () {
                this.validateAmount();
            },
            loadSettings () {
                get_objects(['2.0.0']).then((results) => {
                    let programSettings = find(results[0].parameters.extensions, (item) => item[0] == 6);
                    if (programSettings) {
                        this.terms = programSettings[1].params.map(param => {
                            let lock_days = param[1].lock_days;
                            return {
                                id: param[0],
                                lock_days: lock_days,
                                is_valid: param[1].is_valid,
                                text: lock_days < 30 ? this.$tc('loyalty_program.day', lock_days, {
                                    day: lock_days
                                }) : this.$tc('loyalty_program.month', lock_days / 30, {
                                    month: lock_days / 30
                                }),
                                interest_rate: param[1].interest_rate / 100
                            };
                        });
                        if (this.terms.length > 0) {
                            this.term = this.terms[this.terms.length - 1];
                        }
                    }
                });
            },
            fetch_history () {
                fetch_full_account(this.currentWallet.account).then((results) => {
                    let account = results && results[0] ? results[0][1] : {};
                    let histories = account.locked_balances || [];
                    histories = histories.map(history => {
                        let created_at = new Date(history.create_date_time + 'Z');
                        let status = 'locked';
                        if (new Date() - created_at > history.lock_days * 24 * 3600 * 1000) {
                            status = 'can_unlock';
                        }
                        return {
                            id: history.id,
                            created_at: created_at,
                            amount: history.amount.amount / 100000,
                            status
                        };
                    });
                    this.histories = histories.reverse();
                }).catch(ex => {
                    console.error(ex);
                });
            },
            fetch_balance () {
                fetch_account_balance(this.currentWallet.account).then((balance) => {
                    this.balance = balance.amount / 100000;
                    setTimeout(() => {
                        $.pullToRefreshDone($(this.$el).find('.pull-to-refresh-content'));
                    }, 500);
                }).catch(ex => {
                    console.error(ex);
                    setTimeout(() => {
                        $.pullToRefreshDone($(this.$el).find('.pull-to-refresh-content'));
                    }, 500);
                });
            },
            unlock () {
                this.error.common = '';
                if (this.submitting) {
                    return;
                }
                this.$refs.confirm.show();
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
                let self = this;
                if (!pwd.trim()) {
                    this.error.common = this.$t('unlock.error.invalid_password');
                    this.$refs.confirm.unlocked();
                    return;
                }
                this.submitting = true;
                lock_balance(this.term.id, this.currentWallet.account, this.accMult(this.amount, 100000), this.term.interest_rate *
                    100, this.term.lock_days, '', pwd, true)
                    .then(result => {
                        self.submitting = false;
                        self.$refs.confirm.unlocked();
                        $.alert(self.$t('loyalty_program.success.message', {
                            amount: filters.asset(self.amount, 2)
                        }), self.$t('loyalty_program.success.title'), function () {
                            self.load_init_data();
                            self.amount = '';
                        });
                    })
                    .catch((ex) => {
                        self.submitting = false;
                        self.$refs.confirm.unlocked();
                        console.error(ex);
                        self.error.common = ex.message;
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

    .list-block {
        margin: .75rem 0;
        .item-select {
            width: 100%;
        }
        select,
        input {
            text-align: right;
            height: auto;
        }
        select {
            direction: rtl;
        }
        select option {
            direction: ltr;
        }
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

    .history {
        margin-top: 0;
        .item-title {
            width: auto;
        }
        .item-subtitle {
            color: #757575;
        }
        .amount {
            align-items: flex-end;
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
