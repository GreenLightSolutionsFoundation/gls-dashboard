<template>
  <div>
    <md-layout md-column>
      <form @submit.prevent="refreshProjects">
        <md-toolbar class="md-transparent">
          <md-input-container>
            <md-layout md-flex="50">
              <md-layout md-flex="75">
                <h2 class="md-title">Projects</h2>
              </md-layout>
              <md-layout md-flex="25">
                <md-button class="md-icon-button">
                  <md-icon>assignment</md-icon>
                </md-button>
              </md-layout>
            </md-layout>
            <md-layout md-flex="50">
              <md-layout md-flex="25">
                <md-button class="md-icon-button">
                  <md-icon>search</md-icon>
                </md-button>
              </md-layout>
              <md-layout md-flex="75">
                <md-input placeholder="search"></md-input>
              </md-layout>
            </md-layout>
          </md-input-container>
        </md-toolbar>
      </form>
      <md-table v-once>
        <md-table-header>
          <md-table-row>
            <md-table-head v-for="(column, index) in columns" :key="index">{{column.name}}</md-table-head>
            <md-table-head></md-table-head>
          </md-table-row>
        </md-table-header>
  
        <md-table-body>
          <md-table-row v-for="project in projects" :key="project.objectId">
            <md-table-cell>{{project.name}}</md-table-cell>
            <md-table-cell>{{project.description}}</md-table-cell>
            <md-table-cell>{{project.startDate | formatDate }}</md-table-cell>
            <md-table-cell>{{ project.endDate | formatDate }}</md-table-cell>
            <md-table-cell>{{project.totalPositions}}</md-table-cell>
            <md-table-cell>
              <md-icon>edit</md-icon>
            </md-table-cell>
          </md-table-row>
        </md-table-body>
      </md-table>
    </md-layout>
  </div>
</template>
<script>
import { mapActions, mapState } from 'vuex';
import moment from 'moment';

export default {
  data: () => ({
    columns: [],
    userCount: 0,
  }),
  methods: {
    ...mapActions('admin/projects', ['getProjects']),
    getColumns: () => {
      const columns = [{ name: 'Name' }, { name: 'Description' }, { name: 'Start Date' }, { name: 'End Date' }, { name: 'Total Positions' }];
      return columns;
    },
  },
  created() {
    this.getProjects();
    this.columns = this.getColumns();
  },
  computed: {
    ...mapState('admin/projects', ['projects']),
  },
  filters: {
    formatDate: (value) => {
      if (!value) {
        return '';
      }
      return moment(value).format('MM/DD/YYYY');
    },
  },
};
</script>
<style lang="scss">

</style>
