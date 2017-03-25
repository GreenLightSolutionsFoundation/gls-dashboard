/* global backand */
import Vue from 'vue';
import VueMaterial from 'vue-material';
import 'vue-material/dist/vue-material.css';
import router from './router';
import store from './store';

Vue.use(VueMaterial);

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

// initialize the application store
store.dispatch('authentication/initialize')
.then(() => {
  const app = new Vue({
    router,
    render: h => h('router-view'),
  });

  app.$mount('#root');
})
.catch((err) => {
  // TODO: render error page, or othewise handle intiailization failure
  // eslint-disable-next-line no-console
  console.error('failed to load application', err);
  // eslint-disable-next-line no-alert
  window.alert('Application did not load :(');
});
