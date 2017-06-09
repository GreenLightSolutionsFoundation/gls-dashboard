import { omit } from '../lib/utils';
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
      state.user = user ? omit(user, ['access_token', 'token_type']) : user;
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
      commit('togglePending');

      return login(username, password)
      .then((user) => {
        commit('togglePending');
        commit('setUser', user);
      })
      .catch((err) => {
        const defaultMsg = 'Login failed';
        const { code, message } = err;

        // toggle pending state
        commit('togglePending');
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
      commit('togglePending');

      return create(userDetails)
      .then(() => {
        commit('togglePending');
        return {
          username: userDetails.username,
        };
      })
      .catch((err) => {
        commit('togglePending');
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
