/* global backand */
import { pick } from '../lib/utils';

const OBJECT_NAME = 'projects';

export default function getAll(filters = {}) {
  const defaults = {
    sort: backand.helpers.sort.create('projectStartDate', 'asc'),
  };
  const params = pick(filters, [
    'projectName',
    'projectDescription',
    'projectStartDate',
    'projectEndDate',
    'projectStatus',
    'totalPositions',
    'partnerOrganizations',
    'users',
    'chapters',
    'links',
  ]);

  // force sort to be an object
  if (typeof params.sort === 'object' && params.sort.name) {
    params.sort = backand.helpers.sort.create(params.sort.name, params.sort.order || 'asc');
  } else {
    delete params.sort;
  }

  return backand.object.getList(OBJECT_NAME, Object.assign(defaults, params)).then(res => res.data);
}
