<template>
    <div class="page-group">
        <div class="page" id="page-contract">
            <div class="content" v-show="unlocked">
                <div class="nav-box">
                    <div class="network">
                        <div class="network-tag">
                            <div class="network-status"></div>
                            {{network}}
                        </div>
                    </div>
                </div>
                <div class="description">
                    {{$t('transactionConfirm.signature')}}
                </div>
                <!--info-panel-->
                <info-panel :data="infoData" :isShowTab1="false"></info-panel>
                <div class="btn-box" v-show="unlocked">
                    <a href="javascript:;" class="button button-gxb disabled" @click="handleCancel">{{$t('smart_contract.btn.cancel')}}</a>
                    <a href="javascript:;" class="button button-gxb" :class="{disabled: submiting}"
                            @click="handleConfirm">{{$t('smart_contract.btn.confirm')}}</a>
                </div>
            </div>
        </div>
        <password-confirm ref="confirm" :account="currentWallet.account" @fail="unlockFail" @cancel="handleCancel"
                @unlocking="unlocking"></password-confirm>
    </div>
</template>
<script>
    import {
        getArbitrarySignature
    } from '@/services/WalletService';
    import AccountImage from '@/components/sub/AccountImage.vue';
    import util from '@/common/util';
    import PasswordConfirm from './components/PwdConfirm.vue';
    import InfoPanel from './components/InfoPanel.vue';
    import Error from './error/Error';

    export default {
        components: {
            AccountImage,
            PasswordConfirm,
            InfoPanel
        },
        data () {
            return {
                unlocked: false,
                network: process.env.network,
                currentWallet: {
                    account: ''
                },
                pwd: '',
                infoData: '',
                submiting: false
            };
        },
        props: {
            extra: {
                default: {},
                type: Object
            }
        },
        created () {
            this.currentWallet.account = this.extra.account;
            this.sigdata = this.extra.data;
            document.title = this.$t('signature');
        },
        mounted () {
            this.initStep();
        },
        methods: {
            endContract (params) {
                util.callNative('endContract', params);
            },
            initStep () {
                util.callNative('getScatterPWD', {}, (pwd) => {
                    if (!pwd) {
                        this.$refs.confirm.show();
                    } else {
                        this.pwd = pwd;
                        this.confirmAccount(this.extra.account, 0, pwd);
                    }
                });
            },
            confirmAccount (account, index, pwd) {
                this.buildInfo();
                this.unlocked = true;
            },
            handleConfirm () {
                if (this.submiting) {
                    return;
                }
                this.submiting = true;
                getArbitrarySignature(this.currentWallet.account, this.sigdata, this.pwd).then((sig) => {
                    const data = JSON.stringify({signature: sig});
                    this.endContract({code: 1, msg: 'success', data: data});
                }).catch(ex => {
                    this.endContract(new Error(undefined, encodeURIComponent(`sig error:${ex.message}`)));
                });
            },
            handleCancel () {
                this.endContract(Error.rejectSignature());
            },
            unlocking (pwd) {
                this.pwd = pwd;
                this.$refs.confirm.unlocked();
                this.confirmAccount(this.extra.account, 0, pwd);
            },
            unlockFail () {
                this.endContract(Error.passwordError(this.$t('unlock.error.invalid_password')));
            },
            buildInfo () {
                this.buildInfoData();
            },
            buildInfoData () {
                this.infoData = this.sigdata;
            }
        }
    };
</script>
<style scoped lang="scss" type="text/scss">
    .page {
        background-color: #fff;
        font-weight: 500;

        .description {
            padding: .5rem 1rem;
            font-size: 1rem;
            font-family: 'Bebas';
        }

        .content {

            .nav-box {
                position: relative;
                width: 100%;

                .network {
                    position: relative;
                    width: 100%;
                    height: 2rem;
                    line-height: 2rem;
                    border-bottom: 1px solid #ddd;

                    .network-tag {
                        display: flex;
                        flex-direction: row;
                        justify-content: center;
                        align-items: center;
                        height: 1rem;
                        line-height: 1rem;
                        padding: 0 .5rem;
                        position: absolute;
                        top: 50%;
                        transform: translateY(-50%);
                        right: 1rem;
                        font-size: .6rem;
                        background: #e8fdff;
                        color: #333;
                        border-radius: 3px;
                    }

                    .network-status {
                        position: relative;
                        width: .5rem;
                        height: .5rem;
                        background: #108688;
                        border-radius: 50%;
                        margin-right: .25rem;
                    }

                }
                .account {
                    position: relative;
                    width: 100%;
                    height: 2rem;
                    line-height: 2rem;
                    border-bottom: 1px solid #ddd;
                    display: flex;
                    flex-direction: row;
                    justify-content: center;
                    align-items: center;

                    .from, .to {
                        font-size: .65rem;
                        flex: 1;
                        text-align: center;
                        display: flex;
                        justify-content: center;
                        align-items: center;

                        canvas {
                            margin-right: .5rem;
                        }

                    }
                    .arrow-right {
                        position: absolute;
                        top: 50%;
                        left: 50%;
                        transform: translate(-50%, -50%);
                        width: 1.5rem;
                        height: 1.5rem;
                        background: url("../../assets/images/common/arrow-right.png") no-repeat;
                        background-size: 100% 100%;
                    }

                }
            }
            .btn-box {
                display: flex;
                flex-direction: row;
                justify-content: center;
                align-items: center;

                a {
                    flex: 1;
                    margin: 1rem 1rem;
                }

            }
        }
    }

    @media only screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) {
        .nav-box {
            padding-top: 44px;
        }
    }
</style>
