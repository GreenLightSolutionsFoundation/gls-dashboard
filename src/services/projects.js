import queryBuilder from '../lib/query_builder';
import Project, { wrapProject } from '../models/project';

export default function getAll(filters = {}) {
  const project = new Project();
  const query = project.query();
  const options = {
    include: ['chapter', 'partnerOrganization', 'projectLead'],
  };
  Object.assign(filters, options);
  return queryBuilder(query, filters)
    .find()
    .then(projects => projects.map(wrapProject));
}
