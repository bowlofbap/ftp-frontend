<template>
    <b-button v-on:click="logout" class="ml-4 mt-4 mb-2">
        Logout
    </b-button>
</template>


<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'logout-button',
  data() {
    return {
      user: {
        email: '',
        password: '',
      },
      invalidCredentials: false,
    };
  },
  methods: {
    ...mapActions(["logoutUser"]),
    logout(){
      console.log(JSON.stringify(this.user))
        fetch(`${process.env.VUE_APP_REMOTE_API}/users/sign_out`, {
          method: 'DELETE',
        })
        .then((response) => {
        if (response.ok) {
            console.log("Logout Successful")
            this.logoutUser()
            this.$router.push({path: '/'});
        }
        })
        .catch((err) => {
            console.log(err);
        });
    }
  },
};
</script>

<style>

</style>