import { isArray } from '../lib/utils';

/*
  search is an array of tuples, like so:

  search: [['name', 'blah'], ['chapter', 'asu']]

  You can also search for values that do not match by prefixing the field with a -

  search: [['name', 'blah'], ['-chapter', 'asu']]
*/

export default function queryBuilder(query, options) {
  const defaults = {
    pageSize: 20,
    pageNumber: 1,
    sortField: 'lastName',
    sortOrder: 'asc',
    search: [],
  };
  const props = Object.assign(defaults, options);

  query.limit(props.pageSize);
  query.skip((props.pageNumber - 1) * props.pageSize);

  if (props.sortField) {
    if (props.sortOrder === 'desc') query.descending(props.sortField);
    else query.ascending(props.sortField);
  }

  if (isArray(props.search)) {
    props.search.forEach((s) => {
      if (isArray(s)) {
        const [field, value] = s;
        if (field.substring(0, 1) === '-') query.notEqualTo(field, value);
        else query.equalTo(field, value);
      }
    });
  }

  return query;
}
