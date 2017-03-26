<template>
  <div id="app">

    <!-- Toolbar -->
    <md-theme md-name="white">
      <md-whiteframe>
        <md-toolbar>
          <h1 class="md-title">Toolbar</h1>
          <a href="#" @click.prevent="doLogout">Logout</a>
        </md-toolbar>
      </md-whiteframe>
    </md-theme>

    <!-- Page content -->
    <div class="page-content">
      <router-view></router-view>
    </div>

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

<style lang="scss">
  @import './styles/main.scss';

  .page-content {
    max-width: 750px;
  }
</style>