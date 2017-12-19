<template>
    <div class="page-group">
        <div class="page" id="page-wallet-create-step-2">
            <header class="bar bar-nav">
                <h3 class="title">{{$t('wallet_create.step2.title')}}</h3>
                <router-link :to="$route.query.from||link('/wallet-create-step-1')" replace class="icon icon-left"></router-link>
            </header>
            <div class="content">
                <div class="content-block text-center">
                    <account-image :size="40" :account="$route.query.account"></account-image>
                    <p>{{$route.query.account}}</p>
                </div>
                <div class="list-block">
                    <ul>
                        <li>
                            <div class="item-content">
                                <div class="item-inner">
                                    <div class="item-title label">{{$t('wallet_create.step2.label.password')}}</div>
                                    <div class="item-input">
                                        <input v-model="pwd1" type="password" maxlength="30" :placeholder="$t('wallet_create.step2.placeholder.password')">
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div class="item-content">
                                <div class="item-inner">
                                    <div class="item-title label">{{$t('wallet_create.step2.label.confirm')}}</div>
                                    <div class="item-input">
                                        <input v-model="pwd2" type="password" maxlength="30">
                                    </div>
                                </div>
                            </div>
                        </li>
                    </ul>
                    <div class="row-tip">
                        <p class="tip-error text-center" v-if="error">
                            {{error}}
                        </p>
                    </div>
                </div>
                <div class="content-block button-block">
                    <p>
                        <a href="javascript:;" @click="onSubmit" class="button button-gxb" :class="{disabled:!isCommitEnable}">{{$t('wallet_create.step2.done')}}</a>
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import AccountImage from './sub/AccountImage.vue';
    import errorHandler from '@/common/errorHandler';
    import {
        create_account
    } from '@/services/WalletService';

    export default {
        data () {
            return {
                pwd1: '',
                pwd2: '',
                error: '',
                submitting: false
            };
        },
        methods: {
            clear () {
                this.error = '';
            },
            validate () {
                if (this.pwd1 != this.pwd2) {
                    this.error = this.$t('wallet_create.step2.error.password_not_equal');
                    return false;
                }
                return true;
            },
            onSubmit () {
                if (!this.isCommitEnable || !this.validate()) {
                    return;
                }
                $.showPreloader(this.$t('wallet_create.step2.creating'));
                create_account(this.$route.query.account, this.pwd1).then((wallet) => {
                    $.hidePreloader();
                    if (wallet.account) {
                        this.$router.replace({
                            path: this.link('/wallet-create-success', {
                                account: wallet.account
                            })
                        });
                    } else {
                        $.toast(this.$t('wallet_create.step2.error.account_create_failed'));
                    }
                }).catch(ex => {
                    $.hidePreloader();
                    if (ex.data && ex.data.error && ex.data.error.base && ex.data.error.base[0].indexOf(
                            'current_account_itr') > -1) {
                        $.alert(this.$t('wallet_create.step2.error.account_has_been_registered'), this.$t(
                            'wallet_create.step2.notice'), () => {
                                this.$router.replace({
                                    path: this.$route.query.from || this.link(
                                        '/wallet-create-step-1')
                                });
                            });
                    } else {
                        console.error(ex);
                        errorHandler(ex, this.$t('wallet_create.step2.error.account_create_failed'));
                    }
                });
            }
        },
        computed: {
            isEqual: function () {
                return this.pwd1 == this.pwd2;
            },
            isCommitEnable: function () {
                return !this.submitting && this.pwd1.length >= 6 && this.pwd2.length > 0;
            }
        },
        mounted () {
            $.init();
        },
        components: {
            AccountImage
        }
    };
</script>
<style scoped="">
    .row-tip {
        padding: 0 15px;
    }
</style>
