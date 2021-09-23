<template>
  <div>
    <b-alert class="mt-3" v-model="invalidCredentials" variant="danger" dismissible>
      Invalid username or password!
    </b-alert>

    <b-form @submit.prevent="userLogin">
        <b-form-input
          class="mt-4"
          v-model="user.username"
          required
          placeholder="Username"
        ></b-form-input>

        <b-form-input
          class="mt-4"
          v-model="user.password"
          required
          type="password"
          placeholder="Password"
        ></b-form-input>

      <b-button class="mt-3 mb-3" type="submit" variant="success">Log In</b-button>

      <div class="border-top my-2"></div>
      <b-card-sub-title class="mt-3">Don't have an account? <b-link to="register" class="te-secondary-text">Sign up!</b-link></b-card-sub-title>
    </b-form>
  </div>
</template>


<script>
import { mapActions } from 'vuex';

export default {
  name: 'login-form',
  data() {
    return {
      user: {
        username: '',
        password: '',
      },
      invalidCredentials: false,
    };
  },
  methods: {
    ...mapActions(["loginUser"]),
    userLogin(){
        fetch(`${process.env.VUE_APP_REMOTE_API}/login`, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(this.user),
        })
          .then((response) => {
            if (response.ok) {
              return response.text();
            } else {
              this.invalidCredentials = true;
            }
          })
          .then((token) => {
            if (token != undefined) {
              if (token.includes('"')) {
                token = token.replace(/"/g, '');
              }
              this.loginUser(token);
              this.$router.push('/home');
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