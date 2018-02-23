<template>
  <div>
    <h1>Signup page</h1>
    <form id="signup-form" @submit.prevent="doSubmit">
      <div>
        <label>first name</label>
        <input type="text" v-model="firstName">
      </div>
      <div>
        <label>last name</label>
        <input type="text" v-model="lastName">
      </div>
      <div>
        <label>email</label>
        <input type="email" v-model="email">
      </div>
      <div>
        <label>username</label>
        <input type="text" v-model="username">
      </div>
      <div>
        <label>password</label>
        <input type="password" v-model="password">
      </div>
      <div>
        <label>verify password</label>
        <input type="password" v-model="passwordConfirm">
      </div>
      <div>
        <md-button class="md-raised md-primary" :disabled="isLoading" type="submit">
          {{ isLoading ? "Working..." : "Signup" }}
        </md-button>
      </div>
      <form-error v-if="errorMessage">{{ errorMessage }}</form-error>
    </form>
  </div>
</template>

<script>
export default {
  name: 'signup-form',
  data() {
    return {
      username: '',
      email: '',
      password: '',
      passwordConfirm: '',
      firstName: '',
      lastName: '',
    };
  },
  props: {
    isLoading: Boolean,
    errorMessage: String,
    onSubmit: Function,
  },
  methods: {
    doSubmit() {
      const { username, email, password, passwordConfirm, firstName, lastName, onSubmit } = this;
      this.onSubmit({ username, email, password, passwordConfirm, firstName, lastName, onSubmit });
    },
  },
};</script>
