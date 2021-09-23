<template>
    <b-card class="">
        <b-modal title="SLP Graph"
            :id="'SLP'+cardDetails.timeFrame"
            size="md"
            hide-footer
            hide-header
        >
        <line-chart :curve="false" :data="getGraphData">
        </line-chart>
        </b-modal>
        <b-container v-b-modal="'SLP'+cardDetails.timeFrame" >
            <b-row class="mb-3 ">
                <b-col cols="9">
                    <b-card-text class="mr-2 ml-2 h4">
                        {{cardDetails.cardName}}
                    </b-card-text>
                </b-col>
                <b-col cols="3">
                    <b-icon :icon="cardDetails.icon" class="h2 pr-2"></b-icon>
                </b-col>
            </b-row>
            <b-card-text class="font-weight-bold h2 mt-3">
                {{cardDetails.totalNum}}
            </b-card-text>
            <b-card-text class="mr-2 pb-1 mb-1">
                {{recentIncreaseText}}
            </b-card-text>
        </b-container>
    </b-card>
</template>

<script>
import { mapGetters } from "vuex"

export default {
    name: "daily-slp-card",
    /*
        cardDetails is incoming JSON object with
            cardName
            icon
            totalNum
            recentIncrease
    */
    props:{
        cardDetails: Object,
        data: Array
    },
    components:{
    },
    data(){
      return{
      }
    },
    computed:{
        ...mapGetters(['getCurrentUser', 'getToken']),
        getGraphData(){
            let chartData = {}
            this.data.forEach(function(scholar){
            for (let i = scholar.length - 1; i >= 0; i--){
                let diff = 0
                if (i == scholar.length - 1){
                    continue //don't record the first day as a gain
                }else{
                    const prevBal = scholar[i+1].slp_bal
                    const currBal = scholar[i].slp_bal
                    diff = currBal - prevBal
                }
                const date = new Date(Date.parse(scholar[i].created_at))
                console.log(scholar[i].created_at)
                const yr = date.getFullYear()
                const day = date.getDate() + 1 //js days are  0 based
                const mo = date.getMonth() + 1 //js months are 0 based
                const timestamp = yr + "-" + mo + "-" + day
                const diffAdd = chartData.timestamp ? chartData.timestamp + diff : diff
                chartData[timestamp] = diffAdd
                }
            })
            console.log(chartData)
            return chartData
        },
        getRecentIncrease(){
            const graphData = this.getGraphData //won't work for some reason unless the object is saved here
            const dailyData = Object.keys(graphData).map(function(key){
                const v = graphData[key] //and here
                return v
            })
            if (dailyData.length > 0) {
                if (dailyData.length == 1){
                    return dailyData[0]
                }else{
                    return dailyData[dailyData.length-1] - dailyData[dailyData.length-2]
                }
            }
        },
        recentIncreaseText(){
            console.log("RECENT INC", this.getRecentIncrease)
            let returnString = this.getRecentIncrease + ' compared to yesterday'
            return this.getRecentIncrease >= 0 ? '+' + returnString : returnString;
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