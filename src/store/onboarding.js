import moment from 'moment';
import { getUserDetail } from '../services/user';

function isSignedName(nameToCheck, userDetails) {
  if (
    nameToCheck
      .trim()
      .toLowerCase()
      .replace(' ', '') !==
    userDetails.fullName
      .trim()
      .toLowerCase()
      .replace(' ', '')
  ) {
    return false;
  }
  return true;
}

export default {
  namespaced: true,
  state: {
    confidentialityAgreement: {
      signed: false,
      name: '',
      date: null,
    },
    commitmentAgreement: {
      signed: false,
      name: '',
      date: null,
    },
    solutioneering101Quiz: {
      completed: false,
      questions: [
        {
          text: 'What does VMOST stand for?',
          correctAnswerIndex: 3,
          correctAnswerReason:
            'The VMOST communicates the project plan so it can be in alignment from a general to specific level.',
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
          correctAnswerReason:
            'All of these assets are necessary to completing a successful GreenLight project! Utilize the Chapter Toolkit for templates, examples, and more.',
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
          correctAnswerReason:
            'The GreenLight MasterMind events exist to help Solutioneers share their ideas with students from other projects, troubleshoot barriers they may face, and ultimately help them on their path to successfully completing their sustainability project.',
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
          correctAnswerReason:
            'Personal success and friendships require more than just project work experience. The Laugh and Learns are designed to bridge Solutioneers project from GreenLight to infinity and beyond.',
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
          correctAnswerReason:
            'Our Solutioneer Showcase is our public event where students have the opportunity to share their great work with the community; Showcases include student project presentations, Q&A, professional networking, great food, and more.',
          answers: [
            'A. Professional networking event every academic term',
            'B. The presentation of Solutioneer projects',
            'C. Dance pose after you take a shot of wheat grass',
            'D. A and B',
          ],
          isCorrect: undefined,
        },
        {
          text:
            'True or False: Solutioneers can expect to spend about 5 hours/week doing GreenLight work (this includes team meetings, individual work, and social events)',
          correctAnswerIndex: 0,
          correctAnswerReason:
            'Creating real solutions for real businesses requires real time commitment; all Solutioneers are expected to commit at least 5 hours each week to GreenLight-related work',
          answers: ['A. True', 'B. False'],
          isCorrect: undefined,
        },
        {
          text:
            'Within how much time is a Solutioneer expected to respond to communications (at least acknowledging message received)?',
          correctAnswerIndex: 1,
          correctAnswerReason:
            'GreenLight Solutions is a professional organization, and we expect our students to be professional with their communication; responding within a 48-hour window is generally accepted in the business world.',
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
      Object.assign(state.confidentialityAgreement, {
        name,
        date: moment(date).format('L'),
        signed,
      });
    },
    setCommitmentAgreement(state, { name, date, signed }) {
      Object.assign(state.commitmentAgreement, { name, date: moment(date).format('L'), signed });
    },
    setSolutioneering101QuestionIsCorrectState(state, { questionIndex, isCorrect }) {
      Object.assign((state.solutioneering101Quiz.questions[questionIndex].isCorrect = isCorrect));
    },
    setSolutioneering101QuizCompletedStatus(state, value) {
      Object.assign((state.solutioneering101Quiz.completed = value));
    },
  },
  actions: {
    signConfidentialityAgreement({ commit }, { name, date, user }) {
      return getUserDetail(user)
        .then(detail => {
          if (!isSignedName(name, detail)) {
            return Promise.reject('signed name does not match the user name');
          }
          detail.ndaSigned = true;
          detail.ndaSignedDate = date;
          return detail.save();
        })
        .then(res => {
          const ndaSigned = res.attributes.ndaSigned;
          commit('setConfidentialityAgreement', { name, date, signed: ndaSigned });
          return Promise.resolve({ name, date, signed: ndaSigned });
        })
        .catch(error => Promise.reject(error));
    },
    signCommitmentAgreement({ commit }, { name, date, user }) {
      return getUserDetail(user)
        .then(detail => {
          if (!isSignedName(name, detail)) {
            return Promise.reject('signed name does not match the current user name');
          }
          detail.commitmentAgreementSigned = true;
          detail.commitmentAgreementSignedDate = date;
          return detail.save();
        })
        .then(res => {
          const commitmentAgreementSigned = res.attributes.commitmentAgreementSigned;
          commit('setCommitmentAgreement', { name, date, signed: commitmentAgreementSigned });
          return Promise.resolve({ name, date, signed: commitmentAgreementSigned });
        })
        .catch(error => Promise.reject(error));
    },
    setSolutioneering101QuizQuestionIsCorrectState({ commit }, value) {
      commit('setSolutioneering101QuestionIsCorrectState', value);
      return Promise.resolve(value);
    },
    setSolutioneering101QuizCompletedStatus({ commit }, { completed, user }) {
      return getUserDetail(user)
        .then(detail => {
          detail.solutioneer101Passed = completed;
          return detail.save();
        })
        .then(res => {
          const quizResult = res.attributes.solutioneer101Passed;
          commit('setSolutioneering101QuizCompletedStatus', { value: quizResult });
          return Promise.resolve(quizResult);
        })
        .catch(error => Promise.reject(error));
    },
  },
};
