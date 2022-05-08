<template>
  <v-app id="log-chat-app">
    <CreateThread v-if="createThreadBox" />
    <h1>Hello Injection</h1>
    
  </v-app>
</template>

<script>
import {CreateThread} from '@/components/CreateThread.vue'
export default {
  components: {
    CreateThread
  },
  name: 'log-chat-app',

  data: () => ({
    createThreadBox: false,
    //
  }),
  async created() {

    document.addEventListener("DOMContentLoaded", () => {
      chrome.storage.local.get(['createThreadBox'], (res) => {
        console.log(res, 'res')
        this.createThreadBox = res.createThreadBox
      console.log(this.createThreadBox)
      })
    })
    await this.$store.dispatch('connectToBlockchain')
    try {
      window.ethereum.on('chainChanged', async ()  => {
        await this.$store.dispatch('connectToBlockchain')
      })
    } catch (e) {
      console.log(e)
    }
  },
  methods: {
  }
};
</script>
