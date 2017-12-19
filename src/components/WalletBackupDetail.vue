<template>
    <div class="page-group">
        <div class="page" id="page-wallet-backup-detail">
            <header class="bar bar-nav">
                <h3 class="title">{{$t('wallet_backup.detail.title')}}</h3>
                <a href="javascript:;" class="icon icon-left" @click="confirm($route.query.from||link('/'))"></a>
            </header>
            <div class="content">
                <div class="tip-info">
                    {{$t('wallet_backup.detail.tip')}}
                </div>
                <div class="content-block">
                    <div class="tip-warning" :class="{'text-center':!wifKey}">
                        {{wifKey || '****************************'}}
                    </div>
                    <p class="tip-error text-center" v-if="error.common">{{error.common}}</p>
                    <p>
                        <a class="button-gxb" v-if="!wifKey" @click="unlock">{{$t('wallet_backup.detail.unlock')}}</a>
                    </p>
                </div>
                <ul class="tips color-danger">
                    <li>
                        {{$t('wallet_backup.detail.tip1')}}
                    </li>
                    <li>
                        {{$t('wallet_backup.detail.tip2')}}
                    </li>
                </ul>
                <div class="button-block">
                    <p v-if="isNative&&wifKey">
                        <a href="javascript:;" @click="copyKey()" class="button button-gxb" :class="{disabled:keyCopied}">{{keyCopied ? $t('wallet_backup.detail.copied') : $t('wallet_backup.detail.copy')}}</a>
                    </p>
                    <p v-if="wifKey">
                        <a href="javascript:;" @click="confirm(link('/'))" class="button button-gxb">{{$t('wallet_backup.detail.go_back')}}</a>
                    </p>
                </div>
            </div>
        </div>
        <password-confirm ref="confirm" @unlocking="unlocking"></password-confirm>
    </div>
</template>
<script>
    import {
        mapGetters
    } from 'vuex';
    import {
        unlock_wallet,
        update_wallet
    } from '@/services/WalletService';
    import PasswordConfirm from './sub/PasswordConfirm.vue';

    export default {
        data () {
            return {
                wifKey: '',
                keyCopied: false,
                unlocked: false,
                wallet: {},
                error: {
                    common: ''
                }
            };
        },
        methods: {
            unlock () {
                this.error.common = '';
                this.$refs.confirm.show();
            },
            unlocking (pwd) {
                let self = this;
                if (!pwd.trim()) {
                    this.error.common = this.$t('unlock.error.invalid_password');
                    this.$refs.confirm.unlocked();
                    return;
                }
                unlock_wallet(this.$route.query.account, pwd).then((info) => {
                    self.wifKey = info.wifKey;
                    self.wallet = info.wallet;
                    self.unlocked = true;
                    self.$refs.confirm.unlocked();
                }).catch((ex) => {
                    self.$refs.confirm.unlocked();
                    self.error.common = self.$t('wallet_backup.detail.error.invalid_password');
                });
            },
            copyKey () {
                cordova.exec(() => {// eslint-disable-line
                    this.keyCopied = true;
                    setTimeout(() => {
                        this.keyCopied = false;
                    }, 1000);
                }, null, 'ClipBoard', 'copy', [this.wifKey]);
            },
            confirm (returnURL) {
                let self = this;
                if (this.unlocked) {
                    if (!self.wallet.backup_date) {
                        $.modal({
                            text: this.$t('wallet_backup.detail.confirm'),
                            buttons: [{
                                text: this.$i18n.locale == 'zh-CN' ? '取消' : 'Cancel'
                            },
                            {
                                text: this.$i18n.locale == 'zh-CN' ? '确定' : 'Ok',
                                bold: true,
                                onClick: function () {
                                    let wallet = self.wallet;
                                    wallet.backup_date = new Date().getTime();
                                    update_wallet(wallet);
                                    self.$router.replace({
                                        path: returnURL
                                    });
                                }
                            }
                            ]
                        });
                    } else {
                        this.$router.replace({
                            path: returnURL
                        });
                    }
                } else {
                    this.$router.replace({
                        path: returnURL
                    });
                }
            }
        },
        mounted () {
            $.init();
        },
        computed: {
            ...mapGetters({
                isNative: 'isNative'
            })
        },
        components: {
            PasswordConfirm
        }
    };
</script>
<style scoped lang="scss">
    .pull-to-refresh-layer {
        .line-scale>div {
            background-color: #ccc;
        }
    }

    .text-right {
        text-align: right;
    }

    .tip-info {
        word-break: break-word;
    }

    .tip-warning {
        padding: .5rem;
        font-weight: bold;
    }

    .tips {
        font-size: .6rem;
        padding-left: 1.5rem;
        li {
            padding-left: 0
        }
    }

    .link-green {
        font-size: .75rem;
    }

    .button-block {
        margin-top: 4rem;
    }
</style>
