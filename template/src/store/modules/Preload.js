const state = {
  isLoading: true,
};

const mutations = {
  PRELOADED(state) {
    state.isLoading = false;
  },
};

const actions = {
  PRELOAD_STATE({ commit }) {
    commit('PRELOADED');
  },
};

const getters = {
  isLoading(state) {
    return state.isLoading;
  },
};

export default {
  state,
  mutations,
  actions,
  getters,
};
