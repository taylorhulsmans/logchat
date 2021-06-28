<template>
  <v-app id="hashed-comments-app">
    <h1>Hello Injection</h1>
  </v-app>
</template>

<script>

export default {
  name: 'hashed-comments-app',

  data: () => ({
    //
  }),
  async created() {
    window.addEventListener("resize", this.getBanner)
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
