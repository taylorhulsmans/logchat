<template>
  <v-app>
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

      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-cube-scan</v-icon>
      </v-btn>

      <v-btn icon>
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

export default {
  name: 'App',

  data: () => ({
    //
  }),
};
</script>
<style>
.v-app-bar-title__content{
  width:300px;
}
</style>
