<template>
  <div class="page-group">
    <div class="page" id="page-wallet-create-success">
      <header class="bar bar-nav">
        <h3 class="title">{{$t('transfer.success.title')}}</h3>
        <router-link :to="linkBack" replace class="icon icon-left"></router-link>
      </header>
      <div class="content">
        <div class="center-content">
          <div class="content-block">
            <success-check-mark></success-check-mark>
            <p class="text-center text-success">{{$t('transfer.success.tip1')}}</p>
            <p class="text-center"><span>{{$route.query.account}}</span>&nbsp;{{$t('transfer.success.tip2')}}</p>
            <p class="text-center"><span class="asset">{{$route.query.amount | asset(2)}}</span>&nbsp;GXS</p>
          </div>
        </div>
        <div class="content-block button-block">
          <p>
            <router-link :to="linkBack" replace class="button button-gxb">{{$t('transfer.success.done')}}</router-link>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import SuccessCheckMark from './sub/SuccessCheckMark.vue'
  import filters from '@/filters'

  export default {
    filters,
    mounted() {
      $.init();
    },
    computed: {
      linkBackup() {
        let query = this.$route.query;
        query.nativeHook = false;
        return `/wallet-backup?${$.param(query)}`;
      },
      linkBack() {
        let query = this.$route.query;
        return query.from || `/transfer?${$.param(query)}`
      }
    },
    methods: {
      goWalletIndex() {
        if (this.isNative) {
          //pop all
          cordova.exec(null, null, 'Controller', 'popTo', [99]);
        }
        else {
          this.$router.replace({
            path: '/'
          });
        }
      }
    },
    components: {
      SuccessCheckMark
    }
  }
</script>
<style scoped lang="scss">
  .content {
    background: #fff;
  }

  .center-content {
    margin-top: 3rem;
    align-items: flex-end;
    display: flex;
    justify-content: center;
    letter-spacing: .15rem;
    .content-block {
      width: 100%;
    }
    .text-success {
      margin-top: 1.5rem;
    }
    .block-button {
      margin-top: 1rem;
    }
  }

  .tip-alert {
    margin-top: 5rem;
    letter-spacing: normal;
  }

  .asset {
    color: #6699ff;
    font-family: bebas;
    font-size: 1.1rem;
  }

  .link-green {
    color: #a2dfd9
  }
</style>
