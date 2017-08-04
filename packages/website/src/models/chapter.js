import parse from '../lib/parse';
import ParseObject from './parse_object';

export default class Chapter extends ParseObject {
  constructor(chapter) {
    const ParseChapter = parse.Object.extend('Chapter');
    super(chapter || new ParseChapter());
  }

  get name() { return this.instance.get('name'); }
  set name(val) { return this.instance.set('name', val); }
}
