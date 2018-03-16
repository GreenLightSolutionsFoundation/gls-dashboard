import parse from '../lib/parse';

export default class ParseObject {
  constructor(instance) {
    this.instance = instance;
  }

  get id() {
    return this.instance.id;
  }
  get createdAt() {
    return this.instance.createdAt;
  }
  get updatedAt() {
    return this.instance.updatedAt;
  }

  query() {
    return new parse.Query(this.instance);
  }

  subscribe() {
    const query = this.query();
    return query.subscribe();
  }

  save() {
    return this.instance.save();
  }

  destroy() {
    return this.instance.destroy();
  }

  toJSON() {
    const pKeys = Object.getOwnPropertyNames(Object.getPrototypeOf(this));
    const keys = pKeys.concat(Object.keys(this).filter(name => name !== 'instance'));

    return keys.concat(['id', 'createdAt', 'updatedAt']).reduce((acc, key) => {
      if (this[key] instanceof ParseObject) {
        // if key is a parse object reference, call toJSON on it
        acc[key] = this[key].toJSON();
      } else if (typeof this[key] !== 'function') {
        // if the property is serializable, keep it
        acc[key] = this[key];
      }

      return acc;
    }, {});
  }
}
