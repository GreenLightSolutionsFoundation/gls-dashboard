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
          <md-button @click.native.prevent="doLogout">Logout</md-button>
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
    cohort(){
      console.log('clicked cohort');
      this.$router.push({ name: 'cohort' });
    },
    doLogout() {
      this.logout().then(() => {
        this.$router.push({ name: 'login' });
      });
    },
    doGetStarted() {
      this.$refs['welcomeDialog'].close();
    },
    ...mapActions('authentication', ['logout']),
  },
  mounted: function() {
    this.$nextTick(function () {
      this.$refs['welcomeDialog'].open();
    });
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

  .page-content {
    max-width: 800px;
    margin-left: auto;
    margin-right: auto;
    margin-top: 40px;
    padding-left: 20px;
    padding-right: 20px;
    padding-bottom: 20px;
  }

  #welcome-dialog .md-dialog {
    max-width: 500px;

    ol:not(.md-list)>li+li {
      margin-top: 8px;
    }
  }
</style>
