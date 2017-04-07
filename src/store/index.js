import Vue from 'vue';
import Vuex from 'vuex';

import authentication from './authentication';
import onboarding from './onboarding';
import members from './members';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
  },
  modules: {
    'admin/members': members,
    authentication,
    onboarding,
  },
  strict: process.env.NODE_ENV === 'development',
});

export default store;
