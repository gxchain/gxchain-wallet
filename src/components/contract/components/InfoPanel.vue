<template>
    <div class="info-panel">
        <div class="tab-header">
            <!--<div class="func-name">Method: {{methodName}}</div>-->
            <!--<div class="func-total">{{asset.amount}}&nbsp;&nbsp;{{asset.symbol}}</div>-->
            <div class="tab-bar">
                <div class="tab-bar-item" v-if="isShowTab1" :class="currentTab === 1 ? 'active' : ''"
                        @click="handleTab(1)">
                    {{$t('smart_contract.tabs.detail')}}
                </div>
                <div class="tab-bar-item" :class="currentTab === 2 ? 'active' : ''" @click="handleTab(2)">
                    {{$t('smart_contract.tabs.data')}}
                </div>
            </div>
        </div>
        <div class="tab-container" v-show="currentTab === 1">
            <div class="tab-item" v-for="item in items">
                <div class="key">{{item.key}}</div>
                <div class="value">
                    {{item.value}}
                </div>
            </div>
        </div>
        <div class="tab-container" v-show="currentTab === 2">
            <div class="hex-data">
                <div class="label">{{$t('smart_contract.params.request_data')}}:</div>
                <div class="data">
                    <pre>{{data}}</pre>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: '',
        data () {
            return {
                currentTab: 1
            };
        },
        props: {
            items: {
                default: function () {
                    return [];
                },
                type: Array
            },
            data: [String, Object],
            isShowTab1: {
                type: Boolean,
                default: true
            }
        },
        created () {
            if (!this.isShowTab1) {
                this.currentTab = 2;
            }
        },
        methods: {
            handleTab (index) {
                this.currentTab = index;
            }
        }
    };
</script>

<style scoped type="text/scss" lang="scss">
    .info-panel {
        position: relative;
        width: 100%;
        background: #f9fafa;

        .tab-header {
            padding: 1rem 1rem 0;

            .tab-bar {
                position: relative;
                width: 100%;
                display: flex;

                .tab-bar-item {
                    height: 1.5rem;
                    line-height: 1.5rem;
                    width: 2rem;
                    margin-right: .5rem;
                    text-align: center;
                    font-size: .65rem;
                    color: #8c8e93;
                }

                .tab-bar-item.active {
                    color: #000;
                    border-bottom: 2px solid #6699ff;
                }

            }
        }
        .tab-container {
            position: relative;
            width: 100%;
            background: #fff;
            border-top: 1px solid #ddd;
            border-bottom: 1px solid #ddd;
            padding: 0 1rem;
            font-size: .65rem;

            .tab-item {
                position: relative;
                width: 100%;
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                align-items: center;
                border-bottom: 1px solid #ddd;
                padding: .5rem 0;
                font-family: 'Bebas';
            }

            .tab-item:last-child {
                border-bottom: none;
            }

            .hex-data {
                margin: .5rem 0;
                color: #8c8e93
            }

            .hex-data pre {
                word-break: break-all;
                white-space: pre-wrap;
                background: #f9fafa;
                padding: .5rem;
            }

        }
    }
</style>
