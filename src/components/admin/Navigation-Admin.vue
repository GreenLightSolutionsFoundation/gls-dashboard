
<template>
  <md-tabs md-centered @change="tabChange">
    <md-tab :id="area.id" :md-label="area.label" v-for="area in areas" :key="area.id"></md-tab>
  </md-tabs>
</template>
<script>
export default {
  name: 'Navigation-Admin',
  methods: {
    isPath(path) {
      return this.$route.name === path;
    },
    tabChange(index) {
      const active = this.areas[index].route;
      if (!this.isPath(active)) {
        this.$router.push({ name: active });
      }
    },
  },
  data() {
    return {
      areas: [
        { route: 'admin-members', id: 'Members', label: 'Members' },
        { route: 'admin-projects', id: 'Projects', label: 'Projects' },
        { route: 'admin-chapters', id: 'Chapters', label: 'Chapters' },
        { route: 'admin-partnerorganizations', id: 'PartnerOrganizations', label: 'Partner Organizations' },
      ],
    };
  },
};
</script>

<style lang="sass">

</style>

