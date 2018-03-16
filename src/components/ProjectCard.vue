<template>
  <md-card class="project-card">

    <md-card-area class="project-card-header" v-if="project.logo">
      <img :src="project.logo" :alt="project.projectName">
    </md-card-area>

    <md-card-area>
      <md-card-header>
        <div class="md-title">{{project.projectName}}</div>
        <div class="md-subhead">{{project.partnerName}}</div>
      </md-card-header>

      <md-card-content>
        <div class="project-card-content">
          <div class="project-card-content-summary-items">
            <div class="project-card-content-summary-item">
              <md-icon>people</md-icon>
              <span
                class="project-card-content-summary-item-description"
                v-bind:style="{ color: project.openPositions !== 0 ? 'auto' : 'red' }">
                {{project.positionsStatusMessage}}
              </span>
            </div>
            <div class="project-card-content-summary-item">
              <md-icon>date_range</md-icon>
              <span class="project-card-content-summary-item-description">
                {{project.projectStartDate | formatDate}} - {{project.projectEndDate | formatDate}}
              </span>
            </div>
          </div>

          <div>{{project.projectDescription}}</div>
        </div>
      </md-card-content>
    </md-card-area>

    <md-card-area class="pick-option-container">
      <div class="pick-option-text">My Pick #</div>

      <div>
        <md-button-toggle md-single class="md-primary">
          <md-button
            class="md-icon-button"
            :class="{ 'md-toggle': projectRank === 1 }"
            :disabled="project.openPositions !== 0 ? false : true"
            @click="handleSelect(1)"
          >
            1
          </md-button>
          <md-button
            class="md-icon-button"
            :class="{ 'md-toggle': projectRank === 2 }"
            :disabled="project.openPositions !== 0 ? false : true"
            @click="handleSelect(2)"
          >
            2
          </md-button>
          <md-button
            class="md-icon-button"
            :class="{ 'md-toggle': projectRank === 3 }"
            :disabled="project.openPositions !== 0 ? false : true"
            @click="handleSelect(3)"
          >
            3
          </md-button>
        </md-button-toggle>
      </div>
    </md-card-area>
  </md-card>
</template>

<script>
import moment from 'moment';

export default {
  name: 'project-card',
  props: {
    project: {
      type: Object,
      required: true,
    },
    selectedProjects: {
      type: Array,
      required: true,
    },
  },
  computed: {
    projectRank() {
      const rank = this.selectedProjects.indexOf(this.project.id);
      return rank >= 0 ? rank + 1 : null;
    },
    positionsStatusMessage() {
      const enrolledPositions = this.totalPositions - this.openPositions;
      if (this.openPositions !== 0) {
        return `Enrolled Solutioneers: ${enrolledPositions}/${this.totalPositions}`;
      }

      return `All ${this.totalPositions} positions filled!`;
    },
  },
  methods: {
    handleSelect(rank) {
      this.$emit('rank-selected', { projectId: this.project.id, rank });
    },
  },
  filters: {
    formatDate: value => moment(value).format('M/D/YYYY'),
  },
};</script>

<style lang="scss">
.project-card {
  display: inline-block;
  min-width: 250px;
  width: 100%;
  max-width: 340px;
  margin-bottom: 40px;

  .project-card-header {
    display: flex;

    img {
      margin: 20px auto;
      max-height: 70px;
    }
  }

  .project-card-content {
    min-height: 300px;

    .project-card-content-summary-items {
      margin-bottom: 20px;

      .project-card-content-summary-item {
        margin-bottom: 5px;

        .project-card-content-summary-item-description {
          vertical-align: bottom;
          padding-left: 5px;
        }
      }
    }
  }

  .md-card-area {
    margin: 0;
  }

  .pick-option-container {
    background: #f9f9f9;
    padding-top: 15px;
    padding-bottom: 15px;

    .pick-option-text {
      text-align: center;
      margin-bottom: 10px;
    }

    .md-button-toggle {
      display: flex;
      justify-content: space-around;

      .md-icon-button {
        border-radius: 50% !important;
        border: 1px solid #cccccc;
      }
    }
  }
}

@media (max-width: 600px) {
  .project-card {
    margin-left: auto;
    margin-right: auto;
  }
}
</style>
