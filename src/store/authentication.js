import { getCurrent, login, logout, create } from '../services/user';

export default {
  namespaced: true,
  state: {
    user: null,
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
  },
  actions: {
    initialize({ commit }) {
      return getCurrent()
      .then((user) => {
        if (!user) commit('resetUser');
        else commit('setUser', user);
        return user;
      });
    },
    login({ commit }, { username, password } = {}) {
      // set error message without credentials
      if (!username || !password) return commit('setErrorMessage', 'Please enter your credentials');

      // clear error and set pending state
      commit('setErrorMessage', '');

      return login(username, password)
      .then((user) => {
        commit('setUser', user);
        return user;
      })
      .catch((err) => {
        const defaultMsg = 'Login failed';
        const { code, message } = err;

        // toggle pending state
        if (!message) return commit('setErrorMessage', defaultMsg);

        // codes: http://docs.parseplatform.org/js/guide/#error-codes
        switch (code) {
          case 101:
            return commit('setErrorMessage', 'Invalid credentials, login failed');
          default:
            return commit('setErrorMessage', defaultMsg);
        }
      });
    },
    signup({ commit }, userDetails) {
      // clear error and set pending state
      commit('setErrorMessage', '');

      return create(userDetails)
      .then(() => ({
        username: userDetails.username,
      }))
      .catch((err) => {
        const defaultMsg = 'Signup failed, please try again';
        const { code, message } = err;

        if (!message) return commit('setErrorMessage', defaultMsg);

        // codes: http://docs.parseplatform.org/js/guide/#error-codes
        switch (code) {
          default:
            return commit('setErrorMessage', defaultMsg);
        }
      });
    },
    logout({ commit }) {
      commit('resetUser');

      return logout()
      .then(() => commit('resetUser'))
      .catch((err) => {
        const { status } = err;

        // codes: http://docs.parseplatform.org/js/guide/#error-codes
        switch (status) {
          case 0:
            return null;
          default:
            throw err;
        }
      });
    },
  },
  getters: {
    isAuthenticated(state) {
      // TODO: real user data checking via the server
      return state.user !== null;
    },
    isAdmin() {
      // return state.user && state.user.role === 'Admin';
      // TODO: enforce admin access
      return true;
    },
    username(state) {
      if (state.user === null) {
        return {
          firstName: null,
          lastName: null,
          fullName: null,
        };
      }

      const { firstName, lastName, fullName } = state.user;
      return { firstName, lastName, fullName };
    },
  },
};
