<template>
<div>
  <b-card
    class="mt-5 mx-auto shadow p-3 mb-5 bg-white rounded card"
    bg-variant="light" 
  >
    <b-alert class="mt-3" v-model="registrationError" variant="danger" dismissible>
      Error during registration!
    </b-alert>

    <b-card-title class="text-center">Registration</b-card-title>
    
    <b-form @submit.prevent="register">
        <b-form-group class="mt-4" 
                      label="Username" 
                      :state="usernameValid" 
                      :invalid-feedback="usernameInvalidFeedback">
          <b-form-input
            v-model="userProfile.username"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group class="mt-3" 
                      label="Password"
                      :state="passwordStrong" 
                      :invalid-feedback="passwordStrongFeedback">
          <b-form-input
            v-model="userProfile.password"
            required
            type="password"
          ></b-form-input>
        </b-form-group>

        <b-form-group class="mt-3" 
                      label="Confirm Password"
                      :state="passwordMatches" 
                      :invalid-feedback="passwordMatchesFeedback">
          <b-form-input
            v-model="userProfile.confirmPassword"
            required
            type="password"
          ></b-form-input>
        </b-form-group>

        <b-form-group class="mt-3" label="First Name"
                      :state="firstNameFilled" 
                      :invalid-feedback="firstNameFilledFeedback">
          <b-form-input
            v-model="userProfile.firstName"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group class="mt-3" label="Last Name"
                      :state="lastNameFilled" 
                      :invalid-feedback="lastNameFilledFeedback">
          <b-form-input
            v-model="userProfile.lastName"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group class="mt-3" label="Profile Picture (Optional)">
        </b-form-group>
      <b-button class="mt-3 mx-auto d-block" type="submit" variant="success">Register</b-button>
      <b-card-sub-title class="mt-4 text-center">Already have an account? <b-link to="login" class="te-secondary-text">Log in!</b-link></b-card-sub-title>
    </b-form>
  </b-card>
</div>
</template>

<script>

export default {
  name: 'register',
  components:{
  },
  data() {
    return {
      userProfile: {
        username: '',
        password: '',
        confirmPassword: '',
        role: 'user',
        id: null,
        firstName: '',
        lastName: '',
        profilePicUrl: ''
      },
      registrationError: false,
      specialCharRegex: /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/,
      capitalCharRegex: /(?=.*[A-Z])/,
      lowercaseCharRegex: /(?=.*[a-z])/
    };
  },
  computed:{
    usernameValid(){
      return this.userProfile.username.length > 4 && this.userProfile.username.length < 15 ? true : false;
    },
    usernameInvalidFeedback(){
      if (this.userProfile.username.length > 14) {
        return "Username too long!";
      }else if (this.userProfile.username.length < 5){
        return "Please enter more than 4 characters."
      }
      return "";
    },
    passwordStrong(){
      return this.userProfile.password.length > 7 && this.userProfile.password.length < 31 && this.specialCharRegex.test(this.userProfile.password) && this.capitalCharRegex.test(this.userProfile.password) && this.lowercaseCharRegex.test(this.userProfile.password)
    },
    passwordStrongFeedback(){
      if (this.userProfile.password.length < 8) {
        return "Password must be at least 8 characters long."
      }else if (this.userProfile.password.length > 30) {
        return "Password cannot exceed 30 characters."
      }else if (!this.specialCharRegex.test(this.userProfile.password)){
        return "Password must contain at least one special character (!, @, #, $, etc)."
      }else if (!this.capitalCharRegex.test(this.userProfile.password)){
        return "Password must contain at least one upper case letter."
      }else if (!this.lowercaseCharRegex.test(this.userProfile.password)){
        return "Password must contain at least one lower case letter."
      }
      return "";
    },
    passwordMatches(){
      return this.userProfile.password === this.userProfile.confirmPassword;
    },
    passwordMatchesFeedback(){
      if (this.userProfile.password !== this.userProfile.confirmPassword){
        return "Passwords must match!"
      }
      return "";
    },
    firstNameFilled(){
      return this.userProfile.firstName.length > 0;
    },
    firstNameFilledFeedback(){
      if (this.userProfile.firstName.length < 1){
        return "Required!"
      }
      return ""
    },
    lastNameFilled(){
      return this.userProfile.lastName.length > 0;
    },
    lastNameFilledFeedback(){
      if (this.userProfile.lastName.length < 1){
        return "Required!"
      }
      return ""
    }
  },
  methods: {
    register() {
      if (this.usernameValid && this.passwordStrong && this.passwordMatches && this.firstNameFilled && this.lastNameFilled)
        fetch(`${process.env.VUE_APP_REMOTE_API}/register`, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(this.userProfile),
        })
          .then((response) => {
            if (response.ok){
              this.$router.push({ path: '/login', query: { registration: 'success' } });
            }else{
              this.registrationError = true;
            }
          })
          .catch((err) => console.error(err));
      else{
        this.registrationError = true;
      }
    },
    setUrl(url){
      this.userProfile.profilePicUrl = url;
    }
  }
};
</script>

<style scoped>
.card{
  width: 25rem;
  height: 60%;
  margin-top: 10%;
}
</style>