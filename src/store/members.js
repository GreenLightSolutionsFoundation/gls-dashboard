import { getAll } from '../services/members';

export default {
  namespaced: true,
  state: {
    members: [],
    sort: {
      name: '',
      order: 'asc',
    },
  },
  mutations: {
    setMembers(state, members) {
      state.members = members.map((member) => {
        const {
          solutioneer101Passed,
          ndaSigned,
          commitmentAgreementSigned,
        } = member;

        return {
          ...member,
          fullName: `${member.firstName} ${member.lastName}`,
          onboarded: (solutioneer101Passed && ndaSigned && commitmentAgreementSigned),
        };
      });
    },
    setSort(state, name, order) {
      // set the sort info in the state
      const sortOrder = order || state.order;
      Object.assign(state.sort, { name, order: sortOrder });

      // sort the member list, update the state array
      // TODO: re-sort the user list
      // const members = [...state.members];
      // members.sort((prev, next) => {
      // });
      // state.members = members;
    },
  },
  actions: {
    getMembers({ commit, state }) {
      return getAll().then((members) => {
        commit('setMembers', members);
        commit('setSort', state.sort.name);
        return members;
      });
    },
  },
};
