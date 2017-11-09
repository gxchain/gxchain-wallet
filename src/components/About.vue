<template>
  <div class="page-group">
    <div class="page" id="page-about">
      <header class="bar bar-nav">
        <h3 class="title">关于我们</h3>
        <router-link :to="{path:'/'}" replace class="icon icon-left"></router-link>
      </header>
      <div class="content">
        <div class="center-content">
          <div class="row-logo">
            <span class="gxicon gxicon-wallet logo"></span>
          </div>
          <p>当前版本V0.0.1(Beta)</p>
          <div class="app-intro text-center">
            <p>公信宝钱包是一款移动端轻钱包APP，</p>
            <p>通过它能实现公信股的转账、收款和钱包管理，</p>
            <p>并及时掌握公信宝的最新动态。</p>
          </div>
        </div>
        <div class="list-block">
          <ul>
            <li>
              <a href="javascript:;" class="item-content item-link">
                <div class="item-inner">
                  <div class="item-title">使用协议</div>
                </div>
              </a>
            </li>
            <li>
              <a href="javascript:;" class="item-content item-link">
                <div class="item-inner">
                  <div class="item-title">隐私条款</div>
                </div>
              </a>
            </li>
          </ul>
        </div>
        <div class="copy-right">
          <p>Copyright © 2016 GongXinBao</p>
          <p>All rights reserved.</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'

  export default {
    mounted(){
      $.init();
    },
    computed:{
      ...mapGetters({
        isNative:'isNative'
      })
    }
  }
</script>
<style scoped lang="scss">
  .page{
    display: flex;
    flex-direction: row;
    .center-content {
      align-items: center;
      display: flex;
      flex-direction: column;
      justify-content: center;
      min-height: 17.625rem;
      background: linear-gradient(to bottom, #150838 0%, #3853bc 49%, #18bce2 100%);
      color:#fff;
      .logo{
        font-size: 6rem;
      }
      .app-intro{
        p{
          font-size: .75rem;
          margin:.5rem 0;
        }
      }
    }
    .list-block{
      margin-top:0;
    }
    .copy-right{
      color:#999;
      font-size:.7rem;
      text-align: center;
      p{
        margin:.3rem 0;
      }
    }
  }

</style>
