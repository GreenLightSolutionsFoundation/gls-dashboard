import createRoute from '../lib/create_route';

import login from './login';
import approvalPending from './approval-pending';
import demo from './demo';
import app from './app';
import home from './home';

const routes = [
  createRoute('/login', login),
  createRoute('/pending', approvalPending),
  createRoute('/demo', demo),
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
