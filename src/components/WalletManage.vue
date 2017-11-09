<template>
  <div class="page-group">
    <div class="page" id="page-wallet-manage">
      <header class="bar bar-nav">
        <h3 class="title">管理钱包</h3>
        <router-link :to="{path:'/'}" replace class="icon icon-left"></router-link>
      </header>
      <div class="content pull-to-refresh-content">
        <div class="pull-to-refresh-layer">
          <div class="preloader">
            <div class="line-scale">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
        </div>
        <div class="list-block wallets">
          <ul v-for="wallet in wallets" :key="wallet.account">
            <li class="wallet-info">
              <router-link :to="'/wallet-backup?account='+wallet.account" href="javascript:;"
                           class="item-content item-link">
                <div class="item-media">
                  <account-image :account="wallet.account" :size="20"></account-image>
                </div>
                <div class="item-inner">
                  <div class="item-title">
                    {{wallet.account}}
                  </div>
                  <div class="item-after color-danger" v-if="!wallet.backup_date">请备份</div>
                </div>
              </router-link>
            </li>
            <li class="item-content price-info">
              <div class="item-inner">
                <div class="item-title"></div>
                <div class="item-after"><span class="color-primary price">1982.00</span>&nbsp;GXS</div>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <nav class="bar bar-tab">
        <router-link class="tab-item external" :to="linkImport">
          <span class="gxicon gxicon-import"></span>
          &nbsp;
          <span class="tab-label">导入钱包</span>
        </router-link>
        <router-link class="tab-item external" :to="linkCreate">
          <span class="gxicon gxicon-wallet"></span>
          &nbsp;
          <span class="tab-label">创建钱包</span>
        </router-link>
      </nav>
    </div>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  import {get_wallets} from '@/services/WalletService'
  import AccountImage from './sub/AccountImage.vue'

  export default {
    data() {
      return {
        wallets: []
      }
    },
    methods: {
      loadWallets() {
        this.wallets = get_wallets();
        if (this.wallets.length == 0) {
          let query = this.$route.query;
          query.nativeHook = 0;
          this.$router.replace({
            path: `/wallet-create?${$.param(query)}`
          })
        }
        setTimeout(() => {
          $.pullToRefreshDone($(this.$el).find('.pull-to-refresh-content'));
        }, 500)
      }
    },
    mounted() {
      $.init();
      this.loadWallets();
      $(this.$el).on('refresh', '.pull-to-refresh-content', (e) => {
        this.loadWallets();
      })
    },
    computed: {
      ...mapGetters({
        isNative: 'isNative'
      }),
      linkImport() {
        let query = this.$route.query;
        query.from = this.$route.fullPath;
        delete query.nativeHook;
        return `/wallet-import?${$.param(query)}`;
      },
      linkCreate() {
        let query = this.$route.query;
        query.from = this.$route.fullPath;
        delete query.nativeHook;
        return `/wallet-create-step-1?${$.param(query)}`;
      }
    },
    components: {
      AccountImage
    }
  }
</script>
<style scoped lang="scss">
  .page, .content {
    background: #fff;
  }

  .pull-to-refresh-layer {
    .line-scale > div {
      background-color: #ccc;
    }
  }

  .wallets {
    margin-top: 2.3rem;
    margin-bottom: 2.8rem;
    .wallet-info {
      .item-media {
        padding-bottom: .65rem;
      }
      .item-inner {
        padding-bottom: 1rem;
        padding-top: 1rem;
      }
    }
    ul {
      margin-top: .2rem;
      background: #f0f5f6;
    }
    .price-info {
      .item-after {
        align-items: center;
        .price {
          font-size: 1rem;
          font-weight: bold;
        }
      }
    }
  }

</style>
