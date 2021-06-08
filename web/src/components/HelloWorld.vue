<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <v-img
          :src="require('../assets/logo.gif')"
          class="my-3"
          contain
          height="200"
        />
      </v-col>

      <v-col class="mb-4">
        <h1 class="display-2 font-weight-bold mb-3">
          Welcome to Hashed Comments
        </h1>

        <p class="subheading font-weight-regular">
          Comment Sections that are Uncensorable, Consistent, and Pricer to AI ChatBot Swarm.
        </p>
      </v-col>

      <v-col
        class="mb-5"
        cols="12"
      >
        <h2 class="headline font-weight-bold mb-3">
          Instructions
        </h2>

        <v-row justify="center">
          <a
            v-for="(next, i) in whatsNext"
            :key="i"
            :href="next.href"
            class="subheading mx-3"
            target="_blank"
          >
            {{ next.text }}
          </a>
        </v-row>
      </v-col>

      <v-col
        class="mb-5"
        cols="12"
      >
        <h2 class="headline font-weight-bold mb-3">
          Important Links
        </h2>

        <v-row justify="center">
          <a
            v-for="(link, i) in importantLinks"
            :key="i"
            :href="link.href"
            class="subheading mx-3"
            target="_blank"
          >
            {{ link.text }}
          </a>
        </v-row>
      </v-col>

      
      <v-col
        class="mb-5"
        cols="12"
      >
        <h2 class="headline font-weight-bold mb-3">
          Support More Tech Like This
        </h2>

        <v-row justify="center">
          <p>0x3bE057bBAF734770c8a4CA81e2Abbdc29deb39F0</p>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import * as HCService from '@/shared/HCService.js'
  export default {
    name: 'HelloWorld',

    data: () => ({
      ecosystem: [
        {
          text: 'vuetify-loader',
          href: 'https://github.com/vuetifyjs/vuetify-loader',
        },
        {
          text: 'github',
          href: 'https://github.com/vuetifyjs/vuetify',
        },
        {
          text: 'awesome-vuetify',
          href: 'https://github.com/vuetifyjs/awesome-vuetify',
        },
      ],
      importantLinks: [
        {
          text: 'Litepaper',
          href: '/about',
        },
        {
          text: 'Github',
          href: 'https://github.com/joe-mcgee/hashed-comments',
        },
        {
          text: 'Etherscan',
          href: ``,
        },
      ],
      whatsNext: [
        {
          text: 'Install Metamask',
          href: 'https://metamask.io/',
        },
        {
          text: 'Lurking: Browse Recent Threads',
          href: '/recent',
        },
        {
          text: 'Get a little ETH',
          href: 'https://ethereum.org/en/get-eth/',
        },
        {
          text: 'Basic Usage',
          href: '/how-to',
        },
      ],
      contractAddr: ''
    }),
    async created() {
      const contractAddr = await HCService.getContractAddr()
      this.importantLinks[2].href = `https://etherscan.io/address/${contractAddr}`
    }
  }
</script>
