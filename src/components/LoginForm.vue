<template>
  <div class="login">
    <logo-brand class="login-logo-brand"></logo-brand>
    
    <form
        id="login-form"
        v-on:submit.prevent="handleSubmit">
      <div class="login-title">Dashboard Sign In</div>
      
      <div 
          class="input-row"
          v-bind:class="{'input-error':emailError && (!email || !email.length)}">
        <input
            placeholder="email"
            type="text"
            v-model="email"/>
      </div>
      
      <div
          class="input-row"
          v-bind:class="{'input-error':passwordError && (!password || !password.length)}">
        <input
            placeholder="Password"
            type="password"
            v-model="password"
            v-on:keyup.enter="handleSubmit"/>
      </div>
      
      <div class="input-row">
        <a
            class="forgot-password"
            href="#"
            v-on:click.prevent="handleForgotPassword">
          Forgot Password
        </a>
        
        <button type="submit">
          Submit
        </button>
      </div>
    </form>
  </div>
  
</template>

<script>
  import LogoBrand from '../components/LogoBrand.vue';
  
  export default {
    name: 'login-form',
    
    components: {
      LogoBrand,
    },
    
    props: {
      onSubmit: Function,
    },
    
    data() {
      return {
        email: this.email,
        password: this.password,
        emailError: false,
        passwordError: false,
      };
    },
    
    computed: {
      emailClass() {
        this.emailError = !(this.email && this.email.length);
        return {
          'input-error': this.emailError
        };
      },
      passwordClass() {
        this.passwordError = !(this.password && this.password.length);
        return {
          'input-error': this.passwordError
        };
      }
    },
    
    methods: {
      handleForgotPassword() {
        // TODO - write forgot password function
      },
      handleSubmit() {
        if(!this.email || this.email.length < 1) {
          this.$el.querySelector('input[type=text]').focus();
          return this.emailError = true;
        }
        if(!this.password || this.password.length < 1) {
          this.$el.querySelector('input[type=password]').focus()
          return this.passwordError = true;
        }
        // TODO - write form submission function 
        
        const { email, password } = this;
        this.onSubmit({ email, password });
      }
    }
    
  };
</script>

<style lang="scss">
body, body.md-theme-default {
  background-color: #f9f9f9 !important;
  font-family: 'Roboto';
}

.login {
  background-color: #f9f9f9;
  display: flex;
  flex-direction: column;
  justify-content: center;
  
  &-logo-brand {
    margin: 0 auto;
    height: 200px;
    width: 300px;
    max-height: 200px;
    max-width:300px;
    
    path {
      fill: #66a52e;
    }
  }
  
  &-title {
    text-align: center;
    font-size: 32px;
    padding: 20px;
  }
  
  form {
    margin: 0 auto;
    background-color: white;
    width:80%;
    padding:19px;
    border-radius: 6px;
    border: 1px solid #cccccc;
  }
  
  .forgot-password {
    flex: 1;
  }
  
  button[type=submit] {
    background-color: #66a52e;
    border: none;
    border-radius: 6px;
    color:white;
    padding:10px 14px;
    font-size: 24px;
  }
  
  .input-row {
    margin-top:20px;
    position: relative;
    display: flex;
    align-items: baseline;
    
    input {
      width:100%;
      line-height: 28px;
      font-size: 24px;
      height: 45px;
      border: none;
      background-color: none;
    }
    
    &:not(:last-child):after {
      position: absolute;
      content: "";
      left: 0;
      right: 0;
      bottom: 0;
      height: 1px;
      background-color: #cccccc;
    }
  }
  
  .input-error {
    border: 1px solid red;
  }
}
</style>