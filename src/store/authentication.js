import { omit } from '../lib/utils';
import parse from '../lib/parse';

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
      return new Promise((resolve, reject) => {
        if (!parse) {
          reject('parse client not found');
          return;
        }

        const user = parse.User.current();

        if (!user) {
          commit('resetUser');
          resolve(null);
        } else {
          commit('setUser', user);
          resolve(user);
        }
      });
    },
    login({ commit }, { username, password } = {}) {
      // set error message without credentials
      if (!username || !password) return commit('setErrorMessage', 'Please enter your credentials');

      // clear error and set pending state
      commit('setErrorMessage', '');
      commit('togglePending');

      // use backand to authenticate user
      return parse.User.logIn(username, password)
      .then((user) => {
        // toggle pending state
        commit('togglePending');

        // successful login
        commit('setUser', user);
      })
      .catch((err) => {
        const defaultMsg = 'Login failed';
        const { code, message } = err;

        // toggle pending state
        commit('togglePending');
        if (!message) return commit('setErrorMessage', defaultMsg);

        switch (code) {
          case 101:
            return commit('setErrorMessage', 'Invalid credentials, login failed');
          default:
            return commit('setErrorMessage', defaultMsg);
        }
      });
    },
    signup({ commit }, { username, email, password, passwordConfirm, firstName, lastName } = {}) {
      if (!passwordConfirm !== !password) return commit('setErrorMessage', 'Passwords to not match');
      if (!firstName || !lastName) return commit('setErrorMessage', 'Please enter your first and last name');

      // clear error and set pending state
      commit('setErrorMessage', '');
      commit('togglePending');

      const user = new parse.User();

      user.set('username', username);
      user.set('password', password);
      user.set('email', email);
      user.set('firstName', firstName);
      user.set('lastName', lastName);

      // return backand.signup(firstName, lastName, email, password, passwordConfirm)
      return parse.User.signUp(null)
      .then((pUser) => {
        commit('togglePending');
        return { username, id: pUser.id, user: null };
      })
      .catch((err) => {
        commit('togglePending');
        const defaultMsg = 'Signup failed, please try again';
        const { code, message } = err;

        if (!message) return commit('setErrorMessage', defaultMsg);

        switch (code) {
          default:
            return commit('setErrorMessage', defaultMsg);
        }
      });
    },
    logout({ commit }) {
      commit('resetUser');

      return parse.User.logOut()
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
