<template>
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
</template>

<script>
  export default {
    name: 'welcome-dialog',
    props: {
      isOpen: Boolean,
    },
    methods: {
      doGetStarted() {
        this.$emit('getStarted');
        this.closeDialog();
      },
      openDialog() {
        this.$emit('open');
        this.$refs.welcomeDialog.open();
      },
      closeDialog() {
        this.$emit('close');
        this.$refs.welcomeDialog.close();
      },
    },
    watch: {
      isOpen(val) {
        this.$nextTick(() => {
          console.log('isOpen', val)
          if (val) this.openDialog();
          else this.closeDialog();
        });
      },
    },
    mounted() {
      if (this.isOpen) this.openDialog();
    },
  };
</script>