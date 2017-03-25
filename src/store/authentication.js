/* global backand */
export default {
  namespaced: true,
  state: {
    user: null,
    ready: false,
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
    initialize({ commit }) {
      return new Promise((resolve, reject) => {
        function handleFailure(err) {
          reject(err || 'backand client not found');
        }

        if (typeof backand === 'undefined') return handleFailure();

        backand.init({
          appName: 'greenlight',
          signUpToken: 'f23b604e-524f-447d-af47-008f757a0a58',
          anonymousToken: 'b48541ec-4682-4f51-b9af-8d96d6c5abf4',
        });

        return backand.user.getUserDetails()
        .then((res) => {
          commit('setUser', res.data);
          resolve(res.data);
        })
        .catch(handleFailure);
      });
    },
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
