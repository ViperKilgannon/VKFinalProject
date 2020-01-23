<template>
  <div>
    <input v-model="username" />
    <input v-model="password" type="password" />
    <button @click="login">Login</button>
    <div>{{ res }}</div>
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
div {
  border: 2px solid grey;
  border-radius: 10px;
  padding: 10px;
}
</style>