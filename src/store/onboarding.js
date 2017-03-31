/* global backand */
import { pick } from '../lib/utils';

const USERS_OBJECT = 'users';

function getUserId() {
  return backand.user.getUserDetails().then(res => res.data.userId);
}

export default {
  namespaced: true,
  state: {
    confidentialityAgreement: {
      signed: false,
      name: '',
      date: '',
    },
    commitmentAgreement: {
      signed: false,
      name: '',
      date: '',
    },
    solutioneering101Quiz: {
      completed: false,
      questions: [
        {
          id: 1,
          text: '1.  Question 1.',
          correctAnswerIndex: 0,
          correctAnswerReason: '',
          answers: [
            {
              id: 1,
              text: 'Answer 1',
            },
            {
              id: 2,
              text: 'Answer 2',
            },
            {
              id: 3,
              text: 'Answer 3',
            },
          ],
        },
        {
          id: 2,
          text: '2.  Question 2.',
          correctAnswerIndex: 0,
          correctAnswerReason: '',
          answers: [
            {
              id: 4,
              text: 'Answer 1',
            },
            {
              id: 5,
              text: 'Answer 2',
            },
            {
              id: 6,
              text: 'Answer 3',
            },
          ],
        },
        {
          id: 3,
          text: '3.  Question 3.',
          correctAnswerIndex: 0,
          correctAnswerReason: '',
          answers: [
            {
              id: 7,
              text: 'Answer 1',
            },
            {
              id: 8,
              text: 'Answer 2',
            },
            {
              id: 9,
              text: 'Answer 3',
            },
          ],
        },
      ],
      userAnswers: [0, 0, 0],
    },
  },
  mutations: {
    setConfidentialityAgreement(state, { name, date, signed }) {
      if (signed) Object.assign(state.confidentialityAgreement, { signed });
      else Object.assign(state.confidentialityAgreement, { name, date });
    },
    setCommitmentAgreement(state, { name, date, signed }) {
      if (signed) Object.assign(state.commitmentAgreement, { signed });
      else Object.assign(state.commitmentAgreement, { name, date });
    },
  },
  actions: {
    updateConfidentialityAgreement({ commit, dispatch, state }, value) {
      const data = pick(value, ['name', 'date']);

      // TODO: better input validation
      if (!data.name || !data.date) {
        return Promise.reject('Name and date are required');
      }

      commit('setConfidentialityAgreement', data);
      return Promise.resolve(state.confidentialityAgreement);
    },
    signConfidentialityAgreement({ commit }, signed = true) {
      const data = { ndaSigned: signed };

      return getUserId()
      .then(userId => backand.object.update(USERS_OBJECT, userId, data))
      .then((res) => {
        const { ndaSigned } = res.data;
        commit('setConfidentialityAgreement', { signed: ndaSigned });
      });
    },
    updateCommitmentAgreement({ commit, dispatch, state }, value) {
      const data = pick(value, ['name', 'date']);

      // TODO: better input validation
      if (!data.name || !data.date) {
        return Promise.reject('Name and date are required');
      }

      commit('setCommitmentAgreement', data);
      return Promise.resolve(state.confidentialityAgreement);
    },
    signCommitmentAgreement({ commit }, signed = true) {
      const data = { commitmentAgreementSigned: signed };

      return getUserId()
      .then(userId => backand.object.update(USERS_OBJECT, userId, data))
      .then(() => true);
    },
  },
};
