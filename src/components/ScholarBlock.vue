<template>
    <b-row class="ml-1 mb-4 ">
        <b-col cols="0"> 
            <b-form-checkbox
                :id="this.scholar.id"
            />
        </b-col>
        <b-col cols="2">
            {{scholar.name}}
        </b-col>
        <b-col cols="2">
            {{truncatedAddress}}
        <b-icon-clipboard v-b-tooltip.hover :title="getHoverTip" @click="copyRonin" @mouseleave="copied=false">
        </b-icon-clipboard>
        </b-col>
        <b-col cols="2">
            {{truncatedPersonalAddress}}
            <b-icon-clipboard v-b-tooltip.hover :title="getHoverTip" @click="copyPersonalRonin" @mouseleave="copied=false">
            </b-icon-clipboard>
        </b-col>
        <b-col cols="2">
            NULL
        </b-col>
        <b-col cols="2">
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
        scholarSnapshotsWeekly: Array
    },
    data(){
        return{
            copied: false
        }
    },
    computed:{
        ...mapGetters(['getCurrentUser']),
        weeklySlp(){
            let totalSlp = 0;
            const scholar = this.scholar
            const lastSlp = scholar.slp_bal;
            const firstSlp = scholar.slp_bal;
            totalSlp += lastSlp - firstSlp;
            return totalSlp
        },
        scholar(){
            return this.scholarSnapshotsWeekly[0]
        },
        truncatedAddress(){
            return "..."+this.scholar.address.slice(-8)
        },
        truncatedPersonalAddress(){
            return "..."+this.scholar.personal_address.slice(-8)
        },
        getHoverTip(){
            return this.copied ? "Copied!" : "Copy to Clipboard"
        }
    },
    methods:{
        copyPersonalRonin(){
            console.log(this.scholar.personal_address)
            this.copied = true
        },
        copyRonin(){
            console.log(this.scholar.address)
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