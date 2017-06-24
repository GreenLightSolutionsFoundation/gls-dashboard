<template>
  <div>
    <PrimaryNavigation></PrimaryNavigation>
    <AdminNavigation></AdminNavigation>
  </div>
</template>

<script>
import PrimaryNavigation from '../../components/layout/Navigation-Primary.vue';
import AdminNavigation from '../../components/admin/Navigation-Admin.vue';
export default {
  name: 'admin',
  components: {
      AdminNavigation,
      PrimaryNavigation
  }
}
</script>

