<template>
<generic-card :showGraph="false"
              :header="header"
              :icon="icon"
              :midText="display"
/>
</template>

<script>
import { mapGetters } from "vuex"
import GenericCard from './GenericCard.vue'

export default {
    name: "scholar-count-card",
    props:{
        header: String,
        icon: String,
        display: String
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