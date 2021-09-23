<template>
    <b-card class="">
        <b-modal title="SLP Graph"
            :id="'SLP'+cardDetails.timeFrame"
            size="md"
            hide-footer
            hide-header
        >
        <slp-graph :data="data"/>
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
    name: "generic-card",
    /*
        cardDetails is incoming JSON object with
            cardName
            icon
            totalNum
            recentIncrease
            timeFrame
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
        recentIncreaseText(){
            let returnString = ""
            if (this.cardDetails.recentIncrease){
                returnString = String.format('+{0} since ', this.cardDetails.recentIncrease)
                if (this.cardDetails.timeFrame == "day"){
                    returnString = returnString + 'yesterday'
                }else{
                    returnString = returnString + String.format('last ', this.cardDetails.timeFrame)
                }
            }
            return returnString;
        }
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