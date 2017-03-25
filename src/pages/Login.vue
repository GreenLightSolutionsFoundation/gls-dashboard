<template>
  <div>
    <h1>Login page</h1>
    <form v-if="formMode('login')" id="login-form" @submit.prevent="doLogin">
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
        <div>
          <a href="#" @click.prevent="setMode('signup')">Create an account</a>
        </div>
      </div>
    </form>

    <form v-if="formMode('signup')" id="signup-form" @submit.prevent="doSignup">
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
        <div>
          Have an account? <a href="#" @click.prevent="setMode('login')">Login instead</a>.
        </div>
      </div>
    </form>

    <p v-if="pending">Working...</p>
    <p v-if="errorMessage">Error: {{ errorMessage }}</p>
  </div>
</template>

<script>
  import { mapActions, mapState } from 'vuex';
  import store from '../store';

  export default {
    name: 'login-page',
    data() {
      return {
        mode: 'login',
        email: '',
        password: '',
        passwordConfirm: '',
        firstName: '',
        lastName: '',
      };
    },
    created() {
      const isAuthenticated = store.getters['authentication/isAuthenticated'];
      const getRedirect = (query) => {
        const { prev, redirect } = query;
        if (redirect !== undefined) return { name: redirect };
        if (prev !== undefined) return { path: prev };
        return { name: 'app' };
      };

      const sendTo = getRedirect(this.$route.query);

      // if authenticated, set to correct spot in the app
      if (isAuthenticated) return this.$router.replace(sendTo);

      // if not authenticated, save redirect info for post-authentication redirect
      this.sendTo = sendTo;
      return null;
    },
    computed: {
      ...mapState('authentication', ['pending', 'errorMessage']),
    },
    methods: {
      setMode(mode) {
        this.mode = mode;
      },
      formMode(mode) {
        return this.mode === mode;
      },
      doLogin() {
        const { email, password } = this;

        this.login({ email, password })
        .then(() => {
          this.$router.push({ name: 'home' });
        });
      },
      doSignup() {
        const { email, password, passwordConfirm, firstName, lastName } = this;

        this.signup({ email, password, passwordConfirm, firstName, lastName })
        .then(res => console.log(res))
      },
      ...mapActions('authentication', ['login', 'signup']),
    },
  };
</script>
