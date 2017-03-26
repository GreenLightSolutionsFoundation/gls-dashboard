export default {
  namespaced: true,
  state: {
    confidentialityAgreement: {
      name: 'Test',
      date: '12/12/1970',
    },
    commitmentAgreement: {
      name: '',
      date: '',
    },
    solutioneering101Quiz: {
      questions: [
        {
          text: '',
          correctAnswerIndex: 0,
          correctAnswerReason: '',
          answers: [
            '',
            '',
            '',
          ],
        },
        {
          text: '',
          correctAnswerIndex: 0,
          correctAnswerReason: '',
          answers: [
            '',
            '',
            '',
          ],
        },
        {
          text: '',
          correctAnswerIndex: 0,
          correctAnswerReason: '',
          answers: [
            '',
            '',
            '',
          ],
        },
      ],
      userAnswers: [],
    },
  },
  mutations: {
    setConfidentialityAgreement(state, { name, date }) {
      Object.assign(state.confidentialityAgreement, { name, date });
    },
  },
  actions: {
    updateConfidentialityAgreement({ commit }, value) {
      return new Promise((resolve) => {
        // TODO: call service
        commit('setConfidentialityAgreement', value);
        resolve(value);
      });
    },
  },
};
