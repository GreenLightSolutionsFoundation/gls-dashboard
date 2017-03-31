<template>
  <md-card class="project-card">
    
    <md-card-area class="project-card-header" v-if="logo">
      <md-avatar>
        <img :src="logo" :alt="projectName">
      </md-avatar>
    </md-card-area>
    
    <md-card-area>
      <md-card-header>
        <div class="md-title">{{projectName}}</div>
        <div class="md-subhead">{{partnerName}}</div>
      </md-card-header>
    
      <md-card-content>
        <md-list class="md-dense">
          <md-list-item>{{positionsStatusMessage}}</md-list-item>
          <md-list-item>{{projectStartDate}} - {{projectEndDate}}</md-list-item>
        </md-list>
        
        <div>{{projectDescription}}</div>
      </md-card-content>
    </md-card-area>
    
    <md-card-area class="pick-option-container">
      <div class="pick-option-text">My Pick #{{rank}}</div>
      
      <div @click="handleSelect">
        <md-button-toggle md-single class="md-primary">
          <md-button class="md-icon-button" :class="{'md-toggle': rank === 1}" value="1">1</md-button>
          <md-button class="md-icon-button" :class="{'md-toggle': rank === 2}" value="2">2</md-button>
          <md-button class="md-icon-button" :class="{'md-toggle': rank === 3}" value="3">3</md-button>
        </md-button-toggle>
      </div>
    </md-card-area>
  </md-card>
</template>

<script>
  export default {
    name:'project-card',
    props: {
      projectName: String, 
      partnerName: String, 
      logo: String, 
      projectDescription: String,
      openPositions: Number, 
      totalPositions: Number,
      projectStartDate: Date,
      projectEndDate: Date
    },
    data() {
      return {
        rank: this.rank || 0
      };
    },
    computed: {
      positionsStatusMessage() {
        const {openPositions, totalPositions} = this;
        return (totalPositions - openPositions > 0) ? `${openPositions} of ${totalPositions} spots open!` : `All ${totalPositions} spots open!`;
      }
    },
    methods: {
      handleSelect(ev) {
        this.rank = parseInt(ev.target.value);
      }
    }
  };
</script>

<style lang="scss">
.project-card {
  display: inline-block;
  min-width: 250px;
  width: 33%;
  max-width: 340px;
  
  .project-card-header {
    display: flex;
    
    .md-avatar {
      margin-top: 20px;
      margin-bottom: 20px;
      width: 70px;
      height: 70px;
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
      margin-bottom:10px;
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
</style>