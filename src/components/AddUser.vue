<template>
  <md-dialog ref="addUser" :md-esc-to-close="false" :md-click-outside-to-close="false">
    <form @submit="createUser">
      <md-dialog-title>Create new user</md-dialog-title>

      <md-dialog-content>
          <p>Add user details below.</p>

          <md-input-container>
            <label>Email Address</label>
            <md-input v-model="email" type="email"></md-input>
          </md-input-container>

          <md-input-container>
            <label>Password</label>
            <md-input v-model="password" disabled></md-input>
          </md-input-container>
      </md-dialog-content>

      <md-dialog-actions>
        <md-button type="reset" @click.native.prevent="$emit('close')">Cancel</md-button>
        <md-button class="md-raised md-primary" type="submit" :disabled="createPending">Create</md-button>
      </md-dialog-actions>
    </form>
  </md-dialog>
</template>

<script>
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHJKLMNPRTUVWXYZ1234567890';

  export default {
    name: 'add-user',
    data: () => ({
      email: '',
      password: '',
      createPending: false,
    }),
    props: {
      isOpen: false,
    },
    methods: {
      closeDialog() {
        this.$refs.addUser.close();
      },
      openDialog() {
        this.$refs.addUser.open();
        this.email = '';
        this.password = this.generatePassword();
      },
      generatePassword(len = 10) {
        let str = '';

        for (let i = 0; i < len; i += 1) {
          const index = Math.floor(Math.random() * chars.length);
          const char = chars[index];
          str += char;
        }

        return str;
      },
      createUser() {
        this.createPending = true;
        setTimeout(() => {
          this.createPending = false;
          this.$emit('close');
        }, 2000);
      },
    },
    watch: {
      isOpen(val) {
        if (val) this.openDialog();
        else this.closeDialog();
      },
    },
    mounted() {
      if (this.isOpen) this.openDialog();
    },
  };
</script>
