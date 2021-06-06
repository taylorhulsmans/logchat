<template>
  <v-container
    style="padding-left: 23vw; margin: 0;"
    >
    <v-navigation-drawer
      width="23%"
      permanent
      absolute
    >
      <v-list nav>
        <v-list-item-group>
        <v-list-item
          v-for="([name, icon, text], i) in items"
          :key="i"
          @click="switchFrame(name)"
          link
        >
          <v-list-item-icon>
            <v-icon>{{ icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ text }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        </v-list-item-group>
      </v-list>
		<!--  -->
    </v-navigation-drawer>
      <v-container>
        <component
          :is="activeSelection">
        </component>
      </v-container>

  </v-container>
</template>
<script>
import CreateThread from '@/components/CreateThread.vue'
import DashComponents from '@/components/DashComponents.vue'
import RecentWork from '@/components/RecentWork.vue'
export default {
  components: {
    CreateThread,
    DashComponents,
    RecentWork
  },
  data: () => ({
    activeSelection: 'DashComponents',
    items: [
      ['DashComponents','mdi-view-dashboard', 'Dashboard'],
      ['CreateThread','mdi-pencil', 'Create Thread'],
      ['RecentWork','mdi-format-list-text', 'Recent Work']
    ]
}),
  methods: {
    switchFrame(name) {
      this.activeSelection = name
    }
  }
}
</script>
