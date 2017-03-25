import login from './login';
import App from '../App.vue';

const app = {
  path: '/',
  name: 'app',
  component: App,
  meta: {
    requiresAuthentication: true,
  },
};

export default [
  login,
  app,
];
