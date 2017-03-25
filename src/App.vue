<template>
  <div id="app">
    <nav>
      <h1>Page header...</h1>
      <div>Hello {{ username.fullName }}</div>
      <div><a href="#" @click.prevent="doLogout">Logout</a></div>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'app',
  computed: {
    ...mapGetters('authentication', ['username']),
  },
  methods: {
    doLogout() {
      this.logout().then(() => {
        this.$router.push({ name: 'login' });
      });
    },
    ...mapActions('authentication', ['logout']),
  },
};
</script>
