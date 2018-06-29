<template>
    <div class="page-group">
        <div class="page">
            <header class="bar bar-nav">
                <h3 class="title">{{$t('wallet_backup.index.title')}}</h3>
                <router-link :to="$route.query.from||link('/')" replace class="icon icon-left"></router-link>
            </header>
            <div class="content">
                <div class="tip-info">
                    {{$t('wallet_backup.index.tip')}}
                </div>
                <div class="content-block text-center">
                    <account-image :size="30" :account="$route.query.account"></account-image>
                    <p>{{$route.query.account}}</p>
                </div>
                <div class="list-block">
                    <ul>
                        <li class="item-content">
                            <div class="item-inner">
                                <div class="item-title">
                                    {{$t('wallet_backup.index.label.account')}}
                                </div>
                                <div class="item-after">
                                    {{$route.query.account}}
                                </div>
                            </div>
                        </li>
                        <li class="item-content">
                            <div class="item-inner">
                                <div class="item-title">
                                    {{$t('wallet_backup.index.label.asset')}}
                                </div>
                                <div class="item-after">
                                    {{balance | asset(2)}}
                                </div>
                            </div>
                        </li>
                        <li>
                            <router-link :to="linkBackupKey" class="item-content item-link">
                                <div class="item-inner">
                                    <div class="item-title">
                                        {{$t('wallet_backup.index.label.private_key')}}
                                    </div>
                                </div>
                            </router-link>
                        </li>
                    </ul>
                </div>
                <p class="tip-error text-center" v-if="error.common">{{error.common}}</p>
                <div class="content-block button-block">
                    <p>
                        <router-link :to="linkBackupKey" class="button button-gxb">{{$t('wallet_backup.index.button_backup')}}
                        </router-link>
                    </p>
                    <p>
                        <a href="javascript:;" class="button button-gxb button-disabled" @click="delWallet">{{$t('wallet_backup.index.button_remove')}}</a>
                    </p>
                </div>
            </div>
        </div>
        <password-confirm ref="confirm" @unlocking="unlocking" :tips="$t('wallet_del.tip_del')"></password-confirm>
    </div>
</template>
<script>
    import {
        mapGetters
    } from 'vuex';
    import AccountImage from './sub/AccountImage.vue';
    import PasswordConfirm from './sub/PasswordConfirm.vue';
    import {
        fetch_account_balance,
        unlock_wallet,
        del_wallet
    } from '@/services/WalletService';
    import filters from '@/filters';

    export default {
        filters,
        mounted () {
            $.init();
            this.loadBalance();
        },
        data () {
            return {
                balance: '**',
                error: {
                    common: ''
                }
            };
        },
        methods: {
            loadBalance () {
                fetch_account_balance(this.$route.query.account).then((balance) => {
                    this.balance = balance.amount / 100000;
                }).catch(ex => {
                    console.error(ex);
                });
            },
            delWallet () {
                this.error.common = '';
                this.$refs.confirm.show();
                // if (this.balance === 0) {
                //     this.$refs.confirm.show();
                // } else {
                //     this.error.common = this.$t('wallet_del.error.invalid_delete');
                // }
            },
            unlocking (pwd) {
                let self = this;
                if (!pwd.trim()) {
                    this.error.common = this.$t('unlock.error.invalid_password');
                    this.$refs.confirm.unlocked();
                    return;
                }
                unlock_wallet(this.$route.query.account, pwd).then((info) => {
                    let wallet = info.wallet;
                    return del_wallet(wallet).then(() => {
                        self.$router.replace({
                            path: self.$route.query.from || link('/')// eslint-disable-line
                        });
                        self.$refs.confirm.unlocked();
                    });
                }).catch((ex) => {
                    self.$refs.confirm.unlocked();
                    self.error.common = self.$t('wallet_del.error.invalid_password');
                });
            }
        },
        computed: {
            ...mapGetters({
                isNative: 'isNative'
            }),
            linkBackupKey () {
                let query = {
                    account: this.$route.query.account,
                    from: this.$route.fullPath
                };
                return this.link('/wallet-backup-detail', query);
            }
        },
        components: {
            AccountImage,
            PasswordConfirm
        }
    };
</script>
<style scoped lang="scss">
    .button-block {
        margin-top: 4rem;
    }

    .tip-info {
        word-break: break-word;
    }
</style>
