<template>
  <div>
    <!-- add user dialog -->
    <add-user :is-open="showAddUser" @close="closeAddUser" @create="closeAddAndRefresh"></add-user>
    <edit-user :is-open="showEditUser" :user="selectedUser" @close="closeEditUser"></edit-user>

    <!-- TODO: add sorting -->
    <md-table :md-sort="filters.sortField" :md-sort-type="filters.sortOrder" @sort="onSort">
      <md-table-header>
        <md-table-row>
        <!-- TODO: add sorting -->
          <md-table-head md-sort-by="currentlyActive">Active</md-table-head>
          <md-table-head md-sort-by="lastName">Contact</md-table-head>
          <md-table-head>Onboarded</md-table-head>
          <md-table-head md-sort-by="chapter">Chapter</md-table-head>
          <md-table-head md-sort-by="position">Position</md-table-head>
          <md-table-head md-sort-by="semesterJoined">Semester</md-table-head>
        </md-table-row>
      </md-table-header>

      <md-table-body v-if="!totalMembers">
        <md-table-row>
          <td class="md-table-cell" colspan="7">No Members found</td>
        </md-table-row>
      </md-table-body>

      <md-table-body v-if="totalMembers > 0">
        <md-table-row v-for="member in pageMembers" :key="member.id">
          <md-table-cell>
            <!-- active -->
            <md-icon v-if="member.currentlyActive" @click.native="deactivate(member)">check_box</md-icon>
            <md-icon v-if="!member.currentlyActive" @click.native="activate(member)">check_box_outline_blank</md-icon>
          </md-table-cell>
          <md-table-cell>
            <!-- contact info -->
            <div>{{ member.fullName }}</div>
            <div>{{ member.user.email }}</div>
            <div>{{ member.user.username }}</div>
          </md-table-cell>
          <md-table-cell>
            <!-- onboarded -->
            <md-icon v-if="member.isOnboarded">star</md-icon>
          </md-table-cell>
          <md-table-cell v-if="member.chapter">{{ member.chapter.attributes.name }}</md-table-cell>
          <md-table-cell v-else></md-table-cell>
          <md-table-cell>{{ member.position }}</md-table-cell>
          <md-table-cell>{{ member.semesterJoined }}</md-table-cell>
          <md-table-cell>
            <md-icon @click.native="openEditUser(member)">edit</md-icon>
          </md-table-cell>
        </md-table-row>
        <md-table-row v-if="pageMembers.length < filters.perPage" v-for="num in (filters.perPage - pageMembers.length)" :key="'_empty'+num">
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
      <md-button class="md-icon-button md-raised" @click.native="prevPage" :disabled="filters.currentPage === 1">
        <md-icon>arrow_back</md-icon>
      </md-button>
      <div>Page {{ filters.currentPage}} of {{ totalPages }} ({{ totalMembers }} members)</div>
      <md-button class="md-icon-button md-raised" @click.native="nextPage" :disabled="filters.currentPage === totalPages">
        <md-icon>arrow_forward</md-icon>
      </md-button>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import AddUser from '../../components/AddUser.vue';
import EditUser from '../../components/EditUser.vue';

export default {
  name: 'admin-member-list-page',
  components: {
    AddUser,
    EditUser,
  },
  data: () => ({
    showAddUser: false,
    showEditUser: false,
    selectedUser: null,

    filters: {
      perPage: 20,
      currentPage: 1,
      sortField: 'lastName',
      sortOrder: 'asc',
    },
  }),
  created() {
    // fetch member lost on creation
    this.refreshMembers();
  },
  computed: {
    ...mapState('admin/members', ['members']),
    totalPages() {
      return Math.max(1, Math.ceil(this.members.length / this.filters.perPage));
    },
    totalMembers() {
      return this.members.length;
    },
    pageMembers() {
      // make sure we never go beyond the last page
      if (this.totalPages && this.filters.currentPage > this.totalPages) {
        this.filters.currentPage = this.totalPages;
      }

      const start = (this.filters.currentPage - 1) * this.filters.perPage;
      const end = start + this.filters.perPage;

      return this.members.slice(start, end);
    },
  },
  methods: {
    ...mapActions('admin/members', ['setActive', 'getMembers']),
    refreshMembers() {
      this.getMembers({ ...this.filters });
    },
    activate(member) {
      this.setActive({ member, active: true });
    },
    deactivate(member) {
      this.setActive({ member, active: false });
    },
    nextPage() {
      this.filters.currentPage = Math.min(this.totalPages, this.filters.currentPage + 1);
      this.refreshMembers();
    },
    prevPage() {
      this.filters.currentPage = Math.max(1, this.filters.currentPage - 1);
      this.refreshMembers();
    },
    onPagination({ page, size }) {
      this.filters.perPage = size;
      this.filters.currentPage = page;
      this.refreshMembers();
    },
    onSort({ name, type }) {
      this.filters.sortField = name;
      this.filters.sortOrder = type;
      this.refreshMembers();
    },
    openAddUser() {
      this.showAddUser = true;
    },
    closeAddUser() {
      this.showAddUser = false;
    },
    closeAddAndRefresh() {
      this.closeAddUser();
      this.refreshMembers();
    },
    openEditUser(member) {
      this.selectedUser = member;
      this.showEditUser = true;
    },
    closeEditUser() {
      this.showEditUser = false;
      this.refreshMembers();
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
