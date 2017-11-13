<template>
  <div class="page-group">
    <div class="page" id="page-loyalty-program-detail">
      <header class="bar bar-nav">
        <router-link :to="link('/loyalty-program')" class="icon icon-left pull-left"></router-link>
        <h3 class="title">{{$t('loyalty_program.detail.title')}}</h3>
      </header>
      <div class="content">
        <div class="list-block">
          <ul>
            <li class="item-content">
              <div class="item-inner">
                <div class="item-title">{{$t('loyalty_program.locked_at')}}</div>
                <div class="item-after">{{locked_at.toLocaleString()}}</div>
              </div>
            </li>
            <li class="item-content">
              <div class="item-inner">
                <div class="item-title">{{$t('loyalty_program.locked_amount')}}</div>
                <div class="item-after">{{amount | asset(2)}}</div>
              </div>
            </li>
            <li class="item-content">
              <div class="item-inner">
                <div class="item-title">{{$t('loyalty_program.bonus')}}</div>
                <div class="item-after">
                  <span class="color-danger">{{rate}}</span>%
                </div>
              </div>
            </li>
            <li class="item-content">
              <div class="item-inner">
                <div class="item-title">{{$t('loyalty_program.expected_bonus')}}(GXS)</div>
                <div class="item-after">
                  <span class="color-primary">{{bonus}}</span>
                </div>
              </div>
            </li>
            <li class="item-content">
              <div class="item-inner">
                <div class="item-title">{{$t('loyalty_program.term')}}</div>
                <div class="item-after">{{term}}</div>
              </div>
            </li>
            <li class="item-content">
              <div class="item-inner">
                <div class="item-title">{{$t('loyalty_program.due')}}</div>
                <div class="item-after">{{due}}</div>
              </div>
            </li>
            <li class="item-content" v-if="status=='locked'">
              <div class="item-inner">
                <div class="item-title">{{$t('loyalty_program.status.title')}}</div>
                <div class="item-after">{{$t(`loyalty_program.status.locked`)}}</div>
              </div>
            </li>
            <li @click="unlock_balance" class="item-content" :class="{'item-link':!submitting}" v-if="status=='can_unlock'">
              <div class="item-inner">
                <div class="item-title">{{$t('loyalty_program.status.title')}}</div>
                <div class="item-after">
                  <span class="color-success" v-if="!submitting">
                  {{$t(`loyalty_program.status.can_unlock`)}}
                  </span>
                  <div class="line-scale-pulse-out" v-if="submitting">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div class="content-block">
          <p class="tip-error" v-if="error.common">{{error.common}}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import {get_objects, unlock_balance, get_wallets, get_wallet_index} from '@/services/WalletService'
  import filters from '@/filters'

  export default {
    filters,
    data() {
      let wallets = get_wallets();
      return {
        currentWallet: wallets[get_wallet_index()],
        locked_at: '',
        amount: '',
        lock_days: 0,
        rate: '',
        term: '',
        status: 'locked',
        error: {
          common: ''
        },
        submitting: false
      }
    },
    mounted() {
      $.init();
      this.loadLockedBalance();
    },
    computed: {
      due(){
        if (!this.locked_at) {
          return '';
        }
        let date = new Date(this.locked_at);
        date.setDate(date.getDate() + Number(this.lock_days));
        return date.toLocaleString()
      },
      bonus() {
        if (!this.amount || isNaN(Number(this.amount)) || !this.rate) {
          return ''
        }
        return filters.asset(this.lock_days / 360 * this.rate * this.amount, 2);
      }
    },
    methods: {
      loadLockedBalance() {
        get_objects([this.$route.params.id]).then(results => {
          let locked_balance = results[0];
          this.locked_at = new Date(locked_balance.create_date_time + 'Z');
          this.lock_days = locked_balance.lock_days;
          this.amount = locked_balance.amount.amount / 100000;
          this.rate = locked_balance.interest_rate / 100;
          this.term = this.lock_days < 30 ? this.$tc('loyalty_program.day', this.lock_days, {day: this.lock_days}) : this.$tc('loyalty_program.month', this.lock_days / 30, {month: this.lock_days / 30});
          if (new Date() - this.locked_at > this.lock_days * 24 * 3600 * 1000) {
            this.status = 'can_unlock';
          }
        })
      },
      unlock_balance() {
        let self = this;
        this.error.common = '';
        if (this.submitting) {
          return;
        }
        $.modal({
          title: '',
          text: self.$t('unlock.tip_password'),
          afterText: `<input placeholder="${self.$t('unlock.placeholder.password')}" class="modal-text-input" id="pwd" type="password"/>`,
          buttons: [{
            text: self.$t('unlock.cancel')
          }, {
            text: self.$t('unlock.ok'),
            onClick() {
              self.submitting = true;
              unlock_balance(self.$route.params.id, self.currentWallet.account, $('#pwd').val(), true)
                .then(result => {
                  self.submitting = false;
                  $.alert(self.$t('loyalty_program.detail.success.message', {amount: filters.asset(self.amount, 2)}), self.$t('loyalty_program.detail.success.title'), function () {
                    self.$router.replace({
                      path: self.link('/loyalty-program')
                    });
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
<style scoped>
  .line-scale-pulse-out > div {
    background-color: #3d3d3b;
    width: 3px;
    height: 18px;
    margin: -1px;
  }
</style>
