<template>
  <form novalidate @submit.stop.prevent="submit">
    <div class="md-layout">
      <div class="md-layout-item">
        <md-field>
          <label>Full Name</label>
          <md-input v-model="locals.name"></md-input>
        </md-field>
      </div>
      <div class="md-layout-item">
        <md-datepicker v-model="locals.date"></md-datepicker>
      </div>
    </div>
    <md-button class="md-raised md-primary" @click.native.prevent="doSubmit">Continue</md-button>
  </form>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'agreement-signature-form',
  data() {
    return {
      locals: {
        name: '',
        date: null,
        user: {},
      },
    };
  },
  computed: {
    ...mapState('authentication', ['user']),
  },
  props: {
    name: String,
    date: Date,
    onSubmit: Function,
  },
  methods: {
    doSubmit() {
      this.onSubmit({
        name: this.locals.name,
        date: this.locals.date,
        user: this.user,
      });
    },
  },
  created() {
    Object.assign(this.locals, {
      name: this.name,
      date: this.date,
      user: this.user,
    });
  },
};</script>
