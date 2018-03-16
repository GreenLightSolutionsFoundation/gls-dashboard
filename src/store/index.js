import Vue from 'vue';
import Vuex from 'vuex';

import authentication from './authentication';
import onboarding from './onboarding';
import members from './members';
import projects from './projects';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {},
  modules: {
    'admin/members': members,
    'admin/projects': projects,
    authentication,
    onboarding,
  },
  strict: process.env.NODE_ENV === 'development',
});

export default store;
