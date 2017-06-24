<template>
    <md-tabs md-centered>
        <md-tab :id="area.id" :md-label="area.label" v-for="area in areas" :key="area.id">
            <router-link :to="area.name">{{area.label}}</router-link>
        </md-tab>
    </md-tabs>
</template>
<script>
export default {
    name: 'Navigation-Admin',
    data() {
        return {
            areas: [
                { name: 'members', id: 'Members', label: 'Members', },
                { name: 'projects', id: 'Projects', label: 'Projects', },
                { name: 'chapters', id: 'Chapters', label: 'Chapters', },
                { name: 'partnerorganizations', id: 'PartnerOrganizations', label: 'Partner Organizations', }
            ]
        }
    }
}
</script>

<style lang="sass">

</style>

