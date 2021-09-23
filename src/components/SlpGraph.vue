<template>
  <line-chart :data="getMapData">
  </line-chart>
</template>

<script>
import { mapGetters } from 'vuex'


export default {
  name: 'slp-graph',
  components: {
  },
  props:{
      data: Array
  },
  data(){
    return{
    }
  },
  computed:{
    ...mapGetters(['getCurrentUser', 'getToken']),
    getMapData(){
      let chartData = {}
      this.data.forEach(function(scholar){
        for (let i = scholar.length-2; i > 0; i--){
          console.log(i, scholar)
          const prevBal = scholar[i+1].slp_bal
          const currBal = scholar[i].slp_bal
          const diff = currBal - prevBal
          const day = scholar[i].created_at//Date.parse(scholar[i].created_at)
          const diffAdd = chartData.day ? chartData.day + diff : diff
          console.log(day, diffAdd)
          chartData[day] = diffAdd
        }
      })
      console.log(chartData)
      return chartData
    }
  },
  methods:{
  }
}
</script>

<style scoped>
h1 {
    text-align: center;
}
.card-img-top {
    width: 100%;
    height: 15vw;
    object-fit: cover;
}
.card-body{
  padding:0;
}
</style>
