import md5sum from '../lib/md5sum';
import parse from '../lib/parse';
import ParseObject from './parse_object';

export default class User extends ParseObject {
  constructor(user) {
    super(user || new parse.User());
  }

  get gravatar() {
    return `https://www.gravatar.com/avatar/${md5sum(this.email.trim().toLowerCase())}.json`;
  }

  get email() {
    return this.instance.get('email');
  }
  set email(val) {
    return this.instance.set('email', val);
  }

  get username() {
    return this.instance.get('username');
  }
  set username(val) {
    return this.instance.set('username', val);
  }

  // eslint-disable-next-line class-methods-use-this
  get password() {
    return null;
  }
  set password(val) {
    return this.instance.set('password', val);
  }

  static create(wrap = true) {
    const user = new parse.User();
    return user.signUp(null).then(newUser => {
      if (!wrap) return newUser;
      return newUser && wrapUser(newUser); // eslint-disable-line no-use-before-define,max-len
    });
  }

  static login(username, password, wrap = true) {
    return parse.User.logIn(username, password).then(user => {
      if (!wrap) return user;
      return user && wrapUser(user); // eslint-disable-line no-use-before-define,max-len
    });
  }

  static logout() {
    return parse.User.logOut();
  }

  static getCurrent(wrap = true) {
    const current = parse.User.current();

    if (current && !wrap) return Promise.resolve(current);
    if (current) return Promise.resolve(wrapUser(current)); // eslint-disable-line no-use-before-define,max-len
    return Promise.resolve(null);
  }
}

export const wrapUser = user => new User(user);
