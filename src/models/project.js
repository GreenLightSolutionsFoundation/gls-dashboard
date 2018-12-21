import moment from 'luxon';
import parse from '../lib/parse';
import ParseObject from './parse_object';

export default class Project extends ParseObject {
  constructor(project) {
    const ParseProject = parse.Object.extend('Project');
    super(project || new ParseProject());
  }

  get name() {
    return this.instance.get('name');
  }
  set name(val) {
    return this.instance.set('name', val);
  }

  get description() {
    return this.instance.get('description');
  }
  set description(val) {
    return this.instance.set('description');
  }

  get startDate() {
    return this.instance.get('startDate');
  }
  set startDate(val) {
    return this.instance.set(
      'startDate',
      moment(val)
        .utc()
        .toDate()
    );
  }

  get endDate() {
    return this.instance.get('endDate');
  }
  set endDate(val) {
    return this.instance.set(
      'endDate',
      moment(val)
        .utc()
        .toDate()
    );
  }

  get status() {
    return this.instance.get('status');
  }
  set status(val) {
    return this.instance.set('status', val);
  }

  get totalPositions() {
    return this.instance.get('totalPositions');
  }
  set totalPositions(val) {
    return this.instance.set('totalPositions', parseInt(val, 10));
  }
}

export const wrapProject = project => new Project(project);
