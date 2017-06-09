import { getAll, update } from '../services/members';

export default {
  namespaced: true,
  state: {
    members: [],
    // sort: {
    //   name: 'lastName',
    //   order: 'asc',
    // },
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
    // TODO: re-sort the user list
    // setSort(state, name, order) {
    //   // set the sort info in the state
    //   Object.assign(state.sort, { name, order: sortOrder });
    // },
    updateMember(state, { id, data }) {
      state.members = state.members.map((member) => {
        if (member.id === id) Object.assign(member, data);
        return member;
      });
    },
  },
  actions: {
    getMembers({ commit, state }) {
      const options = { sort: state.sort };
      return getAll(options).then((members) => {
        commit('setMembers', members);
        // commit('setSort', state.sort.name);
        return members;
      });
    },
    activate({ commit, state }, id) {
      const data = { currentlyActive: true };
      // optimistic update
      commit('updateMember', { id, data });

      return update(id, data).catch(() => {
        // if the request fails, set the user back
        commit('updateMember', { id, data: { currentlyActive: false } });
      });
    },
    deactivate({ commit, state }, id) {
      const data = { currentlyActive: false };
      // optimitic update
      commit('updateMember', { id, data });

      return update(id, data).catch(() => {
        // if the request fails, set the user back
        commit('updateMember', { id, data: { currentlyActive: true } });
      });
    },
  },
};
