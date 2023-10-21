import Vue from 'vue';
import App from './App.vue';
import VueRouter from 'vue-router';

import store from "./store/index.js";
import router from "./router/index.js";

import "./assets/fonts/iconfont/iconfont.css";


Vue.config.productionTip = false;

Vue.use(VueRouter);

new Vue({
  render: h => h(App),
  store: store,
  router: router
}).$mount('#app');
