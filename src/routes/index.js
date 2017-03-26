import createRoute from '../lib/create_route';

import login from './login';
import demo from './demo';
import app from './app';

const routes = [
  createRoute('/login', login),
  createRoute('/', app, {
    meta: {
      requiresAuthentication: false,
    },
    children: [
      createRoute('', demo),
    ],
  }),
];

export default routes;
