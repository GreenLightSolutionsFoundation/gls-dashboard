<template>
  <div>
    <md-table v-once>
      <md-table-header>
        <md-table-row>
          <md-table-head v-for="(column, index) in columns" :key="index">{{column.name}}</md-table-head>
        </md-table-row>
      </md-table-header>
  
      <md-table-body>
        <md-table-row v-for="(project, index) in projects" :key="index">
          <md-table-cell>{{project.name}}</md-table-cell>
          <md-table-cell>{{project.startDate}}</md-table-cell>
          <md-table-cell>{{project.endDate}}</md-table-cell>
          <md-table-cell>{{project.totalPositions}}</md-table-cell>
          <md-table-cell>{{project.description}}</md-table-cell>
        </md-table-row>
      </md-table-body>
    </md-table>
  </div>
</template>
<script>
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      projects: {},
      columns: [],
    };
  },
  methods: {
    ...mapActions('admin/projects', ['getProjects']),
    getColumns: () => {
      const columns = [{ name: 'test1' }, { name: 'test2' }, { name: 'test3' }, { name: 'test4' }, { name: 'test5' }];
      return columns;
    },
  },
  created() {
    this.projects = this.getProjects();
    this.columns = this.getColumns();
  },
  computed: {
    updateColumns: function(){
      return this.projects._result;
    }
  },
};
</script>
<style lang="scss">

</style>
