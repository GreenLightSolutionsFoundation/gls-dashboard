/* eslint no-param-reassign: 0 */
import { isPlainObject } from '../lib/utils';
import queryBuilder from '../lib/query_builder';
import { UserDetail, wrapUserDetail } from '../models/userDetail';

export function getAll(filters = {}) {
  const member = new UserDetail();
  return queryBuilder(member.query(), filters)
    .find()
    .then(members => members.map(wrapUserDetail));
}

export function getById(id) {
  const member = new UserDetail();
  return member
    .query()
    .get(id)
    .then(wrapUserDetail);
}

export function update(id, data) {
  if (!isPlainObject(data)) return Promise.reject('data must be an object');

  // if the id is not a string, assume it's a parse instance
  const getMember = typeof id === 'string' ? getById(id) : Promise.resolve(id);

  return getMember.then(member => {
    Object.keys(data).forEach(prop => {
      // don't update some fields
      const blacklisted = ['id', 'createdAt', 'updatedAt', 'fullName', 'isOnboarded'];

      if (blacklisted.indexOf(prop) < 0) member[prop] = data[prop];
    });

    return member.save().then(() => member);
  });
}

export function setActive(user, active) {
  return update(user, { currentlyActive: active });
}
