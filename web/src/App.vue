<template>
  <v-app>
    <v-system-bar
      window
      dark
      app
      height="33">
      <v-icon>mdi-alert</v-icon>
      <span>HashedComments is Beta, please use at your own risk</span>
    </v-system-bar>
    <v-app-bar
      absolute
      app
      :src="require('@/assets/background-logo-optimized.gif')"
      color="#6A76AB"
      dark
      shrink-on-scroll
      fade-img-on-scroll
      prominent
    >
      <template v-slot:img="{ props }">
        <v-img
          v-bind="props"
          gradient="to top right, rgba(100,115,201,.7), rgba(25,32,72,.7)"
        ></v-img>
      </template>

      <v-app-bar-nav-icon style="display:none;"></v-app-bar-nav-icon>

      <v-app-bar-title>Hashed Comments</v-app-bar-title>

      <v-spacer></v-spacer>
      <v-chip
        class="ma-2"
        outlined
        pill
        text-color="white">
        <v-icon left>
          mdi-link-lock
        </v-icon>
        {{currentNetwork}}
      </v-chip>
      <v-btn
        icon
        href="https://github.com/Joe-mcgee/Hashed-Comments"
        target="_blank">
        <v-icon>mdi-github</v-icon>
      </v-btn>

      <v-btn
        icon
        :href="etherscan"
        target="_blank">
        <v-icon>mdi-cube-scan</v-icon>
      </v-btn>

      <v-btn
        icon
        href="/how-to">
        <v-icon>mdi-note-search-outline</v-icon>
      </v-btn>

      <template v-slot:extension>
        <v-tabs align-with-title>
          <v-tab to="/">Home</v-tab>
          <v-tab to="/dashboard">Dashboard</v-tab>
          <v-tab to="/recent">Recent</v-tab>
        </v-tabs>
      </template>
    </v-app-bar>
    <v-main>
      <v-sheet
        id="scrolling-techniques-3"
        class="overflow-y-auto"
        >
				<router-view></router-view>
      </v-sheet>
    </v-main>
	</v-app>
</template>

<script>
import * as HCService from '@/shared/HCService.js'
export default {
  name: 'App',

  data: () => ({
    etherscan: '',
    currentNetwork: '',
    //
  }),
  async created() {
    this.currentNetwork = await HCService.getCurrentNetwork()
  try {
    window.ethereum.on('chainChanged', async (chainId)  => {
      this.currentNetwork = await HCService.getCurrentNetwork(chainId)
    })
  } catch (e) {
    console.log(e)
  }
    const address = await HCService.getContractAddr()
    switch (this.currentNetwork) {
      case 'Ethereum':
        this.etherscan = `https://etherscan.io/address/${address}`
        break
      case 'Avalanche':
        this.etherscan = `https://cchain.explorer.avax.network/address/${address}/contracts`
        break
      case 'BSC (buggy)':
        this.etherscan = `https://bscscan.com/address/${address}`
        break
      case 'Polygon (Matic)(buggy)':
        this.etherscan = `https://polygon-explorer-mainnet.chainstacklabs.com/address/${address}/transactions`
        break
    }
  }
};
</script>
<style>
.v-app-bar-title__content{
  width:300px;
}
</style>
