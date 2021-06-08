<template>
  <v-container>
    <v-data-table
      :headers="headers"
      :items="threads"
      @click:row="handleClick"
      >
    </v-data-table>
  </v-container>
</template>
<script>
import * as HCService from '@/shared/HCService.js'
export default {
  data: () => ({
    headers: [
      {
        text: 'Title',
        align: 'start',
        sortable: 'false',
        value: 'title'
      },
      { text: 'URL', value: 'url' },
      { text: 'creator', value: 'creator' }
    ],
    threads: [],
  }),
  async created() {
    const threadsFromService= await HCService.getThreads()
    this.threads = threadsFromService.map((thread) => {
      thread.hover = false
      return thread
    })
    try {
      window.ethereum.on('chainChanged', async ()  => {
        const threadsFromService= await HCService.getThreads()
        this.threads = threadsFromService.map((thread) => {
          thread.hover = false
          return thread
        })
      })
    } catch (e) {
      console.log(e)
    }
  },
  methods: {
    handleClick(val) {
      this.$router.push(`/thread/${val.id}`)
    }
  }
  
}
</script>
