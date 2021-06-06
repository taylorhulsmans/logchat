<template>
  <v-container>
    <v-row>
      <v-col>
        Title
      </v-col>
      <v-col>
        Url
      </v-col>
      <v-col>
        Creator
      </v-col>
      
    </v-row>
    <v-row
      v-for="(thread, i) in threads"
      :key="i"
      >
      <v-col
        @click="go('internal', thread.id)">
        {{thread.title}}
      </v-col>
      <v-col
        @click="go('external', thread.url)">
        {{thread.url}}
      </v-col>
      <v-col>
        {{thread.creator}}
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import * as HCService from '@/shared/HCService.js'
export default {
  data: () => ({
    threads: [],
  }),
  async created() {
    const threadsFromService= await HCService.getThreads()
    this.threads = threadsFromService.map((thread) => {
      thread.hover = false
      return thread
    })
  },
  methods: {
    go(type, url) {
      switch (type) {
        case 'external':
          if (/\/\//.test(url)) {
            window.open(url, '_blank')
          } else {
            window.open('//' + url, '_blank')
          }
          window.open(url, '_blank')
          break;
        case 'internal':
          console.log(url)
          this.$router.push(`thread/${url}`)
      }
    }
  }
  
}
</script>
