<template>
  <div class="page-group">
    <div class="page" id="page-wallet-import-success">
      <header class="bar bar-nav">
        <h3 class="title">{{$t('wallet_import.success.title')}}</h3>
        <router-link :to="link('/')" replace class="icon icon-left"></router-link>
      </header>
      <div class="content">
        <div class="center-content">
          <div class="content-block">
            <success-check-mark></success-check-mark>
            <p class="text-center text-success">{{$t('wallet_import.success.tip1')}}</p>
            <p class="tip-alert text-center">{{$t('wallet_import.success.tip2')}}</p>
            <div class="content-block block-button">
              <p><router-link :to="linkBackup" href="javascript:;" class="button button-gxb">{{$t('wallet_import.success.backup_wallet')}}</router-link></p>
              <p class="text-center">
                <a class="link-green" herf="javascript:;" @click="goWalletIndex">{{$t('wallet_import.success.detail')}}</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import SuccessCheckMark from './sub/SuccessCheckMark.vue'

  export default {
    mounted() {
      $.init();
    },
    computed: {
      linkBackup(){
        let query={
          account:this.$route.query.account,
          from:this.$route.fullPath
        }
        return `/wallet-backup?${$.param(query)}`
      }
    },
    methods:{
      goWalletIndex(){
        if(this.isNative){
          //pop all
          cordova.exec(null,null,'Controller','popTo',[99]);
        }
        else{
          this.$router.replace({
            path:'/'
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
  .content{
    background: #fff;
  }
  .center-content {
    margin-top:3rem;
    align-items: flex-end;
    display: flex;
    justify-content: center;
    letter-spacing: .15rem;
    .content-block {
      width: 100%;
    }
    .text-success{
      margin-top:1.5rem;
    }
    .block-button{
      margin-top:1rem;
    }
  }

  .tip-alert {
    margin-top: 5rem;
    letter-spacing: normal;
  }

  .link-green {
    color:#a2dfd9
  }
</style>
