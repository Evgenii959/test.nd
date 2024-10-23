import Vue from 'vue';
import Router from 'vue-router';
import HomePage from '../views/HomePage.vue';
import ProfilePage from '../views/ProfilePage.vue';

Vue.use(Router);

const routes = [
  {
    path: '/test.nd',
    name: 'HomePage',
    component: HomePage,
  },
  {
    path: '/test.nd/profile',
    name: 'ProfilePage',
    component: ProfilePage,
  },
];

const router = new Router({
  mode: 'history',
  routes,
});

export default router;
