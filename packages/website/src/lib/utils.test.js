/* global describe, test, expect, beforeEach */

import { isPlainObject, isArray, pick, omit } from './utils';

describe('utils', () => {
  const primitaves = [true, 1, 'str', null, undefined, NaN];

  let obj;

  beforeEach(() => {
    obj = {
      one: 1,
      two: {
        three: 4,
        five: 6,
      },
      seven: true,
      eight: 'nine',
      ten: ['a', 'b', 'c'],
    };
  });

  describe('isArray', () => {
    test('returns true for arrays', () => {
      expect(isArray([])).toBe(true);
    });

    test('returns false for non-arrays', () => {
      expect(isArray({})).toBe(false);
      for (let idx = 0; idx < primitaves.length; idx += 1) {
        expect(isArray(primitaves[idx])).toBe(false);
      }
    });
  });

  describe('isPlainObject', () => {
    test('returns true for object', () => {
      expect(isPlainObject({})).toBe(true);
      expect(isPlainObject(obj)).toBe(true);
    });

    test('returns false for non-objects', () => {
      expect(isPlainObject([])).toBe(false);
      for (let idx = 0; idx < primitaves.length; idx += 1) {
        expect(isArray(primitaves[idx])).toBe(false);
      }
    });
  });

  describe('pick', () => {
    test('returns single property', () => {
      const comp = { seven: obj.seven };
      expect(pick(obj, 'seven')).toEqual(comp);
    });

    test('returns multiple properties', () => {
      const comp = {
        one: obj.one,
        two: obj.two,
        eight: obj.eight,
      };
      expect(pick(obj, ['one', 'two', 'eight'])).toEqual(comp);
    });

    test('throws when given a non-object', () => {
      const check = () => pick(null, ['one']);
      expect(check).toThrow();
    });
  });

  describe('omit', () => {
    test('returns all but single property', () => {
      // shallow clone
      const comp = Object.assign({}, obj);
      delete comp.one;
      expect(omit(obj, 'one')).toEqual(comp);
    });

    test('returns all but multiple properties', () => {
      // shallow clone
      const comp = Object.assign({}, obj);
      delete comp.seven;
      delete comp.eight;
      expect(omit(obj, ['seven', 'eight'])).toEqual(comp);
    });

    test('throws when given a non-object', () => {
      const check = () => omit(null, ['one']);
      expect(check).toThrow();
    });
  });
});
