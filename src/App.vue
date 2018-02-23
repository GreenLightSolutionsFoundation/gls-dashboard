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
import 'vue-material/dist/vue-material.css';
import primaryNav from './components/layout/Navigation-Primary.vue';

export default {
  name: 'app',
  components: {
    primaryNav,
  },
};</script>

<style lang="scss">
@import './styles/main.scss';
</style>
