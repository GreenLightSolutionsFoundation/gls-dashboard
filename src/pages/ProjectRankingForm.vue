<template>
  <div class="max-width">
    <h1 class="md-title">Project Selection</h1>
    <p>Review the projects below and submit your top 3 selections.</p>

    <md-layout v-if="projects" class="project-cards">
      <md-layout
        v-for="project in projects"
        :key="project.projectId"
        md-flex-xsmall="100"
        md-flex="50">
        <project-card :project="project" @rank-selected="rankSelected"></project-card>
      </md-layout>
    </md-layout>

    <md-card v-else class="md-warn">
      <md-card-header>
        <div class="md-title">Status : {{error.status}}</div>
        <div class="md-subhead">Status Text : "{{error.statusText}}"</div>
      </md-card-header>

      <md-card-content>
        {{projects.data}}
      </md-card-content>
    </md-card>

    <md-layout md-align="end">
      <form-error v-if="errorMessage">{{ errorMessage }}</form-error>
    </md-layout>
    <md-layout md-align="end">
      <md-button class="md-raised md-primary project-selection-submit-button" @click.native.prevent="doSubmit">Submit Project Selections</md-button>
    </md-layout>
  </div>
</template>

<script>
  import ProjectCard from '../components/ProjectCard.vue';
  import { getAll, submitSelectedProjects } from '../services/project_selection';
  import FormError from '../components/FormError.vue';

  export default {
    name: 'project-ranking-form',
    components: { ProjectCard, FormError },
    data() {
      return {
        projects: [null, null, null],
        selectedRank1ProjectId: 0,
        selectedRank2ProjectId: 0,
        selectedRank3ProjectId: 0,
        errorMessage: '',
      };
    },
    methods: {
      rankSelected({ selectedRank, projectId }) {
        // Track the ID of the project that was selected for the selected rank
        if (selectedRank === 1) {
          this.selectedRank1ProjectId = projectId;
        } else if (selectedRank === 2) {
          this.selectedRank2ProjectId = projectId;
        } else if (selectedRank === 3) {
          this.selectedRank3ProjectId = projectId;
        }

        // Update all the projects to make sure that only one project has the selected rank
        this.projects.forEach((project) => {
          const rankProperty = `isRank${selectedRank}Selected`;
          if (project.projectId === projectId) {
            project[rankProperty] = true; // eslint-disable-line no-param-reassign
          } else {
            project[rankProperty] = false; // eslint-disable-line no-param-reassign
          }
        });
      },
      doSubmit() {
        if (
          this.selectedRank1ProjectId === 0 ||
          this.selectedRank2ProjectId === 0 ||
          this.selectedRank3ProjectId === 0) {
          this.errorMessage = 'Please select 3 projects.';
        }

        // TODO: Persist selected projects
        const selectedProjectIds = [
          this.selectedRank1ProjectId,
          this.selectedRank2ProjectId,
          this.selectedRank3ProjectId,
        ];
        submitSelectedProjects(selectedProjectIds);
      },
    },
    created() {
      this.error = null;
      getAll().then(
        (data) => {
          // Attach a few properties to track and set the selected rank of for each project
          data.forEach((project) => {
            const projectOptions = {
              isRank1Selected: false,
              isRank2Selected: false,
              isRank3Selected: false,
            };
            Object.assign(project, projectOptions);
          });

          this.projects = data;
        },
      ).catch(
        (error) => {
          this.error = error;
          // this.projects = null;
        },
      );
    },
  };
</script>

<style scoped lang="scss">
  .project-cards {
    margin-top: 40px;
  }
</style>
