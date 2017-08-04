<template>
  <form novalidate @submit.stop.prevent="submit">
    <md-layout md-gutter="40">
      <md-layout md-flex="60" md-flex-xsmall="100">
        <md-input-container>
          <label>Full Name</label>
          <md-input v-model="locals.name"></md-input>
        </md-input-container>
      </md-layout>
      <md-layout>
        <md-input-container>
          <label>Date</label>
          <md-input type="date" v-model="locals.date"></md-input>
        </md-input-container>
      </md-layout>
    </md-layout>
    <md-layout md-align="end">
      <md-button class="md-raised md-primary" @click.native.prevent="doSubmit">Continue</md-button>
    </md-layout>
  </form>
</template>

<script>
export default {
  name: 'agreement-signature-form',
  data() {
    return {
      locals: {
        name: '',
        date: '',
      },
    };
  },
  props: {
    name: String,
    date: String,
    onSubmit: Function,
  },
  methods: {
    doSubmit() {
      this.onSubmit({
        name: this.locals.name,
        date: this.locals.date,
      });
    },
  },
  created() {
    Object.assign(this.locals, { name: this.name, date: this.date });
  },
};
</script>
