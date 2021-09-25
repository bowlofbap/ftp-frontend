<template>
    <b-row class="ml-1 mb-4 ">
        
        <b-modal v-if="showGraph" title="Daily SLP Graph"
            :id="'SLPDaily'+scholarData.id"
            size="md"
            hide-footer
            hide-header>
            <line-chart  :data="getDailyGraphData">
            </line-chart>
        </b-modal>
        
        <b-modal v-if="showGraph" title="Weekly SLP Graph"
            :id="'SLPWeekly'+scholarData.id"
            size="md"
            hide-footer
            hide-header>
            <line-chart  :data="getWeeklyGraphData">
            </line-chart>
        </b-modal>

        <b-col cols="2">
            {{scholarData.name}}
        </b-col>
        <b-col cols="2">
            {{truncatedAddress}}
            <b-button
                    size="sm"
                    v-b-tooltip.hover
                    :title="getHoverTip"
                    @mouseleave="copied=false"
                    v-clipboard:copy="scholar.address"
                    v-clipboard:success="copyRonin">
                <b-icon-clipboard></b-icon-clipboard>
            </b-button>
        </b-col>
        <b-col cols="2">
            {{truncatedPersonalAddress}}
            <b-button
                    size="sm"
                    v-b-tooltip.hover
                    :title="getHoverTip"
                    @mouseleave="copied=false"
                    v-clipboard:copy="scholar.personal_address"
                    v-clipboard:success="copyPersonalRonin">
                <b-icon-clipboard></b-icon-clipboard>
            </b-button>
        </b-col>
        <b-col cols="1">
            NULL
        </b-col>
        <b-col cols="2">
            <b-icon-eye v-b-modal="'SLPDaily'+scholarData.id" />
            {{dailySlp}}
            
        </b-col>
        <b-col cols="2">
            <b-icon-eye v-b-modal="'SLPWeekly'+scholarData.id" />
            {{weeklySlp}}
        </b-col>
    </b-row>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    name: "scholar-block",
    components: {
        
    },
    props:{
        scholarSnapshotData: Array,
        scholarData: Object
    },
    data(){
        return{
            copied: false
        }
    },
    computed:{
        ...mapGetters(['getCurrentUser']),
        dailySlp(){
            if (!this.scholarSnapshotData) { return 0 }
            const pastWeekData = this.scholarSnapshotData.slice(1).slice(-7)
            const denominator = pastWeekData.length 
            //reduces the weekly snapshot into last 7 days and gets average of the slp gains between them
            return parseInt(this.weeklySlp / denominator)
        },
        showGraph(){
            return true
        },
        weeklySlp(){
            //reduces the last 7 days for the gains 
            if (!this.scholarSnapshotData) { return 0 }
            let prev_bal = null
            return parseInt(Object.entries(this.scholarSnapshotData.slice(1).slice(-7)).reduce(function (total, pair) {
                    const [_, value] = pair;
                    let diff = 0
                    if (prev_bal){
                        diff = value.slp_bal - prev_bal
                    }
                    prev_bal = value.slp_bal
                    return total + diff;
                    }, 0))
        },
        getDailyGraphData(){
            if (!this.scholarSnapshotData) { return {} }
            let chartData = []
            let tempData = {}
            for (let i = this.scholarSnapshotData.length-1; i > 0; i--){
                let diff = 0
                const prevBal = this.scholarSnapshotData[i-1].slp_bal
                const currBal = this.scholarSnapshotData[i].slp_bal
                diff = currBal - prevBal
                const date = Date.parse(this.scholarSnapshotData[i].created_at)
                const timestamp = date//yr + "-" + mo + "-" + day
                const diffAdd = tempData[timestamp] ? tempData[timestamp] + diff : diff
                tempData[timestamp] = diffAdd
            }
            Object.entries(tempData).sort().forEach(([key, value])=>{
                chartData.push([new Date(+key), value])
            })
            return chartData
        },
        getWeeklyGraphData(){
            if (!this.scholarSnapshotData) { return {} }
            let chartData = []
            let tempData = {}
            let day = 0
            let weeklySlpTotal = 1
            //iterate until > 0 because we don't want from day 0, we want the delta from 0->1
            for (let i = this.scholarSnapshotData.length-1; i > 0; i--){
                let diff = 0
                const prevBal = this.scholarSnapshotData[i-1].slp_bal
                const currBal = this.scholarSnapshotData[i].slp_bal
                diff = currBal - prevBal
                if (day < 6){
                    day++
                    weeklySlpTotal += diff
                }else{
                    const date = Date.parse(this.scholarSnapshotData[i].created_at)
                    const diffAdd = tempData[date] ? tempData[date] + weeklySlpTotal : weeklySlpTotal
                    tempData[date] = diffAdd
                    day = 0
                    weeklySlpTotal = 0
                }
            }
            Object.entries(tempData).sort().forEach(([key, value])=>{
                chartData.push([new Date(+key), value])
            })
            return chartData
        },
        truncatedAddress(){
            return this.scholar.address.slice(0,10) + "... " +this.scholar.address.slice(-4)
        },
        truncatedPersonalAddress(){
            return this.scholarData.personal_address ?  this.scholar.personal_address.slice(0,10) + "... " +this.scholar.personal_address.slice(-4): "NO PERSONAL ADDRESS"
        },
        getHoverTip(){
            return this.copied ? "Copied!" : "Copy to Clipboard"
        },
    },
    methods:{
        copyPersonalRonin(){
            console.log(this.scholarData.personal_address)
            this.copied = true
        },
        copyRonin(){
            console.log(this.scholarData.address)
            this.copied = true
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