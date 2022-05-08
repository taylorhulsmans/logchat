<template>
  <v-container>
    <v-btn
      v-show="!isThreadCreated"
      id="createThread"
      @click="isThreadCreated = !isThreadCreated"
      >
      Create Thread 
    </v-btn>
    <v-btn
      v-show="!isCommentsOpen && isThreadCreated"
      id="openComments"
      @click="isCommentsOpen = !isCommentsOpen"
      >
      Open Comments 
    </v-btn>
    <v-btn
      v-show="isCommentsOpen"
      id="closeComments"
      @click="isCommentsOpen = !isCommentsOpen"
      >
      Close Comments
    </v-btn>
  </v-container>
</template>

<script>
import * as HCService from '@/shared/HCService.js'
  export default {
    name: 'HelloWorld',

    data: () => ({
      isThreadCreated: false,
      isCommentsOpen: false,
      thread: null,
    }),
    created() {
      chrome.tabs.query({
        currentWindow: true,
        active: true
      }, async (tabs) => {
        const url = tabs[0].url
        this.thread = await HCService.getThreadByUrl(url)
        console.log(this.thread)
        console.log(url)

      })
    },
    methods: {
    }
  }
</script>
