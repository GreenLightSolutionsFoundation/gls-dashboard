/* global backand */
import { pick, isPlainObject } from '../lib/utils';

const OBJECT_NAME = 'users';

export function getAll(filters = {}) {
  const defaults = {
    sort: { name: 'lastName', order: 'asc' },
  };
  const params = pick(filters, [
    'pageSize',
    'pageNumber',
    'filter',
    'sort',
    'search',
    'exclude',
    'deep',
    'relatedObjects',
  ]);

  // force sort to be an object
  if (isPlainObject(params.sort) && params.sort.name) {
    params.sort = backand.helpers.sort.create(params.sort.name, params.sort.order || 'asc');
  } else {
    delete params.sort;
  }

  const options = Object.assign(defaults, params);
  return backand.object.getList(OBJECT_NAME, options).then(res => res.data);
}

export function getById(id, filters = {}) {
  const params = pick(filters, [
    'deep',
    'exclude',
    'level',
  ]);

  return backand.object.getOne(OBJECT_NAME, id, params).then(res => res.data);
}

export function update(id, data, filters = {}) {
  if (!isPlainObject(data)) return Promise.reject('data must be an object');

  const params = pick(filters, [
    'returnObject',
    'deep',
  ]);

  return backand.object.update(OBJECT_NAME, id, data, params).then(res => res.data);
}
