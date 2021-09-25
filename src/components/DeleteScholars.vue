<template>
<div>
    <b-card v-for="scholar in scholarsInfo" :key="scholar.id">
        <b-row>
            <b-col cols=4>
                {{scholar.name}}
            </b-col>
            <b-col cols=4>
                {{ truncatedAddress(scholar) }}
            </b-col>
            <b-col cols=2>
                <b-button @click="removeScholar(scholar.id)">
                    Remove
                </b-button>
            </b-col>
        </b-row>
    </b-card>
</div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    name: "delete-scholars",
    components: {
    },

    props:{
        scholarsInfo: Array,
    },
    data(){
        return{

        }
    },
    computed:{
        ...mapGetters(['getCurrentUser', 'getToken']),
    },
    methods:{
        truncatedAddress(scholar){
            return "..."+scholar.address.slice(-8)
        },
        removeScholar(scholarId){
            const managerId = this.getCurrentUser.sub
            fetch(`${process.env.VUE_APP_REMOTE_API}/api/managers/${managerId}/${scholarId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': 'Bearer '+this.getToken,
            },
            })
            .then((response) => {
                this.$emit('update')
                console.log(response)
            })
            .catch((err) => {
                console.log(err);
            });
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