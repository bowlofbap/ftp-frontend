<template>
    <b-card class="">
        <b-modal v-if="showGraph" title="SLP Graph"
            :id="'SLP'+header"
            size="md"
            hide-footer
            hide-header
        >
            <line-chart  :data="data">
            </line-chart>
        </b-modal>
        <b-container v-b-modal="'SLP'+header" >
            <b-row class="mb-3 ">
                <b-col cols="9">
                    <b-card-text class="mr-2 ml-2 h4">
                        {{header}}
                    </b-card-text>
                </b-col>
                <b-col cols="3">
                    <b-icon :icon="icon" class="h2 pr-2"></b-icon>
                </b-col>
            </b-row>
            <b-card-text class="font-weight-bold h2 mt-3">
                {{midText}}
            </b-card-text>
            <b-card-text class="mr-2 pb-1 mb-1">
                {{bottomText}}
            </b-card-text>
        </b-container>
    </b-card>
</template>

<script>

export default {
    name: "generic-card",
    props:{
        header: String,
        showGraph: Boolean,
        icon: String,
        data: Array,
        midText: String,
        bottomText: String
    },
    components:{
    },
    data(){
      return{
      }
    },
    computed:{
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