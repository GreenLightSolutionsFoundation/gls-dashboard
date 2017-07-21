<template>
  <div id="app">
    <primaryNav></primaryNav>

    <!-- Page content -->
    <div class="page-content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import primaryNav from './components/layout/Navigation-Primary.vue';

export default {
  name: 'app',
  components: {
    primaryNav,
  },
};
</script>

<style lang="scss">
  @import './styles/main.scss';

  .max-width {
    max-width: 800px;
    margin-left: auto;
    margin-right: auto;
    margin-top: 40px;
    margin-bottom: 40px;
    padding-left: 20px;
    padding-right: 20px;
    padding-bottom: 20px;
  }

  #welcome-dialog .md-dialog {
    max-width: 500px;

    ol:not(.md-list)>li+li {
      margin-top: 8px;
    }
  }
</style>
