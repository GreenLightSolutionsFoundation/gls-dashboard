import parse from '../lib/parse';
import User from './user';
import ParseObject from './parse_object';

export default class Member extends ParseObject {
  constructor(userDetails) {
    const ParseMember = parse.Object.extend('Member');
    super(userDetails || new ParseMember());
    this.user = new User(userDetails && userDetails.attributes.user);
  }

  get semesterJoined() { return this.instance.get('semesterJoined'); }
  set semesterJoined(val) { return this.instance.set('semesterJoined', val); }

  get chapter() { return this.instance.get('chapter'); }
  set chapter(val) { return this.instance.set('chapter', val); }

  get position() { return this.instance.get('position'); }
  set position(val) { return this.instance.set('position', val); }

  get currentlyActive() { return this.instance.get('currentlyActive'); }
  set currentlyActive(val) { return this.instance.set('currentlyActive', Boolean(val)); }

  query() {
    const query = new parse.Query(this.instance);
    query.include('user');
    return query;
  }

  create(user) {
    if (user) this.user = user;
    this.instance.set('user', this.user);
    return this.instance.save();
  }

  static fromUser(user) {
    const parseUser = new parse.User();
    parseUser.id = user.id;

    const query = new parse.Query('Member');
    query.include('user'); // hydrate the user property
    query.equalTo('user', parseUser);

    return query.first().then(member => member && new Member(member));
  }
}

export const wrapMember = member => new Member(member);
