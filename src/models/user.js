import moment from 'moment';
import parse from '../lib/parse';
import ParseObject from './parse_object';

export default class User extends ParseObject {
  constructor(user) {
    super(user || new parse.User());
  }

  get id() { return this.instance.id; }
  get createdAt() { return this.instance.createdAt; }
  get updatedAt() { return this.instance.updatedAt; }
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

  // get semesterJoined() { return this.instance.get('semesterJoined'); }
  // set semesterJoined(val) { return this.instance.set('semesterJoined', val); }

  // get chapter() { return this.instance.get('chapter'); }
  // set chapter(val) { return this.instance.set('chapter', val); }

  // get position() { return this.instance.get('position'); }
  // set position(val) { return this.instance.set('position', val); }

  // get currentlyActive() { return this.instance.get('currentlyActive'); }
  // set currentlyActive(val) { return this.instance.set('currentlyActive', Boolean(val)); }

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

  save() { return this.instance.save(); }
  create() { return this.instance.signUp(null); }
}

export const wrapUser = user => new User(user);
