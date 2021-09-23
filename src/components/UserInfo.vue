<template>
      <b-card-group deck class="m-5">
        <generic-card :cardDetails="scholarOverview" :data="scholarSnapshotsDaily"/>
        <generic-card :cardDetails="slpGainDaily" :data="scholarSnapshotsDaily"/>
        <generic-card :cardDetails="slpGainWeekly" :data="scholarSnapshotsWeekly"/>
        <generic-card :cardDetails="slpGainMonthly" :data="scholarSnapshotsMonthly"/>
      </b-card-group>
</template>

<script>
import { mapGetters } from 'vuex'
import GenericCard from '@/components/GenericCard.vue'

export default {
    name: "user-info",
    components: {
        GenericCard,
    },

    props:{
        numberScholars: Number,
        scholarSnapshotsDaily: Array,
        scholarSnapshotsWeekly: Array,
        scholarSnapshotsMonthly: Array,
    },
    data(){
        return{
        }
    },
    computed:{
        ...mapGetters(['getCurrentUser']),
        scholarOverview(){
            const cardInfo = {
                cardName: "Scholars",
                icon: "person",
                totalNum: this.numberScholars, 
                recentIncrease: null,
                timeFrame: "daily",
            }
            return cardInfo
        },
        slpGainDaily(){
            const cardInfo = {
                cardName: "Total Daily SLP",
                icon: "gem",
                totalNum: this.getSlpGain(this.scholarSnapshotsDaily), 
                recentIncrease: null,
                timeFrame: null,
            }
            return cardInfo
        },
        slpGainWeekly(){
            const cardInfo = {
                cardName: "Total Weekly SLP",
                icon: "gem",
                totalNum: this.getSlpGain(this.scholarSnapshotsWeekly), 
                recentIncrease: null,
                timeFrame: "weekly",
            }
            return cardInfo
        },
        slpGainMonthly(){
            const cardInfo = {
                cardName: "Total Monthly SLP",
                icon: "gem",
                totalNum: this.getSlpGain(this.scholarSnapshotsMonthly), 
                recentIncrease: null,
                timeFrame: "monthly",
            }
            return cardInfo
        }
    },
    methods:{
        getSlpGain(scholarSnapshotsArray){
            let totalSlp = 0;
            for (let i = 0; i < scholarSnapshotsArray.length; i++){
                const scholar = scholarSnapshotsArray[i]
                const lastSlp = scholar[0].slp_bal;
                const firstSlp = scholar[scholar.length-1].slp_bal;
                totalSlp += lastSlp - firstSlp;
            }
            return totalSlp
        },
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