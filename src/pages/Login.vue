<template>
  <div>
    <h1>Login page</h1>
    <form @submit.prevent="doLogin">
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
        email: '',
        password: '',
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
      doLogin() {
        const { email, password } = this;
        this.login({ email, password });
      },
      ...mapActions('authentication', ['login']),
    },
  };
</script>
