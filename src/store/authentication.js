export default {
  state: {
    user: null,
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    resetUser(state) {
      state.user = null;
    },
  },
  actions: {
    userLogin({ commit }, user = {}) {
      const { email, password } = user;

      // TODO: login via the server
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          if (!email || !password) {
            commit('resetUser');
            reject();
          } else {
            commit('setUser', email);
            resolve();
          }
        }, 300);
      });
    },
    userLogout({ commit }) {
      // TODO: logout via the server
      return new Promise((resolve) => {
        // TODO: reset user state on logout
        commit('resetUser');
        resolve();
      });
    },
  },
  getters: {
    isAuthenticated(state) {
      // TODO: real user data checking via the server
      return state.user !== null;
    },
  },
};
