import Vue from 'vue';
import Vuex from 'vuex';

import authentication from './authentication';
import onboarding from './onboarding';
import admin from './admin';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
  },
  modules: {
    authentication,
    onboarding,
    admin,
  },
  strict: process.env.NODE_ENV === 'development',
});

export default store;
