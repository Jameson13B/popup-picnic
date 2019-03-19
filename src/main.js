import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import moment from "moment";

Vue.config.productionTip = false;

// create global filter
Vue.filter("date", val => {
  if (!val || typeof val != "number") return "ERROR: Refresh Page";
  val = moment(val).format("lll");
  return val;
});
Vue.filter("title", val => {
  if (!val || typeof val != "string") return "";
  val = val.slice(0, 20);
  return val;
});
Vue.filter("icon", val => {
  if (!val || typeof val != "string") return "";
  const names = val.split(" ");
  val = names[0].substring(0, 1).toUpperCase();

  if (names.length > 1) {
    val += names[names.length - 1].substring(0, 1).toUpperCase();
  }
  return val;
});

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
