<template>
  <div class="popup popup-transfer-confirm">
    <div class="bar bar-nav">
      <h3 class="title">{{step == 0 ? $t('transfer.confirm.enter_password') : $t('transfer.confirm.title')}}</h3>
      <a href="javascript:;" @click="step=0" class="pull-right icon icon-close close-popup">&times;</a>
    </div>
    <div class="content">
      <swiper :options="swiperOption" :not-next-tick="notNextTick" ref="swiper">
        <swiper-slide>
          <div class="list-block">
            <ul>
              <li class="item-content">
                <div class="item-inner">
                  <div class="item-input">
                    <input ref="password" @change="onPasswordChange" v-model="password" type="password"
                           :placeholder="$t('transfer.confirm.enter_password')">
                  </div>
                </div>
              </li>
            </ul>
          </div>

          <div class="content-block">
            <p class="tip-error text-center" v-if="error.password">{{error.password}}</p>
            <p>
              <a href="javascript:;" @click="onPasswordConfirm" class="button button-gxb">
                <div class="line-scale-pulse-out" v-if="submitting">
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
                <span v-if="!submitting">{{$t('transfer.next')}}</span>
              </a>
            </p>
          </div>
        </swiper-slide>
        <swiper-slide>
          <div class="text-center">
            GXS&nbsp;<span class="asset">{{amount | asset(2)}}</span>
          </div>
          <div class="list-block">
            <ul>
              <li class="item-content">
                <div class="item-inner">
                  <div class="item-title label">{{$t('transfer.to')}}</div>
                  <div class="item-after">{{to}}</div>
                </div>
              </li>
              <li class="item-content">
                <div class="item-inner">
                  <div class="item-title label">{{$t('transfer.memo')}}</div>
                  <div class="item-after">{{memo}}</div>
                </div>
              </li>
              <li class="item-content">
                <div class="item-inner">
                  <div class="item-title label">{{$t('transfer.fee')}}</div>
                  <div class="item-after"><span class="color-danger">{{fee | asset(2)}}</span>&nbsp;GXS</div>
                </div>
              </li>
            </ul>
          </div>
          <div class="content-block button-block">
            <p class="tip-error text-center" v-if="error.transfer">{{error.transfer}}</p>
            <p>
              <a href="javascript:;" @click="onConfirm"
                 class="button button-gxb">
                <div class="line-scale-pulse-out" v-if="submitting">
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
                <span v-if="!submitting">{{$t('transfer.send')}}</span>
              </a>
            </p>
          </div>
        </swiper-slide>
      </swiper>
    </div>
  </div>
</template>
<script>
  import {swiper, swiperSlide} from 'vue-awesome-swiper'
  import filters from '@/filters'
  import {transfer} from '@/services/WalletService'

  let defaultData = {
    step: 0,
    password: '',
    notNextTick: true,
    submitting: false,
    transaction: null,
    swiperOption: {
      notNextTick: true,
      initialSlide: 0
    },
    error: {
      password: '',
      transfer: ''
    }
  };

  export default {
    filters,
    data() {
      let self = this;
      return $.extend({}, defaultData);
    },
    watch: {
      step(val) {
        this.swiper.slideTo(val);
      }
    },
    props: {
      account: {
        type: String
      },
      amount: {
        type: String,
        default: 0
      },
      to: {
        type: String,
        default: ''
      },
      memo: {
        type: String,
        default: ''
      }
    },
    mounted() {
      this.$nextTick(() => {
        this.swiper.update();
        this.swiper.disableTouchControl();
      })
    },
    computed: {
      swiper() {
        return this.$refs.swiper.swiper;
      },
      fee() {
        if (!this.transaction) {
          return 0;
        }
        else {
          return this.transaction.serialize().operations[0][1].fee.amount / 100000;
        }
      }
    },
    methods: {
      show() {
        this.password = '';
        this.step = 0;
        this.transaction = null;
        this.submitting = false;
        this.error = {
          password: '',
          transfer: ''
        }
        $.popup($(this.$el));
        setTimeout(() => {
          $(this.$refs.password).focus();
        }, 500);
      },
      onPasswordChange() {
        this.error.password = '';
      },
      onPasswordConfirm() {
        if (!this.password.trim()) {
          this.error.password = this.$t('unlock.error.invalid_password');
          return;
        }
        else {
          this.error.password = '';
        }
        if (this.submitting) {
          return;
        }
        let self = this;
        this.submitting = true;
        this.transaction = null;
        transfer(this.account, this.to, this.amount, this.memo, this.password, false).then((resp) => {
          self.transaction = resp;
          self.step = 1;
          self.submitting = false;
        }).catch(ex => {
          self.error.password = ex.message;
          self.submitting = false;
          console.error(ex);
        })
      },
      onConfirm() {
        if (this.submitting) {
          return;
        }
        this.submitting = true;
        transfer(this.account, this.to, this.amount, this.memo, this.password, true).then((resp) => {
          let query = $.extend({}, this.$route.query, {
            account: this.to,
            amount: this.amount,
            from: this.$route.fullPath
          })
          this.$router.push({
            path: `/transfer-success?${$.param(query)}`
          })
        }).catch(ex => {
          if (ex.message.indexOf('Insufficient Balance') > -1) {
            this.error.transfer = this.$t('transfer.error.amount.insufficient_balance');
          }
          else {
            this.error.transfer = ex.message;
          }
          this.submitting = false;
          console.error(ex);
        })
      }
    },
    components: {
      swiper,
      swiperSlide
    }
  }
</script>
<style lang="scss" scoped>
  .asset {
    font-family: bebas;
    font-size: 1.1rem;
    color: #6699ff;
  }

  .bar-nav {
    background: transparent;
    .title {
      color: #3d3d3b;
    }
    .icon {
      color: #3d3d3b;
    }
  }

  .popup-transfer-confirm {
    max-height: 19.5rem;
    bottom: 0;
    top: initial;
    background: #efeff4;
    transition-duration: .2s;
  }

  .tip-error{
    word-break: break-word;
  }

  .list-block .item-title.label {
    width: 4.5rem;
  }
</style>
