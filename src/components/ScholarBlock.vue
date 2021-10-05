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
        
        <b-modal v-if="showGraph" title="ELO Graph"
            :id="'ELO'+scholarData.id"
            size="md"
            hide-footer
            hide-header>
            <line-chart :data="getEloGraphData">
            </line-chart>
        </b-modal>

        <b-col cols="1">
            {{scholarData.name}}
        </b-col>
        <b-col cols="3">
            {{truncatedAddress}}
            <b-button
                    size="sm"
                    v-b-tooltip.hover
                    :title="getHoverTip"
                    @mouseleave="copied=false"
                    v-clipboard:copy="scholarData.address"
                    v-clipboard:success="copyRonin"
                    >
                <b-icon-clipboard ></b-icon-clipboard>
            </b-button>
        </b-col>
        <b-col cols="3">
            {{truncatedPersonalAddress}}
            <b-button
                    size="sm"
                    v-b-tooltip.hover
                    :title="getHoverTip"
                    @mouseleave="copied=false"
                    v-clipboard:copy="scholarData.personal_address"
                    v-clipboard:success="copyPersonalRonin">
                <b-icon-clipboard></b-icon-clipboard>
            </b-button>
        </b-col>
        <b-col cols="1">
            <b-icon-eye v-b-modal="'ELO'+scholarData.id" />
            {{elo}}
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
            copied: false,
        }
    },
    computed:{
        ...mapGetters(['getCurrentUser']),
        dailySlp(){
            if (!this.scholarSnapshotData) { 
                return 0 
            }
            //reduces the weekly snapshot into last 7 days and gets average of the slp gains between them
            const weekData = this.getSevenValidDaysData
            let prev_bal = null
            const weeklyDenominator = parseInt(weekData.reduce(function (total, value) {
                let diff = 0
                if (prev_bal != null){
                    diff = value.slp_bal - prev_bal
                }
                if (diff < 0){
                    diff = 0
                }
                prev_bal = value.slp_bal
                return total + (diff > 0 ? 1 : 0);
            }, 0))
            return parseInt(this.weeklySlp / weeklyDenominator)
        },
        showGraph(){
            return true
        },
        weeklySlp(){
            //reduces the last 7 days for the gains 
            const weekData = this.getSevenValidDaysData
            if (!this.scholarSnapshotData) { return 0 }
            let prev_bal = null
            this.weeklyDenominator = 0
            return parseInt(weekData.reduce(function (total, value) {
                let diff = 0
                if (prev_bal != null){
                    diff = value.slp_bal - prev_bal
                }
                if (diff < 0){
                    diff = 0
                    console.log("pullout day")
                }
                prev_bal = value.slp_bal
                return total + diff;
                }, 0))
        },
        getSevenValidDaysData(){
            let returnData = []
            if (!this.scholarSnapshotData) { 
                return returnData
            }
            for (const[key, value] of Object.entries(this.scholarSnapshotData).reverse()) {
                const lookAhead = key > 0 ? this.scholarSnapshotData[key-1] : null
                if (lookAhead){
                    returnData.unshift(value)
                    if (returnData.length > 6){
                        returnData
                        break
                    }
                }
            }
            return returnData
        },
        elo(){
            return this.scholarSnapshotData ? this.scholarSnapshotData[this.scholarSnapshotData.length-1].elo : 0
        },
        getEloGraphData(){
            if (!this.scholarSnapshotData) { return {} }
            let chartData = []
            let tempData = {}
            for (let i = this.scholarSnapshotData.length-1; i > 0; i--){
                const date = Date.parse(this.scholarSnapshotData[i].created_at)
                tempData[date] = this.scholarSnapshotData[i].elo
            }
            Object.entries(tempData).sort().forEach(([key, value])=>{
                chartData.push([new Date(+key), value])
            })
            return chartData
        },
        getDailyGraphData(){
            if (!this.scholarSnapshotData) { return {} }
            let chartData = []
            let tempData = {}
            for (let i = this.scholarSnapshotData.length-1; i > 0; i--){
                let diff = 0
                const prevBal = this.scholarSnapshotData[i-1].slp_bal
                const currBal = this.scholarSnapshotData[i].slp_bal
                if (currBal == 0){
                    continue
                }
                diff = currBal - prevBal
                const date = Date.parse(this.scholarSnapshotData[i].created_at)
                const diffAdd = tempData[date] ? tempData[date] + diff : diff
                tempData[date] = diffAdd
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
                if (currBal < prevBal){
                    continue
                }
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
            return this.scholarData.address.slice(0,10) + "... " +this.scholarData.address.slice(-4)
        },
        truncatedPersonalAddress(){
            return this.scholarData.personal_address ?  this.scholarData.personal_address.slice(0,10) + "... " +this.scholarData.personal_address.slice(-4): "NO PERSONAL ADDRESS"
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