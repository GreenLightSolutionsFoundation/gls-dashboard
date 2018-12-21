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
        <project-card :project="project" :selectedProjects="selectedProjects" @rank-selected="rankSelected"></project-card>
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
      <md-button class="md-raised md-primary project-selection-submit-button" @click.native.prevent="doSubmit">
        Submit Project Selections
      </md-button>
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
      projects: [],
      selectedProjects: [null, null, null],
      errorMessage: '',
    };
  },
  computed: {
    projectIds() {
      return this.projects.map(p => p.id);
    },
  },
  methods: {
    rankSelected({ projectId, rank }) {
      // ignore invalid data
      // TODO: probably a good idea to do something when we get weird data
      if ([1, 2, 3].indexOf(rank) < 0 || this.projectIds.indexOf(projectId) < 0) return;
      const rankIndex = rank - 1;

      this.selectedProjects = this.selectedProjects.map((id, i) => {
        if (id != null && id === projectId && i !== rankIndex) return null;
        if (i === rankIndex) return projectId;
        return id;
      });
    },
    doSubmit() {
      this.errorMessage = '';
      if (!this.selectedProjects.every(projectId => projectId != null)) {
        this.errorMessage = 'Please select 3 projects.';
        return;
      }

      submitSelectedProjects(this.selectedProjects);
    },
  },
  created() {
    this.error = null;
    getAll()
      .then(data => {
        // Attach a few properties to track and set the selected rank of for each project
        data.forEach(project => {
          const projectOptions = {
            isRank1Selected: false,
            isRank2Selected: false,
            isRank3Selected: false,
          };
          Object.assign(project, projectOptions);
        });

        this.projects = data;
      })
      .catch(error => {
        this.error = error;
        // this.projects = null;
      });
  },
};
</script>

<style scoped lang="scss">
.project-cards {
  margin-top: 40px;
}
</style>
