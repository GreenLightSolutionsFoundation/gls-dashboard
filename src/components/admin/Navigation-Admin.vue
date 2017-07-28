
<template>
  <md-tabs md-centered @change="tabChange">
    <md-tab
      v-for="area in areas"
      :id="area.id"
      :md-label="area.label"
      :md-active="activeTab && activeTab.routeName === area.routeName"
      :key="area.id"
    />
  </md-tabs>
</template>
<script>
  export default {
    name: 'Navigation-Admin',
    data: () => ({
      firstLoad: true,
      activeTab: null,
      areas: [
        { routeName: 'admin-members', id: 'Members', label: 'Members' },
        { routeName: 'admin-projects', id: 'Projects', label: 'Projects' },
        //{ routeName: 'admin-chapters', id: 'Chapters', label: 'Chapters' },
        //{ routeName: 'admin-organizations',
            //id: 'PartnerOrganizations',
            //label: 'Partner Organizations'
        //},
      ],
    }),
    created() {
      // track the active tab so we can set it correctly, because vue-material is broken
      this.activeTab = this.areas.find(area => area.routeName === this.$route.name);
    },
    methods: {
      tabChange(index) {
        // ignore the first tab change, which happens on tabs mount, because vue-material is broken
        if (!this.firstLoad) {
          const selectedArea = this.areas[index];

          if (!selectedArea || !this.activeTab) return;

          if (selectedArea.routeName !== this.activeTab.routeName) {
            this.activeTab = selectedArea;
            this.$router.push({ name: selectedArea.routeName });
          }
        }

        this.firstLoad = false;
      },
    },
  };
</script>

<style lang="sass">

</style>

