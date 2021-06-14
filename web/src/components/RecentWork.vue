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
    const myWork = await this.$store.dispatch('setMyWork')
    console.log(myWork)
    this.posts.push(...myWork.myThreads)
    this.posts.push(...myWork.myComments)

      window.ethereum.on('chainChanged', async ()  => {
        await this.$store.dispatch('connectToBlockchain')
        const myWork = await this.$store.dispatch('setMyWork')
        console.log('chainchanged', myWork)
        this.posts = []
        this.posts.push(...myWork.myThreads)
        this.posts.push(...myWork.myComments)
      })
  },
  methods: {
    handleClick(value) {
      console.log(value)
      this.$router.push(`/thread/${value.threadId}`)
    }
  }

}
</script>
