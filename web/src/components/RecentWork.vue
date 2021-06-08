<template>
  <v-container>
    <v-data-table
      :headers="headers"
      :items="posts"
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
        text: 'Post Type',
        align: 'start',
        sortable: 'false',
        value: 'postType'
      },
      { text: 'thread', value: 'threadId' },
    ],
    posts: [],
  }),
  async created() {
    const myWork = await HCService.getMyWork()
    this.posts.push(...myWork.myThreads)
    this.posts.push(...myWork.myComments)

    try {
      window.ethereum.on('chainChanged', async ()  => {
        const myWork = await HCService.getMyWork()
        this.posts = []
        this.posts.push(...myWork.myThreads)
        this.posts.push(...myWork.myComments)
      })
    } catch (e) {
      console.log(e)
    }
  },
  methods: {
    handleClick(value) {
      console.log(value)
      this.$router.push(`/thread/${value.threadId}`)
    }
  }

}
</script>
