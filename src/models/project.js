import moment from 'moment';
import parse from '../lib/parse';
import ParseObject from './parse_object';

export default class Project extends ParseObject {
  constructor(project) {
    super();
    this.project = project || new parse.Project();
  }

  get id() { return this.project.id; }
  get createdAt() { return this.project.createdAt; }
  get updatedAt() { return this.project.updatedAt; }

  get name() { return this.project.get('name'); }
  set name(val) { return this.project.set('name', val); }

  get description() { return this.project.get('description'); }
  set description(val) { return this.project.set('description'); }

  get startDate() { return this.project.get('startDate'); }
  set startDate(val) { return this.project.set('startDate', moment(val).utc().toDate()); }

  get endDate() { return this.project.get('endDate'); }
  set endDate(val) { return this.project.set('endDate', moment(val).utc().toDate()); }

  get status() { return this.project.get('status'); }
  set status(val) { return this.project.set('status', val); }

  get chapter() { return this.project.get('chapter'); }
  set chapter(val) { return this.project.set('chapter'); }

  get partnerOrganization() { return this.project.get('partnerOrganization'); }
  set partnerOrganization(val) { return this.project.set('partnerOrganization', val); }

  get totalPositions() { return this.project.get('totalPositions'); }
  set totalPositions(val) { return this.project.set('totalPositions', parseInt(val, 10)); }

  save() { return this.project.save(); }
}
