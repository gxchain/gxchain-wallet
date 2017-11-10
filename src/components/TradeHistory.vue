<template>
  <div class="page-group">
    <div class="page" id="page-trade-history">
      <header class="bar bar-nav">
        <h3 class="title">{{$t('trade_history.title')}}</h3>
        <router-link :to="link('/')" replace class="icon icon-left"></router-link>
        <a class="pull-right icon account-switch" v-if="wallets&&wallets.length>1">
          {{$t('trade_history.switch')}}
          <select @change="switchWallet">
            <option v-for="(wallet,i) in wallets" :value="i" :selected="i==currentWalletIndex">{{wallet.account}}
            </option>
          </select>
        </a>
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
        <div class="tip-info text-center">
          {{$t('trade_history.currentAccount', {account: currentWallet.account})}}
        </div>
        <div class="list-block" v-if="histories.length>0">
          <ul>
            <li v-for="history in histories">
              <a class="item-content item-link">
                <div class="item-inner">
                  <div class="item-title label"></div>
                </div>
              </a>
            </li>
          </ul>
        </div>
        <p class="tip-warning text-center">{{$t('trade_history.empty')}}</p>
      </div>
    </div>
  </div>
</template>
<script>
  import {fetch_account_histroy, get_wallets, get_wallet_index, set_wallet_index} from '@/services/WalletService'

  export default {
    data() {
      return {
        wallets: get_wallets(),
        currentWalletIndex: get_wallet_index(),
        histories: []
      }
    },
    methods: {
      loadHistory() {
        setTimeout(() => {
          $.pullToRefreshDone($(this.$el).find('.pull-to-refresh-content'));
        }, 500)
      },
      switchWallet(e) {
        let index = e.target.value;
        set_wallet_index(index);
        this.currentWalletIndex = index;
      }
    },
    computed: {
      currentWallet() {
        return this.wallets[this.currentWalletIndex];
      }
    },
    watch:{
      currentWalletIndex(){

      }
    },
    mounted() {
      $.init();
      $(this.$el).on('refresh', '.pull-to-refresh-content', (e) => {
        this.loadHistory(0);
      })
    }
  }
</script>
<style scoped lang="scss">

  .account-switch {
    select {
      font-size: .75rem;
      position: absolute;
      left: 0;
      top: 0;
      opacity: 0;
    }
  }
</style>
