import Vue from 'vue';
import Vuex, { Store } from 'vuex';

Vue.use(Vuex);

export default new Store({
  state: {},
  mutations: {},
  actions: {},
});
// initialize the application store
// store
//   .dispatch('authentication/initialize')
//   .then(() => {
//     const app = new Vue({
//       router,
//       store,
//       render: h => h('router-view'),
//     });

//     app.$mount('#root');
//   })
//   .catch(err => {
//     // TODO: render error page, or othewise handle intiailization failure
//     // eslint-disable-next-line no-console
//     console.error('failed to load application', err);
//     // eslint-disable-next-line no-alert
//     window.alert('Application did not load :(');
//   });
