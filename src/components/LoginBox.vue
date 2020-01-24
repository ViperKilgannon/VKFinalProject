<template>
  <div>
    <v-app id="inspire">
      <v-content>
        <v-container class="fill-height" fluid>
          <v-row align="center" justify="center">
            <v-col cols="12" sm="8" md="4">
              <v-card class="elevation-12">
                <v-toolbar color="primary" dark flat>
                  <v-toolbar-title>Login</v-toolbar-title>
                  <v-spacer />
                  <v-tooltip bottom>
                    <span>Source</span>
                  </v-tooltip>
                  <v-tooltip right>
                    <span>Codepen</span>
                  </v-tooltip>
                </v-toolbar>
                <v-card-text>
                  <v-form>
                    <v-text-field v-model="username" label="Username" type="text" />

                    <v-text-field v-model="password" label="Password" type="password" />
                  </v-form>
                </v-card-text>
                <v-card-actions>
                  <v-spacer />
                  <div>{{ res }}</div>
                  <v-btn color="primary" @click="login">Login</v-btn>
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
    res: ""
  }),
  methods: {
    login() {
      let dataToSend = {
        username: this.username,
        password: this.password
      };
      $.post(server + "/login", dataToSend, res => {
        this.res = JSON.stringify(res);
      });
    }
  }
};
</script>

<style scoped>
</style>