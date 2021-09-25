<template>
      <b-card-group deck class="m-5">
        <scholar-count-card   :header="scholarOverview.header"
                        :icon="scholarOverview.icon"
                        :display="scholarOverview.display"/>
        <daily-slp-card :header="dailySlpOverview.header"
                        :icon="dailySlpOverview.icon"
                        :data="scholarSnapshotsDaily"/>
        <weekly-slp-card :header="weeklySlpOverview.header"
                        :icon="weeklySlpOverview.icon"
                        :data="scholarSnapshotsWeekly"/>
        <monthly-slp-card :header="monthlySlpOverview.header"
                        :icon="monthlySlpOverview.icon"
                        :data="scholarSnapshotsMonthly"/>
      </b-card-group>
</template>

<script>
import { mapGetters } from 'vuex'
import ScholarCountCard from '@/components/ScholarCountCard.vue'
import DailySlpCard from '@/components/DailySLPCard.vue'
import WeeklySlpCard from '@/components/WeeklySLPCard.vue'
import MonthlySlpCard from '@/components/MonthlySLPCard.vue'

export default {
    name: "user-info",
    components: {
        ScholarCountCard,
        DailySlpCard,
        WeeklySlpCard,
        MonthlySlpCard
    },

    props:{
        numberScholars: Number,
        scholarSnapshotsDaily: Object,
        scholarSnapshotsWeekly: Object,
        scholarSnapshotsMonthly: Object,
    },
    data(){
        return{
            scholarOverview: {
                header: "Scholars",
                icon: "person",
                display: ''+this.numberScholars
            },
            dailySlpOverview: {
                header: "Daily SLP Gain",
                icon: "gem",
            },
            weeklySlpOverview: {
                header: "Weekly SLP Gain",
                icon: "gem",
            },
            monthlySlpOverview: {
                header: "Monthly SLP Gain",
                icon: "gem",
            },
        }
    },
    computed:{
        ...mapGetters(['getCurrentUser']),
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