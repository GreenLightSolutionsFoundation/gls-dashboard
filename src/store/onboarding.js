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
