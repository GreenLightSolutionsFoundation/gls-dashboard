import queryBuilder from '../lib/query_builder';
import Chapter from '../models/chapter';

// eslint-disable-next-line
export function getAll(filters = {}) {
  const chapter = new Chapter();
  return queryBuilder(chapter.query(), filters).find()
    .then(results => results.map(result => new Chapter(result)));
}

export function getById(id, filters = {}) {
  const chapter = new Chapter();
  return queryBuilder(chapter.query(), filters).get(id)
    .then(result => new Chapter(result));
}
