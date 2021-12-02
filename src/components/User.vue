<template>
    <div class="page-group">
        <div class="page" id="page-user-my">
          <header class="bar bar-nav">
                <h3 class="title">{{$t('my.title')}}</h3>
            </header>
            <wallet-tab></wallet-tab>
            <div class="content">
                <div class="content-block">
                    <p class="text-center">
                        <span class="gxicon gxicon-user"></span>
                    </p>
                </div>
                <div class="list-block">
                    <ul>
                        <li>
                            <router-link :to="link('/income')" class="item-content item-link">
                                <div class="item-media">
                                    <i class="gxicon gxicon-profit"></i>
                                </div>
                                <div class="item-inner">
                                    <div class="item-title">{{$t('left_panel.Income_received')}}</div>
                                </div>
                            </router-link>
                        </li>
                        <li>
                            <router-link :to="link('/proposal')" class="item-content item-link">
                                <div class="item-media">
                                    <i class="gxicon gxicon-proposal"></i>
                                </div>
                                <div class="item-inner">
                                    <div class="item-title">Proposal</div>
                                </div>
                            </router-link>
                        </li>
                    </ul>
                </div>
                <div class="list-block">
                    <ul>
                        <li>
                            <router-link :to="link('/wallet-import')" class="item-content item-link">
                                <div class="item-media">
                                    <i class="gxicon gxicon-import"></i>
                                </div>
                                <div class="item-inner">
                                    <div class="item-title">{{$t('left_panel.import_wallet')}}</div>
                                </div>
                            </router-link>
                        </li>
                        <li>
                            <router-link :to="link('/wallet-create-step-1')" class="item-content item-link">
                                <div class="item-media">
                                    <i class="gxicon gxicon-wallet"></i>
                                </div>
                                <div class="item-inner">
                                    <div class="item-title">{{$t('left_panel.create_wallet')}}</div>
                                </div>
                            </router-link>
                        </li>
                    </ul>
                </div>
                <div class="list-block">
                    <ul>
                        <li>
                            <router-link :to="link('/wallet-manage')" class="item-content item-link">
                                <div class="item-media">
                                    <i class="gxicon gxicon-dashboard"></i>
                                </div>
                                <div class="item-inner">
                                    <div class="item-title">{{$t('left_panel.manage_wallets')}}</div>
                                </div>
                            </router-link>
                        </li>
                        <li>
                            <router-link :to="link('/trade-history')" class="item-content item-link">
                                <div class="item-media">
                                    <i class="gxicon gxicon-record"></i>
                                </div>
                                <div class="item-inner">
                                    <div class="item-title">{{$t('left_panel.history')}}</div>
                                </div>
                            </router-link>
                        </li>
                    </ul>
                </div>
                <div class="list-block">
                    <ul class="last" v-if="$route.query.channel !== 'blockcity'">
                        <li>
                            <router-link :to="link('/language-setting')" class="item-content item-link">
                                <div class="item-media">
                                    <i class="gxicon gxicon-language"></i>
                                </div>
                                <div class="item-inner">
                                    <div class="item-title">{{$t('left_panel.language')}}</div>
                                </div>
                            </router-link>
                        </li>
                        <li>
                            <router-link :to="link('/about')" class="item-content item-link">
                                <div class="item-media">
                                    <i class="gxicon gxicon-users"></i>
                                </div>
                                <div class="item-inner">
                                    <div class="item-title">{{$t('left_panel.about')}}</div>
                                </div>
                            </router-link>
                        </li>
                    </ul>
                    <ul class="last" v-else>
                        <li>
                            <router-link :to="link('/disclaimer')" class="item-content item-link">
                                <div class="item-media">
                                    <i class="gxicon gxicon-users"></i>
                                </div>
                                <div class="item-inner">
                                    <div class="item-title">{{$t('left_panel.disclaimer')}}</div>
                                </div>
                            </router-link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import WalletTab from './sub/WalletTab';
export default {
    name: 'My',
    components: {
        WalletTab
    }
};
</script>

<style lang="scss" scoped>
.gxicon-user{
  font-size: 3rem;
}
</style>