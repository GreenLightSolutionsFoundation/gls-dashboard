<template>
  <div>
    <welcome-dialog :is-open="isWelcomeOpen" @getStarted="doGetStarted"></welcome-dialog>

    <!-- My Projects -->
    <div class="section-container">
      <div class="page-heading">My Projects</div>

      <div v-if="assignedProjects && assignedProjects.length > 0">
        <project-details v-for="project in assignedProjects" :key="project.id" :project="project"></project-details>
      </div>

      <div v-else-if="selectedProjects && selectedProjects.length > 0">
        <p>Your project application is pending.  Your project picks were:</p>
        <div id="project-selections">
          <project-summary v-for="project in selectedProjects" :key="project.id" :project="project"></project-summary>
        </div>
        <p>You will receive an e-mail once you've been added to a project.</p>
      </div>

      <div v-else>
        <p>You have not yet made your project selections.</p>
        <md-button class="md-raised md-primary">Make My Project Selections</md-button>
      </div>
    </div>

    <!-- Congrats Dialog -->
    <md-dialog ref="congratsDialog" id="congrats-dialog">
      <md-dialog-title>Congratulations!</md-dialog-title>
      <md-dialog-content>
        <p>You are now an official GreenLight Solutioneer and well on your way to joining a GreenLight Solutions sustainability project.</p>
        <p>You can now review the available projects and make your top 3 picks for the projects you'd like to join.  If you're not ready to to make your picks, you can make your selections later from the Dashboard screen.</p>
      </md-dialog-content>
      <md-dialog-actions>
        <md-button @click.native="doCongratsDialogClose()">Close</md-button>
        <md-button class="md-primary" @click.native="doGoToProjectSelection()">Make My Project Selections Now</md-button>
      </md-dialog-actions>
    </md-dialog>

  </div>
</template>

<script>
  import { mapState } from 'vuex';
  import ProjectSummary from '../components/ProjectSummary.vue';
  import ProjectDetails from '../components/ProjectDetails.vue';
  import WelcomeDialog from '../components/WelcomeDialog.vue';

  export default {
    name: 'dashboard',
    components: {
      ProjectSummary,
      ProjectDetails,
      WelcomeDialog,
    },
    data: () => ({
      isWelcomeOpen: false,
      selectedProjects: [
        {
          id: 1,
          name: 'Build Us Hope',
          partnerOrganization: {
            name: 'Singleton Community Services, INC.',
            logo: 'https://placehold.it/70x70?text=logo',
          },
        },
        {
          id: 2,
          name: 'Shaw Montessori Project',
          partnerOrganization: {
            name: 'Augustus H. Shaw Jr. Elementary School',
            logo: 'https://placehold.it/70x70?text=logo',
          },
        },
        {
          id: 3,
          name: 'Solar Impact in the Valley of the Sun',
          partnerOrganization: {
            name: 'SolarCity',
            logo: 'https://placehold.it/70x70?text=logo',
          },
        },
      ],
      assignedProjects: [
        {
          id: 1,
          name: 'Build Us Hope',
          description: 'Design and build an affordable and sustainable tiny home community.',
          partnerOrganization: {
            name: 'Singleton Community Services, INC.',
            logo: 'https://placehold.it/70x70?text=logo',
          },
          enrolledPositions: 5, // not in project model
          totalPositions: 10,
          startDate: '8/15/2017',
          endDate: '12/14/2017',
          resourcesUrl: 'https://drive.google.com/drive/folders/0B1FoB345Ur60ckxIa0dlYW1asdflE?usp=sharing', // not in project model
        },
      ],
    }),
    computed: {
      ...mapState('onboarding', ['solutioneering101Quiz']),
    },
    methods: {
      doGetStarted() {
        this.$router.push({ name: 'confidentiality-agreement' });
      },
      doCongratsDialogClose() {
        this.$refs.congratsDialog.close();
      },
      doGoToProjectSelection() {
        this.$refs.congratsDialog.close();
        this.$router.push({ name: 'project-selections' });
      },
    },
    mounted() {
      if (!this.solutioneering101Quiz.complete) {
        this.isWelcomeOpen = true;
      } else if (this.$route.params.showDialog && this.$route.params.showDialog === 'solutioneerCongrats') {
        this.$refs.congratsDialog.open();
      }
    },
  };
</script>

<style lang="scss">
  #project-selections {
    margin-left: 20px;
  }

  #congrats-dialog .md-dialog {
    max-width: 500px;

    p {
      margin-top: 14px;
    }
  }
</style>