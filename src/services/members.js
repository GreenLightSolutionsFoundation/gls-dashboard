import { isPlainObject } from '../lib/utils';
import parse from '../lib/parse';

function formatUser(user) {
  const { id, attributes } = user;
  return { id, ...attributes };
}

function formatUsers(users) {
  if (Array.isArray(users)) return users.map(formatUser);
  return formatUser(users);
}

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

  return query.find().then(formatUsers);
}

export function getById(id) {
  const query = new parse.Query(parse.User);
  return query.get(id).then(formatUser);
}

export function update(id, data) {
  if (!isPlainObject(data)) return Promise.reject('data must be an object');

  const member = getById(id);
  Object.keys(data).forEach(prop => member.set(prop, data[prop]));
  return member.save().then(formatUser);
}
