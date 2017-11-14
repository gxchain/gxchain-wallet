<template>
  <div class="page-group">
    <div class="page" id="page-transfer">
      <header class="bar bar-nav">
        <h3 class="title">{{$t('transfer.title')}}</h3>
        <router-link :to="link('/')" replace class="icon icon-left"></router-link>
        <a v-if="isNative" href="javascript:;" class="icon gxicon gxicon-scan pull-right" @click="openQRScaner">
          <input ref="qrfile" @change="onFileUpload" v-if="!isNative" type="file" class="file-selector"/>
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
        <div class="list-block">
          <ul>
            <li class="item-content">
              <div class="item-inner">
                <div class="item-title label">{{$t('transfer.from')}}</div>
                <div class="item-input">
                  <input type="text" maxlength="30" readonly :value="currentWallet.account">
                </div>
                <div class="item-after">
                  <account-image :account="currentWallet.account" :size='14'></account-image>
                </div>
              </div>
            </li>
            <li class="item-content">
              <div class="item-inner">
                <div class="item-title label">{{$t('transfer.to')}}</div>
                <div class="item-input">
                  <input @change="onAccountChange" class="input-account" v-model="account" type="text" maxlength="30"
                         :placeholder="$t('transfer.to_placeholder')">
                </div>
                <div class="item-after">
                  <account-image :account="account" :size='14'></account-image>
                </div>
              </div>
            </li>
            <li class="tip-alert" v-if="error.account">
              <div>{{error.account}}</div>
            </li>
            <li class="item-content last">
              <div class="item-inner">
                <div class="item-title label">{{$t('transfer.amount')}}</div>
                <div class="item-input">
                  <input @change="onAmountChange" class="input-account" v-model="amount" type="number" maxlength="30"
                         :placeholder="$t('transfer.amount_placeholder')">
                </div>
              </div>
            </li>
            <li class="tip-alert" v-if="error.amount">
              <div>{{error.amount}}</div>
            </li>
            <li class="tip-success" v-if="balance!=-1">
              <div v-html="$t('transfer.available', {amount: formattedBalance})"></div>
            </li>
            <li class="item-content align-top">
              <div class="item-inner">
                <small class="item-title label">{{$t('transfer.memo')}}</small>
                <div class="item-input">
                  <textarea v-model="memo" :placeholder="$t('transfer.memo_placeholder')"></textarea>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div class="content-block">
          <p class="text-center tip-error" v-if="error.other">{{error.other}}</p>
        </div>
        <div class="button-block content-block ">
          <p>
            <a @click="onSubmit" href="javascript:;" class="button button-gxb"
               :class="{disabled:!submitEnable}">{{$t('transfer.send')}}</a>
          </p>
        </div>
      </div>
    </div>
    <transfer-confirm :account="currentWallet.account" :amount="amount" :to="account" :memo="memo"
                      ref="confirm"></transfer-confirm>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  import AccountImage from './sub/AccountImage.vue'
  import {get_wallets, get_wallet_index, fetch_account_balance, transfer} from '@/services/WalletService'
  import {ChainStore} from 'gxbjs'
  import util from '@/common/util'
  import errorHandler from '@/common/errorHandler'
  import filters from '@/filters'
  import TransferConfirm from './sub/TransferConfirm.vue'

  export default {
    filters,
    data() {
      let wallets = get_wallets();
      return {
        account: '',
        amount: '',
        memo: '',
        balance: -1,
        wallets: wallets,
        currentWallet: wallets[get_wallet_index()],
        error: {
          account: '',
          amount: '',
          other: ''
        }
      }
    },
    watch: {
      account() {
        this.error.other = '';
      },
      amount() {
        this.error.other = '';
      },
      currentWallet() {
        this.error.other = '';
      }
    },
    mounted() {
      $.init();
      $.initPullToRefresh(this.$el);
      this.account = this.$route.query.to || '';
      this.memo = this.$route.query.memo || '';
      this.fetch_balance();
      $(this.$el).on('refresh', '.pull-to-refresh-content', (e) => {
        this.fetch_balance();
      })
    },
    methods: {
      onSubmit() {
        let self = this;
        if (!this.submitEnable) {
          return;
        }
        if (this.validateAccount() && this.validateAmount()) {
          this.$refs.confirm.show();
//          $.modal({
//            title: '',
//            text: '请输入密码',
//            afterText: '<input placeholder="密码" class="modal-text-input" id="pwd-transfer" type="password"/>',
//            buttons: [{
//              text: '取消',
//              onClick() {
//
//              }
//            }, {
//              text: '确定',
//              onClick() {
//                $.showPreloader(self.$t('transfer.sending'));
//                transfer(self.currentWallet.account, self.account, self.amount, self.memo, $('#pwd-transfer').val()).then((resp) => {
//                  let query = $.extend({}, self.$route.query, {
//                    account: self.account,
//                    amount: self.amount,
//                    from: self.$route.fullPath
//                  })
//                  self.$router.push({
//                    path: `/transfer-success?${$.param(query)}`
//                  })
//                  $.hidePreloader();
//                }).catch(ex => {
//                  $.hidePreloader();
//                  self.fetch_balance();
//                  self.error.other = ex.message;
//                  console.error(ex);
//                })
//              }
//            }]
//          })
        }
      },
      onAmountChange() {
        this.validateAmount();
      },
      onAccountChange() {
        this.validateAccount();
      },
      validateAccount() {
        let account_err = this.is_account_name_error();
        if (account_err) {
          this.error.account = this.$t(`transfer.error.account.${account_err}`);
          return false;
        }
        if (this.currentWallet.account == this.account) {
          this.error.account = this.$t('transfer.error.account.cannot_send_to_yourself');
          return false;
        }
        else {
          this.error.account = ''
        }
        return true;
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
      is_account_name_error() {
        let account = this.account;
        var i, label, len, length;

        if (!account) {
          return 'empty_account';
        }
        length = account.length;
        if (length < 3) {
          return 'account_should_be_longer';
        }
        if (length > 63) {
          return 'account_should_be_shorter';
        }

        let ref = account.split('.');
        for (i = 0, len = ref.length; i < len; i++) {
          label = ref[i];
          if (!/^[~a-z]/.test(label)) {
            return 'account_should_start_with_a_letter';
          }
          if (!/^[~a-z0-9-]*$/.test(label)) {
            return 'account_format_error';
          }
          if (/--/.test(label)) {
            return 'account_one_dash_error';
          }
          if (!/[a-z0-9]$/.test(label)) {
            return 'account_end_error';
          }
          if (!(label.length >= 3)) {
            return 'account_segment_should_be_longer';
          }
        }
        return null;
      },

      openQRScaner() {
        let self = this;
        if (this.isNative) {
          cordova.exec(function (result) {
            if (/^qr:\/\/transfer/.test(result)) {
              var query = util.query2Obj(result.replace(/^qr:\/\/transfer/, ''));
              self.account = query.account || '';
              self.memo = query.memo || '';
            }
            //qr://transfer?to=gxb123&memo=
          }, null, 'QRCode', 'scan', []);
        }
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
      }
    },
    computed: {
      formattedBalance() {
        if (!this.balance) {
          return '0'
        }
        return filters.asset(this.balance);
      },
      submitEnable() {
        return this.account && this.amount;
      }
    },
    components: {
      AccountImage,
      TransferConfirm
    }
  }
</script>
<style scoped lang="scss">

  .tip-error, .tip-alert {
    word-break: break-word;
  }

  .list-block .item-title.label {
    width: 4.5rem;
  }

  .color-gray {
    color: lighten(#3d3d3b, 20%)
  }

  .list-block .last .item-inner:after {
    height: 0;
  }

  .tip-alert, .tip-success {
    padding-left: .75rem;
  }
</style>