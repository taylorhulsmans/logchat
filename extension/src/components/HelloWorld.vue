<template>
  <v-container>
    <v-btn
      v-show="!isCommentsOpen"
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
  export default {
    name: 'HelloWorld',

    data: () => ({
      isCommentsOpen: false,
    }),
    created() {
      document.addEventListener("DOMContentLoaded", () => {
        chrome.storage.local.get(['isCommentsOpen'], (res) => {
          console.log(res, 'res')
          this.isCommentsOpen =  res.isCommentsOpen
        console.log(this.isCommentsOpen)
        })
      })
    }
  }
</script>
