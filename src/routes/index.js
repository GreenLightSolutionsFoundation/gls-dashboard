import createRoute from '../lib/create_route';

import login from './login';
import approvalPending from './approval-pending';
import dashboard from './dashboard';
import app from './app';
import cohort from './cohort';
import confidentialityAgreement from './confidentiality-agreement';
import commitmentAgreement from './commitment-agreement';
import solutioneering101 from './solutioneering-101';
import solutioneering101Quiz from './solutioneering-101-quiz';

const routes = [
  createRoute('/login', login),

  createRoute('/pending', approvalPending),
  createRoute('/', app, {
    meta: {
      requiresAuthentication: false,
    },
    children: [
      createRoute('', dashboard),
      createRoute('/cohort', cohort),
      createRoute('/confidentiality-agreement', confidentialityAgreement),
      createRoute('/commitment-agreement', commitmentAgreement),
      createRoute('/solutioneering-101', solutioneering101),
      createRoute('/solutioneering-101-quiz', solutioneering101Quiz),
    ],
  }),
];

export default routes;
