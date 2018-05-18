<template>
  <md-card class="max-width">
    <md-card-header>
      <md-card-header-text>
        <div class="md-title">Solutioneering 101</div>
      </md-card-header-text>
    </md-card-header>

    <md-card-content>
      <p>Review the presentation below and select Continue to take a short quiz.</p>
      <iframe id="iframe_container" frameborder="0" webkitallowfullscreen="" mozallowfullscreen="" allowfullscreen="" width="100%" height="360" src="https://prezi.com/embed/tvcaqouutano/?bgcolor=ffffff&amp;lock_to_path=1&amp;autoplay=0&amp;autohide_ctrls=0&amp;landing_data=bHVZZmNaNDBIWnNjdEVENDRhZDFNZGNIUE1leUxmMzFkTE00VmV0bW9yQ2h2VG4xT21Sb2c3VzZNZHhOSCtISjlYZz0&amp;landing_sign=71YgME8qEh4WbYhAMB6LlBqe8B6zk_q3wgVM8Wg7JZg"></iframe>
      <md-button class="md-raised md-primary" @click.native.prevent="doContinue" style="margin-top: 20px">Continue</md-button>
    </md-card-content>
  </md-card>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'solutioneering-101',
  created() {
    if (this.user.solutioneer101Passed) this.$router.replace({ name: 'dashboard' });
  },
  computed: {
    ...mapState('authentication', ['user']),
  },
  methods: {
    doContinue() {
      this.$router.push({ name: 'solutioneering-101-quiz' });
    },
  },
};
</script>

<style type="text/scss">
#iframe_container {
  width: 100% !important;
  height: 360px !important;
}
</style>
