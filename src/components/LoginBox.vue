<template>
  <div>
    <v-app id="inspire">
      <v-content>
        <v-container class="fill-height" fluid>
          <v-row align="center" justify="center">
            <v-col cols="12" sm="8" md="4">
              <v-card class="elevation-12">
                <v-toolbar color="#5AC161" dark flat>
                  <v-toolbar-title class="black--text">Login</v-toolbar-title>
                  <v-spacer />
                </v-toolbar>
                <v-card-text>
                  <v-form>
                    <v-text-field
                      v-model="username"
                      prepend-icon="mdi-account-circle"
                      label="Username"
                      type="text"
                    />

                    <v-text-field
                    @keydown.enter="login"
                      v-model="password"
                      prepend-icon="mdi-lock"
                      label="Password"
                      type="password"
                    />
                  </v-form>
                </v-card-text>
                <v-card-actions>
                  <v-btn color="#5AC161" @click="$root.page='register'">Register</v-btn>
                  <v-spacer />
                  <v-label class="red--text">{{ error }}</v-label>
                  <v-spacer />
                  <v-btn color="#5AC161" @click="login">Login</v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-content>
    </v-app>
  </div>
</template>

<script>
import Jquery from "jquery";

const $ = Jquery;
const server = "https://supernotes.duckdns.org";

export default {
  data: () => ({
    username: "",
    password: "",
    res: "",
    error: ""
  }),
  methods: {
          

    login() {
      let dataToSend = {
        username: this.username,
        password: this.password
      };
      $.post(server + "/login", dataToSend, res => {
        this.res = JSON.stringify(res);
        if(res.success){
          this.$root.user = res.username;
          this.$root.id = res._id;
          this.$root.page='notes';
          // this.getGroups();
        }else{
          this.error = res.error;
        }
      });
    }

  }
};
</script>

<style scoped></style>
