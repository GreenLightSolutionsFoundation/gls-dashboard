import parse from '../lib/parse';

export default class Project {
  constructor(project) {
    this.project = project || new parse.Project();
  }
}
