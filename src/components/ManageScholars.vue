<template>
<div>
    
    <b-card class="ml-4 mr-4 dark">
        <b-row class="ml-1">
            <b-col cols="1">
                Name
            </b-col>
            <b-col cols="3">
                Scholar Ronin
            </b-col>
            <b-col cols="3">
                Personal Ronin
            </b-col>
            <b-col cols="1">
                ELO
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
        <scholar-block v-for="scholar in scholarsInfo"
                        :key="scholar.id"
                        :scholarData="scholar"
                        :scholarSnapshotData="getScholarSnapshotData(scholar.id)"
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
        scholarsInfo: Array,
        scholarSnapshots: Object,
    },
    data(){
        return{

        }
    },
    computed:{
        ...mapGetters(['getCurrentUser']),
    },
    methods:{
        getScholarSnapshotData(scholar_id){
            return this.scholarSnapshots[scholar_id]
        }
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