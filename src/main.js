import Vue from "vue";
import "normalize.css/normalize.css"; // A modern alternative to CSS resets
import "@/styles/index.scss";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./plugins/element.js";
import "@/icons"; // icon
import "@/permission"; // permission control
Vue.config.productionTip = false;

/* 
  如果接口已经好了那么此处删除
 */
if (process.env.NODE_ENV === "production") {
  const { mockXHR } = require("../mock");
  mockXHR();
}
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
