<template>
  <v-app id="inspire" style="
    background: #beb1a4;">
    <!-- This is the nav bar -->
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
      <v-app-bar-nav-icon class="black--text mr-4" @click="loginBox=true" v-if="!$root.user">Login</v-app-bar-nav-icon>
      <v-app-bar-nav-icon class="black--text mr-4" @click="logout" v-if="$root.user">Logout</v-app-bar-nav-icon>
    </v-app-bar>

    <!-- This is the Menu Drawer to have list of notes -->
    <v-navigation-drawer v-model="drawer" color="#50E6C4" app>
      <v-list dense>
        <v-list-item @click="left = !left">
          <v-icon class="mr-5">mdi-page-next-outline</v-icon>
          <v-list-item-title>Select Group</v-list-item-title>
        </v-list-item>
        <v-list-item @click="$root.currentNote = ''; clearCurrentNoteBox(); drawer = false">
          <v-icon class="mr-5">mdi-pencil-plus-outline</v-icon>
          <v-list-item-title>Create New</v-list-item-title>
        </v-list-item>
        <v-list-item-action></v-list-item-action>
        <v-list-item
          v-for="item in $root.noteList"
          :key="item.text"
          @click="$root.currentNote = item._id; $root.currentNoteText = item.text"
        >
          <v-list-item-content>
            <v-list-item-title>
              <v-icon class="mr-5">mdi-note-outline</v-icon>
              {{item.text}}
            </v-list-item-title>
          </v-list-item-content>
          <v-list-item-icon
            @click="$root.currentNote = item._id; deleteGroup = false; removeNotes()"
          >
            <v-icon>mdi-close-circle</v-icon>
          </v-list-item-icon>
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

        <v-list-item @click="newGroupBox=true">
          <v-icon class="mr-5">mdi-plus-box-multiple-outline</v-icon>
          <v-list-item-title>New Group</v-list-item-title>
        </v-list-item>

        <v-list-item-action></v-list-item-action>

        <v-list-item
          v-if="$root.user"
          @click="$root.currentGroup = ''; $root.currentGroupName=''; getNotes();"
        >
          <v-list-item-title>
            <v-icon class="mr-5">mdi-note-multiple-outline</v-icon>All
          </v-list-item-title>
        </v-list-item>
        <v-list-item
          v-for="item in $root.groupList"
          :key="item.text"
          @click="$root.currentGroup = item._id; $root.currentGroupName=item.text; getNotes();"
        >
          <v-list-item-content>
            <v-list-item-title>
              <v-icon class="mr-5">mdi-note-multiple-outline</v-icon>
              {{item.text}}
            </v-list-item-title>
          </v-list-item-content>
          <v-list-item-icon
            v-on:click="$root.currentGroup = item._id; deleteGroup = true; removeGroup()"
          >
            <v-icon>mdi-close-circle</v-icon>
          </v-list-item-icon>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <!-- confirm popup-->
    <v-dialog v-model="confirmDelete" max-width="290">
      <v-card>
        <v-card-title>Are you sure you want to delete?</v-card-title>
        <v-card-text>If you are deleting a group it will delete all notes associated with it.</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="#5ac161" text @click="confirmDelete = false">Don't Delete</v-btn>
          <v-btn color="#9f684a" text v-if="deleteGroup" @click="deleteGroupConfirmed">Delete Anyway</v-btn>
          <v-btn color="#9f684a" text v-else @click="deleteNoteConfirmed">Delete Anyway</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- new group popup -->
    <v-dialog v-model="newGroupBox" persistent max-width="600px">
      <v-card>
        <v-app-bar color="#5AC161">
          <v-card-title>
            <span class="headline">New Group</span>
          </v-card-title>
        </v-app-bar>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field v-model="newGroupName" label="Group Name" type="text" required></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-card-subtitle class="error--text ml-5">{{ error }}</v-card-subtitle>
          <v-spacer></v-spacer>
          <v-btn color="#5AC161" text @click="newGroupBox = false">Cancel</v-btn>
          <v-btn color="#5AC161" text @click="createGroup(); newGroupBox = false">Create</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Register popup -->
    <v-dialog v-model="registerBox" persistent max-width="600px">
      <v-card>
        <v-app-bar color="#5AC161">
          <v-card-title>
            <span class="headline">Register</span>
          </v-card-title>
        </v-app-bar>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  v-model="username"
                  prepend-icon="mdi-account-circle"
                  label="Username"
                  type="text"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="password"
                  prepend-icon="mdi-lock"
                  label="Password"
                  type="password"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="confirmpassword"
                  bounce
                  prepend-icon="mdi-lock-alert"
                  label="Confirm Password"
                  type="password"
                  required
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-subtitle class="error--text ml-5">{{ error }}</v-card-subtitle>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="#5AC161" text @click="registerBox = false">Close</v-btn>
          <v-btn color="#5AC161" text @click="register(); registerBox = false">Confirm</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Login Popup -->
    <v-dialog v-model="loginBox" persistent max-width="600px">
      <v-card>
        <v-app-bar color="#5AC161">
          <v-card-title>
            <span class="headline">Login</span>
          </v-card-title>
        </v-app-bar>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  v-model="username"
                  prepend-icon="mdi-account-circle"
                  label="Username"
                  type="text"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  @keydown.enter="login"
                  v-model="password"
                  prepend-icon="mdi-lock"
                  label="Password"
                  type="password"
                  required
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-subtitle class="error--text ml-5">{{ error }}</v-card-subtitle>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="#5AC161" text @click="loginBox = false; registerBox = true">Register</v-btn>
          <v-btn color="#5AC161" text @click="loginBox = false">Close</v-btn>
          <v-btn color="#5AC161" text @click="login()">Login</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- logged out main -->
    <v-content v-if="!$root.user">
      <v-container class="fill-height" fluid>
        <v-row justify="center" align="center">
          <v-col class="shrink"></v-col>
          <img src="./assets/ducknotes.png" class="m-auto" />
        </v-row>
      </v-container>

      <!-- logged in main / notes focus -->
    </v-content>
    <v-content v-if="$root.user">
      <v-card max-width="1200px" height="85%" class="mx-auto mt-12 pb-12" background-color="white">
        <v-container class="mx-5">
          <v-text-field
            v-if="$root.currentGroup"
            v-model="$root.currentGroupName"
            label="Current Group/Update Group Name"
            type="text"
          ></v-text-field>
        </v-container>
        <v-container v-if="!$root.currentNote">
          <v-textarea
            height="fill"
            name="notesCreator"
            filled
            label="New Note"
            v-model="newNoteText"
            :no-resize="true"
            rows="12"
          ></v-textarea>
          <v-card-actions>
            <v-spacer />
            <v-btn @click="createNote()">Create New</v-btn>
          </v-card-actions>
        </v-container>
        <v-container v-if="$root.currentNote">
          <v-textarea
            name="notesEditor"
            height="fill"
            filled
            label="Update Note"
            v-model="$root.currentNoteText"
            :no-resize="true"
            rows="12"
          ></v-textarea>
          <v-card-actions>
            <v-spacer />
            <v-btn @click="updateNote()">Update</v-btn>
          </v-card-actions>
        </v-container>
      </v-card>
    </v-content>

    <!-- footer stuff -->
    <v-footer app color="#9F684A" class="white--text">
      <span>Duck Notes Inc.</span>
      <v-spacer />
      <span class="mr-6">&copy; 2020</span>
    </v-footer>
  </v-app>
</template>

<script>
import Jquery from "jquery";

const $ = Jquery;
const server = "https://supernotes.duckdns.org";

export default {
  name: "App",

  components: {},

  data: () => ({
    title: "Notes Extreme",
    drawer: false,
    left: false,
    deleteGroup: false,
    loginBox: false,
    registerBox: false,
    confirmDelete: false,
    newGroupBox: false,
    cardContent: true,
    newGroupName: "",
    newNoteText: "",
    username: "",
    password: "",
    res: "",
    confirmpassword: "",
    error: "",
    doDelete: false
  }),

  methods: {
    clearCurrentNoteBox() {
      this.$root.currentNoteText = "";
      this.newNoteText = "";
    },
    login() {
      let dataToSend = {
        username: this.username,
        password: this.password
      };
      $.post(server + "/login", dataToSend, res => {
        this.res = JSON.stringify(res);
        if (res.success) {
          this.loginSuccessful(res);
        } else {
          this.error = res.error;
          this.$root.user = "";
          this.$root.id = "";
          this.$root.groupList = [];
          this.$root.noteList = [];
          this.$root.currentGroup = "";
          this.$root.currentGroupName = "";
          this.$root.currentNote = "";
          this.$root.currentNoteText = "";
        }
      });
    },
    register() {
      if (this.password == this.confirmpassword) {
        let dataToSend = {
          username: this.username,
          password: this.password
        };
        $.post(server + "/register", dataToSend, res => {
          this.res = JSON.stringify(res);
          if (res.success) {
            this.loginSuccessful(res.username);
          } else {
            this.error = "Username already exists";
          }
        });
      } else {
        this.error = "Password Does not Match";
      }
    },
    loginSuccessful(res) {
      this.$root.user = res.username;
      this.$root.id = res._id;
      this.loginBox = false;
    },
    logout() {
      $.post(server + "/logout", res => {
        if (res.success) {
          this.$root.user = "";
          this.$root.id = "";
          this.$root.groupList = [];
          this.$root.noteList = [];
          this.$root.currentGroup = "";
          this.$root.currentGroupName = "";
          this.$root.currentNote = "";
          this.$root.currentNoteText = "";
        } else {
          alert(res.error);
        }
      });
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
        if (res.success) {
          this.$root.noteList = res.notes;
        }
      });
    },
    createGroup() {
      let dataToSend = {
        text: this.newGroupName
      };
      $.post(server + "/groups/create", dataToSend, res => {
        if (res.success) {
          this.$root.groupList = res.groups;
          this.$root.currentGroup = "";
          this.$root.currentGroupName = "";
          this.$root.currentNote = "";
          this.$root.currentNoteText = "";
        } else {
          alert(res.error);
        }
      });
    },
    createNote() {
      let dataToSend = {
        groupId: this.$root.currentGroup,
        text: this.newNoteText
      };
      $.post(server + "/notes/create", dataToSend, res => {
        if (res.success) {
          this.$root.noteList = res.notes;
          this.$root.currentNote = res.insertedId;
          this.$root.currentNoteText = this.newNoteText;
          this.newNoteText = "";
        } else {
          alert(res.error);
        }
      });
    },
    removeGroup() {
      this.confirmDelete = true;
    },
    deleteGroupConfirmed() {
      this.confirmDelete = false;
      let dataToSend = {
        groupId: this.$root.currentGroup
      };
      $.post(server + "/groups/remove", dataToSend, res => {
        if (res.success) {
          this.$root.currentGroup = "";
          this.$root.currentNote = "";
          this.$root.currentNoteText = "";
        } else {
          alert(res.error);
        }
      });
    },
    removeNotes() {
      this.confirmDelete = true;
    },
    deleteNoteConfirmed() {
      this.confirmDelete = false;
      let dataToSend = {
        noteId: this.$root.currentNote,
        groupId: this.$root.currentGroup
      };
      $.post(server + "/notes/remove", dataToSend, res => {
        if (res.success) {
          this.$root.currentGroup = "";
          this.$root.currentNote = "";
          this.$root.currentNoteText = "";
          this.$root.noteList = res.notes;
        } else {
          alert(res.error);
        }
      });
    },
    updateGroup() {
      let dataToSend = {
        groupId: this.$root.currentGroup,
        text: this.$root.currentGroupName
      };
      $.post(server + "/groups/update", dataToSend, res => {
        if (res.success) {
          this.$root.currentGroup = "";
          this.$root.groupList = res.groups;
          console.log(res);
        } else {
          alert(res.error);
        }
      });
    },
    updateNote() {
      let dataToSend = {
        noteId: this.$root.currentNote,
        text: this.$root.currentNoteText
      };
      $.post(server + "/notes/update", dataToSend, res => {
        if (res.success) {
          if (this.$root.currentGroup) {
            this.updateGroup();
          }
          this.$root.currentNote = "";
          this.$root.currentNoteText = "";
          this.$root.noteList = res.notes;
          console.log(res);
        } else {
          alert(res.error);
        }
      });
    }
  },
  mounted() {
    $.post(server + "/checkLogin", res => {
      if (res.success) {
        this.loginSuccessful(res);
      } else {
        this.$root.user = "";
        this.$root.id = "";
        this.$root.groupList = [];
        this.$root.noteList = [];
        this.$root.currentGroup = "";
        this.$root.currentGroupName = "";
        this.$root.currentNote = "";
        this.$root.currentNoteText = "";
      }
    });
  },
  props: {
    source: String
  }
};
</script>

<style scoped>
</style>
