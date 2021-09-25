import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import VueClipboard from 'vue-clipboard2'
import Vuelidate from 'vuelidate'
import './plugins/bootstrap-vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Chartkick from 'vue-chartkick'
import Chart from 'chart.js'
import { IconsPlugin } from 'bootstrap-vue'


Vue.config.productionTip = false
Vue.use(IconsPlugin)
Vue.use(VueClipboard)
VueClipboard.config.autoSetContainer = true
Vue.use(Chartkick.use(Chart))
Vue.use(Vuelidate);

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
