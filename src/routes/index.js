import createRoute from '../lib/create_route';

import login from './login';
import approvalPending from './approval-pending';
import dashboard from './dashboard';
import app from './app';
import cohort from './cohort';
import confidentialityAgreement from './confidentiality-agreement';
import commitmentAgreement from './commitment-agreement';
import projectRankingForm from './project-ranking-form';
import solutioneering101 from './solutioneering-101';
import solutioneering101Quiz from './solutioneering-101-quiz';

import adminMembers from './admin/members';

const routes = [
  createRoute('/login', login),

  createRoute('/pending', approvalPending),
  createRoute('/admin', app, {
    meta: {
      requiresAuthentication: true,
      requireIsAdmin: true,
    },
    children: [
      createRoute('', { redirect: { name: 'admin-members' } }),
      createRoute('members', adminMembers),
      // all routes, including /, get redirected to /admin/members
    ],
  }),
  createRoute('/', app, {
    meta: {
      requiresAuthentication: false,
    },
    children: [
      createRoute('', dashboard),
      createRoute('/cohort', cohort),
      createRoute('/project-ranking-form', projectRankingForm),
      createRoute('/confidentiality-agreement', confidentialityAgreement),
      createRoute('/commitment-agreement', commitmentAgreement),
      createRoute('/solutioneering-101', solutioneering101),
      createRoute('/solutioneering-101-quiz', solutioneering101Quiz),
    ],
  }),
  // all other non-matching routes get redirected here
  { path: '*', redirect: { name: 'dashboard' } },
];

export default routes;
