<template>
    <div class="page-group">
        <div class="page" id="page-loyalty-program-detail">
            <header class="bar bar-nav">
                <router-link :to="link('/loyalty-program')" class="icon icon-left pull-left" replace></router-link>
                <h3 class="title">{{$t('loyalty_program.detail.title')}}</h3>
            </header>
            <div class="content">
                <div class="list-block">
                    <ul>
                        <li class="item-content">
                            <div class="item-inner">
                                <div class="item-title">{{$t('loyalty_program.locked_at')}}</div>
                                <div class="item-after">{{$d(locked_at, 'long')}}</div>
                            </div>
                        </li>
                        <li class="item-content">
                            <div class="item-inner">
                                <div class="item-title">{{$t('loyalty_program.locked_amount')}}</div>
                                <div class="item-after">{{amount | asset(2)}}</div>
                            </div>
                        </li>
                        <li class="item-content">
                            <div class="item-inner">
                                <div class="item-title">{{$t('loyalty_program.bonus')}}</div>
                                <div class="item-after">
                                    <span class="color-danger">{{rate}}</span>%
                                </div>
                            </div>
                        </li>
                        <li class="item-content">
                            <div class="item-inner">
                                <div class="item-title">{{$t('loyalty_program.expected_bonus')}}(GXS)</div>
                                <div class="item-after">
                                    <span class="color-primary">{{bonus}}</span>
                                </div>
                            </div>
                        </li>
                        <li class="item-content">
                            <div class="item-inner">
                                <div class="item-title">{{$t('loyalty_program.term')}}</div>
                                <div class="item-after">{{term}}</div>
                            </div>
                        </li>
                        <li class="item-content">
                            <div class="item-inner">
                                <div class="item-title">{{$t('loyalty_program.due')}}</div>
                                <div class="item-after">{{$d(due, 'long')}}</div>
                            </div>
                        </li>
                        <li class="item-content" v-if="status=='locked'">
                            <div class="item-inner">
                                <div class="item-title">{{$t('loyalty_program.status.title')}}</div>
                                <div class="item-after">{{$t(`loyalty_program.status.locked`)}}</div>
                            </div>
                        </li>
                        <li @click="unlock_balance" class="item-content" :class="{'item-link':!submitting}" v-if="status=='can_unlock'">
                            <div class="item-inner">
                                <div class="item-title">{{$t('loyalty_program.status.title')}}</div>
                                <div class="item-after">
                                    <span class="color-primary" v-if="!submitting">
                                        {{$t(`loyalty_program.status.can_unlock`)}}
                                    </span>
                                    <div class="line-scale-pulse-out" v-if="submitting">
                                        <div></div>
                                        <div></div>
                                        <div></div>
                                        <div></div>
                                        <div></div>
                                    </div>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
                <div class="content-block">
                    <p class="tip-error" v-if="error.common">{{error.common}}</p>
                </div>
            </div>
        </div>
        <password-confirm ref="confirm" @unlocking="unlocking"></password-confirm>
    </div>
</template>
<script>
    import {
        get_objects,
        unlock_balance,
        get_wallets,
        get_wallet_index
    } from '@/services/WalletService';
    import filters from '@/filters';
    import PasswordConfirm from './sub/PasswordConfirm.vue';

    export default {
        filters,
        data () {
            let wallets = get_wallets();
            return {
                currentWallet: wallets[get_wallet_index()],
                locked_at: '',
                amount: '',
                lock_days: 0,
                rate: '',
                term: '',
                status: 'locked',
                error: {
                    common: ''
                },
                submitting: false
            };
        },
        mounted () {
            $.init();
            this.loadLockedBalance();
        },
        computed: {
            due () {
                if (!this.locked_at) {
                    return '';
                }
                let date = new Date(this.locked_at);
                date.setDate(date.getDate() + Number(this.lock_days));
                return date;
            },
            bonus () {
                if (!this.amount || isNaN(Number(this.amount)) || !this.rate) {
                    return '';
                }
                return filters.asset(this.lock_days / 360 * this.rate / 100 * this.amount, 2);
            }
        },
        components: {
            PasswordConfirm
        },
        methods: {
            loadLockedBalance () {
                get_objects([this.$route.params.id]).then(results => {
                    let locked_balance = results[0];
                    this.locked_at = new Date(locked_balance.create_date_time + 'Z');
                    this.lock_days = locked_balance.lock_days;
                    this.amount = locked_balance.amount.amount / 100000;
                    this.rate = locked_balance.interest_rate / 100;
                    this.term = this.lock_days < 30 ? this.$tc('loyalty_program.day', this.lock_days, {
                        day: this.lock_days
                    }) : this.$tc('loyalty_program.month', this.lock_days / 30, {
                        month: this.lock_days / 30
                    });
                    if (new Date() - this.locked_at > this.lock_days * 24 * 3600 * 1000) {
                        this.status = 'can_unlock';
                    }
                });
            },
            unlock_balance () {
                this.error.common = '';
                if (this.submitting) {
                    return;
                }
                this.$refs.confirm.show();
            },
            unlocking (pwd) {
                let self = this;
                if (!pwd.trim()) {
                    this.error.common = this.$t('unlock.error.invalid_password');
                    this.$refs.confirm.unlocked();
                    return;
                }
                this.submitting = true;
                unlock_balance(this.$route.params.id, this.currentWallet.account, pwd, true)
                    .then(result => {
                        self.submitting = false;
                        self.$refs.confirm.unlocked();
                        $.alert(self.$t('loyalty_program.detail.success.message', {
                            amount: filters.asset(self.amount, 2)
                        }), self.$t('loyalty_program.detail.success.title'), function () {
                            self.$router.replace({
                                path: self.link('/loyalty-program')
                            });
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
<style scoped>
    .line-scale-pulse-out>div {
        background-color: #3d3d3b;
        width: 3px;
        height: 18px;
        margin: -1px;
    }
</style>
