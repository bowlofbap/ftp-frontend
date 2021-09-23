<template>
<div>
  <b-card
    class="mx-auto text-center shadow p-3 mb-5 bg-white rounded card"
    bg-variant="light" 
  >
  <login-form/>
  </b-card>
</div>
</template>


<script>
import LoginForm from '@/components/LoginForm';

export default {
  components:{
    LoginForm
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