<template>
  <div>
    <h1 class="md-title">Pick your Project!</h1>
    <div class="project-ranking-forms" v-if="Array.isArray(projects)">
      <project-card
        v-for="p in projects"
        project-name="p.projectName" 
        partner-name="p.partnerName" 
        logo="p.logo" 
        project-description="p.projectDescription"
        open-positions="p.openPositions" 
        total-positions="p.totalPositions"
        project-start-date="p.projectStartDate"
        project-end-date="p.projectEndDate">
      </project-card>
    </div>
    <md-card v-else class="md-warn">
      <md-card-header>
        <div class="md-title">Status : {{projects.status}}</div>
        <div class="md-subhead">Status Text : "{{projects.statusText}}"</div>
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
    
    components: {ProjectCard},
    
    data() {
      return {
        projects: []
      }
    },
    
    created() {
      getAll().then(data => {
        console.log('projects', data);
        this.projects = data;
      }).catch((error) => {
        console.error(error);
        this.projects = error;
      });
    }
  };
</script>

<style scoped lang="scss">
  .project-ranking-forms {
    text-align: center;
  }
</style>