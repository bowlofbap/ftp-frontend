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
                      label="Email">
          <b-form-input
            v-model.trim="$v.username.$model"
            @input="delayTouch($v.username)"
          ></b-form-input>
          <div v-if="$v.username.$dirty && $v.username.$anyError">
            <div class="invalid-feedback d-block" v-if="!$v.username.required">Required!</div>
          </div>
        </b-form-group>

        <b-form-group class="mt-3" 
                      label="Password"
                      >
          <b-form-input
            v-model.trim="$v.password.$model"
            @input="delayTouch($v.password)"
            type="password"
          ></b-form-input>
          <div v-if="$v.password.$dirty && $v.password.$anyError">
            <div class="invalid-feedback d-block" v-if="!$v.password.required">Required!</div>
            <div class="invalid-feedback d-block" v-if="!$v.password.minLength">Password must have at least {{$v.password.$params.minLength.min}} letters.</div>
            <div class="invalid-feedback d-block" v-if="!$v.password.maxLength">Password must not exceed {{$v.password.$params.maxLength.max}} letters.</div>
            <div class="invalid-feedback d-block" v-if="!$v.password.mustHaveAtLeastOneSpecialCharacter">Password must contain at least one special character (!, @, #, $, etc).</div>
            <div class="invalid-feedback d-block" v-if="!$v.password.mustHaveAtLeastOneLowercaseLetter">Password must contain at least one lower case letter.</div>
            <div class="invalid-feedback d-block" v-if="!$v.password.mustHaveAtLeastOneUppercaseLetter">Password must contain at least one upper case letter.</div>
          </div>
        </b-form-group>

        <b-form-group class="mt-3" 
                      label="Confirm Password">
          <b-form-input
            v-model="$v.confirmPassword.$model"
            @input="delayTouch($v.confirmPassword)"
            type="password"
          ></b-form-input>
          <div v-if="$v.confirmPassword.$dirty && $v.confirmPassword.$anyError">
            <div class="invalid-feedback d-block" v-if="!$v.confirmPassword.sameAsPassword">Passwords must match!</div>
          </div>
        </b-form-group>
      <b-button class="mt-3 mx-auto d-block" type="submit" :disabled="submitStatus === 'PENDING' || $v.$invalid" variant="success">Register</b-button>
      <b-card-sub-title class="mt-4 text-center">Already have an account? <b-link to="login" class="te-secondary-text">Log in!</b-link></b-card-sub-title>
    </b-form>
  </b-card>
</div>
</template>

<script>
import { required, minLength, maxLength, sameAs } from 'vuelidate/lib/validators';

// check if input has been touched
const touchMap = new WeakMap();
 
const specialCharRegex = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/;
const capitalCharRegex = /(?=.*[A-Z])/;
const lowercaseCharRegex = /(?=.*[a-z])/;
const inputTimeoutInMs = 1000;

// Custom Validators
const mustHaveAtLeastOneSpecialCharacter = (value) => specialCharRegex.test(value);
const mustHaveAtLeastOneUppercaseLetter = (value) => capitalCharRegex.test(value);
const mustHaveAtLeastOneLowercaseLetter = (value) => lowercaseCharRegex.test(value);

export default {
  name: 'register',
  components:{
  },
  data() {
    return {
      // user profile
      username: '',
      password: '',
      confirmPassword: '',

      // error handling
      registrationError: false,
      submitStatus: null
    };
  },
  validations: {
    username: {
      required,
    },
    password: {
      required,
      minLength: minLength(7),
      maxLength: maxLength(31),
      mustHaveAtLeastOneSpecialCharacter,
      mustHaveAtLeastOneUppercaseLetter,
      mustHaveAtLeastOneLowercaseLetter
    },
    confirmPassword: {
      sameAsPassword: sameAs('password')
    },
  },
  computed:{
  },
  methods: {
    delayTouch($v) {
      $v.$reset()
      if (touchMap.has($v)) {
        clearTimeout(touchMap.get($v))
      }
      touchMap.set($v, setTimeout($v.$touch, inputTimeoutInMs))
    },
    register() {
      if (!this.$v.$invalid) {
        this.submitStatus = 'PENDING';
        fetch(`${process.env.VUE_APP_REMOTE_API}/users`, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          // TODO: Place user profile in {}
          body: JSON.stringify({
              user: {
                email: this.username,
                password: this.password
              }
            }),
        })
          .then((response) => {
            if (response.ok){
              this.submitStatus = 'OK';
              this.$router.push({ path: '/login', query: { registration: 'success' } });
            } else {
              this.submitStatus = 'ERROR';
              this.registrationError = true;
            }
          })
          .catch((err) => {
            this.submitStatus = 'ERROR';
            console.error(err);
          });
      } else {
        this.registrationError = true;
        this.submitStatus = 'ERROR';
      }
    },
    setUrl(url){
      this.profilePicUrl = url;
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