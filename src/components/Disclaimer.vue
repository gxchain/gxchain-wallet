<template>
  <div class="page-group">
    <div class="page" id="page-disclaimer">
      <header class="bar bar-nav">
        <router-link :to="linkBack" replace class="pull-left icon icon-left"></router-link>
        <h3 class="title">{{$t('disclaimer.title')}}</h3>
        <a @click="switchLanguage" class="pull-right icon"><img width="25px" :src="imgFlag"></a>
      </header>
      <div class="content">
        <div class="content-block" v-html="$t('disclaimer.content')">
        </div>
      </div>
      <nav class="bar bar-tab">
        <a href="javascript:;" @click="accepted" class="tab-item external active">
          <span class="tab-label">{{$t('disclaimer.accept')}}</span>
        </a>
      </nav>
    </div>
  </div>
</template>
<script>
  import {set_disclaimer_accepted} from '@/services/WalletService'
  import {set_item} from '@/services/CommonService'

  export default {

    methods: {
      accepted() {
        set_disclaimer_accepted(true);
        if (this.isPopup) {
          $.closeModal('.popup-disclaimer');
        }
        else {
          this.$router.replace({
            path: this.linkBack
          });
        }
      },
      switchLanguage() {
        if (this.$i18n.locale == 'zh') {
          this.$i18n.locale = 'en';
        }
        else {
          this.$i18n.locale = 'zh';
        }
        set_item('locale', this.$i18n.locale);

      }
    },
    mounted() {
      $.init();
    },
    computed: {
      pageClass() {
        if (this.isPopup) {
          return 'popup popup-disclaimer';
        }
        else {
          return 'page'
        }
      },
      linkBack() {
        return this.$route.query.from || `/?${$.param(this.$route.query)}`
      },
      imgFlag() {
        let locale = this._i18n.locale;
        if (locale == 'zh') {
          locale = 'cn';
        }
        if (locale == 'en') {
          locale = 'us';
        }
        return `/static/img/${locale.toUpperCase()}.png`;
      }
    }
  }
</script>
<style scoped>
  .content-block {
    margin: 1.2rem 0 3.4rem 0;
  }

  .tab-item.active {
    font-weight: bold;
  }
</style>
