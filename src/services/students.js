/* global backand */
import { pick } from 'lodash';

const OBJECT_NAME = 'users';

export function getAll(filters) {
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

  return backand.object_NAME.getList(OBJECT_NAME, params)
  .then((res) => {
    return res.data;
  });
}

export function getById(id, filters) {
  const params = pick(filters, [
    'deep',
    'exclude',
    'level',
  ]);

  return backand.object.getOne(OBJECT_NAME, id, params)
  .then((res) => {
    return res.data;
  });
}

