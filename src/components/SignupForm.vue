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
        <label>password</label>
        <input type="password" v-model="password">
      </div>
      <div>
        <label>verify password</label>
        <input type="password" v-model="passwordConfirm">
      </div>
      <div>
        <button type="submit">Signup</button>
      </div>
    </form>
  </div>
</template>

<script>
  export default {
    name: 'signup-form',
    data() {
      return {
        email: '',
        password: '',
        passwordConfirm: '',
        firstName: '',
        lastName: '',
      };
    },
    props: {
      onSubmit: Function,
    },
    methods: {
      doSubmit() {
        const { email, password, passwordConfirm, firstName, lastName, onSubmit } = this;
        this.onSubmit({ email, password, passwordConfirm, firstName, lastName, onSubmit });
      },
    },
  };
</script>
