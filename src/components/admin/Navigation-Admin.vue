
<template>
    <md-tabs md-centered>
        <md-tab :id="area.id" :md-label="area.label" v-for="area in areas" :key="area.id">
            <router-link :to="area.route">{{area.label}}</router-link>
        </md-tab>
    </md-tabs>
</template>
<script>
export default {
    name: 'Navigation-Admin',
    data() {
        return {
            areas: [
                { route: 'members', id: 'Members', label: 'Members', },
                { route: 'projects', id: 'Projects', label: 'Projects', },
                { route: 'chapters', id: 'Chapters', label: 'Chapters', },
                { route: 'partnerorganizations', id: 'PartnerOrganizations', label: 'Partner Organizations', }
            ]
        }
    }
}
</script>

<style lang="sass">

</style>

