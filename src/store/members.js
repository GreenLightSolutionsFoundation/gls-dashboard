import { getAll, setActive } from '../services/members';

export default {
  namespaced: true,
  state: {
    members: [],
  },
  mutations: {
    setMembers(state, members) {
      state.members = members;
    },
    updateMember(state, { id, data }) {
      state.members = state.members.map((member) => {
        if (member.id === id) Object.keys(data).forEach(key => (member[key] = data[key]));
        return member;
      });
    },
  },
  actions: {
    getMembers({ commit, state }) {
      const options = { sort: state.sort };
      return getAll(options).then((members) => {
        commit('setMembers', members);
        return members;
      });
    },
    setActive({ commit, state }, { member, active }) {
      // optimistic update
      const data = { currentlyActive: Boolean(active) };
      commit('updateMember', { id: member.id, data });

      return setActive(member, data.currentlyActive).catch(() => {
        // if the request fails, set the user back
        commit('updateMember', { id: member.id, data: { currentlyActive: !data.currentlyActive } });
      });
    },
  },
};
