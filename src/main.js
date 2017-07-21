import Vue from 'vue';
import VueMaterial from 'vue-material';
import 'vue-material/dist/vue-material.css';
import router from './router';
import store from './store';
import parse from './lib/parse';

window.parse = parse;

Vue.use(VueMaterial);

Vue.material.registerTheme({
  default: {
    primary: 'green',
    background: 'white',
  },
  white: {
    primary: 'white',
  },
});

// initialize the application store
store.dispatch('authentication/initialize')
.then(() => {
  const app = new Vue({
    router,
    store,
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
