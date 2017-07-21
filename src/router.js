import Vue from 'vue';
import VueRouter from 'vue-router';

import routes from './routes';
import store from './store';

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'hash',
  routes,
});

// pre-route auth checking
router.beforeEach((to, from, next) => {
  const isAuthenticated = store.getters['authentication/isAuthenticated'];

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

export default router;
