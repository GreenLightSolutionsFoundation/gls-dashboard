/* global backand */
import Vue from 'vue';

import router from './router';

// todo: real auth
import isAuthenticated from './lib/is_authenticated';

// pre-route auth checking
router.beforeEach((to, from, next) => {
  // check if any of the matched routes require authentication
  if (to.matched.some(record => record.meta.requiresAuthentication)) {
    if (isAuthenticated) return next();

    // otherwise, redirect to login, preserving the requested route
    const { name, fullPath } = to;
    const query = (name !== undefined) ? { redirect: name } : { prev: fullPath };
    return next({ name: 'login', query });
  }

  return next();
});

const app = new Vue({
  router,
  render: h => h('router-view'),
  // Backand init
  beforeMount: () => {
    if (backand.init) {
      backand.init({
        appName: 'greenlight',
        signUpToken: 'f23b604e-524f-447d-af47-008f757a0a58',
        anonymousToken: 'b48541ec-4682-4f51-b9af-8d96d6c5abf4',
      });
    } else {
      throw new Error('backand client not found');
    }
  },
});

app.$mount('#root');
