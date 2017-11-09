<template>
  <div class="page-group">
    <div class="page" id="page-wallet-import">
      <header class="bar bar-nav">
        <h3 class="title">钱包导入</h3>
        <router-link :to="{path:$route.query.from||'/'}" replace class="icon icon-left"></router-link>
      </header>
      <div class="content">
        <!--<div class="content-block block-tab">-->
        <!--<div class="list-block">-->
        <!---->
        <!--</div>-->
        <!--</div>-->
        <div class="list-block block-pwd">

          <ul>
            <li class="align-top">
              <div class="item-content">
                <div class="item-inner">
                  <div class="item-input">
                    <textarea v-model="wifKey" placeholder="在此填入账户活跃权限私钥"></textarea>
                  </div>
                </div>
              </div>
            </li>
            <li>
              <div class="item-content">
                <div class="item-inner">
                  <div class="item-title label">输入密码</div>
                  <div class="item-input">
                    <input v-model="pwd1" type="password" maxlength="30" placeholder="6位以上字符">
                  </div>
                </div>
              </div>
            </li>
            <li>
              <div class="item-content">
                <div class="item-inner">
                  <div class="item-title label">确认密码</div>
                  <div class="item-input">
                    <input v-model="pwd2" type="password" maxlength="30">
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div class="content-block block-tip">
          <div class="tip-error" v-if="error.wifKey">
            {{error.wifKey}}
          </div>
        </div>
        <div class="content-block block-button">
          <p class="content-block">
            <a @click="onSubmit" href="javascript:;" class="button button-gxb"
               :class="{disabled:!isCommitEnable}">确认导入</a>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import errorHandler from '@/common/errorHandler'
  import {import_account} from '../services/WalletService'
  import {PrivateKey} from 'gxbjs'

  export default {
    data() {
      return {
        tabIndex: 1,
        submitting: false,
        wifKey: '',
        pwd1: '',
        pwd2: '',
        error: {
          wifKey: ''
        }
      }
    },
    watch: {
      tabIndex() {
        this.error = {
          wifKey: ''
        }
      },
      pwd1() {
        this.error = {
          wifKey: ''
        }
      },
      pwd2() {
        this.error = {
          wifKey: ''
        }
      },
      wifKey() {
        this.error.wifKey = ''
      }
    },
    computed: {
      isEqual() {
        return this.pwd1 == this.pwd2;
      },
      isCommitEnable() {
        if (this.submitting) {
          return false;
        }
        return this.wifKey.length > 0 && this.pwd1.length >= 6 && this.pwd2.length >= 6;
      }
    },
    mounted() {
      $.init();
    },
    methods: {
      isValidWifKey(wifKey) {
        let wif_regex = /^5[HJK][1-9A-Za-z]{49}$/;
        if (wif_regex.test(wifKey)) {
          try {
            let private_key = PrivateKey.fromWif(wifKey); //could throw and error
            let private_plainhex = private_key.toBuffer().toString("hex");
            let public_key = private_key.toPublicKey(); // S L O W
            let public_key_string = public_key.toPublicKeyString();
            if (public_key_string.indexOf('GXC') > -1) {
              return true;
            }
            else {
              return false;
            }
          } catch (e) {
            console.log(e);
            return false;
          }
        }
        else {
          return false;
        }
      },
      validate() {
        if (!this.isEqual) {
          this.error.wifKey = '两次输入密码不一致';
          return false;
        }
        if (!this.isValidWifKey(this.wifKey)) {
          this.error.wifKey = '私钥无效';
          return false;
        }
        return true;
      },
      onSubmit() {
        if (!this.isCommitEnable) {
          return;
        }
        this.wifKey = this.wifKey.trim();
        if (!this.validate()) {
          return;
        }
        if (this.submitting) {
          return;
        }
        this.submitting = true;
        this.createByWifKey();
      },
      createByWifKey() {
        $.showPreloader('正在导入中');
        setTimeout(() => {
          import_account(this.wifKey, this.pwd1).then((info) => {
            this.submitting = false;
            $.hidePreloader();
            if (info.imported.length > 0) {
              let query = this.$route.query;
              query.nativeHook=0;
              query.account=info.imported[0].account;
              this.$router.replace({
                path: `/wallet-import-success?${$.param(query)}`,
              });
            } else {
              $.toast('账户已存在, 请勿重复导入');
            }
          }).catch((ex) => {
            this.submitting = false;
            $.hidePreloader();
            $.toast('导入失败, 私钥对应账户不存在，请检查是否为活跃权限私钥');
          });
        }, 500);
      }
    }
  }
</script>

<style scoped lang="scss">
  .content {
  }

  .list-block {
    margin: .6rem 0;
  }

  .block-pwd {
    ul:before {
      height: 0;
    }
  }

  .block-tab {
    margin: .2rem 0;
    ul {
      border-left: 0.05rem solid #e7e7e7;
      border-right: 0.05rem solid #e7e7e7;
    }
  }

  .block-button {
    margin-top: .6rem;
  }

  .block-tip {
    margin: .6rem 0 0 0;
    .tip-error {
      text-align: center;
    }
  }

</style>
