<template>
  <div class="md-layout project-summary-container">
    <div class="md-layout-item">
      <div class="md-title">{{project.name}}</div>
      <div class="md-subheader" v-if="project.partnerOrganization">{{project.partnerOrganization.name}}</div>
    </div>
    <div class="md-layout-item" v-if="project.partnerOrganization && project.partnerOrganization.logo">
      <img :src="project.partnerOrganization.logo" :alt="project.partnerOrganization.name" />
    </div>
  </div>
</template>

<script>
export default {
  name: "project-summary",
  props: {
    project: Object
  }
};
</script>

<style lang="scss">
.project-summary-container {
  margin-bottom: 20px;

  .md-subheader {
    padding-top: 5px;
    padding-left: 0;
    padding-right: 0;
    min-height: auto;
    align-items: top;
  }
}
</style>
