<template>
  <div id="app">
    <div class="view" v-if="loading">
      <loading-layer></loading-layer>
    </div>
    <transition :name="isNative ? direction : ''">
      <router-view class="view" :class="{hide:loading}"></router-view>
    </transition>
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
        loading: 'loading',
        isNative: 'isNative',
        direction: 'direction'
      })
    },
    methods: {

    },
    components: {
      LoadingLayer
    }
  }
</script>

<style lang="scss">
  @import "assets/styles/app";
</style>
