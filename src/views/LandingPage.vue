<template>
<b-container style="margin-top: 4%; margin-bottom: 4%;">
    <b-row>
        <b-col class="my-auto">
           <b-card
                    class="mx-auto text-center shadow p-3 bg-white"
                    bg-variant="light" 
                    style="width:20rem"
            >   
                <b-img src="@/images/logo.png" fluid/>
                <div class="border-top my-2"></div>
                <login-form/>
                <div class="border-top my-3"></div>
            </b-card>
        </b-col>
    </b-row>
</b-container>
</template>

<script>
import LoginForm from '@/components/LoginForm';

export default {
  components:{
    LoginForm
  }
};
</script>

<style>
</style>