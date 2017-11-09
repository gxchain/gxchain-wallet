<template>
  <div class="page-group">
    <div class="page" id="page-wallet-backup-detail">
      <header class="bar bar-nav">
        <h3 class="title">钱包备份</h3>
        <router-link :to="{path:$route.query.from||'/wallet-backup'}" replace class="icon icon-left"></router-link>
      </header>
      <div class="content">
        <div class="tip-info">
          为方便备份，我们将钱包账户加密为以下英文字母组成的密钥， 备份该密钥即可恢复钱包。
        </div>
        <div class="content-block">
          <div class="tip-success">
            <div class="text-right">
              <a v-if="!wifKey" @click="unlock">解锁</a>
            </div>
            {{wifKey||'****************************'}}
          </div>
        </div>
        <ul class="tips">
          <li>
            按顺序将密钥复制或抄录在纸上，并妥善保存
          </li>
          <li>
            任何人获得你的密钥信息即可操作你的钱包资金
          </li>
        </ul>
        <div class="button-block">
          <p v-if="isNative&&wifKey">
            <a @click="copyKey()" class="button button-gxb"
               :class="{disabled:keyCopied}">{{keyCopied ? '已复制' : '复制私钥'}}</a>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  import {unlock_wallet,update_wallet} from '@/services/WalletService'

  export default {
    data() {
      return {
        wifKey: '',
        keyCopied:false
      }
    },
    methods:{
      unlock(){
        let self= this;
        $.modal({
          title:'',
          text:'请输入密码',
          afterText:'<input placeholder="密码" class="modal-text-input" id="pwd" type="password"/>',
          buttons:[{
            text:'取消',
            onClick(){

            }
          },{
            text:'确定',
            onClick(){
              unlock_wallet(self.$route.query.account,$('#pwd').val()).then((info)=>{
                self.wifKey=info.wifKey;
                let wallet = info.wallet;
                wallet.backup_date=new Date().getTime()
                update_wallet(wallet);
              }).catch((ex)=>{
                $.toast('解锁失败');
              })
            }
          }]
        })
      },
      copyKey(){
        cordova.exec(() => {
          this.keyCopied = true;
          setTimeout(() => {
            this.keyCopied = false;
          }, 1000)
        }, null, 'ClipBoard', 'copy', [this.wifKey]);
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
  .text-right{
    text-align: right;
  }
  .tips{
    font-size:.6rem;
    padding-left:1.5rem;
    li{
      padding-left:0
    }
  }
  .button-block{
    margin-top:4rem;
  }
</style>

