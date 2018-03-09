import { getAll } from '../services/projects';

export default {
  namespaced: true,
  state: {
    projects: [],
    filters: {
      pageSize: 20,
      pageNumber: 1,
    },
  },
  mutations: {
    setProjects(state, projects) {
      state.projects = projects;
    },
  },
  actions: {
    getProjects({ commit, state }, filters = {}) {
      return getAll(filters).then(projects => {
        commit('setProjects', projects);
        return projects;
      });
    },
  },
};
