import createRoute from '../lib/create_route';

import login from './login';
import approvalPending from './approval-pending';
import demo from './demo';
import app from './app';

const routes = [
  createRoute('/login', login),
  createRoute('/pending', approvalPending),
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
