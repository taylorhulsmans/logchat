console.log('Hello from the content-script')


import Vue from 'vue'
import App from '../App.vue'
import router from '../router'
import store from '../store'
import vuetify from '../plugins/vuetify'

Vue.config.productionTip = false
const div = document.createElement("div")
document.body.insertBefore(div, document.body.firstChild);
new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount(div)
