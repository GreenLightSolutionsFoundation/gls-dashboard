/* global backand */
import { omit } from '../lib/utils';

export default {
  namespaced: true,
  state: {
    user: null,
    pending: false,
    errorMessage: '',
  },
  mutations: {
    setUser(state, user) {
      // TODO: blacklist bearer token
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
          const { regId } = res.data || {};

          commit('togglePending');

          if (regId <= 0) {
            commit('resetUser');
            return resolve(null);
          }

          commit('setUser', res.data);
          return resolve(res.data);
        })
        .catch((err) => {
          commit('togglePending');
          handleFailure(err);
        });
      });
    },
    login({ commit }, { email, password } = {}) {
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
        commit('setUser', res.data);
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
    signup({ commit }, { email, password, passwordConfirm, firstName, lastName } = {}) {
      if (!passwordConfirm !== !password) return commit('setErrorMessage', 'Passwords to not match');
      if (!firstName || !lastName) return commit('setErrorMessage', 'Please enter your first and last name');

      // clear error and set pending state
      commit('setErrorMessage', '');
      commit('togglePending');

      return backand.signup(firstName, lastName, email, password, passwordConfirm)
      .then((res) => {
        commit('togglePending');
        const { username, message, currentStatus } = res.data;
        return { username, message, currentStatus };
      })
      .catch((err) => {
        commit('togglePending');
        const defaultMsg = 'Signup failed, please try again';

        if (!err.status) return commit('setErrorMessage', defaultMsg);

        const { error, error_description } = err.data;

        switch (err.status) {
          case 400:
            if (error === 'invalid_grant') return null;
            // eslint-disable-next-line camelcase
            return commit('setErrorMessage', `Signup failed: ${error_description}`);
          case 406:
            return commit('setErrorMessage', 'User signups are currently disabled');
          default:
            return commit('setErrorMessage', defaultMsg);
        }
      });
    },
    logout({ commit }) {
      commit('resetUser');

      return backand.signout()
      .then(() => {
        commit('resetUser');
      })
      .catch((err) => {
        const { status } = err;

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
    isAdmin(state) {
      return state.user && state.user.role === 'Admin';
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
