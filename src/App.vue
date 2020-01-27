<template>
  <v-app id="inspire">
    <!-- This is the nav bar code -->
    <v-app-bar app clipped-right color="#5AC161" dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title>Duck Notes</v-toolbar-title>
      <v-spacer />
      <!-- todo dynamic lable to login/register, show user when logged in, have logout attached -->
      <v-label>Login</v-label>
      <img src="./assets/ducknotes.png" width="35px" height="55px" style="margin-left: 5px" />
    </v-app-bar>

    <!-- This is the Menu Drawer to have list of notes and select groups -->
    <v-navigation-drawer v-model="drawer" color="#50E6C4" app>
      <v-list dense>
        <v-list-item @click.stop="left = !left">
          <v-list-item-action>
            <v-icon>mdi-exit-to-app</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Select Groups</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-navigation-drawer v-model="left" fixed temporary color="#ECD632" />

    <!-- ADD PAGES HERE -->
    <LoginBox />
    <Notes />

    <!-- footer stuff -->
    <v-footer app color="#9F684A" class="white--text">
      <span>Duck Notes Inc.</span>
      <v-spacer />
      <span>&copy; 2020</span>
    </v-footer>
  </v-app>
</template>

<script>
import Notes from "./components/Notes.vue";
import LoginBox from "./components/LoginBox.vue";

export default {
  name: "App",

  components: { Notes, LoginBox },

  data: () => ({
    title: "Notes Extreme"
  }),

  props: {
    source: String
  },

  data: () => ({
    drawer: null,
    drawerRight: null,
    right: false,
    left: false
  })
};
</script>

<style scoped>
.v-application {
  background-color: #beb1a4;
  color: black;
}
</style>
