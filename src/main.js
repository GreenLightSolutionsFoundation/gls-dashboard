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
  // Other constructor code here
  beforeMount: () => {
    backand.init && backand.init({
      appName: '',
      signUpToken: '',
      anonymousToken: ''
    });
  },
});

app.$mount('#root');
