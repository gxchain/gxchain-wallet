<template>
  <div class="page" id="page-loyalty-program">
    <header class="bar bar-nav">
      <router-link class="icon icon-left pull-left" :to="link('/')"></router-link>
      <h3 class="title">{{$t('loyalty_program.title')}}</h3>
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
      <div class="tip-info">
        <h3>{{$t('loyalty_program.tip1')}}</h3>
        <p>{{$t('loyalty_program.tip2')}}</p>
      </div>
      <div class="content-block">
        <p>{{$t('loyalty_program.tip3')}}</p>
      </div>
      <div class="buttons-tab">
        <a :class="{active:tabIndex==0}" @click="tabIndex=0"
           class="tab-link button">{{$t('loyalty_program.join')}}</a>
        <a :class="{active:tabIndex==1}" @click="tabIndex=1"
           class="tab-link button">{{$t('loyalty_program.history')}}</a>
      </div>
      <div class="tabs">
        <div class="tab" :class="{active:tabIndex==0}">
          <div class="list-block">
            <ul>
              <li class="item-content item-link">
                <div class="item-inner">
                  <div class="item-title label">{{$t('loyalty_program.term')}}</div>
                  <div class="item-input text-right">
                    <select v-model="term">
                      <option v-for="t in terms" :value="t">{{t.text}}</option>
                    </select>
                  </div>
                </div>
              </li>
              <li class="item-content">
                <div class="item-inner">
                  <div class="item-title label auto-width">{{$t('loyalty_program.bonus')}}</div>
                  <div class="item-after">
                    <span class="color-danger">{{rate|number(1)}}</span>%
                    <span v-if="bonus">/{{bonus}}&nbsp;GXS</span>
                  </div>
                </div>
              </li>
              <li class="item-content">
                <div class="item-inner">
                  <div class="item-title label">{{$t('loyalty_program.due')}}</div>
                  <div class="item-after">
                    {{due}}
                  </div>
                </div>
              </li>
              <li class="item-content last">
                <div class="item-inner">
                  <div class="item-title label">{{$t('loyalty_program.amount')}}</div>
                  <div class="item-input">
                    <input :placeholder="$t('loyalty_program.placeholder.amount')" type="number" v-model="amount"
                           @change="onAmountChange">
                  </div>
                  <div class="item-after">GXS</div>
                </div>
              </li>
              <li class="tip-alert" v-if="error.amount">
                <div>{{error.amount}}</div>
              </li>
              <li class="tip-success" v-if="balance!=-1">
                <div v-html="$t('loyalty_program.available', {amount: formattedBalance})"></div>
              </li>
            </ul>
          </div>
          <div class="content-block button-block" v-if="balance!=-1">
            <p class="tip-error" v-if="error.common">{{error.common}}</p>
            <p>
              <a @click="onSubmit" class="button button-gxb" :class="{disabled:!submitEnable}"
                 v-html="submitting?submittingHTML:$t('loyalty_program.button_join',{bonus:rate})">
              </a>
            </p>
          </div>
        </div>
        <div class="tab" :class="{active:tabIndex==1}">
          <div class="list-block" v-if="histories.length>0">
            <ul>
              <li v-for="history in histories" class="history">
                <router-link :to="`/loyalty-program/${history.id}`" class="item-content item-link">
                  <div class="item-inner">
                    <div class="item-title-row">
                      <div class="item-title">{{history.amount | asset(2)}} GXS</div>
                      <div class="item-subtitle">{{history.created_at}}</div>
                    </div>
                    <div class="item-after">
                      <small :class="{'color-success':history.status=='can_unlock'}">
                        {{$t(`loyalty_program.status.${history.status}`)}}
                      </small>
                    </div>
                  </div>
                </router-link>
              </li>
            </ul>
          </div>
          <p v-else class="text-center">
            {{$t('loyalty_program.no_record')}}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {
    fetch_full_account,
    get_objects,
    get_wallets,
    get_wallet_index,
    fetch_account_balance,
    unlock_wallet,
    lock_balance
  } from '@/services/WalletService'
  import filters from '@/filters'

  export default {
    filters,
    data() {
      let wallets = get_wallets();
      return {
        tabIndex: 0,
        histories: [],
        currentWallet: wallets[get_wallet_index()],
        amount: '',
        terms: [],
        term: {},
        submitting: false,
        balance: -1,
        error: {
          common: '',
          amount: ''
        }
      }
    },
    watch: {
      amount() {
        this.error = {
          common: '',
          amount: ''
        }
      }
    },
    computed: {
      submittingHTML() {
        return `<div class="button-loading line-scale-pulse-out">
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                </div>`
      },
      rate() {
        return this.term.interest_rate
      },
      due() {
        if (!this.term.lock_days) {
          return '';
        }
        let date = new Date();
        date.setDate(date.getDate() + Number(this.term.lock_days));
        return date.toLocaleDateString()
      },
      bonus() {
        if (!this.amount || isNaN(Number(this.amount)) || !this.rate) {
          return ''
        }
        return filters.asset(this.term.lock_days / 360 * this.rate / 100 * this.amount, 2);
      },
      formattedBalance() {
        if (!this.balance) {
          return '0'
        }
        return filters.asset(this.balance);
      },
      submitEnable() {
        return this.amount && !this.error.amount;
      }
    },
    mounted() {
      $.init();
      this.load_init_data();
      $(this.$el).on('refresh', '.pull-to-refresh-content', (e) => {
        this.load_init_data();
      })
    },
    methods: {
      load_init_data() {
        this.loadSettings();
        this.fetch_balance();
        this.fetch_history();
      },
      onSubmit() {
        if (this.validate()) {
          this.unlock();
        }
      },
      validate() {
        if (this.amount < 1) {
          this.error.amount = this.$t('loyalty_program.error.too_less');
        }
        return this.validateAmount() && this.rate;
      },
      validateAmount() {
        let amount = Number(this.amount);
        if (isNaN(amount) || amount == 0) {
          this.error.amount = this.$t('transfer.error.amount.invalid');
          return false;
        }
        else if (amount > this.balance) {
          this.error.amount = this.$t('transfer.error.amount.insufficient_balance');
          return false;
        }
        this.error.amount = '';
        return true;
      },
      onAmountChange() {
        this.validateAmount();
      },
      loadSettings() {
        get_objects(['2.0.0']).then((results) => {
          let programSettings = results[0].parameters.extensions.find((item) => item[0] == 6);
          if (programSettings) {
            this.terms = programSettings[1].params.map(param => {
              let lock_days = param[1].lock_days;
              return {
                id: param[0],
                lock_days: lock_days,
                is_valid: param[1].is_valid,
                text: lock_days < 30 ? this.$tc('loyalty_program.day', lock_days, {day: lock_days}) : this.$tc('loyalty_program.month', lock_days / 30, {month: lock_days / 30}),
                interest_rate: param[1].interest_rate / 100
              }
            })
            if(this.terms.length>0){
              this.term = this.terms[this.terms.length-1];
            }
          }
        })
      },
      fetch_history() {
        fetch_full_account(this.currentWallet.account).then((results) => {
          let account = results && results[0] ? results[0][1] : {};
          let histories = account.locked_balances || [];
          histories = histories.map(history => {
            let created_at = new Date(history.create_date_time + 'Z');
            let status = 'locked';
            if (new Date() - created_at > history.lock_days * 24 * 3600 * 1000) {
              status = 'can_unlock'
            }
            return {
              id: history.id,
              created_at: created_at.toLocaleString(),
              amount: history.amount.amount / 100000,
              status
            }
          })
          this.histories = histories.reverse();
        }).catch(ex => {
          console.error(ex);
        })
      },
      fetch_balance() {
        fetch_account_balance(this.currentWallet.account).then((balance) => {
          this.balance = balance.amount / 100000;
          setTimeout(() => {
            $.pullToRefreshDone($(this.$el).find('.pull-to-refresh-content'));
          }, 500)
        }).catch(ex => {
          console.error(ex);
          setTimeout(() => {
            $.pullToRefreshDone($(this.$el).find('.pull-to-refresh-content'));
          }, 500)
        })
      },
      unlock() {
        let self = this;
        this.error.common = '';
        if (this.submitting) {
          return;
        }
        $.modal({
          title: '',
          text: self.$t('loyalty_program.modal.message'),
          afterText: `<input placeholder="${self.$t('unlock.placeholder.password')}" class="modal-text-input" id="pwd" type="password"/>`,
          buttons: [{
            text: self.$t('unlock.cancel')
          }, {
            text: self.$t('unlock.ok'),
            onClick() {
              self.submitting = true;
              lock_balance(self.term.id, self.currentWallet.account, self.amount * 100000, self.term.interest_rate * 100, self.term.lock_days, '', $('#pwd').val(), true)
                .then(result => {
                  self.submitting = false;
                  $.alert(self.$t('loyalty_program.success.message', {amount: filters.asset(self.amount, 2)}), self.$t('loyalty_program.success.title'), function () {
                    self.load_init_data();
                    self.amount = '';
                  })
                })
                .catch((ex) => {
                  self.submitting = false;
                  console.error(ex);
                  self.error.common = ex.message;
                })
            }
          }]
        })
      }
    }
  }
</script>
<style lang="scss" scoped>

  .tip-info, .tip-alert, .tip-success {
    padding-left: .75rem;
  }

  .content-block {
    font-size: .75rem;
    margin-top: .3rem;
    margin-bottom: .3rem;
  }

  .list-block {
    .item-title {
      width: 6.5rem;
      font-size: .8rem;
      &.auto-width {
        width: auto;
      }
    }

    .last .item-inner:after {
      height: 0;
    }
  }

  .history {
    .item-title {
      width: auto;
    }
    .item-subtitle {
      color: #757575;
    }
    .amount {
      align-items: flex-end;
    }
  }

  .button-gxb {
    font-size: .7rem;
  }
</style>
