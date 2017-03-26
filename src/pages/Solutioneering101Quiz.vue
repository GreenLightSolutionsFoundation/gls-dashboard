<template>
  <div>
    <h1 class="md-title" style="margin-bottom: 40px;">Solutioneering 101 Quiz</h1>
    <form novalidate @submit.stop.prevent="submit">
      <div v-for="(question, questionIndex) in solutioneering101Quiz.questions" class="question-container">
        <p><strong>{{ question.text }}</strong></p>
        <div v-for="(answer, answerIndex) in question.answers">
          <md-radio class="md-primary" :id="'answer-' + answer.id" v-model="userAnswers[questionIndex]" :name="question.id.toString()" :md-value="answer.id">{{ answer.text }}</md-radio>
        </div>
      </div>
    </form>
    <md-layout md-align="end">
      <md-button class="md-raised md-primary" @click.native.prevent="doContinue">Continue</md-button>
    </md-layout>
  </div>
</template>

<script>
  import { mapState } from 'vuex';

  export default {
    name: 'solutioneering-101-quiz',
    data() {
      return {
        userAnswers: [0, 0, 0],
      };
    },
    methods: {
      doContinue() {
        this.$router.push({ name: 'dashboard' });
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
</style>