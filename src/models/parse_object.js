export default class ParseObject {
  toJSON() {
    const keys = Object.getOwnPropertyNames(Object.getPrototypeOf(this));

    return keys.reduce((acc, key) => {
      if (typeof this[key] !== 'function') acc[key] = this[key];
      return acc;
    }, {});
  }
}
