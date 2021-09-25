<template>
  <div>
    <b-alert class="mt-3" v-model="registrationError" variant="danger" dismissible>
      Error while adding a new scholar!
    </b-alert>

    <b-card-title class="text-center">Add New Scholar</b-card-title>
    
    <b-form @submit.prevent="register">
        <b-form-group class="mt-4" 
                      label="Scholar Name" 
                      :state="nameFilled" 
                      :invalid-feedback="nameFilledFeedback">
          <b-form-input
            v-model="scholar.name"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group class="mt-3" label="Scholar Ronin Address"
                      :state="addressFilled" 
                      :invalid-feedback="addressFilledFeedback">
          <b-form-input
            v-model="scholar.address"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group class="mt-3" label="Scholar Personal Ronin Address"
                      :state="personalAddressFilled" 
                      :invalid-feedback="personalAddressFilledFeedback">
          <b-form-input
            v-model="scholar.personal_address"
            required
          ></b-form-input>
        </b-form-group>

      <b-button class="mt-3 mx-auto d-block" type="submit" variant="success">Add Scholar</b-button>
    </b-form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'add-new-scholar-form',
  components:{
  },
  data() {
    return {
      scholar: {
        name: '',
        address: '',
        personal_address: '',
        manager_id: 0
      },
      registrationError: false,
    };
  },
  computed:{
    ...mapGetters(['getCurrentUser', 'getToken']),
    nameFilled(){
      return this.scholar.name.length > 0;
    },
    addressFilled(){
      return this.scholar.address.length > 0;
    },
    personalAddressFilled(){
      return this.scholar.personal_address.length > 0;
    },
    nameFilledFeedback(){
      if (this.scholar.name.length < 1){
        return "Required!"
      }
      return ""
    },
    addressFilledFeedback(){
      if (this.scholar.address.length < 1){
        return "Required!"
      }
      return ""
    },
    personalAddressFilledFeedback(){
      if (this.scholar.personal_address.length < 1){
        return "Required!"
      }
      return ""
    }
  },
  methods: {
    register() {
      if (this.nameFilled && this.addressFilled && this.personalAddressFilled)
        fetch(`${process.env.VUE_APP_REMOTE_API}/api/managers/${this.getCurrentUser.sub}`, {
          method: 'PUT',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+this.getToken,
          },
          body: JSON.stringify({
            scholars:{
              name: this.scholar.name,
              address: this.scholar.address,
              personal_address: this.scholar.personal_address
            }
          }),
        })
          .then((response) => {
            if (response.ok){
              console.log(response)
              this.$emit('update')
            }else{
              this.registrationError = true;
            }
          })
          .catch((err) => console.error(err));
      else{
        this.registrationError = true;
      }
    },
    resetScholarObject(){
      this.scholar.name = ''
      this.scholar.address = ''
      this.scholar.personal_address = ''
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