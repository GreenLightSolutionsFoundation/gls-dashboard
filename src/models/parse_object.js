import parse from '../lib/parse';

export default class ParseObject {
  constructor(instance) {
    this.instance = instance;
  }

  get id() { return this.instance.id; }
  get createdAt() { return this.instance.createdAt; }
  get updatedAt() { return this.instance.updatedAt; }

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
    const keys = Object.getOwnPropertyNames(Object.getPrototypeOf(this));

    return keys.reduce((acc, key) => {
      if (typeof this[key] !== 'function') acc[key] = this[key];
      return acc;
    }, {});
  }
}
