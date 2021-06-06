import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'

Vue.config.productionTip = false

window.addEventListener('load', async function () {
  try {
    return await window.ethereum.request({
      method: 'eth_requestAccounts'
    }) 
  } catch (e) {
    console.log(e)
  }
})
Vue.prototype.$vueEventBus = new Vue();
new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
