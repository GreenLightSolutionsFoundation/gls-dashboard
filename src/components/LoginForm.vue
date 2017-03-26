<template>
  <div>
    <h1>Login page</h1>
    <form id="login-form" @submit.prevent="doSubmit">
      <div>
        <label>email</label>
        <input type="email" v-model="email">
      </div>
      <div>
        <label>password</label>
        <input type="password" v-model="password">
      </div>
      <div>
        <button type="submit">Login</button>
      </div>
    </form>
  </div>
</template>

<script>
  export default {
    name: 'login-form',
    data() {
      return {
        email: '',
        password: '',
      };
    },
    props: {
      onSubmit: Function,
    },
    methods: {
      doSubmit() {
        const { email, password } = this;
        this.onSubmit({ email, password });
      },
    },
  };
</script>
