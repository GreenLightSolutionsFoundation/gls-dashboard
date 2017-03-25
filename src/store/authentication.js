/* global backand */
export default {
  namespaced: true,
  state: {
    user: null,
    ready: false,
    pending: false,
    errorMessage: '',
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    resetUser(state) {
      state.user = null;
    },
    setErrorMessage(state, msg) {
      state.errorMessage = msg;
    },
    togglePending(state, pending = null) {
      state.pending = (pending !== null) ? pending : !state.pending;
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

        commit('togglePending');

        return backand.user.getUserDetails()
        .then((res) => {
          commit('togglePending');
          commit('setUser', res.data);
          resolve(res.data);
        })
        .catch((err) => {
          commit('togglePending');
          handleFailure(err);
        });
      });
    },
    login({ commit }, user = {}) {
      const { email, password } = user;

      // set error message without credentials
      if (!email || !password) return commit('setErrorMessage', 'Please enter your credentials');

      // clear error and set pending state
      commit('setErrorMessage', '');
      commit('togglePending');

      // use backand to authenticate user
      return backand.signin(email, password)
      .then((res) => {
        // toggle pending state
        commit('togglePending');

        // successful login
        console.log('login', {res});
      })
      .catch((err) => {
        const defaultMsg = 'Login failed';

        // toggle pending state
        commit('togglePending');
        if (!err.status) return commit('setErrorMessage', defaultMsg);

        switch (err.status) {
          case 400:
            return commit('setErrorMessage', 'Invalid credentials, login failed');
          default:
            return commit('setErrorMessage', defaultMsg);
        }
      });
    },
    logout({ commit }) {
      // commit('resetUser');
      console.log('store logout')
    },
  },
  getters: {
    isAuthenticated(state) {
      // TODO: real user data checking via the server
      return state.user !== null;
    },
  },
};
