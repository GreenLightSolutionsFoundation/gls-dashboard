<template>
  <div class="login">
    <logo-brand class="login-logo-brand"></logo-brand>

    <form id="login-form" @submit.prevent="handleSubmit">
      <h2>Dashboard Sign In</h2>

      <md-field :class="{ 'md-input-invalid': usernameError }">
        <label>Username</label>
        <md-input type="text" v-model="username"></md-input>
      </md-field>

      <md-field :class="{'md-input-invalid': passwordError }">
        <label>Password</label>
        <md-input type="password" v-model="password"></md-input>
      </md-field>

      <div class="input-row">
        <!-- <a class="forgot-password" href="#" @click.prevent="handleForgotPassword">
          Forgot Password
        </a> -->

        <md-button class="md-raised md-primary" :disabled="isLoading" type="submit">
          {{ isLoading ? "Working..." : "Login" }}
        </md-button>
      </div>
      <form-error v-if="errorMessage">{{ errorMessage }}</form-error>
    </form>
  </div>

</template>

<script>
import LogoBrand from "../components/LogoBrand.vue";
import FormError from "../components/FormError.vue";

export default {
  name: "login-form",

  components: {
    LogoBrand,
    FormError,
  },

  props: {
    isLoading: Boolean,
    errorMessage: String,
    onSubmit: Function,
  },

  data() {
    return {
      username: "",
      password: "",
      usernameError: false,
      passwordError: false,
    };
  },

  methods: {
    getValidationClass(fieldName) {
      const field = this.$v.form[fieldName];

      if (field) {
        return {
          "md-invalid": field.$invalid && field.$dirty
        };
      }
    },
    resetErrors() {
      this.usernameError = false;
      this.passwordError = false;
    },
    handleSubmit() {
      let hasErrors = false;
      this.resetErrors();

      if (!this.username || this.username.length < 1) {
        this.usernameError = true;
        hasErrors = true;
      }

      if (!this.password || this.password.length < 1) {
        this.passwordError = true;
        hasErrors = true;
      }

      if (hasErrors) return;

      const { username, password } = this;
      this.onSubmit({ username, password });
    },
  },
};
</script>


<style lang="scss">
.login {
  background-color: #f9f9f9;
  display: flex;
  flex-direction: column;
  justify-content: center;

  h2 {
    text-align: center;
  }

  .login-logo-brand {
    margin: 0 auto;
    height: 200px;
    width: 100%;
    max-height: 200px;
    max-width: 300px;

    path {
      fill: #66a52e;
    }
  }

  .login-title {
    text-align: center;
    font-size: 32px;
    padding: 20px;
    line-height: initial;
  }

  form {
    margin: 0 auto;
    background-color: white;
    width: 80%;
    max-width: 500px;
    padding: 19px;
    border-radius: 6px;
    border: 1px solid #cccccc;
  }

  .input-row {
    margin-top: 20px;
    display: flex;
    justify-content: flex-end;
    align-items: baseline;

    .forgot-password {
      flex: 1;
    }

    button {
      justify-content: flex-end;
    }
  }
}
</style>
