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
      const username = this.$route.params.username;
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
      this.scholarSnapshotsDaily = 
        [
          [
            {"scholar_id":1,"name":"Joyme","address":"ronin:fa5b9aaacdc14c360a88cd210f4df0e098182135","personal_address":"ronin:b87d5c70997a2efa957467d216fc67c53d98282e", "slp_bal":1235,"created_at":"2021-09-17T02:13:26.450Z","manager_id":1},
            {"scholar_id":1,"name":"Joyme","address":"ronin:fa5b9aaacdc14c360a88cd210f4df0e098182135","personal_address":"ronin:b87d5c70997a2efa957467d216fc67c53d98282e", "slp_bal":1035,"created_at":"2021-09-16T02:11:26.450Z","manager_id":1},
            {"scholar_id":1,"name":"Joyme","address":"ronin:fa5b9aaacdc14c360a88cd210f4df0e098182135","personal_address":"ronin:b87d5c70997a2efa957467d216fc67c53d98282e", "slp_bal":935,"created_at":"2021-09-15T02:14:54.671Z","manager_id":1},
          ],
          [
            {"scholar_id":2,"name":"Test1","address":"ronin:f4888bdaa3003ec4e8cb0682bd3cb99568633c64","personal_address":"ronin:9ecb9c08d75e86818bf0606a64dbdb8d36562dfa","slp_bal":300,"created_at":"2021-09-16T02:11:26.450Z","manager_id":1},
            {"scholar_id":2,"name":"Test1","address":"ronin:f4888bdaa3003ec4e8cb0682bd3cb99568633c64","personal_address":"ronin:9ecb9c08d75e86818bf0606a64dbdb8d36562dfa","slp_bal":100,"created_at":"2021-09-15T02:14:54.671Z","manager_id":1}
          ],
        ]
      this.scholarSnapshotsWeekly = 
        [
          [
            {"scholar_id":1,"name":"Joyme","address":"ronin:fa5b9aaacdc14c360a88cd210f4df0e098182135","personal_address":"ronin:b87d5c70997a2efa957467d216fc67c53d98282e", "slp_bal":1035,"created_at":"2021-09-16T02:11:26.450Z","manager_id":1},
            {"scholar_id":1,"name":"Joyme","address":"ronin:fa5b9aaacdc14c360a88cd210f4df0e098182135","personal_address":"ronin:b87d5c70997a2efa957467d216fc67c53d98282e", "slp_bal":935,"created_at":"2021-09-15T02:14:54.671Z","manager_id":1},
            {"scholar_id":1,"name":"Joyme","address":"ronin:fa5b9aaacdc14c360a88cd210f4df0e098182135","personal_address":"ronin:b87d5c70997a2efa957467d216fc67c53d98282e", "slp_bal":600,"created_at":"2021-09-13T02:14:54.671Z","manager_id":1},
            {"scholar_id":1,"name":"Joyme","address":"ronin:fa5b9aaacdc14c360a88cd210f4df0e098182135","personal_address":"ronin:b87d5c70997a2efa957467d216fc67c53d98282e", "slp_bal":300,"created_at":"2021-09-11T02:14:54.671Z","manager_id":1},
          ],
          [
            {"scholar_id":2,"name":"Test1","address":"ronin:f4888bdaa3003ec4e8cb0682bd3cb99568633c64","personal_address":"ronin:9ecb9c08d75e86818bf0606a64dbdb8d36562dfa","slp_bal":300,"created_at":"2021-09-16T02:11:26.450Z","manager_id":1},
            {"scholar_id":2,"name":"Test1","address":"ronin:f4888bdaa3003ec4e8cb0682bd3cb99568633c64","personal_address":"ronin:9ecb9c08d75e86818bf0606a64dbdb8d36562dfa","slp_bal":100,"created_at":"2021-09-15T02:14:54.671Z","manager_id":1}
          ],
        ]
      this.scholarSnapshotsMonthly = 
        [
          [
            {"scholar_id":1,"name":"Joyme","address":"ronin:fa5b9aaacdc14c360a88cd210f4df0e098182135","personal_address":"ronin:b87d5c70997a2efa957467d216fc67c53d98282e", "slp_bal":1035,"created_at":"2021-09-16T02:11:26.450Z","manager_id":1},
            {"scholar_id":1,"name":"Joyme","address":"ronin:fa5b9aaacdc14c360a88cd210f4df0e098182135","personal_address":"ronin:b87d5c70997a2efa957467d216fc67c53d98282e", "slp_bal":935,"created_at":"2021-09-15T02:14:54.671Z","manager_id":1},
            {"scholar_id":1,"name":"Joyme","address":"ronin:fa5b9aaacdc14c360a88cd210f4df0e098182135","personal_address":"ronin:b87d5c70997a2efa957467d216fc67c53d98282e", "slp_bal":600,"created_at":"2021-09-13T02:14:54.671Z","manager_id":1},
            {"scholar_id":1,"name":"Joyme","address":"ronin:fa5b9aaacdc14c360a88cd210f4df0e098182135","personal_address":"ronin:b87d5c70997a2efa957467d216fc67c53d98282e", "slp_bal":300,"created_at":"2021-09-11T02:14:54.671Z","manager_id":1},
            {"scholar_id":1,"name":"Joyme","address":"ronin:fa5b9aaacdc14c360a88cd210f4df0e098182135","personal_address":"ronin:b87d5c70997a2efa957467d216fc67c53d98282e", "slp_bal":135,"created_at":"2021-09-05T02:14:54.671Z","manager_id":1},
            {"scholar_id":1,"name":"Joyme","address":"ronin:fa5b9aaacdc14c360a88cd210f4df0e098182135","personal_address":"ronin:b87d5c70997a2efa957467d216fc67c53d98282e", "slp_bal":100,"created_at":"2021-09-04T02:14:54.671Z","manager_id":1},
            {"scholar_id":1,"name":"Joyme","address":"ronin:fa5b9aaacdc14c360a88cd210f4df0e098182135","personal_address":"ronin:b87d5c70997a2efa957467d216fc67c53d98282e", "slp_bal":50,"created_at":"2021-09-03T02:14:54.671Z","manager_id":1},
          ],
          [
            {"scholar_id":2,"name":"Test1","address":"ronin:f4888bdaa3003ec4e8cb0682bd3cb99568633c64","personal_address":"ronin:9ecb9c08d75e86818bf0606a64dbdb8d36562dfa","slp_bal":300,"created_at":"2021-09-16T02:11:26.450Z","manager_id":1},
            {"scholar_id":2,"name":"Test1","address":"ronin:f4888bdaa3003ec4e8cb0682bd3cb99568633c64","personal_address":"ronin:9ecb9c08d75e86818bf0606a64dbdb8d36562dfa","slp_bal":100,"created_at":"2021-09-15T02:14:54.671Z","manager_id":1}
          ],
        ]
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
