<template>
  <div class="page-group">
    <div class="page" id="page-trade-history">
      <header class="bar bar-nav">
        <h3 class="title">{{$t('trade_history.title')}}</h3>
        <router-link :to="{path:'/'}" replace class="icon icon-left"></router-link>
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
            <li>
              <a class="item-content item-link">
                <div class="item-inner">
                  <div class="item-title label"></div>
                </div>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

  import {fetch_account_histroy} from '@/services/WalletService'

  export default {
    methods: {
      loadHistory() {
        setTimeout(() => {
          $.pullToRefreshDone($(this.$el).find('.pull-to-refresh-content'));
        }, 500)
      }
    },
    mounted() {
      $.init();
      $(this.$el).on('refresh', '.pull-to-refresh-content', (e) => {
        this.loadHistory(0);
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
</style>
