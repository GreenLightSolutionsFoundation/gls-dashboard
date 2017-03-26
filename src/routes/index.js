import createRoute from '../lib/create_route';

import login from './login';
import approvalPending from './approval-pending';
import demo from './demo';
import app from './app';
<<<<<<< HEAD
import cohort from './cohort';
=======
import confidentialityAgreement from './confidentiality-agreement';
import commitmentAgreement from './commitment-agreement';
import solutioneering101 from './solutioneering-101';
>>>>>>> 9f074d04404b489d8c4f9521e459ffb8bdfe45cd

const routes = [
  createRoute('/login', login),

  createRoute('/pending', approvalPending),
  createRoute('/', app, {
    meta: {
      requiresAuthentication: false,
    },
    children: [
      createRoute('', demo),
<<<<<<< HEAD
      createRoute('/cohort', cohort),
=======
      createRoute('/confidentiality-agreement', confidentialityAgreement),
      createRoute('/commitment-agreement', commitmentAgreement),
      createRoute('/solutioneering-101', solutioneering101),
>>>>>>> 9f074d04404b489d8c4f9521e459ffb8bdfe45cd
    ],
  }),
];

export default routes;
