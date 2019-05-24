import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const state = {
    loading: true,
    isNative: false,
    symbolsMap: {}
};

const mutations = {
    setLoading (state, payload) {
        state.loading = payload.loading;
    },
    setIsNative (state, payload) {
        state.isNative = payload.isNative;
    },
    setSymbolsMap (state, payload) {
        state.symbolsMap = payload.symbolsMap;
    }
};

const actions = {
    setLoading ({ commit }, payload) {
        commit('setLoading', payload);
    },
    setIsNative ({ commit }, payload) {
        commit('setIsNative', payload);
    },
    setSymbolsMap ({commit}, payload) {
        commit('setSymbolsMap', payload);
    }
};

const getters = {
    loading: state => state.loading,
    isNative: state => state.isNative,
    symbolsMap: state => state.symbolsMap
};

export default new Vuex.Store({
    state,
    getters,
    actions,
    mutations
});
