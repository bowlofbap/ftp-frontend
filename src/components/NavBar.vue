<template>
  <div>
  <b-navbar class="border-bottom" toggleable="sm" style="background-color:white" fixed="top">
    <b-navbar-nav class="ml-2">
      <b-link :to="{ name: navHome}">
        <b-img src="@/images/logo.png" class="ml-1 mr-1" style="max-height:40px"/>
      </b-link>
    </b-navbar-nav>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
        <!--<b-nav-item class="mr-1"  :to="{ name: 'home'}"><b-icon :icon="homeIcon" class="te-primary-text"/></b-nav-item> -->
        <b-nav-item class="mr-2" v-if="getCurrentUser" :to="{ name: 'user-profile', params:{username: getCurrentUser.sub}}"><b-icon :icon="homeIcon"/></b-nav-item>
        <b-nav-item class="mr-4" v-if="!getCurrentUser" :to="{ name: 'login'}"><b-icon :icon="loginIcon"/></b-nav-item>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
export default {
  name: 'nav-bar',
  data(){
    return{
    }
  },
  computed: {
    ...mapGetters(['getCurrentUser', 'getToken', 'getCurrentRoute']),
      homeIcon(){
        return this.getCurrentRoute == "user-profile" ? "house-door-fill" : "house-door"; 
      },
      loginIcon(){
        return this.getCurrentRoute == "login" ? "person-fill" : "person";
      },
      navHome(){
        return this.getCurrentUser ? 'home' : 'landing-page'
      }
  },
  methods:{
    ...mapActions(["logoutUser"]),
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
