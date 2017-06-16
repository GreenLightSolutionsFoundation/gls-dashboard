<template>
  <md-card class="max-width">
    <md-card-header>
      <md-card-header-text>
        <div class="md-title">Solutioneering 101 Quiz</div>
      </md-card-header-text>
    </md-card-header>
  
    <md-card-content>
      <form novalidate @submit.stop.prevent="submit">
        <div v-for="(question, questionIndex) in solutioneering101Quiz.questions" class="question-container">
          <p>
            <strong>{{ question.text }}</strong>
          </p>
          <div v-for="(answer, answerIndex) in question.answers">
            <md-radio class="md-primary" :id="'answer-' + questionIndex + '-' + answerIndex" :name="'question-' + questionIndex" v-model="userAnswers[questionIndex]" :md-value="answerIndex">
              {{ answer }}
              <div v-if="question.correctAnswerIndex === answerIndex && isSubmitted === true" class="correct-answer-label">
                <md-icon class="md-primary">done</md-icon>
                Correct Answer
              </div>
              <div v-if="userAnswers[questionIndex] === answerIndex && isSubmitted === true && answerIndex !== question.correctAnswerIndex" class="incorrect-answer-label">
                <md-icon class="md-warn">clear</md-icon>
                Incorrect Answer
              </div>
            </md-radio>
            <div v-if="question.correctAnswerIndex === answerIndex && question.isCorrect === false" class="correct-answer-container">{{ question.correctAnswerReason }}</div>
          </div>
        </div>
      </form>
      <form-error v-if="errorMessage">{{ errorMessage }}</form-error>
      <md-layout md-align="end">
        <md-button class="md-raised md-primary" @click.native.prevent="doContinue">Continue</md-button>
      </md-layout>
    </md-card-content>
  </md-card>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import FormError from '../components/FormError.vue';

export default {
  name: 'solutioneering-101-quiz',
  components: {
    FormError,
  },
  data() {
    return {
      isSubmitted: false,
      userAnswers: [-1, -1, -1, -1, -1, -1, -1],
      errorMessage: '',
    };
  },
  methods: {
    ...mapActions('onboarding', ['setSolutioneering101QuizQuestionIsCorrectState', 'updateSolutioneering101QuizCompletedStatus']),
    doContinue() {
      // Mark the form as isSubmitted
      this.isSubmitted = true;

      // Check the answers
      var allQuestionsCorrect = true;
      for (var questionIndex = 0; questionIndex < this.solutioneering101Quiz.questions.length; questionIndex++) {
        var question = this.solutioneering101Quiz.questions[questionIndex];
        var userAnswer = this.userAnswers[questionIndex];
        var correctAnswer = question.correctAnswerIndex;

        if (userAnswer === correctAnswer) {
          this.setSolutioneering101QuizQuestionIsCorrectState({ questionIndex: questionIndex, isCorrect: true });
        } else {
          this.setSolutioneering101QuizQuestionIsCorrectState({ questionIndex: questionIndex, isCorrect: false });
          allQuestionsCorrect = false;
        }
      }

      if (allQuestionsCorrect) {
        this.setSolutioneering101QuizCompletedStatus(true);
        this.$router.push({ name: 'dashboard' });
      } else {
        this.errorMessage = 'Please correct your answers and select Continue';
      }
    },
  },
  computed: {
    ...mapState('onboarding', ['solutioneering101Quiz']),
  },
};
</script>

<style  type="text/scss">
.question-container {
  margin-bottom: 40px;
}

.correct-answer-container {
  color: #4caf50;
  margin-left: 28px;
}

.correct-answer-label,
.incorrect-answer-label {
  display: inline-block;
  margin-left: 10px;
}

.correct-answer-label {
  color: #4caf50;
}

.incorrect-answer-label {
  color: #ff5722;
}
</style>