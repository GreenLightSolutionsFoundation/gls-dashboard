import moment from 'moment';
import parse from '../lib/parse';
import User from './user';
import ParseObject from './parse_object';
import { getById as getChapterById } from '../services/chapters';

export default class UserDetail extends ParseObject {
  constructor(userDetail) {
    const ParseUserDetail = parse.Object.extend('UserDetail');
    super(userDetail || new ParseUserDetail());
    this.user = new User(userDetail && userDetail.attributes.user);
  }

  get firstName() {
    return this.instance.get('firstName');
  }
  set firstName(val) {
    return this.instance.set('firstName', val);
  }

  get lastName() {
    return this.instance.get('lastName');
  }
  set lastName(val) {
    return this.instance.set('lastName', val);
  }

  get commitmentAgreementSigned() {
    return this.instance.get('commitmentAgreementSigned');
  }
  set commitmentAgreementSigned(val) {
    return this.instance.set('commitmentAgreementSigned', Boolean(val));
  }

  get commitmentAgreementSignedDate() {
    return this.instance.get('commitmentAgreementSignedDate');
  }
  set commitmentAgreementSignedDate(val) {
    return this.instance.set(
      'commitmentAgreementSignedDate',
      moment(val)
        .utc()
        .toDate()
    );
  }

  get solutioneer101Passed() {
    return this.instance.get('solutioneer101Passed');
  }
  set solutioneer101Passed(val) {
    return this.instance.set('solutioneer101Passed', Boolean(val));
  }

  get ndaSigned() {
    return this.instance.get('ndaSigned');
  }
  set ndaSigned(val) {
    return this.instance.set('ndaSigned', Boolean(val));
  }

  get ndaSignedDate() {
    return this.instance.get('ndaSignedDate');
  }
  set ndaSignedDate(val) {
    return this.instance.set(
      'ndaSignedDate',
      moment(val)
        .utc()
        .toDate()
    );
  }

  get semesterJoined() {
    return this.instance.get('semesterJoined');
  }
  set semesterJoined(val) {
    return this.instance.set('semesterJoined', val);
  }

  get chapter() {
    return this.instance.get('chapter');
  }
  set chapter(val) {
    return this.instance.set('chapter', val);
  }

  get position() {
    return this.instance.get('position');
  }
  set position(val) {
    return this.instance.set('position', val);
  }

  get currentlyActive() {
    return this.instance.get('currentlyActive');
  }
  set currentlyActive(val) {
    return this.instance.set('currentlyActive', Boolean(val));
  }

  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  }

  get isOnboarded() {
    return this.solutioneer101Passed && this.ndaSignedDate && this.commitmentAgreementSigned;
  }

  query() {
    const query = new parse.Query(this.instance);
    query.include('user');
    query.include('chapter');
    return query;
  }

  create(user) {
    if (user) this.user = user;
    this.instance.set('user', this.user);
    return this.instance.save();
  }

  createChapter(chapter) {
    getChapterById(chapter).then(result => {
      this.instance.set('chapter', result.instance);
      return this.instance.save();
    });
  }

  static fromUser(user) {
    const parseUser = new parse.User();
    parseUser.id = user.id;

    const query = new parse.Query('UserDetail');
    query.include('user'); // hydrate the user property
    query.equalTo('user', parseUser);

    return query.first().then(member => member && new UserDetail(member));
  }
}

export const wrapUserDetail = userDetail => new UserDetail(userDetail);
