<template>
  <div class="home">
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'home',
  components: {
  },
  data(){
    return{
    }
  },
  computed:{
    ...mapGetters(['allToasts', 'getCurrentUser']),
    showReactivateToast(){
      return this.getCurrentUser && this.getCurrentUser.reactivated && !this.allToasts.includes('reactivated');
    }
  },
  methods: {
      ...mapActions(['addToast']),
  },
  created(){
  },
}
</script>
