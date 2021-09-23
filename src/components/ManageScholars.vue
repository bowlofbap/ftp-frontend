<template>
<div>
    <b-card class="ml-4 mr-4 dark">
        <b-row class="ml-1">
            <b-col cols="0"> 
                <b-form-checkbox
                    id="checkbox-1"
                    name="checkbox-1"
                />
            </b-col>
            <b-col cols="2">
                Name
            </b-col>
            <b-col cols="2">
                Scholar Ronin
            </b-col>
            <b-col cols="2">
                Personal Ronin
            </b-col>
            <b-col cols="1">
                Previous Pay Date
            </b-col>
            <b-col cols="2">
                Average Daily SLP 
            </b-col>
            <b-col cols="2">
                Last Week's SLP
            </b-col>
        </b-row>
    </b-card>
    <b-card class="ml-4 mr-4 mb-4">
        <scholar-block v-for="scholarSnapshots in scholarSnapshotsWeekly"
                        :key="scholarSnapshots[0].id"
                        :scholarSnapshotData="scholarSnapshots"
        />
    </b-card>
</div>
</template>

<script>
import { mapGetters } from 'vuex'
import ScholarBlock from '@/components/ScholarBlock.vue'

export default {
    name: "manage-scholars",
    components: {
        ScholarBlock
    },

    props:{
        scholarSnapshotsWeekly: Array,
    },
    data(){
        return{

        }
    },
    computed:{
        ...mapGetters(['getCurrentUser']),
    },
    methods:{
    }
}
</script>

<style>
.info-row{
    height: 33%;
}
.info-text{
    margin-top:auto;
}
.btn:focus,.btn:active {
   outline: none !important;
   box-shadow: none;
}

</style>