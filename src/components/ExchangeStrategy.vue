<template>
  <div class="popup">
    <header class="bar bar-nav">
      <h2 class="title">{{$t('realtime_quotations.strategy')}}</h2>
      <a href="javascript:;" class="pull-right icon icon-close close-popup">&times;</a>
    </header>
    <div class="content">
      <pdf v-show="false" :src="fileUrl" @numPages="totalPage = $event"></pdf>
      <pdf v-for="curPage in totalPage" :key="curPage" :src="fileUrl" :page="curPage"></pdf>
    </div>
  </div>
</template>
<script>
  import pdf from 'vue-pdf'
  export default {
    data (){
      return{
        totalPage: 0,
      }
    },
    props: {
      fileUrl: {
        type: String
      }
    },
    methods: {
      show() {
        $.popup(this.$el);
      }
    },
    components: {
      pdf
    }
  }
</script>
