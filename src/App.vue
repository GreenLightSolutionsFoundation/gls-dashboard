<template>
  <div id="app">

    <!-- Toolbar -->
    <md-theme md-name="white">
      <md-whiteframe>
        <md-toolbar>
        <bulb class="navbar-bulb"></bulb>
        <brand class="navbar-brand"></brand>
          <md-button>Dashboard</md-button>
          <md-button @click.native="cohort">Cohorts</md-button>
          <md-menu md-align-trigger class="goto-right">
            <md-button md-menu-trigger>
              <span>Abbey Christansen</span>
              <md-avatar>
                <img src="https://placeimg.com/40/40/people/5" alt="People">
              </md-avatar>
            </md-button>
            <md-menu-content class="solid-background">
              <md-list-item>
                <md-button @click.native.prevent="doLogout">Logout</md-button>
              </md-list-item>
            </md-menu-content>
          </md-menu>
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
    cohort(){
      console.log('clicked cohort');
      this.$router.push({ name: 'cohort' });
    },
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

  .solid-background {
    background-color: #FDFDFD;
  }
  .page-content {
    max-width: 800px;
    margin-left: auto;
    margin-right: auto;
    margin-top: 40px;
    padding-left: 20px;
    padding-right: 20px;
    padding-bottom: 20px;
  }

  .goto-right {
    margin-left: auto;
  }
</style>
