<template>
  <div>
    <h1>Approval pending</h1>
    <p>
      Your account is pending approval. You won't be able to use your account
      until you've been approved.
    </p>
    <p>
      <a href="#" @click.prevent="doLogout">Return to login page</a>
    </p>
  </div>
</template>

<script >
import { mapActions } from 'vuex';

export default {
  name: 'approval-pending-page',
  methods: {
    doLogout() {
      this.logout().then(() => {
        this.$router.push({ name: 'login' });
      });
    },
    ...mapActions('authentication', ['logout']),
  },
};</script>
