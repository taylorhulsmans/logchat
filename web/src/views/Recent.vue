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
import { mapState } from 'vuex'
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
  }),
  async created() {
    this.$store.dispatch('getRecentThreads')
    window.ethereum.on('chainChanged', async ()  => {
      await this.$store.dispatch('connectToBlockchain')
      await this.$store.dispatch('getRecentThreads')
    })
  },
  methods: {
    handleClick(val) {
      this.$router.push(`/thread/${val.id}`)
    }
  },
  computed: {
    ...mapState([
      'threads'
    ])
  }
  
}
</script>
