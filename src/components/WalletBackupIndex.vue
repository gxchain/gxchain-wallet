<template>
  <div class="page-group">
    <div class="page">
      <header class="bar bar-nav">
        <h3 class="title">钱包备份</h3>
        <router-link :to="{path:$route.query.from||'/'}" replace class="icon icon-left"></router-link>
      </header>
      <div class="content">
        <div class="tip-info">
          当APP被删或在其他手机上使用钱包时，需导入当前钱包备份信 息，否则可能永久丢失钱包资产。请务必备份好钱包，并妥善保管备份信息
        </div>
        <div class="content-block text-center">
          <account-image :size="30" :account="$route.query.account"></account-image>
          <p>{{$route.query.account}}</p>
        </div>
        <div class="list-block">
          <ul>
            <li class="item-content">
              <div class="item-inner">
                <div class="item-title">
                  钱包账号
                </div>
                <div class="item-after">
                  {{$route.query.account}}
                </div>
              </div>
            </li>
            <li class="item-content">
              <div class="item-inner">
                <div class="item-title">
                  钱包资产（GXS）
                </div>
                <div class="item-after">
                  1890.00
                </div>
              </div>
            </li>
            <li>
              <router-link :to="linkBackupKey" class="item-content item-link">
                <div class="item-inner">
                  <div class="item-title">
                    私钥
                  </div>
                </div>
              </router-link>
            </li>
          </ul>
        </div>
        <div class="content-block button-block">
          <p>
            <router-link :to="linkBackupKey" class="button button-gxb">备份钱包</router-link>
          </p>
          <p>
            <a href="javascript:;" class="button button-gxb disabled">删除钱包</a>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  import AccountImage from './sub/AccountImage.vue'

  export default {
    mounted() {
      $.init();
    },
    computed: {
      ...mapGetters({
        isNative: 'isNative'
      }),
      linkBackupKey() {
        let query = {
          account: this.$route.query.account,
          from: this.$route.fullPath
        }
        return `wallet-backup-detail?${$.param(query)}`;
      }
    },
    components: {
      AccountImage
    }
  }
</script>
<style scoped lang="scss">
  .button-block {
    margin-top: 4rem;
  }
</style>

