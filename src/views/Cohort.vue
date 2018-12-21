<template>
  <md-card class="max-width">
    <md-card-header>
      <md-card-header-text>
        <div class="md-title">Cohort Information</div>
      </md-card-header-text>
    </md-card-header>

    <md-card-content>
      <span class="md-display-1">Arizona State University</span>
      <hr>
      <span class="md-display-1">Contacts</span>
      <div class="contacts">
        <div class="faculty-advisor">
          <span class="md-headline">Homer</span><br>
          <span class="md-subheading">Faculty Advisor</span>
        </div>
        <div class="faculty-contact">
          <svg style="width:24px;height:24px" viewBox="0 0 24 24">
            <path fill="#999999" d="M20,8L12,13L4,8V6L12,11L20,6M20,4H4C2.89,4 2,4.89 2,6V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V6C22,4.89 21.1,4 20,4Z" />
          </svg>
          <span class="md-headline">homer.simpson@asu.ed</span><br>
          <svg style="width:24px;height:24px" viewBox="0 0 24 24">
            <path fill="#999999" d="M6.62,10.79C8.06,13.62 10.38,15.94 13.21,17.38L15.41,15.18C15.69,14.9 16.08,14.82 16.43,14.93C17.55,15.3 18.75,15.5 20,15.5A1,1 0 0,1 21,16.5V20A1,1 0 0,1 20,21A17,17 0 0,1 3,4A1,1 0 0,1 4,3H7.5A1,1 0 0,1 8.5,4C8.5,5.25 8.7,6.45 9.07,7.57C9.18,7.92 9.1,8.31 8.82,8.59L6.62,10.79Z" />
          </svg>
          <span class="md-headline">623-565-6518</span>
        </div>
      </div>
      <iframe src="https://calendar.google.com/calendar/b/4/embed?title=GreenLight%20ASU%20Event%20Calendar%20&amp;showPrint=0&amp;height=600&amp;wkst=1&amp;bgcolor=%23ffffff&amp;src=glsolutionsasu%40gmail.com&amp;color=%2329527A&amp;src=en.usa%23holiday%40group.v.calendar.google.com&amp;color=%23711616&amp;ctz=America%2FPhoenix"
      style="width: 800px; height: 600px; display: block; position: relative; margin-bottom: 30px;"
      frameborder="0" scrolling="no"></iframe>
      <div class="current-projects">
        <span class="md-display-1">Current Projects</span>
      </div>
    </md-card-content>
  </md-card>
</template>

<script>
export default {
  name: 'cohort',
};
</script>

<style>
.contacts {
  display: flex;
  padding-top: 10px;
  margin-bottom: 30px;
}

.md-headline {
  font-size: 16px;
}

#calendarTitle {
  font-size: 40px;
}
.md-subheading {
  color: #999999;
}

.faculty-advisor {
  width: 45%;
}

.faculty-contact {
  width: 45%;
}

.md-display-1 {
  font-size: 25px;
}

hr {
  display: block;
  height: 1px;
  border: 0;
  border-top: 1px solid #dfdfdf;
  margin: 1em 0;
  padding: 0;
}
</style>
