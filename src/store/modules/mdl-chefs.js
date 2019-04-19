import chefService from '../../services/chef'

export default {
  state: {
    chefs: []
  },
  mutations: {
    SET_ITEM (state, payload) {
      state.chefs = payload.chefs
    }
  },
  actions: {
    GET_CHEFS_ALL: ({ state, commit }) => new Promise((resolve, reject) => {
      chefService.alls()
        .then(response => {
          let chefs = response.data
          commit('SET_ITEM', { 'chefs': chefs })
          resolve(Object.values(state.chefs))
        }).catch(err => reject(err))
    })
  },
  getters: {
    chefs: state => {
      return state.chefs
    }
  }
}
