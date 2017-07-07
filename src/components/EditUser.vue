<template>
  <md-dialog ref="editUser" :md-esc-to-close="false" :md-click-outside-to-close="false">
    <form @submit.prevent="doSaveUser" v-if="user">
      <md-dialog-title>Edit user {{user.username}}</md-dialog-title>

      <md-dialog-content>
        <md-layout md-gutter="16">
          <md-layout md-flex="50">

            <md-input-container>
              <label>Email</label>
              <md-input disabled v-model="tempUser.user.email"></md-input>
            </md-input-container>
            <md-input-container>
              <label>First Name</label>
              <md-input disabled v-model="tempUser.user.firstName"></md-input>
            </md-input-container>
            <md-input-container>
              <label>Last Name</label>
              <md-input disabled v-model="tempUser.user.lastName"></md-input>
            </md-input-container>

            <!-- onboarding info -->
            <div class="md-chips">
              <md-chip v-if="tempUser.user.commitmentAgreementSigned">Agreement Signed</md-chip>
              <md-chip v-if="tempUser.user.ndaSigned">Confidentiality Signed</md-chip>
              <md-chip v-if="tempUser.user.solutioneer101Passed">Solutioneering 101 Passed</md-chip>
            </div>
            <!-- <md-chip>Projects Selected</md-chip> -->

          </md-layout>
          <md-layout>

            <md-input-container>
              <label>Chapter</label>
              <md-input v-model="tempUser.chapter"></md-input>
            </md-input-container>
            <md-input-container>
              <label>Position</label>
              <md-input v-model="tempUser.position"></md-input>
            </md-input-container>
            <md-input-container>
              <label>Semester Joined</label>
              <md-input v-model="tempUser.semesterJoined"></md-input>
            </md-input-container>

          </md-layout>
        </md-layout>

        <p style="color: red;" v-if="alert.length">
          <md-icon>error_output</md-icon>
          {{ alert }}
        </p>
      </md-dialog-content>

      <md-dialog-actions>
        <md-button type="reset" @click.native.prevent="$emit('close')">Cancel</md-button>
        <md-button class="md-raised md-primary" type="submit" :disabled="savePending">Save Changes</md-button>
      </md-dialog-actions>
    </form>
  </md-dialog>
</template>

<script>
  import { update as updateMember } from '../services/members';

  export default {
    name: 'edit-user',
    data: () => ({
      tempUser: {},
      alert: '',
      savePending: false,
    }),
    props: {
      isOpen: false,
      user: Object,
    },
    methods: {
      closeDialog() {
        this.$refs.editUser.close();
      },
      openDialog() {
        this.$refs.editUser.open();
      },
      doSaveUser() {
        this.savePending = true;
        return updateMember(this.user.id, this.tempUser)
        .then(() => {
          this.savePending = false;
          this.$emit('close');
        })
        .catch((err) => {
          this.savePending = false;
          this.alert = err.message || 'Save failed :(';
        });
      },
    },
    watch: {
      isOpen(val) {
        if (val) this.openDialog();
        else this.closeDialog();
      },
      user(userObj) {
        this.tempUser = { ...userObj };
      },
    },
    mounted() {
      if (this.isOpen) this.openDialog();
    },
  };
</script>
