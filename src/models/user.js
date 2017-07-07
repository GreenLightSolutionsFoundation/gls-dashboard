import moment from 'moment';
import parse from '../lib/parse';
import ParseObject from './parse_object';

export default class User extends ParseObject {
  constructor(user) {
    super(user || new parse.User());
  }

  get fullName() { return `${this.firstName} ${this.lastName}`; }
  get isOnboarded() {
    return this.solutioneer101Passed && this.ndaSigned && this.commitmentAgreementSigned;
  }

  get email() { return this.instance.get('email'); }
  set email(val) { return this.instance.set('email', val); }

  get username() { return this.instance.get('username'); }
  set username(val) { return this.instance.set('username', val); }

  // eslint-disable-next-line class-methods-use-this
  get password() { return null; }
  set password(val) { return this.instance.set('password', val); }

  get firstName() { return this.instance.get('firstName'); }
  set firstName(val) { return this.instance.set('firstName', val); }

  get lastName() { return this.instance.get('lastName'); }
  set lastName(val) { return this.instance.set('lastName', val); }

  get commitmentAgreementSigned() { return this.instance.get('commitmentAgreementSigned'); }
  set commitmentAgreementSigned(val) { return this.instance.set('commitmentAgreementSigned', Boolean(val)); }

  get commitmentAgreementSignedDate() { return this.instance.get('commitmentAgreementSignedDate'); }
  set commitmentAgreementSignedDate(val) { return this.instance.set('commitmentAgreementSignedDate', moment(val).utc().toDate()); }

  get solutioneer101Passed() { return this.instance.get('solutioneer101Passed'); }
  set solutioneer101Passed(val) { return this.instance.set('solutioneer101Passed', Boolean(val)); }

  get ndaSigned() { return this.instance.get('ndaSigned'); }
  set ndaSigned(val) { return this.instance.set('ndaSigned', Boolean(val)); }

  get ndaSignedDate() { return this.instance.get('ndaSignedDate'); }
  set ndaSignedDate(val) { return this.instance.set('ndaSignedDate', moment(val).utc().toDate()); }

  static create() {
    const user = new parse.User();
    return user.signUp(null);
  }

  static login(username, password) {
    return parse.User.logIn(username, password);
  }

  static logout() {
    return parse.User.logOut();
  }

  static getCurrent() {
    return parse.User.current();
  }
}

export const wrapUser = user => new User(user);
