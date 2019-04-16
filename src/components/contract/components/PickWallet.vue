<style scoped lang="scss">
    .gxb /deep/ .modal-wrapper {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        .modal-container {
            color: #333;
            background-color: #fff;
            padding: 0;
            .modal-header {
                .header{
                    position: relative;
                    padding: 15px 0;
                    margin: 0 15px;
                    border-bottom: 1px solid #ddd;
                    color: #344961;
                    text-align: center;
                    font-size: 16px;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    .closeBtn {
                        position: absolute;
                        top: 10px;
                        right: 10px;
                        width: 20px;
                        height: 20px;
                        background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAABPUlEQVRoQ+2XUQ6CQAxEy828iXoy9SbeTFMDyYaAtjOzEGL5UmPLvJntLgx28Gs4uH4rgL0TrAQqAdKBWkKkgXR5JUBbSDaoBEgD6fK/T+BuZi8zu4JWsvXUw5zf/DwK989ZCLb+c2tmCbUCvFcGYl77MLMLkiIDMImeUohCyMSzCUyGZZKQilcBRJOQi1cC/ILoIl4NsAbhc9bOCTywS0PODvFSz7nb7X+k4nsksDbY/rtc/NYAmXMifCRsvYTkEGqApd3G3cwedrsk8G2rzBx2YfHKGYjs810gFEsoIh557AglwQJkxHeBYAAQ8XIIBsCf32+jIuSQag3wlyH/nr4YAL+ZQ5zQl5FR9BMVr9yF0s6pCtgEVDrgPgUAWycqrARERsJtKgHYOlFhJSAyEm5TCcDWiQorAZGRcJs3kqZFMRtRkakAAAAASUVORK5CYII=");
                        background-size: 100% 100%;
                    }
                }
            }
            .modal-body {
                margin: 0;
                .body{
                    text-align: center;
                    font-size: .7rem;
                    line-height: 1.25rem;
                .cont {
                    padding: 15px;
                    min-height: 36px;
                    position: relative;
                    }
                    .list-block {
                        margin: 0;
                        height: 8rem;
                        overflow: auto;
                    }
                    .unlocked-wallet {
                        height: auto;
                        margin-bottom: 15px;
                    }
                    .list-block ul {
                        margin: 0 .75rem;
                        background-color: transparent;
                        &::before {
                            height: 0;
                        }
                        .item-content {
                            color: #6699ff;
                            padding-left: 0;
                            min-height: 1.8rem;
                            .item-inner {
                                min-height: 1.8rem;
                                padding: 0;
                            }
                        }
                    }
                    .empty-placeholder {
                        margin-top: 1rem;
                    }
                    .gxicon-bind {
                        font-size: 4.5rem;
                        color: #d5d5d5;
                    }
                    .btn-wallet {
                        background-color: #6699ff;
                        color: #fff;
                        width: 70%;
                        margin: 0 auto .5rem auto;
                        border-radius: 4rem;
                        font-size: 16px;
                        line-height: 2rem;
                        height: 2rem;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        .line-scale-pulse-out {
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            div {
                                width: 2px;
                                height: 18px;
                            }
                        }
                    }
                }
            }
            .modal-footer {
                .footer {
                    display: flex;
                    flex-direction: row;
                    // border-top: 1px solid #484b53;
                    position: relative;
                    &::before {
                        display: block;
                        position: absolute;
                        left: 0;
                        top: 0;
                        width: 100%;
                        border-top: 1px solid #484b53;
                        content: ' ';
                    }
                    .btn {
                        position: relative;
                        flex: 1;
                        height: 2rem;
                        line-height: 2rem;
                        font-size: .16px;
                        text-align: center;
                    }
                    .btn:nth-child(2):after {
                        content: '';
                        position: absolute;
                        left: 0;
                        bottom: 0;
                        right: auto;
                        top: auto;
                        height: 100%;
                        width: 1px;
                        background-color: #484b53;
                        display: block;
                        transform-origin: 100% 50%;
                    }
                    .highlight {
                        color: #6699ff;
                        font-weight: bold;
                    }
                }
            }
            .icon-check {
                color: #6699ff;
                font-weight: bold;
            }
        }
    }
    @media (-webkit-min-device-pixel-ratio: 2),(min-device-pixel-ratio: 2) {
        .header {
            &::after {
                -webkit-transform: scaleY(0.5);
                transform: scaleY(0.5);
            }
        }
        .footer {
            &::before {
                -webkit-transform: scaleY(0.5);
                transform: scaleY(0.5);
            }
        }
    }
</style>
<template>
    <Modal v-if="visibility" class="gxb">
        <div class="header" slot="header">
            {{$t('pick_wallet.title.step1')}}
            <div class="closeBtn" @click="onCancel()"></div>
        </div>
        <div class="body" slot="body">
            <div class="cont">
                <div class="pick-wallet">
                    <div class="list-block" v-if="wallets.length>0">
                        <ul>
                            <li v-for="(item, index) in wallets" :key="item.account">
                                <a @click.stop="chooseWallet(item.account, index)" class="item-content">
                                    <div class="item-inner">
                                        <div class="item-title">{{item.account}}</div>
                                        <div class="item-after" v-if="item.account === pickedAccount">
                                            <span class="icon icon-check"></span>
                                        </div>
                                    </div>
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div v-else class="empty-placeholder">
                        <i class="gxicon gxicon-bind"></i>
                        <p class="empty-tip">{{$t('pick_wallet.empty_tip') }}</p>
                    </div>
                </div>
                <div class="btn-wallet" @click="onConfirm($event)" v-if="account">
                    <span>{{$t('pick_wallet.btn.confirm')}}</span>
                </div>
            </div>
        </div>
        <div class="footer" slot="footer"></div>
    </Modal>
</template>
<script>
    import Modal from '@/components/sub/Modal.vue';
    import {set_wallet_index} from '@/services/WalletService';
    export default {
        name: 'pick-wallet',
        props: {
            wallets: {
                type: Array,
                required: true
            },
            account: {
                type: String,
                default: ''
            }
        },
        data () {
            return {
                pickedAccount: '',
                visibility: false
            };
        },
        mounted () {
            this.pickedAccount = this.account;
        },
        methods: {
            show () {
                this.visibility = true;
            },
            onConfirm () {
                this.visibility = false;
                this.$emit('confirm', this.pickedAccount);
            },
            onCancel () {
                this.$emit('cancel');
            },
            chooseWallet (account, index) {
                this.pickedAccount = account;
                set_wallet_index(index);
            }
        },
        components: {
            Modal
        }
    };
</script>
