import Vue from 'vue';
import Vuex, { Store } from 'vuex';

import authentication from './authentication';
import onboarding from './onboarding';
import members from './members';
import projects from './projects';

Vue.use(Vuex);

export default new Store({
  state: {},
  modules: {
    'admin/members': members,
    'admin/projects': projects,
    authentication,
    onboarding,
  },
  strict: process.env.NODE_ENV === 'development',
});
