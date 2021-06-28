<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <v-img
          :src="require('../assets/hashed-comments-animated.gif')"
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
          Instructions (Fantom Opera) (Even Cheaper)
        </h2>

        <v-row justify="center">
          <a
            v-for="(next, i) in whatsNextFantom"
            :key="i"
            :href="next.href"
            class="subheading mx-3"
            target="_blank"
          >
            {{ next.text }}
          </a>
        </v-row>
        <br />
        <h2 class="headline font-weight-bold mb-3">
          Instructions (Avalanche) (Cheaper)
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
        <br />
        <h2 class="headline font-weight-bold mb-3">
          Instructions (Ethereum) (More Botnet Resistance)
        </h2>

        <v-row justify="center">
          <a
            v-for="(next, i) in whatsNextTwo"
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
        }
      ],
      whatsNextFantom: [

        {
          text: 'Get a little Fantom',
          href: 'https://fantom.foundation/where-to-buy-ftm/',
        },
        {
          text: 'Install Metamask',
          href: 'https://metamask.io/',
        },
        {
          text: 'Add Fantom (opera) to Metamask',
          href: 'https://docs.fantom.foundation/tutorials/set-up-metamask',
        },
        {
          text: 'Lurking: Browse Recent Threads',
          href: '/recent',
        },
        {
          text: 'Basic Usage',
          href: '/how-to',
        },
      ],

      whatsNextTwo: [
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
      whatsNext: [
        {
          text: 'Create an Avalanche Wallet',
          href: 'https://wallet.avax.network/',
        },
        {
          text: 'Buy some AVAX from an exchange and Send to Wallet',
          href: 'https://coinmarketcap.com/currencies/avalanche/markets/',
        },
        {
          text: 'Install Metamask',
          href: 'https://metamask.io/',
        },
        {
          text: 'Send C-Chain AVAX to Metamask',
          href: 'https://support.avax.network/en/articles/4626956-how-do-i-set-up-metamask-on-avalanche',
        },
        {
          text: 'Lurking: Browse Recent Threads',
          href: '/recent',
        },
        {
          text: 'Basic Usage',
          href: '/how-to',
        },
      ],
      contractAddr: ''
    })
  }
</script>
