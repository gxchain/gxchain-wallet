<template>
  <div id="app">
    <div class="view" v-if="loading">
      <loading-layer></loading-layer>
    </div>
    <router-view class="view" :class="{hide:loading}"></router-view>
  </div>
</template>

<script>
  import 'loaders.css'
  import LoadingLayer from './components/sub/LoadingLayer'
  import '@/assets/font-icons/icons.css'
  import {mapGetters} from 'vuex'

  export default {
    name: 'app',
    computed: {
      ...mapGetters({
        loading: 'loading'
      })
    },
    components: {
      LoadingLayer
    }
  }
</script>

<style lang="scss">
  @import "assets/styles/app";
</style>
