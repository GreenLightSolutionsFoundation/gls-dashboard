import queryBuilder from '../lib/query_builder';
import parse from '../lib/parse';

import Project, { wrapProject } from '../models/project';

// eslint-disable-line import/prefer-default-export
export function getAll(filters = {}) {
  const project = new Project();
  const query = new parse.Query(project);
  return queryBuilder(query, filters).find().then(projects => projects.map(wrapProject));
}
