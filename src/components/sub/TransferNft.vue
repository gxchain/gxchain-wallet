<template>
    <Modal v-if="show" :class="skin">
        <div class="header" slot="header">
            {{$t('nft.send')}}
        </div>
        <div class="body" slot="body">
            <div class="list-block">
                <ul>
                    <li>
                        <div class="item-content">
                            <div class="item-inner">
                                <div class="item-title label">{{$t('transfer.to')}}</div>
                                <div class="item-input">
                                    <input @change="onAccountChange" class="input-account" v-model="account" type="text" maxlength="80" :placeholder="$t('transfer.to_placeholder')">
                                </div>
                                <div class="item-after">
                                    <account-image :account="account" :size='14'></account-image>
                                </div>
                            </div>
                        </div>
                    </li>
                </ul>
                
            </div>
        </div>
        <div class="footer" slot="footer">
            <div class="content-block nodelist-footer">
                <div class="row">
                    <div class="col-50"><a href="#" class="button btn " @click="onCancel()">{{$t('staking.cancel')}}</a></div>
                    <div class="col-50"><a href="#" class="button btn  button-fill" @click="onConfirm()">{{$t('staking.confirm')}}</a></div>
                </div>
            </div>
            
        </div>
    </Modal>
</template>
<script>
    import Modal from '@/components/sub/Modal.vue';
    import AccountImage from '@/components/sub/AccountImage.vue';
    export default {
        name: 'transferNft',
        props: {
            show: {
                type: Boolean,
                required: true
            },
            currentaccount: {
                type: String
            },
            skin: {
                type: String,
                default: 'gxb'
            }
        },
        data () {
            return {
                submitting: false,
                account: '',
                error: {
                    account: '',
                    amount: '',
                    other: ''
                }
            };
        },
        methods: {
            onCancel () {
                this.$emit('closeModal');
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
            onConfirm () {
                if (!this.account) {
                    $.toast(this.$t('nft.please_input_account'));
                    return;
                }
                this.$emit('onConfirm', this.account);
            },
            onAccountChange () {
                this.validateAccount();
            },
            validateAccount () {
                let account_err = this.is_account_name_error();
                if (account_err) {
                    this.error.account = this.$t(`transfer.error.account.${account_err}`);
                    return false;
                }
                if (this.currentaccount == this.account) {
                    this.error.account = this.$t('transfer.error.account.cannot_send_to_yourself');
                    return false;
                } else {
                    this.error.account = '';
                }
                return true;
            },
            is_account_name_error () {
                let account = this.account;
                var i, label, len, length;

                if (!account) {
                    return 'empty_account';
                }
                length = account.length;
                if (length < 3) {
                    return 'account_should_be_longer';
                }
                if (length > 63) {
                    return 'account_should_be_shorter';
                }

                let ref = account.split('.');
                for (i = 0, len = ref.length; i < len; i++) {
                    label = ref[i];
                    if (!/^[~a-z]/.test(label)) {
                        return 'account_should_start_with_a_letter';
                    }
                    if (!/^[~a-z0-9-]*$/.test(label)) {
                        return 'account_format_error';
                    }
                    if (/--/.test(label)) {
                        return 'account_one_dash_error';
                    }
                    if (!/[a-z0-9]$/.test(label)) {
                        return 'account_end_error';
                    }
                    // if (!(label.length >= 3)) {
                    //     return 'account_segment_should_be_longer';
                    // }
                }
                return null;
            }
        },
        components: {
            Modal,
            AccountImage
        }
    };
</script>
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
                        min-height: 2rem;
                        overflow: auto;
                        .item-input{
                            input, select{
                                padding:0;
                            }
                        }
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
                        &::after {
                            background-color: transparent;
                        }
                        .item-content {
                            color: #6699ff;
                            padding-left: 0;
                            min-height: 1.8rem;
                            .item-inner {
                                min-height: 1.8rem;
                                padding: 0;
                            }
                            .label{
                                text-align: left;
                            }
                        }
                    }
                    .gray-select{
                        color: #dbdbd9;
                    }
                    .empty-placeholder {
                        margin-top: 1rem;
                    }
                    .gxicon-bind {
                        font-size: 4.5rem;
                        color: #d5d5d5;
                    }
                    .item-right-cont{
                        text-align: left;
                        color:#344961
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
                    border-top: 1px solid #ddd;
                    .btn {
                        position: relative;
                        flex: 1;
                        height: 2rem;
                        line-height: 2rem;
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
                    .nodelist-footer{
                      width: 80%;
                      margin: 1rem auto;
                      padding: 0;
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