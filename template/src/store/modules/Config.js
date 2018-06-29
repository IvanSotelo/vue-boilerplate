const state = {
  isMobile: false,
  routeName: '',
  menuOpen: false
}

const mutations = {
  DEVICE (state, mobile) {
    state.isMobile = mobile
  },
  ROUTE (state, routeName) {
    state.routeName = 'is-' + routeName
  },
  TOGGLE_MENU (state) {
    state.menuOpen = !state.menuOpen
  }
}

const actions = {
  DEVICE_SIZE ({ commit }, mobile) {
    commit('DEVICE', mobile)
  },
  CHANGE_ROUTE ({ commit }, routeName) {
    commit('ROUTE', routeName)
  },
  TOGGLE_MENU ({ commit, state }) {
    commit('TOGGLE_MENU')
  }
}

const getters = {
  isMobile: state => state.isMobile,
  routeName: state => state.routeName,
  menuOpen: state => state.menuOpen
}

export default {
  state,
  mutations,
  actions,
  getters
}
