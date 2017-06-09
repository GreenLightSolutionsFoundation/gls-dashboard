<template>
  <div>
    <login-form
      v-if="formMode('login')"
      :isLoading="pending"
      :errorMessage="errorMessage"
      :onSubmit="doLogin"
      >
    </login-form>

    <signup-form
      v-if="formMode('signup')"
      :isLoading="pending"
      :errorMessage="errorMessage"
      :onSubmit="doSignup"
      >
    </signup-form>

    <!-- <div class="new-here-signup" v-if="formMode('login')">
      New here? <a href="#" @click.prevent="setMode('signup')">Create an account</a>
    </div> -->
    <div v-if="formMode('signup')">
      Have an account? <a href="#" @click.prevent="setMode('login')">Login here</a>.
    </div>
  </div>
</template>

<script>
  import { mapActions, mapState, mapGetters } from 'vuex';
  import LoginForm from '../components/LoginForm.vue';
  import SignupForm from '../components/SignupForm.vue';

  export default {
    name: 'login-page',
    components: {
      LoginForm,
      SignupForm,
    },
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
      // pre-mounting lifecycle check for user authentication
      const getRedirect = (query) => {
        const { prev, redirect } = query;
        if (redirect !== undefined) return { name: redirect };
        if (prev !== undefined) return { path: prev };
        return { name: 'dashboard' };
      };

      const sendTo = getRedirect(this.$route.query);

      // if authenticated, set to correct spot in the app
      if (this.isAuthenticated) return this.$router.replace(sendTo);

      // if not authenticated, save redirect info for post-authentication redirect
      this.sendTo = sendTo;
      return null;
    },
    computed: {
      ...mapState('authentication', ['pending', 'errorMessage']),
      ...mapGetters('authentication', ['isAuthenticated']),
    },
    methods: {
      ...mapActions('authentication', ['login', 'signup']),
      setMode(mode) {
        this.mode = mode;
      },
      formMode(mode) {
        return this.mode === mode;
      },
      updateField(field, value) {
        this[field] = value;
      },
      doLogin(fields) {
        this.login(fields).then((user) => {
          if (user === null) return this.$router.push({ name: 'approval-pending' });
          return this.$router.push(this.sendTo);
        });
      },
      doSignup(fields) {
        this.signup(fields).then((user) => {
          if (user === null) this.$router.push({ name: 'approval-pending' });
        });
      },
    },
  };
</script>

<style>
.new-here-signup {
  margin: 20px auto;
  width: 80%;
  max-width: 500px;
  text-align: center;
}
</style>
