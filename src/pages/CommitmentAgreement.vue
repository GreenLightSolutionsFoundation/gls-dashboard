<template>
  <md-card class="max-width">
    <md-card-header>
      <md-card-header-text>
        <div class="md-title">Commitment Agreement</div>
      </md-card-header-text>
    </md-card-header>

    <md-card-content>
      <p>Welcome to GreenLight Solutions!</p>
      <p>By following this Commitment Agreement, GreenLight hopes to create an experience that is beneficial, productive, and enjoyable for all involved that promotes the study and practice of cooperative sustainability research and application. In our collaboration, GreenLight Solutioneers shall strive to be involved, committed, honest, respectful, enthusiastic, adaptable, and supportive of each other and our ideas. Solutioneers shall be professional and respectful in communicating and promoting each other, ourselves, peers, mentors, stakeholders, and the field of sustainability science. Failure to meet the agreements below may be terms for removal from your GreenLight Solutions chapter as determined by your Leadership Team and Faculty Advisor.</p>
      <p>
        <strong>As a GreenLight Solutioneer I agree to:</strong>
      </p>
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
      <p>GreenLight Solutions provides a fun and unique way to grow yourself personally and professionally. Just like with anything in life, the opportunity is what you make of it! Get involved, get activated, and do your very best to create sustainable solutions for your local community! By signing your name below, you are committing to the agreements herein and agree to join our movement of advancing sustainable business model evolution.</p>

      <form-error v-if="errorMessage">{{ errorMessage }}</form-error>
      <agreement-signature-form :name="commitmentAgreement.name" :date="commitmentAgreement.date" :onSubmit="doContinue" :errorMessage="errorMessage">
      </agreement-signature-form>
    </md-card-content>
  </md-card>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import AgreementSignatureForm from '../components/AgreementSignatureForm.vue';
import FormError from '../components/FormError.vue';

export default {
  name: 'confidentiality-agreement',
  components: {
    AgreementSignatureForm,
    FormError,
  },
  mounted() {
    if (this.user.commitmentAgreementSigned) this.$router.replace({ name: 'solutioneering-101' });
  },
  data() {
    return {
      errorMessage: '',
    };
  },
  computed: {
    ...mapState('onboarding', ['commitmentAgreement']),
    ...mapState('authentication', ['user']),
  },
  methods: {
    ...mapActions('onboarding', ['signCommitmentAgreement']),
    doContinue(value) {
      this.signCommitmentAgreement(value)
        .then((res) => {
          if (res.signed) {
            this.$router.push({ name: 'solutioneering-101' });
            return;
          }
          this.errorMessage = 'Commitment agreement must be signed';
        })
        .catch((err) => { this.errorMessage = err; });
    },
  },
};
</script>
