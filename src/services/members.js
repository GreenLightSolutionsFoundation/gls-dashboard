import { isPlainObject } from '../lib/utils';
import parse from '../lib/parse';
import { wrapUser } from '../models/user';

export function getAll(filters = {}) {
  const query = new parse.Query(parse.User);
  const options = Object.assign({
    pageSize: 30,
    pageNumber: 1,
    sort: {
      name: 'lastName',
      order: 'asc',
    },
    search: null,
  }, filters);

  query.limit(options.pageSize);
  query.skip((options.pageNumber - 1) * options.pageSize);

  if (isPlainObject(options.sort) && options.sort.name && options.sort.order) {
    if (options.sort.order === 'desc') query.descending(options.sort.name);
    else query.ascending(options.sort.name);
  }

  if (isPlainObject(options.search) && options.search.name && options.search.value) {
    query.equalTo(options.search.name, options.search.value);
  }

  return query.find().then(users => users.map(wrapUser));
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
