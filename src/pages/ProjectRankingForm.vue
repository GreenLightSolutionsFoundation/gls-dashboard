<template>
  <div>
    <h1 class="md-title">Pick your Project!</h1>
    <project-card project-name="Build Us Hope" partner-name="Singleton Community Services, INC" logo="https://placehold.it/70x70?text=logo" open-positions="4" total-positions="10" project-start-date="2107-11-11" project-end-date="2108-11-11" project-description="description"></project-card>
  </div>
</template>

<script>
  import ProjectCard from '../components/ProjectCard.vue';
  
  export default {
    name: 'project-ranking-form',
    components: {ProjectCard}
  };
</script>
