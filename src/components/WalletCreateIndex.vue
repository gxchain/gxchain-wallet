<template>
  <div class="page-group">
    <div class="page" id="page-wallet-empty">
      <div class="content">
        <header class="bar bar-nav">
          <h3 class="title">钱包</h3>
        </header>
        <div class="center-content">
          <div class="content-block">
            <p><i class="gxicon gxicon-bind"></i></p>
            <p class="text-bind">暂未绑定公信股钱包</p>
          </div>
          <div class="content-block block-button">
            <p>
              <router-link :to="linkCreate" class="button button-gxb">创建钱包</router-link>
            </p>
            <p>
              <router-link :to="linkImport" class="button button-gxb-secondary">导入钱包</router-link>
            </p>
            <p>
              <a>如何导入钱包？</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  import {get_wallets} from '@/services/WalletService'
  export default {
    methods: {
      loadWallets() {
        if (get_wallets().length>0) {
          let query = this.$route.query;
          query.nativeHook = 0;
          this.$router.replace({
            path: `/?${$.param(query)}`
          })
        }
      }
    },
    mounted() {
      $.init();
      this.loadWallets();
      if (this.isNative) {
//        cordova.exec(null, null, 'statusBar', 'styleDefault', []);
        window.webview = {
          reload: () => {
            this.loadWallets();
          }
        }
      }
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
    }
  }
</script>
<style scoped lang="scss">
  .content {
    background: #fff;
  }

  .center-content {
    margin-top: 3rem;
    flex-direction: column;
    align-items: flex-end;
    display: flex;
    justify-content: center;
    letter-spacing: .15rem;
    text-align: center;
    .gxicon-bind {
      font-size: 6.5rem;
      color: #d5d5d5;
    }
    .content-block {
      width: 100%;
    }
    .text-success {
      margin-top: 1.5rem;
    }
    .block-button {
      padding:0 2rem;
      margin-top: 1rem;
    }
  }

</style>
