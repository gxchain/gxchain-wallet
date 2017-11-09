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

      }
    })
  }
}
