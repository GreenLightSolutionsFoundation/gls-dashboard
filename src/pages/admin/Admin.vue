<template>
  <div>
    <AdminNavigation></AdminNavigation>
    <router-view></router-view>
  </div>
</template>

<script>
import PrimaryNavigation from '../../components/layout/Navigation-Primary.vue';
import AdminNavigation from '../../components/admin/Navigation-Admin.vue';

export default {
  components: {
    AdminNavigation,
    PrimaryNavigation,
  },
};
</script>
