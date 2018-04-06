<template>
  <div class="md-layout">
    <div class="md-layout-item md-size-15"></div>
    <div class="md-layout-item">
      <h1>Confidentiality Policy</h1>
       <p>GreenLight Solutions Foundation (“Corporation”) recognizes that efficient operation requires the maintenance and management of extensive Confidential Information related to its programs as well as donor and prospect records. The purpose of this Confidentiality Policy (“Policy”) is to memorialize the Corporation’s position on confidentiality.</p>
      <p>The Corporation is working to create educational opportunities for university students, as well as community and business organizations, by engaging them in applied projects based upon leading sustainability research and practices to create strategic solutions (“Mission”). The Corporation considers certain information related to the Mission to be “Confidential Information”. Such Confidential Information includes, but is not limited to, the following:</p>
      <ul>
        <li>Fundraising Plans</li>
        <li>Grant Files</li>
        <li>Contribution Files</li>
        <li>Donor Records</li>
        <li>Donor Lists</li>
        <li>Charitable Gift Information</li>
        <li>Resource Development Data</li>
        <li>Financial Projections</li>
        <li>Personnel Information</li>
        <li>Legal Information</li>
        <li>Program Data</li>
        <li>Manuals</li>
        <li>Contracts</li>
        <li>Agreements</li>
        <li>Board and Committee Meeting Discussions</li>
        <li>Board and Committee Meeting Materials</li>
      </ul>
      <p>
        <strong>A. Confidentiality of Corporation Business.</strong> Discussions that take place in the context of the Corporation’s operations require discretion, including discussions pertaining to board meetings, committee meetings, personnel issues, development and fundraising activities, etc. The positions or statements of individual Board members, advisors, or staff should not be discussed outside of official Corporation meetings and processes. Likewise, the content of Corporation business, including documents or analysis of documents, should not be discussed or shared outside official meetings and processes.</p>
      <p>
        <strong>B. Confidentiality of Records.</strong> The Executive Director shall be responsible for maintaining the confidentiality of donor and prospect Records. In this context, “Records” is construed to mean all files, including electronic data, containing information on the Corporation’s donors or prospective donors. Records will normally be available to staff as needed to fulfill their duties. At the discretion of the Executive Director, staff may make all or part of any record available to Corporation volunteers to assist them in executing their specific responsibilities. The Corporation’s auditors, legal counsel and other consultants are authorized to review Confidential Information as required for the purposes for which they are engaged. All persons accessing donor or prospect Records in the conduct of Corporation business are called upon to maintain the confidentiality of said Records. Staff may share information with donors, fund beneficiaries, and grantees pertaining to their own gifts, funds, grants, etc.</p>
      <p>
        <strong>C. Publication of Donor Names.</strong> Unless otherwise requested by the donor, the names of all individual donors may be listed in the Corporation’s annual report and/or in other appropriate vehicles. The Corporation will not publish the amount of any donor’s gift without the permission of the donor. Donors making gifts to the Corporation by bequest or other testamentary device are deemed to have granted such permission unless the terms of the gift instrument state otherwise.</p>
      <p>
        <strong>D. Memorial/Tribute Gifts.</strong> The names of donors of memorial or tribute gifts may be released to the honoree, next of kin, or appropriate member of the immediate family, unless otherwise specified by the donor. Gift amounts are not to be released without the express consent of the donor.</p>
      <p>
        <strong>E. Anonymous Gifts.</strong> The Executive Director is authorized to accept anonymous gifts to the Corporation, and to handle them appropriately. The name of the donor and/or size of the gift may be withheld from the Board of Directors (“Board”) at the Executive Director’s discretion, if so requested by the donor. Board members will respect the anonymity of any such gift.</p>
      <p>
        <strong>F. Giving Categories.</strong> If giving categories have been stipulated for a specific fund drive, challenge grant, or Mission, or as part of the Corporation’s ongoing recognition program, then the donors, unless they otherwise specify, are deemed to have given the Corporation permission to publish their names associated with the particular giving category. Similarly, the Corporation may publish giving categories associated with donor names in its annual report and, unless a donor specifies otherwise, his/her name may be included therein.</p>
      <p>
        <strong>G. No Disclosures to Third Parties.</strong> The Corporation shall not release to third parties or allow third parties to copy, inspect, or otherwise use Corporation records or other information pertaining to the identification of a donor or donor’s gifts. No disclosures to third parties of such information, including addresses and demographic information, shall be made without the donor’s consent.</p>
      <p>
        <strong>H. Public Disclosure.</strong> The Corporation will comply with both the letter and spirit of all public disclosure requirements, including the open availability of its Form 990 tax returns. This policy shall not be construed in any manner so as to prevent the Corporation from disclosing information to taxing authorities or other governmental agencies or courts having regulatory control or jurisdiction over the Corporation. However, all staff, volunteers, and consultants must hold strictly confidential all issues of a private nature, including, but not limited to, all issues explicitly discussed in this policy.</p>
      <p>
        <strong>I. Consequences of Policy Violation.</strong> Violations of the Policy are considered very serious, and may result in disciplinary action up to and including dismissal for employees or consultants or removal from the Board or any committee for volunteers.</p>

      <h1 class="md-title">Confidentiality Agreement</h1>
      <p>By signing below, I acknowledge that:</p>
      <ol>
        <li>I have received a copy of the Confidentiality Policy;</li>
        <li>I have read and understand the Confidentiality Policy; and</li>
        <li>I agree to abide by this Policy to the best of my ability in my role as a director, officer, volunteer, consultant or employee.</li>
      </ol>
      <p>I acknowledge and agree that I will not disclose any Confidential Information, in whatever form to unauthorized parties. I agree that at the end of my relationship with the Corporation, I will destroy or return to the Corporation all Records containing Confidential Information in my possession or control regardless of how stored or maintained, including all originals, copies and compilations and all information stored or maintained on computer, tapes, discs, E-mail or any other form of technology.</p>

      <form-error v-if="errorMessage">{{ errorMessage }}</form-error>
      <agreement-signature-form :name="confidentialityAgreement.name" :date="confidentialityAgreement.date" :user="confidentialityAgreement.user" :onSubmit="doContinue"></agreement-signature-form>
    </div>
    <div class="md-layout-item md-size-15"></div>
  </div>
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
  created() {
    if (this.user.ndaSigned) this.$router.replace({ name: 'commitment-agreement' });
  },
  data() {
    return {
      errorMessage: '',
      name: '',
      date: null,
    };
  },
  computed: {
    ...mapState('onboarding', ['confidentialityAgreement']),
    ...mapState('authentication', ['user']),
  },
  methods: {
    ...mapActions('onboarding', ['signConfidentialityAgreement']),
    doContinue(value) {
      this.signConfidentialityAgreement(value)
        .then(signed => {
          if (signed) {
            this.$router.push({ name: 'commitment-agreement' });
            return;
          }
          Promise.reject('Confidentiality agreement must be signed');
        })
        .catch(err => {
          this.errorMessage = err;
        });
    },
  },
};
</script>
