<template>
  <v-app id="inspire">
    <!-- This is the nav bar code -->
    <v-app-bar app clipped-right color="#5AC161" dark>
      <v-app-bar-nav-icon class="black--text" @click="drawer = !drawer" />
      <v-img src="./assets/ducknotes.png" max-height="42px" max-width="30px" @click="$root.page='notes'" class="mx-2" />
      <v-toolbar-title class="black--text">Duck Notes</v-toolbar-title>
      <v-spacer />
      <!-- todo dynamic lable to login, show user when logged in, have logout attached -->
      <v-app-bar-nav-icon class="black--text mr-2" @click="$root.page='login'" v-if="!$root.user">Login</v-app-bar-nav-icon>
      <v-app-bar-nav-icon class="black--text mr-2" @click="logout" v-if="$root.user">Logout</v-app-bar-nav-icon>
    </v-app-bar>

    <!-- This is the Menu Drawer to have list of notes -->
    <v-navigation-drawer v-model="drawer" color="#50E6C4" app>
      <v-list dense>
        <v-list-item @click="left = !left">
          <v-icon>mdi-page-next-outline</v-icon>
          <v-list-item-title>Select Group</v-list-item-title>
        </v-list-item>
            <v-list-item @click="createNotes()">
          <v-icon>mdi-pencil-plus-outline</v-icon>
          <v-list-item-title>Create New</v-list-item-title>
        </v-list-item>
        <v-list-item-action></v-list-item-action>
        <v-list-item v-for="item in $root.noteList" :key="item.title">
          <v-list-item-content>
            <v-list-item-title><v-icon>mdi-note-outline</v-icon>{{item.title}}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <!-- drawerception -->
    <v-navigation-drawer v-model="left" fixed temporary color="#ECD632">
      <v-list dense>
            <v-list-item @click="left = false">
          <v-icon>mdi-page-previous-outline</v-icon>
          <v-list-item-title>Back To Notes</v-list-item-title>
        </v-list-item>

          <v-list-item @click="createGroup">
          <v-icon>mdi-plus-box-multiple-outline</v-icon>
          <v-list-item-title>New Group</v-list-item-title>
          </v-list-item>
        
          <v-list-item-action></v-list-item-action>
        <!-- todo add select function for groups -->
        <v-list-item v-for="item in $root.groupList" :key="item.text" @click="removeGroup">
          <v-list-item-content>
            <v-list-item-title><v-icon>mdi-note-multiple-outline</v-icon>{{item.text}}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

      </v-list>
    </v-navigation-drawer>

    <!-- ADD PAGES HERE -->
    <Register v-if="$root.page=='register'" />
    <LoginBox v-if="$root.page=='login'" />
    <Notes v-if="$root.page=='notes'" />

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
import Register from "./components/Register";
import Jquery from "jquery";

const $ = Jquery;
const server = "https://supernotes.duckdns.org";

export default {
  name: "App",

  components: { Notes, LoginBox, Register },
  

  data: () => ({
    title: "Notes Extreme",
    drawer: false,
    left: false
  }),

methods:{
  logout(){
    this.$root.user = "";
    this.$root.id = "";
    this.$root.groupList = [];
  },
  getNotes(){
    return 1
    // req (?groupId)
    // res (notes[])
  },
  createGroup(){
    return 1
    // req (name)
    // res (groups[])
  },
  createNotes(){
    return 1
    // req (text, ?groupId)  
    // res (notes[])
  },
  removeGroup(){
    return 1
    // req (groupId)
    // res (groups[])
  },
  removeNotes(){
    return 1
    // req (noteId, ?groupId)
    // res (notes[])
  }

},

  props: {
    source: String
  }
};


</script>

<style scoped>
.v-application {
  background-color: #beb1a4;
  color: black;
}
</style>
