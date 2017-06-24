import { isPlainObject } from '../lib/utils';
import parse from '../lib/parse';
import queryBuilder from '../lib/query_builder';
import { wrapUser } from '../models/user';

export function getAll(filters = {}) {
  const query = new parse.Query(parse.User);
  return queryBuilder(query, filters).find().then(users => users.map(wrapUser));
}

export function getById(id) {
  const query = new parse.Query(parse.User);
  return query.get(id).then(wrapUser);
}

export function update(id, data) {
  if (!isPlainObject(data)) return Promise.reject('data must be an object');

  const member = typeof id === 'string' ? getById(id) : id;
  Object.keys(data).forEach(prop => (member[prop] = data[prop]));
  return member.save();
}

export function setActive(user, active) {
  return update(user, { currentlyActive: active });
}
