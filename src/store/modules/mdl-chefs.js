import chefService from '../../services/chef'

const state = {
  language: 'en'
}

const getters = {
  chefs: state => {
    return state.chefs
  },
  language: state => {
    return state.language
  }
}

const actions = {
  GET_CHEFS_ALL: ({ state, commit }) => new Promise((resolve, reject) => {
    chefService.alls()
      .then(response => {
        let chefs = response.data
        commit('SET_ITEM', { 'chefs': chefs })
        resolve(Object.values(state.chefs))
      }).catch(err => reject(err))
  })
}

const mutations = {
  SET_ITEM (state, payload) {
    state.chefs = payload.chefs
  },
  SET_STATE (state, { language }) {
    state.language = language
  }
}

export default {
  state,
  actions,
  mutations,
  getters
}
