<template>
<generic-card :showGraph="showableGraph"
              :data="getGraphData"
              :header="header"
              :bottomText="recentIncreaseText"
              :icon="icon"
              :midText="todaysIncrease"
/>
</template>

<script>
import { mapGetters } from "vuex"
import GenericCard from './GenericCard.vue'

export default {
    name: "monthly-slp-card",
    props:{
        header: String,
        icon: String,
        data: Array
    },
    components:{
        GenericCard
    },
    data(){
      return{
      }
    },
    computed:{
        ...mapGetters(['getCurrentUser', 'getToken']),
        getGraphData(){
            let chartData = []
            let tempData = {}
            this.data.forEach(function(scholar){
                let day = 0
                let weeklySlpTotal = 0
                //iterate until > 0 because we don't want from day 0, we want the delta from 0->1
                for (let i = scholar.length-1; i > 0; i--){
                    let diff = 0
                    const prevBal = scholar[i-1].slp_bal
                    const currBal = scholar[i].slp_bal
                    diff = currBal - prevBal
                    if (day < 30){
                        day++
                        weeklySlpTotal += diff
                    }else{
                        const date = Date.parse(scholar[i].created_at)
                        const diffAdd = tempData[date] ? tempData[date] + weeklySlpTotal : weeklySlpTotal
                        tempData[date] = diffAdd
                        day = 0
                        weeklySlpTotal = 0
                    }
                }
            })
            Object.entries(tempData).sort().forEach(([key, value])=>{
                chartData.push([new Date(+key), value])
            })
            return chartData
        },
        showableGraph(){
            return this.getGraphData.length > 1
        },
        getRecentIncrease(){
            const graphData = this.getGraphData 
            if (graphData.length > 0) {
                if (graphData.length == 1){
                    return graphData[0][1]
                }else{
                    return graphData[graphData.length-1][1] - graphData[graphData.length-2][1]
                }
            }
        },
        todaysIncrease(){
            const graphData = this.getGraphData 
            if (graphData.length > 0) {
                let returnString = graphData[graphData.length-1][1] 
                return returnString >= 0 ? '+' + returnString : returnString;
            }
            return '0'
        },
        recentIncreaseText(){
            if (this.showableGraph){
                let returnString = this.getRecentIncrease + ' compared to previous 30 days'
                return this.getRecentIncrease >= 0 ? '+' + returnString : returnString;
            }else{
                return "Not enough data to compare to previous months"
            }
        },
    },
    methods:{
    },
    created(){
    }
}
</script>

<style scoped>
.photo-card{
    margin-left:auto;
    margin-right:auto;
    margin-top: 20px;
}
.user-link{
  color: black;
}
.inner-card .card-body{
  padding:0;
}
</style>