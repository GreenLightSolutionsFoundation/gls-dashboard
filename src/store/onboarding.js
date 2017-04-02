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
          text: 'What does VMOST stand for?',
          correctAnswerIndex: 3,
          correctAnswerReason: 'The VMOST communicates the project plan so it can be in alignment from a general to specific level.',
          answers: [
            'A. Very Massive Obstacles Some Take',
            'B. Value Money Or Stakeholder Tears',
            'C. Vision Mission Objectives Strategies Tactics',
            'D. Vomit Makes Oranges Smell Tasty',
          ],
          isCorrect: undefined,
        },
        {
          text: 'What are the Project Assets?',
          correctAnswerIndex: 4,
          correctAnswerReason: 'All of these assets are necessary to completing a successful GreenLight project! Utilize the Chapter Toolkit for templates, examples, and more.',
          answers: [
            'A. Memorandum of Understanding (MOU)',
            'B. Project Schedule/Timeline',
            'C. Project Report',
            'D. Green Paper',
            'E. All of the above',
            'F. None of the above',
          ],
          isCorrect: undefined,
        },
        {
          text: 'What is the Mastermind?',
          correctAnswerIndex: 0,
          correctAnswerReason: 'The GreenLight MasterMind events exist to help Solutioneers share their ideas with students from other projects, troubleshoot barriers they may face, and ultimately help them on their path to successfully completing their sustainability project.',
          answers: [
            'A. Monthly meeting for project teams to cross-collaborate',
            'B. The Big Boss at the end of the project',
            'C. The report identifying key points from the data',
            'D. The folder containing all Project Assets',
          ],
          isCorrect: undefined,
        },
        {
          text: 'What is the Laugh and Learn?',
          correctAnswerIndex: 3,
          correctAnswerReason: 'Personal success and friendships require more than just project work experience. The Laugh and Learns are designed to bridge Solutioneers project from GreenLight to infinity and beyond.',
          answers: [
            'A. Monthly meeting for Solutioneers to acquire exclusive professional development skills',
            'B. Monthly event for Solutioneers to just have fun',
            'C. Dance pose when you spill your drink at the club',
            'D. A and B',
          ],
          isCorrect: undefined,
        },
        {
          text: 'What is the Solutioneer Showcase?',
          correctAnswerIndex: 3,
          correctAnswerReason: 'Our Solutioneer Showcase is our public event where students have the opportunity to share their great work with the community; Showcases include student project presentations, Q&A, professional networking, great food, and more.',
          answers: [
            'A. Professional networking event every academic term',
            'B. The presentation of Solutioneer projects',
            'C. Dance pose after you take a shot of wheat grass',
            'D. A and B',
          ],
          isCorrect: undefined,
        },
        {
          text: 'True or False: Solutioneers can expect to spend about 5 hours/week doing GreenLight work (this includes team meetings, individual work, and social events)',
          correctAnswerIndex: 0,
          correctAnswerReason: 'Creating real solutions for real businesses requires real time commitment; all Solutioneers are expected to commit at least 5 hours each week to GreenLight-related work',
          answers: [
            'A. True',
            'B. False',
          ],
          isCorrect: undefined,
        },
        {
          text: 'Within how much time is a Solutioneer expected to respond to communications (at least acknowledging message received)?',
          correctAnswerIndex: 1,
          correctAnswerReason: 'GreenLight Solutions is a professional organization, and we expect our students to be professional with their communication; responding within a 48-hour window is generally accepted in the business world.',
          answers: [
            'A. Immediately',
            'B. Within 48 hours',
            'C. Within a week',
            'D. Whenever they get around to it',
          ],
          isCorrect: undefined,
        },
      ],
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
    setSolutioneering101QuestionIsCorrectState(state, { questionIndex, isCorrect }) {
      state.solutioneering101Quiz.questions[questionIndex].isCorrect = isCorrect;
    },
    setSolutioneering101QuizCompletedStatus(state, value) {
      state.solutioneering101Quiz.completed = value;
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
    updateSolutioneering101QuizQuestionIsCorrectState({ commit }, value) {
      commit('setSolutioneering101QuestionIsCorrectState', value);
    },
    updateSolutioneering101QuizCompletedStatus({ commit }, value) {
      // TODO: Call in to backand to update Solutionering 101 quiz status
      commit('setSolutioneering101QuizCompletedStatus', value);
    },
  },
};
