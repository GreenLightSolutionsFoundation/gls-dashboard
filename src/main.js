import 'vue-material/dist/vue-material.min.css';
import Vue from 'vue';
import VueMaterial from 'vue-material';
import App from './App.vue';

import router from './router';
import store from './store';
import parse from './lib/parse';

Vue.config.productionTip = false;
window.parse = parse;

Vue.use(VueMaterial);

// initialize the application store
store
  .dispatch('authentication/initialize')
  .then(() => {
    const app = new Vue({
      router,
      store,
      render: h => h(App),
    });

    app.$mount('#app');
  })
  .catch(err => {
    // TODO: render error page, or othewise handle intiailization failure
    // eslint-disable-next-line no-console
    console.error('failed to load application', err);
    // eslint-disable-next-line no-alert
    window.alert('Application did not load :(');
  });
