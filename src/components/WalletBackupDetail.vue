<template>
  <div class="page-group">
    <div class="page" id="page-wallet-backup-detail">
      <header class="bar bar-nav">
        <h3 class="title">{{$t('wallet_backup.detail.title')}}</h3>
        <a href="javascript:void(0)" class="icon icon-left" @click="confirm"></a>
      </header>
      <div class="content">
        <div class="tip-info">
          {{$t('wallet_backup.detail.tip')}}
        </div>
        <div class="content-block">
          <div class="tip-warning" :class="{'text-center':!wifKey}">
            {{wifKey || '****************************'}}
          </div>
          <p class="tip-error text-center" v-if="error.common">{{error.common}}</p>
          <p>
            <a class="button-gxb" v-if="!wifKey" @click="unlock">{{$t('wallet_backup.detail.unlock')}}</a>
          </p>
        </div>
        <ul class="tips color-danger">
          <li>
            {{$t('wallet_backup.detail.tip1')}}
          </li>
          <li>
            {{$t('wallet_backup.detail.tip2')}}
          </li>
        </ul>
        <div class="button-block">
          <p v-if="isNative&&wifKey">
            <a @click="copyKey()" class="button button-gxb"
               :class="{disabled:keyCopied}">{{keyCopied ? $t('wallet_backup.detail.copied') : $t('wallet_backup.detail.copy')}}</a>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  import {unlock_wallet, update_wallet} from '@/services/WalletService'

  export default {
    data() {
      return {
        wifKey: '',
        keyCopied: false,
        error: {
          common: ''
        }
      }
    },
    methods: {
      unlock() {
        let self = this;
        this.error.common = '';
        $.modal({
          title: '',
          text: self.$t('wallet_backup.detail.tip_password'),
          afterText: `<input placeholder="${self.$t('wallet_backup.detail.placeholder.password')}" class="modal-text-input" id="pwd" type="password"/>`,
          buttons: [{
            text: self.$t('wallet_backup.detail.cancel'),
            onClick() {

            }
          }, {
            text: self.$t('wallet_backup.detail.ok'),
            onClick() {
              unlock_wallet(self.$route.query.account, $('#pwd').val()).then((info) => {
                self.wifKey = info.wifKey;
                let wallet = info.wallet;
                wallet.backup_date = new Date().getTime()
                update_wallet(wallet);
              }).catch((ex) => {
                self.error.common = self.$t('wallet_backup.detail.error.invalid_password')
              })
            }
          }]
        })
      },
      copyKey() {
        cordova.exec(() => {
          this.keyCopied = true;
          setTimeout(() => {
            this.keyCopied = false;
          }, 1000)
        }, null, 'ClipBoard', 'copy', [this.wifKey]);
      },
      confirm() {
        let self = this;
        $.confirm(this.$t('wallet_backup.detail.confirm'),
          function () {
            self.$router.replace({path: self.$route.query.from||link('/')});
          }
        );
      }
    },
    mounted() {
      $.init();
    },
    computed: {
      ...mapGetters({
        isNative: 'isNative'
      })
    }
  }
</script>
<style scoped lang="scss">
  .pull-to-refresh-layer {
    .line-scale > div {
      background-color: #ccc;
    }
  }

  .text-right {
    text-align: right;
  }

  .tip-info {
    word-break: break-word;
  }

  .tip-warning {
    padding: .5rem;
    font-weight: bold;
  }

  .tips {
    font-size: .6rem;
    padding-left: 1.5rem;
    li {
      padding-left: 0
    }
  }

  .button-block {
    margin-top: 4rem;
  }
</style>

