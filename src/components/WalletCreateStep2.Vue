<template>
  <div class="page-group">
    <div class="page" id="page-wallet-create-step-2">
      <header class="bar bar-nav">
        <h3 class="title">钱包创建</h3>
        <router-link :to="{path:'/wallet-create-step-1'}" replace class="icon icon-left"></router-link>
      </header>
      <div class="content">
        <div class="content-block text-center">
          <account-image :size="40" :account="$route.query.account"></account-image>
          <p>{{$route.query.account}}</p>
        </div>
        <div class="list-block">
          <ul>
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
          <div class="row-tip">
            <p class="tip-error text-center" v-if="error">
              {{error}}
            </p>
          </div>
        </div>
        <div class="content-block button-block">
          <p>
            <a href="javascript:;" @click="onSubmit" class="button button-gxb"
               :class="{disabled:!isCommitEnable}">完成</a>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import AccountImage from './sub/AccountImage.vue'
  import errorHandler from '@/common/errorHandler'
  import {create_account} from '@/services/WalletService'

  export default {
    data() {
      return {
        pwd1: '',
        pwd2: '',
        error: '',
        submitting: false
      }
    },
    methods: {
      clear() {
        this.error = '';
      },
      validate() {
        if (this.pwd1 != this.pwd2) {
          this.error = '两次输入密码不一致';
          return false;
        }
        return true;
      },
      onSubmit() {
        if (!this.isCommitEnable || !this.validate()) {
          return;
        }
        $.showPreloader('正在创建账户');
        create_account(this.$route.query.account, this.pwd1).then((wallet) => {
          $.hidePreloader();
          if (wallet.account) {
            let query = this.$route.query;
            query.nativeHook = 0;
            this.$router.replace({
              path: `/wallet-create-success?${$.param(query)}`
            });
          }
          else{
            $.toast('创建钱包失败');
          }
        }).catch(ex => {
          $.hidePreloader();
          if(ex.data&&ex.data.error&&ex.data.error.base&&ex.data.error.base[0].indexOf('current_account_itr')>-1){
            $.alert('账号已经被注册,请重新填写账号','提示',()=>{
              if(this.isNative){
                cordova.exec(null,null,'Controller','pop',[]);
              }
              else{
                this.$router.replace({
                  path:this.$route.query.from||'/wallet-create-step-1'
                });
              }
            });
          }
          else{
            errorHandler(ex, '创建账户失败');
          }
        });
      }
    },
    computed: {
      isEqual: function () {
        return this.pwd1 == this.pwd2;
      },
      isCommitEnable: function () {
        return !this.submitting && this.pwd1.length >= 6 && this.pwd2.length > 0;
      }
    },
    mounted() {
      $.init();
    },
    components: {
      AccountImage
    }
  }
</script>
<style scoped="">
  .row-tip {
    padding: 0 15px;
  }
</style>
