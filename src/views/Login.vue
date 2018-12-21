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
import UserDetail from '../models/userDetail';
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
      pending: false,
      email: '',
      password: '',
      passwordConfirm: '',
      firstName: '',
      lastName: '',
    };
  },
  created() {
    // pre-mounting lifecycle check for user authentication
    const getRedirect = query => {
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
    ...mapState('authentication', ['errorMessage']),
    ...mapGetters('authentication', ['isAuthenticated']),
  },
  methods: {
    ...mapActions('authentication', ['login', 'logout', 'signup', 'setErrorMessage']),
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
      this.pending = true;

      this.login(fields)
        .then(user => {
          if (this.errorMessage) {
            // error happend, message will be shown
            this.pending = false;
          } else {
            // create a member model instance form the user record
            UserDetail.fromUser(user)
              .then(member => {
                // we're done with the async stuff, reset pending state
                this.pending = false;

                // member not found, show error message
                if (!member) {
                  this.logout();
                  this.setErrorMessage('Login failed, member not found');
                  return;
                }

                // check if the user is active, send to pending page if they are
                if (!member.currentlyActive) this.$router.push({ name: 'approval-pending' });
                // otherwise, send them where they need to go
                else this.$router.push(this.sendTo);
              })
              .catch(() => {
                this.setErrorMessage('Login failed, member not found');
              });
          }
        })
        .catch(() => {
          this.pending = false;
        });
    },
    doSignup(fields) {
      this.pending = true;
      this.signup(fields)
        .then(user => {
          this.pending = false;
          if (user == null) this.$router.push({ name: 'approval-pending' });
        })
        .catch(() => {
          this.pending = false;
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
