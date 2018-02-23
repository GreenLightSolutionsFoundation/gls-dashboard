<template>
  <md-toolbar>
    <bulb class="navbar-bulb"></bulb>
    <brand class="navbar-brand"></brand>
    <md-button @click.native.prevent="navigateTo('dashboard')">Dashboard</md-button>
    <md-button v-if="isAdmin" @click.native.prevent="navigateTo('admin')">Admin</md-button>
    <md-menu md-align-trigger class="goto-right">
        <md-button md-menu-trigger>
            <span>{{ this.user.fullName }}</span>
            <md-avatar class="md-avatar-icon">
                <img :src="this.user.gravatar" alt="People">
            </md-avatar>
        </md-button>
        <md-menu-content class="solid-background">
            <md-list-item>
                <md-button @click.native.prevent="doLogout">Logout</md-button>
            </md-list-item>
        </md-menu-content>
    </md-menu>
  </md-toolbar>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex';
import bulb from './Bulb.vue';
import brand from './Brand.vue';

export default {
  name: 'Navigation-Primary',
  components: {
    bulb,
    brand,
  },
  computed: {
    ...mapGetters('authentication', ['isAdmin']),
    ...mapState('authentication', ['user']),
  },
  methods: {
    ...mapActions('authentication', ['logout']),
    navigateTo(routeName) {
      this.$router.push({ name: routeName });
    },
    doLogout() {
      this.logout().then(() => {
        this.$router.push({ name: 'login' });
      });
    },
  },
};</script>

<style lang="scss">
.navbar-bulb {
  width: 50px;
}

.navbar-brand {
  width: 110px;
}

.solid-background {
  background-color: #fdfdfd;
}

.goto-right {
  margin-left: auto;
}
</style>
