<template>
  <!--using v-bind:key to the computed property userPath, we can force a reload of the entire component when the path changes-->
  <div class="userProfile" :key="userPath">
    <user-info v-if="graphsAreShowable" 
               :numberScholars="numberScholars"
               :scholarSnapshotsDaily="scholarSnapshotsDaily"
               :scholarSnapshotsWeekly="scholarSnapshotsWeekly"
               :scholarSnapshotsMonthly="scholarSnapshotsMonthly"
    />

    <b-modal title="Add New Scholar"
        id="AddNewScholar"
        size="md"
        hide-footer
        hide-header
    >
    <add-new-scholar-form  @update="updateScholarData"/>
    </b-modal>

    <b-modal title="Delete Scholars"
        id="DeleteScholar"
        size="md"
        hide-footer
        hide-header
    >
    <delete-scholars :scholarsInfo="scholarsInfo" @update="updateScholarData" />
    </b-modal>

    <b-card class="manage-ui m-5">
        <b-button v-b-modal.AddNewScholar class="ml-4 mt-4 mb-2">
          Add
        </b-button>
        <b-button v-b-modal.DeleteScholar class="ml-4 mt-4 mb-2">
          Delete
        </b-button>
        <logout-button/>
      <b-card class="manage-scholars-header mt-4 ml-4 mr-4 p-3">
        <b-card-text class="h4">
          Manage Scholars
        </b-card-text>
      </b-card>
      <manage-scholars v-if="scholarsInfo && scholarSnapshotsWeekly" :scholarsInfo="scholarsInfo" :scholarSnapshots="scholarSnapshotsWeekly"/> 
    </b-card>
  </div>
</template>

<script>
import UserInfo from "@/components/UserInfo.vue"
import ManageScholars from '@/components/ManageScholars.vue'
import AddNewScholarForm from '@/components/AddNewScholarForm.vue'
import { mapGetters } from 'vuex'
import temp_json_data from '../../temp/data.json'
import LogoutButton from '../components/LogoutButton.vue'
import DeleteScholars from '../components/DeleteScholars.vue'

export default {
  name: 'manager-profile',
  components: {
    UserInfo,
    ManageScholars,
    AddNewScholarForm,
    LogoutButton,
    DeleteScholars,
  },
  data(){
    return{
      scholarSnapshotsDaily: null,
      scholarSnapshotsWeekly: null,
      scholarSnapshotsMonthly: null,
      scholarsInfo: null,
      numberScholars: 0
    }
  },
  computed:{
    ...mapGetters(['getCurrentUser', 'getToken']),
    /**
     * this userPath will be used as the refresh forcer for the whole component, and will fetch the components' required data acting as a pseudo-created method 
     */
    userPath(){
      this.updateScholarData()
      return this.$route.params.userid;
    },
    graphsAreShowable(){
      return this.scholarSnapshotsDaily && this.scholarSnapshotsWeekly && this.scholarSnapshotsMonthly
    },
  },
  methods:{
    fetchScholars(daysBack){
      let date = new Date() 
      const dateOffset = 24 * 60 * 60 * 1000 * daysBack
      date.setTime(date.getTime()-dateOffset)
      const dd = String(date.getDate()).padStart(2, '0');
      const mm = String(date.getMonth() + 1).padStart(2, '0'); 
      const yyyy = String(date.getFullYear());
      const userid = this.$route.params.userid;
      return fetch(`${process.env.VUE_APP_REMOTE_API}` + "/api/snapshots/managers/"+userid+"/date/"+mm+"/"+dd+"/"+yyyy, {
          method: 'GET',
          headers: {
            'Authorization': 'Bearer '+this.getToken,
      }})
      .then(response=>{
        return response.json();
      })
      .catch(err=>console.log(err));
    },
    fetchScholarInfo(){
      const userid = this.$route.params.userid;
      return fetch(`${process.env.VUE_APP_REMOTE_API}` + "/api/managers/"+userid+"/scholars", {
          method: 'GET',
          headers: {
            'Authorization': 'Bearer '+this.getToken,
      }})
      .then(response=>{
        return response.json();
      })
      .then(scholarsInfo => {
        this.scholarsInfo = scholarsInfo
        this.numberScholars = this.scholarsInfo ? this.scholarsInfo.length : 0
      })
      .catch(err=>console.log(err));
    },
    updateScholarData(){
      this.fetchScholars(30).then(response=>{
        this.scholarSnapshotsDaily = response
      });
      this.fetchScholars(120).then(response=>{
        this.scholarSnapshotsWeekly = response
      });
      this.fetchScholars(365).then(response=>{
        this.scholarSnapshotsMonthly = response
      });
      this.fetchScholarInfo()
    }
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
