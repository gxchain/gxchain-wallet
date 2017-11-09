<template>
  <div class="page-group">
    <div class="page">
      <header class="bar bar-nav">
        <h3 class="title">{{$t('wallet_backup.index.title')}}</h3>
        <router-link :to="{path:$route.query.from||'/'}" replace class="icon icon-left"></router-link>
      </header>
      <div class="content">
        <div class="tip-info">
          {{$t('wallet_backup.index.tip')}}
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
                  {{$t('wallet_backup.index.label.account')}}
                </div>
                <div class="item-after">
                  {{$route.query.account}}
                </div>
              </div>
            </li>
            <li class="item-content">
              <div class="item-inner">
                <div class="item-title">
                  {{$t('wallet_backup.index.label.asset')}}
                </div>
                <div class="item-after">
                  {{balance | asset(2)}}
                </div>
              </div>
            </li>
            <li>
              <router-link :to="linkBackupKey" class="item-content item-link">
                <div class="item-inner">
                  <div class="item-title">
                    {{$t('wallet_backup.index.label.private_key')}}
                  </div>
                </div>
              </router-link>
            </li>
          </ul>
        </div>
        <div class="content-block button-block">
          <p>
            <router-link :to="linkBackupKey" class="button button-gxb">{{$t('wallet_backup.index.button_backup')}}
            </router-link>
          </p>
          <p>
            <a href="javascript:;" class="button button-gxb disabled">{{$t('wallet_backup.index.button_remove')}}</a>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  import AccountImage from './sub/AccountImage.vue'
  import {fetch_account_balance} from '@/services/WalletService'
  import filters from '@/filters'

  export default {
    filters,
    mounted() {
      $.init();
      this.loadBalance();
    },
    data() {
      return {
        balance: '**'
      }
    },
    methods: {
      loadBalance() {
        fetch_account_balance(this.$route.query.account).then((balance) => {
          this.balance = balance.amount / 100000;
        }).catch(ex => {
          console.error(ex);
        })
      }
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
  .tip-info{
    word-break:break-word;
  }
</style>

