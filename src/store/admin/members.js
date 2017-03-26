import { getAll } from '../../services/members';

export default {
  namespaced: true,
  state: {
    members: [],
  },
  mutations: {
    setMembers(state, members) {
      state.members = members.map((member, i) => {
        return {
          ...member,
          fullName: `${member.firstName} ${member.lastName}`,
          onboarded: (member.solutioneer101Passed && member.ndaSigned),
        };
      });
    },
  },
  actions: {
    getMembers({ commit }) {
      return getAll().then((members) => {
        commit('setMembers', members);
        return members;
      });
    },
  },
};
