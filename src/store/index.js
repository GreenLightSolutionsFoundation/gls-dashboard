import Vue from 'vue';
import Vuex from 'vuex';

import authentication from './authentication';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
  },
  modules: {
    authentication,
  },
  strict: process.env.NODE_ENV === 'development',
});

export default store;
