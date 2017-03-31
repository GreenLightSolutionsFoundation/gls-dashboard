function getFieldlist(fields) {
  return (!Array.isArray(fields)) ? [fields] : fields;
}

export function isArray(arr) {
  return Array.isArray(arr);
}

export function isPlainObject(obj) {
  return (obj != null && typeof obj === 'object' && !isArray(obj));
}

export function pick(obj, fields) {
  if (!isPlainObject(obj)) return obj;
  const fieldList = getFieldlist(fields);
  return Object.keys(obj).reduce((acc, key) => {
    // filter out non-matching fields
    if (fieldList.indexOf(key) < 0) return acc;
    return {
      ...acc,
      [key]: obj[key],
    };
  }, {});
}

export function omit(obj, fields) {
  if (!isPlainObject(obj)) return obj;
  const fieldList = getFieldlist(fields);
  return Object.keys(obj).reduce((acc, key) => {
    // filter out matching fields
    if (fieldList.indexOf(key) >= 0) return acc;
    return {
      ...acc,
      [key]: obj[key],
    };
  }, {});
}
