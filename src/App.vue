<template>
  <div id="app">

    <!-- Toolbar -->
    <md-theme md-name="white">
      <md-whiteframe>
        <md-toolbar>
        <bulb class="navbar-bulb"></bulb>
        <brand class="navbar-brand"></brand>
        <md-button @click.native.prevent="navigateTo('dashboard')">Dashboard</md-button>
        <md-button @click.native.prevent="navigateTo('cohort')">Cohort</md-button>
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

    <!-- Welcome Dialog -->
    <md-dialog ref="welcomeDialog" id="welcome-dialog">
      <md-dialog-title>Welcome!</md-dialog-title>
      <md-dialog-content>
        <p>We're glad you're here.  Here's what's next:</p>
        <ol>
          <li>Read and sign the confidentiality agreement.</li>
          <li>Read and sign the commitment agreement.</li>
          <li>Complete the Solutioneering 101 module.</li>
          <li>Review the available projects and submit your top 3 picks for projects that you'd like to be involved in.</li>
        </ol>
      </md-dialog-content>
      <md-dialog-actions>
        <md-button class="md-primary" @click.native="doGetStarted()">Get Started</md-button>
      </md-dialog-actions>
    </md-dialog>

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
    Brand,
  },
  computed: {
    ...mapGetters('authentication', ['username']),
  },
  methods: {
    navigateTo(routeName) {
      this.$router.push({ name: routeName });
    },
    doLogout() {
      this.logout().then(() => {
        this.$router.push({ name: 'login' });
      });
    },
    checkIfSolutioneering101IsComplete() {
      // TODO: check if user has completed Solutioneering 101.  If not, show the welcome dialog
      // and skip loading of the actual dashboard, else load their dashboard.
      this.$nextTick(function () {
        this.$refs['welcomeDialog'].open();
      });
    },
    doGetStarted() {
      this.$refs['welcomeDialog'].close();
      this.$router.push({ name: 'confidentiality-agreement' });
    },
    ...mapActions('authentication', ['logout']),
  },
  mounted: function() {
    if (this.$router.currentRoute.name === 'dashboard') {
      this.checkIfSolutioneering101IsComplete();
    }
  },
  watch: {
    '$route': function(newRoute, oldRoute) {
      if (newRoute.name === 'dashboard') {
        this.checkIfSolutioneering101IsComplete();
      }
    },
  },
};
</script>

<style lang="scss">
  @import './styles/main.scss';

  .navbar-bulb {
    width: 50px;
  }

  .navbar-brand {
    width: 110px;
  }

  .solid-background {
    background-color: #FDFDFD;
  }

  .max-width {
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

  #welcome-dialog .md-dialog {
    max-width: 500px;

    ol:not(.md-list)>li+li {
      margin-top: 8px;
    }
  }
</style>
