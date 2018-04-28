import Vuex from 'vuex'
import Vue from 'vue'
const state = {
  bets: 0,
  price: 2
}
// console.log(state)
const mutations = {
  changeBets (state, bets) {
    state.bets = bets
  }
}

const actions = {
  setBets ({commit}, bets) {
    commit('changeBets', bets)
  }
}
Vue.use(Vuex)

export default new Vuex.Store({
  state,
  mutations,
  actions
})
