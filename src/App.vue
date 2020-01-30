<template>
  <v-app id="inspire">
    <!-- This is the nav bar code -->
    <v-app-bar app clipped-right color="#5AC161" dark>
      <v-app-bar-nav-icon class="black--text" v-on:click="drawer = !drawer; getGroups();" />
      <v-img
        src="./assets/ducknotes.png"
        max-height="42px"
        max-width="30px"
        @click="$root.page='notes'"
        class="mx-2"
      />
      <v-toolbar-title class="black--text">Duck Notes</v-toolbar-title>
      <v-spacer />
      <v-app-bar-nav-icon
        class="black--text mr-2"
        @click="$root.page='login'"
        v-if="!$root.user"
      >Login</v-app-bar-nav-icon>
      <v-app-bar-nav-icon class="black--text mr-2" @click="logout" v-if="$root.user">Logout</v-app-bar-nav-icon>
    </v-app-bar>

    <!-- This is the Menu Drawer to have list of notes -->
    <v-navigation-drawer v-model="drawer" color="#50E6C4" app>
      <v-list dense>
        <v-list-item @click="left = !left">
          <v-icon class="mr-5">mdi-page-next-outline</v-icon>
          <v-list-item-title>Select Group</v-list-item-title>
        </v-list-item>
        <v-list-item @click="createNotes()">
          <v-icon class="mr-5">mdi-pencil-plus-outline</v-icon>
          <v-list-item-title>Create New</v-list-item-title>
        </v-list-item>
        <v-list-item-action></v-list-item-action>
        <v-list-item v-for="item in $root.noteList" :key="item.text">
          <v-list-item-content>
            <v-list-item-title>
              <v-icon class="mr-5">mdi-note-outline</v-icon>
              {{item.text}}
              <v-icon class="float-right" v-on:click="removeNotes()">mdi-close-circle</v-icon>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <!-- drawerception -->
    <v-navigation-drawer v-model="left" fixed temporary color="#ECD632">
      <v-list dense>
        <v-list-item @click="left = false">
          <v-icon class="mr-5">mdi-page-previous-outline</v-icon>
          <v-list-item-title>Back To Notes</v-list-item-title>
        </v-list-item>

        <v-list-item @click="createGroup">
          <v-icon class="mr-5">mdi-plus-box-multiple-outline</v-icon>
          <v-list-item-title>New Group</v-list-item-title>
        </v-list-item>

        <v-list-item-action></v-list-item-action>

        <v-list-item @click="$root.currentGroup = ''; getNotes();">
          <v-list-item-title>
            <v-icon class="mr-5">mdi-note-multiple-outline</v-icon>All
          </v-list-item-title>
        </v-list-item>
        <v-list-item
          v-for="item in $root.groupList"
          :key="item.text"
          @click="$root.currentGroup = item._id; getNotes();"
        >
          <v-list-item-content>
            <v-list-item-title>
              <v-icon class="mr-5">mdi-note-multiple-outline</v-icon>
              {{item.text}}
            </v-list-item-title>
          </v-list-item-content>
          <v-list-item-icon v-on:click="removeGroup()">
            <v-icon>mdi-close-circle</v-icon>
          </v-list-item-icon>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <!-- confirm box -->
    <v-dialog v-model="confirmDelete" max-width="290">
      <v-card>
        <v-card-title>Are you sure you want to delete?</v-card-title>
        <v-card-text>If you are deleting a group it will delete all notes associated with it.</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="#5ac161" text @click="confirmDelete = false">Don't Delete</v-btn>
          <v-btn color="#9f684a" text @click="confirmDelete = false">Delete Anyway</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- https://vuetifyjs.com/en/components/dialogs replace login and register with diolog boxes add notes to home page -->
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
    left: false,
    confirmDelete: false
  }),

  methods: {
    logout() {
      this.$root.user = "";
      this.$root.id = "";
      this.$root.groupList = [];
      this.$root.noteList = [];
    },
    getGroups() {
      let dataToSend = {
        _id: this.$root.id
      };
      $.get(server + "/groups", dataToSend, res => {
        if (res.success) {
          this.$root.groupList = res.groups;
        }
      });
    },
    getNotes() {
      let dataToSend = {
        groupId: this.$root.currentGroup
      };
      $.get(server + "/notes", dataToSend, res => {
        console.log(res);
        if (res.success) {
          this.$root.noteList = res.notes;
        }
      });
    },
    createGroup() {
      return 1;
      // req (name)
      // res (groups[])
    },
    createNotes() {
      return 1;
      // req (text, ?groupId)
      // res (notes[])
    },
    removeGroup() {
      this.confirmDelete = true;
    },
    removeNotes() {
      this.confirmDelete = true;
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
