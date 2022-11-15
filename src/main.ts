import Vue from "vue";
import App from "./App.vue";
import MoneyDirective from "./directives/MoneyDirective";
import "./assets/css/index.css";

Vue.config.productionTip = false;
Vue.directive("money", MoneyDirective());

new Vue({
  render: (h) => h(App),
}).$mount("#app");
