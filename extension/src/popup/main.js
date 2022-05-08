import Vue from 'vue'
import App from './App.vue'
import vuetify from '../plugins/vuetify'
//import * as HCService from '@/shared/HCService.js'
/* eslint-disable no-new */
new Vue({
  vuetify,
  el: '#app',
  render: h => h(App)
})


document.addEventListener("init", () => {
  console.log(window.location.href)
})

document.getElementById('openComments').addEventListener('click', () => {
  chrome.tabs.executeScript({
    file: 'js/content-script.js'
  })
  chrome.storage.local.set({isCommentsOpen: true}, () => {
  })
})
document.getElementById('closeComments').addEventListener('click', () => {
  chrome.tabs.executeScript({
    code: "document.getElementById('log-chat-app').remove()"
  })
  chrome.storage.local.set({isCommentsOpen: false}, () => {
  })
})
document.getElementById('createThread').addEventListener('click', () => {
  chrome.storage.local.set({
    createThreadBox: true
  }, () => {
    chrome.tabs.executeScript({
      file: 'js/content-script.js'
    })
  })
})
