import Vue from 'vue'
import App from './App.vue'
import vuetify from '../plugins/vuetify'
/* eslint-disable no-new */
new Vue({
  vuetify,
  el: '#app',
  render: h => h(App)
})


document.getElementById('openComments').addEventListener('click', () => {
  chrome.tabs.executeScript({
    file: 'js/content-script.js'
  })
  chrome.storage.local.set({isCommentsOpen: true}, () => {
    console.log('a')
  })
    console.log('b')
})
document.getElementById('closeComments').addEventListener('click', () => {
  chrome.tabs.executeScript({
    code: "document.getElementById('hashed-comments-app').remove()"
  })
  chrome.storage.local.set({isCommentsOpen: false}, () => {
    console.log('a')
  })
  
})
