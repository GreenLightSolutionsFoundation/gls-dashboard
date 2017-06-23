<template>
  <md-table>
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
    <md-table :md-sort="sortField" :md-sort-type="sortOrder" @sort="onSort">
      <md-table-header>
        <md-table-row>
        <!-- TODO: add sorting -->
          <!-- <md-table-head md-sort-by="active">Active</md-table-head> -->
          <md-table-head md-sort-by="currentlyActive">Active</md-table-head>
          <md-table-head md-sort-by="lastName">Contact</md-table-head>
          <md-table-head md-sort-by="isOnboarded">Onboarded</md-table-head>
          <md-table-head md-sort-by="chapter">Chapter</md-table-head>
          <md-table-head>Role</md-table-head>
          <md-table-head md-sort-by="createdAt">Started</md-table-head>
        </md-table-row>
      </md-table-header>

      <md-table-body v-if="!totalMembers">
        <md-table-row>
          <td class="md-table-cell" colspan="7">No Members to found</td>
        </md-table-row>
      </md-table-body>

      <md-table-body v-if="totalMembers > 0">
        <md-table-row v-for="member in pageMembers" :key="member.id">
          <md-table-cell>
            <md-icon v-if="member.currentlyActive" @click.native="deactivate(member)">check_box</md-icon>
            <md-icon v-if="!member.currentlyActive" @click.native="activate(member)">check_box_outline_blank</md-icon>
          </md-table-cell>
          <md-table-cell>
            <div>{{ member.fullName }}</div>
            <div>{{ member.email }}</div>
            <div>{{ member.username }}</div>
          </md-table-cell>
          <md-table-cell>
            <md-icon v-if="member.isOnboarded">star</md-icon>
          </md-table-cell>
          <md-table-cell>{{ member.chapter }}</md-table-cell>
          <md-table-cell>{{ member.position }}</md-table-cell>
          <md-table-cell>{{ member.semesterJoined }}</md-table-cell>
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
      <div>Page {{ currentPage}} of {{ totalPages }} ({{ totalMembers }} members)</div>
      <md-button class="md-icon-button md-raised" @click.native="nextPage">
        <md-icon>arrow_forward</md-icon>
      </md-button>
    </div>
  </md-table>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import sortArray from 'sort-array';

export default {
  name: 'admin-member-list-page',
  data() {
    return {
      perPage: 20,
      currentPage: 1,
      sortField: 'lastName',
      sortOrder: 'asc',
    };
  },
  created() {
    // fetch member lost on creation
    this.getMembers();
  },
  computed: {
    ...mapState('admin/members', {
      members(state) {
        const sortedMembers = sortArray([...state.members], this.sortField);
        return (this.sortOrder === 'asc') ? sortedMembers : sortedMembers.reverse();
      },
    }),
    totalPages() {
      return Math.max(1, Math.ceil(this.members.length / this.perPage));
    },
    totalMembers() {
      return this.members.length;
    },
    pageMembers() {
      // make sure we never go beyond the last page
      if (this.totalPages && this.currentPage > this.totalPages) this.currentPage = this.totalPages;

      const start = (this.currentPage - 1) * this.perPage;
      const end = start + this.perPage;

      return this.members.slice(start, end);
    },
  },
  methods: {
    ...mapActions('admin/members', ['getMembers', 'setActive']),
    activate(member) {
      this.setActive({ member, active: true });
    },
    deactivate(member) {
      this.setActive({ member, active: false });
    },
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
      this.sortField = name;
      this.sortOrder = type;
    },
  },
};
</script>

<style scoped>
  .pagination {
    display: flex;
    padding: 6px;
  }
</style>