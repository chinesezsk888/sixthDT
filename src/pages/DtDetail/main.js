import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
// import '../../../public/js/rem'
Vue.config.productionTip = false
Vue.prototype.axios = axios
new Vue({
  render: h => h(App)
}).$mount('#app')
