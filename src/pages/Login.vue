<template>
  <div>
    <h1>Login page</h1>
    <p>users will login here</p>
  </div>
</template>

<script>
  import store from '../store';

  export default {
    name: 'login-page',
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
  };
</script>
