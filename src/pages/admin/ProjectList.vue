<template>
  <div>
    <md-table v-once>
      <md-table-header>
        <md-table-row>
          <md-table-head>Dessert (100g serving)</md-table-head>
          <md-table-head md-numeric>Calories (g)</md-table-head>
          <md-table-head md-numeric>Fat (g)</md-table-head>
          <md-table-head md-numeric>Carbs (g)</md-table-head>
          <md-table-head md-numeric>Protein (g)</md-table-head>
        </md-table-row>
      </md-table-header>
  
      <md-table-body>
        <md-table-row v-for="(row, index) in 5" :key="index">
          <md-table-cell>Dessert Name</md-table-cell>
          <md-table-cell v-for="(col, index) in 4" :key="index" md-numeric>10</md-table-cell>
        </md-table-row>
      </md-table-body>
    </md-table>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex';

export default {
  data() {
    return {};
  },
  methods: {
    ...mapActions('admin/projects', ['getProjects']),
    getColumns: () => {
      const columns = [];
      return columns;
    },
  },
  created() {
    debugger;
    this.getProjects();
  },
};
</script>
<style lang="scss">

</style>
