/* global backand */
import { pick } from '../lib/utils';

const OBJECT_NAME = 'users';

export function getAll(filters) {
  const defaults = {
    sort: backand.helpers.sort.create('lastName', 'asc'),
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
  if (typeof params.sort === 'object' && params.sort.name) {
    params.sort = backand.helpers.sort.create(params.sort.name, params.sort.order || 'asc');
  } else {
    delete params.sort;
  }

  return backand.object.getList(OBJECT_NAME, Object.assign(defaults, params)).then(res => res.data);
}

export function getById(id, filters) {
  const params = pick(filters, [
    'deep',
    'exclude',
    'level',
  ]);

  return backand.object.getOne(OBJECT_NAME, id, params).then(res => res.data);
}

