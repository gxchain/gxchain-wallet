<template>
  <div class="popup popup-qrcode">
    <header class="bar bar-nav">
      <h2 class="title">{{$t('index.wallet')}}</h2>
      <a href="javascript:;" class="pull-right icon icon-close close-popup">&times;</a>
    </header>
    <div class="content">
      <div class="center-content">
        <div class="content-block">
          <div class="text-center">
            <qrcode :val="qrcode" :size="160"></qrcode>
            <p style="word-break: break-all;">{{$t('index.account_name')}}:&nbsp;{{this.account}}</p>
          </div>
          <div class="content-block">
            <p v-if="isNative">
              <a @click="copyAccount()" class="button button-gxb"
                 :class="{disabled:accountCopied}">{{accountCopied ? $t('index.copy'):$t('index.copied')}}</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  import qrcode from './QRCode.vue'

  export default {
    props: {
      account: {
        type: String
      }
    },
    data() {
      return {
        accountCopied: false
      }
    },
    methods: {
      show() {
        $.popup(this.$el);
      },
      copyAccount() {
        cordova.exec(() => {
          this.accountCopied = true;
          setTimeout(() => {
            this.accountCopied = false;
            $.closeModal();
          }, 1000)
        }, null, 'ClipBoard', 'copy', [this.account]);
      }
    },
    computed: {
      ...mapGetters({
        isNative: 'isNative'
      }),
      qrcode() {
        return `qr://transfer?to=${this.account}`
      }
    },
    components: {
      qrcode
    }
  }
</script>
<style scoped lang="scss">
  .center-content {
    margin-top: 3rem;
    align-items: flex-end;
    display: flex;
    justify-content: center;
    text-align: center;
    .content-block {
      width: 100%;
    }
  }
</style>
