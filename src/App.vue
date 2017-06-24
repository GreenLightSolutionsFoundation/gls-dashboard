<template>
  <div id="app">
   <primaryNav></primaryNav>

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
import { mapState } from 'vuex';
import primaryNav from './components/layout/Navigation-Primary.vue';

export default {
  name: 'app',
  components: {
    primaryNav,
  },
  computed: {
    ...mapState('onboarding', ['solutioneering101Quiz']),
  },
  methods: {
    checkIfSolutioneering101IsComplete() {
      if (!this.solutioneering101Quiz.completed === true) {
        this.$nextTick(() => {
          this.$refs.welcomeDialog.open();
        });
      } else {
        // TODO: load projects dashboard
      }
    },
    doGetStarted() {
      this.$refs.welcomeDialog.close();
      this.$router.push({ name: 'confidentiality-agreement' });
    },
  },
  mounted() {
    if (this.$router.currentRoute.name === 'dashboard') {
      this.checkIfSolutioneering101IsComplete();
    }
  },
  watch: {
    $route(newRoute) {
      if (newRoute.name === 'dashboard') {
        this.checkIfSolutioneering101IsComplete();
      }
    },
  },
};
</script>

<style lang="scss">
  @import './styles/main.scss';

  .solid-background {
    background-color: #FDFDFD;
  }

  .max-width {
    max-width: 800px;
    margin-left: auto;
    margin-right: auto;
    margin-top: 40px;
    margin-bottom: 40px;
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
