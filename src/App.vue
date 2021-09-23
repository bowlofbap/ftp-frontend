<template>
  <div id="app">
    <nav-bar/>
    <div class="content">
      <router-view/>
    </div>
  </div>
</template>

<script>
import NavBar from "@/components/NavBar.vue"
export default {
  components:{
    NavBar
  }
}
</script>

<style>
.content{
  padding-top: 50px;
}
.te-primary{
  color: white;
  background-color:#ffa452
}
.te-secondary{
  color: white;
  background-color: #67b3ec;
}
.te-accent{
  color:#ab716f
}
.te-primary-text{
  color: #ffa452;
}
.te-secondary-text{
  color: #67b3ec;
}
.te-accent-text{
  color:#e9645f
}
body{
  background-color:#fafafa;
}
.btn-secondary:hover, .btn-secondary:focus, .btn-secondary:active, .btn-secondary.active, .open>.dropdown-toggle.btn-secondary {
    color: white;
    background-color: #67b3ec;
    border-color: white; /*set the color you want here*/
}
.btn-secondary{
    color: #67b3ec;
    background-color: white;
    border-color: #67b3ec; /*set the color you want here*/
}
.btn-success:hover, .btn-success:focus, .btn-success:active, .btn-success.active, .open>.dropdown-toggle.btn-success {
    color: white;
    background-color: #67b3ec!important;
    border-color: #67b3ec!important; /*set the color you want here*/
}
.btn-success{
    color: white;
    background-color: #67b3ec;
    border-color: white; /*set the color you want here*/
}
.plain{
 text-decoration: none;
 display: inline-block
}
.dark{
    background-color: #d5d5d5;
}
</style>