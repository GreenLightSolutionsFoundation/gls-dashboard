import queryBuilder from '../lib/query_builder';

import Project, { wrapProject } from '../models/project';

export function getAll(filters = {}) { // eslint-disable-line import/prefer-default-export
  const project = new Project();
  const query = project.query();
  return queryBuilder(query, filters).find().then((projects) => {
    projects.map(wrapProject);
  });
}
