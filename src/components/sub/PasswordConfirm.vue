<template>
  <div class="popup popup-transfer-confirm">
    <div class="bar bar-nav">
      <h3 class="title">{{$t('transfer.confirm.enter_password')}}</h3>
      <a href="javascript:;" class="pull-right icon icon-close close-popup">&times;</a>
    </div>
    <div class="content">
      <div class="list-block">
        <p class="tip-alert" v-if="tips">{{tips}}</p>
        <ul>
          <li class="item-content">
            <div class="item-inner">
              <div class="item-input">
                <input ref="password" v-model="password" type="password"
                       :placeholder="$t('transfer.confirm.enter_password')">
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div class="content-block">
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
    </div>
  </div>
</template>
<script>
  let defaultData = {
    password: '',
    submitting: false,
  };

  export default {
    data() {
      return $.extend({}, defaultData);
    },
    props: {
      tips: {
        type: String
      }
    },
    methods: {
      show() {
        this.password = '';
        this.submitting = false;
        $.popup($(this.$el));
        setTimeout(() => {
          $(this.$refs.password).focus();
        }, 500);
      },
      onPasswordConfirm() {
        if (this.submitting) {
          return;
        }
        this.submitting = true;
        this.$emit('unlocking', this.password);
      },
      unlocked(){
        this.submitting = false;
        $.closeModal($(this.$el));
      }
    }
  }
</script>
<style lang="scss" scoped>
  .bar-nav {
    background: transparent;
    .title {
      font-weight: normal;
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

  .list-block .item-title.label {
    width: 4.5rem;
  }
</style>
