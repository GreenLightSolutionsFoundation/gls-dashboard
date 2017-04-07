import { getAll, update } from '../services/members';

export default {
  namespaced: true,
  state: {
    members: [],
    sort: {
      name: 'lastName',
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
        commit('setSort', state.sort.name);
        return members;
      });
    },
    activate({ commit, state }, id) {
      const data = { currentlyActive: true };
      // optimitic update
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
