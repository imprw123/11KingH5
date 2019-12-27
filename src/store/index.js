import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
const state = {
    myYaoDou: 0,
    userName: '',
    userImgSrc: '',
    realyYaoDou: 0
};
const getters = {
    getmyYaoDou(state) {
        return state.myYaoDou;
    },
    getuserName(state) {
        return state.userName;
    },
    getuserImgSrc(state) {
        return state.userImgSrc;
    },
    getRealyYaoDou(state) {
        return state.realyYaoDou;
    }
};

const mutations = {
    _myYaoDou(state, val) {
        state.myYaoDou = val;
    },
    _userName(state, val) {
        state.userName = val;
    },
    _userImgSrc(state, val) {
        state.userImgSrc = val;
    },
    _realyYaoDou(state, num) {
        state.realyYaoDou = num;
    }
}

const actions = {
    MYYAODOU(context, num) {
        context.commit('_myYaoDou', num);
    },
    USERNAME(context, val) {
        context.commit('_userName', val);
    },
    USERIMGSRC(context, val) {
        context.commit('_userImgSrc', val);
    },
    REALYYAODOU(context, val1) {
        context.commit('_realyYaoDou', val1);
    }

}

const store = new Vuex.Store({
    namespaced: true,
    state,
    getters,
    mutations,
    actions
});



export default store;