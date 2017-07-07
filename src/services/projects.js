import queryBuilder from '../lib/query_builder';
import parse from '../lib/parse';

import { wrapProject } from '../models/project';

export default function getAll(filters = {}) {
  const query = new parse.Query(parse.Project);
  return queryBuilder(query, filters).find().then(projects => projects.map(wrapProject));
}
