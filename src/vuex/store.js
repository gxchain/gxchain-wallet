import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  loading: true,
  isNative: false,
  direction: 'slide-right'
}

const mutations = {
  setLoading(state, payload) {
    state.loading = payload.loading;
  },
  setIsNative(state, payload) {
    state.isNative = payload.isNative;
  },
  setDirection(state, payload) {
    state.direction = payload.direction;
  }
}

const actions = {
  setLoading({commit}, payload) {
    commit('setLoading', payload)
  },
  setIsNative({commit}, payload) {
    commit('setIsNative', payload)
  },
  setDirection({commit}, payload) {
    commit('setDirection', payload)
  }
}

const getters = {
  loading: state => state.loading,
  isNative: state => state.isNative,
  direction: state => state.direction
}

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
})
