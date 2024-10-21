import Vue from 'vue';
import App from './App.vue';
import router from './router/router.js';
import '../src/assets/global.scss';
new Vue({
  render: h => h(App),
  router
}).$mount('#app');