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
              <label for="first-name">First Name</label>
              <md-input name="first-name" class="text-capitalize" v-model="tempUser.firstName"></md-input>
            </md-input-container>
            <md-input-container>
              <label for="last-name">Last Name</label>
              <md-input name="last-name" class="text-capitalize" v-model="tempUser.lastName"></md-input>
            </md-input-container>

            <!-- onboarding info -->
            <div class="md-chips">
              <md-chip v-if="tempUser.commitmentAgreementSigned">Agreement Signed</md-chip>
              <md-chip v-if="tempUser.ndaSigned">Confidentiality Signed</md-chip>
              <md-chip v-if="tempUser.solutioneer101Passed">Solutioneering 101 Passed</md-chip>
            </div>
            <!-- <md-chip>Projects Selected</md-chip> -->

          </md-layout>
          <md-layout>
            <md-input-container>
              <label for="selectedChapter">Chapter</label>
              <md-select name="selectedChapter.id" id="selectedChapter.id" v-model="selectedChapter.id">
                <md-option selected v-for="chapter in chapters" :value="chapter.id" :key="chapter.id">{{chapter.name}}</md-option>
              </md-select>
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
import { getAll as getAllChapters } from '../services/chapters';

export default {
  name: 'edit-user',
  data: () => ({
    tempUser: {},
    alert: '',
    savePending: false,
    chapters: [],
    selectedChapter: {},
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
      this.tempUser = userObj.toJSON();
      getAllChapters().then((results) => {
        results.forEach((element) => {
          this.chapters.push(element);
          if (element.id === this.user.chapter.id) {
            this.selectedChapter = element;
          }
        }, this);
      });
    },
  },
  mounted() {
    if (this.isOpen) this.openDialog();
  },
};
</script>
<style>
  .text-capitalize {
    text-transform: capitalize;
  }
</style>
