<template>
  <div>
    <project-summary :project="project"></project-summary>
    <hr>
    <div>
        <md-icon>group</md-icon>
        <span class="project-details-detail-label">Enrolled Solutioneers: {{project.enrolledPositions}}/{{project.totalPositions}}</span>
    </div>
    <div>
        <md-icon>date_range</md-icon>
        <span class="project-details-detail-label">{{project.startDate}} - {{project.endDate}}</span>
    </div>
    <div class="project-details-description">{{project.description}}</div>
    <div v-if="project.resourcesUrl.length > 0">
        <p>Project resources available at:</p>
        <a :href="project.resourcesUrl" target="_blank">{{project.resourcesUrl}}</a>
    </div>
  </div>
</template>

<script>
  import ProjectSummary from './ProjectSummary.vue';

  export default {
    name: 'project-details',
    components: {
      ProjectSummary,
    },
    props: {
      project: Object,
    },
  }
</script>

<style lang="scss">
  .project-details-description {
    margin: 20px 0;
  }

  .project-details-detail-label {
    padding-left: 5px;
    vertical-align: bottom;
  }
</style>