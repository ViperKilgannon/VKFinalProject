import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import vuetify from "./plugins/vuetify";
import "./jquery-remote";
import state from "./state.js"

Vue.config.productionTip = false;

new Vue({
  data: state,
  vuetify,
  render: h => h(App)
}).$mount("#app");
