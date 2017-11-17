import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
    sliderImg: '[轮播]',
    indexCon: '[主页信息]',
    detailCon: '[详情信息]',
    sear: '',
    user: ''
}

const mutations = {
    setSlider: (state, sliderData) => {
        state.sliderImg = sliderData.slice();
    },
    setIndexCon: (state, indexConData) => {
        state.indexCon = indexConData.slice();
    },
    setDetailCon: (state, detailConData) => {
        state.detailCon = detailConData.slice();
    },
    setSear: (state, searMsg) => {
        state.sear = searMsg;
    },
    setUser: (state, username) => {
        state.user = username;
    }
}

const actions = {
    setSlider: ({commit}, sliderData) => {
        commit('setSlider', sliderData);
    },
    setIndexCon: ({commit}, indexConData) => {
        commit('setIndexCon', indexConData);
    },
    setDetailCon: ({commit}, detailConData) => {
        commit('setDetailCon', detailConData);
    },
    setSear: ({commit}, searMsg) => {
        commit('setSear', searMsg);
    },
    setUser: ({commit}, username) => {
        commit('setUser', username);
    }
}

const getters = {

}

export default new Vuex.Store({
    state,
    mutations,
    actions,
    getters
})
