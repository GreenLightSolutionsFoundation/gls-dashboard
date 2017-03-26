<template>
  <div>
    <h1 class="md-title">Commitment Agreement</h1>
    <p>Welcome to GreenLight Solutions!</p>
    <p>By following this Commitment Agreement, GreenLight hopes to create an experience that is beneficial, productive, and enjoyable for all involved that promotes the study and practice of cooperative sustainability research and application.  In our collaboration, GreenLight Solutioneers shall strive to be involved, committed, honest, respectful, enthusiastic, adaptable, and supportive of each other and our ideas.  Solutioneers shall be professional and respectful in communicating and promoting each other, ourselves, peers, mentors, stakeholders, and the field of sustainability science. Failure to meet the agreements below may be terms for removal from your GreenLight Solutions chapter as determined by your Leadership Team and Faculty Advisor.</p>
    <p><strong>As a GreenLight Solutioneer I agree to:</strong></p>
    <ul>
        <li>support and uphold our shared mission, values, and purpose</li>
        <li>always display professionalism while representing GreenLight Solutions</li>
        <li>be on-time and prepared for all scheduled meetings and engagements</li>
        <li>maintain a coherent and organized file structure in our Google Drive folder(s)</li>
        <li>properly represent and follow the GreenLight Brand Guidelines at all official functions</li>
        <li>always show respect for myself, my team, Project Partners, and others</li>
        <li>communicate effectively with my project team and fellow Solutioneers</li>
        <li>meet with my project team at least once a week</li>
        <li>complete all project-related tasks within agreed timeframe</li>
        <li>respond to important messages within a 48-hour window</li>
        <li>read, understand, and sign the Confidentiality Policy</li>
        <li>work my hardest to strengthen our organization’s integrity and help us grow sustainably!</li>
    </ul>
    <p>GreenLight Solutions provides a fun and unique way to grow yourself personally and professionally.  Just like with anything in life, the opportunity is what you make of it! Get involved, get activated, and do your very best to create sustainable solutions for your local community! By signing your name below, you are committing to the agreements herein and agree to join our movement of advancing sustainable business model evolution.</p>

    <form novalidate @submit.stop.prevent="submit">
      <md-layout md-gutter="40">
        <md-layout md-flex="60" md-flex-xsmall="100">
          <md-input-container>
            <label>Full Name</label>
            <md-input></md-input>
          </md-input-container>
        </md-layout>
        <md-layout>
          <md-input-container>
            <label>Date</label>
            <md-input type="date"></md-input>
          </md-input-container>
        </md-layout>
      </md-layout>
      <md-layout md-align="end">
        <md-button class="md-raised md-primary" @click.native.prevent="doContinue">Continue</md-button>
      </md-layout>
    </form>
  </div>
</template>

<script>
  export default {
    name: 'confidentiality-agreement',
    methods: {
      doContinue() {
        this.$router.push({ name: 'solutioneering-101' });
      },
    },
  };
</script>