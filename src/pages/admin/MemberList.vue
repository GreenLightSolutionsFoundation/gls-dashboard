<template>
  <div>
    <!-- add user dialog -->
    <add-user :is-open="showAddUser" @close="closeAddUser" @create="closeAddAndRefresh"></add-user>
    <edit-user :is-open="showEditUser" :user="selectedUser" @close="closeEditUser"></edit-user>
    <md-table v-model="members">
      <md-table-toolbar>
        <h1 class="md-title">Members</h1>
      </md-table-toolbar>

      <md-table-row slot="md-table-row" slot-scope="{ item }">
        <md-table-cell md-label="Active">
          <md-icon v-if="item.currentlyActive" @click.native="deactivate(item)">check_box</md-icon>
          <md-icon v-if="!item.currentlyActive" @click.native="activate(item)">check_box_outline_blank</md-icon>
        </md-table-cell>
        <md-table-cell md-label="Full Name" md-sort-by="fullname">{{ item.fullName }}</md-table-cell>
        <md-table-cell md-label="Email" md-sort-by="email">{{ item.user.email }}</md-table-cell>
        <md-table-cell md-label="Onboarded">
          <md-icon v-if="item.isOnboarded">star</md-icon>
        </md-table-cell>
        <md-table-cell md-label="Chapter" md-sort-by="chapter">{{ item.chapter.attributes.name }}</md-table-cell>
        <md-table-cell md-label="Position" md-sort-by="position">{{ item.position }}</md-table-cell>
        <md-table-cell md-label="Semester Joined" md-sort-by="semesterJoined">{{ item.semesterJoined }}</md-table-cell>
      </md-table-row>
    </md-table>
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
};</script>
