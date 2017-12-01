<template>
  <md-dialog ref="addUser" :md-esc-to-close="false" :md-click-outside-to-close="false">
    <form @submit.prevent="doCreateUser">
      <md-dialog-title>Create new user</md-dialog-title>

      <md-dialog-content>
        <p>Add user details below.</p>

        <!-- md-input has no blur event :() -->
        <div class="md-input-container md-theme-default md-has-value">
          <label>Email Address</label>
          <input class="md-input" v-model="email" type="email" @blur="setUsername"></input>
        </div>

        <md-input-container>
          <label>First Name</label>
          <md-input v-model="firstName"></md-input>
        </md-input-container>

        <md-input-container>
          <label>Last Name</label>
          <md-input v-model="lastName"></md-input>
        </md-input-container>

        <md-input-container>
          <label>Username</label>
          <md-input v-model="username"></md-input>
        </md-input-container>

        <md-input-container>
          <label>Password</label>
          <md-input v-model="password" disabled></md-input>
        </md-input-container>

        <md-input-container>
          <label for="selectedChapter">Chapter</label>
          <md-select name="selectedChapter" :id="selectedChapter.id" v-model="selectedChapter">
            <md-option v-for="chapter in chapters" :value="chapter.id" :key="chapter.id">{{chapter.name}}</md-option>
          </md-select>
        </md-input-container>

        <p style="color: red;" v-if="alert.length">
          <md-icon>error_output</md-icon>
          {{ alert }}
        </p>
      </md-dialog-content>

      <md-dialog-actions>
        <md-button type="reset" @click.native.prevent="$emit('close')">Cancel</md-button>
        <md-button class="md-raised md-primary" type="submit" :disabled="createPending">Create</md-button>
      </md-dialog-actions>
    </form>
  </md-dialog>
</template>

<script>
import { adminCreate as createUser } from '../services/user';
import { getAll as getAllChapters } from '../services/chapters';

const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHJKLMNPRTUVWXYZ1234567890';

export default {
  name: 'add-user',
  data: () => ({
    email: '',
    username: '',
    firstName: '',
    lastName: '',
    password: '',
    alert: '',
    createPending: false,
    selectedChapter: '',
    chapters: [],
  }),
  props: {
    isOpen: false,
  },
  methods: {
    closeDialog() {
      this.$refs.addUser.close();
    },
    openDialog() {
      this.reset();
      this.$refs.addUser.open();
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
    doCreateUser() {
      this.createPending = true;
      return createUser({
        email: this.email,
        username: this.username,
        password: this.password,
        firstName: this.firstName,
        lastName: this.lastName,
        chapter: this.selectedChapter,
      }).then(() => {
        // build in some additional delay to let parse catch up...
        const delay = 100;
        setTimeout(() => {
          this.createPending = false;
          this.$emit('create');
          this.$emit('close');
          this.reset();
        }, delay);
      }).catch((err) => {
        this.createPending = false;
        this.alert = err.message;
      });
    },
    setUsername() {
      if (!this.username.length) {
        this.username = this.email.split('@')[0].replace(/[^a-zA-Z0-9]/, '');
      }
    },
    reset() {
      this.email = '';
      this.username = '';
      this.firstName = '';
      this.lastName = '';
      this.password = this.generatePassword();
      this.chapter = {};
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
  created() {
    getAllChapters().then((results) => {
      this.chapters = results;
    });
  },
};
</script>
