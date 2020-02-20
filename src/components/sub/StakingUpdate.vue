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
                                input, select{
                                    padding:0;
                                }
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
                    .gray-select{
                        color: #dbdbd9;
                    }
                    .item-right-cont{
                        text-align: left;
                        color:#344961
                    }
                    .item-inner .label{
                      text-align: right;
                      margin-right: 0.5rem;
                    }
                    .accounts {
                      margin-top: 0;
                      .account-item {
                          display: flex;
                          flex-direction: row;
                          justify-content: space-between;
                          align-items: center;
                          .account-item-left {
                              flex: 1;
                              display: flex;
                              flex-direction: row;
                              justify-content: flex-start;
                              align-items: center;
                              .account-avatar {
                                  .logo {
                                      width: 30px;
                                      height: 30px;
                                      border-radius: 100%;
                                      border: 1px solid #f2f2f2;
                                  }
                              }
                              .account-info {
                                  margin-left: .75rem;
                                  height: 30px;
                                  display: flex;
                                  flex-direction: column;
                                  justify-content: space-between;
                                  align-items: flex-start;
                                  .account-name {
                                      color: #17233d;
                                      font-size: .7rem;
                                  }
                                  .account-url {
                                      color: #808695;
                                      font-size: .6rem;
                                      height: 13px;
                                      max-width: 8rem;
                                      white-space: nowrap;
                                      overflow: hidden;
                                      text-overflow: ellipsis;
                                  }
                              }
                          }
                          .account-item-center {
                              color: #17233d;
                              font-size: .6rem;
                              margin-right: .75rem;
                              text-align: right;
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
                    .nodelist-footer{
                      width: 80%;
                      margin: 1rem auto;
                    }
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
    <Modal v-if="show" :class="skin">
        <div class="header" slot="header">
            {{$t('staking.staking_update')}}
            <div class="closeBtn" @click="onCancel()"></div>
        </div>
        <div class="body" slot="body">
            <div class="cont">
              <div class="list-block">
                    <ul>
                       <li>
                            <div class="item-content">
                                <div class="item-inner">
                                    <div class="item-title label">{{$t('staking.select_node')}}：</div>
                                    <div class="item-input">
                                        <select  v-model="currentSelectValue"  :class="{'gray-select':!currentSelectValue}">
                                             <option value='' selected="selected">{{$t('staking.please_select_node')}}</option>
                                            <option v-for="(item, index) in accounts" :key="index" :value="item.id"  >{{item.name}}</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div class="item-content">
                                <div class="item-inner">
                                    <div class="item-title label">{{$t('staking.staking_program')}}：</div>
                                    <div class="item-input item-right-cont">
                                          {{stakingInfo.text}}
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div class="item-content">
                                <div class="item-inner">
                                    <div class="item-title label">{{$t('staking.staking_amount')}}：</div>
                                    <div class="item-input item-right-cont">
                                    {{stakingInfo.amount.amount/100000}} GXC
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div class="item-content">
                                <div class="item-inner">
                                    <div class="item-title label">{{$t('staking.fee')}}：</div>
                                    <div class="item-input item-right-cont">
                                        {{stakingFee.amount/100000}} GXC
                                    </div>
                                </div>
                            </div>
                        </li>
                    </ul>
                    
                </div>
            </div>
        </div>
        <div class="footer" slot="footer">
            <div class="content-block nodelist-footer">
                <div class="row">
                    <div class="col-50"><a href="#" class="button btn" @click="onCancel()">{{$t('staking.cancel')}}</a></div>
                    <div class="col-50"><a href="#" class="button btn button-fill " @click="onUpdateStakingConfirm()">{{$t('staking.confirm')}}</a></div>
                </div>
            </div>
            
        </div>
    </Modal>
</template>
<script>
    import Modal from '@/components/sub/Modal.vue';
    export default {
        name: 'staking-update',
        props: {
            show: {
                type: Boolean,
                required: true
            },
            skin: {
                type: String,
                default: 'gxb'
            },
            accounts: {
                type: Array,
                required: true
            },
            stakingInfo: {
                type: Object,
                required: true
            },
            stakingFee: {
                type: Object,
                required: true
            }
        },
        data () {
            return {
                submitting: false,
                currentSelectValue: ''
            };
        },
        mounted () {
        },
        methods: {
            onCancel () {
                this.$emit('onCancel');
            },
            onUpdateStakingConfirm () {
                if (!this.currentSelectValue) {
                    $.toast(this.$t('staking.please_select_node'));
                    return;
                }
                this.$emit('onUpdateStakingConfirm', this.currentSelectValue);
            }
        },
        components: {
            Modal
        }
    };
</script>
