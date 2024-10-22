import Vue from 'vue';
import App from './App.vue';
import router from './router/router.js';
import '../src/assets/styles/global.scss';
new Vue({
  render: function render(h) {
    return h(App);
  },
  router: router
}).$mount('#app');