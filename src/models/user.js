import parse from '../lib/parse';

export default class User {
  constructor(user) {
    this.user = user || new parse.User();
  }

  get id() { return this.user.id; }
  get createdAt() { return this.user.createdAt; }
  get updatedAt() { return this.user.updatedAt; }
  get username() { return this.user.get('username'); }
  get email() { return this.user.get('email'); }
  get fullName() { return `${this.firstName} x ${this.lastName}`; }
  get isOnboarded() {
    return this.solutioneer101Passed && this.ndaSigned && this.commitmentAgreementSigned;
  }

  get firstName() { return this.user.get('firstName'); }
  set firstName(val) { return this.user.set('firstName', val); }

  get lastName() { return this.user.get('lastName'); }
  set lastName(val) { return this.user.set('lastName', val); }

  get semesterJoined() { return this.user.get('semesterJoined'); }
  set semesterJoined(val) { return this.user.set('semesterJoined', val); }

  get chapter() { return this.user.get('chapter'); }
  set chapter(val) { return this.user.set('chapter', val); }

  get position() { return this.user.get('position'); }
  set position(val) { return this.user.set('position', val); }

  get currentlyActive() { return this.user.get('currentlyActive'); }
  set currentlyActive(val) { return this.user.set('currentlyActive', Boolean(val)); }

  get commitmentAgreementSigned() { return this.user.get('commitmentAgreementSigned'); }
  set commitmentAgreementSigned(val) { return this.user.set('commitmentAgreementSigned', Boolean(val)); }

  get solutioneer101Passed() { return this.user.get('solutioneer101Passed'); }
  set solutioneer101Passed(val) { return this.user.set('solutioneer101Passed', Boolean(val)); }

  get ndaSigned() { return this.user.get('ndaSigned'); }
  set ndaSigned(val) { return this.user.set('ndaSigned', Boolean(val)); }

  save() { return this.user.save(); }
  create() { return this.user.signUp(null); }
}

export const wrapUser = user => new User(user);
