import createRoute from '../lib/create_route';

import login from './login';
import approvalPending from './approval-pending';
import dashboard from './dashboard';
import app from './app';
import confidentialityAgreement from './confidentiality-agreement';
import commitmentAgreement from './commitment-agreement';
import projectRankingForm from './project-ranking-form';
import solutioneering101 from './solutioneering-101';
import solutioneering101Quiz from './solutioneering-101-quiz';
import admin from './admin';
import members from './members';
import projects from './projects';

const routes = [
  createRoute('/login', login),

  createRoute('/pending', approvalPending),

  createRoute('/admin', admin, {
    meta: {
      requiresAuthentication: true,
      requireIsAdmin: true,
    },
    children: [
      createRoute('', { redirect: { name: 'admin-members' } }),
      createRoute('projects', projects),
      createRoute('members', members),
    ],
  }),

  createRoute('/', app, {
    meta: {
      requiresAuthentication: true,
    },
    children: [
      createRoute('', { redirect: { name: 'dashboard' } }),
      createRoute('/dashboard/:showDialog?', dashboard),
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
