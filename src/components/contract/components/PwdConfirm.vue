<template>
    <div class="popup popup-transfer-confirm">
        <div class="bar bar-nav normal-nav">
            <h3 class="title">{{$t('transfer.confirm.enter_password')}}</h3>
            <a href="javascript:;" class="pull-right icon icon-close close-popup" @click="onPasswordCancel">&times;</a>
        </div>
        <div class="content">
            <div class="list-block">
                <p class="info-alert" v-if="tips">{{tips}}</p>
                <div class="password-confirm">
                    <div class="password-confirm-input">
                        <ul>
                            <li class="item-content">
                                <div class="item-inner">
                                    <div class="item-input">
                                        <input ref="password" v-model="password" type="password"
                                                :placeholder="$t('transfer.confirm.enter_password')">
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div class="password-confirm-btn">
                        <a href="javascript:;" @click="onPasswordConfirm" class="button button-gxb">
                            <div class="line-scale-pulse-out" v-if="submitting">
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                            </div>
                            <span v-if="!submitting">{{$t('transfer.next')}}</span>
                        </a>
                    </div>
                </div>
                <div class="checkbox-wrap">
                    <label>
                        <input class="checkbox" type="checkbox" v-model="isRemember"><span class="checkbox-text">{{$t('transfer.confirm.remember_password')}}</span>
                    </label>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import {unlock_wallet} from '@/services/WalletService';
    import util from '@/common/util';

    let defaultData = {
        password: '',
        submitting: false
    };

    export default {
        data () {
            return $.extend({
                isRemember: false
            }, defaultData);
        },
        props: {
            tips: {
                type: String
            },
            account: {
                type: String,
                default: ''
            }
        },
        methods: {
            show () {
                this.password = '';
                this.submitting = false;
                $.popup($(this.$el));
                setTimeout(() => {
                    $(this.$refs.password).focus();
                }, 500);
            },
            onPasswordConfirm () {
                if (this.submitting) {
                    return;
                }
                this.submitting = true;

                unlock_wallet(this.account, this.password).then(res => {
                    if (this.isRemember) {
                        util.callNative('setScatterPWD', {pwd: this.password});
                    }
                    this.$emit('unlocking', this.password);
                }).catch(err => {
                    this.$emit('fail', err);
                });
            },
            onPasswordCancel () {
                this.$emit('cancel');
            },
            unlocked () {
                this.submitting = false;
                $.closeModal($(this.$el));
            }
        }
    };
</script>
<style lang="scss" type="text/scss" scoped>
    .checkbox-wrap{
        margin: 10px;
    }

    .bar.bar-nav {
        background: transparent;

        .title {
            font-weight: normal;
            color: #3d3d3b;
        }

        .icon {
            color: #3d3d3b;
        }

    }

    .popup-transfer-confirm {
        position: fixed !important;
        max-height: 8rem;
        bottom: 0;
        top: initial;
        background: #fff;
        transition-duration: .2s;
    }

    .list-block {
        margin-top: 0;
    }

    .list-block .item-title.label {
        width: 4.5rem;
    }

    .list-block .info-alert {
        font-size: .6rem;
        padding: 0 .75rem;
        text-align: center;
        margin-top: 0;
        color: #ed3f14;
    }

    .list-block .password-confirm {
        display: flex;
        flex-direction: row;
    }

    .list-block .password-confirm .password-confirm-input {
        flex: 1;
    }

    .list-block .password-confirm .password-confirm-btn {
        width: 3rem;
    }

    .list-block .password-confirm .password-confirm-btn .button {
        font-size: .6rem;
        border-radius: 0;
    }
</style>
