<template>
  <md-table-card>
    <md-toolbar class="md-transparent">
      <md-input-container>
        <h2 class="md-title" style="flex: 1">Members</h2>
        <md-button class="md-icon-button">
          <md-icon>search</md-icon>
        </md-button>
        <md-input placeholder="search" class></md-input>
      </md-input-container>
    </md-toolbar>

    <!-- TODO: add sorting -->
    <!-- <md-table md-sort="name" @sort="onSort"> -->
    <md-table>
      <md-table-header>
        <md-table-row>
        <!-- TODO: add sorting -->
          <!-- <md-table-head md-sort-by="active">Active</md-table-head> -->
          <md-table-head>Active</md-table-head>
          <md-table-head>Name</md-table-head>
          <md-table-head>Email</md-table-head>
          <md-table-head>Role</md-table-head>
          <md-table-head>Chapter</md-table-head>
          <md-table-head>Started</md-table-head>
          <md-table-head>Onboarded??</md-table-head>
        </md-table-row>
      </md-table-header>
      <md-table-body>
        <md-table-row v-for="member in pageMembers" :key="member.id">
          <md-table-cell>{{ member.currentlyActive }}</md-table-cell>
          <md-table-cell>{{ member.fullName }}</md-table-cell>
          <md-table-cell>{{ member.email }}</md-table-cell>
          <md-table-cell>{{ member.position }}</md-table-cell>
          <md-table-cell>{{ member.chapter }}</md-table-cell>
          <md-table-cell>{{ member.semesterStarted }}</md-table-cell>
          <md-table-cell>{{ member.onboarded }}</md-table-cell>
        </md-table-row>
        <md-table-row v-if="pageMembers.length < perPage" v-for="num in (perPage - pageMembers.length)" :key="'_empty'+num">
          <md-table-cell></md-table-cell>
          <md-table-cell></md-table-cell>
          <md-table-cell></md-table-cell>
          <md-table-cell></md-table-cell>
          <md-table-cell></md-table-cell>
          <md-table-cell></md-table-cell>
          <md-table-cell></md-table-cell>
        </md-table-row>
      </md-table-body>
    </md-table>

    <div class="pagination">
      <md-button class="md-icon-button md-raised" @click.native="prevPage">
        <md-icon>arrow_back</md-icon>
      </md-button>
      <div>Page {{ currentPage}} of {{ totalPages }}</div>
      <md-button class="md-icon-button md-raised" @click.native="nextPage">
        <md-icon>arrow_forward</md-icon>
      </md-button>
    </div>
  </md-table-card>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'admin-member-list-page',
  data() {
    return {
      perPage: 20,
      currentPage: 1,
    };
  },
  created() {
    this.getMembers();
  },
  computed: {
    totalPages() {
      return Math.ceil(this.members.length / this.perPage);
    },
    totalMembers() {
      return this.members.length
    },
    pageMembers() {
      // make sure we never go beyond the last page
      if (this.totalPages && this.currentPage > this.totalPages) this.currentPage = this.totalPages;

      const start = (this.currentPage - 1) * this.perPage;
      const end = start + this.perPage;

      return this.members.slice(start, end);
    },
    ...mapState('admin/members', ['members']),
  },
  methods: {
    nextPage() {
      this.currentPage = Math.min(this.totalPages, this.currentPage + 1);
    },
    prevPage() {
      this.currentPage = Math.max(1, this.currentPage - 1);
    },
    onPagination({ page, size }) {
      this.perPage = size;
      this.currentPage = page;
    },
    onSort({ name, type }) {
      console.log({ name, type });
    },
    ...mapActions('admin/members', ['getMembers']),
  },
};
</script>

<style>
  .pagination {
    display: flex;
    padding: 6px;
  }
</style>