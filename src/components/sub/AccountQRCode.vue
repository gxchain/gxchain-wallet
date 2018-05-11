<template>
    <div class="popup popup-qrcode">
        <header class="bar bar-nav">
            <h2 class="title">{{$t('index.wallet')}}</h2>
            <a href="javascript:;" class="pull-right icon icon-close close-popup">&times;</a>
        </header>
        <div class="content">
            <div class="center-content">
                <div class="content-block">
                    <!--<div class="item-input">-->
                        <!--<input class="input-amount" type="number" maxlength="80" :placeholder="$t('transfer.receive_amount')" v-model="amount" @keyup="limitLength">-->
                    <!--</div>-->
                    <div class="text-center">
                        <qrcode :val="qrcode" :size="160"></qrcode>
                        <p style="word-break: break-all;">{{$t('index.account_name')}}:&nbsp;{{this.account}}</p>
                        <p style="color:#ec9708;font-size:.5rem;">{{$t('index.account_is_address')}}</p>
                    </div>
                    <div class="content-block">
                        <p v-if="isNative">
                            <a @click="copyAccount()" class="button button-gxb" :class="{disabled:accountCopied}">{{accountCopied ? $t('index.copied'):$t('index.copy')}}</a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import {
        mapGetters
    } from 'vuex';
    import qrcode from './QRCode.vue';

    export default {
        props: {
            account: {
                type: String
            }
        },
        data () {
            return {
                accountCopied: false,
                amount: ''
            };
        },
        methods: {
            show () {
                $.popup(this.$el);
            },
            copyAccount () {
                cordova.exec(() => { // eslint-disable-line
                    this.accountCopied = true;
                    setTimeout(() => {
                        this.accountCopied = false;
                        $.closeModal();
                    }, 1000);
                }, null, 'ClipBoard', 'copy', [this.account]);
            },
            limitLength () {
                if (!/^\d+(\.\d{0,5})?$/.test(this.amount)) {
                    let index = this.amount.indexOf('.');
                    this.amount = this.amount.slice(0, index + 6);
                }
            }
        },
        computed: {
            ...mapGetters({
                isNative: 'isNative'
            }),
            qrcode () {
                return `qr://transfer?to=${this.account}`;
            }
        },
        components: {
            qrcode
        }
    };
</script>
<style scoped lang="scss">
    .center-content {
        margin-top: 3rem;
        align-items: flex-end;
        display: flex;
        justify-content: center;
        text-align: center;
        .content-block {
            width: 100%;
            input {
                text-align: center;
                margin-bottom: 1rem;
                &::-ms-input-placeholder {
                    text-align: center;
                }
                &::-webkit-input-placeholder {
                    text-align: center;
                }
                border-top-style: none;
                border-left-style: none;
                border-right-style: none;
                border-bottom-width: thin;
                border-radius: 0;
            }
        }
    }
</style>
