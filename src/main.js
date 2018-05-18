import 'vue-material/dist/vue-material.min.css';
import Vue from 'vue';
import VueMaterial from 'vue-material';
import App from './App.vue';

//import router from './router';
import store from './store';
import parse from './lib/parse';

Vue.config.productionTip = false;
window.parse = parse;

Vue.use(VueMaterial);

new Vue({
  //router,
  store,
  render: h => h(App),
}).mount('#app');
