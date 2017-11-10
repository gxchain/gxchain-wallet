import {mapGetters} from 'vuex'
export default {
  install(Vue,options){
    Vue.mixin({
      computed:{
        ...mapGetters({
          isNative:'isNative'
        })
      },
      methods:{
        link(path){
          let query = this.$route.query;
          return this.$route.query.from||`${path||'/'}?${$.param(query)}`;
        }
      }
    })
  }
}
