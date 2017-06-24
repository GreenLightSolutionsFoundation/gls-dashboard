<template>
  <div>
    <h1 class="md-title">Pick your Project!</h1>
    <div class="project-ranking-forms" v-if="projects">
      <project-card
        v-for="project in projects"
        :key="project.projectId"
        :project="project">
      </project-card>
    </div>
    <md-card v-else class="md-warn">
      <md-card-header>
        <div class="md-title">Status : {{error.status}}</div>
        <div class="md-subhead">Status Text : "{{error.statusText}}"</div>
      </md-card-header>

      <md-card-content>
        {{projects.data}}
      </md-card-content>
    </md-card>
  </div>
</template>

<script>
  import ProjectCard from '../components/ProjectCard.vue';
  import getAll from '../services/projects';
  
  export default {
    name: 'project-ranking-form',
  
    components: { ProjectCard },
  
    data() {
      return {
        projects: [{
          projectName: 'Project Name',
          partnerName: 'Partner Name',
          logo: 'logo.png',
          projectDescription: 'description',
          openPositions: 10,
          totalPositions: 15,
          projectStartDate: new Date(),
          projectEndDate: new Date(),
        }],
      };
    },
  
    created() {
      this.error = null;
      getAll().then(
        (data) => {
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
  .project-ranking-forms {
    text-align: center;
  }
</style>
