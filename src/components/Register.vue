<template>
  <div>
    <v-app id="inspire">
      <v-content>
        <v-container class="fill-height" fluid>
          <v-row align="center" justify="center">
            <v-col cols="12" sm="8" md="4">
              <v-card class="elevation-12">
                <v-toolbar color="#5AC161" dark flat>
                  <v-toolbar-title class="black--text">Register</v-toolbar-title>
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
                      v-model="password"
                      prepend-icon="mdi-lock"
                      label="Password"
                      type="password"
                    />
                    <v-text-field
                      v-model="confirmpassword"
                      prepend-icon="mdi-lock-alert"
                      label="Confirm Password"
                      type="password"
                    />
                  </v-form>
                </v-card-text>
                <v-card-actions>
                  <v-label class="red--text">{{ error }}</v-label>
                  <v-spacer />
                  <v-btn color="#5AC161" @click="Register">Confirm</v-btn>
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
    confirmpassword: "",
    res: "",
    error: ""
  }),
  methods: {
    Register() {
      if(this.password == this.confirmpassword){
      let dataToSend = {
        username: this.username,
        password: this.password
      };
      $.post(server + "/register", dataToSend, res => {
        this.res = JSON.stringify(res);
        if(res.success){
          this.$root.page='login'
          }else{
        this.error = "Username already exists"
        }
      });
    }
    else{
      this.error = "Password Does not Match"
    }
    }
  }
};
</script>

<style scoped></style>
