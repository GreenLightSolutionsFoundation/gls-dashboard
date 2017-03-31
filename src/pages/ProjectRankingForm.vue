<template>
  <div>
    <h1 class="md-title">Pick your Project!</h1>
    <div class="project-ranking-forms">
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
        this.data.projects = data;
      });
    }
  };
</script>

<style scoped lang="scss">
  .project-ranking-forms {
    text-align: center;
  }
</style>