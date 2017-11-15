<template>
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
      <div class="list-block history" v-if="histories.length>0">
        <ul>
          <li v-for="history in histories">
            <router-link :to="`/trade/${history.id}`" class="item-content">
              <div class="item-inner">
                <div class="item-title-row">
                  <account-image class="image" :size="20"
                                 :account="formatted_account(history.account)"></account-image>
                  <div>
                    <div>{{formatted_account(history.account)}}</div>
                    <div>
                      <small class="color-light-gray">{{$t(`trade_history.${history.type}`)}}</small>
                    </div>
                  </div>
                </div>
                <div class="item-after">
                  <div>
                      <span
                        :class="{'color-positive':history.type == 'received','color-negative':history.type == 'sent'}">{{history.type == 'sent' ? '-' : '+'}}{{history.amount | asset(2)}}</span>
                    <small>GXS</small>
                  </div>
                  <div>
                    <small class="color-light-gray">{{$d(history.timestamp,'long')}}</small>
                  </div>
                </div>
              </div>
            </router-link>
          </li>
        </ul>
      </div>
      <p class="tip-warning text-center" v-if="histories.length==0">{{$t('trade_history.empty')}}</p>
    </div>
  </div>
</template>
<script>
  import {
    fetch_account_histroy,
    fetch_account,
    fetch_block,
    get_objects,
    get_wallets,
    get_wallet_index,
    set_wallet_index,
    calc_block_time
  } from '@/services/WalletService'
  import AccountImage from './sub/AccountImage.vue'
  import Promise from 'bluebird'
  import filters from '@/filters'

  export default {
    filters,
    data() {
      return {
        wallets: get_wallets(),
        currentWalletIndex: get_wallet_index(),
        histories: [],
        items: {},
        account: {}
      }
    },
    methods: {
      loadHistories() {
        if (!this.currentWallet && this.currentWallet.account) {
          return;
        }
        Promise.all([
          fetch_account(this.currentWallet.account),
          fetch_account_histroy(this.currentWallet.account),
        ]).then((results) => {
          let account = results[0];
          let histories = results[1] || [];
          histories = histories.filter((hist) => {
            return hist.op[0] == 0 && hist.op[1].amount.asset_id == '1.3.1';
          });
          histories = histories.map((hist) => {
            let type = hist.op[1].to == account.id ? "received" : "sent";
            let acc = type == 'received' ? hist.op[1].from : hist.op[1].to;
            let result = {
              id: hist.id,
              type: type,
              account: acc,
              amount: hist.op[1].amount.amount / 100000,
              timestamp: ''
            }
            fetch_block(hist.block_num).then((block) => {
              result.timestamp = new Date(block.timestamp + 'Z');
            })
            return result;
          });
          this.histories = histories;
          setTimeout(() => {
            $.pullToRefreshDone($(this.$el).find('.pull-to-refresh-content'));
          }, 500)
        }).catch(ex => {
          console.log(ex);
          setTimeout(() => {
            $.pullToRefreshDone($(this.$el).find('.pull-to-refresh-content'));
          }, 500)
        })
      },
      switchWallet(e) {
        let index = e.target.value;
        set_wallet_index(index);
        this.currentWalletIndex = index;
      },
      formatted_account(id) {
        let self = this;
        if (this.items[id]) {
          return this.account[id];
        }
        this.items[id] = true;
        get_objects([id]).then((accounts) => {
          let account = accounts[0];
          self.$set(self.account, id, account.name);
        }).catch(ex => {
          console.error(ex);
        });
        return this.account[id];
      },
    },
    computed: {
      currentWallet() {
        return this.wallets[this.currentWalletIndex];
      }
    },
    watch: {
      currentWalletIndex() {
        this.histories = [];
        this.loadHistories();
      }
    },
    mounted() {
      $.init();
      this.loadHistories();
      $.initPullToRefresh(this.$el);
      $(this.$el).on('refresh', '.pull-to-refresh-content', (e) => {
        this.loadHistories();
      })
    },
    components: {
      AccountImage
    }
  }
</script>
<style scoped lang="scss">

  .account-switch {
    font-size: .75rem;
    select {
      position: absolute;
      left: 0;
      top: 0;
      opacity: 0;
    }
  }

  .history {
    margin-top: 0;
    .item-inner {
      align-items: flex-start;
      .item-title-row {
        flex-direction: row;
        display: flex;
        .image {
          width: 40px;
          height: 40px;
          margin-right: 1rem;
        }
      }
      .item-after {
        flex-direction: column;
        display: flex;
        align-items: flex-end;
      }
    }
  }
</style>
