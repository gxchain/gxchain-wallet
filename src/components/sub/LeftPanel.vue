<template>
    <div>
        <div class="panel-overlay"></div>
        <!--setting pannel-->
        <div class="panel panel-left panel-cover" ref="panel">
            <div class="content-block">
                <p class="text-center">
                    <span class="gxicon gxicon-user"></span>
                </p>
            </div>
            <div class="list-block">
                <ul>
                    <li>
                        <router-link :to="link('/wallet-import')" class="item-content">
                            <div class="item-media">
                                <i class="gxicon gxicon-import"></i>
                            </div>
                            <div class="item-inner">
                                <div class="item-title">{{$t('left_panel.import_wallet')}}</div>
                            </div>
                        </router-link>
                    </li>
                    <li>
                        <router-link :to="link('/wallet-create-step-1')" class="item-content">
                            <div class="item-media">
                                <i class="gxicon gxicon-wallet"></i>
                            </div>
                            <div class="item-inner">
                                <div class="item-title">{{$t('left_panel.create_wallet')}}</div>
                            </div>
                        </router-link>
                    </li>
                </ul>
                <ul>
                    <li>
                        <router-link :to="link('/wallet-manage')" class="item-content">
                            <div class="item-media">
                                <i class="gxicon gxicon-dashboard"></i>
                            </div>
                            <div class="item-inner">
                                <div class="item-title">{{$t('left_panel.manage_wallets')}}</div>
                            </div>
                        </router-link>
                    </li>
                    <li>
                        <router-link :to="link('/trade-history')" class="item-content">
                            <div class="item-media">
                                <i class="gxicon gxicon-record"></i>
                            </div>
                            <div class="item-inner">
                                <div class="item-title">{{$t('left_panel.history')}}</div>
                            </div>
                        </router-link>
                    </li>
                </ul>
                <ul class="last">
                    <li>
                        <router-link :to="link('/language-setting')" class="item-content">
                            <div class="item-media">
                                <i class="gxicon gxicon-language"></i>
                            </div>
                            <div class="item-inner">
                                <div class="item-title">{{$t('left_panel.language')}}</div>
                            </div>
                        </router-link>
                    </li>
                    <li>
                        <router-link :to="link('/about')" class="item-content">
                            <div class="item-media">
                                <i class="gxicon gxicon-users"></i>
                            </div>
                            <div class="item-inner">
                                <div class="item-title">{{$t('left_panel.about')}}</div>
                            </div>
                        </router-link>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        methods: {
            open () {
                $.openPanel(this.$refs.panel);
            }
        }
    };
</script>
<style scoped="" lang="scss">
    .panel-left {
        background: #ffffff;
        color: #666666;
        .gxicon-user {
            font-size: 3rem;
            color: #b7b7b7;
        }
        .content-block {
            margin-bottom: 0;
        }
        .list-block {
            margin-top: 0;
            ul {
                &:before {
                    height: 0;
                }
                padding: 1rem 0;
                .item-media .gxicon {
                    font-size: 1.1rem;
                }
                &.last:after {
                    height: 0;
                }
            }
            .item-inner:after {
                height: 0;
            }
            .item-title {
                font-size: .75rem;
            }
            .item-content {
                height: 2.5rem;
                color: inherit;
            }
        }
    }
</style>
