import createRoute from '../lib/create_route';

import login from './login';
import app from './app';
import home from './home';

const routes = [
  createRoute('/login', login),
  createRoute('/', app, {
    meta: {
      requiresAuthentication: true,
    },
    children: [
      createRoute('', home),
    ],
  }),
];

export default routes;
