import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  loading: true,
  isNative: false
}

const mutations = {
  setLoading(state, payload) {
    state.loading = payload.loading;
  },
  setIsNative(state, payload) {
    state.isNative = payload.isNative;
  }
}

const actions = {
  setLoading({commit}, payload) {
    commit('setLoading', payload)
  },
  setIsNative({commit}, payload) {
    commit('setIsNative', payload)
  }
}

const getters = {
  loading: state => state.loading,
  isNative: state => state.isNative
}

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
})
