<template>
  <div id="app">

    <!-- Toolbar -->
    <md-theme md-name="white">
      <md-whiteframe>
        <md-toolbar>
        <bulb class="navbar-bulb"></bulb>
        <brand class="navbar-brand"></brand>
          <md-button>Dashboard</md-button>
          <md-button>Cohorts</md-button>
          <md-button @click.native.prevent="doLogout">Logout</md-button>
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
import Bulb from './components/navbarbrand/Bulb.vue';
import Brand from './components/navbarbrand/Brand.vue';

export default {
  name: 'app',
  components: {
    Bulb,
    Brand
  },
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

.navbar-bulb {
  width: 50px;
}

.navbar-brand {
  width: 110px;
}


</style>
