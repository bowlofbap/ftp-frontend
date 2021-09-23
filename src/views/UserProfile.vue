<template>
  <!--using v-bind:key to the computed property userPath, we can force a reload of the entire component when the path changes-->
  <div class="userProfile" :key="userPath">
    <user-info v-if="scholarSnapshotsDaily" 
               :numberScholars="numberScholars"
               :scholarSnapshotsDaily="scholarSnapshotsDaily"
               :scholarSnapshotsWeekly="scholarSnapshotsWeekly"
               :scholarSnapshotsMonthly="scholarSnapshotsMonthly"
    />
    <b-card class="manage-ui m-5">
      <b-card class="manage-top-bar border-bottom m-4">
        <b-button class="ml-4 mt-2 mb-2">
          New
        </b-button>
        <b-button class="ml-4 mt-2 mb-2">
          Delete
        </b-button>
      </b-card>
      <b-card class="manage-scholars-header mt-4 ml-4 mr-4 p-3">
        <b-card-text class="h4">
          Manage Scholars
        </b-card-text>
      </b-card>
      <manage-scholars :scholarSnapshotsWeekly="scholarSnapshotsWeekly"/>
    </b-card>
  </div>
</template>

<script>
import UserInfo from "@/components/UserInfo.vue"
import ManageScholars from '@/components/ManageScholars.vue'
import { mapGetters } from 'vuex'
import temp_json_data from '../../temp/data.json'

export default {
  name: 'user-profile',
  components: {
    UserInfo,
    ManageScholars
  },
  data(){
    return{
      scholarSnapshotsDaily: null,
      scholarSnapshotsWeekly: null,
      scholarSnapshotsMonthly: null,
      numberScholars: 0,
      profile: null
    }
  },
  computed:{
    ...mapGetters(['getCurrentUser', 'getToken']),
    /**
     * this userPath will be used as the refresh forcer for the whole component, and will fetch the components' required data acting as a pseudo-created method 
     */
    userPath(){
      this.fetchScholars();
      return this.$route.params.username;
    },
  },
  methods:{
    fetchScholarsApi(){
      const userid = this.$route.params.username;
      fetch(`${process.env.VUE_APP_REMOTE_API}` + "/api/scholars/"+username)
      .then(response=>{
        return response.json();
      })
      .then(profile=>{
        this.profile = profile;
      })
      .catch(err=>console.log(err));
    },
    fetchScholars(){
      //get past 2 weeks
      this.scholarSnapshotsDaily = temp_json_data
      this.scholarSnapshotsWeekly = temp_json_data
      this.scholarSnapshotsMonthly = this.scholarSnapshotsWeekly = temp_json_data
      this.numberScholars = this.scholarSnapshotsDaily.length
    },
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
