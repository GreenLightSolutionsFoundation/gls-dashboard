<template>
  <div class="max-width">
    <h1 class="md-title">Project Selection</h1>
    <p>Review the projects below and submit your top 3 selections.</p>

    <md-layout v-if="projects" class="project-cards">
      <md-layout
        v-for="project in projects"
        :key="project.projectId"
        md-flex-xsmall="100"
        md-flex="50">
        <project-card :project="project" v-on:rank-selected="rankSelected"></project-card>
      </md-layout>
    </md-layout>

    <md-card v-else class="md-warn">
      <md-card-header>
        <div class="md-title">Status : {{error.status}}</div>
        <div class="md-subhead">Status Text : "{{error.statusText}}"</div>
      </md-card-header>

      <md-card-content>
        {{projects.data}}
      </md-card-content>
    </md-card>

    <md-layout md-align="end">
      <md-button class="md-raised md-primary project-selection-submit-button">Submit Project Selections</md-button>
    </md-layout>
  </div>
</template>

<script>
  import ProjectCard from '../components/ProjectCard.vue';
  import { getAll } from '../services/projects';

  export default {
    name: 'project-ranking-form',
    components: { ProjectCard },
    props: {
      
    },
    data() {
      return {
        selectedRank1ProjectId: 0,
        selectedRank2ProjectId: 0,
        selectedRank3ProjectId: 0,
        projects: [
          {
            projectId: 1,
            projectName: 'Build Us Hope',
            partnerName: 'Singleton Community Services, INC.',
            logo: 'http://buildushope.com/uploads/3/4/9/7/34974251/1466964601.png',
            projectDescription: 'Design and build an affordable and sustainable tiny home community.',
            openPositions: 5,
            totalPositions: 10,
            projectStartDate: new Date(2017, 8, 15),
            projectEndDate: new Date(2017, 12, 14),
            isRank1Selected: false,
            isRank2Selected: false,
            isRank3Selected: false,
          },
          {
            projectId: 2,
            projectName: 'Shaw Montessori Project',
            partnerName: 'Augustus H. Shaw Jr. Elementary School',
            logo: 'http://shaw.phxschools.org/common/phxschools/images/district_school_logo.png',
            projectDescription: `This project is focused on the development of a comprehensive
                plan for a sustainable permeable paver system as well as acquiring funding for implementation.`,
            openPositions: 5,
            totalPositions: 10,
            projectStartDate: new Date(2017, 8, 15),
            projectEndDate: new Date(2017, 12, 14),
            isRank1Selected: false,
            isRank2Selected: false,
            isRank3Selected: false,
          },
          {
            projectId: 3,
            projectName: 'Build Us Hope',
            partnerName: 'Singleton Community Services, INC.',
            logo: 'http://buildushope.com/uploads/3/4/9/7/34974251/1466964601.png',
            projectDescription: 'Design and build an affordable and sustainable tiny home community.',
            openPositions: 5,
            totalPositions: 10,
            projectStartDate: new Date(2017, 8, 15),
            projectEndDate: new Date(2017, 12, 14),
            isRank1Selected: false,
            isRank2Selected: false,
            isRank3Selected: false,
          },
          {
            projectId: 4,
            projectName: 'Shaw Montessori Project',
            partnerName: 'Augustus H. Shaw Jr. Elementary School',
            logo: 'http://shaw.phxschools.org/common/phxschools/images/district_school_logo.png',
            projectDescription: `This project is focused on the development of a comprehensive
                plan for a sustainable permeable paver system as well as acquiring funding for implementation.`,
            openPositions: 5,
            totalPositions: 10,
            projectStartDate: new Date(2017, 8, 15),
            projectEndDate: new Date(2017, 12, 14),
            isRank1Selected: false,
            isRank2Selected: false,
            isRank3Selected: false,
          },
          {
            projectId: 5,
            projectName: 'Build Us Hope',
            partnerName: 'Singleton Community Services, INC.',
            logo: 'http://buildushope.com/uploads/3/4/9/7/34974251/1466964601.png',
            projectDescription: 'Design and build an affordable and sustainable tiny home community.',
            openPositions: 5,
            totalPositions: 10,
            projectStartDate: new Date(2017, 8, 15),
            projectEndDate: new Date(2017, 12, 14),
            isRank1Selected: false,
            isRank2Selected: false,
            isRank3Selected: false,
          },
        ],
      };
    },
    methods: {
      rankSelected(event) {
        // Track the ID of the project that was selected for the selected rank
        if (event.selectedRank === 1) {
          this.selectedRank1ProjectId = event.projectId;
        } else if (event.selectedRank === 2) {
          this.selectedRank2ProjectId = event.projectId;
        } else if (event.selectedRank === 3) {
          this.selectedRank3ProjectId = event.projectId;
        }

        // Update all the projects to make sure that only one project has the selected rank
        this.projects.forEach((project) => {
          const rankProperty = 'isRank' + event.selectedRank + 'Selected';
          if (project.projectId === event.projectId) {
            project[rankProperty] = true;
          } else {
            project[rankProperty] = false;
          }
        });
      },
    }

    // created() {
    //   this.error = null;
    //   getAll().then(
    //     (data) => {
    //       this.projects = data;
    //     },
    //   ).catch(
    //     (error) => {
    //       this.error = error;
    //       // this.projects = null;
    //     },
    //   );
    // },
  };
</script>

<style scoped lang="scss">
  .project-cards {
    margin-top: 40px;
  }
</style>
